import { connectDB } from "@/lib/db";
import { ExamInfo } from "@/models/ExamInfo";
import { CalendarDays, ExternalLink, Sparkles } from "lucide-react";
import { daysBetween } from "@/lib/utils";

export const dynamic = "force-dynamic";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default async function ExamsPage() {
  await connectDB();
  const exams = await ExamInfo.find({}).sort({ examDate: 1, name: 1 }).lean();

  const today = new Date();
  const upcoming = exams.filter((e) => e.examDate && new Date(e.examDate) >= today);
  const past = exams.filter((e) => !e.examDate || new Date(e.examDate) < today);

  return (
    <div className="space-y-6">
      <header>
        <span className="pill-neon-yellow">
          <Sparkles className="h-3 w-3" /> {upcoming.length} upcoming · {exams.length} indexed
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Entrance Exams 📅
        </h1>
        <p className="mt-1 text-sm text-white/65">
          JEE, NEET, CUET, CLAT, NDA, CA, NIFT and more. Dates, eligibility, pattern.
        </p>
      </header>

      {/* UPCOMING */}
      {upcoming.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold">Upcoming</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((e) => {
              const d = e.examDate ? new Date(e.examDate) : null;
              const daysAway = d ? daysBetween(today, d) : 0;
              const month = d ? MONTHS[d.getMonth()] : "";
              const day = d ? d.getDate() : "";
              return (
                <div
                  key={String(e._id)}
                  className="flex gap-3 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06]"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-grad-pink-purple text-center shadow-glow-pink">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/90">{month}</div>
                    <div className="font-display text-2xl font-black leading-none">{day}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="pill !px-2 !py-0 text-[9px] capitalize">{e.category}</span>
                      {daysAway >= 0 && daysAway <= 60 && (
                        <span className="pill-neon-pink !px-2 !py-0 text-[9px]">{daysAway} days</span>
                      )}
                    </div>
                    <div className="mt-1 font-display text-base font-bold leading-tight">{e.name}</div>
                    <div className="line-clamp-1 text-xs text-white/55">{e.fullName}</div>
                    <p className="mt-1 line-clamp-2 text-xs text-white/65">{e.description}</p>
                    {e.officialWebsite && (
                      <a href={e.officialWebsite} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neon-cyan hover:underline">
                        Official site <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* PAST / OTHER */}
      {past.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-white/65">Other exams</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {past.map((e) => (
              <div
                key={String(e._id)}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 opacity-75"
              >
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-white/45" />
                  <span className="font-semibold">{e.name}</span>
                </div>
                <div className="text-[11px] text-white/55">{e.fullName}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
