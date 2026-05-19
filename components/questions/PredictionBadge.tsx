import { Flame, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Visual badge based on predicted probability tier.
 *   ≥ 0.7 → "Very likely" (pink, fire)
 *   ≥ 0.5 → "Likely"      (yellow)
 *   ≥ 0.3 → "Possible"    (cyan)
 *   <  0.3 → "Low"         (muted)
 */
export function PredictionBadge({
  probability,
  size = "md",
  className,
}: {
  probability: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const pct = Math.round(probability * 100);
  const tier = tierFor(probability);

  const styles = {
    veryLikely: "bg-neon-pink/15 border-neon-pink/40 text-neon-pink shadow-glow-pink",
    likely: "bg-neon-yellow/15 border-neon-yellow/40 text-neon-yellow",
    possible: "bg-neon-cyan/15 border-neon-cyan/40 text-neon-cyan",
    low: "bg-white/5 border-white/10 text-white/55",
  }[tier];

  const Icon =
    tier === "veryLikely" ? Flame : tier === "likely" ? TrendingUp : Sparkles;

  const sz = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      title={`${pct}% predicted probability for Boards 2026`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-bold",
        styles,
        sz,
        className
      )}
    >
      <Icon className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      <span className="stat-num">{pct}%</span>
    </span>
  );
}

function tierFor(p: number): "veryLikely" | "likely" | "possible" | "low" {
  if (p >= 0.7) return "veryLikely";
  if (p >= 0.5) return "likely";
  if (p >= 0.3) return "possible";
  return "low";
}
