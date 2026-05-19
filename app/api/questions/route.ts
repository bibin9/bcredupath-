import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const filter: Record<string, unknown> = {};
  const subject = searchParams.get("subject");
  const chapter = searchParams.get("chapter");
  const type = searchParams.get("type");
  const difficulty = searchParams.get("difficulty");
  const cls = searchParams.get("class");
  const year = searchParams.get("year");
  const marks = searchParams.get("marks");

  if (subject) filter.subject = subject;
  if (chapter) filter.chapter = chapter;
  if (type) filter.type = type;
  if (difficulty) filter.difficulty = difficulty;
  if (cls) filter.class = Number(cls);
  if (year) filter.yearsAsked = Number(year);
  if (marks) filter.marks = Number(marks);

  const sort = searchParams.get("sort") ?? "probability";
  const sortBy: Record<string, 1 | -1> =
    sort === "probability"
      ? { predictedProbability: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : sort === "marks"
      ? { marks: -1 }
      : { predictedProbability: -1 };

  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);
  const skip = Math.max(0, Number(searchParams.get("skip") ?? 0));

  const [items, total] = await Promise.all([
    Question.find(filter).sort(sortBy).skip(skip).limit(limit).lean(),
    Question.countDocuments(filter),
  ]);

  // Group chapters with counts (for the sidebar)
  const chapters = subject
    ? await Question.aggregate([
        { $match: { subject, ...(cls ? { class: Number(cls) } : {}) } },
        {
          $group: {
            _id: "$chapter",
            count: { $sum: 1 },
            avgProb: { $avg: "$predictedProbability" },
          },
        },
        { $sort: { avgProb: -1 } },
      ])
    : [];

  return NextResponse.json({ items, total, chapters });
}
