import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";
import { DailyChallenge } from "@/models/DailyChallenge";
import type { IDailyChallenge } from "@/models/DailyChallenge";

export const SUBJECTS_ROTATION = ["math", "science", "sst", "english"] as const;
export const DAILY_CHALLENGE_SIZE = 10;
export const DAILY_CHALLENGE_XP = 100;

/**
 * Get-or-create today's challenge. Idempotent — safe to call concurrently.
 * Subject rotates by day-of-year so it's deterministic and global.
 */
export async function ensureTodayChallenge(classNum: 10 | 12 = 10) {
  await connectDB();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const dayOfYear = Math.floor(
    (today.getTime() - Date.UTC(today.getUTCFullYear(), 0, 0)) / 86400_000
  );
  const subject = SUBJECTS_ROTATION[dayOfYear % SUBJECTS_ROTATION.length];

  const existing = await DailyChallenge.findOne({ date: today });
  if (existing) return { challenge: existing, isNew: false };

  // Build a pool of top-prob questions and shuffle deterministically
  const pool = await Question.find({ subject, class: classNum })
    .sort({ predictedProbability: -1 })
    .limit(DAILY_CHALLENGE_SIZE * 3)
    .lean();

  if (pool.length === 0) {
    throw new Error(`No questions seeded for ${subject} class ${classNum}`);
  }

  const shuffled = seededShuffle(pool, dayOfYear).slice(0, DAILY_CHALLENGE_SIZE);

  // Use upsert with date as unique key — racing inserts collapse cleanly
  const challenge = await DailyChallenge.findOneAndUpdate(
    { date: today },
    {
      $setOnInsert: {
        date: today,
        subject,
        questionIds: shuffled.map((q) => q._id),
        xpReward: DAILY_CHALLENGE_XP,
        participants: [],
      },
    },
    { upsert: true, new: true }
  );

  return { challenge: challenge as IDailyChallenge, isNew: true };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let state = (seed * 9301 + 49297) % 233280;
  function rand() {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
