// Seed Class 10 Math + Science questions into MongoDB.
// Run with: npm run seed
//
// Uses tsx-style runtime not required — we import TS via dynamic loader.

import dotenv from "dotenv";
import mongoose from "mongoose";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

dotenv.config({ path: ".env.local", override: true });

// Register ts-node loader on the fly so we can import .ts seed files.
// If tsx isn't installed, fall back to a small JS-only path: we re-read TS as text
// and rely on the fact that the seed files are pure data (no runtime types).
//
// Simpler: bypass — pre-compile the seed via tsc would be ideal. For now,
// use a tiny TS->JS transformer using esbuild which is already a Next.js dep.

import { build } from "esbuild";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";

const tempDir = mkdtempSync(join(tmpdir(), "bcr-seed-"));

async function compileAndImport(tsPath) {
  const outPath = join(tempDir, "out.mjs");
  await build({
    entryPoints: [tsPath],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: outPath,
    logLevel: "error",
  });
  return import(pathToFileURL(outPath).href + `?t=${Date.now()}`);
}

const { MATH_10 } = await compileAndImport("lib/seed/questions-math-10.ts");
const { SCIENCE_10 } = await compileAndImport("lib/seed/questions-science-10.ts");
const { TOPIC_WEIGHTS_CLASS_10 } = await compileAndImport(
  "lib/seed/topic-weights.ts"
);

// Inline minimal Question schema (avoid Next path alias resolution in this CLI script)
const questionSchema = new mongoose.Schema(
  {
    subject: String,
    class: Number,
    chapter: String,
    topic: String,
    subtopic: String,
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
    imageUrl: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Question = mongoose.model("Question", questionSchema);

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

function transformBatch(subjectKey, seed) {
  return seed.map((q) => {
    const topicWeight = TOPIC_WEIGHTS_CLASS_10[subjectKey]?.[q.chapter] ?? 0.5;
    return {
      subject: subjectKey,
      class: 10,
      chapter: q.chapter,
      topic: q.topic,
      type: q.type,
      marks: q.marks,
      difficulty: q.difficulty,
      question: q.question,
      options: q.options,
      answer: q.answer,
      solution: {
        steps: q.solution.steps,
        videoUrl: null,
        commonMistakes: q.solution.commonMistakes,
        relatedConcepts: q.solution.relatedConcepts,
      },
      yearsAsked: q.yearsAsked,
      examType: q.examType,
      region: "All-India",
      frequencyScore: q.frequencyScore,
      predictedProbability: computeProbability(q, topicWeight),
      bloomLevel: q.bloomLevel,
      expectedTime: q.expectedTime,
      xpReward: XP_BY_MARKS[q.marks] ?? 10,
      tags: q.tags ?? [],
      imageUrl: null,
    };
  });
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing");
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
  console.log("→ connected");

  const batches = [
    ["math", MATH_10],
    ["science", SCIENCE_10],
  ];

  let total = 0;
  for (const [subject, seed] of batches) {
    const docs = transformBatch(subject, seed);

    // Wipe existing class-10 questions for this subject before re-seeding
    const deleted = await Question.deleteMany({ subject, class: 10 });
    if (deleted.deletedCount) {
      console.log(`  cleared ${deleted.deletedCount} existing ${subject} class-10 docs`);
    }

    const inserted = await Question.insertMany(docs);
    total += inserted.length;
    const topProb = Math.max(...inserted.map((q) => q.predictedProbability));
    console.log(
      `  + ${subject.padEnd(8)}: ${inserted.length.toString().padStart(3)} questions seeded, ` +
        `top probability ${(topProb * 100).toFixed(0)}%`
    );
  }

  console.log(`\n✅ Done. ${total} questions total in 'bcredupath.questions'.`);
  await mongoose.disconnect();
  rmSync(tempDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error("Seed failed:", err);
  rmSync(tempDir, { recursive: true, force: true });
  process.exit(1);
});
