import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { SUBJECTS_BY_CLASS } from "@/lib/constants";
import { daysToBoards, BOARDS_DATE } from "@/lib/utils";
import { Pomodoro } from "@/components/planner/Pomodoro";
import { Sparkles, CalendarDays, Target, BookOpen } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PlannerPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const days = daysToBoards();
  const weeksToBoards = Math.ceil(days / 7);

  const subjects =
    user.class === 10
      ? SUBJECTS_BY_CLASS[10].all ?? []
      : (user.stream && SUBJECTS_BY_CLASS[12][user.stream]) ?? [];

  // Per-subject question counts → suggested study minutes per week
  const counts = await Question.aggregate([
    { $match: { class: user.class } },
    { $group: { _id: "$subject", count: { $sum: 1 } } },
  ]);
  const byId = new Map<string, number>(counts.map((c) => [c._id, c.count]));
  const totalQs = counts.reduce((sum, c) => sum + c.count, 0);

  // Recent practice sessions for this week
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600_000);
  const thisWeek = (user.practiceHistory ?? []).filter(
    (h) => new Date(h.date) >= weekAgo
  );
  const sessionsThisWeek = thisWeek.length;
  const xpThisWeek = thisWeek.reduce((sum, h) => sum + h.xpEarned, 0);

  // Suggested daily questions = remaining days × subjects, capped reasonably
  const suggestedPerDay = Math.max(
    5,
    Math.min(30, Math.round((totalQs * 0.3) / Math.max(days, 1)))
  );

  const boardsLabel = BOARDS_DATE.toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-4xl border border-neon-cyan/25 bg-gradient-to-br from-neon-cyan/15 via-bg-2 to-neon-purple/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-cyan/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/3 h-48 w-48 rounded-full bg-neon-purple/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="pill-neon-cyan">
              <Sparkles className="h-3 w-3" /> Daily routine
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
              Study Planner <span className="grad-text-cyan">⏱️</span>
            </h1>
            <p className="mt-2 text-sm text-white/65 md:text-base">
              <CalendarDays className="mr-1 inline h-4 w-4" />
              Boards: <b className="text-white">{boardsLabel}</b>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center md:gap-3">
            <Tile label="Days left" value={days} accent="cyan" />
            <Tile label="Weeks" value={weeksToBoards} accent="purple" />
            <Tile label="Q/day target" value={suggestedPerDay} accent="pink" />
          </div>
        </div>
      </section>

      {/* MAIN GRID — Pomodoro + plan */}
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Pomodoro />

        <div className="space-y-5">
          {/* Today's goal */}
          <div className="card-glass">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-neon-yellow" />
              <h2 className="font-display text-lg font-bold">Today's goal</h2>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-black grad-text-yellow">{suggestedPerDay}</span>
              <span className="text-sm text-white/65">questions to stay on track</span>
            </div>
            <p className="mt-2 text-xs text-white/55">
              Based on remaining days and the size of your question bank. Solve more, finish earlier.
            </p>
            <Link href="/dashboard/practice" className="btn-neon mt-3 w-full !justify-center text-sm">
              Start practicing ⚡
            </Link>
          </div>

          {/* This week */}
          <div className="card-glass">
            <h2 className="mb-3 font-display text-lg font-bold">This week</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
                <div className="text-[10px] uppercase tracking-widest text-white/45">Sessions</div>
                <div className="stat-num mt-1 text-2xl">{sessionsThisWeek}</div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
                <div className="text-[10px] uppercase tracking-widest text-white/45">XP earned</div>
                <div className="stat-num mt-1 text-2xl text-neon-yellow">+{xpThisWeek}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECT ALLOCATION */}
      <section className="card-glass">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-neon-purple" />
          <h2 className="font-display text-lg font-bold">Subject allocation</h2>
          <span className="ml-auto text-xs text-white/55">{totalQs} questions across your subjects</span>
        </div>

        <div className="space-y-2.5">
          {subjects.map((s) => {
            const qCount = byId.get(s.id) ?? 0;
            const share = totalQs > 0 ? qCount / totalQs : 0;
            const suggestedMin = Math.round(share * suggestedPerDay * 10); // ~10 min per question
            return (
              <div key={s.id}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.emoji}</span>
                    <span className="font-semibold">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/55">
                    <span>{qCount} Qs</span>
                    <span>·</span>
                    <span className="text-white/85">~{suggestedMin}m / day</span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className="h-full rounded-full bg-grad-pink-purple"
                    style={{ width: `${Math.max(5, share * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TIPS */}
      <section className="card-glass">
        <h2 className="mb-3 font-display text-lg font-bold">Study tips that actually work</h2>
        <ul className="grid gap-2 text-sm text-white/80 sm:grid-cols-2">
          <Tip emoji="🍅" title="Pomodoro 25/5" text="Focus 25 min, break 5 min. Long break every 4 cycles." />
          <Tip emoji="📝" title="Active recall > rereading" text="Solve a question first, then check. 3× more retention." />
          <Tip emoji="🌅" title="Hard stuff at peak hours" text="Most students focus best 7-10am. Save easy review for evening." />
          <Tip emoji="😴" title="Sleep is part of studying" text="Memory consolidates in deep sleep. 7+ hrs is non-negotiable." />
        </ul>
      </section>
    </div>
  );
}

function Tile({ label, value, accent }: { label: string; value: number | string; accent: "cyan" | "purple" | "pink" }) {
  const colors = {
    cyan: "border-neon-cyan/30 shadow-glow-cyan",
    purple: "border-neon-purple/30 shadow-glow-purple",
    pink: "border-neon-pink/30 shadow-glow-pink",
  }[accent];
  return (
    <div className={`rounded-2xl border bg-white/[0.04] px-3 py-2 ${colors}`}>
      <div className="stat-num text-2xl font-black">{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-white/55">{label}</div>
    </div>
  );
}

function Tip({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="text-2xl">{emoji}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-white/65">{text}</div>
      </div>
    </li>
  );
}
