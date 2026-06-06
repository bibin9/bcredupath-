import { connectDB } from "@/lib/db";
import { ExamInfo } from "@/models/ExamInfo";
import { ExamSearch, type ExamListItem } from "@/components/exams/ExamSearch";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ExamsPage() {
  await connectDB();
  const exams = await ExamInfo.find({}).lean();

  const today = Date.now();
  const intl = exams.filter((e) => e.international).length;
  const upcoming = exams.filter(
    (e) => e.examDate && new Date(e.examDate).getTime() >= today
  ).length;

  const items: ExamListItem[] = exams.map((e) => ({
    _id: String(e._id),
    name: e.name,
    fullName: e.fullName,
    category: e.category,
    field: e.field,
    level: e.level,
    international: e.international,
    examDate: e.examDate ? new Date(e.examDate).toISOString() : null,
    applicationEnd: e.applicationEnd ? new Date(e.applicationEnd).toISOString() : null,
    fees: e.fees,
    description: e.description,
    officialWebsite: e.officialWebsite,
    careersUnlocked: e.careersUnlocked ?? [],
  }));

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> {upcoming} upcoming · {intl} international · {exams.length} indexed
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Entrance Exams 📅
          </h1>
          <p className="mt-1 text-sm text-white/65">
            JEE, NEET, CUET, CLAT, CAT, NDA, CA, NIFT — plus SAT, GRE, IELTS, GMAT, MCAT and more international options. Tap any exam for how to apply, careers it opens, and colleges that accept it.
          </p>
        </div>
      </header>

      <ExamSearch exams={items} />
    </div>
  );
}
