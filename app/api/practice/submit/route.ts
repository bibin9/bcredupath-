import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { DailyChallenge } from "@/models/DailyChallenge";
import {
  levelFromXP,
  rankFromXP,
  updateStreak,
  checkBadges,
  type BadgeId,
  xpForQuestion,
} from "@/lib/gamification";

export const dynamic = "force-dynamic";

const AttemptSchema = z.object({
  questionId: z.string(),
  correct: z.boolean(),
  marks: z.number().int().min(1).max(6),
  timeSpent: z.number().int().min(0),
  firstTry: z.boolean().default(true),
});

const BodySchema = z.object({
  mode: z.string(),
  attempts: z.array(AttemptSchema).min(1).max(50),
  usedPredictor: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { mode, attempts, usedPredictor } = parsed.data;
  const correctCount = attempts.filter((a) => a.correct).length;

  // Total XP earned: only correct attempts award the base XP (with first-try / speed bonuses).
  let xpEarned = 0;
  for (const a of attempts) {
    if (!a.correct) continue;
    xpEarned += xpForQuestion(a.marks, {
      firstTry: a.firstTry,
      fastSeconds: a.timeSpent,
    });
  }

  // Daily-challenge: award +100 XP bonus and register participation (idempotent)
  let dailyChallengeBonus = 0;
  if (mode === "daily-challenge") {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const challenge = await DailyChallenge.findOne({ date: today });
    if (challenge) {
      const already = challenge.participants.some(
        (uid) => String(uid) === String(user._id)
      );
      if (!already && correctCount > 0) {
        dailyChallengeBonus = challenge.xpReward;
        await DailyChallenge.updateOne(
          { _id: challenge._id },
          { $addToSet: { participants: user._id } }
        );
      }
    }
  }
  xpEarned += dailyChallengeBonus;

  const previousXP = user.xp;
  const newXP = previousXP + xpEarned;
  const previousLevel = levelFromXP(previousXP);
  const newLevel = levelFromXP(newXP);
  const leveledUp = newLevel > previousLevel;

  const { streak: newStreak, sameDay } = updateStreak(
    user.streak,
    user.lastActiveDate
  );
  // Streak bonus: only when a new day's first practice
  const streakBonus = sameDay ? 0 : 50;
  const totalXP = xpEarned + streakBonus;

  // Recompute newXP+level after the streak bonus (single source of truth)
  const finalXP = previousXP + totalXP;
  const finalLevel = levelFromXP(finalXP);
  const finalRank = rankFromXP(finalXP);

  // Badges
  const previousAttempts = user.practiceHistory.length;
  const newAttempts = previousAttempts + 1;
  const newBadges = checkBadges({
    alreadyHas: user.badges as BadgeId[],
    totalAttempted: newAttempts,
    streak: newStreak,
    lastScore: { correct: correctCount, total: attempts.length },
    usedPredictor: usedPredictor ?? false,
  });

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        xp: finalXP,
        level: finalLevel,
        rank: finalRank,
        streak: newStreak,
        lastActiveDate: new Date(),
      },
      $addToSet: { badges: { $each: newBadges } },
      $push: {
        practiceHistory: {
          mode,
          score: correctCount,
          total: attempts.length,
          xpEarned: totalXP,
          date: new Date(),
        },
      },
    }
  );

  return NextResponse.json({
    ok: true,
    xpEarned,
    streakBonus,
    totalXP,
    correct: correctCount,
    total: attempts.length,
    leveledUp,
    newLevel: finalLevel,
    previousLevel,
    streak: newStreak,
    newBadges,
  });
}
