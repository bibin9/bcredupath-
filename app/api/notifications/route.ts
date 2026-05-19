import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { ensureTodayChallenge } from "@/lib/daily-challenge";

export const dynamic = "force-dynamic";

/**
 * Computed notifications — no separate Notification model. We derive these
 * from the user's current state so they're always fresh.
 *
 * Types: daily-challenge | streak-risk | leaderboard | badge-fresh | tip
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() }).lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const notes: Note[] = [];
  const now = new Date();

  /* 1. Daily challenge */
  try {
    const { challenge } = await ensureTodayChallenge((user.class ?? 10) as 10 | 12);
    const completed = challenge.participants.some(
      (uid) => String(uid) === String(user._id)
    );
    if (!completed) {
      notes.push({
        id: "daily-" + challenge.date.toISOString().slice(0, 10),
        type: "daily-challenge",
        emoji: "🎯",
        title: "Daily Challenge ready",
        body: `10 ${challenge.subject} questions today · +${challenge.xpReward} XP bonus`,
        href: "/dashboard/practice/daily-challenge",
        accent: "pink",
        time: now,
      });
    }
  } catch {
    // ignore — no seeded questions yet
  }

  /* 2. Streak at risk — if last active >18h ago and streak > 0 */
  if (user.lastActiveDate && user.streak > 0) {
    const hoursAgo = (now.getTime() - new Date(user.lastActiveDate).getTime()) / 3600_000;
    if (hoursAgo > 18 && hoursAgo < 48) {
      notes.push({
        id: "streak-risk-" + new Date(user.lastActiveDate).toDateString(),
        type: "streak-risk",
        emoji: "🔥",
        title: `Your ${user.streak}-day streak is at risk`,
        body: "Solve 1 question today to keep it alive.",
        href: "/dashboard/practice",
        accent: "orange",
        time: now,
      });
    }
  } else if (user.lastActiveDate) {
    const hoursAgo = (now.getTime() - new Date(user.lastActiveDate).getTime()) / 3600_000;
    if (hoursAgo > 24 && hoursAgo < 72) {
      notes.push({
        id: "comeback-" + Math.floor(hoursAgo / 24),
        type: "tip",
        emoji: "💪",
        title: "Welcome back",
        body: "Restart your streak today. Even 1 question counts.",
        href: "/dashboard/practice",
        accent: "cyan",
        time: now,
      });
    }
  }

  /* 3. Leaderboard — count people just above the user */
  const ahead = await User.countDocuments({ onboarded: true, xp: { $gt: user.xp } });
  if (ahead > 0 && user.xp > 0) {
    const nextUser = await User.findOne({ onboarded: true, xp: { $gt: user.xp } })
      .sort({ xp: 1 })
      .select("name xp")
      .lean();
    if (nextUser) {
      const gap = nextUser.xp - user.xp;
      if (gap > 0 && gap <= 200) {
        notes.push({
          id: "lb-gap-" + nextUser._id,
          type: "leaderboard",
          emoji: "🏆",
          title: `${nextUser.name.split(" ")[0]} is just ${gap} XP ahead`,
          body: "One good practice run and you overtake them.",
          href: "/dashboard/leaderboard",
          accent: "yellow",
          time: now,
        });
      }
    }
  }

  /* 4. Latest badge unlock (if any) */
  if (user.badges.length > 0) {
    const latest = user.badges[user.badges.length - 1];
    notes.push({
      id: "badge-latest",
      type: "badge-fresh",
      emoji: "🏅",
      title: "Latest badge unlocked",
      body: `You earned ${latest.replace(/-/g, " ")}.`,
      href: "/dashboard/profile",
      accent: "purple",
      time: now,
    });
  }

  /* 5. Fallback motivational tip */
  if (notes.length === 0) {
    notes.push({
      id: "tip-default",
      type: "tip",
      emoji: "✨",
      title: "Try the AI Predictor",
      body: "Top 20 questions most likely to appear in Boards 2026.",
      href: "/dashboard/predictor",
      accent: "cyan",
      time: now,
    });
  }

  return NextResponse.json({ notes, unread: notes.length });
}

type Note = {
  id: string;
  type: "daily-challenge" | "streak-risk" | "leaderboard" | "badge-fresh" | "tip";
  emoji: string;
  title: string;
  body: string;
  href: string;
  accent: "pink" | "cyan" | "yellow" | "green" | "purple" | "orange";
  time: Date;
};
