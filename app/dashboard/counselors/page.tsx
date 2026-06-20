import { connectDB } from "@/lib/db";
import { Counselor } from "@/models/Counselor";
import { HELPLINES } from "@/lib/seed/counselors";
import { Phone, Mail, ExternalLink, Sparkles, BadgeCheck, MapPin, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CounselorsPage({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  await connectDB();
  const filter: Record<string, unknown> = { verified: true };
  if (searchParams.state) filter.state = searchParams.state;
  const counselors = await Counselor.find(filter).sort({ rating: -1, name: 1 }).lean();
  const states = await Counselor.distinct("state");

  return (
    <div className="space-y-6">
      <header>
        <span className="pill-neon-pink">
          <Sparkles className="h-3 w-3" /> Free 24×7 support · govt + NGO verified
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Helplines & Support 🧭
        </h1>
        <p className="mt-1 text-sm text-white/65">
          Confidential, free helplines for exam stress, mental health and career
          questions. All numbers verified — last checked this month.
        </p>
      </header>

      {/* HELPLINES — always shown */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-neon-pink" />
          <h2 className="font-display text-xl font-bold">Free helplines</h2>
          <span className="pill-neon-green text-[10px]">FREE</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {HELPLINES.map((h) => (
            <div
              key={h.name}
              className="rounded-3xl border border-neon-green/25 bg-neon-green/8 p-4 shadow-glow-green"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-display text-base font-bold">{h.name}</div>
                  <p className="mt-1 text-xs text-white/65">{h.description}</p>
                </div>
                <BadgeCheck className="h-4 w-4 shrink-0 text-neon-green" />
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <a href={`tel:${h.phone}`} className="flex items-center gap-2 font-mono font-bold text-neon-green hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {h.phone}
                </a>
                <div className="flex items-center gap-2 text-white/65">
                  <span className="text-[10px] uppercase tracking-widest text-white/45">Hours</span>
                  <span>{h.hours}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {h.email && (
                    <a
                      href={`mailto:${h.email}`}
                      className="inline-flex items-center gap-1 text-[10px] text-white/65 hover:text-white"
                    >
                      <Mail className="h-2.5 w-2.5" /> {h.email}
                    </a>
                  )}
                  {h.website && (
                    <a
                      href={h.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-neon-cyan hover:underline"
                    >
                      <ExternalLink className="h-2.5 w-2.5" /> Website
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {h.languages.slice(0, 4).map((l) => (
                    <span key={l} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] text-white/65">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNSELOR FILTER */}
      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-bold">Verified counselors</h2>
          {counselors.length > 0 && (
            <form className="flex items-center gap-2">
              <select
                name="state"
                defaultValue={searchParams.state ?? ""}
                className="h-9 rounded-xl border border-white/[0.08] bg-bg-2 px-3 text-xs"
              >
                <option value="">All states</option>
                {states.sort().map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button type="submit" className="btn-ghost !py-1.5 text-xs">Filter</button>
            </form>
          )}
        </div>

        {counselors.length === 0 ? (
          <div className="card-glass text-center !p-8">
            <div className="text-5xl">🤝</div>
            <h3 className="mt-3 font-display text-lg font-bold">
              Counselor partnerships launching soon
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-white/65">
              We're onboarding verified career counselors across India. In the
              meantime, the free helplines above can help with stream choice, exam
              stress, and career questions — 24×7 in 13 languages.
            </p>
            <p className="mt-3 text-xs text-white/45">
              Are you a counselor? Email{" "}
              <a href="mailto:partners@bcredupath.example" className="text-neon-cyan hover:underline">
                partners@bcredupath.example
              </a>{" "}
              to join.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {counselors.map((c) => (
              <article
                key={String(c._id)}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grad-pink-purple text-2xl shadow-glow-pink">
                    🧭
                  </div>
                  {c.verified && (
                    <span className="pill-neon-cyan text-[10px]">
                      <BadgeCheck className="h-2.5 w-2.5" /> Verified
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-base font-bold leading-tight">{c.name}</h3>
                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/55">
                  <MapPin className="h-3 w-3" />
                  <span>{c.city}, {c.state}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="stat-num text-neon-yellow">⭐ {c.rating.toFixed(1)}</span>
                  {c.fees && (
                    <span className="text-white/55">· ₹{c.fees}/session</span>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-white/65">
                  {c.specialization.join(" · ")}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {c.languages.slice(0, 3).map((l) => (
                    <span key={l} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] text-white/65">{l}</span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                  {c.phone && (
                    <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1 rounded-xl border border-neon-green/40 bg-neon-green/15 px-2 py-1 font-semibold text-neon-green hover:bg-neon-green/25">
                      <Phone className="h-3 w-3" /> Call
                    </a>
                  )}
                  {c.email && (
                    <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.05] px-2 py-1 hover:bg-white/[0.10]">
                      <Mail className="h-3 w-3" /> Email
                    </a>
                  )}
                  {c.website && (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.05] px-2 py-1 hover:bg-white/[0.10]">
                      <ExternalLink className="h-3 w-3" /> Site
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
