/**
 * XP, levels, streaks and badges.
 * Pure functions — call from API routes after a practice submit.
 */

export const XP_BY_MARKS: Record<number, number> = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
};

export const BONUS_XP = {
  streakDay: 50,
  dailyChallenge: 100,
  firstTryCorrect: 25,
  speed: 10, // < 30s
} as const;

export function xpForQuestion(marks: number, opts?: {
  firstTry?: boolean;
  fastSeconds?: number;
}): number {
  let xp = XP_BY_MARKS[marks] ?? 10;
  if (opts?.firstTry) xp += BONUS_XP.firstTryCorrect;
  if (opts?.fastSeconds !== undefined && opts.fastSeconds < 30) {
    xp += BONUS_XP.speed;
  }
  return xp;
}

/** level = floor(sqrt(xp / 100)) */
export function levelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 100));
}

export function xpForLevel(level: number): number {
  return level * level * 100;
}

export function xpToNextLevel(xp: number): {
  level: number;
  current: number;
  needed: number;
  percent: number;
} {
  const level = levelFromXP(xp);
  const floor = xpForLevel(level);
  const ceil = xpForLevel(level + 1);
  const current = xp - floor;
  const needed = ceil - floor;
  return {
    level,
    current,
    needed,
    percent: Math.min(100, (current / needed) * 100),
  };
}

export type Rank = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

export function rankFromXP(xp: number): Rank {
  if (xp >= 15001) return "Diamond";
  if (xp >= 7001) return "Platinum";
  if (xp >= 3001) return "Gold";
  if (xp >= 1001) return "Silver";
  return "Bronze";
}

export const RANK_EMOJI: Record<Rank, string> = {
  Bronze: "🥉",
  Silver: "🥈",
  Gold: "🥇",
  Platinum: "💎",
  Diamond: "💠",
};

/* ───────────── Streaks ───────────── */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Returns the updated streak given the user's last active date. */
export function updateStreak(
  currentStreak: number,
  lastActiveDate: Date | null,
  now = new Date()
): { streak: number; broken: boolean; sameDay: boolean } {
  if (!lastActiveDate) return { streak: 1, broken: false, sameDay: false };

  const sameDay = isSameDay(lastActiveDate, now);
  if (sameDay) return { streak: currentStreak, broken: false, sameDay: true };

  const yesterday = new Date(now.getTime() - MS_PER_DAY);
  if (isSameDay(lastActiveDate, yesterday)) {
    return { streak: currentStreak + 1, broken: false, sameDay: false };
  }
  return { streak: 1, broken: true, sameDay: false };
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

/* ───────────── Badges ───────────── */

export type BadgeId =
  | "first-step"
  | "on-fire"
  | "unstoppable"
  | "inferno"
  | "perfect-10"
  | "oracle"
  | "speedster"
  | "topper"
  | "subject-master"
  | "night-owl"
  | "early-bird"
  | "comeback-kid";

export type BadgeDef = {
  id: BadgeId;
  name: string;
  emoji: string;
  description: string;
  color: "pink" | "cyan" | "green" | "yellow" | "purple";
};

export const BADGES: Record<BadgeId, BadgeDef> = {
  "first-step": {
    id: "first-step",
    name: "First Step",
    emoji: "👣",
    description: "Solved your first question",
    color: "cyan",
  },
  "on-fire": {
    id: "on-fire",
    name: "On Fire",
    emoji: "🔥",
    description: "3-day streak",
    color: "pink",
  },
  unstoppable: {
    id: "unstoppable",
    name: "Unstoppable",
    emoji: "⚡",
    description: "7-day streak",
    color: "yellow",
  },
  inferno: {
    id: "inferno",
    name: "Inferno",
    emoji: "🌋",
    description: "30-day streak",
    color: "pink",
  },
  "perfect-10": {
    id: "perfect-10",
    name: "Perfect 10",
    emoji: "💯",
    description: "10/10 in a practice run",
    color: "green",
  },
  oracle: {
    id: "oracle",
    name: "Oracle",
    emoji: "🔮",
    description: "Used the AI Predictor",
    color: "purple",
  },
  speedster: {
    id: "speedster",
    name: "Speedster",
    emoji: "💨",
    description: "5 questions under 30s",
    color: "cyan",
  },
  topper: {
    id: "topper",
    name: "Topper",
    emoji: "👑",
    description: "Top 10 on the leaderboard",
    color: "yellow",
  },
  "subject-master": {
    id: "subject-master",
    name: "Subject Master",
    emoji: "🎓",
    description: "Cleared all chapters of a subject",
    color: "purple",
  },
  "night-owl": {
    id: "night-owl",
    name: "Night Owl",
    emoji: "🦉",
    description: "Practiced after 10pm 5 times",
    color: "purple",
  },
  "early-bird": {
    id: "early-bird",
    name: "Early Bird",
    emoji: "🌅",
    description: "Practiced before 7am 5 times",
    color: "yellow",
  },
  "comeback-kid": {
    id: "comeback-kid",
    name: "Comeback Kid",
    emoji: "🚀",
    description: "Returned after a 7-day break",
    color: "green",
  },
};

/** Decide which new badges a user just earned. Returns badge IDs to add. */
export function checkBadges(ctx: {
  alreadyHas: BadgeId[];
  totalAttempted: number;
  streak: number;
  lastScore?: { correct: number; total: number };
  usedPredictor?: boolean;
  hourOfDay?: number;
}): BadgeId[] {
  const earned: BadgeId[] = [];
  const has = new Set(ctx.alreadyHas);

  if (!has.has("first-step") && ctx.totalAttempted >= 1) earned.push("first-step");
  if (!has.has("on-fire") && ctx.streak >= 3) earned.push("on-fire");
  if (!has.has("unstoppable") && ctx.streak >= 7) earned.push("unstoppable");
  if (!has.has("inferno") && ctx.streak >= 30) earned.push("inferno");
  if (
    !has.has("perfect-10") &&
    ctx.lastScore &&
    ctx.lastScore.correct === ctx.lastScore.total &&
    ctx.lastScore.total >= 10
  ) {
    earned.push("perfect-10");
  }
  if (!has.has("oracle") && ctx.usedPredictor) earned.push("oracle");

  return earned;
}
