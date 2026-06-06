import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  Sparkles,
  Video,
  ScrollText,
  Globe,
  GraduationCap,
  ShieldCheck,
  Trophy,
  MapPin,
} from "lucide-react";

export const dynamic = "force-dynamic";

type Resource = {
  name: string;
  url: string;
  description: string;
  type: "free" | "paid" | "freemium";
  source: "govt" | "publisher" | "edtech" | "ngo";
};

const FREE: Resource[] = [
  {
    name: "CBSE Academic — Official",
    url: "https://cbseacademic.nic.in/",
    description:
      "The source of truth: Sample Question Papers, Question Banks, marking schemes, syllabus, exam circulars. We pull our 800+ CBSE-Official questions from here.",
    type: "free",
    source: "govt",
  },
  {
    name: "NCERT — Textbooks",
    url: "https://ncert.nic.in/textbook.php",
    description:
      "Free official NCERT textbooks (PDFs) for Class 1-12. The base layer of every CBSE syllabus — start here, then move to practice.",
    type: "free",
    source: "govt",
  },
  {
    name: "NCERT Exemplar Problems",
    url: "https://ncert.nic.in/exemplar-problems.php",
    description:
      "Extra practice problems published by NCERT — the cult favourite for serious CBSE prep. Higher difficulty than the textbook, perfect for board-level mastery.",
    type: "free",
    source: "govt",
  },
  {
    name: "DIKSHA — Govt of India",
    url: "https://diksha.gov.in/",
    description:
      "National platform for school education. Free video lessons, quizzes, NCERT-aligned content. Login with mobile/email — no fees.",
    type: "free",
    source: "govt",
  },
  {
    name: "ePathshala (NCERT)",
    url: "https://epathshala.nic.in/",
    description:
      "NCERT's free e-content portal with textbooks, audio-books, videos and interactive activities. Mobile app available.",
    type: "free",
    source: "govt",
  },
  {
    name: "PM eVidya — One Class, One Channel",
    url: "https://pmevidya.education.gov.in/",
    description:
      "Govt-run free TV (SWAYAM PRABHA) + DTH channels covering Class 1-12 syllabus. Useful when internet is patchy.",
    type: "free",
    source: "govt",
  },
  {
    name: "PRASHAST — Inclusive CBSE",
    url: "https://www.cbse.gov.in/cbsenew/cbse.html",
    description:
      "CBSE's disability-friendly question banks + screening tools. Built for students with learning differences but useful as practice for everyone.",
    type: "free",
    source: "govt",
  },
  {
    name: "Khan Academy — Indian Edition",
    url: "https://www.khanacademy.org/",
    description:
      "World-class free Math + Science explainers, available in English + Hindi. Great companion for tough concepts.",
    type: "free",
    source: "ngo",
  },
];

const OLYMPIADS: Resource[] = [
  {
    name: "SOF — Olympiad Foundation",
    url: "https://sofworld.org/",
    description:
      "Runs IMO (Math), NSO (Science), IEO (English), NCO (Computers), IGKO (GK) for Class 1-12. Free sample papers + registration via school.",
    type: "free",
    source: "ngo",
  },
  {
    name: "Indian Talent Olympiad",
    url: "https://www.indiantalent.org/",
    description:
      "ITO conducts Math, English, Reasoning, Drawing, Talent Search olympiads. Free sample papers + workbooks for purchase.",
    type: "freemium",
    source: "ngo",
  },
  {
    name: "Silverzone Olympiads",
    url: "https://www.silverzone.org/",
    description:
      "Silverzone runs iOM (Maths), iIO (Informatics), Smart Kid Genius. Past papers on the site, registration via school.",
    type: "free",
    source: "ngo",
  },
  {
    name: "HBCSE — Indian Olympiads",
    url: "https://olympiads.hbcse.tifr.res.in/",
    description:
      "Govt-backed pathway to International Olympiads in Physics, Chemistry, Math, Biology, Astronomy. Free past papers + selection-process info.",
    type: "free",
    source: "govt",
  },
];

const STATE_BOARDS: Resource[] = [
  {
    name: "CISCE — ICSE / ISC",
    url: "https://www.cisce.org/",
    description:
      "Council for the Indian School Certificate Examinations. Sister to CBSE — many CBSE schools also accept ICSE-style practice.",
    type: "free",
    source: "govt",
  },
  {
    name: "Karnataka SEEB",
    url: "https://kseab.karnataka.gov.in/",
    description:
      "Karnataka State Education Examination Board. Class 10 (SSLC) + Class 12 (PUC) past papers and model question papers.",
    type: "free",
    source: "govt",
  },
  {
    name: "Tamil Nadu DGE",
    url: "https://dge.tn.gov.in/",
    description:
      "Tamil Nadu Directorate of Government Examinations. Class 10 + 12 model question papers + syllabus.",
    type: "free",
    source: "govt",
  },
  {
    name: "Bihar BSEB",
    url: "https://biharboardonline.bihar.gov.in/",
    description:
      "Bihar School Examination Board. Class 10 (Matric) + 12 (Intermediate) sample papers + previous-year questions.",
    type: "free",
    source: "govt",
  },
  {
    name: "Kerala SCERT",
    url: "https://www.scert.kerala.gov.in/",
    description:
      "Kerala State Council of Educational Research and Training. Textbooks, sample papers, and teacher resources for SSLC + Plus 2.",
    type: "free",
    source: "govt",
  },
  {
    name: "Maharashtra MSBSHSE",
    url: "https://mahahsscboard.in/",
    description:
      "Maharashtra State Board of Secondary and Higher Secondary Education. SSC + HSC question papers, syllabus, results.",
    type: "free",
    source: "govt",
  },
];

const PAID: Resource[] = [
  {
    name: "Oswal Publishers — Question Banks",
    url: "https://oswalpublishers.com/cbse/question-bank/",
    description:
      "Chapter-wise CBSE Question Banks (Class 9-12). Solved + unsolved papers, marking schemes. The textbook many top scorers swear by.",
    type: "paid",
    source: "publisher",
  },
  {
    name: "Arihant — All-in-One Series",
    url: "https://www.arihantbooks.com/",
    description:
      "Subject-wise revision books, MCQs, sample papers. Strong for engineering + medical entrance prep too (JEE/NEET line-up).",
    type: "paid",
    source: "publisher",
  },
  {
    name: "Educart — CBSE Question Banks",
    url: "https://educart.co/",
    description:
      "CBSE Class 10 & 12 question banks aligned to the latest pattern (Case Study + Competency-based MCQ). Active updates after every CBSE circular.",
    type: "paid",
    source: "publisher",
  },
  {
    name: "Together with — Rachna Sagar",
    url: "https://www.togetherwitheducation.com/",
    description:
      "Subject-wise CBSE workbooks (Together with English/Math/Science). Mix of theory + practice + sample papers. Widely used in schools.",
    type: "paid",
    source: "publisher",
  },
];

const PLATFORMS: Resource[] = [
  {
    name: "Vedantu",
    url: "https://www.vedantu.com/cbse",
    description:
      "Live online tuition, recorded courses, micro-courses. Free YouTube channel + paid tutoring. Strong for board prep + JEE/NEET.",
    type: "freemium",
    source: "edtech",
  },
  {
    name: "Embibe",
    url: "https://www.embibe.com/",
    description:
      "AI-driven practice + personalised feedback. Class 8-12 CBSE + JEE/NEET. Strong analytics. Free tier + premium.",
    type: "freemium",
    source: "edtech",
  },
  {
    name: "Toppr (now part of Byju's)",
    url: "https://www.toppr.com/",
    description:
      "Adaptive practice + doubt-solving. CBSE Class 5-12. Now bundled with Byju's; quality varies by subject.",
    type: "freemium",
    source: "edtech",
  },
  {
    name: "Careers360 — CBSE Resources",
    url: "https://school.careers360.com/boards/cbse",
    description:
      "Editorial aggregator: question banks, sample papers, college predictor, board exam guides. Heavy on community Q&A.",
    type: "freemium",
    source: "edtech",
  },
  {
    name: "Physics Wallah",
    url: "https://www.pw.live/",
    description:
      "Started on YouTube, now a full platform. Affordable paid courses for JEE/NEET/Board. Strong physics/chem.",
    type: "freemium",
    source: "edtech",
  },
  {
    name: "Unacademy",
    url: "https://unacademy.com/",
    description:
      "Subscription-based live + recorded courses across CBSE + competitive exams. Quality varies by educator.",
    type: "freemium",
    source: "edtech",
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="pill-neon-yellow">
          <Sparkles className="h-3 w-3" /> Beyond BCRedupath
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Other Study Resources 📚
        </h1>
        <p className="mt-1 text-sm text-white/65">
          A curated list of free + paid CBSE prep resources. Use these alongside
          BCRedupath — we don&apos;t mirror their content (we&apos;d be stealing). We
          link out so you can decide what&apos;s worth your time and money.
        </p>
      </header>

      <section className="rounded-3xl border border-neon-green/25 bg-neon-green/8 p-4 text-xs text-white/80">
        <div className="flex items-center gap-2 font-bold text-neon-green">
          <ShieldCheck className="h-4 w-4" /> Why we link instead of copying
        </div>
        <p className="mt-1.5">
          BCRedupath imports questions only from govt-released, free-to-redistribute
          sources (CBSE Academic, NCERT). Question banks from Oswal, Arihant, Educart
          etc. are <b>their commercial product</b> — paid for by their authors. Republishing
          would be copyright infringement. Linking is the honest way.
        </p>
      </section>

      <Section
        title="Free official sources"
        subtitle="Govt-released or non-profit. Pay nothing."
        icon={<ScrollText className="h-5 w-5 text-neon-cyan" />}
        accent="cyan"
        items={FREE}
      />

      <Section
        title="Paid CBSE question banks (publishers)"
        subtitle="Print + digital. Worth the buy if you want curated, well-edited practice."
        icon={<BookOpen className="h-5 w-5 text-neon-yellow" />}
        accent="yellow"
        items={PAID}
      />

      <Section
        title="Olympiads & competitions"
        subtitle="National & international olympiads. Most have free sample papers and the exams themselves are low-cost."
        icon={<Trophy className="h-5 w-5 text-neon-orange" />}
        accent="cyan"
        items={OLYMPIADS}
      />

      <Section
        title="State boards & ICSE — for extra practice"
        subtitle="Most state boards publish their own model papers free. Their math/science papers often overlap heavily with CBSE."
        icon={<MapPin className="h-5 w-5 text-neon-purple" />}
        accent="cyan"
        items={STATE_BOARDS}
      />

      <Section
        title="Online learning platforms"
        subtitle="Live tuition, recorded courses, AI-driven practice. Mix of free + paid tiers."
        icon={<Video className="h-5 w-5 text-neon-pink" />}
        accent="pink"
        items={PLATFORMS}
      />

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-xs text-white/65">
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-neon-purple" />
          <b className="text-white">Found a great free resource we missed?</b>
        </div>
        <p className="mt-1">
          Send it via the beta banner on top of any page. We&apos;ll add it if it
          checks out.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  accent,
  items,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: "cyan" | "yellow" | "pink";
  items: Resource[];
}) {
  const border = {
    cyan: "border-neon-cyan/25",
    yellow: "border-neon-yellow/25",
    pink: "border-neon-pink/25",
  }[accent];
  return (
    <section>
      <header className="mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-display text-xl font-bold">{title}</h2>
        </div>
        <p className="text-xs text-white/55">{subtitle}</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col gap-2 rounded-3xl border ${border} bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:bg-white/[0.06]`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-display text-base font-bold leading-tight">
                {r.name}
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/45 group-hover:text-white" />
            </div>
            <p className="text-xs text-white/70">{r.description}</p>
            <div className="flex flex-wrap gap-1.5">
              <TypePill type={r.type} />
              <SourcePill source={r.source} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function TypePill({ type }: { type: Resource["type"] }) {
  const cfg = {
    free: { label: "✓ Free", cls: "border-neon-green/40 bg-neon-green/10 text-neon-green" },
    paid: { label: "₹ Paid", cls: "border-neon-yellow/40 bg-neon-yellow/10 text-neon-yellow" },
    freemium: { label: "Free + Paid", cls: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" },
  }[type];
  return (
    <span className={`pill !text-[9px] !px-2 !py-0 ${cfg.cls}`}>{cfg.label}</span>
  );
}

function SourcePill({ source }: { source: Resource["source"] }) {
  const cfg = {
    govt: { label: "🇮🇳 Govt of India", cls: "text-white/70" },
    publisher: { label: "📕 Publisher", cls: "text-white/70" },
    edtech: { label: "💻 EdTech", cls: "text-white/70" },
    ngo: { label: "🌍 Non-profit", cls: "text-white/70" },
  }[source];
  return <span className={`pill !text-[9px] !px-2 !py-0 ${cfg.cls}`}>{cfg.label}</span>;
}
