import Link from "next/link";
import { cn } from "@/lib/utils";

const ringColor: Record<string, string> = {
  "neon-cyan": "hover:border-neon-cyan/50 hover:shadow-glow-cyan",
  "neon-pink": "hover:border-neon-pink/50 hover:shadow-glow-pink",
  "neon-green": "hover:border-neon-green/50 hover:shadow-glow-green",
  "neon-yellow": "hover:border-neon-yellow/50 hover:shadow-glow-yellow",
  "neon-purple": "hover:border-neon-purple/50 hover:shadow-glow-purple",
};

const textColor: Record<string, string> = {
  "neon-cyan": "text-neon-cyan",
  "neon-pink": "text-neon-pink",
  "neon-green": "text-neon-green",
  "neon-yellow": "text-neon-yellow",
  "neon-purple": "text-neon-purple",
};

export function SubjectCard({
  id,
  name,
  emoji,
  color,
  progress = 0,
  predicted = 0,
}: {
  id: string;
  name: string;
  emoji: string;
  color: string;
  progress?: number;
  predicted?: number;
}) {
  return (
    <Link
      href={`/dashboard/bank/${id}`}
      className={cn(
        "group relative block rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06]",
        ringColor[color]
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3">
          {emoji}
        </div>
        {predicted > 0 && (
          <span className={cn("pill border-current", textColor[color])}>
            🔥 {predicted} hot
          </span>
        )}
      </div>
      <div className="font-display text-xl font-bold">{name}</div>
      <div className="mt-1 text-xs text-white/55">
        {progress > 0 ? `${progress}% mastered` : "Start your first chapter"}
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={cn("h-full rounded-full bg-grad-pink-purple")}
          style={{ width: `${progress}%` }}
        />
      </div>
    </Link>
  );
}
