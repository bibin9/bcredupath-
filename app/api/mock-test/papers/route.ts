import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { MockPaper } from "@/models/MockPaper";

export const dynamic = "force-dynamic";

/**
 * GET /api/mock-test/papers?subject=math
 * → 20 paper headers + the student's attempt status per paper.
 */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() }).lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  if (!subject) return NextResponse.json({ error: "subject required" }, { status: 400 });

  const cls = (user.class ?? 10) as 10 | 12;

  const papers = await MockPaper.find({ subject, class: cls })
    .sort({ paperNumber: 1 })
    .select("paperNumber title totalMarks durationMinutes sections")
    .lean();

  // Look up attempt history (count of practiceHistory entries tagged with paperId)
  const attempts = (user.practiceHistory ?? []).filter((h) =>
    h.mode?.startsWith?.(`mock-paper:${subject}:`)
  );
  const attemptByPaper: Record<number, { count: number; bestScore?: number }> = {};
  for (const h of attempts) {
    const m = h.mode?.match(/^mock-paper:[^:]+:(\d+)$/);
    if (!m) continue;
    const pn = Number(m[1]);
    const cur = attemptByPaper[pn] ?? { count: 0 };
    cur.count++;
    if (h.score !== undefined && (cur.bestScore === undefined || h.score > cur.bestScore)) {
      cur.bestScore = h.score;
    }
    attemptByPaper[pn] = cur;
  }

  return NextResponse.json({
    papers: papers.map((p) => ({
      id: String(p._id),
      paperNumber: p.paperNumber,
      title: p.title,
      totalMarks: p.totalMarks,
      durationMinutes: p.durationMinutes,
      questionCount: p.sections.reduce((s, sec) => s + sec.questionIds.length, 0),
      attempts: attemptByPaper[p.paperNumber]?.count ?? 0,
      bestScore: attemptByPaper[p.paperNumber]?.bestScore,
    })),
  });
}
