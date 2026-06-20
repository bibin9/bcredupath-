import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Question } from "@/models/Question";
import { resolveSubjectFilter } from "@/lib/chapter-mapping";

export const dynamic = "force-dynamic";

/**
 * Assemble a Sample Question Paper that matches the CBSE board paper
 * structure exactly.
 *
 *   Section A — 18 MCQs (1 mark each) + 2 Assertion-Reason (1 each)
 *   Section B —  5 SA (2 marks)
 *   Section C —  6 SA (3 marks)
 *   Section D —  4 LA (5 marks)
 *   Section E —  3 Case Study (4 marks)
 *
 * Total: 38 questions, 80 marks, 3 hours.
 *
 * GET /api/mock-test/start?subject=math
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
  const subject = searchParams.get("subject");
  if (!subject) return NextResponse.json({ error: "subject required" }, { status: 400 });

  const cls = (user.class ?? 10) as 10 | 12;
  const resolved = resolveSubjectFilter(subject, cls);
  const baseFilter: Record<string, unknown> = { class: cls, subject: resolved.subject };
  if (resolved.chapter) baseFilter.chapter = resolved.chapter;

  // Helper — random-sample matching docs
  async function sample(extra: Record<string, unknown>, count: number) {
    const match = { ...baseFilter, ...extra };
    const docs = await Question.aggregate([
      { $match: match },
      { $sample: { size: count } },
    ]);
    return docs;
  }

  // Build sections in parallel
  const [secA_mcq, secA_ar, secB, secC, secD, secE] = await Promise.all([
    sample({ type: "MCQ" }, 18),
    sample({ type: "AssertionReason" }, 2),
    sample({ type: "SA", marks: 2 }, 5),
    sample({ type: "SA", marks: 3 }, 6),
    sample({ type: { $in: ["LA"] }, marks: 5 }, 4),
    sample({ type: "CaseStudy" }, 3),
  ]);

  // Fall back: if a section comes up short, pad with closest-type Qs
  async function pad(current: Array<{ _id: unknown }>, extra: Record<string, unknown>, target: number) {
    if (current.length >= target) return current.slice(0, target);
    const existingIds = current.map((q) => q._id);
    const need = target - current.length;
    const more = await Question.aggregate([
      { $match: { ...baseFilter, ...extra, _id: { $nin: existingIds } } },
      { $sample: { size: need } },
    ]);
    return [...current, ...more];
  }

  const sectionA = [
    ...(await pad(secA_mcq, { type: "MCQ" }, 18)),
    ...(await pad(secA_ar, { type: { $in: ["AssertionReason", "MCQ"] } }, 2)),
  ];
  const sectionB = await pad(secB, { type: "SA" }, 5);
  const sectionC = await pad(secC, { type: "SA" }, 6);
  const sectionD = await pad(secD, { type: { $in: ["LA", "SA"] } }, 4);
  const sectionE = await pad(secE, { type: "CaseStudy" }, 3);

  function serialise(qs: Array<Record<string, unknown>>) {
    return qs.map((q) => ({
      _id: String(q._id),
      question: q.question,
      options: q.options,
      answer: q.answer,
      solution: q.solution,
      type: q.type,
      marks: q.marks,
      chapter: q.chapter,
      topic: q.topic,
      expectedTime: q.expectedTime,
      verified: q.verified ?? false,
      verifiedBy: q.verifiedBy,
    }));
  }

  const paper = {
    subject,
    class: cls,
    title: `${subject.toUpperCase()} — Sample Question Paper`,
    totalMarks:
      sectionA.length * 1 +
      sectionB.length * 2 +
      sectionC.length * 3 +
      sectionD.length * 5 +
      sectionE.length * 4,
    durationMinutes: 180,
    sections: [
      {
        name: "Section A",
        instructions: "Each question carries 1 mark. There are 20 questions including 2 Assertion-Reason.",
        marksPerQuestion: 1,
        questions: serialise(sectionA),
      },
      {
        name: "Section B",
        instructions: "Each question carries 2 marks. Answer in ~30 words.",
        marksPerQuestion: 2,
        questions: serialise(sectionB),
      },
      {
        name: "Section C",
        instructions: "Each question carries 3 marks. Answer in ~50 words.",
        marksPerQuestion: 3,
        questions: serialise(sectionC),
      },
      {
        name: "Section D",
        instructions: "Each question carries 5 marks. Answer in ~100 words.",
        marksPerQuestion: 5,
        questions: serialise(sectionD),
      },
      {
        name: "Section E",
        instructions: "Case-Study based questions. Each carries 4 marks.",
        marksPerQuestion: 4,
        questions: serialise(sectionE),
      },
    ],
  };

  return NextResponse.json({ paper });
}
