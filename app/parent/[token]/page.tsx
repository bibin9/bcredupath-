import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { EmojiAvatar } from "@/components/shared/EmojiAvatar";
import { rankFromXP, RANK_EMOJI } from "@/lib/gamification";
import { Heatmap } from "@/components/analytics/Heatmap";
import { daysToBoards } from "@/lib/utils";
import { Flame, Sparkles, Trophy, Zap, BookOpen, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

/**
 * Public read-only progress page parents can view.
 * No login needed — auth is via the random token in the URL.
 * Shows just the parent-friendly summary, no PII beyond child's first name.
 */
export default async function ParentDashboard({ params }: { params: { token: string } }) {
  if (!params.token || params.token.length < 10) notFound();
  await connectDB();
  const user = await User.findOne({ parentShareToken: params.token }).lean();
  if (!user) notFound();

  const history = user.practiceHistory ?? [];
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
  const last7 = heatmap.slice(-7).reduce((s, d) => s + d.count, 0);
  const last7Days = heatmap.slice(-7).filter((d) => d.count > 0).length;
  const rank = rankFromXP(user.xp);
  const firstName = user.name.split(" ")[0];
  const daysLeft = daysToBoards();

  return (
    <main className="relative min-h-screen">
      <GradientBlobs />
      <div className="mx-auto max-w-3xl px-5 py-10 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <span className="pill-neon-cyan">
            <Sparkles className="h-3 w-3" /> Parent view · read-only
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            {firstName}'s study progress
          </h1>
          <p className="mt-1 text-sm text-white/65">
            <Flame className="mr-1 inline h-3.5 w-3.5 text-neon-orange" />
            {daysLeft} days to CBSE Boards 2026
          </p>
        </header>

        {/* Hero card */}
        <section className="card-glass mt-6">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <EmojiAvatar emoji={user.avatar} size="xl" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span className="pill-neon-cyan">Class {user.class}</span>
                {user.stream && (
                  <span className="pill-neon-purple">{user.stream.toUpperCase()}</span>
                )}
                <span className="pill-neon-yellow">
                  {RANK_EMOJI[rank]} {rank}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                <ParentStat emoji="⚡" label="Total XP" value={user.xp.toLocaleString("en-IN")} />
                <ParentStat emoji="🔥" label="Streak" value={`${user.streak} days`} />
                <ParentStat
                  emoji="🎯"
                  label="Accuracy"
                  value={`${Math.round(accuracy * 100)}%`}
                />
                <ParentStat emoji="📚" label="Sessions" value={totalSessions} />
              </div>
            </div>
          </div>
        </section>

        {/* This week */}
        <section className="card-glass mt-5">
          <h2 className="mb-3 font-display text-lg font-bold">This week</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <WeekStat label="Questions solved" value={last7} emoji="✏️" />
            <WeekStat label="Days practiced" value={`${last7Days} / 7`} emoji="📅" />
            <WeekStat
              label="Avg per active day"
              value={last7Days > 0 ? Math.round(last7 / last7Days) : 0}
              emoji="🎯"
            />
          </div>
          {last7 === 0 && (
            <div className="mt-3 rounded-2xl border border-neon-pink/30 bg-neon-pink/8 p-3 text-sm text-white/80">
              {firstName} hasn't practiced this week. A gentle nudge could help —
              consistency &gt; cramming.
            </div>
          )}
        </section>

        {/* Heatmap */}
        <section className="mt-5">
          <Heatmap days={heatmap} />
        </section>

        {/* Reassurance / what we don't share */}
        <section className="card-glass mt-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-neon-green" />
            <div className="text-sm text-white/75">
              <div className="font-semibold text-white">What this page shows</div>
              <p className="mt-1">
                Just summary stats — no individual question history, no chat content, no leaderboard ranks.
                Designed so {firstName} keeps their privacy while you stay informed.
              </p>
              <p className="mt-2 text-xs text-white/55">
                {firstName} can revoke your access anytime from their Profile settings.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-white/35">
          <p>
            Powered by <span className="font-semibold text-white/55">BCRedupath</span> ·{" "}
            <a href="/privacy" className="hover:text-white">Privacy</a> ·{" "}
            <a href="/terms" className="hover:text-white">Terms</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

function ParentStat({ emoji, label, value }: { emoji: string; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-2.5">
      <div className="flex items-center gap-2">
        <span className="text-base">{emoji}</span>
        <div className="min-w-0">
          <div className="stat-num text-base">{value}</div>
          <div className="text-[9px] uppercase tracking-widest text-white/45">{label}</div>
        </div>
      </div>
    </div>
  );
}

function WeekStat({ emoji, label, value }: { emoji: string; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="text-xl">{emoji}</div>
      <div className="stat-num mt-1 text-xl">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/45">{label}</div>
    </div>
  );
}
