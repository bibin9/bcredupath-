"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Loader2,
  CheckCircle2,
  Circle,
  Flag,
  Send,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Latex } from "@/components/questions/Latex";

type Q = {
  _id: string;
  question: string;
  options: string[] | null;
  answer: number | string;
  solution: { steps: string; commonMistakes: string[]; relatedConcepts: string[] };
  type: string;
  marks: number;
  chapter: string;
  topic: string;
  expectedTime: number;
  verified?: boolean;
  verifiedBy?: string;
};

type Section = {
  name: string;
  instructions: string;
  marksPerQuestion: number;
  questions: Q[];
};

type Paper = {
  subject: string;
  class: number;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  sections: Section[];
};

type Phase = "loading" | "instructions" | "running" | "submitted";

export function MockTestRunner({ subject }: { subject: string }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [paper, setPaper] = useState<Paper | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [activeQ, setActiveQ] = useState(0); // flat index across all sections
  const [answers, setAnswers] = useState<Map<string, number | string>>(new Map());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [perQTime, setPerQTime] = useState<Map<string, number>>(new Map());
  const lastTickRef = useRef<number>(Date.now());

  // ── Fetch paper on mount
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/mock-test/start?subject=${subject}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.paper) {
          setPaper(data.paper);
          setSecondsLeft(data.paper.durationMinutes * 60);
          setPhase("instructions");
        } else {
          setPhase("loading"); // stay loading on error
        }
      })
      .catch(() => {
        if (!cancelled) setPhase("loading");
      });
    return () => {
      cancelled = true;
    };
  }, [subject]);

  // ── Flat list of all questions in paper order
  const flat = useMemo(() => {
    if (!paper) return [] as Array<{ q: Q; section: Section; idxInSection: number }>;
    const out: Array<{ q: Q; section: Section; idxInSection: number }> = [];
    for (const s of paper.sections) {
      s.questions.forEach((q, i) => out.push({ q, section: s, idxInSection: i }));
    }
    return out;
  }, [paper]);

  // ── Countdown + per-Q time accumulator
  useEffect(() => {
    if (phase !== "running") return;
    lastTickRef.current = Date.now();
    const id = window.setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastTickRef.current) / 1000);
      if (elapsed >= 1) {
        lastTickRef.current = now - ((now - lastTickRef.current) % 1000);
        setSecondsLeft((s) => {
          const next = s - elapsed;
          if (next <= 0) {
            setPhase("submitted");
            return 0;
          }
          return next;
        });
        const currentQ = flat[activeQ]?.q;
        if (currentQ) {
          setPerQTime((m) => {
            const next = new Map(m);
            next.set(currentQ._id, (next.get(currentQ._id) ?? 0) + elapsed);
            return next;
          });
        }
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [phase, activeQ, flat]);

  // ── Reset lastTickRef when navigating questions so time gets booked to the new Q
  useEffect(() => {
    if (phase === "running") lastTickRef.current = Date.now();
  }, [activeQ, phase]);

  if (phase === "loading" || !paper) {
    return (
      <div className="card-glass !p-10 text-center">
        <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-neon-yellow" />
        <div className="font-display text-base font-bold">Assembling your paper…</div>
        <p className="mt-1 text-xs text-white/55">
          Picking 38 questions matching the CBSE board structure.
        </p>
      </div>
    );
  }

  if (phase === "instructions") {
    return (
      <InstructionsPanel paper={paper} onStart={() => setPhase("running")} />
    );
  }

  if (phase === "submitted") {
    return (
      <ScoreReport
        paper={paper}
        flat={flat}
        answers={answers}
        perQTime={perQTime}
        secondsRemaining={secondsLeft}
      />
    );
  }

  // ─── RUNNING ───
  const { q, section, idxInSection } = flat[activeQ];
  const isMCQ = q.type === "MCQ" || q.type === "AssertionReason";
  const answered = answers.has(q._id);
  const isFlagged = flagged.has(q._id);
  const spent = perQTime.get(q._id) ?? 0;
  const timePct = Math.min(100, (spent / q.expectedTime) * 100);

  function setAnswer(val: number | string) {
    setAnswers((m) => {
      const next = new Map(m);
      next.set(q._id, val);
      return next;
    });
  }
  function toggleFlag() {
    setFlagged((s) => {
      const next = new Set(s);
      if (next.has(q._id)) next.delete(q._id);
      else next.add(q._id);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {/* TOP STRIP — global timer + section + Q index */}
      <TopBar
        secondsLeft={secondsLeft}
        paper={paper}
        flat={flat}
        answers={answers}
        flagged={flagged}
        activeQ={activeQ}
        onSubmit={() => {
          if (confirm("Submit your paper now? You can't change answers after this.")) {
            setPhase("submitted");
          }
        }}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        {/* Question column */}
        <article className="card-glass">
          <header className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="pill-neon-yellow !py-0">{section.name}</span>
            <span className="pill !py-0">{q.type}</span>
            <span className="pill !py-0">{q.marks} {q.marks === 1 ? "mark" : "marks"}</span>
            <span className="text-white/45">
              Q{idxInSection + 1} of {section.questions.length} in {section.name}
            </span>
            <button
              onClick={toggleFlag}
              className={cn(
                "ml-auto inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-bold",
                isFlagged
                  ? "border-neon-pink/50 bg-neon-pink/15 text-neon-pink"
                  : "border-white/[0.08] bg-white/[0.04] text-white/55 hover:text-white"
              )}
            >
              <Flag className="h-3 w-3" />
              {isFlagged ? "Flagged" : "Flag for review"}
            </button>
          </header>

          {/* Per-question time bar */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-[10px] text-white/45">
              <span>
                <Clock className="mr-1 inline h-3 w-3" /> Recommended: {formatMMSS(q.expectedTime)} · You: {formatMMSS(spent)}
              </span>
              <span className={cn("font-bold", spent > q.expectedTime ? "text-neon-pink" : "text-neon-green")}>
                {spent > q.expectedTime ? "Over budget" : "On time"}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                animate={{ width: `${timePct}%` }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "h-full rounded-full",
                  spent > q.expectedTime
                    ? "bg-neon-pink"
                    : timePct > 70
                      ? "bg-neon-yellow"
                      : "bg-neon-green"
                )}
              />
            </div>
          </div>

          <div className="text-base leading-relaxed text-white/90">
            <Latex>{q.question}</Latex>
          </div>

          {/* Answer area */}
          {isMCQ && q.options && (
            <ol className="mt-4 space-y-1.5">
              {q.options.map((opt, i) => {
                const selected = answers.get(q._id) === i;
                return (
                  <li key={i}>
                    <button
                      onClick={() => setAnswer(i)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm transition-all",
                        selected
                          ? "border-neon-purple/60 bg-neon-purple/15 text-white"
                          : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                          selected ? "bg-neon-purple text-bg" : "bg-white/[0.06] text-white/70"
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">
                        <Latex>{opt}</Latex>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}

          {!isMCQ && (
            <div className="mt-4">
              <textarea
                value={(answers.get(q._id) as string) ?? ""}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={
                  q.marks === 2
                    ? "Your answer (about 30 words)…"
                    : q.marks === 3
                      ? "Your answer (about 50 words)…"
                      : q.marks === 4
                        ? "Your case-study answer (about 80 words)…"
                        : "Your answer (about 100 words)…"
                }
                rows={q.marks === 5 ? 8 : q.marks === 4 ? 6 : 4}
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
              />
              <div className="mt-1 text-[10px] text-white/45">
                Self-assessed in the report — model answer revealed after submit.
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              onClick={() => setActiveQ((i) => Math.max(0, i - 1))}
              disabled={activeQ === 0}
              className="btn-ghost text-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span className="text-[10px] text-white/45">
              {activeQ + 1} / {flat.length}
            </span>
            <button
              onClick={() => setActiveQ((i) => Math.min(flat.length - 1, i + 1))}
              disabled={activeQ === flat.length - 1}
              className="btn-neon text-sm disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </article>

        {/* Sidebar — question palette */}
        <aside className="card-glass !p-3 h-fit lg:sticky lg:top-24">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/55">
            Paper navigator
          </div>
          {paper.sections.map((s) => {
            // Compute flat start index of this section
            let startIdx = 0;
            for (const ss of paper.sections) {
              if (ss === s) break;
              startIdx += ss.questions.length;
            }
            return (
              <div key={s.name} className="mb-3">
                <div className="mb-1 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-white/85">{s.name}</span>
                  <span className="text-white/45">{s.marksPerQuestion}m each</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {s.questions.map((qq, i) => {
                    const flatIdx = startIdx + i;
                    const isActive = flatIdx === activeQ;
                    const isAns = answers.has(qq._id);
                    const isFlg = flagged.has(qq._id);
                    return (
                      <button
                        key={qq._id}
                        onClick={() => setActiveQ(flatIdx)}
                        className={cn(
                          "relative flex h-8 items-center justify-center rounded-lg border text-[10px] font-bold transition-all",
                          isActive
                            ? "border-neon-yellow/60 bg-neon-yellow/15 text-neon-yellow"
                            : isAns
                              ? "border-neon-green/40 bg-neon-green/10 text-neon-green"
                              : "border-white/[0.08] bg-white/[0.04] text-white/55 hover:text-white"
                        )}
                      >
                        {i + 1}
                        {isFlg && (
                          <Flag className="absolute -right-0.5 -top-0.5 h-2 w-2 text-neon-pink" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="mt-3 flex items-center gap-3 border-t border-white/[0.06] pt-2 text-[9px] text-white/45">
            <span>
              <CheckCircle2 className="mr-0.5 inline h-2.5 w-2.5 text-neon-green" /> Answered
            </span>
            <span>
              <Flag className="mr-0.5 inline h-2.5 w-2.5 text-neon-pink" /> Flagged
            </span>
            <span>
              <Circle className="mr-0.5 inline h-2.5 w-2.5 text-white/40" /> Unseen
            </span>
          </div>
          <button
            onClick={() => {
              if (confirm("Submit your paper now? You can't change answers after this.")) {
                setPhase("submitted");
              }
            }}
            className="mt-3 btn-neon w-full text-xs"
          >
            <Send className="h-3 w-3" /> Submit paper
          </button>
        </aside>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────

function TopBar({
  secondsLeft,
  paper,
  flat,
  answers,
  flagged,
  activeQ,
  onSubmit,
}: {
  secondsLeft: number;
  paper: Paper;
  flat: Array<{ q: Q; section: Section; idxInSection: number }>;
  answers: Map<string, number | string>;
  flagged: Set<string>;
  activeQ: number;
  onSubmit: () => void;
}) {
  const lowTime = secondsLeft <= 600; // <= 10 min
  return (
    <div className={cn(
      "sticky top-0 z-30 -mt-4 -mx-4 mb-2 border-b border-white/[0.08] bg-bg/85 px-4 py-3 backdrop-blur-md md:rounded-3xl md:border md:mt-0 md:mx-0",
      lowTime && "border-neon-pink/40"
    )}>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Clock className={cn("h-4 w-4", lowTime ? "text-neon-pink animate-pulse" : "text-neon-cyan")} />
          <span className={cn("font-display text-2xl font-black", lowTime && "text-neon-pink")}>
            {formatHHMMSS(secondsLeft)}
          </span>
          <span className="text-[10px] text-white/45">left</span>
        </div>

        <div className="hidden flex-1 items-center gap-3 text-[10px] text-white/55 md:flex">
          <span>
            <CheckCircle2 className="mr-1 inline h-3 w-3 text-neon-green" />
            {answers.size}/{flat.length} answered
          </span>
          {flagged.size > 0 && (
            <span>
              <Flag className="mr-1 inline h-3 w-3 text-neon-pink" />
              {flagged.size} flagged
            </span>
          )}
          <span className="ml-auto">
            {paper.subject.toUpperCase()} · Class {paper.class} · {paper.totalMarks} marks
          </span>
        </div>

        <button onClick={onSubmit} className="btn-neon ml-auto text-xs md:ml-0">
          <Send className="h-3 w-3" /> Submit
        </button>
      </div>
    </div>
  );
}

function InstructionsPanel({
  paper,
  onStart,
}: {
  paper: Paper;
  onStart: () => void;
}) {
  return (
    <div className="card-glass !p-6 md:!p-8">
      <span className="pill-neon-yellow">
        <Sparkles className="h-3 w-3" /> Read this carefully
      </span>
      <h1 className="mt-3 font-display text-2xl font-bold md:text-4xl">{paper.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/65">
        <span>
          <Clock className="mr-1 inline h-3 w-3" /> 3 hours
        </span>
        <span>
          📝 {paper.totalMarks} marks
        </span>
        <span>
          🎯 {paper.sections.reduce((s, sec) => s + sec.questions.length, 0)} questions
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-neon-yellow/25 bg-neon-yellow/8 p-3 text-xs text-white/75">
          <div className="mb-1 flex items-center gap-1.5 font-bold text-neon-yellow">
            <AlertTriangle className="h-3.5 w-3.5" /> General Instructions
          </div>
          <ul className="space-y-1">
            <li>• This question paper contains <b>{paper.sections.reduce((s, sec) => s + sec.questions.length, 0)} questions</b> divided into 5 sections.</li>
            <li>• All questions are compulsory unless internal choice is given.</li>
            <li>• Each question shows the recommended time based on its marks.</li>
            <li>• Use the navigator panel to flag questions for review.</li>
            <li>• Submit early or auto-submit when the 3-hour timer hits 0.</li>
          </ul>
        </div>

        {paper.sections.map((s) => (
          <div key={s.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="pill-neon-cyan !text-[10px] !py-0">{s.name}</span>
              <span className="text-white/65">{s.instructions}</span>
            </div>
            <div className="mt-1 text-[10px] text-white/45">
              {s.questions.length} questions × {s.marksPerQuestion} marks = {s.questions.length * s.marksPerQuestion} marks
            </div>
          </div>
        ))}
      </div>

      <button onClick={onStart} className="btn-neon mt-6 w-full text-base">
        <Clock className="h-4 w-4" /> Start the 3-hour timer
      </button>
      <p className="mt-2 text-center text-[10px] text-white/45">
        Once you tap Start, the clock won&apos;t pause. Don&apos;t hit Start until you&apos;re ready.
      </p>
    </div>
  );
}

function ScoreReport({
  paper,
  flat,
  answers,
  perQTime,
  secondsRemaining,
}: {
  paper: Paper;
  flat: Array<{ q: Q; section: Section; idxInSection: number }>;
  answers: Map<string, number | string>;
  perQTime: Map<string, number>;
  secondsRemaining: number;
}) {
  // Auto-grade MCQ + AR — SA/LA self-assessed (we count them as attempted if non-empty)
  let mcqScore = 0;
  let mcqAttempted = 0;
  let mcqTotalAvailable = 0;
  let saAttempted = 0;
  let saTotal = 0;
  const wrongMCQs: Array<{ q: Q; section: Section; chose?: number }> = [];

  for (const { q, section } of flat) {
    const ans = answers.get(q._id);
    const isMCQ = q.type === "MCQ" || q.type === "AssertionReason";
    if (isMCQ) {
      mcqTotalAvailable += q.marks;
      if (typeof ans === "number") {
        mcqAttempted++;
        if (ans === Number(q.answer)) mcqScore += q.marks;
        else wrongMCQs.push({ q, section, chose: ans });
      }
    } else {
      saTotal += q.marks;
      if (typeof ans === "string" && ans.trim().length >= 5) {
        saAttempted += q.marks;
      }
    }
  }

  // Per-section breakdown
  const sectionBreakdown = paper.sections.map((s) => {
    let answered = 0;
    let mcqCorrect = 0;
    let mcqInSection = 0;
    let timeSpent = 0;
    for (const q of s.questions) {
      const ans = answers.get(q._id);
      timeSpent += perQTime.get(q._id) ?? 0;
      const isMCQ = q.type === "MCQ" || q.type === "AssertionReason";
      if (isMCQ) mcqInSection++;
      if (ans !== undefined && ans !== "" && ans !== null) answered++;
      if (isMCQ && typeof ans === "number" && ans === Number(q.answer)) mcqCorrect++;
    }
    return {
      name: s.name,
      total: s.questions.length,
      answered,
      mcqCorrect,
      mcqInSection,
      timeSpent,
    };
  });

  const totalSpent = paper.durationMinutes * 60 - secondsRemaining;

  return (
    <div className="space-y-5">
      <div className="card-glass !p-6 text-center md:!p-8">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-3 font-display text-2xl font-bold md:text-4xl">
          Paper submitted.
        </h2>
        <p className="mt-1 text-sm text-white/65">
          Time spent: <b className="text-white">{formatHHMMSS(totalSpent)}</b> of 3:00:00
        </p>

        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          <ScoreTile
            label="MCQ + AR"
            value={`${mcqScore}/${mcqTotalAvailable}`}
            sub={`${mcqAttempted} attempted`}
            tint="green"
          />
          <ScoreTile
            label="SA / LA attempted"
            value={`${saAttempted}/${saTotal}`}
            sub="self-assessed"
            tint="cyan"
          />
          <ScoreTile
            label="Total attempted"
            value={`${answers.size}/${flat.length}`}
            sub="questions"
            tint="yellow"
          />
          <ScoreTile
            label="Auto-graded"
            value={`${mcqScore}/${paper.totalMarks}`}
            sub="objective"
            tint="pink"
          />
        </div>
      </div>

      {/* Section breakdown */}
      <section className="card-glass">
        <h3 className="mb-3 font-display text-lg font-bold">Section-wise</h3>
        <div className="space-y-2 text-sm">
          {sectionBreakdown.map((s) => (
            <div
              key={s.name}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3"
            >
              <div>
                <div className="font-bold">{s.name}</div>
                <div className="text-[10px] text-white/55">
                  {s.answered}/{s.total} attempted
                  {s.mcqInSection > 0 && ` · ${s.mcqCorrect}/${s.mcqInSection} MCQ correct`}
                </div>
              </div>
              <div className="text-right text-xs">
                <div>
                  <Clock className="mr-1 inline h-3 w-3 text-neon-cyan" />
                  {formatMMSS(s.timeSpent)}
                </div>
                <div className="text-[10px] text-white/45">time spent</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wrong MCQ review */}
      {wrongMCQs.length > 0 && (
        <section className="card-glass">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
            <AlertTriangle className="h-4 w-4 text-neon-pink" />
            Review your wrong MCQs ({wrongMCQs.length})
          </h3>
          <div className="space-y-3">
            {wrongMCQs.slice(0, 8).map(({ q, chose }) => (
              <div key={q._id} className="rounded-2xl border border-neon-pink/20 bg-neon-pink/5 p-3 text-sm">
                <div className="text-xs text-white/70">
                  <Latex>{q.question.length > 220 ? q.question.slice(0, 220) + "…" : q.question}</Latex>
                </div>
                <div className="mt-2 grid gap-1 text-[11px]">
                  <div className="text-neon-pink">
                    You picked: <b>{q.options?.[chose ?? -1] ?? "—"}</b>
                  </div>
                  <div className="text-neon-green">
                    Correct: <b>{q.options?.[Number(q.answer)] ?? "—"}</b>
                  </div>
                </div>
                {q.solution.steps && (
                  <div className="mt-2 rounded-xl bg-white/[0.04] p-2 text-[11px] text-white/65">
                    {q.solution.steps.slice(0, 240)}{q.solution.steps.length > 240 ? "…" : ""}
                  </div>
                )}
              </div>
            ))}
            {wrongMCQs.length > 8 && (
              <div className="text-center text-[11px] text-white/45">
                +{wrongMCQs.length - 8} more — check the question bank for chapter-wise review.
              </div>
            )}
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          onClick={() => window.location.reload()}
          className="btn-neon text-sm"
        >
          <Sparkles className="h-3.5 w-3.5" /> Try a fresh paper
        </button>
        <a href="/dashboard/mock-test" className="btn-ghost text-sm">
          Other subjects
        </a>
      </div>
    </div>
  );
}

function ScoreTile({
  label,
  value,
  sub,
  tint,
}: {
  label: string;
  value: string;
  sub: string;
  tint: "green" | "cyan" | "yellow" | "pink";
}) {
  const cls = {
    green: "border-neon-green/30 text-neon-green",
    cyan: "border-neon-cyan/30 text-neon-cyan",
    yellow: "border-neon-yellow/30 text-neon-yellow",
    pink: "border-neon-pink/30 text-neon-pink",
  }[tint];
  return (
    <div className={cn("rounded-2xl border bg-white/[0.04] p-3 text-center", cls)}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">{label}</div>
      <div className="stat-num mt-1 text-2xl">{value}</div>
      <div className="text-[10px] text-white/45">{sub}</div>
    </div>
  );
}

// ── Helpers
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function formatHHMMSS(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}
function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${pad2(m)}:${pad2(s)}`;
}
