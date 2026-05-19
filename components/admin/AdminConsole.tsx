"use client";

import { useState, useEffect } from "react";
import { Upload, CheckCircle2, XCircle, Loader2, FileSpreadsheet, ListChecks, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Latex } from "@/components/questions/Latex";

const CSV_TEMPLATE = `subject,class,chapter,topic,type,marks,difficulty,question,optionA,optionB,optionC,optionD,answer,solution,yearsAsked,examType,frequencyScore
math,10,Quadratic Equations,Nature of roots,MCQ,1,Easy,"The discriminant of $2x^2 - 4x + 3 = 0$ is:","8","-8","16","-16",1,"D = b^2 - 4ac = 16 - 24 = -8. Negative => roots not real.",2024;2023,Board,9
science,10,Electricity,Ohm's law,SA,3,Medium,"State Ohm's law and verify it experimentally.",,,,,"V = IR with proportionality constant R, valid for ohmic conductors at constant temperature.","Set up circuit with battery, resistor, ammeter, voltmeter. Vary V, measure I, plot V vs I. Straight line through origin verifies V \\propto I.",2023;2024,Board,9`;

type AdminQuestion = {
  _id: string;
  subject: string;
  class: number;
  chapter: string;
  topic: string;
  type: string;
  marks: number;
  difficulty: string;
  question: string;
  options: string[] | null;
  answer: number | string;
  solution: { steps: string };
  yearsAsked: number[];
  predictedProbability: number;
  aiGenerated: boolean;
  verified: boolean;
};

export function AdminConsole() {
  const [tab, setTab] = useState<"import" | "review">("review");

  return (
    <div className="space-y-5">
      <div className="inline-flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
        <button
          onClick={() => setTab("review")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
            tab === "review"
              ? "bg-neon-purple/20 text-white shadow-glow-purple"
              : "text-white/55 hover:text-white"
          )}
        >
          <ListChecks className="h-3.5 w-3.5" /> Review queue
        </button>
        <button
          onClick={() => setTab("import")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
            tab === "import"
              ? "bg-neon-purple/20 text-white shadow-glow-purple"
              : "text-white/55 hover:text-white"
          )}
        >
          <Upload className="h-3.5 w-3.5" /> Import PYQ CSV
        </button>
      </div>

      {tab === "review" ? <ReviewQueue /> : <ImportCsv />}
    </div>
  );
}

/* ---- REVIEW QUEUE ---- */

function ReviewQueue() {
  const [items, setItems] = useState<AdminQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/questions?status=unverified&limit=25");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Load failed");
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load");
    } finally {
      setLoading(false);
    }
  }

  async function verify(id: string, value: boolean) {
    try {
      const res = await fetch(`/api/admin/questions/${id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: value }),
      });
      if (!res.ok) throw new Error("Update failed");
      // Remove from queue if marked verified
      if (value) setItems((it) => it.filter((q) => q._id !== id));
      toast.success(value ? "✓ Verified" : "Unverified");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again");
    }
  }

  return (
    <div className="space-y-3">
      <div className="card-glass !p-3 flex items-center justify-between text-sm">
        <span className="text-white/70">
          <b className="text-white">{total}</b> question{total === 1 ? "" : "s"} awaiting review
        </span>
        <button onClick={load} className="btn-ghost !py-1 text-xs">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="card-glass text-center text-sm text-white/55">
          <Loader2 className="mx-auto h-5 w-5 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="card-glass !p-8 text-center">
          <div className="text-5xl">✨</div>
          <div className="mt-3 font-display text-lg font-bold">Queue clear</div>
          <p className="mt-1 text-sm text-white/65">
            No questions waiting for review. New AI-generated questions appear here automatically.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((q) => (
            <ReviewCard key={q._id} q={q} onVerify={(v) => verify(q._id, v)} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewCard({ q, onVerify }: { q: AdminQuestion; onVerify: (v: boolean) => void }) {
  const [showSolution, setShowSolution] = useState(false);
  const correctIdx = typeof q.answer === "number" ? q.answer : null;
  return (
    <li className="card-glass space-y-2">
      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
        {q.aiGenerated && (
          <span className="rounded-full border border-neon-pink/40 bg-neon-pink/10 px-2 py-0.5 font-bold uppercase tracking-wider text-neon-pink">
            AI-generated
          </span>
        )}
        <span className="pill !px-2 !py-0">{q.subject}</span>
        <span className="pill !px-2 !py-0">Cl {q.class}</span>
        <span className="pill !px-2 !py-0">{q.type}</span>
        <span className="pill !px-2 !py-0">{q.marks}m</span>
        <span className="pill !px-2 !py-0">{q.difficulty}</span>
        <span className="text-white/45">
          {q.chapter} · {q.topic}
        </span>
        <span className="ml-auto stat-num text-[10px] text-neon-yellow">
          {Math.round(q.predictedProbability * 100)}%
        </span>
      </div>

      <div className="text-sm text-white/90">
        <Latex>{q.question}</Latex>
      </div>

      {q.options && (
        <ol className="space-y-1 text-xs">
          {q.options.map((opt, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-2 rounded-xl border px-3 py-1.5",
                correctIdx === i
                  ? "border-neon-green/40 bg-neon-green/10 text-white"
                  : "border-white/[0.08] bg-white/[0.03] text-white/75"
              )}
            >
              <span className="font-bold">{String.fromCharCode(65 + i)}.</span>
              <span><Latex>{opt}</Latex></span>
              {correctIdx === i && <span className="ml-auto text-neon-green">✓</span>}
            </li>
          ))}
        </ol>
      )}

      <details
        open={showSolution}
        onToggle={(e) => setShowSolution((e.target as HTMLDetailsElement).open)}
        className="text-xs"
      >
        <summary className="cursor-pointer text-neon-cyan hover:underline">
          {showSolution ? "Hide solution" : "Show solution"}
        </summary>
        <div className="mt-2 whitespace-pre-wrap rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-white/80">
          <div className="mb-1 text-[10px] uppercase tracking-widest text-white/45">Answer:</div>
          <div className="mb-2 font-semibold text-white">
            <Latex>{String(q.answer)}</Latex>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-white/45">Working:</div>
          <div className="mt-1"><Latex>{q.solution.steps}</Latex></div>
        </div>
      </details>

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onVerify(true)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-neon-green/40 bg-neon-green/15 px-3 py-2 text-sm font-semibold text-neon-green hover:bg-neon-green/25"
        >
          <CheckCircle2 className="h-4 w-4" /> Approve
        </button>
        <button
          onClick={() => {
            if (confirm("Mark as needs-rewrite? It stays in the bank but flagged.")) onVerify(false);
          }}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-white/75 hover:bg-white/[0.10]"
        >
          <XCircle className="h-4 w-4" /> Reject
        </button>
      </div>
    </li>
  );
}

/* ---- CSV IMPORT ---- */

function ImportCsv() {
  const [csv, setCsv] = useState(CSV_TEMPLATE);
  const [markVerified, setMarkVerified] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    insertedCount: number;
    errorCount: number;
    errors: { row: number; error: string }[];
  } | null>(null);

  async function submit() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/import-pyq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv, markVerified }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Import failed");
      setResult(data);
      toast.success(`${data.insertedCount} questions imported`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="card-glass">
        <div className="mb-3 flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 text-neon-cyan" />
          <h2 className="font-display text-lg font-bold">Import verified PYQs from CSV</h2>
        </div>

        <details className="mb-3 text-xs text-white/65">
          <summary className="cursor-pointer text-neon-cyan hover:underline">
            CSV format & column reference
          </summary>
          <div className="mt-2 space-y-1.5">
            <p>One row per question. Header row required. Columns:</p>
            <ul className="ml-4 list-disc space-y-0.5">
              <li><code className="text-white">subject</code> — math, science, sst, english, physics, chemistry, biology, accountancy, economics</li>
              <li><code className="text-white">class</code> — 10 or 12</li>
              <li><code className="text-white">chapter</code>, <code className="text-white">topic</code> — must match existing chapter names (see Question Bank)</li>
              <li><code className="text-white">type</code> — MCQ, AssertionReason, VSA, SA, LA, CaseStudy, HOTS</li>
              <li><code className="text-white">marks</code> — 1-6</li>
              <li><code className="text-white">difficulty</code> — Easy, Medium, Hard, VeryHard</li>
              <li><code className="text-white">question</code>, <code className="text-white">solution</code> — wrap in quotes if they contain commas. LaTeX with <code>$…$</code> works.</li>
              <li><code className="text-white">optionA-D</code> — MCQ only; leave blank otherwise</li>
              <li><code className="text-white">answer</code> — MCQ: index 0-3. SA/LA: text final answer.</li>
              <li><code className="text-white">yearsAsked</code> — semicolon-separated, e.g. <code>2023;2024</code></li>
              <li><code className="text-white">examType</code> — Board, Sample, Exemplar, Mock</li>
              <li><code className="text-white">frequencyScore</code> — 1-10 (importance)</li>
            </ul>
          </div>
        </details>

        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={14}
          className="w-full resize-y rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 font-mono text-[11px] outline-none focus:border-neon-purple/50"
          spellCheck={false}
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={markVerified}
              onChange={(e) => setMarkVerified(e.target.checked)}
              className="h-4 w-4 accent-neon-green"
            />
            <span>Mark as teacher-verified ✓ (recommended for real PYQs)</span>
          </label>
          <button onClick={submit} disabled={loading} className="btn-neon text-sm">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Import
          </button>
        </div>
      </div>

      {result && (
        <div className="card-glass">
          <div className="text-sm">
            <span className="stat-num text-neon-green">{result.insertedCount}</span> inserted ·{" "}
            <span className="stat-num text-neon-pink">{result.errorCount}</span> errors
          </div>
          {result.errors.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs">
              {result.errors.map((e, i) => (
                <li key={i} className="text-neon-pink">
                  <ChevronRight className="inline h-3 w-3" /> Row {e.row}: {e.error}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
