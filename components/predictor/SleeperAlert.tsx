"use client";

import { AlertTriangle } from "lucide-react";
import { Latex } from "@/components/questions/Latex";

export type SleeperQuestion = {
  _id: string;
  subject: string;
  chapter: string;
  topic: string;
  question: string;
  yearsAsked: number[];
  frequencyScore: number;
  predictedProbability: number;
};

export function SleeperAlert({ items }: { items: SleeperQuestion[] }) {
  if (items.length === 0) return null;

  return (
    <div className="card-glass !border-neon-pink/30 !bg-gradient-to-br !from-neon-pink/10 !to-transparent shadow-glow-pink">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-neon-pink" />
            <h3 className="font-display text-xl font-bold">Sleeper Alert 😴</h3>
          </div>
          <p className="mt-1 text-xs text-white/65">
            High-frequency topics that haven't shown up in <b>3+ years</b>. Statistically due.
          </p>
        </div>
        <span className="pill-neon-pink shrink-0">{items.length} flagged</span>
      </div>

      <ul className="space-y-2.5">
        {items.slice(0, 5).map((q) => {
          const lastAsked = q.yearsAsked.length ? Math.max(...q.yearsAsked) : "—";
          const yearsSince = typeof lastAsked === "number" ? 2026 - lastAsked : "—";
          return (
            <li
              key={q._id}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon-pink/15 text-neon-pink">
                <span className="stat-num text-sm">{yearsSince}y</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/45">
                  <span className="text-neon-pink">{q.chapter}</span>
                  <span>·</span>
                  <span>{q.topic}</span>
                  <span>·</span>
                  <span>last: {lastAsked}</span>
                </div>
                <div className="line-clamp-2 text-sm text-white/85">
                  <Latex>{q.question}</Latex>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
