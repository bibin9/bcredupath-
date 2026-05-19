"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  AVATAR_EMOJIS,
  INDIAN_STATES,
  STREAMS,
  INTEREST_QUIZ,
  type Stream,
  type ClassNum,
} from "@/lib/constants";

type State = {
  name: string;
  avatar: string;
  cls: ClassNum | null;
  stream: Stream | null;
  state: string;
  city: string;
  school: string;
  interests: string[];
};

const TOTAL_STEPS = 5;

export function OnboardingFlow({
  defaultName,
  defaultAvatar,
}: {
  defaultName?: string;
  defaultAvatar?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<State>({
    name: defaultName ?? "",
    avatar: defaultAvatar ?? "🦊",
    cls: null,
    stream: null,
    state: "",
    city: "",
    school: "",
    interests: [],
  });

  const update = <K extends keyof State>(k: K, v: State[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const stepValid = useMemo(() => {
    if (step === 0) return data.name.trim().length >= 2;
    if (step === 1) return data.cls === 10 || data.cls === 12;
    if (step === 2) return data.cls === 10 || !!data.stream;
    if (step === 3) return !!data.state;
    if (step === 4) return data.interests.length >= 3;
    return true;
  }, [step, data]);

  function next() {
    if (!stepValid) return;
    if (step === 1 && data.cls === 10) {
      setStep(3); // skip stream for class 10
    } else if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      submit();
    }
  }

  function back() {
    if (step === 0) return;
    if (step === 3 && data.cls === 10) setStep(1);
    else setStep((s) => s - 1);
  }

  async function submit() {
    setSaving(true);
    try {
      const res = await fetch("/api/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          avatar: data.avatar,
          class: data.cls,
          stream: data.cls === 12 ? data.stream : null,
          state: data.state,
          city: data.city || undefined,
          school: data.school || undefined,
          interests: data.interests,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not save profile");
      }
      toast.success("All set! Welcome to BCRedupath 🎉");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const realStep = step === 2 && data.cls === 10 ? 3 : step;
  const progress = ((realStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="card-glass">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-widest text-white/55">
            Step {realStep + 1} of {TOTAL_STEPS}
          </span>
          <span className="text-white/45">Takes &lt; 60 sec</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-grad-pink-purple shadow-glow-pink"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && <StepWelcome data={data} update={update} />}
          {step === 1 && <StepClass data={data} update={update} />}
          {step === 2 && data.cls === 12 && <StepStream data={data} update={update} />}
          {step === 3 && <StepLocation data={data} update={update} />}
          {step === 4 && <StepInterests data={data} update={update} />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={back}
          disabled={step === 0}
          className={cn(
            "btn-ghost",
            step === 0 && "invisible"
          )}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={next}
          disabled={!stepValid || saving}
          className="btn-neon flex-1 max-w-[200px]"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : step === TOTAL_STEPS - 1 ? (
            <>
              Finish <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Continue <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Step 1: Name + avatar ── */
function StepWelcome({
  data,
  update,
}: {
  data: State;
  update: <K extends keyof State>(k: K, v: State[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold">Hey, what's your name? 👋</h2>
      <p className="mt-1 text-sm text-white/55">
        And pick an avatar — change it any time.
      </p>

      <input
        autoFocus
        value={data.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Your name"
        className="mt-5 h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
      />

      <div className="mt-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-white/55">
          Pick your avatar
        </div>
        <div className="grid grid-cols-8 gap-2">
          {AVATAR_EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => update("avatar", e)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-2xl border text-2xl transition-all hover:scale-110",
                data.avatar === e
                  ? "border-neon-pink bg-neon-pink/15 shadow-glow-pink"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
              )}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Class ── */
function StepClass({
  data,
  update,
}: {
  data: State;
  update: <K extends keyof State>(k: K, v: State[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold">Which class are you in? 🎓</h2>
      <p className="mt-1 text-sm text-white/55">We'll tailor everything to your board.</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[10, 12].map((c) => (
          <button
            key={c}
            onClick={() => update("cls", c as ClassNum)}
            className={cn(
              "group relative overflow-hidden rounded-3xl border p-5 text-left transition-all",
              data.cls === c
                ? "border-neon-cyan bg-neon-cyan/10 shadow-glow-cyan"
                : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
            )}
          >
            <div className="font-display text-5xl font-black">{c}</div>
            <div className="mt-1 text-sm text-white/65">Class {c} • CBSE</div>
            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
              Boards Feb 2026
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3: Stream (class 12 only) ── */
function StepStream({
  data,
  update,
}: {
  data: State;
  update: <K extends keyof State>(k: K, v: State[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold">What's your stream? 📚</h2>
      <p className="mt-1 text-sm text-white/55">We'll load the right subjects.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {STREAMS.map((s) => (
          <button
            key={s.id}
            onClick={() => update("stream", s.id)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
              data.stream === s.id
                ? "border-neon-purple bg-neon-purple/10 shadow-glow-purple"
                : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
            )}
          >
            <div className="text-3xl">{s.emoji}</div>
            <div className="text-sm font-semibold">{s.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 4: Location ── */
function StepLocation({
  data,
  update,
}: {
  data: State;
  update: <K extends keyof State>(k: K, v: State[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold">Where do you live? 📍</h2>
      <p className="mt-1 text-sm text-white/55">
        Unlocks state leaderboards & local scholarships.
      </p>

      <div className="mt-5 space-y-3">
        <select
          value={data.state}
          onChange={(e) => update("state", e.target.value)}
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-bg-2 px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        >
          <option value="">Select your state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          value={data.city}
          onChange={(e) => update("city", e.target.value)}
          placeholder="City (optional)"
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />

        <input
          value={data.school}
          onChange={(e) => update("school", e.target.value)}
          placeholder="School name (optional)"
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
        />
      </div>
    </div>
  );
}

/* ── Step 5: Interest swipe quiz ── */
function StepInterests({
  data,
  update,
}: {
  data: State;
  update: <K extends keyof State>(k: K, v: State[K]) => void;
}) {
  function toggleTag(tag: string) {
    const set = new Set(data.interests);
    if (set.has(tag)) set.delete(tag);
    else set.add(tag);
    update("interests", Array.from(set));
  }

  function pick(qId: string, tags: readonly string[], yes: boolean) {
    if (!yes) return;
    const set = new Set(data.interests);
    tags.forEach((t) => set.add(t));
    set.add(`q:${qId}`);
    update("interests", Array.from(set));
  }

  return (
    <div>
      <h2 className="font-display text-3xl font-bold">What gets you going? ⚡</h2>
      <p className="mt-1 text-sm text-white/55">
        Tap the ones that sound like you. We'll match careers.
      </p>

      <div className="mt-5 grid gap-2.5">
        {INTEREST_QUIZ.map((q) => {
          const picked = data.interests.includes(`q:${q.id}`);
          return (
            <button
              key={q.id}
              onClick={() =>
                picked ? toggleTag(`q:${q.id}`) : pick(q.id, q.tags, true)
              }
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-3 text-left transition-all",
                picked
                  ? "border-neon-green bg-neon-green/10 shadow-glow-green"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
              )}
            >
              <span className="text-2xl">{q.emoji}</span>
              <span className="flex-1 text-sm">{q.text}</span>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                  picked
                    ? "border-neon-green bg-neon-green text-bg"
                    : "border-white/20"
                )}
              >
                {picked ? <Check className="h-3.5 w-3.5" /> : ""}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-white/45">
        Pick at least 3. You can change these later.
      </p>
    </div>
  );
}
