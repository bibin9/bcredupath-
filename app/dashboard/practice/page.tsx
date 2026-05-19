import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PRACTICE_MODES } from "@/lib/practice-modes";
import { StreakCounter } from "@/components/game/StreakCounter";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const tints: Record<string, string> = {
  pink: "from-neon-pink/20 to-neon-pink/0 border-neon-pink/30 hover:shadow-glow-pink",
  cyan: "from-neon-cyan/20 to-neon-cyan/0 border-neon-cyan/30 hover:shadow-glow-cyan",
  yellow:
    "from-neon-yellow/20 to-neon-yellow/0 border-neon-yellow/30 hover:shadow-glow-yellow",
  green: "from-neon-green/20 to-neon-green/0 border-neon-green/30 hover:shadow-glow-green",
  purple:
    "from-neon-purple/20 to-neon-purple/0 border-neon-purple/30 hover:shadow-glow-purple",
};

export default async function PracticeIndex() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const totalAttempts = user.practiceHistory?.length ?? 0;
  const lastRun = user.practiceHistory?.[user.practiceHistory.length - 1];

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <div>
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> Pick your battle
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Practice Modes 🎯
          </h1>
          <p className="mt-1 text-sm text-white/65">
            Solve. Earn XP. Build streak. Repeat.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StreakCounter count={user.streak} />
          <div className="text-right">
            <div className="stat-num text-2xl text-neon-cyan">{totalAttempts}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/45">
              past sessions
            </div>
          </div>
        </div>
      </header>

      {lastRun && (
        <div className="card-glass flex items-center gap-3 !p-4 text-sm">
          <Zap className="h-4 w-4 text-neon-yellow" />
          <span className="text-white/75">
            Last session:{" "}
            <span className="font-semibold text-white">
              {lastRun.score}/{lastRun.total}
            </span>{" "}
            in <span className="text-neon-yellow">{lastRun.mode}</span> for{" "}
            <span className="text-neon-yellow stat-num">+{lastRun.xpEarned}</span> XP
          </span>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(PRACTICE_MODES).map((m) => (
          <Link
            key={m.id}
            href={`/dashboard/practice/${m.id}`}
            className={cn(
              "group relative block overflow-hidden rounded-3xl border bg-gradient-to-br p-5 transition-all hover:-translate-y-0.5",
              tints[m.color]
            )}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3">
                {m.emoji}
              </div>
              <div className="pill !px-2 !py-0 text-[10px]">
                {m.questionCount} Qs
              </div>
            </div>
            <div className="font-display text-xl font-bold">{m.name}</div>
            <p className="mt-1 line-clamp-2 text-xs text-white/65">{m.tagline}</p>

            {m.perQuestionSeconds && (
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-neon-pink">
                ⏱ {m.perQuestionSeconds}s per Q
              </div>
            )}

            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
              Start <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
