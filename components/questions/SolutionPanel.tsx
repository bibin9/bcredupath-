"use client";

import { AlertTriangle, Link as LinkIcon } from "lucide-react";
import { Latex } from "./Latex";

export function SolutionPanel({
  answer,
  steps,
  commonMistakes,
  relatedConcepts,
}: {
  answer: number | string;
  steps: string;
  commonMistakes: string[];
  relatedConcepts: string[];
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neon-green/30 bg-neon-green/10 p-4">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neon-green">
          Answer
        </div>
        <div className="text-base font-semibold text-white">
          <Latex>{String(answer)}</Latex>
        </div>
      </div>

      <div>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/55">
          Step-by-step
        </div>
        <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-white/85">
          <Latex>{steps}</Latex>
        </div>
      </div>

      {commonMistakes.length > 0 && (
        <div className="rounded-2xl border border-neon-pink/25 bg-neon-pink/8 p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-pink">
            <AlertTriangle className="h-3 w-3" /> Common mistakes
          </div>
          <ul className="space-y-1 text-sm text-white/80">
            {commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-neon-pink">•</span>
                <span><Latex>{m}</Latex></span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedConcepts.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/55">
            <LinkIcon className="h-3 w-3" /> Related concepts
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedConcepts.map((c, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
              >
                <Latex>{c}</Latex>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
