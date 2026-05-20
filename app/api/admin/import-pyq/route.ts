import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";
import { TOPIC_WEIGHTS_CLASS_10 } from "@/lib/seed/topic-weights";
import { CURRENT_YEAR } from "@/lib/academic-year";

export const dynamic = "force-dynamic";
const XP_BY_MARKS: Record<number, number> = { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50 };

function computeProbability(
  q: { frequencyScore: number; yearsAsked: number[] },
  topicWeight: number
): number {
  const frequency = (q.frequencyScore / 10) * 0.4;
  const lastAsked = q.yearsAsked?.length ? Math.max(...q.yearsAsked) : CURRENT_YEAR - 10;
  const yearsSince = CURRENT_YEAR - lastAsked;
  const recencyRaw = yearsSince <= 2 ? 1.0 : yearsSince <= 4 ? 0.7 : 0.4;
  const recency = recencyRaw * 0.25;
  const topic = Math.max(0, Math.min(1, topicWeight)) * 0.2;
  const sleeperBoost = yearsSince >= 3 && q.frequencyScore >= 7 ? 0.15 : 0;
  return Math.min(1, frequency + recency + topic + sleeperBoost);
}

const RowSchema = z.object({
  subject: z.string().min(1),
  class: z.coerce.number().refine((n) => n === 10 || n === 12),
  chapter: z.string().min(1),
  topic: z.string().min(1),
  type: z.enum(["MCQ", "AssertionReason", "VSA", "SA", "LA", "CaseStudy", "HOTS"]),
  marks: z.coerce.number().int().min(1).max(6),
  difficulty: z.enum(["Easy", "Medium", "Hard", "VeryHard"]).default("Medium"),
  question: z.string().min(5),
  optionA: z.string().optional(),
  optionB: z.string().optional(),
  optionC: z.string().optional(),
  optionD: z.string().optional(),
  answer: z.string().min(1),
  solution: z.string().default(""),
  yearsAsked: z.string().default(""),
  examType: z.enum(["Board", "Sample", "Exemplar", "Mock"]).default("Board"),
  frequencyScore: z.coerce.number().int().min(1).max(10).default(7),
});

const Body = z.object({
  /** CSV with header row matching the RowSchema field names */
  csv: z.string().min(20),
  /** If true, the inserted questions are marked verified (trusted PYQ source) */
  markVerified: z.boolean().default(true),
});

/**
 * POST /api/admin/import-pyq
 *
 * Parses a CSV of real PYQs and inserts them into the question bank.
 *
 * CSV header: subject,class,chapter,topic,type,marks,difficulty,question,optionA,optionB,optionC,optionD,answer,solution,yearsAsked,examType,frequencyScore
 *
 * yearsAsked: semicolon-separated years, e.g. "2023;2024"
 * MCQ answer: index 0-3
 * SA/LA answer: final-answer string
 */
export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const body = await req.json().catch(() => null);
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", details: parsed.error.flatten() }, { status: 400 });
  }

  const rows = parseCsv(parsed.data.csv);
  if (rows.length === 0) {
    return NextResponse.json({ error: "CSV had no data rows" }, { status: 400 });
  }

  await connectDB();

  const inserted: { row: number; id: string }[] = [];
  const errors: { row: number; error: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i];
    const r = RowSchema.safeParse(raw);
    if (!r.success) {
      errors.push({ row: i + 2, error: r.error.issues[0]?.message ?? "Invalid row" });
      continue;
    }
    const d = r.data;
    const isMCQ = d.type === "MCQ";
    const options = isMCQ
      ? [d.optionA, d.optionB, d.optionC, d.optionD].filter((s): s is string => !!s)
      : null;
    if (isMCQ && options?.length !== 4) {
      errors.push({ row: i + 2, error: "MCQ needs all 4 options" });
      continue;
    }
    const answer = isMCQ ? Number(d.answer) : d.answer;
    const yearsAsked = d.yearsAsked
      .split(/[;|,]/)
      .map((y) => parseInt(y.trim(), 10))
      .filter((y) => Number.isFinite(y) && y > 2000 && y < 2030);

    const topicWeight =
      TOPIC_WEIGHTS_CLASS_10[d.subject]?.[d.chapter] ?? 0.5;
    const predictedProbability = computeProbability(
      { frequencyScore: d.frequencyScore, yearsAsked },
      topicWeight
    );

    try {
      const doc = await Question.create({
        subject: d.subject,
        class: d.class,
        chapter: d.chapter,
        topic: d.topic,
        type: d.type,
        marks: d.marks,
        difficulty: d.difficulty,
        question: d.question,
        options,
        answer,
        solution: {
          steps: d.solution,
          videoUrl: null,
          commonMistakes: [],
          relatedConcepts: [],
        },
        yearsAsked,
        examType: d.examType,
        region: "All-India",
        frequencyScore: d.frequencyScore,
        predictedProbability,
        bloomLevel: "Apply",
        expectedTime: isMCQ ? 45 : d.marks * 60,
        xpReward: XP_BY_MARKS[d.marks] ?? 10,
        tags: ["imported-pyq"],
        aiGenerated: false,
        verified: parsed.data.markVerified,
        verifiedBy: parsed.data.markVerified ? auth.user.email : undefined,
        verifiedAt: parsed.data.markVerified ? new Date() : undefined,
      });
      inserted.push({ row: i + 2, id: String(doc._id) });
    } catch (err) {
      errors.push({
        row: i + 2,
        error: err instanceof Error ? err.message : "Insert failed",
      });
    }
  }

  return NextResponse.json({
    insertedCount: inserted.length,
    errorCount: errors.length,
    errors: errors.slice(0, 20),
  });
}

/**
 * Minimal RFC-4180-ish CSV parser. Handles quoted fields with embedded commas
 * and double-quote escapes. Adequate for spreadsheet exports.
 */
function parseCsv(csv: string): Record<string, string>[] {
  const lines = csv.replace(/\r\n?/g, "\n").split("\n").filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map((h) => h.trim());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = (cells[idx] ?? "").trim();
    });
    rows.push(obj);
  }
  return rows;
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        cur += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        out.push(cur);
        cur = "";
      } else cur += c;
    }
  }
  out.push(cur);
  return out;
}
