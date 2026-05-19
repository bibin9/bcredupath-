import Link from "next/link";
import { connectDB } from "@/lib/db";
import { College } from "@/models/College";
import { formatNumber } from "@/lib/utils";
import { Building2, ExternalLink, Sparkles, MapPin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const COUNTRY_FLAG: Record<string, string> = {
  India: "🇮🇳",
  USA: "🇺🇸",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Singapore: "🇸🇬",
  Germany: "🇩🇪",
  Australia: "🇦🇺",
  Netherlands: "🇳🇱",
};

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: { state?: string; type?: string; country?: string };
}) {
  await connectDB();

  // "abroad" pseudo-country = anything not India
  const filter: Record<string, unknown> = {};
  if (searchParams.country === "abroad") {
    filter.country = { $ne: "India" };
  } else if (searchParams.country && searchParams.country !== "all") {
    filter.country = searchParams.country;
  }
  if (searchParams.state) filter.state = searchParams.state;
  if (searchParams.type) filter.type = searchParams.type;

  // Sort: NIRF for India, globalRank for abroad
  const isAbroadSort =
    !!searchParams.country && searchParams.country !== "India" && searchParams.country !== "all";
  const sortField: Record<string, 1 | -1> = isAbroadSort
    ? { globalRank: 1, name: 1 }
    : { nirfRank: 1, name: 1 };

  const colleges = await College.find(filter).sort(sortField).limit(200).lean();

  // For state dropdown — only states relevant to the selected country
  const stateFilter: Record<string, unknown> = {};
  if (searchParams.country === "abroad") stateFilter.country = { $ne: "India" };
  else if (searchParams.country && searchParams.country !== "all") stateFilter.country = searchParams.country;
  const states = await College.distinct("state", stateFilter);

  const isAbroad = searchParams.country === "abroad";

  // Country pill counts
  const countryAgg = await College.aggregate([
    { $group: { _id: "$country", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  const counts = new Map<string, number>(countryAgg.map((c) => [c._id ?? "India", c.count]));
  const indiaCount = counts.get("India") ?? 0;
  const abroadCount = Array.from(counts.entries()).reduce(
    (sum, [k, v]) => (k === "India" ? sum : sum + v),
    0
  );

  return (
    <div className="space-y-6">
      <header>
        <span className="pill-neon-cyan">
          <Sparkles className="h-3 w-3" /> {colleges.length} colleges shown · {indiaCount + abroadCount} indexed
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Colleges 🏛️
        </h1>
        <p className="mt-1 text-sm text-white/65">
          India + study abroad — engineering, medical, law, design, commerce, science, liberal arts.
        </p>
      </header>

      {/* COUNTRY TABS */}
      <div className="no-scrollbar flex flex-wrap gap-1.5 overflow-x-auto">
        <CountryTab id="all" label="All" emoji="🌍" count={indiaCount + abroadCount} active={!searchParams.country || searchParams.country === "all"} />
        <CountryTab id="India" label="India" emoji="🇮🇳" count={indiaCount} active={searchParams.country === "India"} />
        <CountryTab id="abroad" label="Study Abroad" emoji="✈️" count={abroadCount} active={searchParams.country === "abroad"} />
        {Array.from(counts.entries())
          .filter(([k]) => k && k !== "India")
          .map(([k, v]) => (
            <CountryTab
              key={k}
              id={k}
              label={k}
              emoji={COUNTRY_FLAG[k] ?? "🌍"}
              count={v}
              active={searchParams.country === k}
            />
          ))}
      </div>

      {/* QUICK STATE LINKS for India */}
      {(!searchParams.country || searchParams.country === "all" || searchParams.country === "India") && (
        <div className="flex flex-wrap gap-1.5">
          {["Kerala", "Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "Telangana", "West Bengal"].map((s) => {
            const href = `/dashboard/colleges?country=India&state=${encodeURIComponent(s)}`;
            return (
              <Link
                key={s}
                href={href}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all",
                  searchParams.state === s
                    ? "border-neon-pink/50 bg-neon-pink/15 text-neon-pink shadow-glow-pink"
                    : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18] hover:text-white"
                )}
              >
                📍 {s}
              </Link>
            );
          })}
        </div>
      )}

      <div className="card-glass !p-3">
        <form className="flex flex-wrap items-center gap-2 text-sm">
          {searchParams.country && <input type="hidden" name="country" value={searchParams.country} />}
          <select
            name="state"
            defaultValue={searchParams.state ?? ""}
            className="h-9 rounded-xl border border-white/[0.08] bg-bg-2 px-3 text-xs"
          >
            <option value="">{isAbroad ? "All regions" : "All states"}</option>
            {states.sort().map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            name="type"
            defaultValue={searchParams.type ?? ""}
            className="h-9 rounded-xl border border-white/[0.08] bg-bg-2 px-3 text-xs"
          >
            <option value="">Govt + Private</option>
            <option value="Govt">{isAbroad ? "Public" : "Government"}</option>
            <option value="Private">Private</option>
          </select>
          <button type="submit" className="btn-ghost !py-1.5 text-xs">Apply</button>
          {(searchParams.state || searchParams.type) && (
            <Link href={`/dashboard/colleges?country=${searchParams.country ?? "all"}`} className="text-xs text-neon-pink hover:underline">Clear</Link>
          )}
        </form>
      </div>

      {colleges.length === 0 ? (
        <div className="card-glass text-center text-sm text-white/65">
          <Building2 className="mx-auto mb-2 h-6 w-6 text-white/35" />
          No colleges match those filters.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((c) => {
            const country = c.country ?? "India";
            const isIntl = country !== "India";
            const flag = COUNTRY_FLAG[country] ?? "🌍";
            return (
              <div
                key={String(c._id)}
                className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-2xl">
                    {isIntl ? flag : "🏛️"}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isIntl && c.globalRank && (
                      <span className="pill-neon-cyan text-[10px]">
                        <Globe className="h-2.5 w-2.5" /> QS #{c.globalRank}
                      </span>
                    )}
                    {!isIntl && c.nirfRank && (
                      <span className="pill-neon-yellow text-[10px]">NIRF #{c.nirfRank}</span>
                    )}
                  </div>
                </div>
                <div className="font-display text-base font-bold leading-tight">{c.name}</div>
                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/55">
                  <MapPin className="h-3 w-3" />
                  <span>{c.city}, {isIntl ? country : c.state}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className={cn("pill !px-2 !py-0 text-[9px]", c.type === "Govt" ? "text-neon-green" : "text-neon-pink")}>
                    {isIntl && c.type === "Govt" ? "Public" : c.type}
                  </span>
                  {c.hostel && <span className="pill !px-2 !py-0 text-[9px]">Hostel</span>}
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-white/65">
                  {c.courses.slice(0, 4).join(" · ")}
                </p>
                {c.highlights && c.highlights.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {c.highlights.slice(0, 2).map((h: string, i: number) => (
                      <li key={i} className="flex gap-1.5 text-[11px] text-white/75">
                        <span className="text-neon-cyan">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 flex items-baseline justify-between text-xs">
                  <span className="stat-num text-neon-yellow">
                    ₹{formatNumber(c.fees.min)}–{formatNumber(c.fees.max)}/yr
                  </span>
                  {c.website && (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neon-cyan hover:underline">
                      Visit <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CountryTab({
  id,
  label,
  emoji,
  count,
  active,
}: {
  id: string;
  label: string;
  emoji: string;
  count: number;
  active: boolean;
}) {
  const href = id === "all" ? "/dashboard/colleges" : `/dashboard/colleges?country=${encodeURIComponent(id)}`;
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
        active
          ? "border-neon-purple/50 bg-neon-purple/15 text-white shadow-glow-purple"
          : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18] hover:text-white"
      )}
    >
      <span>{emoji}</span>
      <span>{label}</span>
      <span className="rounded-full bg-white/[0.10] px-1.5 text-[10px] font-bold text-white/65">
        {count}
      </span>
    </Link>
  );
}
