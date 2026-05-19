"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { useMemo } from "react";

/**
 * Render a string with embedded LaTeX:
 *   inline:  $...$
 *   block:   $$...$$
 * Falls back to plain text where no math is present.
 */
export function Latex({ children }: { children: string }) {
  const parts = useMemo(() => splitMath(children), [children]);
  return (
    <span className="latex-host">
      {parts.map((p, i) => {
        if (p.type === "text") return <span key={i}>{p.value}</span>;
        if (p.type === "block")
          return (
            <span key={i} className="my-2 block">
              <BlockMath math={p.value} />
            </span>
          );
        try {
          return <InlineMath key={i} math={p.value} />;
        } catch {
          return (
            <span key={i} className="text-neon-pink">
              ${p.value}$
            </span>
          );
        }
      })}
    </span>
  );
}

type Part = { type: "text" | "inline" | "block"; value: string };

function splitMath(input: string): Part[] {
  const out: Part[] = [];
  let i = 0;
  while (i < input.length) {
    if (input.startsWith("$$", i)) {
      const end = input.indexOf("$$", i + 2);
      if (end === -1) {
        out.push({ type: "text", value: input.slice(i) });
        break;
      }
      out.push({ type: "block", value: input.slice(i + 2, end) });
      i = end + 2;
    } else if (input[i] === "$") {
      const end = input.indexOf("$", i + 1);
      if (end === -1) {
        out.push({ type: "text", value: input.slice(i) });
        break;
      }
      out.push({ type: "inline", value: input.slice(i + 1, end) });
      i = end + 1;
    } else {
      const next = findNextDollar(input, i);
      out.push({ type: "text", value: input.slice(i, next === -1 ? undefined : next) });
      i = next === -1 ? input.length : next;
    }
  }
  return out;
}

function findNextDollar(s: string, from: number): number {
  for (let i = from; i < s.length; i++) {
    if (s[i] === "$") return i;
  }
  return -1;
}
