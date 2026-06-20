// Pre-generate 20 mock papers per (subject, class) combo and store them in
// the mockpapers collection. Each paper is reproducible — Paper 5 is always
// the same set of questions, so students can compare attempts.
//
// Usage:
//   npm run gen:papers              (all subjects, both classes, 20 papers each)
//   npm run gen:papers -- --class=12
//   npm run gen:papers -- --subjects=math,physics
//   npm run gen:papers -- --papers=10  (override paper count)

import dotenv from "dotenv";
import mongoose from "mongoose";
import { build } from "esbuild";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";

dotenv.config({ path: ".env.local", override: true });

const args = parseArgs(process.argv.slice(2));
const TARGET_CLASS = args.class ? Number(args.class) : null;
const SUBJECTS_FILTER = args.subjects ? String(args.subjects).split(",") : null;
const NUM_PAPERS = args.papers ? Number(args.papers) : 20;

const tempDir = mkdtempSync(join(tmpdir(), "bcr-papers-"));
async function importTS(tsPath) {
  const out = join(tempDir, `${Math.random().toString(36).slice(2)}.mjs`);
  await build({
    entryPoints: [tsPath],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: out,
    logLevel: "error",
  });
  return import(pathToFileURL(out).href);
}

const { SUBJECTS_BY_CLASS } = await importTS("lib/constants.ts");
const { resolveSubjectFilter } = await importTS("lib/chapter-mapping.ts");

const PAPER_SPEC = [
  { sectionName: "Section A", marks: 1, type: ["MCQ", "AssertionReason"], count: 20,
    instructions: "Each question carries 1 mark. There are 20 questions including 2 Assertion-Reason." },
  { sectionName: "Section B", marks: 2, type: ["SA"], count: 5,
    instructions: "Each question carries 2 marks. Answer in ~30 words." },
  { sectionName: "Section C", marks: 3, type: ["SA"], count: 6,
    instructions: "Each question carries 3 marks. Answer in ~50 words." },
  { sectionName: "Section D", marks: 5, type: ["LA"], count: 4,
    instructions: "Each question carries 5 marks. Answer in ~100 words." },
  { sectionName: "Section E", marks: 4, type: ["CaseStudy"], count: 3,
    instructions: "Case-Study based questions. Each carries 4 marks." },
];

// Mongoose schemas (inline so the script is standalone)
const questionSchema = new mongoose.Schema({
  subject: String, class: Number, chapter: String, topic: String,
  type: String, marks: Number, difficulty: String, question: String,
  options: [String], answer: mongoose.Schema.Types.Mixed,
  solution: mongoose.Schema.Types.Mixed,
  expectedTime: Number, predictedProbability: Number, tags: [String],
}, { timestamps: { createdAt: true, updatedAt: false } });
const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

const sectionSchema = new mongoose.Schema({
  name: String, instructions: String, marksPerQuestion: Number,
  questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { _id: false });
const mockPaperSchema = new mongoose.Schema({
  subject: String, class: Number, paperNumber: Number,
  title: String, totalMarks: Number, durationMinutes: Number,
  sections: [sectionSchema], source: String,
}, { timestamps: true });
mockPaperSchema.index({ subject: 1, class: 1, paperNumber: 1 }, { unique: true });
const MockPaper = mongoose.models.MockPaper || mongoose.model("MockPaper", mockPaperSchema);

// Deterministic shuffle via seeded LCG
function shuffleSeeded(arr, seed) {
  const a = [...arr];
  let s = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickWithRepeats(pool, count, seed) {
  if (pool.length === 0) return [];
  const shuffled = shuffleSeeded(pool, seed);
  if (shuffled.length >= count) return shuffled.slice(0, count);
  // Pool is smaller than required — repeat-fill (still deterministic)
  const out = [];
  let i = 0;
  while (out.length < count) {
    out.push(shuffled[i % shuffled.length]);
    i++;
  }
  return out;
}

async function buildPaper(subject, cls, paperNumber, pools) {
  const sections = [];
  let totalMarks = 0;
  for (let s = 0; s < PAPER_SPEC.length; s++) {
    const spec = PAPER_SPEC[s];
    const pool = pools[s];
    // Seed per (paperNumber, section) for stable + varied selection
    const seed = paperNumber * 1009 + s * 31 + cls * 7 + subjectSeed(subject);
    const chosen = pickWithRepeats(pool, spec.count, seed);
    sections.push({
      name: spec.sectionName,
      instructions: spec.instructions,
      marksPerQuestion: spec.marks,
      questionIds: chosen.map((q) => q._id),
    });
    totalMarks += spec.count * spec.marks;
  }
  return {
    subject,
    class: cls,
    paperNumber,
    title: `${subject.toUpperCase()} — Paper ${paperNumber}`,
    totalMarks,
    durationMinutes: 180,
    sections,
    source: "qbank",
  };
}

function subjectSeed(subject) {
  let h = 0;
  for (const ch of subject) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

// Type-fallback chain — if a section's preferred type is empty,
// these are acceptable substitutes (still tagged for the right
// marks weight).
const TYPE_FALLBACK = {
  CaseStudy: [["CaseStudy"], ["SA", "LA"], ["MCQ", "AssertionReason"]],
  LA:        [["LA"], ["SA"], ["CaseStudy"], ["MCQ"]],
  SA:        [["SA"], ["LA"], ["CaseStudy"], ["MCQ"]],
  MCQ:       [["MCQ", "AssertionReason"], ["SA"], ["LA"]],
};

async function findPoolWithFallback(base, sectionType, marks) {
  // Try preferred → first-fallback → second-fallback... until we find ≥1 doc
  const seedType = sectionType[0];
  const chain = TYPE_FALLBACK[seedType] ?? [sectionType];
  for (const layer of chain) {
    const f = { ...base, type: { $in: layer } };
    if (marks != null) f.marks = marks;
    const docs = await Question.find(f).select("_id").lean();
    if (docs.length > 0) return docs;
  }
  // Last resort: any question for this subject, no marks constraint
  return Question.find(base).select("_id").lean();
}

async function fetchPools(subject, cls) {
  const resolved = resolveSubjectFilter(subject, cls);
  const base = { class: cls, subject: resolved.subject };
  if (resolved.chapter) base.chapter = resolved.chapter;
  const pools = [];
  for (const spec of PAPER_SPEC) {
    const marksConstraint =
      spec.sectionName === "Section B" || spec.sectionName === "Section C" || spec.sectionName === "Section D"
        ? spec.marks
        : null;
    const docs = await findPoolWithFallback(base, spec.type, marksConstraint);
    pools.push(docs);
  }
  return pools;
}

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI missing in .env.local");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
  console.log("→ connected to Mongo\n");

  // Compute the list of (subject, class) combos to generate for
  const combos = [];
  const class10Subjects = (SUBJECTS_BY_CLASS[10].all ?? []).map((s) => s.id);
  combos.push(...class10Subjects.map((s) => [s, 10]));

  // Class 12: union of all stream subjects
  const class12Streams = Object.values(SUBJECTS_BY_CLASS[12]);
  const class12Set = new Set();
  for (const arr of class12Streams) {
    for (const s of arr ?? []) class12Set.add(s.id);
  }
  combos.push(...Array.from(class12Set).map((s) => [s, 12]));

  // Apply filters
  const filtered = combos.filter(([subj, cls]) => {
    if (TARGET_CLASS && cls !== TARGET_CLASS) return false;
    if (SUBJECTS_FILTER && !SUBJECTS_FILTER.includes(subj)) return false;
    return true;
  });

  console.log(`Generating ${NUM_PAPERS} papers each for ${filtered.length} (subject, class) combos\n`);

  let totalPapers = 0;
  let totalDeleted = 0;
  for (const [subject, cls] of filtered) {
    const pools = await fetchPools(subject, cls);
    const poolSizes = pools.map((p) => p.length);
    const minPoolSize = Math.min(...poolSizes);
    if (minPoolSize === 0) {
      console.log(
        `  ⚠  C${cls} ${subject.padEnd(15)} — skipped, even fallback pools came up empty (${poolSizes.join("/")})`
      );
      continue;
    }
    // Drop existing papers for this combo
    const del = await MockPaper.deleteMany({ subject, class: cls });
    totalDeleted += del.deletedCount;

    const papers = [];
    for (let n = 1; n <= NUM_PAPERS; n++) {
      papers.push(await buildPaper(subject, cls, n, pools));
    }
    await MockPaper.insertMany(papers);
    totalPapers += papers.length;
    console.log(
      `  ✓ C${cls} ${subject.padEnd(15)} ${papers.length} papers   pools: ${poolSizes.join("/")}`
    );
  }

  console.log("\n────────────────────────────────────────");
  console.log(`✅ Generated ${totalPapers} papers · ${totalDeleted} stale papers removed`);
  console.log("────────────────────────────────────────");

  await mongoose.disconnect();
  rmSync(tempDir, { recursive: true, force: true });
}

function parseArgs(argv) {
  const out = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) out[m[1]] = m[2] ?? true;
  }
  return out;
}

main().catch((err) => {
  console.error("Generator failed:", err);
  rmSync(tempDir, { recursive: true, force: true });
  process.exit(1);
});
