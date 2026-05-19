"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCw, Coffee, Zap, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Mode = "focus" | "short-break" | "long-break";

const PRESETS: Record<Mode, { minutes: number; label: string; emoji: string; color: string }> = {
  focus:        { minutes: 25, label: "Focus",       emoji: "⚡", color: "neon-pink" },
  "short-break":{ minutes: 5,  label: "Short break", emoji: "☕", color: "neon-cyan" },
  "long-break": { minutes: 15, label: "Long break",  emoji: "🛋️", color: "neon-green" },
};

export function Pomodoro() {
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(PRESETS.focus.minutes * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [muted, setMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Tick
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          finishSession();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function finishSession() {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!muted && typeof window !== "undefined") {
      // Simple beep using Web Audio (no asset needed)
      try {
        const ctx = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880;
        o.type = "sine";
        g.gain.value = 0.2;
        o.start();
        setTimeout(() => { o.stop(); ctx.close().catch(() => {}); }, 350);
      } catch {}
    }
    if (mode === "focus") {
      setCompleted((c) => c + 1);
      toast.success("🎯 Focus session done! Take a break.");
      switchMode((completed + 1) % 4 === 0 ? "long-break" : "short-break", false);
    } else {
      toast.success("Break over — back to it ⚡");
      switchMode("focus", false);
    }
  }

  function switchMode(m: Mode, autoStart = true) {
    setMode(m);
    setSecondsLeft(PRESETS[m].minutes * 60);
    setRunning(autoStart);
  }

  function reset() {
    setRunning(false);
    setSecondsLeft(PRESETS[mode].minutes * 60);
  }

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const totalSeconds = PRESETS[mode].minutes * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const config = PRESETS[mode];

  return (
    <div className={cn(
      "card-glass relative overflow-hidden",
      mode === "focus" && "shadow-glow-pink",
      mode !== "focus" && "shadow-glow-cyan"
    )}>
      <div className={cn(
        "absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl",
        mode === "focus" ? "bg-neon-pink/20" : "bg-neon-cyan/20"
      )} />

      <div className="relative">
        {/* Mode tabs */}
        <div className="mb-4 inline-flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
          {(Object.keys(PRESETS) as Mode[]).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => switchMode(m, false)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-all",
                  active
                    ? mode === "focus"
                      ? "bg-neon-pink/20 text-neon-pink"
                      : "bg-neon-cyan/20 text-neon-cyan"
                    : "text-white/55 hover:text-white"
                )}
              >
                <span className="mr-1">{PRESETS[m].emoji}</span>
                <span className="hidden sm:inline">{PRESETS[m].label}</span>
                <span className="sm:hidden">{PRESETS[m].minutes}m</span>
              </button>
            );
          })}
        </div>

        {/* Big circular timer */}
        <div className="relative mx-auto mb-5 aspect-square w-full max-w-[280px]">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <motion.circle
              cx="50" cy="50" r="46" fill="none"
              stroke={mode === "focus" ? "url(#g-pink)" : "url(#g-cyan)"}
              strokeWidth="3" strokeLinecap="round"
              strokeDasharray="289.03"
              animate={{ strokeDashoffset: 289.03 - (289.03 * progress) / 100 }}
              transition={{ duration: 0.4, ease: "linear" }}
            />
            <defs>
              <linearGradient id="g-pink" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff3e88" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="g-cyan" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06d6ff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl">{config.emoji}</div>
            <div className="stat-num mt-1 text-5xl md:text-6xl font-black">
              {String(mins).padStart(2, "0")}<span className="opacity-50">:</span>{String(secs).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest text-white/55">{config.label}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className={cn(
              "btn-neon !px-8",
              mode !== "focus" && "!bg-grad-cyan-purple !shadow-glow-cyan"
            )}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {running ? "Pause" : "Start"}
          </button>
          <button onClick={reset} className="btn-ghost !px-3" aria-label="Reset">
            <RotateCw className="h-4 w-4" />
          </button>
          <button onClick={() => setMuted((m) => !m)} className="btn-ghost !px-3" aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        {/* Streak of completed sessions */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/55">
          <Zap className="h-3 w-3 text-neon-yellow" />
          <span>
            <span className="stat-num text-white">{completed}</span> focus sessions today
          </span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full",
                i < (completed % 4 || (completed > 0 && completed % 4 === 0 ? 4 : 0))
                  ? "bg-neon-pink"
                  : "bg-white/[0.08]"
              )}
            />
          ))}
        </div>
        <div className="mt-1 text-center text-[10px] text-white/45">
          {4 - (completed % 4 || 4)} until your next long break <Coffee className="inline h-2.5 w-2.5" />
        </div>
      </div>
    </div>
  );
}
