import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/questions?status=unverified|verified|all&subject=&class=
 * Returns the next page of questions for the admin review queue.
 */
export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "unverified";
  const subject = searchParams.get("subject");
  const cls = searchParams.get("class");
  const limit = Math.min(Number(searchParams.get("limit") ?? 25), 100);
  const skip = Math.max(0, Number(searchParams.get("skip") ?? 0));

  const filter: Record<string, unknown> = {};
  if (status === "unverified") filter.verified = { $ne: true };
  if (status === "verified") filter.verified = true;
  if (subject) filter.subject = subject;
  if (cls) filter.class = Number(cls);

  await connectDB();
  const [items, total] = await Promise.all([
    Question.find(filter)
      .sort({ predictedProbability: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Question.countDocuments(filter),
  ]);

  return NextResponse.json({
    items: items.map((q) => ({
      _id: String(q._id),
      subject: q.subject,
      class: q.class,
      chapter: q.chapter,
      topic: q.topic,
      type: q.type,
      marks: q.marks,
      difficulty: q.difficulty,
      question: q.question,
      options: q.options,
      answer: q.answer,
      solution: q.solution,
      yearsAsked: q.yearsAsked,
      predictedProbability: q.predictedProbability,
      aiGenerated: q.aiGenerated ?? false,
      verified: q.verified ?? false,
    })),
    total,
  });
}
