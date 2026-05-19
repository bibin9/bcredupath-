import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { ensureTodayChallenge } from "@/lib/daily-challenge";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() }).lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    const { challenge } = await ensureTodayChallenge((user.class ?? 10) as 10 | 12);
    const completed = challenge.participants.some(
      (uid) => String(uid) === String(user._id)
    );

    return NextResponse.json({
      challenge: {
        id: String(challenge._id),
        date: challenge.date,
        subject: challenge.subject,
        questionCount: challenge.questionIds.length,
        xpReward: challenge.xpReward,
        participantCount: challenge.participants.length,
        completed,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 503 }
    );
  }
}
