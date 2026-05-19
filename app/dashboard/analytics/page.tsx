import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Heatmap } from "@/components/analytics/Heatmap";
import { rankFromXP, RANK_EMOJI, xpToNextLevel } from "@/lib/gamification";
import { TrendingUp, TrendingDown, Sparkles, Target, Flame, Trophy, Zap, BookOpen } from "lucide-react";
import { PRACTICE_MODES } from "@/lib/practice-modes";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const history = user.practiceHistory ?? [];

  /* Compute everything inline so we don't need a separate API call */
  const HEATMAP_DAYS = 12 * 7;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const dayMap = new Map<string, number>();
  for (let i = HEATMAP_DAYS - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400_000);
    dayMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const h of history) {
    const key = new Date(h.date).toISOString().slice(0, 10);
    if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) ?? 0) + (h.total ?? 0));
  }
  const heatmap = Array.from(dayMap.entries()).map(([date, count]) => ({ date, count }));

  const totalSessions = history.length;
  const totalCorrect = history.reduce((s, h) => s + (h.score ?? 0), 0);
  const totalAttempted = history.reduce((s, h) => s + (h.total ?? 0), 0);
  const accuracy = totalAttempted > 0 ? totalCorrect / totalAttempted : 0;
  const totalDaysActive = heatmap.filter((d) => d.count > 0).length;
  const last7Total = heatmap.slice(-7).reduce((s, d) => s + d.count, 0);
  const prev7Total = heatmap.slice(-14, -7).reduce((s, d) => s + d.count, 0);
  const trend7 = prev7Total > 0 ? (last7Total - prev7Total) / prev7Total : last7Total > 0 ? 1 : 0;

  // Per-mode breakdown
  const byMode = new Map<string, { sessions: number; correct: number; total: number; xp: number }>();
  for (const h of history) {
    const m = h.mode ?? "unknown";
    const c = byMode.get(m) ?? { sessions: 0, correct: 0, total: 0, xp: 0 };
    c.sessions++;
    c.correct += h.score ?? 0;
    c.total += h.total ?? 0;
    c.xp += h.xpEarned ?? 0;
    byMode.set(m, c);
  }
  const modes = Array.from(byMode.entries())
    .map(([m, s]) => ({
      mode: m,
      ...s,
      accuracy: s.total > 0 ? s.correct / s.total : 0,
    }))
    .sort((a, b) => b.sessions - a.sessions);

  const rank = rankFromXP(user.xp);
  const { level } = xpToNextLevel(user.xp);

  // Quick "weak topic" indicator if any mode has < 50% accuracy
  const weakMode = modes.find((m) => m.total >= 5 && m.accuracy < 0.5);

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-4xl border border-neon-cyan/25 bg-gradient-to-br from-neon-cyan/15 via-bg-2 to-neon-purple/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-cyan/20 blur-3xl" />
        <div className="relative">
          <span className="pill-neon-cyan">
            <Sparkles className="h-3 w-3" /> Your study, by the numbers
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            My Progress <span className="grad-text-cyan">📊</span>
          </h1>
          <p className="mt-2 text-sm text-white/65 md:text-base">
            Where you've been, where you're at, where to focus.
          </p>
        </div>
      </header>

      {/* HEADLINE STATS */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile emoji="⚡" label="Total XP" value={user.xp.toLocaleString("en-IN")} tone="yellow" />
        <StatTile emoji={RANK_EMOJI[rank]} label="Rank" value={rank} sub={`Lvl ${level}`} tone="pink" />
        <StatTile emoji="🔥" label="Streak" value={`${user.streak} days`} tone="orange" />
        <StatTile
          emoji="🎯"
          label="Accuracy"
          value={`${Math.round(accuracy * 100)}%`}
          sub={`${totalCorrect}/${totalAttempted}`}
          tone="green"
        />
      </div>

      {/* HEATMAP */}
      <Heatmap days={heatmap} />

      {/* 7-DAY TREND + STATS */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="card-glass">
          <div className="mb-2 flex items-center gap-2">
            {trend7 >= 0 ? (
              <TrendingUp className="h-4 w-4 text-neon-green" />
            ) : (
              <TrendingDown className="h-4 w-4 text-neon-pink" />
            )}
            <span className="font-display text-base font-bold">7-day trend</span>
          </div>
          <div className="stat-num text-3xl">
            {last7Total}
            <span className="ml-2 text-sm text-white/55">questions</span>
          </div>
          <div className={`mt-1 text-xs ${trend7 >= 0 ? "text-neon-green" : "text-neon-pink"}`}>
            {trend7 >= 0 ? "+" : ""}
            {Math.round(trend7 * 100)}% vs previous week
          </div>
        </div>

        <div className="card-glass">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-neon-cyan" />
            <span className="font-display text-base font-bold">Sessions</span>
          </div>
          <div className="stat-num text-3xl">{totalSessions}</div>
          <div className="mt-1 text-xs text-white/55">across {totalDaysActive} active days</div>
        </div>

        <div className="card-glass">
          <div className="mb-2 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-neon-yellow" />
            <span className="font-display text-base font-bold">Badges</span>
          </div>
          <div className="stat-num text-3xl">{user.badges.length}</div>
          <div className="mt-1 text-xs text-white/55">unlocked</div>
        </div>
      </div>

      {/* WEAK MODE CALLOUT */}
      {weakMode && (
        <div className="card-glass !border-neon-pink/30 !bg-neon-pink/8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-pink/15 text-neon-pink">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold">Focus area detected</h3>
              <p className="mt-1 text-sm text-white/75">
                Your accuracy in <b className="text-white">{weakMode.mode}</b> is{" "}
                <b className="text-neon-pink">{Math.round(weakMode.accuracy * 100)}%</b>. Drilling
                this mode more (or its underlying chapters) is your biggest leverage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE BREAKDOWN */}
      <section className="card-glass">
        <h2 className="mb-3 font-display text-lg font-bold">Mode breakdown</h2>
        {modes.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center text-sm text-white/55">
            No practice sessions yet. Run a quick mode to populate this.
          </div>
        ) : (
          <ul className="space-y-2">
            {modes.map((m) => {
              const cfg = (PRACTICE_MODES as Record<string, { name: string; emoji: string }>)[m.mode];
              const label = cfg?.name ?? m.mode;
              const emoji = cfg?.emoji ?? "📝";
              const acc = Math.round(m.accuracy * 100);
              return (
                <li
                  key={m.mode}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-xl">
                    {emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-[11px] text-white/55">
                      {m.sessions} sessions · {m.correct}/{m.total} correct · {m.xp} XP earned
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`stat-num text-lg ${
                        acc >= 75
                          ? "text-neon-green"
                          : acc >= 50
                          ? "text-neon-yellow"
                          : "text-neon-pink"
                      }`}
                    >
                      {acc}%
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/45">
                      accuracy
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatTile({
  emoji,
  label,
  value,
  sub,
  tone,
}: {
  emoji: string;
  label: string;
  value: string | number;
  sub?: string;
  tone: "yellow" | "pink" | "orange" | "green";
}) {
  const ring = {
    yellow: "border-neon-yellow/25 hover:shadow-glow-yellow",
    pink: "border-neon-pink/25 hover:shadow-glow-pink",
    orange: "border-neon-orange/25",
    green: "border-neon-green/25 hover:shadow-glow-green",
  }[tone];
  return (
    <div className={`rounded-2xl border bg-white/[0.03] p-4 transition-shadow ${ring}`}>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl">{emoji}</span>
        <div className="min-w-0">
          <div className="stat-num text-2xl">{value}</div>
          {sub && <div className="text-[10px] text-white/45">{sub}</div>}
        </div>
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-white/55">{label}</div>
    </div>
  );
}
