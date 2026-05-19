import Link from "next/link";
import { ArrowRight, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_LABEL: Record<string, { name: string; emoji: string }> = {
  math: { name: "Mathematics", emoji: "📐" },
  science: { name: "Science", emoji: "🔬" },
  sst: { name: "Social Science", emoji: "🌍" },
  english: { name: "English", emoji: "📖" },
  hindi: { name: "Hindi", emoji: "📜" },
};

export function DailyChallengeCard({
  subject = "math",
  questions = 10,
  xp = 100,
  participants = 0,
  completed = false,
}: {
  subject?: string;
  questions?: number;
  xp?: number;
  participants?: number;
  completed?: boolean;
}) {
  const meta = SUBJECT_LABEL[subject] ?? { name: subject, emoji: "🎯" };

  return (
    <Link
      href="/dashboard/practice/daily-challenge"
      className={cn(
        "group relative block overflow-hidden rounded-3xl border p-6 transition-all hover:-translate-y-0.5",
        completed
          ? "border-neon-green/40 bg-gradient-to-br from-neon-green/15 via-bg-2 to-transparent shadow-glow-green"
          : "border-neon-pink/30 bg-gradient-to-br from-neon-pink/15 via-neon-purple/10 to-transparent shadow-glow-pink"
      )}
    >
      <div className={cn(
        "absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl",
        completed ? "bg-neon-green/20" : "bg-neon-pink/20"
      )} />
      <div className={cn(
        "absolute -bottom-16 right-1/3 h-40 w-40 rounded-full blur-3xl",
        completed ? "bg-neon-cyan/20" : "bg-neon-purple/25"
      )} />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className={cn(
            "mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
            completed
              ? "border-neon-green/40 bg-neon-green/15 text-neon-green"
              : "border-neon-pink/40 bg-neon-pink/15 text-neon-pink"
          )}>
            {completed ? (
              <>
                <Check className="h-3 w-3" /> Completed
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-pink shadow-glow-pink" />
                Daily Challenge
              </>
            )}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight">
            {questions} {meta.name} questions
          </h3>
          {completed ? (
            <p className="mt-1 text-sm text-neon-green">
              Done! Come back tomorrow for another round.
            </p>
          ) : (
            <p className="mt-1 text-sm text-white/65">
              Complete to earn <span className="font-bold text-neon-yellow">+{xp} XP</span> bonus
            </p>
          )}
          {participants > 0 && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-white/55">
              <Users className="h-3.5 w-3.5" />
              <span>
                <span className="stat-num text-white/85">{participants.toLocaleString("en-IN")}</span>{" "}
                {participants === 1 ? "student has" : "students have"} played today
              </span>
            </div>
          )}
        </div>

        <div className="hidden shrink-0 sm:block">
          <div className={cn(
            "flex h-20 w-20 items-center justify-center rounded-3xl text-4xl",
            completed
              ? "bg-grad-green-cyan shadow-glow-green"
              : "bg-grad-pink-purple shadow-glow-pink animate-float"
          )}>
            {completed ? "✅" : meta.emoji}
          </div>
        </div>
      </div>

      <div className={cn(
        "relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold",
        completed ? "text-neon-green" : "text-neon-pink"
      )}>
        {completed ? "Replay for practice" : "Start now"}{" "}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
