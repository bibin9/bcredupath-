"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Phone, Mail, MapPin, Loader2, X, Globe, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export type RoadmapStage = {
  degree: string;
  duration?: string;
  entranceExams?: string[];
  notes?: string;
};

export type CareerRoadmapData = {
  class10?: { focus?: string; minScore?: string };
  class12: {
    stream: string;
    coreSubjects: string[];
    minScore?: string;
    notes?: string;
  };
  undergrad: RoadmapStage[];
  postgrad?: RoadmapStage[];
  finalRole?: string;
};

type College = {
  _id: string;
  name: string;
  type: string;
  country: string;
  state: string;
  city: string;
  nirfRank?: number;
  globalRank?: number;
  website?: string;
  admissionLink?: string;
  address?: string;
  phone?: string;
  email?: string;
  highlights?: string[];
};

const STREAM_COLOR: Record<string, string> = {
  PCM: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
  PCB: "border-neon-green/40 bg-neon-green/10 text-neon-green",
  PCMB: "border-neon-yellow/40 bg-neon-yellow/10 text-neon-yellow",
  Commerce: "border-neon-yellow/40 bg-neon-yellow/10 text-neon-yellow",
  Humanities: "border-neon-pink/40 bg-neon-pink/10 text-neon-pink",
  Any: "border-white/20 bg-white/[0.04] text-white/85",
};

export function CareerRoadmap({
  roadmap,
  careerId,
  careerName,
}: {
  roadmap: CareerRoadmapData;
  careerId: string;
  careerName: string;
}) {
  const [openDegree, setOpenDegree] = useState<string | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loadingColleges, setLoadingColleges] = useState(false);

  async function showColleges(degree: string) {
    if (openDegree === degree) {
      // Toggle close
      setOpenDegree(null);
      setColleges([]);
      return;
    }
    setOpenDegree(degree);
    setLoadingColleges(true);
    setColleges([]);
    try {
      const res = await fetch(
        `/api/careers/${careerId}/colleges?degree=${encodeURIComponent(degree)}`
      );
      const data = await res.json();
      setColleges(data.colleges ?? []);
    } catch {
      setColleges([]);
    } finally {
      setLoadingColleges(false);
    }
  }

  return (
    <div className="card-glass">
      <div className="mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-neon-pink" />
        <h2 className="font-display text-xl font-bold">Your roadmap to becoming a {careerName}</h2>
      </div>

      <div className="relative space-y-3">
        {/* Step 1 — Class 10 */}
        <Step icon="🎓" stepNumber={1} label="Class 10">
          <div className="text-sm text-white/85">
            {roadmap.class10?.focus ?? "Build strong fundamentals across all subjects."}
            {roadmap.class10?.minScore && (
              <span className="ml-2 inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-neon-yellow">
                Aim {roadmap.class10.minScore}
              </span>
            )}
          </div>
        </Step>

        {/* Connector */}
        <Connector />

        {/* Step 2 — Class 12 */}
        <Step icon="📚" stepNumber={2} label="Class 12">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
                  STREAM_COLOR[roadmap.class12.stream] ?? STREAM_COLOR.Any
                )}
              >
                {roadmap.class12.stream === "Any" ? "🌐" : "📐"} {roadmap.class12.stream} stream
              </span>
              {roadmap.class12.minScore && (
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-neon-yellow">
                  Aim {roadmap.class12.minScore}
                </span>
              )}
            </div>
            <div className="text-xs text-white/65">
              Core subjects:{" "}
              {roadmap.class12.coreSubjects.map((s, i) => (
                <span key={s} className="font-semibold text-white/85">
                  {s}
                  {i < roadmap.class12.coreSubjects.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        </Step>

        <Connector />

        {/* Step 3 — Undergraduate (clickable degrees) */}
        <Step icon="🎯" stepNumber={3} label="Undergraduate">
          <div className="space-y-2">
            {roadmap.undergrad.map((stage) => (
              <DegreeNode
                key={stage.degree}
                stage={stage}
                isOpen={openDegree === stage.degree}
                onClick={() => showColleges(stage.degree)}
              />
            ))}
          </div>
        </Step>

        {/* Step 4 — Postgrad (optional) */}
        {roadmap.postgrad && roadmap.postgrad.length > 0 && (
          <>
            <Connector />
            <Step icon="🎓" stepNumber={4} label="Postgraduate" optional>
              <div className="space-y-2">
                {roadmap.postgrad.map((stage) => (
                  <DegreeNode
                    key={stage.degree}
                    stage={stage}
                    isOpen={openDegree === stage.degree}
                    onClick={() => showColleges(stage.degree)}
                  />
                ))}
              </div>
            </Step>
          </>
        )}

        <Connector />

        {/* Final node */}
        <Step icon="🚀" stepNumber={(roadmap.postgrad?.length ? 5 : 4)} label="Career" finalNode>
          <div className="text-sm font-semibold text-white">
            {roadmap.finalRole ?? careerName}
          </div>
        </Step>
      </div>

      {/* Colleges drawer */}
      <AnimatePresence>
        {openDegree && (
          <CollegesPanel
            degree={openDegree}
            colleges={colleges}
            loading={loadingColleges}
            onClose={() => {
              setOpenDegree(null);
              setColleges([]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Step({
  icon,
  stepNumber,
  label,
  optional,
  finalNode,
  children,
}: {
  icon: string;
  stepNumber: number;
  label: string;
  optional?: boolean;
  finalNode?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl",
            finalNode
              ? "bg-grad-pink-purple shadow-glow-pink animate-pulse-glow"
              : "bg-white/[0.06] border border-white/[0.10]"
          )}
        >
          {icon}
        </div>
      </div>
      <div className="min-w-0 flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/45">
            Step {stepNumber}
          </span>
          <span className="font-display text-base font-bold text-white">{label}</span>
          {optional && (
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] uppercase tracking-widest text-white/55">
              Optional
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex h-4 items-center">
      <div className="ml-[22px] h-full w-0.5 bg-gradient-to-b from-neon-pink/40 via-neon-purple/40 to-neon-cyan/40" />
    </div>
  );
}

function DegreeNode({
  stage,
  isOpen,
  onClick,
}: {
  stage: RoadmapStage;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all",
        isOpen
          ? "border-neon-pink/50 bg-neon-pink/10 shadow-glow-pink"
          : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="font-display text-sm font-bold text-white">{stage.degree}</div>
        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] text-white/55">
          {stage.duration && <span>{stage.duration}</span>}
          {stage.duration && stage.entranceExams && stage.entranceExams.length > 0 && (
            <span>·</span>
          )}
          {stage.entranceExams?.map((e) => (
            <span key={e} className="rounded-full bg-neon-cyan/10 px-1.5 py-0.5 text-neon-cyan">
              {e}
            </span>
          ))}
        </div>
        {stage.notes && (
          <div className="mt-1.5 text-[10px] text-white/65">{stage.notes}</div>
        )}
      </div>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-white/45 transition-transform",
          isOpen && "rotate-180 text-neon-pink"
        )}
      />
    </button>
  );
}

function CollegesPanel({
  degree,
  colleges,
  loading,
  onClose,
}: {
  degree: string;
  colleges: College[];
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-4 overflow-hidden border-t border-white/[0.06] pt-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold">
          Colleges offering <span className="text-neon-pink">{degree}</span>
        </h3>
        <button
          onClick={onClose}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white/55 hover:bg-white/[0.06] hover:text-white"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center text-xs text-white/55">
          <Loader2 className="mx-auto mb-2 h-4 w-4 animate-spin" />
          Finding colleges…
        </div>
      ) : colleges.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-center text-xs text-white/55">
          No colleges with full details yet for <b>{degree}</b>. Check Colleges page for the full list.
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {colleges.map((c) => (
            <CollegeContactCard key={c._id} college={c} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CollegeContactCard({ college: c }: { college: College }) {
  const isAbroad = c.country && c.country !== "India";
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-display text-sm font-bold leading-tight">{c.name}</div>
          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-white/55">
            <MapPin className="h-2.5 w-2.5" />
            <span>{c.city}{c.country && c.country !== "India" ? `, ${c.country}` : c.state ? `, ${c.state}` : ""}</span>
          </div>
        </div>
        {c.nirfRank && (
          <span className="pill-neon-yellow !px-2 !py-0 text-[9px]">NIRF #{c.nirfRank}</span>
        )}
        {isAbroad && c.globalRank && (
          <span className="pill-neon-cyan !px-2 !py-0 text-[9px]">
            <Globe className="h-2.5 w-2.5" /> QS #{c.globalRank}
          </span>
        )}
      </div>

      {c.address && (
        <p className="mt-2 text-[10px] text-white/65">{c.address}</p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
        {c.phone && (
          <a
            href={`tel:${c.phone}`}
            className="inline-flex items-center gap-1 rounded-lg border border-neon-green/30 bg-neon-green/10 px-2 py-1 font-semibold text-neon-green hover:bg-neon-green/20"
          >
            <Phone className="h-2.5 w-2.5" /> {c.phone}
          </a>
        )}
        {c.email && (
          <a
            href={`mailto:${c.email}`}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.05] px-2 py-1 hover:bg-white/[0.10]"
          >
            <Mail className="h-2.5 w-2.5" /> Email
          </a>
        )}
        {c.website && (
          <a
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.05] px-2 py-1 hover:bg-white/[0.10]"
          >
            <ExternalLink className="h-2.5 w-2.5" /> Site
          </a>
        )}
      </div>
    </article>
  );
}
