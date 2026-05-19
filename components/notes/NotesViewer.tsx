"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, BookOpen, AlertTriangle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Latex } from "@/components/questions/Latex";

type ChapterEntry = { name: string; count: number };
type Subject = { id: string; name: string; emoji: string };

type Note = {
  subject: string;
  chapter: string;
  class: number;
  body: string;
  formulaSheet: string;
  keyTakeaways: string[];
};

export function NotesViewer({
  subjects,
  classNum,
}: {
  subjects: Subject[];
  classNum: 10 | 12;
}) {
  const [subject, setSubject] = useState<string>("");
  const [chapters, setChapters] = useState<ChapterEntry[]>([]);
  const [chapter, setChapter] = useState<string>("");
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingNote, setLoadingNote] = useState(false);
  const [note, setNote] = useState<Note | null>(null);

  /* Load chapters when subject changes */
  useEffect(() => {
    if (!subject) {
      setChapters([]);
      setChapter("");
      return;
    }
    setLoadingChapters(true);
    setChapter("");
    setNote(null);
    fetch(`/api/ai/topics?subject=${subject}&class=${classNum}`)
      .then((r) => r.json())
      .then((d) => setChapters(d.chapters ?? []))
      .catch(() => toast.error("Couldn't load chapters"))
      .finally(() => setLoadingChapters(false));
  }, [subject, classNum]);

  async function loadNote(chapterName: string) {
    setChapter(chapterName);
    setLoadingNote(true);
    setNote(null);
    try {
      const res = await fetch(
        `/api/notes?subject=${subject}&chapter=${encodeURIComponent(chapterName)}&classNum=${classNum}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Couldn't load notes");
      setNote(data.note);
      if (!data.cached) toast.success("Notes generated — saved for everyone 🎉");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoadingNote(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Subject grid */}
      <div>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
          1. Pick a subject
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition-all",
                subject === s.id
                  ? "border-neon-purple/60 bg-neon-purple/15 shadow-glow-purple"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
              )}
            >
              <span className="text-xl">{s.emoji}</span>
              <span className="truncate font-semibold">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chapter grid */}
      {subject && (
        <div>
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
            2. Pick a chapter
          </div>
          {loadingChapters ? (
            <div className="text-xs text-white/55">
              <Loader2 className="mr-1 inline h-3 w-3 animate-spin" /> Loading chapters…
            </div>
          ) : chapters.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-xs text-white/55">
              No chapters available yet for this subject (seed Class 12 if you're on Class 12).
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {chapters.map((c) => (
                <button
                  key={c.name}
                  onClick={() => loadNote(c.name)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                    chapter === c.name
                      ? "border-neon-pink/60 bg-neon-pink/15 text-neon-pink shadow-glow-pink"
                      : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18] hover:text-white"
                  )}
                >
                  <span>{c.name}</span>
                  <span className="rounded-full bg-white/[0.10] px-1.5 text-[9px] font-bold text-white/65">
                    {c.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Loading state */}
      {loadingNote && (
        <div className="card-glass !p-10 text-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-3 text-5xl"
          >
            📓
          </motion.div>
          <div className="font-display text-lg font-bold">Preparing your notes…</div>
          <p className="mt-1 text-xs text-white/55">
            First-time chapter takes 20-40s. Future opens are instant.
          </p>
        </div>
      )}

      {/* Note display */}
      {note && !loadingNote && (
        <div className="space-y-4">
          <header className="flex items-end justify-between gap-3">
            <div>
              <span className="pill-neon-cyan">
                <Sparkles className="h-3 w-3" /> AI revision note · verify with NCERT
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl">
                {chapter}
              </h2>
              <div className="text-xs text-white/55">
                Class {classNum} · {subjects.find((s) => s.id === subject)?.name}
              </div>
            </div>
          </header>

          {/* Key takeaways */}
          {note.keyTakeaways.length > 0 && (
            <section className="card-glass !border-neon-yellow/30 !bg-neon-yellow/8">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-yellow">
                🎯 Key takeaways
              </div>
              <ul className="space-y-1.5 text-sm">
                {note.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-neon-yellow">▸</span>
                    <span className="text-white/85"><Latex>{t}</Latex></span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Body */}
          <section className="card-glass">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-neon-cyan" />
              <h3 className="font-display text-lg font-bold">Revision notes</h3>
            </div>
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-white/85 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_strong]:text-white">
              <Latex>{note.body}</Latex>
            </div>
          </section>

          {/* Formula sheet */}
          {note.formulaSheet && (
            <section className="card-glass !border-neon-pink/25">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">📐</span>
                <h3 className="font-display text-lg font-bold">Formula sheet</h3>
              </div>
              <div className="rounded-2xl bg-bg/50 p-4 text-sm leading-relaxed text-white/90 whitespace-pre-wrap">
                <Latex>{note.formulaSheet}</Latex>
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-2xl border border-neon-yellow/25 bg-neon-yellow/8 px-3 py-2 text-[11px] text-white/75">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-yellow" />
            <span>
              AI-generated based on the CBSE syllabus.{" "}
              <b className="text-white">Cross-check with your NCERT textbook</b> before relying on these for exams. Spot an error? Email feedback@bcredupath.example.
            </span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!subject && !loadingNote && (
        <div className="card-glass !p-8 text-center">
          <div className="text-5xl">📓</div>
          <h3 className="mt-3 font-display text-lg font-bold">Pick a subject to begin</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-white/65">
            Each chapter generates a concise revision note + formula sheet you can read in 10 minutes.
            Perfect for the night before an exam.
          </p>
        </div>
      )}
    </div>
  );
}
