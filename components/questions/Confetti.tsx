"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Tiny inline confetti burst. No external library needed —
 * 24 colored dots fly out radially over ~1.2 s, then unmount.
 */
const COLORS = [
  "#FF3D9A", // pink
  "#FFD93D", // yellow
  "#39F0FF", // cyan
  "#A855F7", // purple
  "#3AE693", // green
];

export function Confetti({ trigger }: { trigger: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1300);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {Array.from({ length: 28 }).map((_, i) => {
        const angle = (i / 28) * 2 * Math.PI;
        const distance = 80 + Math.random() * 80;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const color = COLORS[i % COLORS.length];
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x,
              y: y + 40, // gravity pull
              opacity: 0,
              scale: 1,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}
