"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/**
 * Lightweight emoji confetti. No deps — pure framer-motion.
 * Renders once when `trigger` changes; auto-cleans up.
 */
export function ConfettiBurst({
  trigger,
  emojis = ["🎉", "✨", "⚡", "🔥", "🌟", "💯"],
  count = 24,
}: {
  trigger: number; // increment to fire
  emojis?: string[];
  count?: number;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 1500);
    return () => clearTimeout(t);
  }, [trigger]);

  const pieces = useMemo(() => {
    void trigger; // intentional: regenerate on each fire
    return Array.from({ length: count }, () => ({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100 - 50,
      y: -Math.random() * 60 - 40,
      rot: Math.random() * 540 - 270,
      delay: Math.random() * 0.15,
      size: 16 + Math.random() * 18,
    }));
  }, [trigger, emojis, count]);

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          {pieces.map((p, i) => (
            <motion.div
              key={`${trigger}-${i}`}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.5 }}
              animate={{
                opacity: [1, 1, 0],
                x: `${p.x}vw`,
                y: `${p.y}vh`,
                rotate: p.rot,
                scale: [0.5, 1.2, 0.8],
              }}
              transition={{
                duration: 1.4,
                delay: p.delay,
                ease: "easeOut",
              }}
              className="absolute select-none"
              style={{ fontSize: p.size }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
