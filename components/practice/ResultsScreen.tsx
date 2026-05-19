"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, RotateCw, Home, Trophy, Zap } from "lucide-react";
import { BADGES, type BadgeId } from "@/lib/gamification";
import { BadgeChip } from "@/components/game/BadgeChip";
import { cn } from "@/lib/utils";

export type SubmitResult = {
  ok: true;
  xpEarned: number;
  streakBonus: number;
  totalXP: number;
  correct: number;
  total: number;
  leveledUp: boolean;
  newLevel: number;
  previousLevel: number;
  streak: number;
  newBadges: BadgeId[];
};

export function ResultsScreen({
  result,
  modeName,
  modeId,
}: {
  result: SubmitResult;
  modeName: string;
  modeId: string;
}) {
  const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
  const grade = pct >= 90 ? "S" : pct >= 80 ? "A" : pct >= 65 ? "B" : pct >= 50 ? "C" : "D";
  const message =
    pct >= 90 ? "Boards 2026? You're scary 💀"
    : pct >= 80 ? "Crushed it. Keep this pace 🚀"
    : pct >= 65 ? "Solid. Now go after the mistakes."
    : pct >= 50 ? "Decent. The grind continues."
    : "Off day? Lock in tomorrow.";

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <motion.section
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "backOut" }}
        className="card-glass relative overflow-hidden text-center"
      >
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-purple/25 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-neon-pink/20 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-3xl bg-grad-pink-purple text-5xl shadow-glow-pink animate-pulse-glow">
            {pct >= 80 ? "🏆" : pct >= 50 ? "💪" : "📚"}
          </div>
          <div className="text-xs uppercase tracking-widest text-white/55">
            {modeName} complete
          </div>
          <h1 className="mt-1 font-display text-5xl font-black md:text-7xl">
            <span className="grad-text">{result.correct}</span>
            <span className="text-white/35"> / {result.total}</span>
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="pill-neon-yellow text-base">
              Grade <b className="ml-1 font-display">{grade}</b>
            </span>
            <span className="pill-neon-cyan text-base">
              <span className="stat-num">{pct}%</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-white/65">{message}</p>
        </div>
      </motion.section>

      {/* XP breakdown */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="card-glass"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-neon-yellow" />
            <span className="font-display text-lg font-bold">Earnings</span>
          </div>
          <div className="stat-num text-3xl text-neon-yellow">
            +{result.totalXP}
            <span className="ml-1 text-xs text-white/55">XP</span>
          </div>
        </div>
        <ul className="space-y-1 text-sm">
          <LineItem label="Question XP" value={result.xpEarned} />
          {result.streakBonus > 0 && (
            <LineItem label={`Streak bonus (day ${result.streak})`} value={result.streakBonus} accent="pink" />
          )}
        </ul>
        {result.leveledUp && (
          <div className="mt-3 rounded-2xl border border-neon-cyan/40 bg-neon-cyan/10 p-3 text-center text-sm">
            <Trophy className="mr-1 inline h-4 w-4 text-neon-cyan" />
            <b className="text-neon-cyan">Level up!</b>{" "}
            <span className="text-white/85">
              You hit level <b className="stat-num">{result.newLevel}</b>
            </span>
          </div>
        )}
      </motion.section>

      {/* New badges */}
      {result.newBadges.length > 0 && (
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="card-glass"
        >
          <div className="mb-3 font-display text-lg font-bold">
            New badges unlocked 🎖️
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {result.newBadges.map((id) => (
              <div key={id} className="flex items-center gap-3">
                <BadgeChip id={id} size="lg" />
                <div>
                  <div className="font-semibold">{BADGES[id].name}</div>
                  <div className="text-xs text-white/55">
                    {BADGES[id].description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href={`/dashboard/practice/${modeId}`} className="btn-neon flex-1">
          <RotateCw className="h-4 w-4" /> Play again
        </Link>
        <Link href="/dashboard/practice" className="btn-ghost flex-1">
          <Home className="h-4 w-4" /> All modes
        </Link>
        <button
          onClick={() => share(modeName, result.correct, result.total, result.totalXP)}
          className="btn-ghost"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>
    </div>
  );
}

function LineItem({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "pink" | "cyan";
}) {
  const color = accent === "pink" ? "text-neon-pink" : accent === "cyan" ? "text-neon-cyan" : "text-neon-yellow";
  return (
    <li className="flex items-center justify-between">
      <span className="text-white/65">{label}</span>
      <span className={cn("stat-num", color)}>+{value}</span>
    </li>
  );
}

async function share(mode: string, correct: number, total: number, xp: number) {
  const text = `Just scored ${correct}/${total} in ${mode} on BCRedupath — earned +${xp} XP toward CBSE Boards 2026 🔥`;
  const url = typeof window !== "undefined" ? window.location.origin : "";
  if (navigator.share) {
    try {
      await navigator.share({ title: "BCRedupath", text, url });
    } catch {
      // user cancelled
    }
  } else {
    await navigator.clipboard.writeText(`${text} ${url}`);
  }
}
