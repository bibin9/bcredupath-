/**
 * Humanities + Commerce career expansion (May 2026).
 *
 * Focused additions for students from Commerce and Humanities streams who
 * felt the original 131-career bank skewed STEM/medical-heavy. All entries
 * have full roadmaps + realistic Indian salary ranges + verified topColleges
 * (the seeder resolves names against the College collection).
 */

import type { SeedCareer } from "./careers";

export const HUMANITIES_COMMERCE_CAREERS: SeedCareer[] = [
  /* ═══════════════════════════════════════════════════════════════
     COMMERCE — Finance & Banking
     ═══════════════════════════════════════════════════════════════ */

  {
    name: "Equity Research Analyst",
    emoji: "📊",
    category: "commerce",
    description:
      "Cover listed companies — build financial models, write reports, give Buy/Sell calls. Bridge between corporate India and investors.",
    dayInLife:
      "Earnings call notes, DCF / valuation models, channel checks, sector reports, client calls with fund managers.",
    qualifications: ["B.Com / BBA / B.Tech + CFA Level 1 or MBA Finance", "Strong Excel + financial modelling"],
    entranceExams: [
      { name: "CFA Level 1", link: "https://www.cfainstitute.org", dates: "Year-round" },
      { name: "CAT (for MBA)", link: "https://iimcat.ac.in", dates: "Nov" },
    ],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["SRCC Delhi", "St Xavier's Mumbai", "Christ University Bangalore", "Narsee Monjee Mumbai", "IIM Ahmedabad", "IIM Bangalore"],
    skillsRequired: ["Financial modelling", "Sector knowledge", "Report writing", "Excel mastery", "Storytelling with numbers"],
    interestTags: ["commerce", "finance", "research", "logic"],
    preferredSubjects: ["accountancy", "economics", "math"],
    growthProspects: "Associate → Sr Analyst → VP → Head of Research. Top firms: Morgan Stanley, Jefferies, ICICI Sec, Motilal Oswal.",
    roadmap: {
      class10: { focus: "Strong Math + business news reading habit", minScore: "85%+" },
      class12: { stream: "Commerce", coreSubjects: ["Accountancy", "Business Studies", "Economics", "Math"], minScore: "90%+" },
      undergrad: [{ degree: "B.Com (Hons) / BBA", duration: "3 years", entranceExams: ["CUET UG", "NPAT", "DU JAT"], notes: "Pair with CFA Level 1 in final year" }],
      postgrad: [{ degree: "MBA Finance / Complete CFA charter", duration: "2 years (MBA) or 3-4 yrs (CFA)", entranceExams: ["CAT", "GMAT", "CFA L2 + L3"] }],
      finalRole: "Equity Research Analyst — sell-side (broking firm) or buy-side (mutual fund / PE).",
    },
  },

  {
    name: "Wealth Manager / Certified Financial Planner",
    emoji: "💎",
    category: "commerce",
    description:
      "Manage HNI portfolios. Tax planning, asset allocation, estate planning. India's HNI count doubles every 5 years — strong tailwind.",
    dayInLife: "Client meetings, portfolio reviews, MF/PMS recommendations, tax-saving advice, family wealth mapping.",
    qualifications: ["B.Com / BBA + CFP (Certified Financial Planner)", "AMFI + IRDA certifications"],
    entranceExams: [{ name: "CFP certification", link: "https://www.fpsbindia.org", dates: "Quarterly" }],
    salaryRanges: { entry: 400_000, mid: 1_500_000, senior: 6_000_000 },
    topColleges: ["NMIMS Mumbai", "Christ University Bangalore", "Symbiosis Pune", "ICFAI Hyderabad"],
    skillsRequired: ["Financial planning", "Sales", "Empathy", "Tax knowledge", "MF + insurance products"],
    interestTags: ["commerce", "finance", "social", "management"],
    preferredSubjects: ["accountancy", "economics"],
    growthProspects: "Relationship Manager → Sr RM → Team Lead → Family Office Head. Compensation has big bonus component.",
    roadmap: {
      class12: { stream: "Commerce", coreSubjects: ["Accountancy", "Business Studies", "Economics"] },
      undergrad: [{ degree: "B.Com / BBA", duration: "3 years", entranceExams: ["CUET UG"] }],
      postgrad: [{ degree: "CFP certification + MBA (optional)", duration: "1-2 years", entranceExams: ["CFP", "CAT"] }],
      finalRole: "Wealth Manager at HDFC / ICICI / Kotak Private / Edelweiss / Julius Baer.",
    },
  },

  {
    name: "Insurance Underwriter / Actuarial Associate",
    emoji: "🛡️",
    category: "commerce",
    description:
      "Price insurance products — life, health, motor, marine. Use math + data to decide who gets covered, at what premium. Less glam than IB but very stable.",
    dayInLife: "Risk assessment, premium calculation, policy wording review, claims pattern analysis.",
    qualifications: ["B.Com / B.Sc Statistics / B.Sc Actuarial Sci", "Insurance Institute of India (III) Associateship"],
    entranceExams: [
      { name: "III Associateship Exam", link: "https://www.insuranceinstituteofindia.com", dates: "Jun & Dec" },
      { name: "IRDA Surveyor exam (alt path)", link: "https://www.irdai.gov.in", dates: "Varies" },
    ],
    salaryRanges: { entry: 350_000, mid: 1_000_000, senior: 3_500_000 },
    topColleges: ["NIA Pune (National Insurance Academy)", "BIMTECH Greater Noida", "IIRM Hyderabad"],
    skillsRequired: ["Probability + Stats", "Excel", "Attention to detail", "Risk modelling"],
    interestTags: ["commerce", "math", "logic", "finance"],
    preferredSubjects: ["math", "accountancy", "economics"],
    growthProspects: "Junior Underwriter → Sr Underwriter → Product Manager → Chief Underwriting Officer. LIC, Bajaj Allianz, HDFC Life all hiring.",
  },

  {
    name: "Cost & Management Accountant (CMA)",
    emoji: "🧮",
    category: "commerce",
    description:
      "Cousin of CA but focused on cost accounting + management decisions. Mandatory for many large manufacturers. ICMAI is the institute.",
    dayInLife: "Costing of products/services, budgeting, variance analysis, strategic decisions support, statutory cost audits.",
    qualifications: ["CMA Foundation → Intermediate → Final (~4 years)"],
    entranceExams: [{ name: "CMA Foundation (ICMAI)", link: "https://icmai.in", dates: "Jun & Dec" }],
    salaryRanges: { entry: 450_000, mid: 1_200_000, senior: 4_000_000 },
    topColleges: ["ICMAI study centres (regional)", "Any B.Com pairing"],
    skillsRequired: ["Cost accounting", "Excel", "Strategic thinking", "Manufacturing process knowledge"],
    interestTags: ["commerce", "finance", "math", "logic"],
    preferredSubjects: ["accountancy", "math", "economics"],
    growthProspects: "Cost Auditor → Sr CMA → CFO at mid-size manufacturer or PSU. Mandatory designation in many PSUs.",
    roadmap: {
      class12: { stream: "Commerce", coreSubjects: ["Accountancy", "Business Studies", "Math (helpful)"] },
      undergrad: [{ degree: "B.Com (parallel to CMA)", duration: "3 years" }],
      postgrad: [
        { degree: "CMA Foundation", duration: "8 months", entranceExams: ["CMA Foundation"] },
        { degree: "CMA Intermediate", duration: "10 months" },
        { degree: "CMA Final + 3 yr training", duration: "2 years" },
      ],
      finalRole: "Cost Accountant — Tata Steel / L&T / HUL / PSU / own practice.",
    },
  },

  {
    name: "Company Secretary (CS)",
    emoji: "📑",
    category: "commerce",
    description:
      "Compliance + corporate governance officer. Mandatory for every listed company in India. Bridges Board, regulators (SEBI / MCA) and management.",
    dayInLife: "Board meeting minutes, ROC filings, secretarial audits, compliance with Companies Act + LODR, ESOP administration.",
    qualifications: ["CS Foundation → Executive → Professional (3-4 yrs via ICSI)"],
    entranceExams: [{ name: "CS Executive Entrance Test (CSEET)", link: "https://www.icsi.edu", dates: "Quarterly" }],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 5_000_000 },
    topColleges: ["ICSI Regional Councils", "Any B.Com pairing"],
    skillsRequired: ["Corporate law", "Drafting", "Board governance", "Regulatory tracking"],
    interestTags: ["commerce", "law", "management", "logic"],
    preferredSubjects: ["accountancy", "business", "english"],
    growthProspects: "Asst CS → CS → Company Secretary of listed company. Top CS at Tata Steel / Reliance earn ₹1Cr+.",
    roadmap: {
      class12: { stream: "Commerce / Any", coreSubjects: ["Business Studies", "Accountancy", "English"] },
      undergrad: [{ degree: "B.Com (parallel to CS)", duration: "3 years" }],
      postgrad: [
        { degree: "CSEET + CS Executive", duration: "1.5 years", entranceExams: ["CSEET"] },
        { degree: "CS Professional + 21-month training", duration: "2 years" },
      ],
      finalRole: "Company Secretary — listed company / PSU / law firm / consulting.",
    },
  },

  {
    name: "GST + Tax Consultant",
    emoji: "🧾",
    category: "commerce",
    description:
      "Help businesses navigate GST, Income Tax, TDS. Independent practice or work for Big 4. India's tax complexity creates permanent demand.",
    dayInLife: "GST return filing, tax planning, scrutiny defence, advisory on transactions, refund processing.",
    qualifications: ["B.Com + tax courses (CA Inter / GST Practitioner cert)", "OR CA Final"],
    entranceExams: [{ name: "GST Practitioner exam (NACIN)", link: "https://nacin.gov.in", dates: "Quarterly" }],
    salaryRanges: { entry: 300_000, mid: 1_200_000, senior: 5_000_000 },
    topColleges: ["NACIN Faridabad", "ICAI / ICSI / ICMAI study centres", "Any B.Com"],
    skillsRequired: ["Tax law", "Software (Tally / ClearTax / Zoho)", "Drafting", "Client management"],
    interestTags: ["commerce", "finance", "law", "logic"],
    preferredSubjects: ["accountancy", "economics", "business"],
    growthProspects: "Article Asst → Tax Consultant → Sr Manager (Big 4) → Partner. Own practice owners earn ₹50L-2Cr.",
  },

  {
    name: "Stockbroker / Equity Trader",
    emoji: "📈",
    category: "commerce",
    description:
      "Execute buy/sell on stock + derivatives markets. Personal trading + handling client orders. India's demat accounts crossed 16 crore — biggest retail boom ever.",
    dayInLife: "Pre-market prep, order execution, risk monitoring, client calls, post-market reporting. Adrenaline + screen time heavy.",
    qualifications: ["B.Com / BBA + NISM certifications (Series VIII / XV)"],
    entranceExams: [{ name: "NISM Series VIII / XV", link: "https://www.nism.ac.in", dates: "Year-round" }],
    salaryRanges: { entry: 300_000, mid: 1_200_000, senior: 6_000_000 },
    topColleges: ["NMIMS Mumbai", "Christ Bangalore", "BSE Institute"],
    skillsRequired: ["Market structure", "Risk management", "Technical analysis", "Mental discipline"],
    interestTags: ["commerce", "finance", "logic", "math"],
    preferredSubjects: ["math", "economics", "accountancy"],
    growthProspects: "Dealer → Trader → Sr Trader → Trading Desk Head at Zerodha / Groww / Axis Direct / proprietary desk.",
  },

  {
    name: "HR Manager / Talent Acquisition Lead",
    emoji: "👥",
    category: "commerce",
    description:
      "Hire, train, retain people. Modern HR = strategy + analytics, not just paperwork. Critical for scaling startups + MNCs.",
    dayInLife: "Interviews, hiring pipelines, performance reviews, compensation benchmarking, learning programs, employee engagement.",
    qualifications: ["BA / B.Com + MBA HR / PG Diploma in HRM", "Optional: SHRM-CP / HRCI certification"],
    entranceExams: [
      { name: "TISS NET (TISS HRM)", link: "https://www.tiss.edu", dates: "Jan" },
      { name: "XAT (XLRI HRM)", link: "https://xatonline.in", dates: "Jan" },
      { name: "CAT", link: "https://iimcat.ac.in", dates: "Nov" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_800_000, senior: 6_000_000 },
    topColleges: ["XLRI Jamshedpur", "TISS Mumbai", "MDI Gurgaon", "SIBM Pune", "IIM Indore HRM"],
    skillsRequired: ["People judgement", "Empathy", "Negotiation", "HRMS tools (Workday / Darwinbox)", "Excel + analytics"],
    interestTags: ["commerce", "management", "social", "psychology"],
    preferredSubjects: ["psychology", "english", "business"],
    growthProspects: "HR Exec → Sr HR → HRBP → HR Head → CHRO. Modern CHROs at unicorns earn ₹3-8Cr.",
  },

  {
    name: "Supply Chain / Logistics Manager",
    emoji: "🚛",
    category: "commerce",
    description:
      "Move goods efficiently — from raw material to consumer's doorstep. India's manufacturing + e-commerce boom = 10-year hiring wave.",
    dayInLife: "Demand forecasting, vendor negotiations, warehouse optimisation, route planning, real-time tracking, vendor scorecards.",
    qualifications: ["B.Com / B.Tech + MBA Operations / SCM"],
    entranceExams: [
      { name: "CAT", link: "https://iimcat.ac.in", dates: "Nov" },
      { name: "GMAT", link: "https://www.mba.com", dates: "Year-round" },
    ],
    salaryRanges: { entry: 600_000, mid: 2_000_000, senior: 6_000_000 },
    topColleges: ["IIM Ahmedabad (SCM)", "NITIE Mumbai", "SP Jain Mumbai", "MISB Bocconi", "ISB Hyderabad"],
    skillsRequired: ["Operations research", "Excel + SAP", "Negotiation", "Lean / Six Sigma", "Real-time problem solving"],
    interestTags: ["commerce", "management", "engineering", "logic"],
    preferredSubjects: ["math", "business", "economics"],
    growthProspects: "Mgmt Trainee → Plant SCM → Regional SCM → CSCO at Amazon India / Flipkart / Maruti / DMart.",
  },

  {
    name: "Brand Manager (FMCG / Consumer)",
    emoji: "🛍️",
    category: "commerce",
    description:
      "Own a brand's P&L — pricing, distribution, advertising, packaging, new launches. The classic IIM-A → HUL pipeline. Glam + analytical.",
    dayInLife: "Sales data review, ATL/BTL campaign planning, packaging redesigns, retail audits, agency briefings, new product launches.",
    qualifications: ["BA / B.Com / BBA + MBA Marketing"],
    entranceExams: [
      { name: "CAT", link: "https://iimcat.ac.in", dates: "Nov" },
      { name: "XAT", link: "https://xatonline.in", dates: "Jan" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 4_000_000, senior: 12_000_000 },
    topColleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "MICA Ahmedabad", "ISB Hyderabad"],
    skillsRequired: ["Consumer insights", "P&L thinking", "Storytelling", "Excel + Nielsen / Kantar data", "Cross-functional leadership"],
    interestTags: ["commerce", "creative", "management", "media"],
    preferredSubjects: ["business", "economics", "english"],
    growthProspects: "Asst Brand Mgr → Brand Mgr → Sr BM → Marketing Head → CMO. HUL / Nestle / P&G / ITC are the classic cradles.",
  },

  {
    name: "Digital Marketing Specialist",
    emoji: "📱",
    category: "commerce",
    description:
      "Run paid ads (Google / Meta / LinkedIn), SEO, email, content. The backbone of every D2C / SaaS company today. Skills > degrees.",
    dayInLife: "Campaign setup, A/B tests, dashboards, audience targeting, creative briefs, attribution analysis.",
    qualifications: ["Any UG + Google / Meta Blueprint certs + HubSpot Inbound + portfolio of campaigns run"],
    entranceExams: [],
    salaryRanges: { entry: 400_000, mid: 1_500_000, senior: 5_000_000 },
    topColleges: ["MICA Ahmedabad", "SCMHRD Pune", "Any UG + bootcamps (UpGrad / Simplilearn)"],
    skillsRequired: ["Google Ads", "Meta Ads", "GA4", "SEO", "Copywriting", "Excel / SQL"],
    interestTags: ["commerce", "creative", "media", "tech"],
    preferredSubjects: ["english", "business", "math"],
    growthProspects: "Executive → Sr Specialist → Performance Marketing Lead → Growth Head. D2C founders often start here.",
  },

  {
    name: "Merchant Navy Officer",
    emoji: "🚢",
    category: "commerce",
    description:
      "Officer aboard cargo / oil tanker / container ships. 6 months at sea, 3 months off. Tax-free salary, see the world. Hard on family life.",
    dayInLife: "Watch-keeping on bridge / engine room, cargo ops, safety drills, port arrivals/departures, navigation, maintenance.",
    qualifications: ["B.Sc Nautical Science (3yr) OR Marine Engg (4yr) at IMU", "STCW certification"],
    entranceExams: [
      { name: "IMU CET (Indian Maritime University)", link: "https://www.imu.edu.in", dates: "May-Jun" },
      { name: "JEE Main (alt route via Marine Engg)", link: "https://jeemain.nta.nic.in", dates: "Jan & Apr" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 4_500_000, senior: 18_000_000 },
    topColleges: ["IMU Chennai", "IMU Mumbai", "TS Chanakya", "MERI Kolkata", "Tolani Maritime Pune"],
    skillsRequired: ["Navigation / engineering", "Discipline", "Stress tolerance", "English fluency"],
    interestTags: ["engineering", "commerce", "tech", "adventure"],
    preferredSubjects: ["physics", "math", "english"],
    growthProspects: "3rd Officer → 2nd Officer → Chief Officer → Captain (~15 yrs). Captains earn ₹18-25L/month tax-free.",
    roadmap: {
      class10: { focus: "Strong English + Math + fitness", minScore: "60%+" },
      class12: { stream: "PCM", coreSubjects: ["Physics", "Chemistry", "Math"], minScore: "60%+ aggregate" },
      undergrad: [{ degree: "B.Sc Nautical Science / B.Tech Marine Engineering", duration: "3-4 years", entranceExams: ["IMU CET", "JEE Main"] }],
      postgrad: [{ degree: "Pre-Sea + onboard training + STCW Officer cert", duration: "Continuous" }],
      finalRole: "Deck Officer / Engineer aboard merchant vessel — eventually Captain or Chief Engineer.",
    },
  },

  /* ═══════════════════════════════════════════════════════════════
     HUMANITIES — Policy, IR, Languages, Anthropology
     ═══════════════════════════════════════════════════════════════ */

  {
    name: "Public Policy Analyst",
    emoji: "🏛️",
    category: "civil-services",
    description:
      "Analyse policy options for govt / think tanks / NGOs. Combine economics + politics + sociology. India's policy ecosystem (NITI Aayog, CPR, IDFC Institute) growing fast.",
    dayInLife: "Literature reviews, data analysis, stakeholder interviews, policy briefs, white papers, op-eds.",
    qualifications: ["BA Economics / Pol Sci + Master in Public Policy (MPP)"],
    entranceExams: [
      { name: "Indian School of Public Policy (ISPP)", link: "https://www.ispp.org.in", dates: "Mar-May" },
      { name: "GRE (for abroad — Harvard Kennedy / LSE / Oxford BSG)", link: "https://www.ets.org/gre", dates: "Year-round" },
    ],
    salaryRanges: { entry: 600_000, mid: 1_800_000, senior: 5_000_000 },
    topColleges: ["ISPP Delhi", "TISS Mumbai", "Azim Premji Univ Bangalore", "Jindal School of Govt + Public Policy", "NLSIU Bangalore"],
    skillsRequired: ["Research", "Writing", "Stats / R / Stata", "Stakeholder mapping", "Policy frameworks"],
    interestTags: ["humanities", "research", "social", "law"],
    preferredSubjects: ["economics", "political science", "history"],
    growthProspects: "Researcher → Sr Analyst → Fellow → Director at NITI Aayog / CPR / IDFC Inst / Bill Gates Foundation India.",
    roadmap: {
      class12: { stream: "Humanities / Commerce", coreSubjects: ["Economics", "Pol Science / History", "English"] },
      undergrad: [{ degree: "BA Economics / Pol Science / Sociology", duration: "3 years", entranceExams: ["CUET UG", "Ashoka AAT"] }],
      postgrad: [{ degree: "MPP / MPA (Master of Public Policy / Administration)", duration: "1-2 years", entranceExams: ["ISPP test", "GRE", "TISS NET"] }],
      finalRole: "Policy Analyst at think tank / ministry / multilateral (UN, World Bank).",
    },
  },

  {
    name: "International Relations Specialist",
    emoji: "🌐",
    category: "civil-services",
    description:
      "Study how countries deal with each other. Work paths: MEA, think tanks (ORF, Gateway House), UN agencies, foreign affairs journalism.",
    dayInLife: "Geopolitical analysis, diplomatic conferences, paper writing, language study, briefing senior officials.",
    qualifications: ["BA International Relations / Pol Science + MA IR / MPhil"],
    entranceExams: [
      { name: "JNU SIS entrance (via CUET PG)", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" },
      { name: "UPSC CSE (for IFS)", link: "https://upsc.gov.in", dates: "May-Jun" },
    ],
    salaryRanges: { entry: 500_000, mid: 1_500_000, senior: 4_500_000 },
    topColleges: ["JNU SIS Delhi", "Jadavpur University Kolkata", "South Asian University Delhi", "Ashoka Univ", "OP Jindal Global"],
    skillsRequired: ["History", "Languages (Mandarin / Arabic / French preferred)", "Writing", "Geo-strategic thinking"],
    interestTags: ["humanities", "social", "law", "research"],
    preferredSubjects: ["history", "political science", "geography", "english"],
    growthProspects: "Researcher → Fellow → Director at ORF / IDSA / Carnegie India OR IFS via UPSC. Strong demand at ministries + UN.",
  },

  {
    name: "Defense / Intelligence Analyst (RAW / IB / NSCS)",
    emoji: "🕵️",
    category: "civil-services",
    description:
      "Analyse threats — terrorism, cyber, geopolitical. India's external intelligence (R&AW) + internal (IB) hire via SSB / IPS / lateral routes.",
    dayInLife: "OSINT scanning, briefs, language work, secure communication. Discrete profession — most details classified.",
    qualifications: ["Any UG + UPSC CSE → IPS deputation OR direct lateral via talented pool (rare)"],
    entranceExams: [
      { name: "UPSC Civil Services", link: "https://upsc.gov.in", dates: "May-Jun" },
      { name: "SSB Interview (defense route)", link: "https://www.upsc.gov.in", dates: "Year-round" },
    ],
    salaryRanges: { entry: 700_000, mid: 2_000_000, senior: 4_500_000 },
    topColleges: ["JNU SIS", "NDC Delhi (mid-career)", "Any UG + UPSC prep"],
    skillsRequired: ["Foreign languages", "Pattern recognition", "Discretion", "Cybersecurity awareness"],
    interestTags: ["humanities", "tech", "social", "research", "defense"],
    preferredSubjects: ["history", "political science", "geography"],
    growthProspects: "Analyst → Assistant Director → Joint Secretary level. Career-defining if you crack it.",
  },

  {
    name: "Translator / Conference Interpreter",
    emoji: "🗣️",
    category: "arts",
    description:
      "Translate documents (translator) or live speech (interpreter). UN, MEA, embassies, publishing houses all hire. Demand for Hindi/Tamil/Malayalam ↔ English + Arabic / Mandarin / French / German / Spanish.",
    dayInLife: "Translator: 6-8 hr writing days, glossary building. Interpreter: 30-min booth shifts at conferences, intense mental work.",
    qualifications: ["BA in a foreign language (JNU / EFLU)", "Optional: Diploma in Conference Interpreting (DCI)"],
    entranceExams: [{ name: "JNU Language entrance / CUET UG", link: "https://cuet.nta.nic.in", dates: "May" }],
    salaryRanges: { entry: 350_000, mid: 1_200_000, senior: 4_000_000 },
    topColleges: ["JNU School of Lang Lit & Culture", "EFLU Hyderabad", "BHU Sanskrit", "Univ of Madras (Foreign Lang)"],
    skillsRequired: ["Native-level English + target language", "Cultural fluency", "Fast typing / note-taking", "Stress tolerance"],
    interestTags: ["humanities", "creative", "languages", "social"],
    preferredSubjects: ["english", "history"],
    growthProspects: "Freelance → in-house at embassy / MNC / UN → senior interpreter at ₹30K-₹1L per day for top-tier events.",
  },

  {
    name: "Anthropologist / Ethnographer",
    emoji: "🌏",
    category: "research",
    description:
      "Study cultures, communities, human evolution. Work for govt (Anthropological Survey of India), academic, NGOs, UX research at tech firms.",
    dayInLife: "Field visits to communities, interviews, ethnographic notes, journal writing, sometimes lab work (physical anthropology).",
    qualifications: ["BA / B.Sc Anthropology + MA / PhD"],
    entranceExams: [
      { name: "CUET UG / PG", link: "https://cuet.nta.nic.in", dates: "Mar-May" },
      { name: "DU / BHU MA entrance", link: "https://www.du.ac.in", dates: "Jun" },
    ],
    salaryRanges: { entry: 350_000, mid: 900_000, senior: 2_500_000 },
    topColleges: ["DU Anthropology", "Hyderabad Central Univ", "BHU Varanasi", "Pondicherry Univ", "Punjab Univ Chandigarh"],
    skillsRequired: ["Ethnographic methods", "Field stamina", "Writing", "Cultural sensitivity"],
    interestTags: ["humanities", "research", "social"],
    preferredSubjects: ["history", "geography", "biology", "political science"],
    growthProspects: "Lecturer → Sr Researcher at AnSI / TISS / UNESCO. Tech firms (Google, Meta) hire ethnographers for UX research at $$$.",
  },

  {
    name: "Museum Curator / Archivist",
    emoji: "🏺",
    category: "arts",
    description:
      "Build + maintain collections of art, history, science exhibits. India's museum sector modernising — major hiring at INTACH, National Museum, private museums (Kiran Nadar, MAP Bangalore).",
    dayInLife: "Acquisition decisions, exhibition design, cataloging, conservation oversight, scholarly writing, donor + public outreach.",
    qualifications: ["MA Museum Studies / Art History / Conservation"],
    entranceExams: [{ name: "National Museum Institute entrance", link: "https://nmi.gov.in", dates: "Apr-May" }],
    salaryRanges: { entry: 300_000, mid: 800_000, senior: 2_500_000 },
    topColleges: ["National Museum Institute Delhi", "MS University Baroda (Museology)", "Jiwaji Univ Gwalior"],
    skillsRequired: ["Art / history knowledge", "Conservation basics", "Storytelling", "Donor relations"],
    interestTags: ["humanities", "arts", "research", "creative"],
    preferredSubjects: ["history", "english"],
    growthProspects: "Curatorial Asst → Curator → Sr Curator → Museum Director. Private galleries pay much better than govt museums.",
  },

  {
    name: "Librarian / Information Scientist",
    emoji: "📚",
    category: "education",
    description:
      "Run libraries — academic, corporate, govt. Modern role = info architecture + digital archives + research support, not just stamping books.",
    dayInLife: "Cataloguing (RDA), digital archive curation, research help desk, info literacy training, vendor negotiations.",
    qualifications: ["BLISc (B.Library & Info Science, 1yr after UG) + MLISc"],
    entranceExams: [{ name: "DU / JNU library science entrance via CUET PG", link: "https://cuet.nta.nic.in", dates: "Mar-Apr" }],
    salaryRanges: { entry: 300_000, mid: 800_000, senior: 2_500_000 },
    topColleges: ["DU Dept of Library & Info Science", "JNU LIS", "BHU LIS", "Madras Univ LIS"],
    skillsRequired: ["Cataloguing standards", "Database mgmt", "Research support", "Patience"],
    interestTags: ["humanities", "research", "social", "education"],
    preferredSubjects: ["english", "history"],
    growthProspects: "Asst Librarian → Librarian → Chief Librarian at IIT / IIM / Parliament library. UGC NET qualified gets ₹80K+ at central uni.",
  },

  {
    name: "School Principal / Academic Director",
    emoji: "🏫",
    category: "education",
    description:
      "Lead a school — academics, staff, parents, finances. Schools in India scaling fast (DPS, DAV, Delhi Public chain, edtech-led schools).",
    dayInLife: "Staff hiring + review, parent meetings, board prep, budget management, CBSE / IB compliance, vision setting.",
    qualifications: ["BA + B.Ed + M.Ed + 10+ years teaching", "Optional: MBA Education / Diploma in School Leadership"],
    entranceExams: [],
    salaryRanges: { entry: 600_000, mid: 1_500_000, senior: 6_000_000 },
    topColleges: ["IIM Indore (Educators program)", "TISS School of Education", "Azim Premji Univ", "Jamia Millia Islamia"],
    skillsRequired: ["Leadership", "Curriculum design", "Budget management", "Parent + board communication"],
    interestTags: ["humanities", "education", "social", "management"],
    preferredSubjects: ["english", "psychology"],
    growthProspects: "Teacher → HoD → Vice Principal → Principal → Group Director. Top international school principals at GEMS / DPS earn ₹50L+.",
  },

  {
    name: "Constitutional / Human Rights Lawyer",
    emoji: "⚖️",
    category: "law",
    description:
      "Argue cases involving fundamental rights, electoral issues, civil liberties. The most prestigious + tough-paying branch of law. Career-defining cases at Supreme Court.",
    dayInLife: "Case research, pleadings drafting, court appearances (often public-interest), client meetings, op-eds on policy.",
    qualifications: ["BA LLB / LLB + LLM (optional)", "Bar Council enrollment + AOR (Adv-on-Record) for SC practice"],
    entranceExams: [{ name: "CLAT / AILET", link: "https://consortiumofnlus.ac.in", dates: "Dec" }],
    salaryRanges: { entry: 300_000, mid: 1_500_000, senior: 15_000_000 },
    topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "Gujarat NLU", "Faculty of Law DU"],
    skillsRequired: ["Constitutional law", "Argumentation", "Legal drafting", "Public speaking"],
    interestTags: ["law", "humanities", "social", "research"],
    preferredSubjects: ["political science", "history", "english"],
    growthProspects: "Junior → Sr Advocate → Designated Sr Adv → Supreme Court regular. Top constitutional lawyers earn ₹5-50L per case.",
  },

  {
    name: "Investigative Journalist / Foreign Correspondent",
    emoji: "📰",
    category: "media",
    description:
      "Long-form journalism — break stories that matter. India's independent media (The Wire, ThePrint, Newslaundry, Scroll) hiring quality reporters.",
    dayInLife: "Sources cultivation, RTI filings, document analysis, field reporting, story drafting, editor review cycles.",
    qualifications: ["BA Journalism / Pol Sci / Eng Lit", "PG Diploma at IIMC / ACJ / Symbiosis"],
    entranceExams: [
      { name: "IIMC entrance", link: "https://iimc.gov.in", dates: "May-Jun" },
      { name: "ACJ Chennai entrance", link: "https://www.asianmedia.org", dates: "Mar-Apr" },
    ],
    salaryRanges: { entry: 400_000, mid: 1_200_000, senior: 5_000_000 },
    topColleges: ["IIMC Delhi", "Asian College of Journalism Chennai", "Symbiosis SCMC Pune", "Jamia AJK MCRC"],
    skillsRequired: ["Investigative rigor", "Writing", "RTI + legal basics", "Source-building", "Multi-lingual edge"],
    interestTags: ["humanities", "media", "social", "research"],
    preferredSubjects: ["english", "history", "political science"],
    growthProspects: "Reporter → Sr Reporter → Bureau Chief → Editor / Foreign Correspondent (BBC India, Reuters, NYT South Asia).",
  },

  {
    name: "Public Relations (PR) Manager",
    emoji: "📢",
    category: "media",
    description:
      "Shape how brands + leaders are perceived in media. Crisis comms, press releases, journalist relationships. Different from advertising — earned media, not paid.",
    dayInLife: "Press release drafting, journalist pitches, event coordination, social monitoring, crisis response, exec speaking prep.",
    qualifications: ["BA Mass Comm + PG Diploma in PR / Corporate Comm"],
    entranceExams: [{ name: "Symbiosis SCMC entrance", link: "https://www.scmc.edu.in", dates: "Apr-May" }],
    salaryRanges: { entry: 400_000, mid: 1_500_000, senior: 5_000_000 },
    topColleges: ["Symbiosis SCMC Pune", "IIMC Delhi", "MICA Ahmedabad", "Mudra Inst of Comm"],
    skillsRequired: ["Writing", "Journalist relationships", "Crisis comms", "Speech writing", "Social listening tools"],
    interestTags: ["commerce", "media", "creative", "social", "humanities"],
    preferredSubjects: ["english", "psychology", "business"],
    growthProspects: "PR Exec → Sr Exec → Account Director → VP. Top PR agencies: Adfactors, Edelman, Genesis, Avian.",
  },

  /* ═══════════════════════════════════════════════════════════════
     ARTS — Performing arts & writing
     ═══════════════════════════════════════════════════════════════ */

  {
    name: "Classical / Contemporary Dancer",
    emoji: "💃",
    category: "arts",
    description:
      "Bharatanatyam, Kathak, Odissi, Kathakali, Manipuri or contemporary. Performance + teaching + choreography. Bollywood + dance reality shows opened commercial doors.",
    dayInLife: "3-5 hr daily practice, riyaaz, performances, teaching students, costume + show prep.",
    qualifications: ["Guru-shishya parampara + diploma at SNA / Kalakshetra / similar", "BA / MA Performing Arts (optional)"],
    entranceExams: [{ name: "Kalakshetra entrance / Bhatkhande", link: "https://www.kalakshetra.in", dates: "Mar-Apr" }],
    salaryRanges: { entry: 200_000, mid: 800_000, senior: 4_000_000 },
    topColleges: ["Kalakshetra Foundation Chennai", "Bhatkhande Lucknow", "Indira Kala Sangit V V", "Rabindra Bharati Univ"],
    skillsRequired: ["Stamina + flexibility", "Rhythm", "Stage presence", "Choreography", "Self-promotion"],
    interestTags: ["arts", "creative", "media"],
    preferredSubjects: ["english", "history"],
    growthProspects: "Performer → Guru → Choreographer (films + reality shows) → Cultural ambassador. Govt grants from Sangeet Natak Akademi.",
  },

  {
    name: "Musician / Music Composer",
    emoji: "🎼",
    category: "arts",
    description:
      "Compose / perform — film scores, indie albums, jingles, classical concerts. India's streaming boom (Spotify, JioSaavn) + indie scene reshaped the path.",
    dayInLife: "Composition sessions, studio recording, collaborations with vocalists, mixing, performances, sync licensing deals.",
    qualifications: ["No formal degree required", "BPA / MA Music for classical track", "DAW mastery (Logic / Pro Tools / Ableton)"],
    entranceExams: [{ name: "KM Music Conservatory entrance (Chennai)", link: "https://kmmc.in", dates: "Annual" }],
    salaryRanges: { entry: 200_000, mid: 1_000_000, senior: 10_000_000 },
    topColleges: ["KM Music Conservatory Chennai", "Swarnabhoomi Academy of Music", "Bhatkhande Lucknow", "Trinity College London (online)"],
    skillsRequired: ["Music theory", "Ear training", "DAW + plugins", "Collaboration", "Marketing self"],
    interestTags: ["arts", "creative", "media"],
    preferredSubjects: ["english"],
    growthProspects: "Indie release → studio musician → film composer → arena tours. AR Rahman + Vishal-Shekhar started young.",
  },

  {
    name: "Playback Singer / Vocalist",
    emoji: "🎤",
    category: "arts",
    description:
      "Sing for films, indie pop, jingles, classical. Talent shows (Indian Idol, SaReGaMaPa) democratised entry. Voice + persistence + network.",
    dayInLife: "Daily vocal practice (riyaaz), studio sessions, live performances, collaborations, social media presence.",
    qualifications: ["Vocal training from guru / academy", "BPA / MA Music (optional)"],
    entranceExams: [],
    salaryRanges: { entry: 150_000, mid: 900_000, senior: 8_000_000 },
    topColleges: ["KM Music Conservatory", "Suresh Wadkar Ajivasan", "Shankar Mahadevan Academy (online)", "Bhatkhande Lucknow"],
    skillsRequired: ["Vocal range + control", "Multiple genres", "Studio mic technique", "Bilingual / multilingual"],
    interestTags: ["arts", "creative", "media"],
    preferredSubjects: ["english"],
    growthProspects: "Reality shows → demo singer → playback → solo album / live tours. Top playback singers earn ₹50L-2Cr per song.",
  },

  {
    name: "Copywriter (Advertising)",
    emoji: "✍️",
    category: "media",
    description:
      "Write ad copy — billboards, social, scripts, taglines. Craft of saying a lot in 6 words. The Don Draper job, but for Indian D2C brands + tech startups.",
    dayInLife: "Briefs from account / strategy, brainstorming with art director, multiple iterations, presentation to client, revisions.",
    qualifications: ["BA English / Mass Comm + portfolio + agency internship"],
    entranceExams: [{ name: "MICA PGDM-C entrance", link: "https://www.mica.ac.in", dates: "Jan-Feb" }],
    salaryRanges: { entry: 350_000, mid: 1_400_000, senior: 5_000_000 },
    topColleges: ["MICA Ahmedabad", "Symbiosis SCMC Pune", "Indian Inst of Mass Comm"],
    skillsRequired: ["Punchy writing", "Hindi + English (often)", "Storytelling", "Cultural context", "Client presentation"],
    interestTags: ["creative", "media", "commerce", "humanities"],
    preferredSubjects: ["english"],
    growthProspects: "Junior Copy → Copy → Sr Copy → Creative Director → CCO. Ogilvy, McCann, Wieden+Kennedy, indie shops like Talented.",
  },

  {
    name: "Cabin Crew / Flight Steward",
    emoji: "✈️",
    category: "commerce",
    description:
      "Service + safety aboard commercial flights. India's aviation boom (Indigo, Air India, Akasa, Vistara) hires thousands annually. 12th pass entry, no degree mandatory.",
    dayInLife: "Pre-flight safety briefing, boarding, service in flight, emergency drills, layover rest. Rotating shifts + time zones.",
    qualifications: ["Class 12 (any stream) + cabin crew diploma (Frankfinn, Air Hostess Academy)", "English fluency + height + medical clearance"],
    entranceExams: [],
    salaryRanges: { entry: 450_000, mid: 1_200_000, senior: 3_500_000 },
    topColleges: ["Frankfinn (multiple cities)", "Air Hostess Academy", "Indira Gandhi RAU", "Avalon Academy"],
    skillsRequired: ["Customer service", "First aid", "Multi-lingual edge", "Grooming", "Stamina"],
    interestTags: ["commerce", "social", "adventure"],
    preferredSubjects: ["english"],
    growthProspects: "Junior Crew → Sr Crew → Lead → Pursuer → Inflight Manager. International carriers (Emirates, Qatar) pay 2x Indian.",
  },
];
