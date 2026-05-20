// Import official CBSE Sample Question Papers + Marking Schemes from
// cbseacademic.nic.in. Free, legal, no API credits required.
//
// Usage:
//   npm run import:cbse                 (all subjects in manifest, both classes)
//   npm run import:cbse -- --class=12
//   npm run import:cbse -- --subjects=business,economics,polsci
//   npm run import:cbse -- --skip-math   (skip math/physics/chem/sci where PDF math is unreliable)
//   npm run import:cbse -- --dry-run     (parse only, don't insert)

import dotenv from "dotenv";
import mongoose from "mongoose";
import { createRequire } from "module";
import { build } from "esbuild";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";

dotenv.config({ path: ".env.local", override: true });
const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");

const args = parseArgs(process.argv.slice(2));
const DRY = !!args["dry-run"];
const SKIP_MATH = !!args["skip-math"];
const TARGET_CLASS = args.class ? Number(args.class) : null;
const SUBJECTS_FILTER = args.subjects ? String(args.subjects).split(",") : null;

const tempDir = mkdtempSync(join(tmpdir(), "bcr-cbse-"));
async function importTS(tsPath) {
  const out = join(tempDir, `${Math.random().toString(36).slice(2)}.mjs`);
  await build({ entryPoints: [tsPath], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "error" });
  return import(pathToFileURL(out).href);
}

const { CBSE_PAPERS_2024_25, cbseUrl } = await importTS("lib/seed/cbse-papers-manifest.ts");
const { BOARD_YEAR } = await importTS("lib/academic-year.ts");

let papers = CBSE_PAPERS_2024_25;
if (TARGET_CLASS) papers = papers.filter((p) => p.class === TARGET_CLASS);
if (SUBJECTS_FILTER) papers = papers.filter((p) => SUBJECTS_FILTER.includes(p.subject));
if (SKIP_MATH) papers = papers.filter((p) => !p.mathHeavy);

console.log("\n────────────────────────────────────────");
console.log("  BCRedupath — CBSE Sample Paper Import");
console.log("────────────────────────────────────────");
console.log(`  Papers in queue: ${papers.length}`);
console.log(`  Skip math-heavy: ${SKIP_MATH}`);
console.log(`  Dry run:         ${DRY}`);
console.log("────────────────────────────────────────\n");

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
    verified: { type: Boolean, default: false },
    verifiedBy: String,
    verifiedAt: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

const XP_BY_MARKS = { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50, 6: 60 };

async function fetchPdfText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const parser = new PDFParse({ data: buf });
  const out = await parser.getText();
  return out.text ?? "";
}

/**
 * Strip page-number footers like "-- 1 of 8 --" and excessive blank lines.
 */
function clean(text) {
  return text
    .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, "\n")
    .replace(/Page\s*\d+\s*of\s*\d+/gi, "\n")
    .replace(/\n{3,}/g, "\n\n");
}

/**
 * Find the start of question 1 (skips paper instructions/header).
 * Looks for the first standalone "1." or "Q.NO. QUESTION MARKS" header pattern.
 */
function trimToQuestions(text) {
  // Drop everything before "Q.NO" header or before first "1." that's at line start
  const headerIdx = text.search(/Q\.\s*NO\.?\s*QUESTION\s*MARKS/i);
  if (headerIdx !== -1) return text.slice(headerIdx + 18);
  const oneIdx = text.search(/\n\s*1\.\s/);
  return oneIdx !== -1 ? text.slice(oneIdx) : text;
}

/**
 * Parse a question paper text into an array of {num, body, optionsRaw, marks}.
 * Splits on lines starting with `\d+\.` (question numbers).
 */
function splitQuestions(text) {
  const cleaned = trimToQuestions(clean(text));
  // Add a sentinel so the last block also gets captured
  const sentinel = cleaned + "\n9999. SENTINEL";
  const parts = [];
  const re = /(?:^|\n)\s*(\d{1,2})\.\s+([\s\S]*?)(?=\n\s*\d{1,2}\.\s+|$)/g;
  let m;
  while ((m = re.exec(sentinel)) !== null) {
    const num = Number(m[1]);
    if (num === 9999) break;
    const body = m[2].trim();
    if (!body || body.length < 8) continue;
    parts.push({ num, body });
  }
  return parts;
}

/**
 * For a question block, try to extract:
 *  - The actual question text (before options)
 *  - Options A/B/C/D if it's an MCQ
 *  - The trailing marks integer
 */
function extractQuestionParts(block) {
  // Marks: a small integer (1, 3, 4, 5, 6) standalone at the end of the block
  // Look for last line that is just "N" or "N \n" up to 6
  const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
  let marks = 1;
  for (let i = lines.length - 1; i >= Math.max(0, lines.length - 4); i--) {
    const m = lines[i].match(/^(\d{1,2})$/);
    if (m) {
      const v = Number(m[1]);
      if (v >= 1 && v <= 6) {
        marks = v;
        lines.splice(i, 1);
        break;
      }
    }
  }

  const body = lines.join("\n");

  // MCQ: look for A./B./C./D. (or a)/b)/c)/d)) prefix lines
  const mcqRe = /\n\s*A[\.\)]\s+([\s\S]*?)\n\s*B[\.\)]\s+([\s\S]*?)\n\s*C[\.\)]\s+([\s\S]*?)\n\s*D[\.\)]\s+([\s\S]*?)$/;
  const mcqMatch = body.match(mcqRe);
  if (mcqMatch) {
    const optionsStart = body.indexOf(mcqMatch[0]);
    const questionText = body.slice(0, optionsStart).trim();
    const options = [
      "A. " + mcqMatch[1].trim(),
      "B. " + mcqMatch[2].trim(),
      "C. " + mcqMatch[3].trim(),
      "D. " + mcqMatch[4].trim(),
    ];
    // Detect Assertion-Reason
    const isAR = /Assertion\s*\(A\)/i.test(questionText) && /Reason\s*\(R\)/i.test(questionText);
    return {
      questionText,
      options,
      type: isAR ? "AssertionReason" : "MCQ",
      marks,
    };
  }

  // Case study: starts with a passage scenario, often introduced by "Read"/"Study"/"Case"
  const isCaseStudy = /^(read|study|consider|analyse|case study)/i.test(body) || marks === 4 || marks === 6;

  return {
    questionText: body,
    options: null,
    type: isCaseStudy && body.length > 250 ? "CaseStudy" : marks <= 2 ? "SA" : marks <= 3 ? "SA" : "LA",
    marks,
  };
}

/**
 * Parse marking scheme: returns Map<questionNum, { answerLetter, answerText }>.
 */
function parseMarkingScheme(text) {
  const cleaned = clean(text);
  const sentinel = cleaned + "\n9999. SENTINEL";
  const map = new Map();
  const re = /(?:^|\n)\s*(\d{1,2})\.\s+([\s\S]*?)(?=\n\s*\d{1,2}\.\s+|$)/g;
  let m;
  while ((m = re.exec(sentinel)) !== null) {
    const num = Number(m[1]);
    if (num === 9999) break;
    const body = m[2].trim();
    // Strip trailing marks line
    const cleanBody = body.replace(/\n\s*\d+\s*½?\s*$/, "").trim();
    // First-letter option like "A. " or "(A)"
    const lm = cleanBody.match(/^([A-D])[\.\)]\s+([\s\S]+)$/);
    if (lm) {
      map.set(num, { answerLetter: lm[1], answerText: lm[2].trim() });
    } else {
      map.set(num, { answerLetter: null, answerText: cleanBody });
    }
  }
  return map;
}

function mergeQuestionWithAnswer(qParts, ans, paper) {
  let answer = null;
  let solutionSteps = "";

  if ((qParts.type === "MCQ" || qParts.type === "AssertionReason") && qParts.options) {
    if (ans?.answerLetter) {
      const idx = "ABCD".indexOf(ans.answerLetter);
      if (idx >= 0) {
        answer = idx;
        solutionSteps = `Correct option: ${ans.answerLetter}. ${qParts.options[idx]?.replace(/^[A-D]\.\s*/, "") ?? ""}`;
        if (ans.answerText && ans.answerText.length > 20) {
          solutionSteps += `\n\n${ans.answerText}`;
        }
      }
    }
    if (answer === null) {
      // No marking scheme match — skip MCQ since we can't grade it
      return null;
    }
  } else {
    answer = "(See solution)";
    solutionSteps = ans?.answerText || "Refer to CBSE marking scheme for the full answer.";
  }

  // CBSE 2024-25 sample paper → was published for the 2025 board exam,
  // so we treat it as yearsAsked: [2025] (the year the paper was used for).
  // Actually: the SQP for "2024-25" session is what students see in Feb-March 2025 boards.
  const yearsAsked = [paper.year + 1];

  // Frequency boost since these are CBSE-released model questions
  const frequencyScore = 8;
  // Recency boost since these are most recent
  const recencyBoost = 0.25;
  const predictedProbability = Math.min(1, (frequencyScore / 10) * 0.4 + recencyBoost + 0.2 + 0.1);

  const xpReward = XP_BY_MARKS[qParts.marks] ?? 10;
  const difficulty = qParts.marks >= 5 ? "Hard" : qParts.marks >= 3 ? "Medium" : "Easy";
  const expectedTime = qParts.marks === 1 ? 45 : qParts.marks <= 3 ? 180 : qParts.marks === 4 ? 300 : 480;

  return {
    subject: paper.subject,
    class: paper.class,
    chapter: "Sample Paper (Mixed)",
    topic: paper.displayName,
    type: qParts.type,
    marks: qParts.marks,
    difficulty,
    question: qParts.questionText,
    options: qParts.options,
    answer,
    solution: {
      steps: solutionSteps,
      videoUrl: null,
      commonMistakes: [],
      relatedConcepts: [],
    },
    yearsAsked,
    examType: "Board",
    region: "All-India",
    frequencyScore,
    predictedProbability,
    bloomLevel: "Apply",
    expectedTime,
    xpReward,
    tags: ["cbse-official", `sqp-${paper.year}`],
    aiGenerated: false,
    verified: true,
    verifiedBy: "CBSE Academic (cbseacademic.nic.in)",
    verifiedAt: new Date(),
  };
}

async function importPaper(paper) {
  process.stdout.write(`  ${paper.class === 10 ? "X" : "XII"} ${paper.subject.padEnd(12)} | ${paper.displayName.padEnd(28)} → `);
  try {
    const [sqpText, msText] = await Promise.all([
      fetchPdfText(cbseUrl(paper.sqpPath)),
      fetchPdfText(cbseUrl(paper.msPath)),
    ]);
    const questions = splitQuestions(sqpText);
    const answers = parseMarkingScheme(msText);

    const docs = [];
    for (const q of questions) {
      const parts = extractQuestionParts(q.body);
      const ans = answers.get(q.num);
      // Filter out garbage parses
      if (parts.questionText.length < 20) continue;
      // Skip if too short / clearly junk
      if (parts.questionText.length > 4000) continue;
      const merged = mergeQuestionWithAnswer(parts, ans, paper);
      if (merged) docs.push(merged);
    }

    const types = { MCQ: 0, SA: 0, LA: 0, CaseStudy: 0, AssertionReason: 0 };
    docs.forEach((d) => types[d.type]++);

    if (DRY) {
      console.log(`${docs.length.toString().padStart(2)} parsed (MCQ:${types.MCQ}, AR:${types.AssertionReason}, SA:${types.SA}, LA:${types.LA}, CS:${types.CaseStudy}) (dry)`);
      return docs.length;
    }

    if (docs.length > 0) {
      // Delete previous import of the same paper before re-inserting
      await Question.deleteMany({
        class: paper.class,
        subject: paper.subject,
        tags: { $all: ["cbse-official", `sqp-${paper.year}`] },
      });
      await Question.insertMany(docs, { ordered: false });
    }
    console.log(`${docs.length.toString().padStart(2)} inserted (MCQ:${types.MCQ}, AR:${types.AssertionReason}, SA:${types.SA}, LA:${types.LA}, CS:${types.CaseStudy})`);
    return docs.length;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return 0;
  }
}

async function main() {
  if (!DRY) {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI missing in .env.local");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
    console.log("→ connected to Mongo\n");
  }

  let total = 0;
  for (const paper of papers) {
    total += await importPaper(paper);
  }

  console.log("\n────────────────────────────────────────");
  console.log(`✅ ${DRY ? "Parsed" : "Inserted"} ${total} CBSE Sample Paper questions`);
  console.log("────────────────────────────────────────");

  if (!DRY) await mongoose.disconnect();
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
  console.error("CBSE import failed:", err);
  rmSync(tempDir, { recursive: true, force: true });
  process.exit(1);
});
