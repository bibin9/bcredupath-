"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Loader2, BookOpen, GraduationCap, Building2, CalendarDays, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchResult = {
  kind: "question" | "career" | "college" | "exam" | "scholarship";
  id: string;
  title: string;
  subtitle: string;
  emoji?: string;
  href: string;
};

const KIND_ICON = {
  question: BookOpen,
  career: GraduationCap,
  college: Building2,
  exam: CalendarDays,
  scholarship: Coins,
} as const;

const KIND_LABEL = {
  question: "Question",
  career: "Career",
  college: "College",
  exam: "Exam",
  scholarship: "Scholarship",
} as const;

export function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  // Click outside closes
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    setTimeout(() => document.addEventListener("click", onDoc), 0);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  function go(r: SearchResult) {
    setOpen(false);
    setQ("");
    router.push(r.href);
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search questions, chapters, careers…"
        className="h-10 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] pl-10 pr-9 text-sm text-white placeholder:text-white/35 outline-none focus:border-neon-purple/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-neon-purple/20"
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-white/45" />
      )}

      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-12 z-50 max-h-[60vh] overflow-y-auto rounded-3xl border border-white/[0.10] bg-bg-2/95 p-2 shadow-glass backdrop-blur-2xl">
          {!loading && results.length === 0 && (
            <div className="p-4 text-center text-xs text-white/55">
              No matches for &ldquo;{q}&rdquo;.
            </div>
          )}
          {results.length > 0 && (
            <ul className="space-y-1">
              {results.map((r) => {
                const Icon = KIND_ICON[r.kind];
                return (
                  <li key={`${r.kind}-${r.id}`}>
                    <button
                      onClick={() => go(r)}
                      className="flex w-full items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-left transition-all hover:border-white/[0.18] hover:bg-white/[0.06]"
                    >
                      <div className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]",
                        r.kind === "career" && r.emoji ? "text-lg" : ""
                      )}>
                        {r.kind === "career" && r.emoji ? r.emoji : <Icon className="h-4 w-4 text-white/65" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="line-clamp-1 text-sm font-semibold">{r.title}</span>
                          <span className="rounded-full bg-white/[0.06] px-1.5 text-[9px] font-bold uppercase tracking-wider text-white/55">
                            {KIND_LABEL[r.kind]}
                          </span>
                        </div>
                        <div className="line-clamp-1 text-[10px] text-white/45">{r.subtitle}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
