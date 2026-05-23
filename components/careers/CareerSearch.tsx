"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CareerCard } from "@/components/careers/CareerCard";
import { type CurrencyCode } from "@/lib/currency";
import { cn } from "@/lib/utils";

export type CareerListItem = {
  _id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
  salaryRanges: { entry: number; mid: number; senior: number };
  skillsRequired?: string[];
  interestTags?: string[];
  preferredSubjects?: string[];
};

type SortKey = "name" | "salary-mid" | "salary-senior";

const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "name", label: "A → Z" },
  { id: "salary-mid", label: "Salary (mid-career)" },
  { id: "salary-senior", label: "Salary (senior)" },
];

/**
 * Instant client-side search over the careers list.
 * Matches on name, description, category, skills, interestTags + subjects.
 */
export function CareerSearch({
  careers,
  currency,
}: {
  careers: CareerListItem[];
  currency: CurrencyCode;
}) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = careers;

    if (q) {
      const tokens = q.split(/\s+/).filter(Boolean);
      list = list.filter((c) => {
        const haystack = [
          c.name,
          c.description,
          c.category,
          ...(c.skillsRequired ?? []),
          ...(c.interestTags ?? []),
          ...(c.preferredSubjects ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return tokens.every((t) => haystack.includes(t));
      });
    }

    // Sort
    list = [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "salary-mid") return b.salaryRanges.mid - a.salaryRanges.mid;
      if (sortBy === "salary-senior") return b.salaryRanges.senior - a.salaryRanges.senior;
      return 0;
    });

    return list;
  }, [careers, query, sortBy]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 131 careers — by name, skill, subject, interest…"
            className="h-11 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] pl-10 pr-9 text-sm outline-none transition-all focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/55 hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSort((s) => !s)}
            className={cn(
              "inline-flex h-11 items-center gap-1.5 rounded-2xl border px-3 text-xs font-semibold transition-all",
              showSort
                ? "border-neon-cyan/50 bg-neon-cyan/15 text-white"
                : "border-white/[0.08] bg-white/[0.04] text-white/75 hover:border-white/[0.18]"
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Sort: {SORT_OPTIONS.find((o) => o.id === sortBy)?.label}</span>
          </button>
          {showSort && (
            <div className="absolute right-0 z-20 mt-1 w-56 rounded-2xl border border-white/[0.12] bg-bg-2 p-1.5 shadow-2xl">
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setSortBy(o.id);
                    setShowSort(false);
                  }}
                  className={cn(
                    "block w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition-all",
                    sortBy === o.id
                      ? "bg-neon-cyan/15 text-neon-cyan"
                      : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result count */}
      <div className="text-xs text-white/55">
        {query ? (
          <>
            <b className="text-white">{filtered.length}</b> match
            {filtered.length !== 1 ? "es" : ""} for{" "}
            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-white">
              {query}
            </span>
          </>
        ) : (
          <>
            Showing all <b className="text-white">{filtered.length}</b> careers
          </>
        )}
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div className="card-glass text-center text-sm text-white/65">
          <div className="text-3xl">🔍</div>
          <h3 className="mt-2 font-display text-base font-bold">No careers found</h3>
          <p className="mt-1 text-xs text-white/55">
            Try a shorter query like <code className="rounded bg-white/[0.06] px-1.5 py-0.5">law</code>,{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5">math</code> or{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5">design</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CareerCard
              key={c._id}
              id={c._id}
              name={c.name}
              emoji={c.emoji}
              description={c.description}
              category={c.category}
              salaryEntry={c.salaryRanges.entry}
              salaryMid={c.salaryRanges.mid}
              currency={currency}
            />
          ))}
        </div>
      )}
    </section>
  );
}
