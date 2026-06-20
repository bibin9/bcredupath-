import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { daysToBoards } from "@/lib/utils";
import { rankFromXP, RANK_EMOJI, xpToNextLevel, BADGES, type BadgeId } from "@/lib/gamification";
import { ensureTodayChallenge } from "@/lib/daily-challenge";
import { XPBar } from "@/components/game/XPBar";
import { StreakCounter } from "@/components/game/StreakCounter";
import { DailyChallengeCard } from "@/components/game/DailyChallengeCard";
import { SubjectCard } from "@/components/game/SubjectCard";
import { BadgeChip } from "@/components/game/BadgeChip";
import { TodayCard } from "@/components/game/TodayCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { BOARD_YEAR, ACADEMIC_YEAR_LABEL } from "@/lib/academic-year";

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const subjects =
    user.class === 10
      ? SUBJECTS_BY_CLASS[10].all ?? []
      : (user.stream && SUBJECTS_BY_CLASS[12][user.stream]) ?? [];

  const days = daysToBoards();
  const { level } = xpToNextLevel(user.xp);
  const rank = rankFromXP(user.xp);

  const hour = new Date().getHours();
  const greet =
    hour < 5 ? "Burning the midnight oil" :
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    hour < 21 ? "Good evening" :
    "Late grind hours";

  const totalAttempted = user.practiceHistory?.length ?? 0;
  const allBadges = Object.keys(BADGES) as BadgeId[];

  // Fetch (or auto-create) today's challenge
  let dailyChallengeProps = {
    subject: "math",
    questions: 10,
    xp: 100,
    participants: 0,
    completed: false,
  };
  try {
    const { challenge } = await ensureTodayChallenge((user.class ?? 10) as 10 | 12);
    dailyChallengeProps = {
      subject: challenge.subject,
      questions: challenge.questionIds.length,
      xp: challenge.xpReward,
      participants: challenge.participants.length,
      completed: challenge.participants.some((id) => String(id) === String(user._id)),
    };
  } catch {
    // No seeded questions yet — keep defaults
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-4xl border border-white/[0.08] bg-gradient-to-br from-neon-purple/15 via-bg-2 to-neon-cyan/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-neon-purple/20 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-neon-pink/15 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-neon-cyan">
                <Sparkles className="h-3 w-3" /> Class {user.class}
                {user.stream ? ` · ${user.stream.toUpperCase()}` : ""}
              </span>
              <span className="pill-neon-pink">
                Session {ACADEMIC_YEAR_LABEL}
              </span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
              {greet},{" "}
              <span className="grad-text">{user.name.split(" ")[0]}</span> 👋
            </h1>
            <p className="mt-2 text-sm text-white/65 md:text-base">
              CBSE {BOARD_YEAR} Boards in{" "}
              <span className="stat-num text-neon-yellow">{days}</span> days.
              Every question counts.
            </p>
          </div>

          <div className="glass-strong w-full max-w-sm rounded-3xl p-4 md:w-auto">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                  Your rank
                </div>
                <div className="font-display text-2xl font-bold">
                  {RANK_EMOJI[rank]} {rank}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                  Level
                </div>
                <div className="stat-num text-3xl text-neon-cyan">{level}</div>
              </div>
            </div>
            <XPBar xp={user.xp} />
            <div className="mt-3 flex items-center justify-between">
              <StreakCounter count={user.streak} size="sm" />
              <span className="text-xs text-white/55">
                <span className="stat-num text-white">{user.xp.toLocaleString("en-IN")}</span> total XP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY — streak status + one-tap actions */}
      <TodayCard
        streak={user.streak}
        practicedToday={(() => {
          const last = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
          if (!last) return false;
          const today = new Date();
          return (
            last.getDate() === today.getDate() &&
            last.getMonth() === today.getMonth() &&
            last.getFullYear() === today.getFullYear()
          );
        })()}
        challengeDone={dailyChallengeProps.completed}
        challengeQuestions={dailyChallengeProps.questions}
      />

      {/* STATS STRIP */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile emoji="📝" label="Attempted" value={totalAttempted} accent="cyan" />
        <StatTile emoji="🔥" label="Hot picks ready" value={20} accent="pink" />
        <StatTile emoji="🏅" label="Badges" value={user.badges.length} accent="yellow" />
        <StatTile emoji="🌍" label="State rank" value="—" accent="green" />
      </section>

      {/* DAILY + QUICK MODES */}
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <DailyChallengeCard {...dailyChallengeProps} />
        <div className="card-glass flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold">Quick modes 🎮</h3>
            <p className="mt-1 text-sm text-white/55">Pick your poison.</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <QuickMode href="/dashboard/predictor" emoji="🔮" label="Hot 20" tint="pink" />
            <QuickMode href="/dashboard/practice" emoji="⚡" label="Rapid Fire" tint="yellow" />
            <QuickMode href="/dashboard/practice" emoji="📅" label="PYQ Marathon" tint="cyan" />
            <QuickMode href="/dashboard/practice" emoji="🎲" label="Random" tint="green" />
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section>
        <SectionHeading
          title="Your subjects"
          subtitle="Tap to start a chapter"
          actionHref="/dashboard/bank"
          actionLabel="See all"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <SubjectCard
              key={s.id}
              id={s.id}
              name={s.name}
              emoji={s.emoji}
              color={s.color}
              progress={Math.floor(Math.random() * 35) + 5}
              predicted={Math.floor(Math.random() * 14) + 3}
            />
          ))}
        </div>
      </section>

      {/* BADGES */}
      <section>
        <SectionHeading
          title="Your badges"
          subtitle={`${user.badges.length} of ${allBadges.length} unlocked`}
          actionHref="/dashboard/profile"
          actionLabel="View all"
        />
        <div className="card-glass flex flex-wrap gap-3">
          {allBadges.map((id) => (
            <BadgeChip key={id} id={id} unlocked={user.badges.includes(id)} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────── Local sub-components ─────────── */

function StatTile({
  emoji,
  label,
  value,
  accent,
}: {
  emoji: string;
  label: string;
  value: number | string;
  accent: "cyan" | "pink" | "yellow" | "green";
}) {
  const ring = {
    cyan: "border-neon-cyan/25 hover:shadow-glow-cyan",
    pink: "border-neon-pink/25 hover:shadow-glow-pink",
    yellow: "border-neon-yellow/25 hover:shadow-glow-yellow",
    green: "border-neon-green/25 hover:shadow-glow-green",
  }[accent];
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border bg-white/[0.03] p-3.5 transition-shadow ${ring}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-2xl">
        {emoji}
      </div>
      <div className="min-w-0">
        <div className="stat-num text-xl">{value}</div>
        <div className="text-[11px] uppercase tracking-wider text-white/55">
          {label}
        </div>
      </div>
    </div>
  );
}

function QuickMode({
  href,
  emoji,
  label,
  tint,
}: {
  href: string;
  emoji: string;
  label: string;
  tint: "pink" | "cyan" | "yellow" | "green";
}) {
  const tints = {
    pink: "hover:border-neon-pink/40 hover:bg-neon-pink/8",
    cyan: "hover:border-neon-cyan/40 hover:bg-neon-cyan/8",
    yellow: "hover:border-neon-yellow/40 hover:bg-neon-yellow/8",
    green: "hover:border-neon-green/40 hover:bg-neon-green/8",
  }[tint];
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${tints}`}
    >
      <span className="text-2xl">{emoji}</span>
      <span>{label}</span>
    </Link>
  );
}

function SectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
        {subtitle && <p className="text-xs text-white/55 md:text-sm">{subtitle}</p>}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-neon-cyan hover:underline"
        >
          {actionLabel} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
