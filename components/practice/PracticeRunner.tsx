"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Timer, Check, X, SkipForward, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Latex } from "@/components/questions/Latex";
import { SolutionPanel } from "@/components/questions/SolutionPanel";
import { ConfettiBurst } from "./ConfettiBurst";
import { ResultsScreen, type SubmitResult } from "./ResultsScreen";

export type PracticeQuestion = {
  _id: string;
  subject: string;
  chapter: string;
  topic: string;
  type: string;
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard" | "VeryHard";
  question: string;
  options: string[] | null;
  answer: number | string;
  solution: {
    steps: string;
    commonMistakes: string[];
    relatedConcepts: string[];
  };
  yearsAsked: number[];
  predictedProbability: number;
  xpReward: number;
  expectedTime: number;
};

export type PracticeMode = {
  id: string;
  name: string;
  emoji: string;
  perQuestionSeconds: number | null;
  /** Total session-wide countdown in seconds (mock test mode). */
  sessionSeconds?: number | null;
  /** If true, hide solutions until session ends (mock test mode). */
  locked?: boolean;
};

type Attempt = {
  questionId: string;
  correct: boolean;
  marks: number;
  timeSpent: number;
  firstTry: boolean;
};

export function PracticeRunner({
  mode,
  questions,
}: {
  mode: PracticeMode;
  questions: PracticeQuestion[];
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [confetti, setConfetti] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(mode.perQuestionSeconds ?? 0);
  // Session-wide timer for mock test mode
  const [sessionLeft, setSessionLeft] = useState(mode.sessionSeconds ?? 0);
  const startedAt = useRef(Date.now());

  const q = questions[idx];
  const isLast = idx === questions.length - 1;
  const isMCQ = q?.type === "MCQ" && q.options && q.options.length > 0;

  // Reset per-question state when moving forward
  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    setSecondsLeft(mode.perQuestionSeconds ?? 0);
    startedAt.current = Date.now();
  }, [idx, mode.perQuestionSeconds]);

  // Per-question countdown timer (auto-submit when zero)
  useEffect(() => {
    if (!mode.perQuestionSeconds || revealed || result) return;
    if (secondsLeft <= 0) {
      handleSubmitAnswer(/*timedOut*/ true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, revealed, result]);

  // Session-wide countdown for mock test (auto-finish when zero)
  useEffect(() => {
    if (!mode.sessionSeconds || result) return;
    if (sessionLeft <= 0) {
      finishSession();
      return;
    }
    const t = setTimeout(() => setSessionLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLeft, result]);

  function handleSubmitAnswer(timedOut = false) {
    if (revealed) return;
    const timeSpent = Math.round((Date.now() - startedAt.current) / 1000);
    const isCorrect =
      isMCQ && selected !== null && Number(selected) === Number(q.answer);
    // For non-MCQ, treat reveal as a self-assessment — neutral, not scored as correct unless user marks it
    setAttempts((prev) => [
      ...prev,
      {
        questionId: q._id,
        correct: !!isCorrect,
        marks: q.marks,
        timeSpent,
        firstTry: true,
      },
    ]);

    // Locked mode (mock test): no reveal, no confetti, just move to next question
    if (mode.locked) {
      if (isLast) finishSession();
      else setIdx((i) => i + 1);
      return;
    }

    setRevealed(true);
    if (isCorrect) {
      setConfetti((n) => n + 1);
      toast.success(`+${q.xpReward} XP — Nailed it ⚡`, { duration: 1500 });
    } else if (timedOut) {
      toast.error("⏱ Time's up!", { duration: 1500 });
    } else if (isMCQ) {
      toast.error("Not quite — check the solution", { duration: 1500 });
    }
  }

  // For non-MCQ, the user marks the attempt themselves after reading the solution
  function selfMark(correct: boolean) {
    setAttempts((prev) => {
      // Replace the placeholder neutral attempt we'll create when revealing
      const last = prev[prev.length - 1];
      if (!last || last.questionId !== q._id) {
        return [
          ...prev,
          {
            questionId: q._id,
            correct,
            marks: q.marks,
            timeSpent: Math.round((Date.now() - startedAt.current) / 1000),
            firstTry: true,
          },
        ];
      }
      const updated = [...prev];
      updated[updated.length - 1] = { ...last, correct };
      return updated;
    });
    if (correct) setConfetti((n) => n + 1);
  }

  function skip() {
    setAttempts((prev) => [
      ...prev,
      {
        questionId: q._id,
        correct: false,
        marks: q.marks,
        timeSpent: Math.round((Date.now() - startedAt.current) / 1000),
        firstTry: false,
      },
    ]);
    if (isLast) finishSession();
    else setIdx((i) => i + 1);
  }

  function next() {
    if (isLast) finishSession();
    else setIdx((i) => i + 1);
  }

  async function finishSession() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/practice/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: mode.id,
          attempts,
          usedPredictor: mode.id === "hot-20" || mode.id === "predicted-paper",
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      const data = (await res.json()) as SubmitResult;
      setResult(data);
    } catch {
      toast.error("Couldn't save your run — please try again");
      setSubmitting(false);
    }
  }

  const progress = useMemo(
    () => ((idx + (revealed ? 1 : 0)) / questions.length) * 100,
    [idx, revealed, questions.length]
  );

  const correctSoFar = attempts.filter((a) => a.correct).length;

  if (result) {
    return (
      <>
        <ConfettiBurst trigger={confetti + 999} count={40} />
        <ResultsScreen result={result} modeName={mode.name} modeId={mode.id} />
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="card-glass text-center text-sm text-white/65">
        No questions available for this mode yet. Try another mode or seed more
        questions.
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <ConfettiBurst trigger={confetti} />

      {/* Header strip: progress + score + timer */}
      <header className="card-glass !p-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-white/55">
            <b className="text-white">{idx + 1}</b>
            <span className="text-white/35"> / {questions.length}</span>
            <span className="ml-2 text-white/35">·</span>
            <span className="ml-2">{mode.emoji} {mode.name}</span>
          </span>
          <span className="flex items-center gap-3">
            {!mode.locked && (
              <span className="pill-neon-green !px-2 !py-0">
                ✓ {correctSoFar}
              </span>
            )}
            {mode.perQuestionSeconds && !revealed && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                  secondsLeft <= 5
                    ? "bg-neon-pink/20 text-neon-pink animate-pulse"
                    : "bg-white/[0.05] text-white/75"
                )}
              >
                <Timer className="h-3 w-3" />
                <span className="stat-num">{secondsLeft}s</span>
              </span>
            )}
            {mode.sessionSeconds && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums",
                  sessionLeft <= 60
                    ? "bg-neon-pink/20 text-neon-pink animate-pulse"
                    : sessionLeft <= 300
                    ? "bg-neon-yellow/15 text-neon-yellow"
                    : "bg-white/[0.05] text-white/75"
                )}
                title="Session time remaining"
              >
                <Timer className="h-3 w-3" />
                <span className="stat-num">
                  {Math.floor(sessionLeft / 3600)}:
                  {String(Math.floor((sessionLeft % 3600) / 60)).padStart(2, "0")}:
                  {String(sessionLeft % 60).padStart(2, "0")}
                </span>
              </span>
            )}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-full bg-grad-pink-purple"
          />
        </div>
      </header>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.article
          key={q._id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="card-glass"
        >
          <header className="mb-3 flex flex-wrap items-center gap-2 text-[10px]">
            <span className="pill !px-2 !py-0">{q.type}</span>
            <span className="pill !px-2 !py-0">{q.marks}m</span>
            <span className="pill !px-2 !py-0">{q.difficulty}</span>
            <span className="ml-auto text-white/45">
              {q.chapter} · {q.topic}
            </span>
          </header>

          <div className="text-base leading-relaxed text-white/90 md:text-lg">
            <Latex>{q.question}</Latex>
          </div>

          {isMCQ && (
            <ol className="mt-4 space-y-2">
              {q.options!.map((opt, i) => {
                const isSel = selected === i;
                const correctIdx = Number(q.answer);
                const isCorrect = revealed && i === correctIdx;
                const isWrongSelected = revealed && isSel && !isCorrect;
                return (
                  <li key={i}>
                    <button
                      onClick={() => !revealed && setSelected(i)}
                      disabled={revealed}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all",
                        !revealed
                          ? "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                          : "",
                        !revealed && isSel && "border-neon-purple/60 bg-neon-purple/15 shadow-glow-purple",
                        isCorrect && "border-neon-green/60 bg-neon-green/15 text-white",
                        isWrongSelected && "border-neon-pink/60 bg-neon-pink/15 text-white"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                          isCorrect
                            ? "bg-neon-green text-bg"
                            : isWrongSelected
                            ? "bg-neon-pink text-bg"
                            : "bg-white/[0.08] text-white/70"
                        )}
                      >
                        {isCorrect ? (
                          <Check className="h-4 w-4" />
                        ) : isWrongSelected ? (
                          <X className="h-4 w-4" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
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

          {/* Non-MCQ: prompt for self-assessment after reveal */}
          {!isMCQ && revealed && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-2 text-xs text-white/65">
                Did you get this right?
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => selfMark(true)}
                  className="flex-1 rounded-2xl border border-neon-green/40 bg-neon-green/15 px-3 py-2 text-sm font-semibold text-neon-green hover:bg-neon-green/25"
                >
                  ✅ Yes, got it
                </button>
                <button
                  onClick={() => selfMark(false)}
                  className="flex-1 rounded-2xl border border-neon-pink/40 bg-neon-pink/15 px-3 py-2 text-sm font-semibold text-neon-pink hover:bg-neon-pink/25"
                >
                  ❌ Got it wrong
                </button>
              </div>
            </div>
          )}

          {/* Solution */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  <SolutionPanel
                    answer={q.answer}
                    steps={q.solution.steps}
                    commonMistakes={q.solution.commonMistakes}
                    relatedConcepts={q.solution.relatedConcepts}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      </AnimatePresence>

      {/* Action bar */}
      <div className="sticky bottom-20 z-10 flex gap-2 lg:bottom-3">
        {!revealed ? (
          <>
            <button onClick={skip} className="btn-ghost">
              <SkipForward className="h-4 w-4" /> Skip
            </button>
            <button
              onClick={() => handleSubmitAnswer(false)}
              disabled={!!(isMCQ && selected === null)}
              className="btn-neon flex-1"
            >
              {mode.locked
                ? isLast
                  ? <>Submit & finish <ArrowRight className="h-4 w-4" /></>
                  : <>Submit & next <ArrowRight className="h-4 w-4" /></>
                : isMCQ
                ? "Submit answer"
                : "Reveal solution"}
            </button>
          </>
        ) : (
          <button
            onClick={next}
            disabled={submitting}
            className="btn-neon w-full"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isLast ? (
              <>
                See results <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Next question <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
