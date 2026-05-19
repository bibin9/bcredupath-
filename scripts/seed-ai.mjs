// Claude-powered batch question generator.
// Run with: npm run seed:ai
// Optional flags:
//   --subjects=math,science,sst,english   (default: all in plan)
//   --limit=N                              (cap total questions; useful for testing)
//   --dry-run                              (print plan + cost estimate, don't call API)
//   --keep-existing                        (don't delete previous AI-generated questions)

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
const DRY = args["dry-run"] || false;
const KEEP = args["keep-existing"] || false;
const SUBJECTS_FILTER = args.subjects ? String(args.subjects).split(",") : null;
const LIMIT = args.limit ? Number(args.limit) : Infinity;

const MODEL = "claude-sonnet-4-6";
// Sonnet pricing (per million tokens) — see https://www.anthropic.com/pricing
const PRICE_IN_PER_M = 3.0;
const PRICE_OUT_PER_M = 15.0;

const tempDir = mkdtempSync(join(tmpdir(), "bcr-ai-"));
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

const { CLASS_10_PLAN, CLASS_12_PLAN, planSummary } = await importTS("lib/seed/chapter-plan.ts");
const { TOPIC_WEIGHTS_CLASS_10 } = await importTS("lib/seed/topic-weights.ts");
const { MATH_10 } = await importTS("lib/seed/questions-math-10.ts");
const { SCIENCE_10 } = await importTS("lib/seed/questions-science-10.ts");

const TARGET_CLASS = args.class ? Number(args.class) : 10;
const sourcePlan = TARGET_CLASS === 12 ? CLASS_12_PLAN : CLASS_10_PLAN;
let plan = sourcePlan;
if (SUBJECTS_FILTER) {
  plan = plan.filter((c) => SUBJECTS_FILTER.includes(c.subject));
}
const summary = planSummary(plan);

console.log("\n────────────────────────────────────────");
console.log("  BCRedupath — AI Question Generator");
console.log("────────────────────────────────────────");
console.log(`  Model: ${MODEL}`);
console.log(`  Subjects: ${[...summary.bySubject.keys()].join(", ")}`);
console.log(`  Chapters: ${plan.length}`);
console.log(`  Target questions: ${Math.min(summary.total, LIMIT)}`);
const estTokens = plan.length * 4500; // ~4.5K output tokens per chapter prompt
const estCost = (plan.length * 600 * PRICE_IN_PER_M + estTokens * PRICE_OUT_PER_M) / 1_000_000;
console.log(`  Rough cost estimate: $${estCost.toFixed(2)}`);
console.log("────────────────────────────────────────\n");

if (DRY) {
  console.log("(dry-run) — exiting before any API call");
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

// Minimal Mongoose schema (avoid Next path aliasing)
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

function fewShotFor(subject) {
  const pool = subject === "math" ? MATH_10 : subject === "science" ? SCIENCE_10 : [];
  if (pool.length === 0) return "(no examples available — follow the schema strictly)";
  return pool
    .slice(0, 2)
    .map((q, i) => `EXAMPLE ${i + 1}:\n${JSON.stringify(simplifyExample(q), null, 2)}`)
    .join("\n\n");
}
function simplifyExample(q) {
  return {
    type: q.type,
    marks: q.marks,
    difficulty: q.difficulty,
    question: q.question,
    options: q.options,
    answer: q.answer,
    solution: {
      steps: q.solution.steps.slice(0, 220),
      commonMistakes: q.solution.commonMistakes,
      relatedConcepts: q.solution.relatedConcepts,
    },
    yearsAsked: q.yearsAsked,
    frequencyScore: q.frequencyScore,
    bloomLevel: q.bloomLevel,
    expectedTime: q.expectedTime,
  };
}

function buildPrompt(chapter) {
  const tm = chapter.typeMix ?? { MCQ: 3, SA: 2, LA: 2 };
  const mixLines = Object.entries(tm).map(([k, v]) => `  - ${k}: ${v}`).join("\n");
  return `You are an expert CBSE Class ${chapter.class} ${chapter.subject.toUpperCase()} teacher writing exam-style practice questions.

CHAPTER: ${chapter.chapter}
TOPICS TO ROTATE THROUGH: ${chapter.topics.join(", ")}

Generate EXACTLY ${chapter.count} questions matching this type mix (approximate):
${mixLines}

REQUIREMENTS:
- Match CBSE board-paper style and difficulty for Class ${chapter.class}.
- Use LaTeX in $...$ for inline math, $$...$$ for block math.
- For MCQs, give exactly 4 options. The "answer" field must be the index (0-3) of the correct option.
- For SA/LA, "answer" is a short string with the final answer; "solution.steps" has the working.
- Tag each question with "yearsAsked": pick 1-3 years from [2021, 2022, 2023, 2024, 2025] reflecting realistic exam patterns (rarer for newer chapters).
- "frequencyScore" 1-10 based on how often this topic appears in boards (use 7+ for high-yield topics).
- "difficulty" must be Easy / Medium / Hard / VeryHard.
- "marks": MCQ=1, AssertionReason=1, SA=2 or 3, LA=4 or 5, CaseStudy=4.
- "expectedTime" in seconds (MCQ ~45, SA ~180, LA ~480).
- "bloomLevel": Remember / Understand / Apply / Analyze / Evaluate / Create.
- "solution.commonMistakes": 1-3 specific traps students fall into.
- "solution.relatedConcepts": 1-3 short concept tags.

FEW-SHOT EXAMPLES (study the format and tone):

${fewShotFor(chapter.subject)}

Now output ONLY a JSON array of ${chapter.count} questions for "${chapter.chapter}". No prose before or after, no markdown code fences. Each object MUST have these exact keys:

type, marks, difficulty, question, options (string array of length 4 for MCQ, null otherwise), answer, solution { steps, commonMistakes, relatedConcepts }, yearsAsked, frequencyScore, bloomLevel, expectedTime, topic.

"topic" should be one of: ${chapter.topics.join(", ")}.`;
}

function safeParseJson(text) {
  // Strip code fences if Claude added them despite instructions
  let s = text.trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  // If model wraps in a { questions: [...] }, unwrap
  try {
    const parsed = JSON.parse(s);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed?.questions)) return parsed.questions;
    return null;
  } catch {
    // Last-ditch: find the first [ and last ]
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
  if (q.type === "MCQ") {
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
        max_tokens: 7000,
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
    console.error(`  ❌ ${chapter.subject}/${chapter.chapter} — could not parse JSON. First 200 chars:`);
    console.error("    ", text.slice(0, 200));
    return { questions: [], usage: resp.usage };
  }

  const valid = parsed.filter(validate);
  if (valid.length < parsed.length) {
    console.warn(`  ⚠  ${chapter.subject}/${chapter.chapter} — dropped ${parsed.length - valid.length} invalid Qs`);
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
    tags: ["ai-generated"],
    aiGenerated: true,
  }));

  return { questions: docs, usage: resp.usage };
}

async function pLimit(items, concurrency, fn) {
  const results = [];
  const queue = [...items];
  async function worker() {
    while (queue.length) {
      const item = queue.shift();
      if (!item) return;
      results.push(await fn(item));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
  console.log("→ connected to Mongo\n");

  if (!KEEP) {
    // Only clear AI questions for the target class — preserves Class 10 when seeding 12 and vice versa
    const del = await Question.deleteMany({ aiGenerated: true, class: TARGET_CLASS });
    console.log(`→ cleared ${del.deletedCount} previous AI docs for class ${TARGET_CLASS}\n`);
  }

  let totalInserted = 0;
  let totalInTokens = 0;
  let totalOutTokens = 0;

  const tasks = plan.map((chapter, i) => async () => {
    if (totalInserted >= LIMIT) return;
    const tag = `[${(i + 1).toString().padStart(2)}/${plan.length}]`;
    process.stdout.write(`${tag} ${chapter.subject.padEnd(8)} | ${chapter.chapter.slice(0, 36).padEnd(36)} → `);
    try {
      const { questions, usage } = await generateChapter(chapter);
      totalInTokens += usage.input_tokens;
      totalOutTokens += usage.output_tokens;
      if (questions.length === 0) {
        console.log("0 questions (parse failed)");
        return;
      }
      const insertable = questions.slice(0, Math.max(0, LIMIT - totalInserted));
      if (insertable.length === 0) return;
      await Question.insertMany(insertable, { ordered: false });
      totalInserted += insertable.length;
      const topProb = Math.max(...insertable.map((q) => q.predictedProbability));
      console.log(
        `${insertable.length.toString().padStart(2)} Qs | top ${(topProb * 100).toFixed(0)}% | ${
          usage.input_tokens
        }in/${usage.output_tokens}out`
      );
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  });

  // Sequential (concurrency=1) to stay under the 8K output tokens/min rate limit
  // on Anthropic's tier-0 plan. Throughput ~1 chapter / 20-30s; whole run ~25-35 min.
  await pLimit(tasks, 1, (fn) => fn());

  const cost = (totalInTokens * PRICE_IN_PER_M + totalOutTokens * PRICE_OUT_PER_M) / 1_000_000;
  console.log("\n────────────────────────────────────────");
  console.log(`✅ Inserted ${totalInserted} new AI-generated questions`);
  console.log(`   Tokens: ${totalInTokens} in / ${totalOutTokens} out`);
  console.log(`   Actual cost: $${cost.toFixed(2)}`);
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
  console.error("Seed failed:", err);
  rmSync(tempDir, { recursive: true, force: true });
  process.exit(1);
});
