import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export const dynamic = "force-dynamic";

/**
 * GET /api/predict?subject=&class=&view=top|heatmap|sleepers&limit=
 *
 * - view=top      → ranked questions by predictedProbability (default)
 * - view=heatmap  → per-chapter aggregation (avg prob, count, hot count)
 * - view=sleepers → high-frequency questions not asked in 3+ years
 */
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const subject = searchParams.get("subject");
  const cls = Number(searchParams.get("class") ?? 10);
  const view = searchParams.get("view") ?? "top";
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);

  const baseFilter: Record<string, unknown> = { class: cls };
  if (subject) baseFilter.subject = subject;

  if (view === "heatmap") {
    const data = await Question.aggregate([
      { $match: baseFilter },
      {
        $group: {
          _id: { subject: "$subject", chapter: "$chapter" },
          count: { $sum: 1 },
          avgProb: { $avg: "$predictedProbability" },
          maxProb: { $max: "$predictedProbability" },
          hot: {
            $sum: { $cond: [{ $gte: ["$predictedProbability", 0.7] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          subject: "$_id.subject",
          chapter: "$_id.chapter",
          count: 1,
          avgProb: 1,
          maxProb: 1,
          hot: 1,
        },
      },
      { $sort: { avgProb: -1 } },
    ]);
    return NextResponse.json({ heatmap: data });
  }

  if (view === "sleepers") {
    const CURRENT_YEAR = 2026;
    // Pull candidate set, then filter in JS for sleeper criteria
    const raw = await Question.find({
      ...baseFilter,
      frequencyScore: { $gte: 7 },
    })
      .lean();

    const sleepers = raw
      .filter((q) => {
        const last = q.yearsAsked?.length ? Math.max(...q.yearsAsked) : CURRENT_YEAR - 10;
        return CURRENT_YEAR - last >= 3;
      })
      .sort((a, b) => b.predictedProbability - a.predictedProbability)
      .slice(0, limit);

    return NextResponse.json({ sleepers });
  }

  // default: top
  const [items, top20Marks] = await Promise.all([
    Question.find(baseFilter)
      .sort({ predictedProbability: -1 })
      .limit(limit)
      .lean(),
    Question.aggregate([
      { $match: baseFilter },
      { $sort: { predictedProbability: -1 } },
      { $limit: 20 },
      { $group: { _id: null, marks: { $sum: "$marks" } } },
    ]),
  ]);

  const expectedScore = (top20Marks[0]?.marks as number | undefined) ?? 0;
  return NextResponse.json({ items, expectedScore });
}
