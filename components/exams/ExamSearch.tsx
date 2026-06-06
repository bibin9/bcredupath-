"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, CalendarDays, ExternalLink, Globe, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type ExamListItem = {
  _id: string;
  name: string;
  fullName: string;
  category: string;
  field?: string;
  level?: string;
  international?: boolean;
  examDate?: string | null;
  applicationEnd?: string | null;
  fees?: number;
  description?: string;
  officialWebsite?: string;
  careersUnlocked?: string[];
};

const FIELD_TABS = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "engineering", label: "Engineering", emoji: "⚙️" },
  { id: "medical", label: "Medical", emoji: "🩺" },
  { id: "law", label: "Law", emoji: "⚖️" },
  { id: "management", label: "Management", emoji: "💼" },
  { id: "design", label: "Design", emoji: "🎨" },
  { id: "architecture", label: "Architecture", emoji: "🏛️" },
  { id: "commerce", label: "Commerce", emoji: "📒" },
  { id: "defense", label: "Defense", emoji: "🪖" },
  { id: "banking", label: "Banking", emoji: "🏦" },
  { id: "research", label: "Research", emoji: "🔬" },
  { id: "language", label: "Language", emoji: "🗣️" },
  { id: "general", label: "General", emoji: "🎓" },
];

export function ExamSearch({ exams }: { exams: ExamListItem[] }) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");
  const [scope, setScope] = useState<"all" | "india" | "international">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = exams;

    if (field !== "all") list = list.filter((e) => e.field === field);
    if (scope === "india") list = list.filter((e) => !e.international);
    if (scope === "international") list = list.filter((e) => e.international);

    if (q) {
      const tokens = q.split(/\s+/).filter(Boolean);
      list = list.filter((e) => {
        const hay = [
          e.name,
          e.fullName,
          e.category,
          e.field ?? "",
          e.description ?? "",
          ...(e.careersUnlocked ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return tokens.every((t) => hay.includes(t));
      });
    }

    // Sort: upcoming exam dates first, then alphabetical
    const today = Date.now();
    return [...list].sort((a, b) => {
      const aD = a.examDate ? new Date(a.examDate).getTime() : Infinity;
      const bD = b.examDate ? new Date(b.examDate).getTime() : Infinity;
      const aFuture = aD >= today;
      const bFuture = bD >= today;
      if (aFuture && !bFuture) return -1;
      if (!aFuture && bFuture) return 1;
      if (aFuture && bFuture) return aD - bD;
      return a.name.localeCompare(b.name);
    });
  }, [exams, query, field, scope]);

  return (
    <section className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${exams.length} exams — name, field, career it unlocks…`}
          className="h-11 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] pl-10 pr-9 text-sm outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/15"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/55 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* India / International / All toggle */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/45">
          <Filter className="h-3 w-3" /> Scope:
        </span>
        {(["all", "india", "international"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold capitalize",
              scope === s
                ? "border-neon-cyan/50 bg-neon-cyan/15 text-white"
                : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18]"
            )}
          >
            {s === "international" && <Globe className="h-3 w-3" />}
            {s === "india" ? "🇮🇳 India" : s === "international" ? "International" : "All"}
          </button>
        ))}
      </div>

      {/* Field tabs */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        {FIELD_TABS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setField(f.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
              field === f.id
                ? "border-neon-purple/50 bg-neon-purple/15 text-white"
                : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18]"
            )}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      <div className="text-xs text-white/55">
        Showing <b className="text-white">{filtered.length}</b> exam{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="card-glass text-center text-sm text-white/65">
          <div className="text-3xl">🔍</div>
          <h3 className="mt-2 font-display text-base font-bold">No exams match those filters</h3>
          <p className="mt-1 text-xs text-white/55">Try clearing the search or switching the field tab.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((e) => {
            const d = e.examDate ? new Date(e.examDate) : null;
            const isFuture = d && d.getTime() >= Date.now();
            const month = d ? MONTHS[d.getMonth()] : "";
            const day = d ? d.getDate() : "";
            const daysAway = d ? Math.round((d.getTime() - Date.now()) / (24 * 3600 * 1000)) : null;
            return (
              <Link
                key={e._id}
                href={`/dashboard/exams/${e._id}`}
                className="flex gap-3 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06]"
              >
                <div
                  className={cn(
                    "flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl text-center",
                    isFuture
                      ? "bg-grad-pink-purple shadow-glow-pink"
                      : "bg-white/[0.06]"
                  )}
                >
                  {d ? (
                    <>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                        {month}
                      </div>
                      <div className="font-display text-2xl font-black leading-none">{day}</div>
                    </>
                  ) : (
                    <CalendarDays className="h-6 w-6 text-white/55" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="pill !px-2 !py-0 text-[9px] capitalize">{e.field ?? e.category}</span>
                    {e.international && (
                      <span className="pill-neon-purple !px-2 !py-0 text-[9px]">🌍</span>
                    )}
                    {isFuture && daysAway !== null && daysAway <= 60 && (
                      <span className="pill-neon-pink !px-2 !py-0 text-[9px]">{daysAway}d</span>
                    )}
                  </div>
                  <div className="mt-1 font-display text-base font-bold leading-tight">{e.name}</div>
                  <div className="line-clamp-1 text-xs text-white/55">{e.fullName}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-white/65">{e.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
