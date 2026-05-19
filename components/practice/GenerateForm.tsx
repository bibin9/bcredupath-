"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Wand2, RotateCw, Globe, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PracticeRunner, type PracticeQuestion } from "./PracticeRunner";

type ChapterData = {
  name: string;
  count: number;
  topics: { topic: string; count: number }[];
};

type Subject = { id: string; name: string; emoji: string };

export function GenerateForm({
  subjects,
  classNum,
}: {
  subjects: Subject[];
  classNum: 10 | 12;
}) {
  const [subject, setSubject] = useState<string>(subjects[0]?.id ?? "");
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [chapter, setChapter] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [count, setCount] = useState(15);
  const [examType, setExamType] = useState<"board" | "competitive">("board");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<PracticeQuestion[] | null>(null);
  const [sources, setSources] = useState<{ url: string; title: string }[]>([]);

  /* Fetch chapters when subject changes */
  useEffect(() => {
    if (!subject) return;
    setLoading(true);
    setChapter("");
    setTopic("");
    setChapters([]);
    fetch(`/api/ai/topics?subject=${subject}&class=${classNum}`)
      .then((r) => r.json())
      .then((d) => {
        setChapters(d.chapters ?? []);
        if (d.chapters?.[0]) setChapter(d.chapters[0].name);
      })
      .catch(() => toast.error("Couldn't load chapters"))
      .finally(() => setLoading(false));
  }, [subject, classNum]);

  /* Reset topic when chapter changes */
  useEffect(() => {
    setTopic("");
  }, [chapter]);

  const currentChapter = chapters.find((c) => c.name === chapter);
  const topics = currentChapter?.topics ?? [];

  async function generate() {
    if (!subject || !chapter) {
      toast.error("Pick a subject and chapter first");
      return;
    }
    setGenerating(true);
    setQuestions(null);
    setSources([]);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          chapter,
          topic: topic || undefined,
          count,
          examType,
          classNum,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Generation failed");
      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions returned. Try a different topic.");
      }
      setQuestions(data.questions);
      setSources(data.sources ?? []);
      const srcMsg = data.sources?.length
        ? `${data.questions.length} questions from ${data.sources.length} sources 🌐`
        : `${data.questions.length} fresh questions ready 🎯`;
      toast.success(srcMsg);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  /* RUNNER VIEW */
  if (questions) {
    return (
      <div className="space-y-3">
        <div className="card-glass !p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/45">
                {sources.length > 0 ? (
                  <>
                    <Globe className="h-2.5 w-2.5 text-neon-cyan" />
                    <span>Sourced from {sources.length} sites</span>
                  </>
                ) : (
                  "AI-generated set"
                )}
              </div>
              <div className="truncate text-sm font-semibold">
                {subjects.find((s) => s.id === subject)?.name} · {chapter}
                {topic && ` · ${topic}`}
              </div>
            </div>
            <button
              onClick={() => { setQuestions(null); setSources([]); }}
              className="btn-ghost !py-1.5 text-xs shrink-0"
            >
              <RotateCw className="h-3 w-3" /> New set
            </button>
          </div>

          {sources.length > 0 && (
            <details className="mt-2 group">
              <summary className="cursor-pointer text-[11px] text-neon-cyan hover:underline">
                Show sources ({sources.length})
              </summary>
              <ul className="mt-2 space-y-1">
                {sources.slice(0, 8).map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-start gap-1.5 text-[11px] text-white/65 hover:text-white"
                    >
                      <ExternalLink className="mt-0.5 h-2.5 w-2.5 shrink-0 text-white/35 group-hover/link:text-neon-cyan" />
                      <span className="line-clamp-1">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>

        <PracticeRunner
          mode={{
            id: "ai-generated",
            name: `${examType === "board" ? "Board" : "Competitive"} • ${chapter}`,
            emoji: examType === "board" ? "📝" : "🚀",
            perQuestionSeconds: null,
          }}
          questions={questions}
        />
      </div>
    );
  }

  /* GENERATING SPINNER — web-search flow */
  if (generating) {
    return (
      <div className="card-glass !p-10 text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-4 text-6xl"
        >
          🌐
        </motion.div>
        <div className="font-display text-xl font-bold">Searching the web for real PYQs…</div>
        <p className="mt-1 text-sm text-white/65">
          Looking up <span className="text-white">{count}</span>{" "}
          {examType === "board" ? "CBSE board-style" : "JEE/NEET competitive"} questions on{" "}
          <span className="text-white">{chapter}</span>
          {topic && <> ({topic})</>} from Vedantu, Oswaal, NCERT, BYJU's…
        </p>
        <p className="mt-3 text-xs text-white/45">
          Usually takes 30–60 seconds (web search + question formatting).
        </p>
        <div className="mx-auto mt-5 h-1 w-64 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-grad-cyan-purple"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "40%" }}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {["cbseacademic", "ncert", "vedantu", "oswaal", "byjus", "learncbse"].map((s) => (
            <motion.span
              key={s}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: s.length * 0.1 }}
              className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-white/65"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  /* SELECTOR */
  return (
    <div className="space-y-5">
      <div className="card-glass">
        <div className="mb-4 flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-neon-pink" />
          <h2 className="font-display text-lg font-bold">Generate your set</h2>
        </div>

        {/* STEP 1 — SUBJECT */}
        <Section step={1} label="Subject">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition-all",
                  subject === s.id
                    ? "border-neon-purple/60 bg-neon-purple/15 shadow-glow-purple"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
                )}
              >
                <span className="text-xl">{s.emoji}</span>
                <span className="truncate font-semibold">{s.name}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* STEP 2 — CHAPTER */}
        <Section step={2} label="Chapter">
          {loading ? (
            <div className="text-xs text-white/55">
              <Loader2 className="mr-1 inline h-3 w-3 animate-spin" />
              Loading chapters…
            </div>
          ) : chapters.length === 0 ? (
            <div className="text-xs text-white/55">No chapters yet for this subject.</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {chapters.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setChapter(c.name)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                    chapter === c.name
                      ? "border-neon-pink/60 bg-neon-pink/15 text-neon-pink shadow-glow-pink"
                      : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/[0.18] hover:text-white"
                  )}
                >
                  <span>{c.name}</span>
                  <span className="rounded-full bg-white/[0.10] px-1.5 text-[9px] font-bold text-white/65">
                    {c.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </Section>

        {/* STEP 3 — TOPIC (optional) */}
        <Section step={3} label="Topic (optional)">
          {topics.length === 0 ? (
            <div className="text-xs text-white/55">Pick a chapter first.</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setTopic("")}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold",
                  topic === ""
                    ? "border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan"
                    : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:text-white"
                )}
              >
                ✨ Mixed (all topics)
              </button>
              {topics.map((t) => (
                <button
                  key={t.topic}
                  onClick={() => setTopic(t.topic)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    topic === t.topic
                      ? "border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan"
                      : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:text-white"
                  )}
                >
                  {t.topic}
                </button>
              ))}
            </div>
          )}
        </Section>

        {/* STEP 4 — COUNT */}
        <Section step={4} label={`Number of questions: ${count}`}>
          <input
            type="range"
            min={10}
            max={25}
            step={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-neon-pink"
          />
          <div className="mt-1 flex justify-between text-[10px] text-white/45">
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
          </div>
        </Section>

        {/* STEP 5 — EXAM TYPE */}
        <Section step={5} label="Exam orientation">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setExamType("board")}
              className={cn(
                "rounded-2xl border p-4 text-left transition-all",
                examType === "board"
                  ? "border-neon-yellow/50 bg-neon-yellow/10 shadow-glow-yellow"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
              )}
            >
              <div className="text-2xl">📝</div>
              <div className="mt-1 font-display text-sm font-bold">Board pattern</div>
              <div className="text-[10px] text-white/55">CBSE board paper · mixed difficulty + types</div>
            </button>
            <button
              onClick={() => setExamType("competitive")}
              className={cn(
                "rounded-2xl border p-4 text-left transition-all",
                examType === "competitive"
                  ? "border-neon-pink/50 bg-neon-pink/10 shadow-glow-pink"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
              )}
            >
              <div className="text-2xl">🚀</div>
              <div className="mt-1 font-display text-sm font-bold">Competitive</div>
              <div className="text-[10px] text-white/55">JEE/NEET level · MCQ-heavy · hard</div>
            </button>
          </div>
        </Section>

        {/* GENERATE BUTTON */}
        <div className="mt-6">
          <button
            onClick={generate}
            disabled={!subject || !chapter || generating}
            className="btn-neon w-full !py-3.5 text-base"
          >
            <Sparkles className="h-5 w-5" />
            Generate {count} questions
          </button>
          <p className="mt-2 text-center text-[10px] text-white/45">
            <Globe className="mr-1 inline h-2.5 w-2.5" />
            Free for you — pulls live PYQs from Vedantu, Oswaal, NCERT, BYJU's
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  step,
  label,
  children,
}: {
  step: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 border-t border-white/[0.06] pt-4 first:border-t-0 first:pt-0">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-grad-pink-purple text-[10px] font-bold text-white">
          {step}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-white/65">
          {label}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
