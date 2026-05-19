import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

/**
 * Personal analytics derived from user.practiceHistory + user.bookmarks.
 * No new collection — all data we need is already on the user doc.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() }).lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const history = user.practiceHistory ?? [];

  /* ---- Heatmap of practice days (last 12 weeks) ---- */
  const HEATMAP_DAYS = 12 * 7; // 84 days
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const heatmap: { date: string; count: number }[] = [];
  const dayMap = new Map<string, number>();
  for (let i = HEATMAP_DAYS - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400_000);
    const key = d.toISOString().slice(0, 10);
    dayMap.set(key, 0);
  }
  for (const h of history) {
    const key = new Date(h.date).toISOString().slice(0, 10);
    if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) ?? 0) + (h.total ?? 0));
  }
  for (const [date, count] of dayMap) heatmap.push({ date, count });

  /* ---- Per-mode breakdown ---- */
  const byMode = new Map<string, { sessions: number; correct: number; total: number; xp: number }>();
  for (const h of history) {
    const m = h.mode ?? "unknown";
    const cur = byMode.get(m) ?? { sessions: 0, correct: 0, total: 0, xp: 0 };
    cur.sessions += 1;
    cur.correct += h.score ?? 0;
    cur.total += h.total ?? 0;
    cur.xp += h.xpEarned ?? 0;
    byMode.set(m, cur);
  }
  const modes = Array.from(byMode.entries()).map(([mode, s]) => ({
    mode,
    sessions: s.sessions,
    correct: s.correct,
    total: s.total,
    accuracy: s.total > 0 ? s.correct / s.total : 0,
    xp: s.xp,
  }));

  /* ---- Overall stats ---- */
  const totalSessions = history.length;
  const totalCorrect = history.reduce((sum, h) => sum + (h.score ?? 0), 0);
  const totalAttempted = history.reduce((sum, h) => sum + (h.total ?? 0), 0);
  const accuracy = totalAttempted > 0 ? totalCorrect / totalAttempted : 0;
  const totalXP = user.xp ?? 0;
  const totalDaysActive = Array.from(dayMap.values()).filter((c) => c > 0).length;

  /* ---- 7-day trend ---- */
  const last7 = Array.from(dayMap.entries()).slice(-7);
  const last7Total = last7.reduce((sum, [, c]) => sum + c, 0);
  const prev7 = Array.from(dayMap.entries()).slice(-14, -7);
  const prev7Total = prev7.reduce((sum, [, c]) => sum + c, 0);
  const trend7 = prev7Total > 0 ? (last7Total - prev7Total) / prev7Total : last7Total > 0 ? 1 : 0;

  return NextResponse.json({
    streak: user.streak ?? 0,
    totalSessions,
    totalAttempted,
    totalCorrect,
    accuracy,
    totalXP,
    totalDaysActive,
    bookmarkCount: user.bookmarks?.length ?? 0,
    badgeCount: user.badges?.length ?? 0,
    heatmap,
    modes: modes.sort((a, b) => b.sessions - a.sessions),
    last7Total,
    trend7, // -1..+inf
  });
}
