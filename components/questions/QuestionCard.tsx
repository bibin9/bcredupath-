"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Latex } from "./Latex";
import { PredictionBadge } from "./PredictionBadge";
import { SolutionPanel } from "./SolutionPanel";
import { BookmarkButton } from "./BookmarkButton";

export type QuestionDoc = {
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
  examType: string;
  predictedProbability: number;
  xpReward: number;
  expectedTime: number;
  verified?: boolean;
  verifiedBy?: string;
};

const diffColor: Record<QuestionDoc["difficulty"], string> = {
  Easy: "text-neon-green border-neon-green/30 bg-neon-green/10",
  Medium: "text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10",
  Hard: "text-neon-orange border-neon-orange/30 bg-neon-orange/10",
  VeryHard: "text-neon-pink border-neon-pink/30 bg-neon-pink/10",
};

export function QuestionCard({
  q,
  index,
  isBookmarked,
}: {
  q: QuestionDoc;
  index: number;
  isBookmarked?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const isMCQ = q.type === "MCQ" && q.options && q.options.length > 0;

  return (
    <article className="card-glass card-glass-hover">
      <header className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-bold text-white/65">
          Q{index + 1}
        </span>
        <PredictionBadge probability={q.predictedProbability} size="sm" />
        {q.verified && (
          q.verifiedBy?.includes("CBSE") ? (
            <span
              title={`Official CBSE Sample Paper question — sourced from ${q.verifiedBy}`}
              className="pill !px-2 !py-0 text-[10px] text-neon-green border-neon-green/50 bg-neon-green/15 font-bold"
            >
              🇮🇳 CBSE Official
            </span>
          ) : (
            <span
              title="Teacher-verified question"
              className="pill !px-2 !py-0 text-[10px] text-neon-green border-neon-green/40 bg-neon-green/10"
            >
              ✓ Verified
            </span>
          )
        )}
        <span className="pill text-[10px]">{q.type}</span>
        <span className="pill text-[10px]">
          {q.marks} {q.marks === 1 ? "mark" : "marks"}
        </span>
        <span className={cn("pill text-[10px]", diffColor[q.difficulty])}>
          {q.difficulty}
        </span>
        {q.yearsAsked.length > 0 && (
          <span className="pill text-[10px] text-white/65">
            {q.yearsAsked.join(", ")}
          </span>
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-neon-yellow">
          ⚡ +{q.xpReward} XP
        </span>
        <BookmarkButton questionId={q._id} initial={isBookmarked} />
      </header>

      <div className="text-base leading-relaxed text-white/90">
        <Latex>{q.question}</Latex>
      </div>

      {isMCQ && (
        <ol className="mt-4 space-y-1.5">
          {q.options!.map((opt, i) => {
            const isSel = selected === i;
            const isCorrect = show && i === Number(q.answer);
            const isWrong = show && isSel && !isCorrect;
            return (
              <li key={i}>
                <button
                  onClick={() => !show && setSelected(i)}
                  disabled={show}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm transition-all",
                    !show &&
                      "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                    !show && isSel &&
                      "border-neon-purple/50 bg-neon-purple/10",
                    isCorrect && "border-neon-green/60 bg-neon-green/15 text-white",
                    isWrong && "border-neon-pink/60 bg-neon-pink/15 text-white"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                      isCorrect
                        ? "bg-neon-green text-bg"
                        : isWrong
                        ? "bg-neon-pink text-bg"
                        : "bg-white/[0.06] text-white/70"
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

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShow((s) => !s)}
          className={cn(
            "btn-ghost text-sm",
            show && "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan"
          )}
        >
          <Eye className="h-4 w-4" />
          {show ? "Hide solution" : "Show solution"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", show && "rotate-180")}
          />
        </button>
        <span className="ml-auto text-[10px] text-white/45">
          {q.chapter} · {q.topic}
        </span>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
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
    </article>
  );
}
