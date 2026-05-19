import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";
import { Career } from "@/models/Career";
import { College } from "@/models/College";
import { ExamInfo } from "@/models/ExamInfo";
import { Scholarship } from "@/models/Scholarship";

export const dynamic = "force-dynamic";

/**
 * Lightweight global search across the 5 main collections.
 * Uses case-insensitive regex on the most relevant text field of each collection.
 * Caps results so the dropdown stays usable.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  await connectDB();
  const re = new RegExp(escapeRegex(q), "i");
  const PER_TYPE = 4;

  const [questions, careers, colleges, exams, scholarships] = await Promise.all([
    Question.find({ $or: [{ chapter: re }, { topic: re }, { question: re }] })
      .sort({ predictedProbability: -1 })
      .limit(PER_TYPE)
      .select("_id subject chapter topic class")
      .lean(),
    Career.find({ $or: [{ name: re }, { category: re }, { description: re }] })
      .limit(PER_TYPE)
      .select("_id name emoji category")
      .lean(),
    College.find({ $or: [{ name: re }, { city: re }, { state: re }] })
      .sort({ nirfRank: 1 })
      .limit(PER_TYPE)
      .select("_id name city state country nirfRank")
      .lean(),
    ExamInfo.find({ $or: [{ name: re }, { fullName: re }, { description: re }] })
      .limit(PER_TYPE)
      .select("_id name fullName category examDate")
      .lean(),
    Scholarship.find({ $or: [{ name: re }, { provider: re } ] })
      .limit(PER_TYPE)
      .select("_id name provider amount type")
      .lean(),
  ]);

  type Result =
    | { kind: "question"; id: string; title: string; subtitle: string; href: string }
    | { kind: "career"; id: string; title: string; subtitle: string; emoji: string; href: string }
    | { kind: "college"; id: string; title: string; subtitle: string; href: string }
    | { kind: "exam"; id: string; title: string; subtitle: string; href: string }
    | { kind: "scholarship"; id: string; title: string; subtitle: string; href: string };

  const results: Result[] = [
    ...careers.map((c) => ({
      kind: "career" as const,
      id: String(c._id),
      title: c.name,
      subtitle: c.category,
      emoji: c.emoji,
      href: `/dashboard/careers/${String(c._id)}`,
    })),
    ...colleges.map((c) => ({
      kind: "college" as const,
      id: String(c._id),
      title: c.name,
      subtitle: `${c.city ?? ""}${c.country && c.country !== "India" ? `, ${c.country}` : c.state ? `, ${c.state}` : ""}${c.nirfRank ? ` · NIRF #${c.nirfRank}` : ""}`,
      href: `/dashboard/colleges${c.country && c.country !== "India" ? `?country=${encodeURIComponent(c.country)}` : ""}`,
    })),
    ...exams.map((e) => ({
      kind: "exam" as const,
      id: String(e._id),
      title: e.name,
      subtitle: e.fullName ?? "",
      href: `/dashboard/exams`,
    })),
    ...scholarships.map((s) => ({
      kind: "scholarship" as const,
      id: String(s._id),
      title: s.name,
      subtitle: s.provider ?? "",
      href: `/dashboard/scholarships`,
    })),
    ...questions.map((q) => ({
      kind: "question" as const,
      id: String(q._id),
      title: `${q.chapter} · ${q.topic ?? ""}`,
      subtitle: `Class ${q.class} ${q.subject}`,
      href: `/dashboard/bank/${q.subject}?chapter=${encodeURIComponent(q.chapter)}`,
    })),
  ];

  return NextResponse.json({ results, query: q });
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
