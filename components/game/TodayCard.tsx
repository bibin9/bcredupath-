"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ArrowRight, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Today" widget — shows where the student is in their daily ritual:
 * streak status (active / at-risk / broken), today's challenge progress,
 * one-tap actions to fix.
 */
export function TodayCard({
  streak,
  practicedToday,
  challengeDone,
  challengeQuestions,
}: {
  streak: number;
  practicedToday: boolean;
  challengeDone: boolean;
  challengeQuestions: number;
}) {
  const streakAtRisk = streak > 0 && !practicedToday;
  const streakBroken = streak === 0;

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-4xl border p-5 md:p-6",
        streakAtRisk
          ? "border-neon-pink/40 bg-gradient-to-br from-neon-pink/15 via-bg-2 to-neon-yellow/10 shadow-glow-pink"
          : streakBroken
            ? "border-white/[0.10] bg-gradient-to-br from-bg-2 via-bg-2 to-white/[0.02]"
            : "border-neon-green/30 bg-gradient-to-br from-neon-green/10 via-bg-2 to-neon-cyan/10 shadow-glow-green"
      )}
    >
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-neon-yellow/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={
              streakAtRisk
                ? { scale: [1, 1.12, 1], rotate: [-2, 2, -2] }
                : streakBroken
                  ? { opacity: 0.4 }
                  : { scale: [1, 1.05, 1] }
            }
            transition={{ duration: streakAtRisk ? 0.8 : 2, repeat: Infinity }}
            className="text-5xl md:text-6xl"
          >
            {streakBroken ? "💤" : "🔥"}
          </motion.div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-black md:text-4xl">
                {streak}
              </span>
              <span className="text-sm font-semibold text-white/65">
                day{streak !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-xs text-white/55">
              {streakBroken
                ? "Start a streak today"
                : streakAtRisk
                  ? "Streak at risk — practice now"
                  : "Streak active · keep it"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!challengeDone && (
            <Link
              href="/dashboard/practice/daily-challenge"
              className="inline-flex items-center gap-2 rounded-2xl border border-neon-yellow/40 bg-neon-yellow/10 px-3 py-2 text-xs font-semibold text-neon-yellow transition-all hover:border-neon-yellow/70 hover:bg-neon-yellow/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Daily challenge · {challengeQuestions} Qs
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
          <Link
            href="/dashboard/predictor"
            className={cn(
              "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold transition-all",
              streakAtRisk
                ? "border-neon-pink/50 bg-neon-pink/15 text-white hover:bg-neon-pink/25"
                : "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20"
            )}
          >
            <Flame className="h-3.5 w-3.5" />
            {streakAtRisk ? "Save streak — Hot 20" : "Hot 20 today"}
            <ArrowRight className="h-3 w-3" />
          </Link>
          {challengeDone && (
            <span className="inline-flex items-center gap-1 rounded-full bg-neon-green/15 px-2.5 py-1 text-[10px] font-bold text-neon-green">
              <Target className="h-3 w-3" /> Today done ✓
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
