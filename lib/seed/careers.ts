/**
 * 35+ career profiles for India. Each maps to interest tags (matching
 * the onboarding quiz) so we can score Holland Code-style matches.
 *
 * Salaries are approximate INR/year ranges seen in 2024-2025 in India.
 */

export type RoadmapStage = {
  degree: string;
  duration?: string;
  entranceExams?: string[];
  notes?: string;
};

export type CareerRoadmap = {
  class10?: { focus: string; minScore?: string };
  class12: {
    stream: "PCM" | "PCB" | "PCMB" | "Commerce" | "Humanities" | "Any" | string;
    coreSubjects: string[];
    minScore?: string;
    notes?: string;
  };
  undergrad: RoadmapStage[];
  postgrad?: RoadmapStage[];
  finalRole?: string;
};

export type SeedCareer = {
  name: string;
  emoji: string;
  category:
    | "engineering"
    | "medical"
    | "commerce"
    | "law"
    | "arts"
    | "design"
    | "media"
    | "defense"
    | "research"
    | "civil-services"
    | "education"
    | "tech";
  description: string;
  dayInLife: string;
  qualifications: string[];
  entranceExams: { name: string; link: string; dates: string }[];
  salaryRanges: { entry: number; mid: number; senior: number };
  topColleges: string[]; // names — resolved to IDs in seeder if matched
  skillsRequired: string[];
  /** Tags must overlap with onboarding interest tags */
  interestTags: string[];
  /** Subjects best aligned with this career (math, biology, etc) */
  preferredSubjects?: string[];
  growthProspects: string;
  /** Educational journey 10 → 12 → UG → PG → Career */
  roadmap?: CareerRoadmap;
};

export const CAREERS: SeedCareer[] = [
  /* ─── ENGINEERING ─── */
  {
    name: "Software Engineer",
    emoji: "💻",
    category: "tech",
    description:
      "Build software products — from web apps to AI systems. Highest-paying entry-level path in India and the easiest to switch into mid-career.",
    dayInLife:
      "Write code, review pull requests, debug production issues, meet product/design to plan features. Most work remote or hybrid. Free time on personal side projects is common.",
    qualifications: ["B.Tech / B.E. in CS/IT/related", "BCA + Master's", "Self-taught + portfolio (rare but growing)"],
    entranceExams: [
      { name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
      { name: "JEE Advanced", link: "https://jeeadv.ac.in", dates: "May" },
      { name: "BITSAT", link: "https://bitsadmission.com", dates: "May-Jun" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 3_000_000, senior: 8_000_000 },
    topColleges: ["IIT Bombay", "IIT Delhi", "IIT Madras", "BITS Pilani", "IIIT Hyderabad"],
    skillsRequired: ["Programming", "Problem solving", "System design", "Communication"],
    interestTags: ["math", "logic", "tech", "cs", "engineering"],
    growthProspects:
      "Senior Engineer → Staff/Principal → Engineering Manager. Or pivot to product, founding, AI/ML. Strongest tech-to-finance pipeline in India.",
  },
  {
    name: "Mechanical Engineer",
    emoji: "⚙️",
    category: "engineering",
    description:
      "Design and build machines, vehicles, robotics, and manufacturing systems. Core sector with deep crossovers into automotive, aerospace, and EV.",
    dayInLife:
      "CAD modeling, prototype testing, supply-chain coordination, factory visits. Mix of desk + shop floor.",
    qualifications: ["B.Tech / B.E. Mechanical Engineering", "M.Tech for R&D roles"],
    entranceExams: [
      { name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
      { name: "JEE Advanced", link: "https://jeeadv.ac.in", dates: "May" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_500_000, senior: 4_000_000 },
    topColleges: ["IIT Madras", "IIT Bombay", "NIT Trichy", "VIT Vellore"],
    skillsRequired: ["CAD (SolidWorks/AutoCAD)", "Thermodynamics", "Materials science"],
    interestTags: ["engineering", "math", "tech"],
    growthProspects:
      "Design lead → Product manager → Plant head. EV and aerospace are fastest-growing sub-segments.",
  },
  {
    name: "Civil Engineer",
    emoji: "🏗️",
    category: "engineering",
    description:
      "Design and oversee construction of buildings, roads, bridges, water systems. Strong govt + private sector demand in India's infra push.",
    dayInLife:
      "Site supervision, blueprint review, vendor management, quality checks. Heavy field time on construction sites.",
    qualifications: ["B.Tech / B.E. Civil Engineering"],
    entranceExams: [
      { name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_200_000, senior: 3_000_000 },
    topColleges: ["IIT Roorkee", "IIT Bombay", "NIT Surathkal"],
    skillsRequired: ["AutoCAD", "Structural analysis", "Project management"],
    interestTags: ["engineering", "math"],
    growthProspects: "Project Engineer → Manager → Director. GATE + govt sector (PWD, CPWD) is a strong path.",
  },
  {
    name: "Electrical Engineer",
    emoji: "⚡",
    category: "engineering",
    description:
      "Design power systems, circuits, motors, renewable energy infra. Rising demand with India's green energy + semiconductor push.",
    dayInLife:
      "Circuit design in EDA tools, PCB layout, prototyping, field commissioning of equipment.",
    qualifications: ["B.Tech / B.E. Electrical Engineering"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 600_000, mid: 1_400_000, senior: 3_500_000 },
    topColleges: ["IIT Kanpur", "IIT Madras", "NIT Warangal"],
    skillsRequired: ["MATLAB", "Power systems", "Embedded design", "Circuit analysis"],
    interestTags: ["engineering", "tech", "math"],
    growthProspects: "Strong in PSU (NTPC, Power Grid), semiconductors (Intel, AMD design centres India), and EVs.",
  },
  {
    name: "Aerospace Engineer",
    emoji: "🚀",
    category: "engineering",
    description:
      "Design aircraft, satellites, rockets. ISRO, HAL, Boeing India, plus new private space (Skyroot, Agnikul).",
    dayInLife:
      "CFD simulations, materials testing, design reviews. Often deep specialization in propulsion / structures / avionics.",
    qualifications: ["B.Tech Aerospace / Mechanical", "M.Tech / MS for R&D"],
    entranceExams: [
      { name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
      { name: "ISRO Centralised Recruitment Test", link: "https://www.isro.gov.in", dates: "Varies" },
    ],
    salaryRanges: { entry: 700_000, mid: 1_800_000, senior: 4_500_000 },
    topColleges: ["IIT Bombay", "IIT Madras", "IIST Trivandrum"],
    skillsRequired: ["Fluid mechanics", "ANSYS / Abaqus", "Control systems"],
    interestTags: ["engineering", "math", "tech", "research"],
    growthProspects: "ISRO, DRDO, HAL for govt. Private space sector is booming — getting first-mover advantage matters.",
  },

  /* ─── MEDICAL ─── */
  {
    name: "Doctor (MBBS)",
    emoji: "🩺",
    category: "medical",
    description:
      "Diagnose and treat patients. Highest-prestige career in India, but 10+ years of grinding study to be a specialist.",
    dayInLife:
      "OPD consults, surgeries (for surgical specialties), rounds, paperwork. Long hours during residency.",
    qualifications: ["MBBS (5.5 yr)", "MD/MS for specialization (+3 yr)"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
      { name: "AIIMS PG", link: "https://www.aiimsexams.ac.in", dates: "Varies" },
    ],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "AFMC Pune", "JIPMER Puducherry"],
    skillsRequired: ["Clinical reasoning", "Empathy", "Stamina", "Anatomy"],
    interestTags: ["biology", "medical", "social"],
    growthProspects: "Junior resident → Senior resident → Consultant → Department head / private practice / hospital owner.",
  },
  {
    name: "Dentist (BDS)",
    emoji: "🦷",
    category: "medical",
    description:
      "Diagnose and treat oral health. Shorter than MBBS, faster path to independent practice.",
    dayInLife:
      "Clinic-based — patient consults, procedures (fillings, root canals, extractions), some surgery for MDS.",
    qualifications: ["BDS (5 yr)", "MDS for specialization (+3 yr)"],
    entranceExams: [{ name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 400_000, mid: 1_200_000, senior: 3_500_000 },
    topColleges: ["Maulana Azad Institute of Dental Sciences", "GDC Mumbai", "KGMU Lucknow"],
    skillsRequired: ["Manual dexterity", "Patient care", "Anatomy"],
    interestTags: ["biology", "medical"],
    growthProspects: "Private practice is the typical end state — high earning potential after 5-7 years setting up.",
  },
  {
    name: "Pharmacist",
    emoji: "💊",
    category: "medical",
    description:
      "Drug development, dispensing, and clinical pharmacology. Strong career in pharma industry + clinical research.",
    dayInLife:
      "Lab research (in industry), dispensing + counseling (community), or clinical trial coordination.",
    qualifications: ["B.Pharm (4 yr)", "Pharm.D for clinical", "M.Pharm for industry R&D"],
    entranceExams: [
      { name: "NEET UG (for Pharm.D)", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "GPAT", link: "https://gpat.nta.nic.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 300_000, mid: 900_000, senior: 2_500_000 },
    topColleges: ["NIPER Mohali", "Jamia Hamdard", "ICT Mumbai"],
    skillsRequired: ["Chemistry", "Drug analysis", "Attention to detail"],
    interestTags: ["biology", "medical", "research"],
    growthProspects: "Quality control → Production manager → R&D head. Pharma is one of India's biggest export sectors.",
  },
  {
    name: "Physiotherapist",
    emoji: "🤸",
    category: "medical",
    description:
      "Rehab and movement-related healthcare. Growing demand with sports medicine + aging population.",
    dayInLife: "Patient assessment, exercise prescription, manual therapy. Mostly clinic or hospital-based.",
    qualifications: ["BPT (4.5 yr)", "MPT for specialization"],
    entranceExams: [{ name: "NEET UG (some states)", link: "https://neet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 250_000, mid: 700_000, senior: 2_000_000 },
    topColleges: ["AIIMS Delhi (MPT)", "CMC Vellore", "Christian Physiotherapy College"],
    skillsRequired: ["Anatomy", "Empathy", "Manual therapy", "Patient communication"],
    interestTags: ["biology", "medical", "social"],
    growthProspects: "Sports teams, rehab centers, private practice. Major growth segment.",
  },

  /* ─── COMMERCE & BUSINESS ─── */
  {
    name: "Chartered Accountant",
    emoji: "📒",
    category: "commerce",
    description:
      "Audit, tax, financial advisory. One of India's most respected commerce careers — and one of the toughest exams to clear.",
    dayInLife:
      "Audit fieldwork, tax filing season grind, advisory meetings. Long hours March-September; calmer otherwise.",
    qualifications: ["CA Foundation → Intermediate → Final (avg 4-5 yr)"],
    entranceExams: [{ name: "CA Foundation", link: "https://www.icai.org", dates: "Jun & Dec" }],
    salaryRanges: { entry: 800_000, mid: 2_000_000, senior: 6_000_000 },
    topColleges: ["ICAI is the certifying body — no college needed", "SRCC for B.Com (parallel)"],
    skillsRequired: ["Tax law", "Accounting principles", "Excel", "Attention to detail"],
    interestTags: ["finance", "commerce", "economics", "math", "stable", "govt", "analytics"],
    growthProspects: "Big 4 → Senior Manager → Partner. Or in-house at MNCs → CFO. ~30% pass rate for Final keeps the prestige high.",
  },
  {
    name: "Investment Banker",
    emoji: "💼",
    category: "commerce",
    description:
      "Help companies raise capital, do M&A, IPOs. Highest-paying commerce/finance career but brutal hours.",
    dayInLife:
      "Financial modeling, client pitches, deal execution. 80-100 hour weeks during deals are standard.",
    qualifications: ["B.Com / B.B.A. + MBA from top IIM/ISB", "CFA helps"],
    entranceExams: [
      { name: "CAT", link: "https://iimcat.ac.in", dates: "Nov" },
      { name: "GMAT", link: "https://www.mba.com/gmat", dates: "Year-round" },
    ],
    salaryRanges: { entry: 2_500_000, mid: 7_000_000, senior: 25_000_000 },
    topColleges: ["IIM Ahmedabad", "IIM Bangalore", "ISB Hyderabad"],
    skillsRequired: ["Financial modeling", "Valuation", "Stamina", "Client management"],
    interestTags: ["finance", "commerce", "management", "economics"],
    growthProspects: "Analyst → Associate → VP → MD. Brutal pyramid — but base salaries put you in top 1% by 30.",
  },
  {
    name: "Financial Analyst",
    emoji: "📊",
    category: "commerce",
    description:
      "Analyze stocks, mutual funds, sectors for asset management firms. Growing field with India's mutual fund boom.",
    dayInLife: "Reading 10-Ks, building models, writing research notes, sector meetings.",
    qualifications: ["B.Com / B.B.A. + CFA Level 1+", "MBA Finance preferred"],
    entranceExams: [
      { name: "CFA", link: "https://www.cfainstitute.org", dates: "Year-round" },
      { name: "CAT (for MBA)", link: "https://iimcat.ac.in", dates: "Nov" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_800_000, senior: 5_000_000 },
    topColleges: ["SRCC Delhi", "Christ University", "Symbiosis"],
    skillsRequired: ["Excel modeling", "Valuation", "Industry research"],
    interestTags: ["finance", "commerce", "economics", "math", "stats", "analytics", "stable"],
    growthProspects: "Junior analyst → Senior → Portfolio Manager. Fintech is rapidly creating new roles.",
  },
  {
    name: "Marketing Manager",
    emoji: "📣",
    category: "commerce",
    description:
      "Drive brand growth, campaigns, demand generation. Highly creative + analytical mix.",
    dayInLife: "Campaign planning, ad reviews, analytics dashboards, agency calls.",
    qualifications: ["B.B.A. / B.Com + MBA Marketing", "Or pivot from any UG with internships"],
    entranceExams: [{ name: "CAT", link: "https://iimcat.ac.in", dates: "Nov" }],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 4_500_000 },
    topColleges: ["IIM-A/B/C", "MICA", "Symbiosis SIBM"],
    skillsRequired: ["Brand strategy", "Analytics", "Creativity", "Storytelling"],
    interestTags: ["commerce", "creative", "media", "management"],
    growthProspects: "Brand Manager → Marketing Head → CMO. Digital marketing is the fastest-growing segment.",
  },
  {
    name: "Entrepreneur",
    emoji: "🚀",
    category: "commerce",
    description:
      "Build your own business. No fixed path, no fixed pay — full responsibility, full upside.",
    dayInLife:
      "Customer calls, hiring, fundraising, putting out fires. The job rotates with your stage (idea → product → scale).",
    qualifications: ["No formal qualification needed — strong execution is everything"],
    entranceExams: [],
    salaryRanges: { entry: 0, mid: 1_500_000, senior: 50_000_000 },
    topColleges: ["No specific path — Y Combinator / Sequoia Surge / NSRCEL Bangalore can help"],
    skillsRequired: ["Selling", "Hiring", "Resilience", "Capital efficiency"],
    interestTags: ["entrepreneur", "commerce", "creative", "management"],
    growthProspects: "Founder → CEO → Serial entrepreneur / investor. Or it crashes — survival rate is ~10%.",
  },

  /* ─── LAW & CIVIL SERVICES ─── */
  {
    name: "Lawyer",
    emoji: "⚖️",
    category: "law",
    description:
      "Practice law in corporate, litigation, criminal, IP, or constitutional. India's legal market is exploding with M&A and tech.",
    dayInLife: "Drafting contracts, court appearances, client meetings, research. Court hours can be brutal in litigation.",
    qualifications: ["BA LLB / BBA LLB (5 yr integrated)", "LLB (3 yr after UG)"],
    entranceExams: [
      { name: "CLAT", link: "https://consortiumofnlus.ac.in", dates: "Dec" },
      { name: "AILET (NLU Delhi)", link: "https://nationallawuniversitydelhi.in", dates: "Dec" },
      { name: "LSAT India", link: "https://www.discoverlaw.in", dates: "Jan/May" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 3_500_000, senior: 12_000_000 },
    topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "ILS Pune"],
    skillsRequired: ["Legal reasoning", "Writing", "Public speaking", "Research"],
    interestTags: ["law", "social", "humanities"],
    growthProspects: "Associate → Senior Associate → Partner. Tier-1 corporate law firms (AZB, Khaitan, S&R) pay extremely well.",
  },
  {
    name: "IAS / IPS Officer",
    emoji: "🇮🇳",
    category: "civil-services",
    description:
      "Run districts, ministries, departments. Most prestigious govt career in India — and the toughest exam.",
    dayInLife:
      "Public meetings, file work, district tours, crisis management. Variety is enormous depending on posting.",
    qualifications: ["Any UG degree (3 attempts max for general)", "UPSC CSE prep takes 1-3 years"],
    entranceExams: [
      { name: "UPSC Civil Services Exam", link: "https://upsc.gov.in", dates: "Prelims: May/Jun" },
    ],
    salaryRanges: { entry: 720_000, mid: 1_500_000, senior: 3_200_000 },
    topColleges: ["No specific UG needed — top candidates often from IITs, NLUs, DU"],
    skillsRequired: ["Endurance", "General awareness", "Public administration", "Decision making"],
    interestTags: ["social", "humanities", "law", "management", "govt", "stable"],
    growthProspects: "From SDM/ASP at 24 to Chief Secretary / DGP at 55. Lifetime of impact + power.",
  },
  {
    name: "Defense Officer (NDA → Indian Armed Forces)",
    emoji: "🪖",
    category: "defense",
    description:
      "Serve in Army / Navy / Air Force. Officer cadre with rank, benefits, and lifetime pension.",
    dayInLife:
      "Highly variable — training, command, operations. NDA cadets train at Pune for 3 years + 1 yr at service academy.",
    qualifications: ["Class 12 (PCM for Air Force/Navy)", "NDA / CDS exam"],
    entranceExams: [
      { name: "NDA", link: "https://upsc.gov.in", dates: "Apr & Sep" },
      { name: "CDS", link: "https://upsc.gov.in", dates: "Feb & Sep" },
      { name: "AFCAT (IAF)", link: "https://afcat.cdac.in", dates: "Feb & Aug" },
    ],
    salaryRanges: { entry: 700_000, mid: 1_600_000, senior: 3_500_000 },
    topColleges: ["NDA Khadakwasla", "IMA Dehradun", "INA Ezhimala", "AFA Hyderabad"],
    skillsRequired: ["Physical fitness", "Leadership", "Discipline", "Mental toughness"],
    interestTags: ["humanities", "social", "defense", "operations", "govt", "stable"],
    growthProspects: "Lieutenant → Major → Lieutenant Colonel → Colonel → Brigadier → General. Plus opportunities post-retirement.",
  },

  /* ─── ARTS, DESIGN, MEDIA ─── */
  {
    name: "Graphic / UI Designer",
    emoji: "🎨",
    category: "design",
    description:
      "Design websites, apps, brand identity, illustrations. Tech companies pay especially well for product designers.",
    dayInLife: "Figma all day, user research interviews, design reviews, prototyping.",
    qualifications: ["B.Des (4 yr) or self-taught + portfolio"],
    entranceExams: [
      { name: "NID DAT", link: "https://www.nid.edu", dates: "Jan" },
      { name: "UCEED (IITs)", link: "https://www.uceed.iitb.ac.in", dates: "Jan" },
      { name: "NIFT", link: "https://www.nift.ac.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 4_500_000 },
    topColleges: ["NID Ahmedabad", "IIT Bombay IDC", "NIFT Delhi", "Srishti Bangalore"],
    skillsRequired: ["Figma / Sketch", "Typography", "Visual hierarchy", "User research"],
    interestTags: ["design", "creative", "tech", "media"],
    growthProspects: "Junior → Senior → Design Lead → Head of Design. Strong product design = 7-figure base salary.",
  },
  {
    name: "Fashion Designer",
    emoji: "👗",
    category: "design",
    description:
      "Design clothing, accessories, footwear. India's domestic + export market is huge; D2C is the modern path.",
    dayInLife: "Sketches → patterns → samples → fittings. Lots of vendor + factory coordination.",
    qualifications: ["B.Des in Fashion Design", "NIFT / Pearl / Polimoda preferred"],
    entranceExams: [
      { name: "NIFT", link: "https://www.nift.ac.in", dates: "Feb" },
      { name: "Pearl Academy entrance", link: "https://www.pearlacademy.com", dates: "Varies" },
    ],
    salaryRanges: { entry: 300_000, mid: 800_000, senior: 3_000_000 },
    topColleges: ["NIFT Delhi", "Pearl Academy", "NID Ahmedabad", "SNDT Mumbai"],
    skillsRequired: ["Sketching", "Pattern-making", "Trend forecasting", "Business basics"],
    interestTags: ["design", "creative", "commerce"],
    growthProspects: "Design assistant → Designer → Own label. D2C brands changing the rules — small labels can scale fast.",
  },
  {
    name: "Architect",
    emoji: "🏛️",
    category: "design",
    description:
      "Design buildings, urban spaces. 5-year degree + license required. Beautiful work, slow money to start.",
    dayInLife: "Concept sketches, BIM modeling, client presentations, site visits.",
    qualifications: ["B.Arch (5 yr)"],
    entranceExams: [
      { name: "NATA", link: "https://www.nata.in", dates: "Mar-Jul" },
      { name: "JEE Main Paper 2", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 350_000, mid: 1_000_000, senior: 3_500_000 },
    topColleges: ["SPA Delhi", "CEPT Ahmedabad", "IIT Roorkee", "Sir JJ College Mumbai"],
    skillsRequired: ["AutoCAD", "Revit", "Hand sketching", "Spatial reasoning"],
    interestTags: ["design", "engineering", "creative"],
    growthProspects: "Junior architect → Project architect → Principal / Own practice.",
  },
  {
    name: "Journalist",
    emoji: "📰",
    category: "media",
    description:
      "Report news, investigate stories, write features. Digital journalism is the growth area; print is shrinking.",
    dayInLife: "Source meetings, beat reporting, writing, editing. Newsrooms have intense daily deadlines.",
    qualifications: ["B.A. Journalism / Mass Communication", "Any UG + portfolio works"],
    entranceExams: [
      { name: "IIMC entrance", link: "https://iimc.gov.in", dates: "May-Jun" },
      { name: "ACJ entrance", link: "https://www.asianmedia.org", dates: "Mar-Apr" },
    ],
    salaryRanges: { entry: 300_000, mid: 800_000, senior: 2_500_000 },
    topColleges: ["IIMC Delhi", "ACJ Chennai", "Symbiosis SIMC", "Xavier's Mumbai"],
    skillsRequired: ["Writing", "Interviewing", "Fact-checking", "News sense"],
    interestTags: ["media", "creative", "humanities", "social"],
    growthProspects: "Reporter → Senior Correspondent → Editor. Independent newsletters / YouTube reshaping the path.",
  },
  {
    name: "Filmmaker / Director",
    emoji: "🎬",
    category: "media",
    description:
      "Direct films, ads, web series, music videos. Hardest path to break into but biggest upside if you do.",
    dayInLife: "Pre-prod (writing, casting), shoots (12-16 hr days), post (edit, sound, color).",
    qualifications: ["BFA / Mass Comm", "Or just make stuff and post it"],
    entranceExams: [
      { name: "FTII entrance", link: "https://www.ftiindia.com", dates: "Mar" },
      { name: "SRFTI", link: "https://srfti.ac.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 0, mid: 1_000_000, senior: 20_000_000 },
    topColleges: ["FTII Pune", "SRFTI Kolkata", "Whistling Woods Mumbai"],
    skillsRequired: ["Storytelling", "Leadership", "Visual sense", "Persistence"],
    interestTags: ["media", "creative"],
    growthProspects: "AD → Director → Showrunner. Streaming platforms (Netflix, JioHotstar, Prime) opened huge new doors.",
  },
  {
    name: "Content Creator / YouTuber",
    emoji: "🎥",
    category: "media",
    description:
      "Build an audience on YouTube/Instagram/X around what you love. Real career now — top creators earn ₹1-50Cr/year.",
    dayInLife: "Ideation → script → shoot → edit → post → analyse. Reps matter more than gear.",
    qualifications: ["None required — execution + consistency is the bar"],
    entranceExams: [],
    salaryRanges: { entry: 0, mid: 1_200_000, senior: 50_000_000 },
    topColleges: ["No formal path — Whistling Woods, IIMC, MICA can help"],
    skillsRequired: ["On-camera presence", "Editing", "Storytelling", "Marketing"],
    interestTags: ["media", "creative", "entrepreneur"],
    growthProspects: "Channel growth → brand deals → own products → media company. Power-law distribution; top 0.1% earn most.",
  },

  /* ─── RESEARCH / SCIENCE ─── */
  {
    name: "Data Scientist",
    emoji: "🧮",
    category: "tech",
    description:
      "Apply statistics + ML to business problems. Highest-paid analytics role; mix of code + math + storytelling.",
    dayInLife: "Data cleaning, model building, dashboard creation, stakeholder meetings.",
    qualifications: ["B.Tech CS / Stats / Math + ML coursework", "M.S. helps for top roles"],
    entranceExams: [
      { name: "JEE Main + ISI entrance", link: "https://www.isical.ac.in", dates: "May" },
      { name: "CMI entrance", link: "https://www.cmi.ac.in", dates: "May" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 2_500_000, senior: 7_000_000 },
    topColleges: ["IIT Bombay", "IIT Madras", "ISI Kolkata", "CMI Chennai", "IIIT Hyderabad"],
    skillsRequired: ["Python / R", "Statistics", "SQL", "Communication"],
    interestTags: ["math", "tech", "cs", "research", "logic"],
    growthProspects: "Senior DS → Staff DS → Director. AI/ML is the hottest sub-segment of 2025 tech.",
  },
  {
    name: "Research Scientist",
    emoji: "🔬",
    category: "research",
    description:
      "Pure research in physics, chemistry, biology, math. Slow start, high prestige, world-changing work.",
    dayInLife: "Lab experiments, paper reading, paper writing, conferences, grant proposals.",
    qualifications: ["B.Sc → M.Sc → PhD (8-10 yr total)", "Or 5-yr integrated MS + PhD"],
    entranceExams: [
      { name: "IISER Aptitude Test", link: "https://www.iiseradmission.in", dates: "Jun" },
      { name: "JEST (Physics)", link: "https://www.jest.org.in", dates: "Feb" },
      { name: "NEST (NISER)", link: "https://www.nestexam.in", dates: "Jun" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_200_000, senior: 3_000_000 },
    topColleges: ["IISc Bangalore", "IISER Pune/Mohali/Kolkata", "TIFR Mumbai", "NISER Bhubaneswar"],
    skillsRequired: ["Curiosity", "Patience", "Math", "Writing"],
    interestTags: ["research", "math", "biology", "engineering"],
    growthProspects: "Postdoc → Assistant Prof → Associate Prof → Full Prof / Group Leader.",
  },
  {
    name: "Biotechnologist",
    emoji: "🧬",
    category: "research",
    description:
      "Genetic engineering, drug discovery, agri-biotech. India's biotech sector is the fastest-growing in Asia.",
    dayInLife: "Lab work — PCR, cell culture, data analysis. Industry roles also include process engineering.",
    qualifications: ["B.Tech / B.Sc Biotech", "M.Tech / MS / PhD for research roles"],
    entranceExams: [
      { name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
      { name: "GAT-B (IISc + DBT)", link: "https://nta.ac.in", dates: "Apr" },
    ],
    salaryRanges: { entry: 400_000, mid: 1_000_000, senior: 3_000_000 },
    topColleges: ["IIT Madras", "IIT Bombay", "Anna University", "VIT Vellore"],
    skillsRequired: ["Molecular biology", "Lab techniques", "Data analysis"],
    interestTags: ["biology", "research", "tech"],
    growthProspects: "Bench scientist → R&D head → biotech startup founder.",
  },
  {
    name: "Psychologist",
    emoji: "🧠",
    category: "research",
    description:
      "Clinical, organizational, sports, child psychology. Mental health is booming as a career path in India.",
    dayInLife: "Patient sessions, assessments, report writing. Clinical psychologists need RCI license.",
    qualifications: ["BA/B.Sc Psychology → MA Psych → M.Phil Clinical Psych for clinical practice"],
    entranceExams: [
      { name: "CUET PG", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" },
      { name: "AIIMS M.Sc Nursing/Psych", link: "https://www.aiimsexams.ac.in", dates: "Varies" },
    ],
    salaryRanges: { entry: 300_000, mid: 800_000, senior: 2_500_000 },
    topColleges: ["NIMHANS Bangalore", "Tata Institute of Social Sciences (TISS)", "DU", "JMI Delhi"],
    skillsRequired: ["Empathy", "Active listening", "Diagnostic skills"],
    interestTags: ["psychology", "social", "biology", "humanities"],
    growthProspects: "Clinic practice, hospital roles, corporate wellness, edtech / D2C mental health products.",
  },

  /* ─── EDUCATION ─── */
  {
    name: "Teacher / Professor",
    emoji: "🎓",
    category: "education",
    description:
      "Teach at school, college, or coaching institute. Lifetime career; good work-life balance; growing demand for online educators.",
    dayInLife: "Classes, lesson planning, grading. Professors also do research + admin.",
    qualifications: ["B.Ed (school) / M.A./M.Sc + PhD + NET (college)"],
    entranceExams: [
      { name: "CTET (govt schools)", link: "https://ctet.nic.in", dates: "Jul & Dec" },
      { name: "UGC NET (college)", link: "https://ugcnet.nta.nic.in", dates: "Jun & Dec" },
    ],
    salaryRanges: { entry: 250_000, mid: 700_000, senior: 1_800_000 },
    topColleges: ["DU", "DPS schools", "TISS for B.Ed", "Local B.Ed colleges"],
    skillsRequired: ["Communication", "Patience", "Subject expertise"],
    interestTags: ["social", "humanities"],
    growthProspects: "School teacher → HOD → Principal. EdTech (BYJU, Vedantu) has changed teacher economics.",
  },

  /* ─── HUMANITIES ─── */
  {
    name: "Economist",
    emoji: "📈",
    category: "commerce",
    description:
      "Analyze economic policy, markets, sectors. Govt (RBI, NITI Aayog) and private (consultancies, banks) both hire.",
    dayInLife: "Data analysis, policy notes, sector reports. RBI / Govt roles include research + advisory.",
    qualifications: ["BA Economics + MA / MSc Economics", "PhD for academia / RBI roles"],
    entranceExams: [
      { name: "DSE entrance", link: "https://www.econdse.org", dates: "Jun" },
      { name: "ISI MS Quantitative Economics", link: "https://www.isical.ac.in", dates: "May" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_500_000, senior: 4_000_000 },
    topColleges: ["DSE Delhi", "ISI Kolkata", "JNU CESS", "Madras School of Economics"],
    skillsRequired: ["Econometrics", "Stats", "Writing", "Policy understanding"],
    interestTags: ["economics", "humanities", "finance", "math"],
    growthProspects: "Junior Economist → Senior → Chief Economist / RBI / IMF.",
  },
  {
    name: "Historian / Archaeologist",
    emoji: "🏺",
    category: "arts",
    description:
      "Study past civilizations, work in museums, ASI, universities. Specialist career with deep cultural impact.",
    dayInLife: "Archival research, field excavations (archaeology), teaching, writing.",
    qualifications: ["BA / MA History / Archaeology / Anthropology", "PhD for research"],
    entranceExams: [{ name: "CUET PG", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" }],
    salaryRanges: { entry: 250_000, mid: 700_000, senior: 1_800_000 },
    topColleges: ["JNU Delhi", "BHU Varanasi", "Deccan College Pune"],
    skillsRequired: ["Research", "Critical analysis", "Languages", "Curiosity"],
    interestTags: ["humanities", "research", "social"],
    growthProspects: "ASI, museums, UNESCO, academia. Niche but stable.",
  },

  /* ─── COMPUTER SCIENCE / TECH SPECIALIZATIONS ─── */
  {
    name: "Cybersecurity Specialist",
    emoji: "🛡️",
    category: "tech",
    description:
      "Defend systems from attacks. Highest-growth tech sub-segment with India's digital push + regulatory tightening.",
    dayInLife: "Penetration testing, incident response, security architecture, threat hunting.",
    qualifications: ["B.Tech CS / IT + certifications (CEH, OSCP)"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 7_500_000 },
    topColleges: ["IIT Madras", "IIIT Hyderabad", "Amity (M.Tech Cyber Security)"],
    skillsRequired: ["Networking", "Linux", "Cryptography", "Scripting"],
    interestTags: ["tech", "cs", "engineering", "logic"],
    growthProspects: "Security Analyst → Senior → CISO. Specialized roles (cloud, app, OT) pay even more.",
  },
  {
    name: "Game Developer",
    emoji: "🎮",
    category: "tech",
    description:
      "Build video games for PC, mobile, console. Mid-sized industry in India but rapidly growing with indie + mobile gaming.",
    dayInLife: "Engine work (Unity / Unreal), gameplay scripting, art integration, testing.",
    qualifications: ["B.Tech CS / IT + portfolio", "Specialized game-dev courses (BIG-DUE, ICAT)"],
    entranceExams: [{ name: "JEE Main / Private institutes", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 4_000_000 },
    topColleges: ["IIIT Hyderabad", "ICAT Chennai", "Pearl Academy"],
    skillsRequired: ["C++ / C#", "Unity / Unreal", "Game design", "Math (linear algebra)"],
    interestTags: ["tech", "cs", "creative", "design"],
    growthProspects: "Junior Dev → Senior → Lead → Indie Founder.",
  },
  {
    name: "AI/ML Engineer",
    emoji: "🤖",
    category: "tech",
    description:
      "Build models, MLOps, LLM applications. Single hottest career of 2024-2026 in tech.",
    dayInLife: "Training models, building data pipelines, fine-tuning LLMs, deploying to production.",
    qualifications: ["B.Tech CS + ML coursework / projects", "M.S. for research roles"],
    entranceExams: [{ name: "JEE Main / Advanced", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 1_500_000, mid: 4_000_000, senior: 12_000_000 },
    topColleges: ["IIT Bombay", "IIT Delhi", "IIIT Hyderabad", "BITS Pilani"],
    skillsRequired: ["Python", "PyTorch / JAX", "Linear algebra", "Distributed systems"],
    interestTags: ["math", "tech", "cs", "research", "logic"],
    growthProspects: "ML Engineer → Senior → Staff. AI research labs (Google DeepMind, Anthropic) hire from top Indian schools.",
  },

  /* ─── AVIATION & TRAVEL ─── */
  {
    name: "Pilot",
    emoji: "✈️",
    category: "defense",
    description:
      "Commercial airline or air-force pilot. Massive aviation expansion in India = strong demand for next decade.",
    dayInLife: "Pre-flight briefings, actual flights (8-12 hr long haul), debriefs. Significant time away from home.",
    qualifications: ["Commercial Pilot License (CPL) — Class 12 + flight school", "Or NDA + Air Force"],
    entranceExams: [
      { name: "DGCA exams (commercial)", link: "https://www.dgca.gov.in", dates: "Year-round" },
      { name: "NDA / AFCAT (defense)", link: "https://upsc.gov.in", dates: "Apr & Sep / Feb & Aug" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 4_000_000, senior: 12_000_000 },
    topColleges: ["IGRUA Rae Bareli", "BAA Mumbai", "Flying clubs across India"],
    skillsRequired: ["Reflexes", "Math", "Calmness under pressure", "Health"],
    interestTags: ["engineering", "tech", "aviation", "operations", "defense"],
    growthProspects: "First Officer → Captain → Senior Captain → Training Captain.",
  },

  /* ─── HOSPITALITY ─── */
  {
    name: "Hotel / Hospitality Manager",
    emoji: "🏨",
    category: "commerce",
    description:
      "Run hotels, restaurants, resorts. India's tourism boom + new luxury chains = strong demand.",
    dayInLife: "Front office, F&B operations, guest service, staff management.",
    qualifications: ["BHM / B.Sc Hospitality (4 yr)", "MBA Hospitality for senior roles"],
    entranceExams: [
      { name: "NCHMCT JEE", link: "https://nchmjee.nta.nic.in", dates: "Apr-May" },
      { name: "IHM entrance", link: "https://www.ihmpusa.net", dates: "Varies" },
    ],
    salaryRanges: { entry: 300_000, mid: 900_000, senior: 3_000_000 },
    topColleges: ["IHM Mumbai", "IHM Delhi", "WGSHA Manipal", "Christ University"],
    skillsRequired: ["Service mindset", "Operations", "People management"],
    interestTags: ["commerce", "social", "management"],
    growthProspects: "Trainee → Supervisor → Manager → GM → Group GM.",
  },

  /* ─────────── EMERGING TECH ─────────── */
  {
    name: "Product Manager",
    emoji: "📦",
    category: "tech",
    description:
      "Decide WHAT a product should do and WHY. The bridge between engineering, design, and business. Single most cross-functional role in tech.",
    dayInLife:
      "Customer interviews, writing product specs, prioritizing the backlog, demos with engineers and design, metrics reviews. Lots of meetings.",
    qualifications: ["B.Tech / MBA preferred but not required", "Strong portfolio of shipped projects"],
    entranceExams: [{ name: "CAT (for MBA route)", link: "https://iimcat.ac.in", dates: "Nov" }],
    salaryRanges: { entry: 1_500_000, mid: 4_000_000, senior: 12_000_000 },
    topColleges: ["IIT Bombay", "IIM Bangalore", "ISB Hyderabad"],
    skillsRequired: ["Strategy", "Communication", "Data analysis", "Empathy", "Writing"],
    interestTags: ["tech", "commerce", "management", "logic", "creative"],
    growthProspects:
      "APM → PM → Senior PM → Group PM → Director → CPO/VP Product. One of the fastest paths to leadership.",
  },
  {
    name: "DevOps / Cloud Engineer",
    emoji: "☁️",
    category: "tech",
    description:
      "Run the infrastructure that powers internet products. Make deploys safe, fast, and cheap. Touch every layer of the stack.",
    dayInLife:
      "AWS/GCP console, Kubernetes, CI/CD pipelines, incident response. On-call rotations come with the job.",
    qualifications: ["B.Tech CS/IT + cloud certifications (AWS / GCP / Azure)"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 900_000, mid: 2_800_000, senior: 8_000_000 },
    topColleges: ["IIT Madras", "BITS Pilani", "VIT Vellore"],
    skillsRequired: ["Linux", "Kubernetes", "Terraform", "Python", "Networking"],
    interestTags: ["tech", "cs", "engineering", "logic"],
    growthProspects: "Junior DevOps → SRE → Staff/Principal SRE → Infra lead at scale.",
  },
  {
    name: "Robotics Engineer",
    emoji: "🦾",
    category: "engineering",
    description:
      "Build physical robots — from warehouse autonomous mobile robots to surgical assistants. India's manufacturing + healthcare push makes this a 10-yr boom.",
    dayInLife:
      "Mechanical design, ROS coding, sensor integration, real-world testing. Cross-disciplinary: ME + EE + CS.",
    qualifications: ["B.Tech Mechanical / ECE / CSE + robotics specialisation", "M.Tech for advanced roles"],
    entranceExams: [{ name: "JEE Main + Advanced", link: "https://jeeadv.ac.in", dates: "May" }],
    salaryRanges: { entry: 800_000, mid: 2_200_000, senior: 6_000_000 },
    topColleges: ["IIT Bombay", "IIT Kanpur", "IIIT Hyderabad"],
    skillsRequired: ["ROS", "C++ / Python", "Control theory", "Computer vision"],
    interestTags: ["engineering", "tech", "math", "research"],
    growthProspects:
      "Strong startup ecosystem (Addverb, GreyOrange, Ottonomy). Pioneers humanity's transition from manual to autonomous work.",
  },
  {
    name: "Quantum Computing Researcher",
    emoji: "⚛️",
    category: "research",
    description:
      "Build the next generation of computers using quantum mechanics. Will reshape cryptography, drug discovery, and AI in the next 10-20 years.",
    dayInLife:
      "Theoretical proofs, qubit simulations, paper writing, lab work (if hardware). Heavy math + physics overlap.",
    qualifications: ["B.Sc Physics / B.Tech + MS + PhD", "Strong linear algebra + quantum mechanics"],
    entranceExams: [
      { name: "IISER Aptitude Test", link: "https://www.iiseradmission.in", dates: "Jun" },
      { name: "JEST Physics", link: "https://www.jest.org.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_500_000, senior: 4_500_000 },
    topColleges: ["IISc Bangalore", "TIFR Mumbai", "IIT Madras"],
    skillsRequired: ["Quantum mechanics", "Linear algebra", "Python / Qiskit", "Research writing"],
    interestTags: ["research", "math", "tech", "logic"],
    growthProspects:
      "India's National Quantum Mission ($1B) is creating roles. IBM, Google, IIT/IISc labs all hiring.",
  },
  {
    name: "Blockchain / Web3 Engineer",
    emoji: "🔗",
    category: "tech",
    description:
      "Build decentralised apps and smart contracts. Volatile field but high-skill, global remote work, strong earning ceiling.",
    dayInLife: "Solidity / Rust coding, smart contract audits, DeFi protocol design, security reviews.",
    qualifications: ["B.Tech CS + self-taught Web3 stack", "GitHub portfolio of contracts matters more than degree"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 1_500_000, mid: 4_000_000, senior: 15_000_000 },
    topColleges: ["IIT Bombay", "BITS Pilani", "Any with strong CS"],
    skillsRequired: ["Solidity / Rust", "Cryptography", "Game theory", "Security"],
    interestTags: ["tech", "cs", "logic", "math"],
    growthProspects:
      "Globally remote-first industry. Indians work for Polygon, ConsenSys, Coinbase from anywhere.",
  },
  {
    name: "Cloud Solutions Architect",
    emoji: "🏛️",
    category: "tech",
    description:
      "Design large-scale cloud systems for enterprises. Senior role — combine business needs with deep technical knowledge.",
    dayInLife: "Architecture diagrams, client meetings, vendor selection, cost optimisation.",
    qualifications: ["B.Tech + 5+ yrs experience + AWS/GCP Pro certifications"],
    entranceExams: [],
    salaryRanges: { entry: 1_500_000, mid: 3_500_000, senior: 10_000_000 },
    topColleges: ["Any with CS background"],
    skillsRequired: ["Cloud architecture", "Security", "Cost optimisation", "Consulting"],
    interestTags: ["tech", "cs", "engineering", "commerce"],
    growthProspects: "Most companies are still mid-cloud migration. 5-10 yrs of growth ahead.",
  },

  /* ─────────── HEALTHCARE SPECIALTIES ─────────── */
  {
    name: "Veterinarian",
    emoji: "🐾",
    category: "medical",
    description:
      "Treat animals — pets, livestock, wildlife. Growing field as urban pet ownership explodes in India.",
    dayInLife: "Clinic consults, surgeries, vaccinations, large-animal field visits (rural).",
    qualifications: ["B.V.Sc & AH (5.5 yr)", "MVSc for specialisation"],
    entranceExams: [{ name: "AIPVT (now via NEET)", link: "https://neet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 300_000, mid: 700_000, senior: 2_500_000 },
    topColleges: ["IVRI Bareilly", "Madras Veterinary College", "GADVASU Ludhiana"],
    skillsRequired: ["Animal anatomy", "Surgical skills", "Compassion", "Communication"],
    interestTags: ["biology", "medical", "social"],
    growthProspects: "Private practice, govt service (wildlife / dairy), pet care chains booming.",
  },
  {
    name: "Optometrist",
    emoji: "👓",
    category: "medical",
    description:
      "Diagnose vision problems and prescribe corrective lenses. Faster path to independent practice than MBBS.",
    dayInLife: "Eye exams, prescription writing, fitting contacts/lenses, basic eye-disease screening.",
    qualifications: ["B.Optom (4 yr)", "M.Optom for advanced practice"],
    entranceExams: [{ name: "NEET UG (some states)", link: "https://neet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 250_000, mid: 600_000, senior: 2_000_000 },
    topColleges: ["AIIMS Delhi", "LV Prasad Eye Inst Hyderabad", "Bharati Vidyapeeth Pune"],
    skillsRequired: ["Diagnostic", "Patient communication", "Manual precision"],
    interestTags: ["biology", "medical"],
    growthProspects: "Optical chains (Lenskark, Titan EyePlus) + private clinics growing fast.",
  },
  {
    name: "Speech Language Pathologist",
    emoji: "🗣️",
    category: "medical",
    description:
      "Help kids and adults with speech, swallowing, and communication disorders. High emotional reward, growing demand with autism awareness.",
    dayInLife: "1:1 therapy sessions, school visits, parent counseling, progress documentation.",
    qualifications: ["BASLP (4 yr) — Bachelor in Audiology and Speech-Language Pathology"],
    entranceExams: [{ name: "AIISH entrance", link: "https://www.aiishmysore.in", dates: "Jul" }],
    salaryRanges: { entry: 250_000, mid: 700_000, senior: 2_000_000 },
    topColleges: ["AIISH Mysore", "AYJNIHH Mumbai", "Manipal"],
    skillsRequired: ["Linguistic analysis", "Patience", "Empathy", "Child psychology"],
    interestTags: ["biology", "medical", "social", "psychology"],
    growthProspects: "School systems, hospitals, autism centers, and private practice are all hungry for SLPs.",
  },
  {
    name: "Public Health Specialist",
    emoji: "🌍",
    category: "medical",
    description:
      "Tackle disease at population scale — not 1-on-1 patients. COVID showed the world how critical this field is. WHO, govt, NGOs all hire.",
    dayInLife: "Epidemiological data analysis, policy briefs, community programs, field surveys.",
    qualifications: ["MBBS + MPH OR B.Sc/B.A. + MPH", "PhD for research/academic"],
    entranceExams: [{ name: "AIIMS MPH entrance", link: "https://www.aiimsexams.ac.in", dates: "Varies" }],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 4_500_000 },
    topColleges: ["AIIMS Delhi (MPH)", "PHFI", "TISS", "St John's Bangalore"],
    skillsRequired: ["Epidemiology", "Biostatistics", "Policy writing", "Field research"],
    interestTags: ["medical", "biology", "social", "research", "humanities"],
    growthProspects: "WHO, UNICEF, govt ministries, large NGOs (BMGF, GHIT). Global remote work possible.",
  },
  {
    name: "Nurse Practitioner",
    emoji: "💉",
    category: "medical",
    description:
      "Advanced practice nurse with autonomy to diagnose and prescribe (in some settings). Shortest path to clinical patient impact.",
    dayInLife: "Patient assessment, basic procedures, care plans, often more hands-on than doctors.",
    qualifications: ["B.Sc Nursing (4 yr) + M.Sc Nursing"],
    entranceExams: [{ name: "AIIMS B.Sc Nursing", link: "https://www.aiimsexams.ac.in", dates: "Varies" }],
    salaryRanges: { entry: 300_000, mid: 800_000, senior: 2_500_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "PGIMER Chandigarh"],
    skillsRequired: ["Clinical skills", "Patient empathy", "Stamina"],
    interestTags: ["biology", "medical", "social"],
    growthProspects: "Huge international demand — UK NHS, US, Gulf, Australia all hiring Indian nurses.",
  },

  /* ─────────── CREATIVE / MEDIA EXPANSIONS ─────────── */
  {
    name: "3D Animator / VFX Artist",
    emoji: "🎞️",
    category: "design",
    description:
      "Bring characters and worlds to life for films, ads, games. India's outsourcing hub status means jobs at Industrial Light & Magic, DNEG, MPC.",
    dayInLife: "Rigging, animation, lighting, rendering. Long hours on big projects close to release.",
    qualifications: ["B.A./B.Sc Animation", "Or self-taught with strong showreel"],
    entranceExams: [{ name: "Most institutes have internal tests", link: "https://www.maacindia.com", dates: "Varies" }],
    salaryRanges: { entry: 300_000, mid: 1_000_000, senior: 3_500_000 },
    topColleges: ["MAAC", "Arena Animation", "Whistling Woods", "NID"],
    skillsRequired: ["Maya/Blender", "Anatomy", "Visual storytelling", "Patience"],
    interestTags: ["design", "creative", "media", "tech"],
    growthProspects: "Indian VFX studios won Oscars (RRR). Streaming platforms expanding demand.",
  },
  {
    name: "Sound Engineer",
    emoji: "🎚️",
    category: "media",
    description:
      "Mix and master audio for music, films, ads, podcasts. Behind every great song or film soundscape.",
    dayInLife: "Studio sessions, mixing tracks, location recording, mastering for Spotify/cinema.",
    qualifications: ["Diploma in Sound Engineering", "B.Tech ECE + audio specialisation"],
    entranceExams: [],
    salaryRanges: { entry: 250_000, mid: 800_000, senior: 3_500_000 },
    topColleges: ["SAE Institute Mumbai", "FTII Pune", "True School of Music"],
    skillsRequired: ["Pro Tools / Logic", "Acoustics", "Musical ear", "Patience"],
    interestTags: ["media", "creative", "tech"],
    growthProspects: "Podcasts + indie music exploding. Strong path to indie producer/composer.",
  },
  {
    name: "Photographer",
    emoji: "📸",
    category: "media",
    description:
      "Shoot weddings, products, journalism, fine art, wildlife. India's wedding industry alone is $50B/yr.",
    dayInLife: "Shoots, editing in Lightroom/Photoshop, client meetings, marketing on Instagram.",
    qualifications: ["No formal qualification — portfolio is everything"],
    entranceExams: [],
    salaryRanges: { entry: 200_000, mid: 1_000_000, senior: 5_000_000 },
    topColleges: ["Light & Life Academy Ooty", "NID Photography"],
    skillsRequired: ["Composition", "Lighting", "Lightroom", "Business sense"],
    interestTags: ["creative", "media", "design"],
    growthProspects: "Wedding pros earn ₹3-15L per wedding. Editorial/wildlife is lower-paying but prestigious.",
  },

  /* ─────────── SCIENCES — Earth, Marine, Space ─────────── */
  {
    name: "Marine Biologist",
    emoji: "🐠",
    category: "research",
    description:
      "Study ocean life — coral reefs, fish stocks, marine mammals. India's 7,500 km coastline + climate change make this critical.",
    dayInLife: "Boat surveys, scuba diving, lab analysis, paper writing. Lots of fieldwork.",
    qualifications: ["B.Sc / M.Sc Marine Biology", "PhD for research"],
    entranceExams: [{ name: "IIT JAM / CUET PG", link: "https://jam.iitb.ac.in", dates: "Feb" }],
    salaryRanges: { entry: 400_000, mid: 1_000_000, senior: 2_500_000 },
    topColleges: ["CUSAT Kochi", "Annamalai University", "Pondicherry University"],
    skillsRequired: ["Scuba certification", "Taxonomy", "GIS", "Field stamina"],
    interestTags: ["biology", "research"],
    growthProspects: "WWF, MoEF, NIO Goa, international research stations. Niche but deeply meaningful.",
  },
  {
    name: "Climate Scientist",
    emoji: "🌡️",
    category: "research",
    description:
      "Study how Earth's climate is changing and what to do about it. Single most important scientific question of our generation.",
    dayInLife: "Climate model simulations, satellite data analysis, IPCC report contributions.",
    qualifications: ["B.Sc/B.Tech + M.Sc Atmospheric Science + PhD"],
    entranceExams: [{ name: "IIT JAM", link: "https://jam.iitb.ac.in", dates: "Feb" }],
    salaryRanges: { entry: 500_000, mid: 1_200_000, senior: 3_000_000 },
    topColleges: ["IISc Bangalore", "IIT Bombay", "IITM Pune"],
    skillsRequired: ["Atmospheric physics", "Python", "Data science", "Modeling"],
    interestTags: ["research", "math", "biology", "tech", "climate", "sustainability"],
    growthProspects:
      "Global demand exploding. ISRO, WMO, IPCC, climate-tech startups all hiring. Direct planetary impact.",
  },
  {
    name: "Astrophysicist / Astronomer",
    emoji: "🔭",
    category: "research",
    description:
      "Study stars, galaxies, black holes. Pure curiosity-driven work, but India's space program means real jobs at ISRO and observatories.",
    dayInLife: "Telescope observation runs, simulation code, data analysis, paper writing.",
    qualifications: ["B.Sc Physics → M.Sc → PhD"],
    entranceExams: [
      { name: "JEST Physics", link: "https://www.jest.org.in", dates: "Feb" },
      { name: "NET Physics", link: "https://csirnet.nta.nic.in", dates: "Jun & Dec" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_200_000, senior: 2_800_000 },
    topColleges: ["IUCAA Pune", "IIA Bangalore", "TIFR Mumbai", "RRI Bangalore"],
    skillsRequired: ["Astrophysics", "Python", "Observation techniques", "Patience"],
    interestTags: ["research", "math", "tech"],
    growthProspects: "ISRO, IUCAA, international observatories. India is co-investing in major telescopes.",
  },
  {
    name: "Forensic Scientist",
    emoji: "🔬",
    category: "research",
    description:
      "Analyse crime-scene evidence — DNA, fingerprints, ballistics, digital forensics. Backbone of modern criminal justice.",
    dayInLife: "Lab work, court testimony, evidence chain documentation. Detail-obsessed.",
    qualifications: ["B.Sc Forensic Science / Biotech / Chem + M.Sc Forensics"],
    entranceExams: [{ name: "AIIMS / NFSU entrance", link: "https://www.nfsu.ac.in", dates: "May" }],
    salaryRanges: { entry: 400_000, mid: 900_000, senior: 2_500_000 },
    topColleges: ["NFSU Gandhinagar", "LNJN NICFS Delhi", "Amity Forensics"],
    skillsRequired: ["Lab techniques", "DNA analysis", "Court communication", "Integrity"],
    interestTags: ["biology", "research", "tech", "law"],
    growthProspects: "CBI, state forensic labs, private cyber-forensics firms (booming with fraud rise).",
  },

  /* ─────────── PUBLIC SERVICE / SOCIAL IMPACT ─────────── */
  {
    name: "Diplomat (IFS Officer)",
    emoji: "🌐",
    category: "civil-services",
    description:
      "Represent India abroad — embassies, UN, trade talks. One of the most prestigious civil services postings.",
    dayInLife: "Embassy work, bilateral meetings, cultural events, policy cables. Postings change every 3-4 years.",
    qualifications: ["UG degree + UPSC CSE with IFS preference"],
    entranceExams: [{ name: "UPSC Civil Services", link: "https://upsc.gov.in", dates: "May/Jun" }],
    salaryRanges: { entry: 750_000, mid: 1_800_000, senior: 3_500_000 },
    topColleges: ["No specific UG — top candidates from any background"],
    skillsRequired: ["Languages", "Diplomacy", "Cultural intelligence", "Writing"],
    interestTags: ["humanities", "law", "social", "management", "govt", "stable"],
    growthProspects:
      "Foreign postings, eventual Ambassador / Foreign Secretary. Front-row seat to history.",
  },
  {
    name: "Social Entrepreneur",
    emoji: "🌱",
    category: "commerce",
    description:
      "Build businesses that solve social problems — education, health, sanitation, climate. Profit + impact.",
    dayInLife: "Fundraising, hiring, field visits to beneficiaries, balancing impact with sustainability.",
    qualifications: ["No formal — execution + storytelling matters most"],
    entranceExams: [],
    salaryRanges: { entry: 300_000, mid: 1_500_000, senior: 10_000_000 },
    topColleges: ["TISS", "IRMA Anand", "ISDM Delhi"],
    skillsRequired: ["Fundraising", "Operations", "Empathy", "Resilience"],
    interestTags: ["entrepreneur", "social", "commerce", "humanities"],
    growthProspects:
      "Acumen Fund, Omidyar Network, ECCE incubators. Founders go on to advise govt and lead policy.",
  },
  {
    name: "NGO Worker / Development Professional",
    emoji: "🤝",
    category: "civil-services",
    description:
      "Direct impact work — education programs, women's empowerment, rural health, disaster relief. Modest pay, deep meaning.",
    dayInLife: "Field visits, beneficiary interviews, program monitoring, donor reports.",
    qualifications: ["MA Social Work / Development Studies / Public Policy"],
    entranceExams: [{ name: "TISS / IRMA entrance", link: "https://www.tiss.edu", dates: "Mar-Apr" }],
    salaryRanges: { entry: 350_000, mid: 900_000, senior: 2_500_000 },
    topColleges: ["TISS Mumbai", "IRMA Anand", "Azim Premji University"],
    skillsRequired: ["Field empathy", "Program management", "Evaluation methods"],
    interestTags: ["social", "humanities", "psychology"],
    growthProspects: "BMGF, Tata Trusts, World Bank, govt advisory. Hybrid roles into govt policy common.",
  },

  /* ─────────── SPORTS / PERFORMANCE ─────────── */
  {
    name: "Sports Coach / Sports Scientist",
    emoji: "🏃",
    category: "education",
    description:
      "Train athletes for performance — from school teams to Olympic squads. India's sports ecosystem (cricket, Olympics, Pro Kabaddi) is professionalising.",
    dayInLife: "Training sessions, performance analytics, nutrition planning, injury management.",
    qualifications: ["B.PEd / B.Sc Sports Science", "M.Sc for high-performance"],
    entranceExams: [{ name: "LNIPE entrance", link: "https://www.lnipe.edu.in", dates: "Apr-May" }],
    salaryRanges: { entry: 300_000, mid: 1_000_000, senior: 4_000_000 },
    topColleges: ["LNIPE Gwalior", "SAI institutes", "Manav Rachna Sports Sciences"],
    skillsRequired: ["Sport-specific expertise", "Sports science", "Mental coaching"],
    interestTags: ["biology", "social", "psychology", "fitness", "sports", "health"],
    growthProspects: "IPL teams, national federations, sports tech startups (Yuvaa, Mission Sports).",
  },
  {
    name: "eSports Athlete / Streamer",
    emoji: "🎮",
    category: "media",
    description:
      "Compete in games like BGMI, Valorant, Dota 2 — or stream them. India's gaming audience crossed 600M; pro circuit is real.",
    dayInLife: "10+ hours practice/streaming daily, tournaments, content creation, sponsor calls.",
    qualifications: ["None — talent + grind + audience"],
    entranceExams: [],
    salaryRanges: { entry: 200_000, mid: 1_500_000, senior: 30_000_000 },
    topColleges: ["No formal — Vox Esports, Skyesports academies emerging"],
    skillsRequired: ["Mechanical skill", "Game theory", "On-camera presence", "Mental endurance"],
    interestTags: ["tech", "media", "creative", "entrepreneur"],
    growthProspects: "Pro orgs (S8UL, Velocity, Global Esports). Streaming income + brand deals + tournament prizes.",
  },

  /* ─────────── SPECIALIZED PRO PATHS ─────────── */
  {
    name: "Chef / Culinary Professional",
    emoji: "👨‍🍳",
    category: "commerce",
    description:
      "Run kitchens — fine dining, ghost kitchens, cloud brands. India's F&B sector is booming with disposable income.",
    dayInLife: "Menu design, sourcing, cooking, kitchen team management. Long evenings, weekend work.",
    qualifications: ["Culinary diploma from IHM / IICA / Cordon Bleu"],
    entranceExams: [{ name: "NCHMCT JEE", link: "https://nchmjee.nta.nic.in", dates: "Apr-May" }],
    salaryRanges: { entry: 250_000, mid: 800_000, senior: 4_000_000 },
    topColleges: ["IHM Mumbai/Delhi", "IICA Manipal", "Le Cordon Bleu (abroad)"],
    skillsRequired: ["Cooking skill", "Palate", "Leadership", "Cost control"],
    interestTags: ["creative", "commerce", "social"],
    growthProspects: "Hotel chains, own restaurant, MasterChef contestant, cloud-kitchen entrepreneurship.",
  },
  {
    name: "Real Estate Developer",
    emoji: "🏘️",
    category: "commerce",
    description:
      "Buy land, build, sell or rent. High-capital business, but India's urbanisation push (Smart Cities) creates huge opportunity.",
    dayInLife: "Land scouting, regulatory approvals, vendor coordination, sales/marketing.",
    qualifications: ["B.Com / B.B.A. + family business or RICS MBA real estate"],
    entranceExams: [{ name: "CAT (for MBA)", link: "https://iimcat.ac.in", dates: "Nov" }],
    salaryRanges: { entry: 600_000, mid: 2_500_000, senior: 30_000_000 },
    topColleges: ["RICS School Mumbai", "NICMAR Pune", "IIM-A real estate program"],
    skillsRequired: ["Finance", "Regulatory navigation", "Negotiation", "Project management"],
    interestTags: ["commerce", "engineering", "entrepreneur"],
    growthProspects: "Family business, REIT analyst, urban-development consultancies.",
  },
  {
    name: "Data Engineer",
    emoji: "🛠️",
    category: "tech",
    description:
      "Build the data pipelines that power analytics and ML. The plumbing nobody sees but everything runs on.",
    dayInLife: "Spark/Airflow pipelines, schema design, data quality monitoring, infra cost optimisation.",
    qualifications: ["B.Tech CS / IT + strong systems background"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" }],
    salaryRanges: { entry: 900_000, mid: 2_500_000, senior: 7_500_000 },
    topColleges: ["IIT Bombay", "IIIT Hyderabad", "BITS Pilani"],
    skillsRequired: ["SQL", "Python", "Spark / Kafka / Airflow", "Cloud (AWS / GCP)"],
    interestTags: ["tech", "cs", "math", "engineering", "stats", "data", "analytics"],
    growthProspects: "Every data team needs DEs. Senior roles pay equal to or more than data scientists.",
  },

  /* ═══════════════════════════════════════════════════════════════
     MEDICAL & BIOLOGICAL SPECIALIZATIONS
     ═══════════════════════════════════════════════════════════════ */

  {
    name: "Cardiologist",
    emoji: "❤️",
    category: "medical",
    description:
      "Heart specialist. Diagnose and treat cardiovascular disease — India's #1 killer. Among the most prestigious and well-paid medical specialisations.",
    dayInLife:
      "ECG/ECHO interpretation, OPD consults, angioplasties and stenting (interventional), bedside rounds in CCU. Surgical cardiologists do bypass and valve surgeries.",
    qualifications: ["MBBS → MD (Medicine) → DM (Cardiology)", "Or MBBS → DNB Cardiology"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
      { name: "NEET SS (Super-speciality)", link: "https://nbe.edu.in", dates: "Sep" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 5_000_000, senior: 25_000_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "PGIMER Chandigarh", "JIPMER Puducherry"],
    skillsRequired: ["Clinical reasoning", "Manual dexterity", "Stamina", "Ethics"],
    interestTags: ["medical", "biology", "social", "surgery", "anatomy", "diagnostics"],
    preferredSubjects: ["biology", "chemistry", "physics"],
    growthProspects:
      "12+ years of training but ceiling is exceptional. Private practice + cath-lab ownership routinely ₹2-5 Cr/yr.",
    roadmap: {
      class10: { focus: "Strong Math + Science fundamentals", minScore: "85%+" },
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"], minScore: "85%+ for top medical colleges" },
      undergrad: [
        { degree: "MBBS", duration: "5.5 years (4.5 + internship)", entranceExams: ["NEET UG"], notes: "First step. ~1L govt seats nationally." },
      ],
      postgrad: [
        { degree: "MD (Medicine)", duration: "3 years", entranceExams: ["NEET PG"], notes: "General internal medicine specialisation." },
        { degree: "DM (Cardiology)", duration: "3 years", entranceExams: ["NEET SS"], notes: "Super-speciality after MD Medicine. Highly competitive." },
      ],
      finalRole: "Consultant Cardiologist — hospital, private practice, or cath lab.",
    },
  },
  {
    name: "Neurologist",
    emoji: "🧠",
    category: "medical",
    description:
      "Brain and nervous system specialist. Diagnose conditions like stroke, epilepsy, Parkinson's, multiple sclerosis. Heavy on imaging interpretation (MRI, EEG).",
    dayInLife:
      "Neuro examinations, MRI/CT reading, prescribing nervous system medications, managing stroke and epilepsy patients.",
    qualifications: ["MBBS → MD Medicine → DM Neurology"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 4_500_000, senior: 20_000_000 },
    topColleges: ["AIIMS Delhi", "NIMHANS Bangalore", "CMC Vellore", "PGIMER Chandigarh"],
    skillsRequired: ["Neurology pattern recognition", "Imaging interpretation", "Patience"],
    interestTags: ["medical", "biology", "research", "neuro", "mental-health", "diagnostics"],
    preferredSubjects: ["biology", "chemistry", "physics"],
    growthProspects: "Aging population = soaring demand. NIMHANS is the global gold standard.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"], minScore: "85%+" },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [
        { degree: "MD (Medicine)", duration: "3 years", entranceExams: ["NEET PG"] },
        { degree: "DM (Neurology)", duration: "3 years", entranceExams: ["NEET SS"] },
      ],
      finalRole: "Consultant Neurologist — hospitals, NIMHANS, private practice.",
    },
  },
  {
    name: "Pediatrician",
    emoji: "👶",
    category: "medical",
    description:
      "Doctor for children (birth to ~18). One of the most rewarding medical specialisations — emotionally demanding but full of meaning.",
    dayInLife:
      "OPD consults with anxious parents, neonatal ICU rounds, vaccinations, developmental milestones, treating common childhood illnesses.",
    qualifications: ["MBBS → MD Pediatrics", "Or DNB Pediatrics"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 2_500_000, senior: 12_000_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "Maulana Azad Medical College", "Lady Hardinge Medical College"],
    skillsRequired: ["Patience with children", "Parent communication", "Quick judgment", "Empathy"],
    interestTags: ["medical", "biology", "social", "psychology", "children", "pediatric"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Private practice is bread-and-butter income. Sub-specialise (neonatology, peds-cardio) for higher ceiling.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD (Pediatrics)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "Pediatrician — hospital, private clinic, NICU consultant.",
    },
  },
  {
    name: "Gynecologist / Obstetrician",
    emoji: "🤱",
    category: "medical",
    description:
      "Women's reproductive health specialist. Pregnancy, childbirth, surgery, fertility. High demand in India.",
    dayInLife:
      "Antenatal consults, labour deliveries (call duty), ultrasounds, gynec surgeries (laparoscopy, hysterectomy), IVF cycles in specialist clinics.",
    qualifications: ["MBBS → MD/MS OB-GYN"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 3_000_000, senior: 15_000_000 },
    topColleges: ["AIIMS Delhi", "Lady Hardinge Medical College", "Seth GS Medical College Mumbai"],
    skillsRequired: ["Surgical skills", "Calm under pressure", "Empathy", "On-call stamina"],
    interestTags: ["medical", "biology", "social", "surgery", "anatomy", "children"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Among India's most profitable specialisations. Reproductive medicine / IVF is rapidly growing.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD/MS (OBG)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "OB-GYN — hospital + private practice / fertility specialist.",
    },
  },
  {
    name: "Orthopedic Surgeon",
    emoji: "🦴",
    category: "medical",
    description:
      "Bone, joint, spine, and sports injury specialist. Heavy on hands-on surgery — arthroscopy, joint replacements, trauma care.",
    dayInLife:
      "OPD examinations + X-ray reading in morning, OT surgeries in afternoon, emergency trauma calls. Physical work — lots of standing.",
    qualifications: ["MBBS → MS Orthopedics", "Or DNB Orthopedics"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 3_500_000, senior: 18_000_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "Sancheti Pune", "Sushrut Hospital Mumbai"],
    skillsRequired: ["Hand-eye coordination", "Physical strength", "Imaging interpretation"],
    interestTags: ["medical", "biology", "engineering", "surgery", "anatomy", "sports", "fitness"],
    preferredSubjects: ["biology", "physics", "chemistry"],
    growthProspects: "Sports medicine + joint replacement are major growth areas. Fellowship abroad common.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MS (Orthopedics)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "Orthopedic Surgeon — hospital, sports clinic, joint replacement specialist.",
    },
  },
  {
    name: "Radiologist",
    emoji: "📷",
    category: "medical",
    description:
      "Diagnoses disease from imaging — X-ray, CT, MRI, ultrasound. AI-augmented field with great work-life balance and high pay.",
    dayInLife:
      "Mostly desk-based reading scans, dictating reports. Interventional radiologists do biopsies and image-guided procedures.",
    qualifications: ["MBBS → MD Radiodiagnosis", "Or DNB Radiology"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 4_000_000, senior: 20_000_000 },
    topColleges: ["AIIMS Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore"],
    skillsRequired: ["Pattern recognition", "Anatomy mastery", "Tech savvy (AI tools)"],
    interestTags: ["medical", "biology", "tech", "diagnostics", "lab", "anatomy"],
    preferredSubjects: ["biology", "physics"],
    growthProspects: "Highest-paid non-surgical specialisation. Teleradiology + AI tools opening flexible work-from-anywhere paths.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD (Radiodiagnosis)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "Radiologist — hospital, teleradiology, imaging centre.",
    },
  },
  {
    name: "Anesthesiologist",
    emoji: "💉",
    category: "medical",
    description:
      "Pain and consciousness specialist for surgery. Manages anaesthesia, ICU patients, chronic pain. Critical role behind every surgery.",
    dayInLife:
      "Pre-op assessments, monitoring during surgery (anaesthesia depth, vitals), ICU rounds, pain clinic consults.",
    qualifications: ["MBBS → MD Anaesthesia"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 3_000_000, senior: 12_000_000 },
    topColleges: ["AIIMS Delhi", "Maulana Azad MC", "CMC Vellore"],
    skillsRequired: ["Decision-making under pressure", "Pharmacology", "Technical procedures (intubation, central lines)"],
    interestTags: ["medical", "biology", "surgery", "anatomy"],
    preferredSubjects: ["biology", "chemistry", "physics"],
    growthProspects: "ICU + pain management = strong demand. Locum (per-day fee) work very lucrative in metros.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD (Anaesthesia)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "Anesthesiologist — OT, ICU, pain clinic.",
    },
  },
  {
    name: "Dermatologist",
    emoji: "🧴",
    category: "medical",
    description:
      "Skin, hair, nail specialist. Booming with India's cosmetic industry — fastest path to high private income post-PG.",
    dayInLife:
      "OPD consults (acne, eczema, hair loss), minor procedures (biopsy, mole removal), cosmetic (botox, laser, fillers) in private practice.",
    qualifications: ["MBBS → MD Dermatology / DDVL"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 4_000_000, senior: 20_000_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "Madras Medical College"],
    skillsRequired: ["Diagnostic eye", "Aesthetic sense", "Communication", "Cosmetic procedures"],
    interestTags: ["medical", "biology", "design", "creative", "diagnostics"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Cosmetic dermatology grossly underserved in India. Top of NEET PG choice list for reason.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD (Dermatology, Venereology & Leprosy)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "Dermatologist — own practice / cosmetic clinic / chain (Kaya, Oliva).",
    },
  },
  {
    name: "Psychiatrist",
    emoji: "🧠",
    category: "medical",
    description:
      "Mental health doctor — depression, anxiety, schizophrenia, addiction. Critical role given India's mental health crisis.",
    dayInLife:
      "30-60 min patient sessions, medication management, therapy planning, family counselling. Calmer than surgical specialities — no night call typically.",
    qualifications: ["MBBS → MD Psychiatry"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["NIMHANS Bangalore", "AIIMS Delhi", "CIP Ranchi"],
    skillsRequired: ["Active listening", "Diagnostic acumen", "Empathy without burnout"],
    interestTags: ["medical", "biology", "psychology", "social", "mental-health", "neuro"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Hugely undersupplied — India has ~9000 psychiatrists for 1.4B people. Massive demand growth ahead.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD (Psychiatry)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "Psychiatrist — hospital + private practice + telehealth.",
    },
  },
  {
    name: "Surgeon (General)",
    emoji: "⚕️",
    category: "medical",
    description:
      "General surgeon for abdomen, breast, thyroid, hernia, trauma. Foundation for any further surgical sub-speciality.",
    dayInLife:
      "Morning OPD + ward rounds, OT in afternoons (3-5 surgeries / day), emergency calls. Surgical lifestyle is intense but high-reward.",
    qualifications: ["MBBS → MS General Surgery → optional super-speciality (MCh)"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 3_500_000, senior: 15_000_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "PGIMER Chandigarh"],
    skillsRequired: ["Manual dexterity", "Stamina", "Decision-making under pressure"],
    interestTags: ["medical", "biology", "engineering", "surgery", "anatomy"],
    preferredSubjects: ["biology", "physics", "chemistry"],
    growthProspects: "Stepping stone for super-speciality (cardio-thoracic, neuro, plastic, urology, GI). MCh adds 3 more years.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [
        { degree: "MS (General Surgery)", duration: "3 years", entranceExams: ["NEET PG"] },
        { degree: "MCh (super-speciality)", duration: "3 years", entranceExams: ["NEET SS"], notes: "Optional: cardio-thoracic, neuro, plastic, urology, etc." },
      ],
      finalRole: "Consultant Surgeon — hospital + private OT.",
    },
  },
  {
    name: "Pathologist",
    emoji: "🔬",
    category: "medical",
    description:
      "Diagnose disease from lab tests — blood, tissue biopsies, body fluids. Behind every diagnosis in a hospital.",
    dayInLife:
      "Microscope work, lab management, reporting samples, occasional fine-needle aspiration. Predictable hours — rare for medicine.",
    qualifications: ["MBBS → MD Pathology"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 800_000, mid: 2_000_000, senior: 8_000_000 },
    topColleges: ["AIIMS Delhi", "PGIMER Chandigarh", "CMC Vellore"],
    skillsRequired: ["Microscope mastery", "Attention to detail", "Lab management"],
    interestTags: ["medical", "biology", "research", "lab", "diagnostics"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Diagnostic chains (SRL, Metropolis, Thyrocare) hire heavily. Predictable lifestyle = popular for women in medicine.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "MBBS", duration: "5.5 years", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD (Pathology)", duration: "3 years", entranceExams: ["NEET PG"] }],
      finalRole: "Pathologist — hospital lab / diagnostic chain.",
    },
  },
  {
    name: "Microbiologist",
    emoji: "🦠",
    category: "research",
    description:
      "Study microorganisms — bacteria, viruses, fungi, parasites. Roles in healthcare diagnostics, pharma R&D, food safety, environmental.",
    dayInLife:
      "Lab work (culture, PCR, antimicrobial susceptibility), infection surveillance in hospitals, research, teaching.",
    qualifications: ["B.Sc Microbiology / Biotech → M.Sc → PhD (for research)", "Or MBBS → MD Microbiology for clinical roles"],
    entranceExams: [
      { name: "CUET UG", link: "https://cuet.nta.nic.in", dates: "May" },
      { name: "GAT-B", link: "https://nta.ac.in", dates: "Apr" },
    ],
    salaryRanges: { entry: 350_000, mid: 900_000, senior: 2_500_000 },
    topColleges: ["AIIMS Delhi", "Madras University", "BHU Varanasi", "DU North Campus"],
    skillsRequired: ["Sterile technique", "PCR + molecular biology", "Data analysis"],
    interestTags: ["biology", "research", "medical", "lab", "diagnostics"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Post-COVID boom in infection control + diagnostic startups. Clinical Microbiology (post-MBBS) is highest paid path.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [
        { degree: "B.Sc Microbiology / Biotech", duration: "3 years", entranceExams: ["CUET UG"] },
      ],
      postgrad: [
        { degree: "M.Sc Microbiology", duration: "2 years", entranceExams: ["CUET PG"] },
        { degree: "PhD (research) — OR — MD Microbiology (clinical, post-MBBS)", duration: "3-5 years" },
      ],
      finalRole: "Microbiologist — clinical lab, pharma R&D, food/agri sector, academia.",
    },
  },
  {
    name: "Geneticist / Genetic Counselor",
    emoji: "🧬",
    category: "medical",
    description:
      "Diagnose and counsel about inherited disorders. Booming field with prenatal screening, cancer genetics, rare disease panels.",
    dayInLife:
      "Genetic test interpretation (NGS panels), family pedigree counselling, prenatal screening reports, rare disease workups.",
    qualifications: ["B.Sc Biotech → M.Sc Human Genetics + PG diploma in Counseling", "Or MBBS → MD + Fellowship in Medical Genetics"],
    entranceExams: [
      { name: "NEET UG (clinical route)", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "CUET UG", link: "https://cuet.nta.nic.in", dates: "May" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 5_000_000 },
    topColleges: ["AIIMS Delhi", "Sir Ganga Ram Hospital genetics dept", "MAHE Manipal"],
    skillsRequired: ["Genetics + statistics", "Empathy", "Counselling skills"],
    interestTags: ["biology", "medical", "research", "psychology", "lab", "diagnostics", "stats"],
    preferredSubjects: ["biology", "chemistry", "math"],
    growthProspects: "MapmyGenome, Lilac Insights, Strand Lifesciences hiring. Fastest-growing medical sub-field globally.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "B.Sc Biotech / Genetics", duration: "3 years", entranceExams: ["CUET UG"] }],
      postgrad: [{ degree: "M.Sc Genetics + PG Diploma Genetic Counseling", duration: "2-3 years" }],
      finalRole: "Genetic Counselor — diagnostic lab, prenatal centre, oncology team.",
    },
  },
  {
    name: "Bioinformatician",
    emoji: "🧪",
    category: "research",
    description:
      "Computational biology — apply algorithms + statistics to genomic and biological data. Bridge between biology and CS.",
    dayInLife:
      "Coding Python / R analyses of sequencing data, building pipelines, statistical modeling of disease cohorts.",
    qualifications: ["B.Sc / B.Tech Bioinformatics OR Biotech + computational", "M.Sc / PhD for advanced roles"],
    entranceExams: [
      { name: "GAT-B", link: "https://nta.ac.in", dates: "Apr" },
      { name: "JEE Main + IIIT-D / B.Tech Bioinformatics", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_800_000, senior: 5_500_000 },
    topColleges: ["IIIT Delhi (Computational Biology)", "IIT Madras", "Anna University", "Madurai Kamaraj University"],
    skillsRequired: ["Python / R", "Statistics", "Molecular biology", "Linux"],
    interestTags: ["biology", "tech", "research", "math", "lab", "stats", "data", "analytics"],
    preferredSubjects: ["biology", "math", "chemistry"],
    growthProspects: "MedGenome, Roche, GSK India hire heavily. Generative AI applied to drug discovery is a huge growth area.",
    roadmap: {
      class12: { stream: "PCMB", coreSubjects: ["Physics", "Chemistry", "Biology", "Math"], minScore: "Recommended PCMB if available — needs both Math and Bio" },
      undergrad: [{ degree: "B.Tech Bioinformatics / B.Sc Comp Biology", duration: "4 years" }],
      postgrad: [{ degree: "M.Sc / PhD Computational Biology", duration: "2-5 years" }],
      finalRole: "Bioinformatician — pharma R&D, diagnostic startup, academic lab.",
    },
  },
  {
    name: "Nutritionist / Dietitian",
    emoji: "🥗",
    category: "medical",
    description:
      "Plan diets for hospital patients, sports teams, fitness clients, lifestyle disease management. Booming with India's diabetes/obesity epidemic.",
    dayInLife:
      "Patient consults, individualised meal plans, follow-ups, working with physicians on diabetic/cardiac/cancer nutrition.",
    qualifications: ["B.Sc Nutrition & Dietetics → M.Sc → Registered Dietitian (RD) cert via IDA"],
    entranceExams: [{ name: "CUET UG", link: "https://cuet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 250_000, mid: 700_000, senior: 2_500_000 },
    topColleges: ["Lady Irwin College Delhi", "SNDT Mumbai", "Manipal Academy of Higher Education"],
    skillsRequired: ["Clinical nutrition", "Counselling", "Cultural sensitivity", "Marketing self (for private practice)"],
    interestTags: ["biology", "medical", "social", "fitness", "health", "sports"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "D2C health (HealthifyMe, Cult, Curefit) hiring fast. Influencer dietitians on Insta scale to ₹50L+/year.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "B.Sc Nutrition & Dietetics", duration: "3 years", entranceExams: ["CUET UG"] }],
      postgrad: [{ degree: "M.Sc Dietetics", duration: "2 years" }, { degree: "Registered Dietitian (RD) certification", duration: "6 months" }],
      finalRole: "Dietitian — hospital / private clinic / sports team / D2C app.",
    },
  },
  {
    name: "Ayurvedic Doctor (BAMS)",
    emoji: "🌿",
    category: "medical",
    description:
      "Traditional Indian medicine practitioner. Modern Ayurveda combines classical principles with evidence-based wellness — growing wellness industry.",
    dayInLife:
      "Pulse-reading consults, prescribing herbal formulations, panchakarma therapies, lifestyle counselling.",
    qualifications: ["BAMS (Bachelor of Ayurvedic Medicine & Surgery), 5.5 yr"],
    entranceExams: [{ name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 350_000, mid: 900_000, senior: 4_000_000 },
    topColleges: ["IPGT&RA Jamnagar", "BHU Ayurveda Faculty", "Govt Ayurveda College Trivandrum", "Tilak Maharashtra Vidyapeeth"],
    skillsRequired: ["Sanskrit basics", "Herbal pharmacology", "Patient communication"],
    interestTags: ["medical", "biology", "humanities"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Patanjali, Himalaya, Kapiva growing. AYUSH ministry expanding govt roles.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "BAMS", duration: "5.5 years (4.5 + internship)", entranceExams: ["NEET UG"] }],
      postgrad: [{ degree: "MD (Ayurveda) — optional", duration: "3 years" }],
      finalRole: "Ayurvedic Doctor — own clinic / wellness chain / Ayurvedic pharma.",
    },
  },
  {
    name: "Homeopath (BHMS)",
    emoji: "💊",
    category: "medical",
    description:
      "Homeopathic medicine practitioner. Strong patient base in India for chronic conditions — skin, allergies, kids' health.",
    dayInLife:
      "Detailed history-taking (1-hr first consults common), individualised remedy prescription, long-term follow-ups.",
    qualifications: ["BHMS (Bachelor of Homeopathic Medicine & Surgery), 5.5 yr"],
    entranceExams: [{ name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 300_000, mid: 700_000, senior: 2_500_000 },
    topColleges: ["NIH Kolkata", "Govt Homeopathic Medical College Bangalore", "JBR Pune"],
    skillsRequired: ["Patient listening", "Materia medica", "Patience for slow-acting therapies"],
    interestTags: ["medical", "biology", "social"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Stable demand. Private clinic model dominant. Lifestyle disease + chronic care segment.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "BHMS", duration: "5.5 years (4.5 + internship)", entranceExams: ["NEET UG"] }],
      finalRole: "Homeopathic Doctor — private clinic / online consult platform.",
    },
  },
  {
    name: "Occupational Therapist",
    emoji: "🤝",
    category: "medical",
    description:
      "Help patients regain daily-life skills after injury / disability / autism. Combines biology, psychology, and hands-on therapy.",
    dayInLife:
      "1-on-1 patient sessions teaching dressing, writing, walking again. Heavy use of adaptive equipment + creative exercises.",
    qualifications: ["BOT (Bachelor of Occupational Therapy), 4.5 yr"],
    entranceExams: [
      { name: "NEET UG (some states)", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "AIIMS BOT entrance", link: "https://www.aiimsexams.ac.in", dates: "Varies" },
    ],
    salaryRanges: { entry: 250_000, mid: 700_000, senior: 2_500_000 },
    topColleges: ["AIIMS Delhi (BOT)", "Christian Medical College Vellore", "NIEPMD Chennai"],
    skillsRequired: ["Patience", "Creativity in therapy", "Empathy"],
    interestTags: ["biology", "medical", "social", "psychology", "mental-health", "children", "pediatric"],
    preferredSubjects: ["biology", "psychology"],
    growthProspects: "Autism + elderly care + post-stroke rehab all booming. International demand strong (UK NHS, Gulf, US).",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "BOT", duration: "4.5 years (3.5 + internship)" }],
      postgrad: [{ degree: "MOT (specialisation)", duration: "2 years" }],
      finalRole: "Occupational Therapist — hospital / autism centre / pediatric clinic / private practice.",
    },
  },
  {
    name: "Clinical Psychologist",
    emoji: "🛋️",
    category: "medical",
    description:
      "Therapy + assessment specialist (different from psychiatrist — no prescriptions, deeper therapy). RCI license required for clinical work.",
    dayInLife:
      "50-min therapy sessions, psychological assessments (IQ, personality), case reports, supervision.",
    qualifications: ["BA/B.Sc Psychology → MA Clinical Psych → M.Phil Clinical Psych (RCI-licensed)"],
    entranceExams: [
      { name: "NIMHANS entrance", link: "https://nimhans.ac.in", dates: "Apr" },
      { name: "CUET PG", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" },
    ],
    salaryRanges: { entry: 400_000, mid: 1_200_000, senior: 4_000_000 },
    topColleges: ["NIMHANS Bangalore", "CIP Ranchi", "TISS Mumbai", "Christ University Bangalore"],
    skillsRequired: ["Therapeutic techniques (CBT, DBT)", "Empathy", "Research basics"],
    interestTags: ["psychology", "biology", "social", "research", "mental-health", "neuro"],
    preferredSubjects: ["psychology", "biology"],
    growthProspects: "Mental health awareness booming. D2C platforms (YourDOST, Wysa, MFine) hiring. Independent practice has highest ceiling.",
    roadmap: {
      class12: { stream: "Any", coreSubjects: ["Psychology (recommended)", "English"], notes: "Humanities + Psych is most common but any stream works" },
      undergrad: [{ degree: "BA / B.Sc Psychology", duration: "3 years" }],
      postgrad: [
        { degree: "MA Clinical Psychology", duration: "2 years", entranceExams: ["NIMHANS / CUET PG"] },
        { degree: "M.Phil Clinical Psychology (RCI-licensed)", duration: "2 years", notes: "Required for clinical practice" },
      ],
      finalRole: "Clinical Psychologist — hospital / private practice / corporate wellness.",
    },
  },
  {
    name: "Audiologist & Speech-Language Pathologist (BASLP — extended)",
    emoji: "👂",
    category: "medical",
    description:
      "Hearing + speech disorders. Audiologists fit hearing aids + cochlear implants. SLPs treat stuttering, autism speech, swallowing disorders.",
    dayInLife:
      "Hearing tests, hearing-aid fitting, 1:1 speech therapy sessions, school visits (special needs), cochlear implant programming.",
    qualifications: ["BASLP — 4-year integrated programme", "MASLP for specialisation"],
    entranceExams: [{ name: "AIISH entrance", link: "https://www.aiishmysore.in", dates: "Jul" }],
    salaryRanges: { entry: 250_000, mid: 700_000, senior: 2_000_000 },
    topColleges: ["AIISH Mysore", "AYJNIHH Mumbai", "JIPMER Puducherry"],
    skillsRequired: ["Diagnostic skills", "Patience with kids", "Tech (audiometry, hearing aids)"],
    interestTags: ["biology", "medical", "social", "psychology", "diagnostics", "children", "pediatric"],
    preferredSubjects: ["biology"],
    growthProspects: "Cochlear, Phonak, Resound hire audiologists. School-system + autism therapy demand is exploding.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "BASLP", duration: "4 years (3.5 + internship)" }],
      postgrad: [{ degree: "MASLP", duration: "2 years" }],
      finalRole: "Audiologist or SLP — hospital / school / private clinic.",
    },
  },
  {
    name: "Botanist",
    emoji: "🌱",
    category: "research",
    description:
      "Plant biologist. Roles in agriculture, conservation, pharma (plant-derived drugs), forensic botany, taxonomy.",
    dayInLife:
      "Field trips, herbarium work, lab assays of plant compounds, paper writing.",
    qualifications: ["B.Sc Botany → M.Sc → PhD"],
    entranceExams: [
      { name: "CUET UG", link: "https://cuet.nta.nic.in", dates: "May" },
      { name: "IIT JAM (M.Sc)", link: "https://jam.iitb.ac.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 350_000, mid: 900_000, senior: 2_500_000 },
    topColleges: ["BHU Varanasi", "Calcutta University", "Madurai Kamaraj", "Punjab University"],
    skillsRequired: ["Plant taxonomy", "Field identification", "Lab techniques", "GIS basics"],
    interestTags: ["biology", "research", "agriculture", "rural", "climate", "sustainability"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Conservation NGOs (WWF, ATREE), pharma R&D, ICAR research institutes.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "B.Sc Botany", duration: "3 years" }],
      postgrad: [{ degree: "M.Sc Botany / Plant Biology", duration: "2 years" }, { degree: "PhD (research)", duration: "4-5 years" }],
      finalRole: "Botanist — research institute / conservation NGO / pharma / forensic.",
    },
  },
  {
    name: "Zoologist / Wildlife Biologist",
    emoji: "🦁",
    category: "research",
    description:
      "Animal biologist. Wildlife conservation (tigers, elephants, wetlands), zoo management, comparative anatomy research.",
    dayInLife:
      "Field surveys (camera-trapping, telemetry), specimen analysis, conservation policy work, teaching.",
    qualifications: ["B.Sc Zoology → M.Sc Wildlife Sciences / Zoology → PhD"],
    entranceExams: [
      { name: "WII (Wildlife Institute of India) entrance", link: "https://wii.gov.in", dates: "Varies" },
      { name: "CUET PG", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" },
    ],
    salaryRanges: { entry: 350_000, mid: 800_000, senior: 2_000_000 },
    topColleges: ["WII Dehradun", "Saurashtra University", "BHU Varanasi", "Pondicherry University"],
    skillsRequired: ["Field stamina", "GIS", "Species identification", "Statistics"],
    interestTags: ["biology", "research", "climate", "sustainability", "rural"],
    preferredSubjects: ["biology"],
    growthProspects: "Forest Service (IFS), WWF, Aaranyak, Wildlife Trust of India. Niche but deeply meaningful.",
    roadmap: {
      class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
      undergrad: [{ degree: "B.Sc Zoology", duration: "3 years" }],
      postgrad: [{ degree: "M.Sc Wildlife Sciences (WII)", duration: "2 years" }, { degree: "PhD", duration: "4-5 years" }],
      finalRole: "Wildlife Biologist — WII, IFS, conservation org, zoo, academia.",
    },
  },

  /* ═══════════════════════════════════════════════════════════════
     ADDITIONAL CAREERS — GOVT, AGRI, AVIATION, ALLIED HEALTH,
     MENTAL HEALTH, NICHE TECH, WELLNESS, SPECIALTY MEDICINE
     ═══════════════════════════════════════════════════════════════ */

  /* ── Govt / Banking / PSU ── */
  {
    name: "Bank PO / Banking Officer",
    emoji: "🏦",
    category: "commerce",
    description:
      "Probationary officer at PSU banks (SBI, PNB, etc.). Stable govt job with strong pension, promotions to GM/MD. Most popular post-graduation route in India.",
    dayInLife: "Branch operations, loan sanctions, customer service, target-driven sales (insurance, loans), audit prep.",
    qualifications: ["Any bachelor degree + IBPS PO / SBI PO clearance"],
    entranceExams: [
      { name: "IBPS PO", link: "https://www.ibps.in", dates: "Sep-Oct" },
      { name: "SBI PO", link: "https://sbi.co.in/careers", dates: "Jan-Feb" },
    ],
    salaryRanges: { entry: 800_000, mid: 1_500_000, senior: 4_500_000 },
    topColleges: ["Any UG (no specific college)", "SRCC Delhi", "Loyola Chennai"],
    skillsRequired: ["Quantitative aptitude", "Reasoning", "English", "Banking awareness"],
    interestTags: ["commerce", "finance", "stable", "govt", "banking", "social"],
    preferredSubjects: ["math", "economics", "english"],
    growthProspects: "PO → Manager → Chief Manager → AGM → DGM → GM. Pension + LTC + housing perks.",
  },
  {
    name: "RBI Grade B Officer",
    emoji: "📜",
    category: "commerce",
    description:
      "Central bank officer. Among the most prestigious civilian govt jobs. Policy, regulation, financial stability work.",
    dayInLife: "Monetary policy analysis, bank supervision audits, payment-system regulation, research reports.",
    qualifications: ["Bachelor degree (60%+) + RBI Grade B exam clearance"],
    entranceExams: [{ name: "RBI Grade B", link: "https://www.rbi.org.in/Scripts/Careers.aspx", dates: "May-Jul" }],
    salaryRanges: { entry: 1_200_000, mid: 2_500_000, senior: 6_000_000 },
    topColleges: ["Any UG with strong Economics / Statistics"],
    skillsRequired: ["Macroeconomics", "Statistics", "Policy analysis", "English writing"],
    interestTags: ["commerce", "finance", "economics", "stable", "govt", "banking", "stats", "analytics"],
    preferredSubjects: ["economics", "math", "english"],
    growthProspects: "Grade B → Grade C → CGM → ED → Deputy Governor. Postings across India + foreign training.",
  },
  {
    name: "SSC CGL Officer (Income Tax / Customs / Audit)",
    emoji: "📑",
    category: "civil-services",
    description:
      "Group B central govt officer via SSC CGL — Income Tax Inspector, Customs Inspector, CAG auditor, etc. High-stability govt career.",
    dayInLife: "Field assessments / audits, file work, tax investigations, court testimony in some cases.",
    qualifications: ["Bachelor degree (any) + SSC CGL clearance"],
    entranceExams: [{ name: "SSC CGL", link: "https://ssc.nic.in", dates: "Apr-Jun" }],
    salaryRanges: { entry: 600_000, mid: 1_200_000, senior: 3_000_000 },
    topColleges: ["Any UG"],
    skillsRequired: ["Quant + reasoning", "English", "GS awareness", "Integrity"],
    interestTags: ["commerce", "law", "stable", "govt", "social", "humanities"],
    preferredSubjects: ["math", "english"],
    growthProspects: "Inspector → AC → DC → JC. Power + pension + transfers across India.",
  },

  /* ── Agriculture & Rural ── */
  {
    name: "Agricultural Scientist",
    emoji: "🌾",
    category: "research",
    description:
      "Improve crops, soil, livestock through R&D — at ICAR, agri universities, or private agri-tech. Critical for India's food security.",
    dayInLife: "Field trials, lab analysis of soil/seed/water, scientific writing, farmer outreach programs.",
    qualifications: ["B.Sc Agriculture (4 yr) → M.Sc → PhD", "ARS exam for ICAR scientist post"],
    entranceExams: [
      { name: "ICAR AIEEA (UG)", link: "https://icar.org.in", dates: "May-Jun" },
      { name: "ICAR ARS (research scientist)", link: "https://icar.org.in", dates: "Varies" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_500_000, senior: 4_000_000 },
    topColleges: ["IARI Pusa Delhi", "GBPUAT Pantnagar", "TNAU Coimbatore", "PAU Ludhiana"],
    skillsRequired: ["Agronomy", "Statistics", "Field research", "Lab techniques"],
    interestTags: ["biology", "research", "agriculture", "rural", "social", "sustainability", "climate"],
    preferredSubjects: ["biology", "chemistry", "math"],
    growthProspects: "ICAR Scientist, agri-tech startups (DeHaat, Ninjacart), state agriculture depts, FAO.",
  },
  {
    name: "Horticulturist / Floriculturist",
    emoji: "🌷",
    category: "research",
    description:
      "Fruit, vegetable, flower, and ornamental plant specialist. Polyhouse farming + organic / export horticulture booming in India.",
    dayInLife: "Field design, irrigation planning, post-harvest tech, marketing produce to wholesale chains.",
    qualifications: ["B.Sc Horticulture (4 yr) → M.Sc"],
    entranceExams: [{ name: "ICAR AIEEA", link: "https://icar.org.in", dates: "May-Jun" }],
    salaryRanges: { entry: 350_000, mid: 900_000, senior: 2_500_000 },
    topColleges: ["YSPUHF Solan", "TNAU Coimbatore", "Dr YSR Horticultural University AP"],
    skillsRequired: ["Plant pathology", "Greenhouse mgmt", "Market sense", "Field stamina"],
    interestTags: ["biology", "agriculture", "rural", "design", "sustainability"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Polyhouse farming startups, organic exporters, agri-tourism, govt horticulture missions.",
  },
  {
    name: "Dairy Technologist / Food Technologist",
    emoji: "🥛",
    category: "research",
    description:
      "Process and engineer food/dairy products. India is world #1 milk producer — Amul / Mother Dairy hire heavily. Also chocolate, snacks, frozen food.",
    dayInLife: "Quality control on production lines, recipe formulation, food safety audits, packaging R&D.",
    qualifications: ["B.Tech Dairy Tech / Food Tech (4 yr) → M.Tech"],
    entranceExams: [
      { name: "ICAR AIEEA", link: "https://icar.org.in", dates: "May-Jun" },
      { name: "JEE Main (some institutes)", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_200_000, senior: 3_500_000 },
    topColleges: ["NDRI Karnal", "IIT Kharagpur (Food Tech)", "CFTRI Mysore"],
    skillsRequired: ["Food chemistry", "HACCP / FSSAI compliance", "Process engineering"],
    interestTags: ["engineering", "biology", "agriculture", "operations", "health"],
    preferredSubjects: ["chemistry", "biology", "math"],
    growthProspects: "Amul, Britannia, Nestle, ITC, Mother Dairy. Food D2C startups also hiring.",
  },

  /* ── Specialty Medicine (super-speciality / allied) ── */
  {
    name: "Oncologist (Cancer Specialist)",
    emoji: "🎗️",
    category: "medical",
    description:
      "Cancer doctor. Medical / Surgical / Radiation oncology sub-paths. Among the most emotionally demanding and impactful medical fields.",
    dayInLife: "Chemotherapy planning, surgical removal of tumors, radiation planning, breaking-bad-news consults, multidisciplinary tumor boards.",
    qualifications: ["MBBS → MD/MS → DM Medical Oncology / MCh Surgical Oncology / DMRT Radiation Oncology"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
      { name: "NEET SS", link: "https://nbe.edu.in", dates: "Sep" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 5_000_000, senior: 25_000_000 },
    topColleges: ["Tata Memorial Mumbai", "AIIMS Delhi", "Kidwai Bangalore", "CMC Vellore"],
    skillsRequired: ["Clinical reasoning", "Emotional resilience", "Multi-team coordination", "Imaging interpretation"],
    interestTags: ["medical", "biology", "research", "surgery", "anatomy", "diagnostics", "social"],
    preferredSubjects: ["biology", "chemistry", "physics"],
    growthProspects: "India cancer burden growing fast. Tata Memorial fellowships + private cancer hospital chains (HCG, Apollo Onco) hiring.",
  },
  {
    name: "ENT Specialist (Otorhinolaryngologist)",
    emoji: "👃",
    category: "medical",
    description:
      "Ear, Nose, Throat surgeon. Sinus, tonsil, hearing surgery + head & neck cancer + thyroid surgery. Balanced surgical + OPD lifestyle.",
    dayInLife: "OPD with audiometry, endoscopic sinus surgery, tonsillectomies, cochlear implant programs.",
    qualifications: ["MBBS → MS Otorhinolaryngology"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 2_800_000, senior: 12_000_000 },
    topColleges: ["AIIMS Delhi", "Madras Medical College", "PGIMER Chandigarh"],
    skillsRequired: ["Endoscopic surgery", "Microsurgery skills", "Diagnostic acumen"],
    interestTags: ["medical", "biology", "surgery", "anatomy", "diagnostics", "social"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "Hearing-aid market booming. Cochlear implant programs expanding under govt schemes.",
  },
  {
    name: "Ophthalmologist (Eye Surgeon)",
    emoji: "👁️",
    category: "medical",
    description:
      "Eye surgeon. Cataract is the most common surgery in India by volume. LASIK, retinal, glaucoma sub-specialties all growing fast.",
    dayInLife: "OPD eye exams, OT surgeries (cataract, LASIK, vitreoretinal), camp-based cataract drives, OCT scan reading.",
    qualifications: ["MBBS → MS Ophthalmology / DOMS"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 3_000_000, senior: 15_000_000 },
    topColleges: ["LV Prasad Eye Inst Hyderabad", "AIIMS Delhi RP Centre", "Sankara Nethralaya Chennai", "Aravind Eye Hospital Madurai"],
    skillsRequired: ["Microsurgery", "Steady hands", "OCT / fundus interpretation"],
    interestTags: ["medical", "biology", "surgery", "anatomy", "diagnostics"],
    preferredSubjects: ["biology", "physics", "chemistry"],
    growthProspects: "Diabetic retinopathy + age-related macular degeneration creating exploding demand.",
  },
  {
    name: "Urologist",
    emoji: "🧫",
    category: "medical",
    description:
      "Urinary system + male reproductive surgeon. Kidney stones, prostate, fertility surgeries. Robotic surgery is the future of urology.",
    dayInLife: "OPD consults, lithotripsy (stone breaking), TURP (prostate), robotic prostatectomy, kidney transplant surgeries.",
    qualifications: ["MBBS → MS General Surgery → MCh Urology"],
    entranceExams: [
      { name: "NEET UG", link: "https://neet.nta.nic.in", dates: "May" },
      { name: "NEET PG", link: "https://nbe.edu.in", dates: "Mar" },
      { name: "NEET SS", link: "https://nbe.edu.in", dates: "Sep" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 4_500_000, senior: 25_000_000 },
    topColleges: ["AIIMS Delhi", "SGPGI Lucknow", "CMC Vellore", "JIPMER Puducherry"],
    skillsRequired: ["Robotic + endoscopic surgery", "Anatomy mastery", "Patient communication"],
    interestTags: ["medical", "biology", "surgery", "anatomy", "tech"],
    preferredSubjects: ["biology", "chemistry", "physics"],
    growthProspects: "Robotic urology fellowships abroad (Cleveland Clinic, Vattikuti Institute). Top earners in surgery.",
  },
  {
    name: "Counseling Psychologist",
    emoji: "💬",
    category: "medical",
    description:
      "Talk-therapy specialist for normal-population concerns — relationships, work stress, grief, life transitions. Less clinical than M.Phil track.",
    dayInLife: "50-min therapy sessions, school counselling, corporate wellness workshops, intake assessments.",
    qualifications: ["BA Psychology → MA Counseling Psychology + supervised internship hours"],
    entranceExams: [{ name: "CUET PG", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" }],
    salaryRanges: { entry: 300_000, mid: 900_000, senior: 3_500_000 },
    topColleges: ["TISS Mumbai", "Christ University Bangalore", "DU South Campus"],
    skillsRequired: ["Active listening", "CBT / DBT / ACT techniques", "Self-care boundaries"],
    interestTags: ["psychology", "social", "mental-health", "neuro", "humanities"],
    preferredSubjects: ["psychology", "english"],
    growthProspects: "YourDOST, Wysa, MFine, Lyra hire heavily. Independent practice ceiling is high in metros.",
  },

  /* ── Allied Health / Wellness ── */
  {
    name: "Medical Lab Technologist (MLT)",
    emoji: "⚗️",
    category: "medical",
    description:
      "Run diagnostic tests — blood, urine, biochemistry, microbiology. Behind every pathology report. Shortest path to a medical-adjacent career.",
    dayInLife: "Sample processing, automated analysers, microscope work, quality control, reporting.",
    qualifications: ["B.Sc Medical Lab Technology (3 yr) — or DMLT diploma (2 yr)"],
    entranceExams: [{ name: "AIIMS / CUET / Institute-specific entrance", link: "https://www.aiimsexams.ac.in", dates: "Varies" }],
    salaryRanges: { entry: 200_000, mid: 500_000, senior: 1_500_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "PGIMER Chandigarh", "Manipal"],
    skillsRequired: ["Precision", "Lab equipment operation", "Quality control mindset"],
    interestTags: ["biology", "medical", "lab", "diagnostics", "tech"],
    preferredSubjects: ["biology", "chemistry"],
    growthProspects: "SRL, Metropolis, Thyrocare expanding. Senior MLT → Lab Manager → Lab Director track.",
  },
  {
    name: "Radiographer / X-Ray Tech",
    emoji: "🩻",
    category: "medical",
    description:
      "Operate X-ray, CT, MRI machines. Backbone of every diagnosis. Tech-heavy + low-stress patient interaction.",
    dayInLife: "Positioning patients, running scans, ensuring quality images, radiation safety, reporting to radiologist.",
    qualifications: ["B.Sc Radiography / BMRIT (3-4 yr)"],
    entranceExams: [{ name: "AIIMS B.Sc Allied Health / CUET UG", link: "https://www.aiimsexams.ac.in", dates: "Varies" }],
    salaryRanges: { entry: 250_000, mid: 600_000, senior: 1_800_000 },
    topColleges: ["AIIMS Delhi", "CMC Vellore", "PGIMER Chandigarh"],
    skillsRequired: ["Anatomy knowledge", "Radiation safety", "Patient positioning"],
    interestTags: ["biology", "medical", "tech", "diagnostics", "lab"],
    preferredSubjects: ["biology", "physics"],
    growthProspects: "Imaging chains (Indus Health, Quadra), abroad demand in Gulf + NHS UK strong.",
  },
  {
    name: "Yoga / Wellness Instructor",
    emoji: "🧘",
    category: "education",
    description:
      "Teach yoga, breathwork, meditation. India's wellness export — Mysore, Rishikesh schools have global students. Combine with sports / corporate wellness.",
    dayInLife: "Group classes, 1:1 sessions, retreats, online classes. Possible D2C app coach role.",
    qualifications: ["RYT-200 / RYT-500 certification (Yoga Alliance) OR Govt CCRYN cert"],
    entranceExams: [{ name: "Direct admission at Bihar School / SVYASA", link: "https://www.svyasa.edu.in", dates: "Year-round" }],
    salaryRanges: { entry: 250_000, mid: 800_000, senior: 4_000_000 },
    topColleges: ["SVYASA Bangalore", "Kaivalyadhama Lonavla", "Bihar School of Yoga"],
    skillsRequired: ["Asana / pranayama mastery", "Teaching", "Anatomy basics", "Personal branding"],
    interestTags: ["biology", "health", "fitness", "sports", "social", "creative", "psychology", "mental-health"],
    preferredSubjects: ["biology", "psychology"],
    growthProspects: "Cult, Fittr, Headspace expanding. Studio ownership, retreats abroad, content creation all valid paths.",
  },
  {
    name: "Personal / Fitness Trainer",
    emoji: "💪",
    category: "education",
    description:
      "1:1 fitness coach. Gyms, online programs, sports teams. Booming with India's fitness awakening.",
    dayInLife: "Client sessions, programming workouts, nutrition guidance, content for socials.",
    qualifications: ["ACE / NASM / ISSA certification", "B.Sc Sports Science (optional)"],
    entranceExams: [],
    salaryRanges: { entry: 250_000, mid: 800_000, senior: 4_000_000 },
    topColleges: ["K11 Academy", "INFS", "NASM India"],
    skillsRequired: ["Exercise science", "Programming", "Sales / retention", "Camera presence"],
    interestTags: ["biology", "health", "fitness", "sports", "social", "creative"],
    preferredSubjects: ["biology"],
    growthProspects: "Cult, FitnFlex, Fittr. Online coaching pays exponentially better than gym jobs.",
  },

  /* ── Niche tech ── */
  {
    name: "Hardware / VLSI Engineer",
    emoji: "🔌",
    category: "engineering",
    description:
      "Design chips and circuits. India's semiconductor mission ($10B) is creating thousands of jobs. AI / GPU boom = chip designer = hot job.",
    dayInLife: "RTL coding (Verilog/SystemVerilog), simulation, layout review, tape-out.",
    qualifications: ["B.Tech ECE / Electrical → M.Tech VLSI"],
    entranceExams: [
      { name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
      { name: "GATE (PG)", link: "https://gate.iitb.ac.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 1_000_000, mid: 2_500_000, senior: 7_000_000 },
    topColleges: ["IIT Bombay", "IIT Madras", "IISc Bangalore", "IIIT Hyderabad"],
    skillsRequired: ["Digital design", "Verilog/SystemVerilog", "Linux", "Simulation tools"],
    interestTags: ["engineering", "tech", "math", "cs", "logic"],
    preferredSubjects: ["physics", "math", "computer science"],
    growthProspects: "Nvidia, Intel, AMD, Qualcomm India hiring 1000s. India's chip design talent is world-class.",
  },
  {
    name: "Mathematician / Statistician",
    emoji: "🔢",
    category: "research",
    description:
      "Pure math / applied stats research. ISI / IISc / TIFR for academic; finance / data science for applied work. India needs ~10x more statisticians.",
    dayInLife: "Theorem proofs, data modelling, journal paper writing, teaching grad courses.",
    qualifications: ["B.Sc / B.Stat → M.Sc / M.Stat → PhD"],
    entranceExams: [
      { name: "ISI Admission Test", link: "https://www.isical.ac.in", dates: "May" },
      { name: "CMI entrance", link: "https://www.cmi.ac.in", dates: "May" },
      { name: "IIT JAM", link: "https://jam.iitb.ac.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_500_000, senior: 4_000_000 },
    topColleges: ["ISI Kolkata / Bangalore", "CMI Chennai", "TIFR Mumbai", "IISc Bangalore"],
    skillsRequired: ["Proof writing", "Statistical theory", "R / Python", "LaTeX"],
    interestTags: ["math", "research", "logic", "stats", "data", "analytics"],
    preferredSubjects: ["math", "computer science", "physics"],
    growthProspects: "Indian Statistical Service, RBI, NIPFP, all FAANG quant teams. PhD opens academic & industry both.",
  },
  {
    name: "Actuary",
    emoji: "📊",
    category: "commerce",
    description:
      "Quantify risk for insurance and pensions. Pass 13+ actuarial papers (IAI) to qualify — among the toughest professional exams in India.",
    dayInLife: "Statistical modeling of mortality, claims, pricing, reserves. Heavy Excel / R / Prophet software work.",
    qualifications: ["Bachelor's degree + Actuarial Common Entrance Test (ACET) + IAI fellowship papers"],
    entranceExams: [{ name: "ACET (IAI)", link: "https://www.actuariesindia.org", dates: "Jul + Jan" }],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["IAI (Institute of Actuaries of India)", "Any UG with strong math"],
    skillsRequired: ["Probability + stats", "Excel / Prophet / R", "Persistence (10 yr avg to qualify)"],
    interestTags: ["math", "finance", "commerce", "stats", "analytics", "stable", "logic"],
    preferredSubjects: ["math", "economics", "computer science"],
    growthProspects: "LIC, IRDAI, big-4 actuarial consulting (Mercer, WTW). Qualified fellows extremely scarce in India.",
  },

  /* ── Defense / Aviation extras ── */
  {
    name: "Merchant Navy Officer",
    emoji: "🚢",
    category: "engineering",
    description:
      "Officer on cargo / passenger ships globally. Tax-free salary in USD. 6 months on, 6 months off. International postings.",
    dayInLife: "Bridge watch (navigation), engine room (engineering branch), cargo ops, port stays in 30+ countries.",
    qualifications: ["B.Sc Nautical Science (deck) / B.Tech Marine Engg → DG Shipping cert"],
    entranceExams: [
      { name: "IMU CET", link: "https://www.imu.edu.in", dates: "May" },
      { name: "JEE Main (for Marine Engg)", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 4_000_000, senior: 12_000_000 },
    topColleges: ["IMU Chennai/Mumbai/Vizag", "TS Chanakya Mumbai", "Tolani Maritime Pune"],
    skillsRequired: ["Navigation", "Marine engineering", "Crisis management", "International law basics"],
    interestTags: ["engineering", "tech", "operations", "aviation", "defense"],
    preferredSubjects: ["physics", "math", "english"],
    growthProspects: "3rd Officer → 2nd → Chief Officer → Captain. ~10 yrs to Captain (~₹15L+/month tax-free).",
  },
  {
    name: "Air Traffic Controller",
    emoji: "🛬",
    category: "engineering",
    description:
      "Direct planes in and out of airports + along air routes. Among the most cognitively demanding jobs in the world.",
    dayInLife: "Radar screens + radio comms with pilots, weather coordination, sequencing aircraft, emergency handling.",
    qualifications: ["B.E./B.Tech + AAI ATC junior executive recruitment"],
    entranceExams: [{ name: "AAI Junior Executive (ATC)", link: "https://www.aai.aero", dates: "Varies" }],
    salaryRanges: { entry: 900_000, mid: 1_800_000, senior: 3_500_000 },
    topColleges: ["Any engineering UG", "CATC Allahabad (post-selection training)"],
    skillsRequired: ["Spatial reasoning", "Multitasking", "Calm under pressure", "Clear communication"],
    interestTags: ["engineering", "tech", "aviation", "operations", "govt", "stable", "defense"],
    preferredSubjects: ["math", "physics", "english"],
    growthProspects: "AAI permanent govt job — pension + family medical. Senior controller → ATC-in-charge → APD.",
  },

  /* ── Education extras ── */
  {
    name: "Special Educator (Learning Disabilities)",
    emoji: "🎓",
    category: "education",
    description:
      "Teach kids with dyslexia, autism, ADHD, intellectual disabilities. Combines education with psychology. Critical national need.",
    dayInLife: "Individualised Education Plans (IEPs), 1-on-1 sessions, classroom inclusion strategies, parent counselling.",
    qualifications: ["B.Ed Special Education (2 yr) + RCI-approved cert"],
    entranceExams: [{ name: "RIE entrance / State B.Ed CET", link: "https://www.ncert.nic.in", dates: "Varies" }],
    salaryRanges: { entry: 250_000, mid: 600_000, senior: 1_500_000 },
    topColleges: ["NIEPID Secunderabad", "Christ University Bangalore", "Amity Special Ed"],
    skillsRequired: ["Patience", "IEP design", "Behavioural strategies", "Empathy"],
    interestTags: ["social", "education", "psychology", "humanities", "mental-health", "children", "pediatric"],
    preferredSubjects: ["psychology", "english"],
    growthProspects: "Inclusive school programs + autism centers + early intervention clinics all hiring.",
  },
];
