"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StreakCounter({
  count,
  size = "md",
  className,
}: {
  count: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sz = size === "sm" ? "px-2.5 py-1 text-sm" : size === "lg" ? "px-4 py-2 text-lg" : "px-3 py-1.5 text-base";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold",
        "bg-neon-orange/15 border border-neon-orange/40 text-neon-orange",
        "shadow-[0_0_20px_rgba(255,122,61,0.35)]",
        sz,
        className
      )}
    >
      <Flame className={cn(size === "lg" ? "h-5 w-5" : "h-4 w-4", "animate-pulse-glow")} fill="currentColor" />
      <span className="stat-num">{count}</span>
    </motion.div>
  );
}
