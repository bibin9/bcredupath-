import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Career } from "@/models/Career";
import { CareerCard } from "@/components/careers/CareerCard";
import { rankCareers } from "@/lib/career-matcher";
import { ArrowRight, Sparkles, Target } from "lucide-react";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "engineering", label: "Engineering", emoji: "⚙️" },
  { id: "medical", label: "Medical", emoji: "🩺" },
  { id: "commerce", label: "Commerce", emoji: "💼" },
  { id: "law", label: "Law", emoji: "⚖️" },
  { id: "design", label: "Design", emoji: "🎨" },
  { id: "media", label: "Media", emoji: "🎬" },
  { id: "research", label: "Research", emoji: "🔬" },
  { id: "civil-services", label: "Civil Services", emoji: "🇮🇳" },
  { id: "defense", label: "Defense", emoji: "🪖" },
];

export default async function CareersIndex({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const cat = searchParams.category ?? "all";
  const filter = cat === "all" ? {} : { category: cat };
  const careers = await Career.find(filter).lean();

  // If user has interests, show matched section first
  const hasInterests = user.interests.filter((t) => !t.startsWith("q:")).length > 0;
  const ranked = hasInterests ? rankCareers(careers, user.interests).slice(0, 6) : [];
  const matchedIds = new Set(ranked.map((r) => String(r.career._id)));
  const others = careers.filter((c) => !matchedIds.has(String(c._id)));

  // Total count across DB (not just current category filter)
  const totalCareers = await Career.countDocuments({});

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> Discover your path
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Careers 💼
          </h1>
          <p className="mt-1 text-sm text-white/65">
            {totalCareers} careers · matched to your interests · day-in-life, salary, entrance exams.
          </p>
        </div>
        <Link
          href="/dashboard/careers/quiz"
          className="btn-neon text-sm"
        >
          <Target className="h-4 w-4" />
          {hasInterests ? "Retake interest quiz" : "Take 20-Q interest quiz"}
        </Link>
      </header>

      {/* CATEGORY TABS */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        {CATEGORIES.map((c) => {
          const active = (cat === c.id) || (cat === "all" && c.id === "all");
          const href = c.id === "all" ? "/dashboard/careers" : `/dashboard/careers?category=${c.id}`;
          return (
            <Link
              key={c.id}
              href={href}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                active
                  ? "border-neon-purple/50 bg-neon-purple/15 text-white shadow-glow-purple"
                  : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18] hover:text-white"
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </Link>
          );
        })}
      </div>

      {/* MATCHED SECTION */}
      {ranked.length > 0 && cat === "all" && (
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="font-display text-xl font-bold md:text-2xl">
                Matched for you 🎯
              </h2>
              <p className="text-xs text-white/55">
                Based on your interests. Take the quiz again to refine.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((r) => (
              <CareerCard
                key={String(r.career._id)}
                id={String(r.career._id)}
                name={r.career.name}
                emoji={r.career.emoji}
                description={r.career.description}
                category={r.career.category}
                salaryEntry={r.career.salaryRanges.entry}
                salaryMid={r.career.salaryRanges.mid}
                matchScore={r.score}
                matchedTags={r.matchedTags}
              />
            ))}
          </div>
        </section>
      )}

      {/* NO INTERESTS YET — show quiz CTA */}
      {!hasInterests && cat === "all" && (
        <section className="card-glass flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
          <div className="text-5xl">🎯</div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold">No matches yet</h3>
            <p className="text-sm text-white/65">
              Take the 20-question interest quiz to unlock career matches with %.
            </p>
          </div>
          <Link href="/dashboard/careers/quiz" className="btn-neon shrink-0 text-sm">
            Start quiz <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}

      {/* ALL OTHERS */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            {cat === "all" ? "Browse all careers" : `${CATEGORIES.find((c) => c.id === cat)?.label} careers`}
          </h2>
          <span className="text-xs text-white/45">{others.length} listed</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c) => (
            <CareerCard
              key={String(c._id)}
              id={String(c._id)}
              name={c.name}
              emoji={c.emoji}
              description={c.description}
              category={c.category}
              salaryEntry={c.salaryRanges.entry}
              salaryMid={c.salaryRanges.mid}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
