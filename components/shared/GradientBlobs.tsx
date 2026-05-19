"use client";

/**
 * Animated background blobs. Lives behind everything via -z-10.
 * Pure CSS, no JS animation cost.
 */
export function GradientBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-neon-purple/30 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-neon-pink/25 blur-3xl animate-blob [animation-delay:-4s]" />
      <div className="absolute -bottom-40 left-1/3 h-[460px] w-[460px] rounded-full bg-neon-cyan/20 blur-3xl animate-blob [animation-delay:-8s]" />
    </div>
  );
}
