import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { MockPaper } from "@/models/MockPaper";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

/**
 * GET /api/mock-test/start?paperId=<id>
 * → full paper with hydrated question text (no answer leaking server-side)
 *
 * Legacy fallback: ?subject=math → returns paper #1 for that subject.
 */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() }).lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const paperId = searchParams.get("paperId");
  const subject = searchParams.get("subject");
  const cls = (user.class ?? 10) as 10 | 12;

  let paperDoc;
  if (paperId && mongoose.isValidObjectId(paperId)) {
    paperDoc = await MockPaper.findById(paperId).lean();
  } else if (subject) {
    paperDoc = await MockPaper.findOne({ subject, class: cls, paperNumber: 1 }).lean();
  }
  if (!paperDoc) {
    return NextResponse.json({ error: "Paper not found" }, { status: 404 });
  }

  // Hydrate questions in one go
  const allIds = paperDoc.sections.flatMap((s) => s.questionIds);
  const qs = await Question.find({ _id: { $in: allIds } }).lean();
  const qById = new Map(qs.map((q) => [String(q._id), q]));

  const sections = paperDoc.sections.map((sec) => ({
    name: sec.name,
    instructions: sec.instructions,
    marksPerQuestion: sec.marksPerQuestion,
    questions: sec.questionIds
      .map((id) => qById.get(String(id)))
      .filter(Boolean)
      .map((q) => ({
        _id: String(q!._id),
        question: q!.question,
        options: q!.options,
        answer: q!.answer,
        solution: q!.solution,
        type: q!.type,
        marks: q!.marks,
        chapter: q!.chapter,
        topic: q!.topic,
        expectedTime: q!.expectedTime,
        verified: q!.verified ?? false,
        verifiedBy: q!.verifiedBy,
      })),
  }));

  return NextResponse.json({
    paper: {
      id: String(paperDoc._id),
      paperNumber: paperDoc.paperNumber,
      subject: paperDoc.subject,
      class: paperDoc.class,
      title: paperDoc.title,
      totalMarks: paperDoc.totalMarks,
      durationMinutes: paperDoc.durationMinutes,
      sections,
    },
  });
}
