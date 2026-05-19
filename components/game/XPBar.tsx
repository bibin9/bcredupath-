"use client";

import { motion } from "framer-motion";
import { xpToNextLevel } from "@/lib/gamification";
import { cn } from "@/lib/utils";

export function XPBar({
  xp,
  className,
  showLabel = true,
}: {
  xp: number;
  className?: string;
  showLabel?: boolean;
}) {
  const { level, current, needed, percent } = xpToNextLevel(xp);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-white/70">
            Lvl <span className="stat-num text-white">{level}</span>
          </span>
          <span className="stat-num text-white/60">
            {current} / {needed} XP
          </span>
        </div>
      )}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-grad-pink-purple shadow-glow-pink"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>
    </div>
  );
}
