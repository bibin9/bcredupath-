// Retry seeder for specific failed chapters.
// Usage: npm run seed:ai:retry

import dotenv from "dotenv";
import mongoose from "mongoose";
import Anthropic from "@anthropic-ai/sdk";
import { build } from "esbuild";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";

dotenv.config({ path: ".env.local", override: true });

// Chapters to retry — split bigger ones into 2 halves to avoid token overflow
const RETRY_CHAPTERS = [
  {
    subject: "science",
    class: 10,
    chapter: "Life Processes",
    topics: ["Respiration", "Digestive system", "Photosynthesis"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Life Processes",
    topics: ["Circulation", "Excretion", "Transport in plants"],
    count: 6,
    typeMix: { MCQ: 2, SA: 2, LA: 2 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Carbon and its Compounds",
    topics: ["Functional groups", "Homologous series", "Ethanol"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
  {
    subject: "science",
    class: 10,
    chapter: "Carbon and its Compounds",
    topics: ["Soaps and detergents", "Acetic acid", "Saturated/unsaturated"],
    count: 5,
    typeMix: { MCQ: 2, SA: 2, LA: 1 },
  },
];

const tempDir = mkdtempSync(join(tmpdir(), "bcr-retry-"));
async function importTS(tsPath) {
  const out = join(tempDir, `${Math.random().toString(36).slice(2)}.mjs`);
  await build({ entryPoints: [tsPath], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "error" });
  return import(pathToFileURL(out).href);
}

const { TOPIC_WEIGHTS_CLASS_10 } = await importTS("lib/seed/topic-weights.ts");
const { SCIENCE_10 } = await importTS("lib/seed/questions-science-10.ts");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = "claude-sonnet-4-6";
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

function fewShot() {
  return SCIENCE_10.slice(0, 2)
    .map((q, i) => `EXAMPLE ${i + 1}:\n${JSON.stringify({ type: q.type, marks: q.marks, difficulty: q.difficulty, question: q.question, options: q.options, answer: q.answer, solution: q.solution, yearsAsked: q.yearsAsked, frequencyScore: q.frequencyScore }, null, 2)}`)
    .join("\n\n");
}

function buildPrompt(ch) {
  const tm = ch.typeMix;
  const mixLines = Object.entries(tm).map(([k, v]) => `  - ${k}: ${v}`).join("\n");
  return `You are an expert CBSE Class 10 SCIENCE teacher writing exam-style practice questions.

CHAPTER: ${ch.chapter}
SUBTOPIC FOCUS: ${ch.topics.join(", ")}

Generate EXACTLY ${ch.count} questions matching this type mix:
${mixLines}

REQUIREMENTS (strict):
- CBSE Class 10 board pattern.
- LaTeX in $...$ for inline math.
- MCQs: exactly 4 options, "answer" is index 0-3.
- "yearsAsked": 1-2 years from [2021, 2022, 2023, 2024, 2025].
- "frequencyScore" 1-10.
- "difficulty" Easy/Medium/Hard.
- "marks": MCQ=1, SA=2 or 3, LA=4 or 5.
- "expectedTime" in seconds.
- "bloomLevel": Apply/Understand/Analyze.
- solution.commonMistakes: 1-2 items.
- solution.relatedConcepts: 1-2 items.

EXAMPLES:

${fewShot()}

Output ONLY a JSON array of ${ch.count} objects. No markdown, no prose. Keys: type, marks, difficulty, question, options, answer, solution{steps,commonMistakes,relatedConcepts}, yearsAsked, frequencyScore, bloomLevel, expectedTime, topic.`;
}

function safeParseJson(text) {
  let s = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try { const p = JSON.parse(s); return Array.isArray(p) ? p : Array.isArray(p?.questions) ? p.questions : null; }
  catch {
    const start = s.indexOf("["); const end = s.lastIndexOf("]");
    if (start !== -1 && end > start) { try { return JSON.parse(s.slice(start, end + 1)); } catch {} }
    return null;
  }
}

function validate(q) {
  if (!q || typeof q !== "object" || typeof q.question !== "string") return false;
  if (!["MCQ", "AssertionReason", "VSA", "SA", "LA", "CaseStudy"].includes(q.type)) return false;
  if (q.type === "MCQ" && (!Array.isArray(q.options) || q.options.length !== 4)) return false;
  return !!q.solution?.steps;
}

async function callWithBackoff(fn, label) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try { return await fn(); }
    catch (err) {
      if (err?.status === 429 || err?.status === 529) {
        const ra = Number(err?.headers?.["retry-after"]);
        const waitS = Number.isFinite(ra) && ra > 0 ? ra : Math.min(60, 2 ** attempt * 5);
        process.stdout.write(`\n  ⏳ ${label}: rate-limited, waiting ${waitS}s... `);
        await new Promise((r) => setTimeout(r, waitS * 1000));
        continue;
      }
      throw err;
    }
  }
  throw new Error(`${label}: gave up`);
}

const questionSchema = new mongoose.Schema({
  subject: String, class: Number, chapter: String, topic: String, type: String,
  marks: Number, difficulty: String, question: String, options: [String],
  answer: mongoose.Schema.Types.Mixed,
  solution: { steps: String, videoUrl: String, commonMistakes: [String], relatedConcepts: [String] },
  yearsAsked: [Number], examType: String, region: String, frequencyScore: Number,
  predictedProbability: Number, bloomLevel: String, expectedTime: Number,
  xpReward: Number, tags: [String], aiGenerated: { type: Boolean, default: false },
}, { timestamps: { createdAt: true, updatedAt: false } });
const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
  console.log("→ connected\n");

  let inserted = 0;
  for (let i = 0; i < RETRY_CHAPTERS.length; i++) {
    const ch = RETRY_CHAPTERS[i];
    const label = `[${i + 1}/${RETRY_CHAPTERS.length}] ${ch.chapter} (${ch.topics[0]}…)`;
    process.stdout.write(label.padEnd(70) + " → ");
    try {
      const resp = await callWithBackoff(
        () => anthropic.messages.create({ model: MODEL, max_tokens: 5000, messages: [{ role: "user", content: buildPrompt(ch) }] }),
        ch.chapter
      );
      const text = resp.content.filter((c) => c.type === "text").map((c) => c.text).join("");
      const parsed = safeParseJson(text);
      if (!parsed) { console.log("parse failed"); continue; }
      const valid = parsed.filter(validate);
      const tw = TOPIC_WEIGHTS_CLASS_10[ch.subject]?.[ch.chapter] ?? 0.5;
      const docs = valid.map((q) => ({
        subject: ch.subject, class: ch.class, chapter: ch.chapter,
        topic: q.topic ?? ch.topics[0], type: q.type, marks: q.marks,
        difficulty: q.difficulty ?? "Medium", question: q.question,
        options: q.options ?? null, answer: q.answer,
        solution: { steps: q.solution.steps, videoUrl: null, commonMistakes: q.solution.commonMistakes ?? [], relatedConcepts: q.solution.relatedConcepts ?? [] },
        yearsAsked: q.yearsAsked ?? [], examType: "Mock", region: "All-India",
        frequencyScore: q.frequencyScore ?? 5,
        predictedProbability: computeProbability(q, tw),
        bloomLevel: q.bloomLevel ?? "Apply", expectedTime: q.expectedTime ?? 120,
        xpReward: XP_BY_MARKS[q.marks] ?? 10, tags: ["ai-generated"], aiGenerated: true,
      }));
      if (docs.length === 0) { console.log("0 valid"); continue; }
      await Question.insertMany(docs, { ordered: false });
      inserted += docs.length;
      console.log(`${docs.length} Qs added`);
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  }

  console.log(`\n✅ Retry done — ${inserted} questions added`);
  await mongoose.disconnect();
  rmSync(tempDir, { recursive: true, force: true });
}

main().catch((err) => { console.error("failed:", err); rmSync(tempDir, { recursive: true, force: true }); process.exit(1); });
