"use client";

import { useEffect, useRef, useState } from "react";

type Counter = { label: string; value: number; suffix?: string; tint: "pink" | "cyan" | "yellow" | "green" };

const COUNTERS: Counter[] = [
  { label: "Questions in bank", value: 3544, tint: "pink" },
  { label: "CBSE-Official verified", value: 1932, tint: "green" },
  { label: "Career roadmaps", value: 158, tint: "yellow" },
  { label: "Colleges (India + abroad)", value: 155, tint: "cyan" },
];

/**
 * Counters that tick up from 0 to their final value when scrolled into
 * view. Gen-Z dopamine driver.
 */
export function LandingCounters() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  function animate() {
    const start = performance.now();
    const duration = 1400;
    function tick(t: number) {
      const p = Math.min(1, (t - start) / duration);
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <div
      ref={ref}
      className="card-glass grid grid-cols-2 gap-4 text-center md:grid-cols-4"
    >
      {COUNTERS.map((c) => {
        const grad = {
          pink: "grad-text",
          cyan: "grad-text",
          yellow: "grad-text-yellow",
          green: "grad-text",
        }[c.tint];
        return (
          <div key={c.label}>
            <div className={`font-display text-4xl font-black md:text-5xl ${grad}`}>
              {Math.round(c.value * progress).toLocaleString("en-IN")}
              {c.suffix}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-white/55">
              {c.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
