import { notFound } from "next/navigation";
import Link from "next/link";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { ExamInfo } from "@/models/ExamInfo";
import { Career } from "@/models/Career";
import { College } from "@/models/College";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Globe,
  GraduationCap,
  IndianRupee,
  ListChecks,
  ScrollText,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(d?: Date | string | null) {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export default async function ExamDetailPage({ params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) notFound();
  await connectDB();
  const exam = await ExamInfo.findById(params.id).lean();
  if (!exam) notFound();

  // Resolve careersUnlocked + collegesAccepting names to actual docs
  const [careers, colleges] = await Promise.all([
    exam.careersUnlocked && exam.careersUnlocked.length
      ? Career.find({ name: { $in: exam.careersUnlocked } })
          .select("_id name emoji category")
          .lean()
      : Promise.resolve([]),
    exam.collegesAccepting && exam.collegesAccepting.length
      ? College.find({ name: { $in: exam.collegesAccepting } })
          .select("_id name city state country nirfRank")
          .lean()
      : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/exams"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All exams
      </Link>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-4xl border border-white/[0.08] bg-gradient-to-br from-neon-pink/15 via-bg-2 to-neon-purple/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-pink/20 blur-3xl" />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-neon-cyan capitalize">{exam.category}</span>
              {exam.field && (
                <span className="pill !text-xs capitalize">{exam.field}</span>
              )}
              {exam.level && (
                <span className="pill !text-xs">
                  {exam.level === "UG" ? "After Class 12" : exam.level === "PG" ? "After UG" : exam.level}
                </span>
              )}
              {exam.international && (
                <span className="pill-neon-purple">🌍 International</span>
              )}
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-5xl">
              {exam.name}
            </h1>
            <p className="mt-1 text-sm text-white/65 md:text-base">{exam.fullName}</p>
            {exam.description && (
              <p className="mt-3 max-w-2xl text-sm text-white/80">{exam.description}</p>
            )}
          </div>
          {exam.officialWebsite && (
            <a
              href={exam.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon text-sm shrink-0"
            >
              Official site <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </section>

      {/* DATES + FEES + ELIGIBILITY STRIP */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DateTile label="Application opens" date={exam.applicationStart} />
        <DateTile label="Application closes" date={exam.applicationEnd} accent />
        <DateTile label="Exam date" date={exam.examDate} accent />
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
            <IndianRupee className="h-3 w-3" /> Application fee
          </div>
          <div className="stat-num mt-1 text-2xl text-neon-yellow">
            {exam.fees ? `₹${exam.fees.toLocaleString("en-IN")}` : "—"}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY + PATTERN */}
      <div className="grid gap-5 lg:grid-cols-2">
        {exam.eligibility && (
          <section className="card-glass">
            <div className="mb-2 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-neon-cyan" />
              <h2 className="font-display text-lg font-bold">Eligibility</h2>
            </div>
            <p className="text-sm leading-relaxed text-white/85">{exam.eligibility}</p>
          </section>
        )}
        {exam.pattern && (
          <section className="card-glass">
            <div className="mb-2 flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-neon-pink" />
              <h2 className="font-display text-lg font-bold">Exam pattern</h2>
            </div>
            <p className="text-sm leading-relaxed text-white/85">{exam.pattern}</p>
          </section>
        )}
      </div>

      {/* HOW TO APPLY */}
      {exam.applyHow && exam.applyHow.length > 0 && (
        <section className="card-glass !border-neon-green/30">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-neon-green" />
            <h2 className="font-display text-lg font-bold">How to apply (step by step)</h2>
          </div>
          <ol className="space-y-2">
            {exam.applyHow.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon-green/15 text-[11px] font-bold text-neon-green">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* CAREERS UNLOCKED */}
      {careers.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-neon-purple" />
            <h2 className="font-display text-xl font-bold">Careers this opens</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {careers.map((c) => (
              <Link
                key={String(c._id)}
                href={`/dashboard/careers/${String(c._id)}`}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 transition-all hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                <span className="text-2xl">{c.emoji}</span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{c.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/45">
                    {c.category.replace("-", " ")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* COLLEGES ACCEPTING */}
      {colleges.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-neon-cyan" />
            <h2 className="font-display text-xl font-bold">Colleges that accept it</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {colleges.map((c) => (
              <div
                key={String(c._id)}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3"
              >
                {c.nirfRank && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon-yellow/15 text-neon-yellow">
                    <span className="stat-num text-xs">#{c.nirfRank}</span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{c.name}</div>
                  <div className="text-[10px] text-white/55">
                    {c.city}{c.country && c.country !== "India" ? `, ${c.country}` : c.state ? `, ${c.state}` : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SYLLABUS (if long) */}
      {exam.syllabus && (
        <section className="card-glass">
          <h2 className="mb-2 font-display text-lg font-bold">Syllabus</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-white/85">
            {exam.syllabus}
          </p>
        </section>
      )}
    </div>
  );
}

function DateTile({
  label,
  date,
  accent,
}: {
  label: string;
  date?: Date | string | null;
  accent?: boolean;
}) {
  const formatted = fmtDate(date);
  return (
    <div
      className={`rounded-2xl border bg-white/[0.04] p-3 ${
        accent ? "border-neon-pink/30 shadow-glow-pink" : "border-white/[0.08]"
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
        <CalendarDays className="h-3 w-3" /> {label}
      </div>
      <div className={`stat-num mt-1 text-lg ${accent ? "text-neon-pink" : "text-white"}`}>
        {formatted ?? "TBD"}
      </div>
    </div>
  );
}
