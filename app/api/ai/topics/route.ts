import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export const dynamic = "force-dynamic";

/**
 * GET /api/ai/topics?subject=&class=
 *
 * Returns the chapter list (with question counts) and per-chapter
 * topics for the selector UI. Reads from the existing seeded questions.
 */
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  const cls = Number(searchParams.get("class") ?? 10);

  if (!subject) {
    return NextResponse.json({ error: "subject required" }, { status: 400 });
  }

  const data = await Question.aggregate([
    { $match: { subject, class: cls } },
    {
      $group: {
        _id: { chapter: "$chapter", topic: "$topic" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.chapter",
        count: { $sum: "$count" },
        topics: {
          $push: { topic: "$_id.topic", count: "$count" },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return NextResponse.json({
    chapters: data.map((c) => ({
      name: c._id,
      count: c.count,
      topics: c.topics
        .filter((t: { topic?: string }) => t.topic)
        .sort((a: { topic: string }, b: { topic: string }) => a.topic.localeCompare(b.topic)),
    })),
  });
}
