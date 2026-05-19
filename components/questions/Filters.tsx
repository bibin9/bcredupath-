"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const TYPES = ["MCQ", "AssertionReason", "VSA", "SA", "LA", "CaseStudy", "HOTS"];
const DIFFS = ["Easy", "Medium", "Hard", "VeryHard"];
const MARKS = [1, 2, 3, 4, 5];

export function Filters({
  chapters,
}: {
  chapters: { _id: string; count: number; avgProb: number }[];
}) {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  function set(key: string, value: string | null) {
    const next = new URLSearchParams(sp);
    if (value === null || sp.get(key) === value) next.delete(key);
    else next.set(key, value);
    startTransition(() => router.push(`${path}?${next.toString()}`, { scroll: false }));
  }

  function clear() {
    startTransition(() => router.push(path, { scroll: false }));
  }

  const activeCount = ["chapter", "type", "difficulty", "marks", "year"].filter(
    (k) => sp.has(k)
  ).length;

  return (
    <div className="space-y-4">
      <FilterGroup label="Type">
        {TYPES.map((t) => (
          <Chip
            key={t}
            label={t}
            active={sp.get("type") === t}
            onClick={() => set("type", t)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Difficulty">
        {DIFFS.map((d) => (
          <Chip
            key={d}
            label={d === "VeryHard" ? "Very Hard" : d}
            active={sp.get("difficulty") === d}
            onClick={() => set("difficulty", d)}
            tone={
              d === "Easy"
                ? "green"
                : d === "Medium"
                ? "yellow"
                : d === "Hard"
                ? "orange"
                : "pink"
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Marks">
        {MARKS.map((m) => (
          <Chip
            key={m}
            label={`${m}m`}
            active={sp.get("marks") === String(m)}
            onClick={() => set("marks", String(m))}
          />
        ))}
      </FilterGroup>

      {chapters.length > 0 && (
        <FilterGroup label="Chapter">
          {chapters.map((c) => (
            <Chip
              key={c._id}
              label={c._id}
              count={c.count}
              active={sp.get("chapter") === c._id}
              onClick={() => set("chapter", c._id)}
            />
          ))}
        </FilterGroup>
      )}

      {activeCount > 0 && (
        <button
          onClick={clear}
          disabled={pending}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-pink hover:underline"
        >
          <X className="h-3 w-3" /> Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  count,
  tone,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
  tone?: "green" | "yellow" | "orange" | "pink";
}) {
  const toneActive = {
    green: "border-neon-green/50 bg-neon-green/15 text-neon-green",
    yellow: "border-neon-yellow/50 bg-neon-yellow/15 text-neon-yellow",
    orange: "border-neon-orange/50 bg-neon-orange/15 text-neon-orange",
    pink: "border-neon-pink/50 bg-neon-pink/15 text-neon-pink",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all",
        active
          ? tone
            ? toneActive[tone]
            : "border-neon-purple/50 bg-neon-purple/15 text-neon-purple shadow-glow-purple"
          : "border-white/10 bg-white/[0.04] text-white/65 hover:border-white/25 hover:text-white"
      )}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className="rounded-full bg-white/10 px-1.5 text-[10px] font-bold text-white/70">
          {count}
        </span>
      )}
    </button>
  );
}
