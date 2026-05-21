import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Scholarship } from "@/models/Scholarship";
import { isNRI } from "@/lib/constants";
import { formatAmount, isCurrency, type CurrencyCode } from "@/lib/currency";
import { Coins, ExternalLink, Sparkles, CalendarDays, FileText, Globe } from "lucide-react";

export const dynamic = "force-dynamic";

const TYPE_COLOR: Record<string, string> = {
  govt: "text-neon-cyan",
  private: "text-neon-pink",
  merit: "text-neon-yellow",
  need: "text-neon-green",
  nri: "text-neon-purple",
};

export default async function ScholarshipsPage({
  searchParams,
}: {
  searchParams: { type?: string; matchMe?: string; nri?: string };
}) {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();

  const userIsNRI = isNRI(user?.country);
  // NRI students default to nri-only view unless they opted out
  const nriOnly = searchParams.nri ? searchParams.nri === "true" : userIsNRI;
  const currency: CurrencyCode = isCurrency(user?.preferredCurrency)
    ? (user!.preferredCurrency as CurrencyCode)
    : "INR";

  const filter: Record<string, unknown> = {};
  if (searchParams.type) filter.type = searchParams.type;
  if (nriOnly) {
    filter.$or = [
      { nriEligible: true },
      { targetCountry: user?.country },
    ];
  } else if (searchParams.matchMe === "true" && user?.state) {
    filter.$or = [{ state: null }, { state: user.state }];
  }

  const items = await Scholarship.find(filter).sort({ amount: -1, name: 1 }).lean();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="pill-neon-green">
            <Sparkles className="h-3 w-3" /> {items.length} scholarships
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Scholarships 💰
          </h1>
          <p className="mt-1 text-sm text-white/65">
            Govt + private + state-level. Find ones that match your profile.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {userIsNRI && (
            <Link
              href={`/dashboard/scholarships?nri=${nriOnly ? "false" : "true"}${searchParams.type ? `&type=${searchParams.type}` : ""}`}
              className={`btn-${nriOnly ? "neon" : "ghost"} text-sm`}
            >
              🌍 {nriOnly ? "NRI-only ✓" : "Show all (incl. Indian)"}
            </Link>
          )}
          {!userIsNRI && user?.state && (
            <Link
              href={`/dashboard/scholarships?matchMe=true${searchParams.type ? `&type=${searchParams.type}` : ""}`}
              className={`btn-${searchParams.matchMe === "true" ? "neon" : "ghost"} text-sm`}
            >
              🎯 Match my profile ({user.state})
            </Link>
          )}
        </div>
      </header>

      {userIsNRI && nriOnly && (
        <div className="rounded-2xl border border-neon-purple/25 bg-neon-purple/8 p-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-neon-purple">
            <Globe className="h-3.5 w-3.5" /> NRI scholarships
          </div>
          <p className="mt-1 text-white/75">
            Showing schemes open to Overseas Indian / NRI / PIO / OCI students
            (and a few targeted at <b className="text-white">{user?.country}</b> specifically).
            Most need NRI/OCI proof + parent sponsor income statement in USD.
          </p>
        </div>
      )}

      <div className="card-glass !p-3">
        <form className="flex flex-wrap items-center gap-2 text-sm">
          <select
            name="type"
            defaultValue={searchParams.type ?? ""}
            className="h-9 rounded-xl border border-white/[0.08] bg-bg-2 px-3 text-xs"
          >
            <option value="">All types</option>
            <option value="govt">Government</option>
            <option value="private">Private</option>
            <option value="merit">Merit-based</option>
            <option value="need">Need-based</option>
            <option value="nri">NRI / Overseas</option>
          </select>
          {searchParams.matchMe && <input type="hidden" name="matchMe" value="true" />}
          {searchParams.nri && <input type="hidden" name="nri" value={searchParams.nri} />}
          <button type="submit" className="btn-ghost !py-1.5 text-xs">Apply</button>
          {(searchParams.type || searchParams.matchMe) && (
            <Link href="/dashboard/scholarships" className="text-xs text-neon-pink hover:underline">Clear</Link>
          )}
        </form>
      </div>

      {items.length === 0 ? (
        <div className="card-glass text-center text-sm text-white/65">
          <Coins className="mx-auto mb-2 h-6 w-6 text-white/35" />
          No scholarships match those filters.
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {items.map((s) => {
            const deadline = s.deadline ? new Date(s.deadline) : null;
            return (
              <article
                key={String(s._id)}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`pill !px-2 !py-0 text-[9px] capitalize ${TYPE_COLOR[s.type] ?? ""}`}>
                        {s.type === "nri" ? "🌍 NRI" : s.type}
                      </span>
                      {s.targetCountry ? (
                        <span className="pill !px-2 !py-0 text-[9px] text-neon-purple">
                          🎯 {s.targetCountry}
                        </span>
                      ) : s.nriEligible && s.type !== "nri" ? (
                        <span className="pill !px-2 !py-0 text-[9px] text-neon-purple">
                          🌍 NRI-eligible
                        </span>
                      ) : null}
                      {s.state && (
                        <span className="pill !px-2 !py-0 text-[9px]">📍 {s.state}</span>
                      )}
                      {!s.state && !s.targetCountry && (
                        <span className="pill !px-2 !py-0 text-[9px]">🇮🇳 All India</span>
                      )}
                    </div>
                    <h3 className="mt-1.5 font-display text-base font-bold leading-tight">{s.name}</h3>
                    <p className="text-[11px] text-white/55">{s.provider}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {s.amount > 0 ? (
                      <>
                        <div className="stat-num text-2xl text-neon-yellow">
                          {formatAmount(s.amount, currency)}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-white/45">/year</div>
                      </>
                    ) : (
                      <div className="text-[10px] uppercase tracking-widest text-white/55">
                        Admission<br/>route
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm text-white/80">{s.eligibility}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-white/55">
                  {deadline && (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> Deadline {deadline.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  )}
                  {s.documents.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {s.documents.length} documents
                    </span>
                  )}
                </div>

                {s.applicationLink && (
                  <a
                    href={s.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-3 !py-1.5 text-xs"
                  >
                    Apply <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
