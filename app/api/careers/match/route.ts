import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Career } from "@/models/Career";
import { rankCareers } from "@/lib/career-matcher";

export const dynamic = "force-dynamic";

const Body = z.object({
  interests: z.array(z.string()).max(40).optional().default([]),
  /** Subjects the student picked in step 1 of the quiz (e.g. "math", "biology") */
  subjects: z.array(z.string()).max(20).optional().default([]),
  /** If true, save to user.interests + careerPreferences */
  save: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", details: parsed.error.flatten() }, { status: 400 });
  }

  // Need at least one signal — interests OR subjects
  if (parsed.data.interests.length === 0 && parsed.data.subjects.length === 0) {
    return NextResponse.json({ error: "Pick at least one subject or one interest" }, { status: 400 });
  }

  await connectDB();
  const careers = await Career.find({}).lean();
  const ranked = rankCareers(careers, parsed.data.interests, parsed.data.subjects).slice(0, 10);

  if (parsed.data.save) {
    await User.updateOne(
      { email: session.user.email.toLowerCase() },
      {
        $set: {
          interests: parsed.data.interests,
          preferredSubjects: parsed.data.subjects,
          careerPreferences: ranked.slice(0, 5).map((r) => String(r.career._id)),
        },
      }
    );
  }

  return NextResponse.json({
    matches: ranked.map((r) => ({
      id: String(r.career._id),
      name: r.career.name,
      emoji: r.career.emoji,
      category: r.career.category,
      description: r.career.description,
      score: r.score,
      matchedTags: r.matchedTags,
      salaryRanges: r.career.salaryRanges,
    })),
  });
}
