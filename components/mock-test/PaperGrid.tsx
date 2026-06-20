"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { CheckCircle2, Clock, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type PaperItem = {
  id: string;
  paperNumber: number;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  questionCount: number;
  attempts: number;
  bestScore?: number;
};

type Filter = "all" | "untouched" | "attempted";

export function PaperGrid({ papers }: { papers: PaperItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "untouched") return papers.filter((p) => p.attempts === 0);
    if (filter === "attempted") return papers.filter((p) => p.attempts > 0);
    return papers;
  }, [filter, papers]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip current={filter} value="all" label="All 20" onClick={setFilter} />
        <FilterChip current={filter} value="untouched" label="Not tried" onClick={setFilter} />
        <FilterChip current={filter} value="attempted" label="Attempted" onClick={setFilter} />
        <span className="ml-auto text-[10px] text-white/45">
          {filtered.length} shown
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href={`/dashboard/mock-test/paper/${p.id}`}
            className={cn(
              "group relative flex flex-col gap-2 overflow-hidden rounded-3xl border bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5",
              p.attempts > 0
                ? "border-neon-green/25 hover:border-neon-green/55"
                : "border-white/[0.08] hover:border-neon-yellow/45"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="font-display text-2xl font-black">
                <span className="text-white/40">#</span>
                {p.paperNumber}
              </div>
              {p.attempts > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-neon-green/15 px-2 py-0.5 text-[9px] font-bold text-neon-green">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Tried · {p.attempts}x
                </span>
              )}
            </div>

            <div className="font-display text-sm font-bold leading-tight">
              Paper {p.paperNumber}
            </div>
            <div className="text-[10px] text-white/55">
              {p.questionCount} questions · 80 marks
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px]">
              <span className="text-white/55">
                <Clock className="mr-0.5 inline h-2.5 w-2.5" />
                {p.durationMinutes / 60}h
              </span>
              {p.bestScore !== undefined ? (
                <span className="font-bold text-neon-yellow">
                  <Trophy className="mr-0.5 inline h-2.5 w-2.5" />
                  Best {p.bestScore}/{p.totalMarks}
                </span>
              ) : (
                <span className="text-white/45">Untried</span>
              )}
            </div>

            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-neon-yellow opacity-0 transition-opacity group-hover:opacity-100">
              {p.attempts > 0 ? (
                <><RotateCcw className="h-3 w-3" /> Take again</>
              ) : (
                <>Start paper →</>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  current,
  value,
  label,
  onClick,
}: {
  current: Filter;
  value: Filter;
  label: string;
  onClick: (f: Filter) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-semibold",
        current === value
          ? "border-neon-yellow/60 bg-neon-yellow/15 text-neon-yellow"
          : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18]"
      )}
    >
      {label}
    </button>
  );
}
