import { notFound } from "next/navigation";
import Link from "next/link";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Career } from "@/models/Career";
import { College } from "@/models/College";
import { formatNumber } from "@/lib/utils";
import { ArrowLeft, ExternalLink, GraduationCap, Briefcase, BookOpenCheck, Clock, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CareerDetailPage({ params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) notFound();
  await connectDB();
  // Ensure the College model is registered for populate to work
  void College;
  const career = await Career.findById(params.id).populate("topColleges").lean();
  if (!career) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/careers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All careers
      </Link>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-4xl border border-white/[0.08] bg-gradient-to-br from-neon-purple/15 via-bg-2 to-neon-pink/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-purple/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/3 h-48 w-48 rounded-full bg-neon-pink/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-4xl bg-grad-pink-purple text-6xl shadow-glow-pink animate-float">
            {career.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <span className="pill-neon-cyan">{career.category.replace("-", " ")}</span>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-5xl">
              {career.name}
            </h1>
            <p className="mt-2 text-sm text-white/75 md:text-base">{career.description}</p>
          </div>
        </div>

        {/* Salary strip */}
        <div className="relative mt-6 grid grid-cols-3 gap-2">
          <SalaryTile label="Entry" amount={career.salaryRanges.entry} />
          <SalaryTile label="Mid (5-8y)" amount={career.salaryRanges.mid} accent />
          <SalaryTile label="Senior (10y+)" amount={career.salaryRanges.senior} />
        </div>
      </section>

      {/* WHAT YOU'LL ACTUALLY DO — top section, prominent */}
      <section className="card-glass border-neon-cyan/30 shadow-glow-cyan">
        <div className="mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-neon-cyan" />
          <h2 className="font-display text-xl font-bold">What you'll actually do</h2>
        </div>
        <p className="text-base leading-relaxed text-white/85">{career.dayInLife}</p>
      </section>

      {/* GROWTH + WHY IT MATTERS */}
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card-glass">
          <div className="mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-neon-green" />
            <h2 className="font-display text-lg font-bold">Growth path</h2>
          </div>
          <p className="text-sm leading-relaxed text-white/75">{career.growthProspects}</p>
        </section>

        <section className="card-glass border-neon-pink/25">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base">🌍</span>
            <h2 className="font-display text-lg font-bold">Why this matters</h2>
          </div>
          <p className="text-sm leading-relaxed text-white/75">{career.description}</p>
        </section>
      </div>

      {/* QUALIFICATIONS + SKILLS */}
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card-glass">
          <div className="mb-3 flex items-center gap-2">
            <BookOpenCheck className="h-4 w-4 text-neon-yellow" />
            <h2 className="font-display text-lg font-bold">Qualifications</h2>
          </div>
          <ul className="space-y-1.5 text-sm text-white/80">
            {career.qualifications.map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-neon-yellow">▸</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-glass">
          <div className="mb-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-neon-pink" />
            <h2 className="font-display text-lg font-bold">Skills required</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {career.skillsRequired.map((s, i) => (
              <span key={i} className="pill !text-xs">{s}</span>
            ))}
          </div>
        </section>
      </div>

      {/* ENTRANCE EXAMS */}
      {career.entranceExams.length > 0 && (
        <section className="card-glass">
          <h2 className="mb-3 font-display text-lg font-bold">Entrance exams</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {career.entranceExams.map((e, i) => (
              <a
                key={i}
                href={e.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{e.name}</div>
                  <div className="text-[10px] text-white/55">{e.dates}</div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-white/45 group-hover:text-neon-cyan" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* TOP COLLEGES */}
      {career.topColleges && career.topColleges.length > 0 && (
        <section className="card-glass">
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-neon-purple" />
            <h2 className="font-display text-lg font-bold">Top colleges</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {(career.topColleges as unknown as { _id: string; name: string; state: string; city: string; nirfRank?: number }[]).map((c) => (
              <div
                key={String(c._id)}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3"
              >
                {c.nirfRank && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon-yellow/15 text-neon-yellow">
                    <span className="stat-num text-xs">#{c.nirfRank}</span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{c.name}</div>
                  <div className="text-[10px] text-white/55">{c.city}, {c.state}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INTEREST TAGS */}
      <section className="card-glass">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-white/45">
          Best fit if you like
        </div>
        <div className="flex flex-wrap gap-2">
          {career.interestTags.map((t) => (
            <span key={t} className="pill-neon-cyan">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function SalaryTile({ label, amount, accent }: { label: string; amount: number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-white/[0.04] p-3 text-center ${accent ? "border-neon-yellow/30 shadow-glow-yellow" : "border-white/[0.06]"}`}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-white/45">{label}</div>
      <div className={`stat-num mt-1 text-lg ${accent ? "text-neon-yellow" : "text-white"}`}>
        ₹{formatNumber(amount)}
      </div>
      <div className="text-[10px] text-white/45">per year</div>
    </div>
  );
}
