import { BADGES, type BadgeId } from "@/lib/gamification";
import { cn } from "@/lib/utils";

const colorMap = {
  pink: "from-neon-pink/30 to-neon-pink/5 border-neon-pink/30 shadow-glow-pink",
  cyan: "from-neon-cyan/30 to-neon-cyan/5 border-neon-cyan/30 shadow-glow-cyan",
  green: "from-neon-green/30 to-neon-green/5 border-neon-green/30 shadow-glow-green",
  yellow: "from-neon-yellow/30 to-neon-yellow/5 border-neon-yellow/30 shadow-glow-yellow",
  purple: "from-neon-purple/30 to-neon-purple/5 border-neon-purple/30 shadow-glow-purple",
};

export function BadgeChip({
  id,
  unlocked = true,
  size = "md",
  className,
}: {
  id: BadgeId;
  unlocked?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const badge = BADGES[id];
  if (!badge) return null;
  const sz = size === "sm" ? "p-2.5 text-xl" : size === "lg" ? "p-5 text-4xl" : "p-3.5 text-2xl";

  return (
    <div
      title={`${badge.name} — ${badge.description}`}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl border bg-gradient-to-br transition-transform hover:scale-110",
        unlocked ? colorMap[badge.color] : "from-white/[0.03] to-transparent border-white/[0.08] grayscale opacity-40",
        sz,
        className
      )}
    >
      <span>{badge.emoji}</span>
    </div>
  );
}
