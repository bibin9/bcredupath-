// Question-bank augmentation seeder.
// Generates ADDITIONAL questions (does NOT delete existing) emphasising:
//   • 2× the original count per chapter (more depth)
//   • Heavy Case Study + Assertion-Reason mix (CBSE 2024-25 board pattern)
//
// Usage:
//   npm run seed:augment                  (Class 10, all subjects, 2× scale)
//   npm run seed:augment -- --class=12    (Class 12)
//   npm run seed:augment -- --subjects=math,science  (subset)
//   npm run seed:augment -- --scale=1.5   (1.5× instead of 2×)
//   npm run seed:augment -- --dry-run     (preview cost, no API calls)

import dotenv from "dotenv";
import mongoose from "mongoose";
import Anthropic from "@anthropic-ai/sdk";
import { build } from "esbuild";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";

dotenv.config({ path: ".env.local", override: true });

const args = parseArgs(process.argv.slice(2));
const DRY = !!args["dry-run"];
const SCALE = args.scale ? Number(args.scale) : 2;
const TARGET_CLASS = args.class ? Number(args.class) : 10;
const SUBJECTS_FILTER = args.subjects ? String(args.subjects).split(",") : null;
const AUGMENTATION_TAG = `augment-v${args.tag ?? "1"}`;

const MODEL = "claude-sonnet-4-6";
const PRICE_IN_PER_M = 3.0;
const PRICE_OUT_PER_M = 15.0;

const tempDir = mkdtempSync(join(tmpdir(), "bcr-augment-"));
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

const { CLASS_10_PLAN, CLASS_12_PLAN } = await importTS("lib/seed/chapter-plan.ts");
const { TOPIC_WEIGHTS_CLASS_10 } = await importTS("lib/seed/topic-weights.ts");

const sourcePlan = TARGET_CLASS === 12 ? CLASS_12_PLAN : CLASS_10_PLAN;
let plan = sourcePlan;
if (SUBJECTS_FILTER) plan = plan.filter((c) => SUBJECTS_FILTER.includes(c.subject));

// Build the augmentation plan: scale up counts AND rebalance type mix toward CS + AR
const augmented = plan.map((c) => {
  const original = c.typeMix ?? { MCQ: 3, SA: 2, LA: 2 };
  const targetCount = Math.max(4, Math.round(c.count * SCALE));
  // Keep the same proportion of MCQ/SA/LA but add CS + AR
  const baseMCQ = Math.max(2, Math.round((original.MCQ ?? 3) * (SCALE * 0.8)));
  const baseSA = Math.max(1, Math.round((original.SA ?? 2) * (SCALE * 0.8)));
  const baseLA = Math.max(1, Math.round((original.LA ?? 2) * (SCALE * 0.8)));
  // CBSE pattern target: ~3 CaseStudy + ~3 AssertionReason per chapter
  const caseStudy = Math.max(2, original.CaseStudy ?? 0) + 2;
  const assertionReason = Math.max(2, original.AssertionReason ?? 0) + 2;
  // Sum -> rebalance to hit targetCount roughly
  const sum = baseMCQ + baseSA + baseLA + caseStudy + assertionReason;
  const factor = targetCount / sum;
  return {
    ...c,
    count: targetCount,
    typeMix: {
      MCQ: Math.max(2, Math.round(baseMCQ * factor)),
      SA: Math.max(1, Math.round(baseSA * factor)),
      LA: Math.max(1, Math.round(baseLA * factor)),
      AssertionReason: Math.max(2, Math.round(assertionReason * factor)),
      CaseStudy: Math.max(2, Math.round(caseStudy * factor)),
    },
  };
});

const totalQs = augmented.reduce((s, c) => s + c.count, 0);
const totalCS = augmented.reduce((s, c) => s + (c.typeMix.CaseStudy ?? 0), 0);
const totalAR = augmented.reduce((s, c) => s + (c.typeMix.AssertionReason ?? 0), 0);
const subjects = [...new Set(augmented.map((c) => c.subject))];

console.log("\n────────────────────────────────────────");
console.log("  BCRedupath — Question Bank Augmentation");
console.log("────────────────────────────────────────");
console.log(`  Target class:  ${TARGET_CLASS}`);
console.log(`  Subjects:      ${subjects.join(", ")}`);
console.log(`  Chapters:      ${augmented.length}`);
console.log(`  Scale factor:  ${SCALE}×`);
console.log(`  New Qs target: ${totalQs}`);
console.log(`  Of which CS:   ${totalCS}`);
console.log(`  Of which AR:   ${totalAR}`);
console.log(`  Tag:           ${AUGMENTATION_TAG}`);
const estCost = (augmented.length * 700 * PRICE_IN_PER_M + augmented.length * 5500 * PRICE_OUT_PER_M) / 1_000_000;
console.log(`  Est. cost:     $${estCost.toFixed(2)}`);
console.log("────────────────────────────────────────\n");

if (DRY) {
  augmented.slice(0, 10).forEach((c) => {
    const mix = Object.entries(c.typeMix).map(([k, v]) => `${k}:${v}`).join(", ");
    console.log(`  ${c.subject.padEnd(8)} | ${c.chapter.slice(0, 40).padEnd(40)} → ${c.count} (${mix})`);
  });
  console.log("\n(dry-run) — exiting before any API call");
  process.exit(0);
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("❌ ANTHROPIC_API_KEY missing in .env.local");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI missing in .env.local");
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const questionSchema = new mongoose.Schema(
  {
    subject: String,
    class: Number,
    chapter: String,
    topic: String,
    type: String,
    marks: Number,
    difficulty: String,
    question: String,
    options: [String],
    answer: mongoose.Schema.Types.Mixed,
    solution: {
      steps: String,
      videoUrl: String,
      commonMistakes: [String],
      relatedConcepts: [String],
    },
    yearsAsked: [Number],
    examType: String,
    region: String,
    frequencyScore: Number,
    predictedProbability: Number,
    bloomLevel: String,
    expectedTime: Number,
    xpReward: Number,
    tags: [String],
    aiGenerated: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

const CURRENT_YEAR = 2026;
const XP_BY_MARKS = { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50 };

function computeProbability(q, topicWeight) {
  const frequency = (q.frequencyScore / 10) * 0.4;
  const lastAsked = q.yearsAsked?.length ? Math.max(...q.yearsAsked) : CURRENT_YEAR - 10;
  const yearsSince = CURRENT_YEAR - lastAsked;
  const recencyRaw = yearsSince <= 2 ? 1.0 : yearsSince <= 4 ? 0.7 : 0.4;
  const recency = recencyRaw * 0.25;
  const topic = Math.max(0, Math.min(1, topicWeight)) * 0.2;
  const sleeperBoost = yearsSince >= 3 && q.frequencyScore >= 7 ? 0.15 : 0;
  return Math.min(1, frequency + recency + topic + sleeperBoost);
}

function buildPrompt(chapter) {
  const tm = chapter.typeMix;
  const mixLines = Object.entries(tm).map(([k, v]) => `  - ${k}: ${v}`).join("\n");
  return `You are an expert CBSE Class ${chapter.class} ${chapter.subject.toUpperCase()} teacher writing exam-style practice questions.

CHAPTER: ${chapter.chapter}
TOPICS TO ROTATE THROUGH: ${chapter.topics.join(", ")}

Generate EXACTLY ${chapter.count} FRESH questions for this chapter that DO NOT duplicate common textbook questions. Aim for slight variation in scenario / numerical values / context vs. typical board questions, while staying on syllabus.

TYPE MIX (must match closely):
${mixLines}

QUESTION TYPE REQUIREMENTS:
- MCQ: 4 options, single correct, "answer" is the 0-3 index.
- AssertionReason: question text MUST follow CBSE format:
    "Assertion (A): <statement>. Reason (R): <statement>.
    (a) Both A and R are true and R is the correct explanation of A.
    (b) Both A and R are true but R is NOT the correct explanation of A.
    (c) A is true but R is false.
    (d) A is false but R is true."
  Then "options" = ["(a) Both A and R...", "(b) Both A and R...", "(c) A is true but R is false", "(d) A is false but R is true"]
  and "answer" is the 0-3 index.
- CaseStudy: question text starts with a 2-4 sentence passage/scenario, then ends with the actual sub-question.
  4 marks. Provide "options" only if MCQ-style sub-question, else null. "answer" is a string answer.
- SA: 2 or 3 marks; "answer" is a short text answer; "options" = null.
- LA: 4 or 5 marks; multi-part answer in "solution.steps"; "options" = null.

GENERAL:
- Use LaTeX in $...$ for inline math, $$...$$ for block math.
- "yearsAsked": pick 1-3 from [2021, 2022, 2023, 2024, 2025] reflecting realistic frequency.
- "frequencyScore" 1-10 (7+ for high-yield).
- "difficulty": Easy / Medium / Hard / VeryHard.
- "marks": MCQ=1, AssertionReason=1, SA=2 or 3, LA=4 or 5, CaseStudy=4.
- "expectedTime" seconds: MCQ ~45, AssertionReason ~60, SA ~180, LA ~480, CaseStudy ~300.
- "bloomLevel": Remember / Understand / Apply / Analyze / Evaluate / Create.
- "solution.commonMistakes": 1-3 specific traps.
- "solution.relatedConcepts": 1-3 short concept tags.

Output ONLY a JSON array of ${chapter.count} questions for "${chapter.chapter}". No prose, no markdown fences. Each object MUST have these exact keys:

type, marks, difficulty, question, options, answer, solution { steps, commonMistakes, relatedConcepts }, yearsAsked, frequencyScore, bloomLevel, expectedTime, topic.

"topic" should be one of: ${chapter.topics.join(", ")}.`;
}

function safeParseJson(text) {
  let s = text.trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    const parsed = JSON.parse(s);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed?.questions)) return parsed.questions;
    return null;
  } catch {
    const start = s.indexOf("[");
    const end = s.lastIndexOf("]");
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(s.slice(start, end + 1));
      } catch {}
    }
    return null;
  }
}

function validate(q) {
  if (!q || typeof q !== "object") return false;
  if (typeof q.question !== "string" || q.question.length < 10) return false;
  if (!["MCQ", "AssertionReason", "VSA", "SA", "LA", "CaseStudy", "HOTS"].includes(q.type)) return false;
  if (typeof q.marks !== "number") return false;
  if (q.type === "MCQ" || q.type === "AssertionReason") {
    if (!Array.isArray(q.options) || q.options.length !== 4) return false;
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer > 3) return false;
  }
  if (!q.solution?.steps) return false;
  return true;
}

async function callWithBackoff(fn, label) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const status = err?.status;
      if (status === 429 || status === 529) {
        const ra = Number(err?.headers?.["retry-after"]);
        const waitS = Number.isFinite(ra) && ra > 0 ? ra : Math.min(60, 2 ** attempt * 5);
        process.stdout.write(`\n  ⏳ ${label}: rate-limited (attempt ${attempt}/6), waiting ${waitS}s... `);
        await new Promise((r) => setTimeout(r, waitS * 1000));
        continue;
      }
      throw err;
    }
  }
  throw new Error(`${label}: gave up after 6 retries`);
}

async function generateChapter(chapter) {
  const prompt = buildPrompt(chapter);
  const resp = await callWithBackoff(
    () =>
      anthropic.messages.create({
        model: MODEL,
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      }),
    `${chapter.subject}/${chapter.chapter}`
  );

  const text = resp.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("");
  const parsed = safeParseJson(text);
  if (!parsed) {
    console.error(`  ❌ ${chapter.subject}/${chapter.chapter} — could not parse JSON`);
    return { questions: [], usage: resp.usage };
  }

  const valid = parsed.filter(validate);
  if (valid.length < parsed.length) {
    console.warn(`  ⚠  ${chapter.subject}/${chapter.chapter} — dropped ${parsed.length - valid.length} invalid`);
  }

  const topicWeight = TOPIC_WEIGHTS_CLASS_10[chapter.subject]?.[chapter.chapter] ?? 0.5;
  const docs = valid.map((q) => ({
    subject: chapter.subject,
    class: chapter.class,
    chapter: chapter.chapter,
    topic: q.topic ?? chapter.topics[0],
    type: q.type,
    marks: q.marks,
    difficulty: q.difficulty ?? "Medium",
    question: q.question,
    options: q.options ?? null,
    answer: q.answer,
    solution: {
      steps: q.solution.steps,
      videoUrl: null,
      commonMistakes: q.solution.commonMistakes ?? [],
      relatedConcepts: q.solution.relatedConcepts ?? [],
    },
    yearsAsked: q.yearsAsked ?? [],
    examType: "Mock",
    region: "All-India",
    frequencyScore: q.frequencyScore ?? 5,
    predictedProbability: computeProbability(q, topicWeight),
    bloomLevel: q.bloomLevel ?? "Apply",
    expectedTime: q.expectedTime ?? 120,
    xpReward: XP_BY_MARKS[q.marks] ?? 10,
    tags: ["ai-generated", AUGMENTATION_TAG],
    aiGenerated: true,
  }));

  return { questions: docs, usage: resp.usage };
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
  console.log("→ connected to Mongo (augmentation mode — keeping existing questions)\n");

  let totalInserted = 0;
  let totalInTokens = 0;
  let totalOutTokens = 0;
  const failed = [];

  for (let i = 0; i < augmented.length; i++) {
    const chapter = augmented[i];
    const tag = `[${(i + 1).toString().padStart(2)}/${augmented.length}]`;
    process.stdout.write(`${tag} ${chapter.subject.padEnd(8)} | ${chapter.chapter.slice(0, 36).padEnd(36)} → `);
    try {
      const { questions, usage } = await generateChapter(chapter);
      totalInTokens += usage.input_tokens;
      totalOutTokens += usage.output_tokens;
      if (questions.length === 0) {
        console.log("0 questions (parse failed)");
        failed.push(chapter);
        continue;
      }
      await Question.insertMany(questions, { ordered: false });
      totalInserted += questions.length;
      const cs = questions.filter((q) => q.type === "CaseStudy").length;
      const ar = questions.filter((q) => q.type === "AssertionReason").length;
      console.log(`${questions.length.toString().padStart(2)} Qs (CS:${cs}, AR:${ar}) | ${usage.input_tokens}in/${usage.output_tokens}out`);
    } catch (err) {
      console.log(`error: ${err.message}`);
      failed.push(chapter);
    }
  }

  const cost = (totalInTokens * PRICE_IN_PER_M + totalOutTokens * PRICE_OUT_PER_M) / 1_000_000;
  console.log("\n────────────────────────────────────────");
  console.log(`✅ Inserted ${totalInserted} new questions (tag: ${AUGMENTATION_TAG})`);
  console.log(`   Tokens: ${totalInTokens} in / ${totalOutTokens} out`);
  console.log(`   Actual cost: $${cost.toFixed(2)}`);
  if (failed.length) {
    console.log(`   Failed: ${failed.length} chapter(s) — rerun with --subjects=${[...new Set(failed.map((f) => f.subject))].join(",")}`);
  }
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
  console.error("Augmentation seed failed:", err);
  rmSync(tempDir, { recursive: true, force: true });
  process.exit(1);
});
