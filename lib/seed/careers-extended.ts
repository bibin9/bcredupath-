/**
 * Career database expansion — Round 2 (2026 catalogue).
 *
 * Adds ~30 careers across categories that were thin in v1:
 *   - Law (was 1) → judiciary, IP, cyber, tax, corporate counsel
 *   - Arts (was 1) → theatre actor, voice artist, illustrator, stand-up
 *   - Defense (was 2) → IAF officer, navy officer, ATC, coast guard
 *   - Engineering (was 8) → petroleum, marine, nuclear, chemical, textile,
 *     metallurgical, agricultural, biotechnology engineering
 *   - Civil services (was 4) → RBI Grade B, SEBI, Forest Officer, ED, Customs
 *   - Emerging tech → IoT, AR/VR, Embedded Systems
 *   - Finance niche → Actuary, Quant Analyst, Investment Banking Analyst
 *   - Aviation → ATC, Aircraft Maintenance Engineer
 *   - Hospitality → Event Manager, Cruise Liner Officer
 *
 * Same SeedCareer shape — gets merged into CAREERS via concat at seed time.
 */

import type { SeedCareer } from "./careers";

export const CAREERS_EXTENDED: SeedCareer[] = [
  /* ═══════════════════════ LAW SPECIALISATIONS ═══════════════════════ */
  {
    name: "Judge / Judicial Officer",
    emoji: "⚖️",
    category: "law",
    description:
      "Decide cases in India's lower judiciary (and rise to High Court / Supreme Court). The most prestigious legal track — Civil Judge clearing State PCS-J at 22 is a fast lane to the bench.",
    dayInLife:
      "Hear cases, examine evidence, write judgments, set precedents. Court hours 10-5, but reading case files and writing judgments often spills into evenings.",
    qualifications: ["LLB (3 or 5 yr)", "PCS-J / State Judicial Services exam"],
    entranceExams: [
      { name: "CLAT", link: "https://consortiumofnlus.ac.in", dates: "Dec" },
      { name: "State PCS-J", link: "https://upsc.gov.in", dates: "State-wise" },
    ],
    salaryRanges: { entry: 800_000, mid: 1_800_000, senior: 3_500_000 },
    topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "Faculty of Law Delhi University"],
    skillsRequired: ["Legal reasoning", "Writing", "Patience", "Integrity"],
    interestTags: ["law", "humanities", "social", "research"],
    preferredSubjects: ["political science", "history", "english"],
    growthProspects: "Civil Judge → ADJ → District Judge → High Court → Supreme Court. Direct lateral entry to HC possible after 10 yrs Bar practice.",
  },
  {
    name: "Intellectual Property Lawyer",
    emoji: "📜",
    category: "law",
    description:
      "Patent + trademark + copyright protection for inventors, brands, content creators. India's startup boom (Flipkart, Zomato, BYJU'S) made IP law one of the hottest legal specialisations.",
    dayInLife:
      "Drafting patent claims, trademark searches, infringement suits, client strategy sessions. Mix of technical reading + legal drafting.",
    qualifications: ["LLB + LLM (IPR)", "Patent agent registration (for tech IP)"],
    entranceExams: [
      { name: "CLAT", link: "https://consortiumofnlus.ac.in", dates: "Dec" },
      { name: "Indian Patent Agent Exam", link: "https://ipindia.gov.in", dates: "Annual" },
    ],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "IIT Kharagpur (RGSOIPL)", "Symbiosis Law Pune"],
    skillsRequired: ["Patent drafting", "Technical literacy", "Legal writing", "Negotiation"],
    interestTags: ["law", "tech", "research", "humanities"],
    preferredSubjects: ["english", "political science"],
    growthProspects: "Top IP firms (K&S, Anand & Anand, Lakshmikumaran) + in-house at MNCs (Microsoft, Samsung, Pharma). Patent-litigation specialists earn ₹50L+ at 8 yr mark.",
  },
  {
    name: "Cyber Lawyer",
    emoji: "💻",
    category: "law",
    description:
      "Data privacy + cybercrime + digital evidence + IT Act + DPDP Act compliance. Rapidly growing as India digitises and cyber-fraud explodes.",
    dayInLife:
      "Advising clients on data breach response, drafting privacy policies, court appearances in cyber-tribunal, compliance audits for tech companies.",
    qualifications: ["LLB + LLM in Cyber Law / Digital Forensics", "DPDP Act certification helpful"],
    entranceExams: [{ name: "CLAT / AILET / LSAT India", link: "https://consortiumofnlus.ac.in", dates: "Dec/Apr" }],
    salaryRanges: { entry: 700_000, mid: 2_000_000, senior: 6_500_000 },
    topColleges: ["NLU Delhi", "NLSIU Bangalore", "Symbiosis Law Pune", "Amity Law Noida"],
    skillsRequired: ["IT Act knowledge", "Forensics basics", "Privacy frameworks", "Investigation"],
    interestTags: ["law", "tech", "cs"],
    preferredSubjects: ["english", "computer science"],
    growthProspects: "India's DPDP Act (2023) created a wave of data-protection officer roles. NCIIPC, CERT-In, Big 4 consulting all hiring.",
  },
  {
    name: "Tax Lawyer / Chartered Tax Practitioner",
    emoji: "🧾",
    category: "law",
    description:
      "Direct + Indirect tax advisory, GST appeals, ITAT representation, transfer pricing. Critical role given India's complex tax regime.",
    dayInLife:
      "Tax notices response, GST tribunal hearings, structuring deals to minimise tax outflow, client advisory.",
    qualifications: ["LLB or CA", "LLM in Taxation OR CA + Diploma Tax Law"],
    entranceExams: [{ name: "CLAT or CA Foundation", link: "https://consortiumofnlus.ac.in", dates: "Dec/Jun" }],
    salaryRanges: { entry: 700_000, mid: 2_500_000, senior: 10_000_000 },
    topColleges: ["NALSAR Hyderabad", "Faculty of Law DU", "ICAI", "Symbiosis Law"],
    skillsRequired: ["Tax law", "Numeracy", "Litigation strategy", "Drafting"],
    interestTags: ["law", "commerce", "finance", "math"],
    preferredSubjects: ["accountancy", "economics", "english"],
    growthProspects: "Big 4 tax practices (Deloitte, PwC, KPMG, EY) + boutique tax firms + corporate in-house. Partner-track at 12-15 yr.",
  },

  /* ═══════════════════════ FINANCE NICHE ═══════════════════════ */
  {
    name: "Actuary",
    emoji: "📊",
    category: "commerce",
    description:
      "The math-heavy financial role — quantify risk for insurance / pensions / banking. Among the highest-paid careers in India for someone with Class 12 PCM background. Brutal exams (16 papers, 6-10 yrs).",
    dayInLife:
      "Model claim reserves, pension liabilities, asset-liability matching, stochastic simulations. Heavy Excel + R + Python + SAS.",
    qualifications: ["B.Sc / B.Tech (Stats / Math / Actuarial Sci)", "IAI Fellowship (16 papers)"],
    entranceExams: [{ name: "Institute of Actuaries of India (ACET)", link: "https://www.actuariesindia.org", dates: "Twice yearly" }],
    salaryRanges: { entry: 600_000, mid: 2_500_000, senior: 12_000_000 },
    topColleges: ["IIT Bombay (Industrial Eng)", "ISI Kolkata", "DSE Delhi", "Amity Actuarial Science"],
    skillsRequired: ["Probability theory", "Excel modelling", "R / Python", "Patience for exams"],
    interestTags: ["finance", "math", "research", "logic", "commerce"],
    preferredSubjects: ["math", "economics", "computer science"],
    growthProspects: "<1000 qualified actuaries in India for huge insurance/pension market. Fellow-status (FIAI) → ₹40L+ guaranteed.",
  },
  {
    name: "Quantitative Analyst",
    emoji: "📈",
    category: "commerce",
    description:
      "Build mathematical models for derivatives pricing, algorithmic trading, risk management at investment banks + hedge funds. Demands top-tier math.",
    dayInLife:
      "Stochastic calculus, ML for alpha generation, backtesting strategies, Python/C++ coding. Often 10-12 hour days at major firms.",
    qualifications: ["B.Tech CSE / Math + MS Quant Finance", "PhD an advantage for senior quant"],
    entranceExams: [{ name: "GRE + JEE Advanced", link: "https://www.ets.org/gre", dates: "Year-round" }],
    salaryRanges: { entry: 1_800_000, mid: 5_000_000, senior: 30_000_000 },
    topColleges: ["IIT Bombay / Delhi / Madras", "CMI Chennai", "ISI Kolkata", "IIM Calcutta MQF"],
    skillsRequired: ["Stochastic calculus", "ML", "Python / C++", "Statistics"],
    interestTags: ["finance", "math", "tech", "logic", "research"],
    preferredSubjects: ["math", "computer science", "economics"],
    growthProspects: "Goldman, JP Morgan, DE Shaw, Two Sigma, Tower Research all have huge India quant teams in Hyderabad / Bangalore / Gurgaon.",
  },
  {
    name: "Investment Banking Analyst",
    emoji: "💼",
    category: "commerce",
    description:
      "M&A, IPO, equity capital markets — execute the deals you read about. Brutal 80-100 hr weeks for 2-3 yrs as analyst, then explosive trajectory.",
    dayInLife:
      "Pitch decks, financial models, due diligence, late nights. Champagne + sleep deprivation.",
    qualifications: ["B.Com (top college) / B.Tech / BBA", "CFA Level 1+ helpful"],
    entranceExams: [{ name: "CAT + on-campus recruiting", link: "https://iimcat.ac.in", dates: "Nov" }],
    salaryRanges: { entry: 1_500_000, mid: 5_000_000, senior: 25_000_000 },
    topColleges: ["IIM Ahmedabad / Bangalore / Calcutta", "ISB Hyderabad", "SRCC Delhi", "St Stephen's"],
    skillsRequired: ["Financial modelling", "Excel + PowerPoint mastery", "Stamina", "Network"],
    interestTags: ["finance", "commerce", "math"],
    preferredSubjects: ["accountancy", "economics", "math"],
    growthProspects: "Analyst → Associate (post-MBA) → VP → Director → MD. MD compensation routinely $1M+ at top firms.",
  },
  {
    name: "Risk Management Analyst",
    emoji: "⚠️",
    category: "commerce",
    description:
      "Credit / market / operational risk modelling at banks and NBFCs. Less glamorous than IB but better hours + still pays well.",
    dayInLife: "VaR calculations, stress tests, model validation, regulatory reporting (Basel III, RBI norms).",
    qualifications: ["B.Tech / B.Sc Math + FRM certification", "MBA Finance route also works"],
    entranceExams: [{ name: "FRM Part 1 + 2", link: "https://www.garp.org/frm", dates: "May / Nov" }],
    salaryRanges: { entry: 800_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["IIM Calcutta MQF", "ISI Kolkata", "JBIMS Mumbai", "MICA Ahmedabad"],
    skillsRequired: ["Statistics", "Excel modelling", "Regulatory knowledge", "Python"],
    interestTags: ["finance", "math", "commerce", "logic"],
    preferredSubjects: ["math", "economics", "accountancy"],
    growthProspects: "Every bank has a risk team. RBI / SEBI also recruit risk analysts at Officer level.",
  },

  /* ═══════════════════════ ENGINEERING SPECIALISATIONS ═══════════════════════ */
  {
    name: "Petroleum Engineer",
    emoji: "🛢️",
    category: "engineering",
    description:
      "Design oil + gas extraction operations onshore + offshore. Demanding fieldwork (rigs in Rajasthan, Bombay High) + lucrative compensation.",
    dayInLife:
      "Reservoir simulation, well planning, drilling supervision (rig postings rotate 14 on / 14 off). Heavy use of Eclipse / Petrel software.",
    qualifications: ["B.Tech Petroleum Engineering"],
    entranceExams: [
      { name: "JEE Main + Advanced", link: "https://jeemain.nta.nic.in", dates: "Jan + May" },
    ],
    salaryRanges: { entry: 1_200_000, mid: 3_500_000, senior: 12_000_000 },
    topColleges: ["IIT (ISM) Dhanbad", "PDPU Gandhinagar", "UPES Dehradun", "IIT Madras"],
    skillsRequired: ["Reservoir engineering", "Drilling tech", "Field stamina", "HSE"],
    interestTags: ["engineering", "tech", "research"],
    preferredSubjects: ["physics", "chemistry", "math"],
    growthProspects: "ONGC + Reliance KG-D6 + Cairn Vedanta + Indian Oil R&D + global PSU contracts (Aramco, Shell, ADNOC).",
  },
  {
    name: "Marine Engineer",
    emoji: "🚢",
    category: "engineering",
    description:
      "Run + maintain shipboard engineering — main engines, electrical, refrigeration, hydraulics. The mechanical-side counterpart to a Merchant Navy Deck Officer.",
    dayInLife:
      "Watchkeeping in engine room (4 hr on / 8 off), machinery overhauls during port calls, paperwork (MARPOL, ISM, ISPS). 6-9 month contracts at sea, then 2-3 month leave.",
    qualifications: ["B.Tech / B.E. Marine Engineering (4 yr) — IMU approved"],
    entranceExams: [
      { name: "IMU CET", link: "https://www.imu.edu.in", dates: "May-Jun" },
      { name: "JEE Main (MERI / TMI)", link: "https://jeemain.nta.nic.in", dates: "Jan/Apr" },
    ],
    salaryRanges: { entry: 1_500_000, mid: 5_000_000, senior: 18_000_000 },
    topColleges: ["MERI Mumbai", "MERI Kolkata", "TMI Pune", "IMU Chennai"],
    skillsRequired: ["Mechanical aptitude", "Troubleshooting", "Discipline", "Watchkeeping certificates"],
    interestTags: ["engineering", "tech", "social"],
    preferredSubjects: ["physics", "math", "chemistry"],
    growthProspects: "Junior Engineer → 4th → 3rd → 2nd → Chief Engineer (tax-free salary at most ranks if 6+ months at sea/year). Eligible NRI status.",
  },
  {
    name: "Nuclear Engineer",
    emoji: "☢️",
    category: "engineering",
    description:
      "Reactor design, fuel-cycle analysis, radiation safety, nuclear medicine. Niche but India's 22-reactor expansion (Kudankulam, Kakrapar) means jobs.",
    dayInLife:
      "Reactor physics simulations (MCNP / Serpent), safety case writing, radiation monitoring, design reviews.",
    qualifications: ["B.Tech Mech / Chem + M.Tech Nuclear OR BARC OCES training (1 yr)"],
    entranceExams: [
      { name: "BARC OCES / DGFS", link: "https://www.barc.gov.in", dates: "Sep-Oct" },
      { name: "GATE", link: "https://gate.iitb.ac.in", dates: "Feb" },
    ],
    salaryRanges: { entry: 700_000, mid: 1_800_000, senior: 4_500_000 },
    topColleges: ["IIT Kanpur (Nuclear)", "IIT Bombay (Energy Sci)", "Homi Bhabha National Institute"],
    skillsRequired: ["Reactor physics", "MATLAB", "Safety analysis", "Discipline"],
    interestTags: ["engineering", "research", "tech", "math"],
    preferredSubjects: ["physics", "math", "chemistry"],
    growthProspects: "NPCIL, BARC, IGCAR Kalpakkam, IPR Gandhinagar. Globally — IAEA, ITER fusion programme.",
  },
  {
    name: "Chemical Engineer",
    emoji: "⚗️",
    category: "engineering",
    description:
      "Design + operate plants that turn raw materials into bulk chemicals, fuels, polymers, pharma. India's specialty-chem boom (PI Industries, Deepak Nitrite, Aarti) makes this a high-demand stream.",
    dayInLife:
      "Process design (HYSYS / Aspen), plant troubleshooting, P&ID review, safety + HAZOP studies.",
    qualifications: ["B.Tech Chemical Engineering"],
    entranceExams: [
      { name: "JEE Main + Advanced", link: "https://jeemain.nta.nic.in", dates: "Jan + May" },
    ],
    salaryRanges: { entry: 700_000, mid: 1_800_000, senior: 6_000_000 },
    topColleges: ["IIT Bombay", "IIT Kanpur", "IIT Madras", "ICT Mumbai (UDCT)", "BITS Pilani"],
    skillsRequired: ["Process simulation", "Thermodynamics", "Process safety", "Plant ops"],
    interestTags: ["engineering", "tech", "research"],
    preferredSubjects: ["chemistry", "physics", "math"],
    growthProspects: "Reliance, IOCL, BPCL, ONGC, Tata Chemicals, plus global pharma (Pfizer, GSK India). M.Tech opens R&D track.",
  },
  {
    name: "Metallurgical Engineer",
    emoji: "🔩",
    category: "engineering",
    description:
      "Materials + metallurgy for steel, aluminium, aerospace alloys, EV battery materials. India's PLI scheme + EV push made this surge.",
    dayInLife:
      "Phase-diagram analysis, microstructure characterisation (SEM / XRD), heat-treatment design, failure analysis.",
    qualifications: ["B.Tech Metallurgical + Materials Engineering"],
    entranceExams: [{ name: "JEE Main + Advanced", link: "https://jeemain.nta.nic.in", dates: "Jan + May" }],
    salaryRanges: { entry: 700_000, mid: 1_800_000, senior: 5_500_000 },
    topColleges: ["IIT (BHU) Varanasi", "IIT Bombay", "IIT Kharagpur", "NIT Surathkal"],
    skillsRequired: ["Materials science", "Phase diagrams", "Microscopy", "Process metallurgy"],
    interestTags: ["engineering", "tech", "research"],
    preferredSubjects: ["chemistry", "physics", "math"],
    growthProspects: "Tata Steel, JSW, SAIL, Hindalco, Vedanta, Ather Energy (EV cells), ISRO.",
  },
  {
    name: "Renewable Energy Engineer",
    emoji: "☀️",
    category: "engineering",
    description:
      "Design + commission solar / wind / battery storage projects. India's 500GW renewables target by 2030 makes this one of the safest long-bet careers.",
    dayInLife:
      "PV plant layout, wind resource assessment, grid integration studies, EPC project supervision.",
    qualifications: ["B.Tech Electrical / Mech + M.Tech Energy Systems"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan/Apr" }, { name: "GATE", link: "https://gate.iitb.ac.in", dates: "Feb" }],
    salaryRanges: { entry: 700_000, mid: 2_000_000, senior: 5_500_000 },
    topColleges: ["TERI University Delhi", "IIT Bombay (Energy Sys)", "IIT Roorkee (Hydro)"],
    skillsRequired: ["PV / wind design tools", "Grid analysis", "Project management", "Field commissioning"],
    interestTags: ["engineering", "tech", "social"],
    preferredSubjects: ["physics", "math"],
    growthProspects: "ReNew, Adani Green, Tata Power Renewables, NTPC REL, Greenko, plus global EPCs.",
  },
  {
    name: "IoT / Embedded Systems Engineer",
    emoji: "📟",
    category: "tech",
    description:
      "Firmware for smart devices, wearables, automotive ECUs, industrial sensors. India's electronics-manufacturing push (Foxconn, Tata, Bosch) created massive demand.",
    dayInLife:
      "Microcontroller coding (ARM Cortex / ESP32), low-level C / C++, RTOS, hardware bring-up, debugging with oscilloscopes / logic analyzers.",
    qualifications: ["B.Tech ECE / EEE / CSE"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan/Apr" }],
    salaryRanges: { entry: 600_000, mid: 1_800_000, senior: 5_500_000 },
    topColleges: ["IIT Madras (Electronics)", "IIIT Hyderabad", "NIT Trichy", "BITS Pilani"],
    skillsRequired: ["C / C++ / Rust", "RTOS", "Communication protocols (CAN, BLE, MQTT)", "PCB basics"],
    interestTags: ["engineering", "tech", "cs", "logic"],
    preferredSubjects: ["physics", "math", "computer science"],
    growthProspects: "Bosch India, Continental, Tata Elxsi, Wipro Engineering, plus IoT startups (Boltt, Atomberg, Wakefit smart sleep).",
  },
  {
    name: "AR / VR Developer",
    emoji: "🕶️",
    category: "tech",
    description:
      "Build immersive experiences for Quest / Vision Pro / mobile AR — education, gaming, surgical training, real-estate walkthroughs. Apple Vision Pro launch energised the field.",
    dayInLife:
      "Unity / Unreal coding, 3D scene optimisation, hand-tracking interactions, performance profiling for VR (90+ fps required).",
    qualifications: ["B.Tech CSE + Unity/Unreal certifications OR self-taught + showreel"],
    entranceExams: [{ name: "JEE Main", link: "https://jeemain.nta.nic.in", dates: "Jan/Apr" }],
    salaryRanges: { entry: 700_000, mid: 2_500_000, senior: 8_000_000 },
    topColleges: ["IIT Bombay (CSE)", "IIIT Hyderabad", "MIT-ID Pune", "BITS Pilani"],
    skillsRequired: ["Unity / Unreal", "C# / C++", "3D math", "Spatial design"],
    interestTags: ["tech", "design", "creative", "media", "engineering"],
    preferredSubjects: ["math", "computer science", "physics"],
    growthProspects: "Niche but exploding. Meta India, Microsoft Mesh, Indian XR studios (FluidScapes, NoBroker XR).",
  },

  /* ═══════════════════════ DEFENSE EXPANSION ═══════════════════════ */
  {
    name: "Indian Air Force Officer (Pilot)",
    emoji: "✈️",
    category: "defense",
    description:
      "Fly fighters (Tejas, Su-30 MKI, Rafale), transports (C-17, IL-76), or helicopters in the IAF. NDA + AFA training; mandatory 14-year service.",
    dayInLife:
      "Flying sorties, simulator training, tactical briefings, squadron duties. Postings rotate every 2-3 yrs across stations.",
    qualifications: ["NDA (Class 12 PCM) OR CDS (UG degree)", "AFCAT (graduate entry)"],
    entranceExams: [
      { name: "NDA", link: "https://upsc.gov.in", dates: "Apr + Sep" },
      { name: "AFCAT", link: "https://afcat.cdac.in", dates: "Feb + Aug" },
    ],
    salaryRanges: { entry: 900_000, mid: 2_200_000, senior: 4_500_000 },
    topColleges: ["National Defence Academy Khadakwasla", "Air Force Academy Hyderabad"],
    skillsRequired: ["Flying aptitude", "Discipline", "Spatial reasoning", "Physical fitness"],
    interestTags: ["defense", "engineering", "humanities", "social"],
    preferredSubjects: ["physics", "math"],
    growthProspects: "Squadron Leader → Wing Commander → Group Captain → Air Marshal. Post-retirement: commercial pilot transition is common (5+ yr IAF flying = CPL).",
  },
  {
    name: "Indian Navy Officer",
    emoji: "⚓",
    category: "defense",
    description:
      "Command + sail Indian Navy warships, submarines, aircraft. Diverse branches — Executive, Engineering, Education, Logistics, Naval Architecture.",
    dayInLife:
      "Watch on bridge (4-hr rotation at sea), drills, gunnery practice, port calls in international ports. 6-9 month deployments.",
    qualifications: ["NDA (Class 12 PCM) OR 10+2 B.Tech Cadet Entry OR CDS"],
    entranceExams: [{ name: "NDA / CDS / B.Tech Cadet Entry", link: "https://upsc.gov.in", dates: "Apr/Sep" }],
    salaryRanges: { entry: 900_000, mid: 2_200_000, senior: 4_500_000 },
    topColleges: ["National Defence Academy Khadakwasla", "Indian Naval Academy Ezhimala"],
    skillsRequired: ["Seamanship", "Leadership", "Engineering aptitude", "Fitness"],
    interestTags: ["defense", "engineering", "social"],
    preferredSubjects: ["physics", "math", "chemistry"],
    growthProspects: "Lieutenant → Commander → Captain → Admiral. NDA-route officers can serve 30+ years with full pension.",
  },
  {
    name: "Air Traffic Controller",
    emoji: "🛫",
    category: "defense",
    description:
      "Direct aircraft on ground + in airspace, prevent collisions. AAI exam clears you into civil ATC; intense focus, high responsibility, premium salary.",
    dayInLife:
      "8-hr shifts in tower / radar room. Tracking 20-50 aircraft simultaneously. High concentration; mandatory break every 2 hrs.",
    qualifications: ["B.Tech ECE / EEE / CSE / IT (60%+) — AAI Junior Executive (ATC) exam"],
    entranceExams: [{ name: "AAI Junior Executive (ATC)", link: "https://www.aai.aero", dates: "Annual" }],
    salaryRanges: { entry: 1_400_000, mid: 2_500_000, senior: 4_500_000 },
    topColleges: ["NIT Trichy", "NIT Warangal", "BITS Pilani", "IIT Roorkee"],
    skillsRequired: ["Multitasking", "Phonetics", "Quick decisions", "Calm under pressure"],
    interestTags: ["defense", "tech", "engineering", "logic"],
    preferredSubjects: ["physics", "math", "english"],
    growthProspects: "AAI JE → Manager → Senior Manager. Pay parity with PSU Grade A officers. Critical-shortage role — guaranteed posting.",
  },

  /* ═══════════════════════ ARTS EXPANSION ═══════════════════════ */
  {
    name: "Theatre Actor / Director",
    emoji: "🎭",
    category: "arts",
    description:
      "Live stage performance — plays, musicals, immersive theatre. Underpaid in India's mainstream but craft-rich; many bridge to OTT acting + voiceover.",
    dayInLife: "Rehearsals 4-8 hrs / day, voice + body training, script analysis, performances on weekends.",
    qualifications: ["NSD Diploma (3 yr) / Drama Schools / Self-taught + theatre group apprenticeship"],
    entranceExams: [{ name: "NSD entrance + workshop", link: "https://nsd.gov.in", dates: "Annual" }],
    salaryRanges: { entry: 200_000, mid: 600_000, senior: 3_500_000 },
    topColleges: ["National School of Drama Delhi", "FTII Pune", "LV Prasad Film + TV Academy"],
    skillsRequired: ["Voice modulation", "Movement", "Improv", "Memorisation"],
    interestTags: ["arts", "creative", "media", "humanities"],
    preferredSubjects: ["english", "history"],
    growthProspects: "Mumbai / Delhi theatre circuits → OTT acting → film. Few stars at top (Naseeruddin Shah, KK Menon) — most actors run multiple parallel income streams.",
  },
  {
    name: "Voice Artist / Dubbing Artist",
    emoji: "🎙️",
    category: "arts",
    description:
      "Voice characters in animation, ads, audiobooks, video games + dub films across languages. India's OTT + gaming dub boom (Netflix Hindi, Disney+ regional) made it a real career.",
    dayInLife: "Recording sessions in studios, audition tapes, voice training, script reading.",
    qualifications: ["Voice/diction training", "Demo reel is everything"],
    entranceExams: [],
    salaryRanges: { entry: 250_000, mid: 1_500_000, senior: 6_000_000 },
    topColleges: ["FTII Pune (Sound)", "Independent voice coaches"],
    skillsRequired: ["Voice modulation", "Multiple accents", "Pronunciation", "Improv"],
    interestTags: ["arts", "media", "creative"],
    preferredSubjects: ["english", "hindi"],
    growthProspects: "Stars dub for international films (Hindi Spider-Man, Bahubali Telugu→Hindi). YouTube + audiobook market exploding.",
  },
  {
    name: "Illustrator / Cartoonist",
    emoji: "✏️",
    category: "arts",
    description:
      "Book illustration, editorial cartoons, comic strips, children's books. Hybrid traditional + digital (Procreate).",
    dayInLife: "Sketches, digital painting, client revisions, building a portfolio + Instagram presence.",
    qualifications: ["B.A. Applied Arts / Fine Arts OR self-taught"],
    entranceExams: [{ name: "NID DAT / NIFT (optional)", link: "https://www.nid.edu", dates: "Jan/Feb" }],
    salaryRanges: { entry: 300_000, mid: 1_500_000, senior: 6_000_000 },
    topColleges: ["NID Ahmedabad", "Sir JJ Institute of Applied Art Mumbai", "DSK School of Design"],
    skillsRequired: ["Drawing", "Procreate / Photoshop", "Storytelling", "Brand-building"],
    interestTags: ["arts", "design", "creative", "media"],
    preferredSubjects: ["english"],
    growthProspects: "Publishers (Penguin, HarperCollins), advertising agencies, NFT art, freelance for OTT animated series.",
  },
  {
    name: "Stand-up Comedian / Content Creator",
    emoji: "🎤",
    category: "arts",
    description:
      "Live comedy + YouTube + brand collabs. Indian stand-up boom (AIB, Vir Das, Zakir Khan) made it a viable creative career.",
    dayInLife: "Writing 4-6 hrs, open mics, polishing material, social posting, brand deals.",
    qualifications: ["None — body of original material matters"],
    entranceExams: [],
    salaryRanges: { entry: 100_000, mid: 1_500_000, senior: 30_000_000 },
    topColleges: ["No formal — Mumbai/Delhi/Bangalore comedy clubs (Canvas, Habitat, OML)"],
    skillsRequired: ["Writing", "Stage presence", "Observation", "Resilience"],
    interestTags: ["arts", "creative", "media"],
    preferredSubjects: ["english"],
    growthProspects: "Top names earn ₹5-10L per corporate show + ₹50L+ specials. Most plateau at part-time after 2-3 yrs.",
  },

  /* ═══════════════════════ CIVIL SERVICES EXPANSION ═══════════════════════ */
  {
    name: "RBI Grade B Officer",
    emoji: "🏦",
    category: "civil-services",
    description:
      "Direct entry into Reserve Bank of India's officer cadre. Best-paid + most-prestigious banking exam in India — better lifetime stability than IB.",
    dayInLife: "Monetary policy analysis, supervision visits to commercial banks, financial-markets research, RBI committee work.",
    qualifications: ["UG (60%+) — RBI Grade B exam (Phase 1 + 2 + Interview)"],
    entranceExams: [{ name: "RBI Grade B", link: "https://www.rbi.org.in", dates: "Annual" }],
    salaryRanges: { entry: 1_800_000, mid: 3_500_000, senior: 6_500_000 },
    topColleges: ["SRCC Delhi", "St Stephen's", "IIM (PGP)", "DSE Delhi"],
    skillsRequired: ["Macro-economics", "ESI + FM", "Essay writing", "Analytical reasoning"],
    interestTags: ["civil-services", "finance", "commerce", "math"],
    preferredSubjects: ["economics", "math", "english"],
    growthProspects: "Manager → AGM → DGM → ED → Deputy Governor → Governor. Pension + housing + accommodation everywhere RBI operates.",
  },
  {
    name: "SEBI Officer",
    emoji: "📜",
    category: "civil-services",
    description:
      "Securities & Exchange Board regulator — markets surveillance, IPO approvals, listing-norms enforcement.",
    dayInLife: "Reviewing prospectuses, surveillance alerts, regulatory drafting, hearings.",
    qualifications: ["UG (60%+) + SEBI Grade A exam"],
    entranceExams: [{ name: "SEBI Grade A", link: "https://www.sebi.gov.in", dates: "Annual" }],
    salaryRanges: { entry: 1_800_000, mid: 3_500_000, senior: 6_000_000 },
    topColleges: ["SRCC Delhi", "St Stephen's", "NLSIU Bangalore", "ISB Hyderabad"],
    skillsRequired: ["Financial-markets knowledge", "Law", "Investigation", "Drafting"],
    interestTags: ["civil-services", "finance", "law", "commerce"],
    preferredSubjects: ["economics", "accountancy", "english"],
    growthProspects: "Officer → AGM → CGM → Whole-Time Member → Chairman. Often lateral-move to top private finance firms post-tenure.",
  },
  {
    name: "Indian Forest Service (IFoS) Officer",
    emoji: "🌳",
    category: "civil-services",
    description:
      "Forest + wildlife management across India's 700,000 sq km of recorded forest. Conservation Officer / DFO postings in tiger reserves, national parks.",
    dayInLife: "Forest patrolling, anti-poaching operations, community programs, working with NGOs.",
    qualifications: ["UG (Forestry / Botany / Zoology / Engineering / Vet) — UPSC IFoS"],
    entranceExams: [{ name: "UPSC IFoS", link: "https://upsc.gov.in", dates: "Annual" }],
    salaryRanges: { entry: 900_000, mid: 1_800_000, senior: 3_200_000 },
    topColleges: ["Forest Research Institute Dehradun", "Indira Gandhi National Forest Academy Dehradun"],
    skillsRequired: ["Field stamina", "Wildlife biology", "Community work", "Hindi + regional language"],
    interestTags: ["civil-services", "biology", "research", "social"],
    preferredSubjects: ["biology", "geography"],
    growthProspects: "ACF → DFO → Conservator → CCF → PCCF → IFS Top Brass. Sustainable lifestyle + bungalow + jungle living.",
  },

  /* ═══════════════════════ HOSPITALITY + EVENTS ═══════════════════════ */
  {
    name: "Event Manager / Wedding Planner",
    emoji: "🎉",
    category: "commerce",
    description:
      "Plan + execute corporate events, conferences, weddings, festivals. India's wedding industry alone is ~$60B / year.",
    dayInLife: "Client briefings, venue scouting, vendor coordination, day-of execution (15-hr days near event).",
    qualifications: ["B.A. / BBA Event Management", "Or hospitality background + experience"],
    entranceExams: [{ name: "NCHMCT JEE / Inst entrance", link: "https://nchmjee.nta.nic.in", dates: "Apr-May" }],
    salaryRanges: { entry: 300_000, mid: 1_500_000, senior: 8_000_000 },
    topColleges: ["EMDI Mumbai", "NIEM", "IIHM Kolkata", "Welcomgroup Graduate School"],
    skillsRequired: ["Negotiation", "Logistics", "Crisis handling", "Aesthetic eye"],
    interestTags: ["commerce", "creative", "social", "management"],
    preferredSubjects: ["english"],
    growthProspects: "Wizcraft, Cineyug, Percept ICE — top agencies pay ₹20L+ at 5-8 yrs. Own boutique agency = upside.",
  },

  /* ═══════════════════════ MERCHANT NAVY ═══════════════════════ */
  {
    name: "Merchant Navy Deck Officer",
    emoji: "⛴️",
    category: "engineering",
    description:
      "Navigate commercial cargo + tanker ships globally. NRI status + tax-free salary at sea. 6-month contracts on + 2-3 months off.",
    dayInLife: "Bridge watches (4 hrs on / 8 off), navigation, cargo operations at port, ship's paperwork.",
    qualifications: ["B.Sc Nautical Science (3 yr) — IMU CET / Diploma in Nautical Science (1 yr)"],
    entranceExams: [{ name: "IMU CET", link: "https://www.imu.edu.in", dates: "May-Jun" }],
    salaryRanges: { entry: 1_200_000, mid: 5_500_000, senior: 18_000_000 },
    topColleges: ["TS Chanakya Mumbai", "MERI Mumbai", "AMET Chennai", "IMU Chennai"],
    skillsRequired: ["Navigation", "Seamanship", "Cargo handling", "Discipline"],
    interestTags: ["engineering", "tech"],
    preferredSubjects: ["physics", "math"],
    growthProspects: "3rd Officer → 2nd → Chief Officer → Master Mariner (Captain). Captain on VLCCs earns $15K+/month tax-free.",
  },

  /* ═══════════════════════ EDUCATION / EDTECH ═══════════════════════ */
  {
    name: "EdTech Founder / Product Lead",
    emoji: "🎓",
    category: "education",
    description:
      "Build educational products — apps, content platforms, exam-prep, AI tutors. Indian edtech hit ~$10B; even after the BYJU'S correction, niche edtech still grows.",
    dayInLife: "Product strategy, content curation, hiring teachers, building partnerships with schools.",
    qualifications: ["B.Tech + MBA OR education background + product experience"],
    entranceExams: [{ name: "JEE Main / CAT", link: "https://iimcat.ac.in", dates: "Nov" }],
    salaryRanges: { entry: 700_000, mid: 2_500_000, senior: 15_000_000 },
    topColleges: ["IIT Bombay", "IIM Bangalore", "ISB Hyderabad", "BITS Pilani"],
    skillsRequired: ["Product thinking", "Content design", "Teaching empathy", "Growth strategy"],
    interestTags: ["education", "tech", "entrepreneur", "social"],
    preferredSubjects: ["english"],
    growthProspects: "Unacademy, PhysicsWallah, Toppr, Vedantu lineage. Many founders are ex-teachers + ex-PMs.",
  },

  /* ═══════════════════════ HEALTHCARE OPS ═══════════════════════ */
  {
    name: "Hospital Administrator",
    emoji: "🏥",
    category: "medical",
    description:
      "Run hospital operations — staffing, finance, patient experience, accreditation (NABH / JCI). Non-clinical but central to healthcare.",
    dayInLife: "Departmental rounds, vendor management, budget reviews, hiring, regulatory compliance.",
    qualifications: ["MBBS preferred (not required) + MHA / MBA Healthcare"],
    entranceExams: [{ name: "CAT / NEET PG + MHA entrance", link: "https://iimcat.ac.in", dates: "Nov" }],
    salaryRanges: { entry: 600_000, mid: 2_000_000, senior: 7_500_000 },
    topColleges: ["IIM Bangalore (Healthcare)", "TISS Mumbai (Health Admin)", "AIIMS MHA"],
    skillsRequired: ["Operations", "Finance", "People management", "Quality systems"],
    interestTags: ["medical", "commerce", "management"],
    preferredSubjects: ["biology (helpful)", "economics", "english"],
    growthProspects: "Apollo, Fortis, Manipal Hospitals, plus the explosive home-healthcare segment (Practo, PharmEasy).",
  },
];
