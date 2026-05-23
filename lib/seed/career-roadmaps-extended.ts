/**
 * Roadmap overrides for the Round-2 careers in careers-extended.ts.
 * Same shape as ROADMAP_OVERRIDES — merged at seed time.
 */

import type { CareerRoadmap } from "./careers";

export const ROADMAP_OVERRIDES_EXTENDED: Record<string, CareerRoadmap> = {
  /* ─── LAW ─── */
  "Judge / Judicial Officer": {
    class10: { focus: "English, History, Civics", minScore: "75%+" },
    class12: { stream: "Any", coreSubjects: ["English", "Political Science", "History"], notes: "Reading habit + debate participation matters more than marks" },
    undergrad: [
      { degree: "BA LLB (Hons) integrated", duration: "5 years", entranceExams: ["CLAT", "AILET", "LSAT India"] },
      { degree: "LLB (after any UG)", duration: "3 years", notes: "Common when switching from engineering / commerce" },
    ],
    postgrad: [
      { degree: "Judicial Services prep + exam", duration: "1-2 years", entranceExams: ["State PCS-J"], notes: "Most candidates clear it within 1-2 attempts post-LLB" },
      { degree: "LLM (optional but helpful)", duration: "1-2 years" },
    ],
    finalRole: "Civil Judge → ADJ → District Judge → eventual elevation to HC bench.",
  },
  "Intellectual Property Lawyer": {
    class10: { focus: "English + science basics (for tech IP)" },
    class12: { stream: "Any", coreSubjects: ["English", "Political Science"], notes: "PCM/PCB strengthens patent-side prospects" },
    undergrad: [{ degree: "BA LLB integrated (5 yr) OR B.Tech + LLB (8 yr combined)", duration: "5-8 years", entranceExams: ["CLAT", "AILET"] }],
    postgrad: [
      { degree: "LLM Intellectual Property Rights", duration: "1-2 years" },
      { degree: "Indian Patent Agent Exam (if technical background)", duration: "Self-study + exam" },
    ],
    finalRole: "IP Associate → Partner at top IP firm OR in-house IP Counsel at MNC.",
  },
  "Cyber Lawyer": {
    class12: { stream: "Any (CS background helps)", coreSubjects: ["English", "Computer Science (helpful)"] },
    undergrad: [{ degree: "BA LLB / B.Tech CSE + LLB", duration: "5-8 years", entranceExams: ["CLAT", "JEE Main", "AILET"] }],
    postgrad: [{ degree: "LLM in Cyber Law / Digital Forensics", duration: "1-2 years", notes: "Centre for Cyber Law at NLU Delhi is the leading PG programme" }],
    finalRole: "Cyber Law Associate → Senior Counsel → Data Protection Officer at MNC.",
  },
  "Tax Lawyer / Chartered Tax Practitioner": {
    class12: { stream: "Commerce", coreSubjects: ["Accountancy", "Economics", "Math"] },
    undergrad: [
      { degree: "B.Com + CA Foundation track", duration: "3 years + CA stages" },
      { degree: "BA LLB / B.Com LLB integrated", duration: "5 years", entranceExams: ["CLAT"] },
    ],
    postgrad: [{ degree: "LLM Taxation / CA Final + Diploma Tax Law", duration: "2-3 years" }],
    finalRole: "Tax Counsel — Big 4 / boutique tax firms / corporate in-house. ITAT practice common at senior level.",
  },

  /* ─── FINANCE NICHE ─── */
  Actuary: {
    class10: { focus: "Math + Statistics fundamentals", minScore: "90%+ in Math" },
    class12: { stream: "PCM / Commerce with Math", coreSubjects: ["Math", "Statistics (if available)", "Economics"], minScore: "Math > 95%" },
    undergrad: [
      { degree: "B.Sc Actuarial Science / Math / Statistics", duration: "3 years", entranceExams: ["IAI ACET", "ISI entrance", "DU"] },
      { degree: "B.Tech Industrial Engineering (alt route)", duration: "4 years" },
    ],
    postgrad: [{ degree: "IAI Fellowship (16 papers) — clear in parallel with job", duration: "6-10 years (most rare to clear fast)", entranceExams: ["IAI Fellowship exams"] }],
    finalRole: "Fellow Actuary at LIC / SBI Life / Mercer / WTW. Chief Actuary / Appointed Actuary roles open at 12+ yr.",
  },
  "Quantitative Analyst": {
    class10: { focus: "Heavy math + olympiad participation", minScore: "Math > 95%" },
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"], minScore: "Math > 95% for top schools" },
    undergrad: [{ degree: "B.Tech CSE / Math + Computing OR B.Stat ISI Kolkata", duration: "3-4 years", entranceExams: ["JEE Advanced", "ISI", "CMI"] }],
    postgrad: [
      { degree: "MS Quantitative Finance / Financial Engineering (typically abroad: CMU / Princeton / NYU)", duration: "1-2 years", entranceExams: ["GRE", "TOEFL"] },
      { degree: "OR MQF at IIM Calcutta", duration: "2 years", entranceExams: ["IIM Calcutta MQF entrance"] },
    ],
    finalRole: "Quant at investment bank / hedge fund. India: DE Shaw, Tower Research, Goldman Bangalore.",
  },
  "Investment Banking Analyst": {
    class12: { stream: "Commerce / PCM", coreSubjects: ["Accountancy", "Economics", "Math", "English"] },
    undergrad: [{ degree: "B.Com (H) / BBA / B.Tech from top-tier college", duration: "3-4 years" }],
    postgrad: [{ degree: "MBA Finance (IIM-A/B/C/L or ISB)", duration: "2 years", entranceExams: ["CAT", "GMAT"], notes: "Front-office IB recruitment is on-campus at IIMs + ISB" }],
    finalRole: "Analyst → Associate → VP → Director → MD at Goldman / Morgan Stanley / JP Morgan / ICICI iBank.",
  },
  "Risk Management Analyst": {
    class12: { stream: "PCM / Commerce with Math", coreSubjects: ["Math", "Economics", "Statistics"] },
    undergrad: [{ degree: "B.Tech / B.Sc Statistics / Math / Economics", duration: "3-4 years" }],
    postgrad: [{ degree: "MBA Finance OR MQF + FRM certification", duration: "2 years + cert", entranceExams: ["CAT", "FRM Part 1 + 2"] }],
    finalRole: "Risk Analyst → AVP Risk → Director Risk → CRO at bank / NBFC.",
  },

  /* ─── ENGINEERING SPECIALISATIONS ─── */
  "Petroleum Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Petroleum Engineering", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced", "UPESEAT"] }],
    postgrad: [{ degree: "M.Tech Petroleum / Reservoir Engineering", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Reservoir Engineer / Drilling Engineer at ONGC / Reliance / Cairn / global majors.",
  },
  "Marine Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "60% min in PCM (DGS norms)" },
    undergrad: [{ degree: "B.Tech / B.E. Marine Engineering (IMU-approved)", duration: "4 years", entranceExams: ["IMU CET", "JEE Main (some institutes)"] }],
    postgrad: [{ degree: "Certificate of Competency exams (DGS, MEO Class 1-4)", duration: "Modular while serving" }],
    finalRole: "Junior Engineer → 4th → 3rd → 2nd → Chief Engineer. Tax-free salary at sea + NRI status.",
  },
  "Nuclear Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Mechanical / Chemical / Electrical", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced"] }],
    postgrad: [{ degree: "BARC OCES training (1 yr, paid)", duration: "1 year", entranceExams: ["BARC OCES interview"] }, { degree: "OR M.Tech Nuclear Engineering", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Scientific Officer at BARC / NPCIL / IGCAR. Globally: IAEA, ITER fusion programme.",
  },
  "Chemical Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Chemical Engineering", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced", "ICT Mumbai entrance"] }],
    postgrad: [{ degree: "M.Tech Chemical (Process / Reaction / Polymer)", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Process Engineer at Reliance / IOCL / specialty-chem companies. Strong PSU + global pharma demand.",
  },
  "Metallurgical Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Metallurgical & Materials Engineering", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced"] }],
    postgrad: [{ degree: "M.Tech Materials Science", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Metallurgist at Tata Steel / JSW / SAIL / Hindalco / EV-battery startups.",
  },
  "Renewable Energy Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Electrical / Mechanical / Energy", duration: "4 years", entranceExams: ["JEE Main"] }],
    postgrad: [{ degree: "M.Tech Energy Systems / Renewable Energy", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Renewables Engineer at Adani Green / ReNew / Tata Power Renewables / Greenko.",
  },
  "IoT / Embedded Systems Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"] },
    undergrad: [{ degree: "B.Tech ECE / EEE / CSE", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced", "BITSAT"] }],
    postgrad: [{ degree: "M.Tech VLSI / Embedded Systems (optional)", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Embedded Engineer at Bosch / Continental / Tata Elxsi / IoT startups.",
  },
  "AR / VR Developer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"] },
    undergrad: [{ degree: "B.Tech CSE + Unity/Unreal projects", duration: "4 years", entranceExams: ["JEE Main"] }, { degree: "OR B.Des Interaction Design + self-taught coding", duration: "4 years", entranceExams: ["NID DAT", "UCEED"] }],
    finalRole: "XR Developer at Meta India / Microsoft Mesh / indie XR studios.",
  },

  /* ─── DEFENSE EXPANSION ─── */
  "Indian Air Force Officer (Pilot)": {
    class10: { focus: "PT + general awareness", minScore: "75%+" },
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "60% + PCM 60%" },
    undergrad: [
      { degree: "NDA (3 yr at Khadakwasla + 1 yr at AFA Hyderabad)", duration: "4 years", entranceExams: ["NDA (PCM)", "SSB Interview"] },
      { degree: "OR AFCAT — Flying Branch (post-graduation)", duration: "Variable", entranceExams: ["AFCAT", "AFSB"] },
    ],
    finalRole: "Flying Officer → Squadron Leader → Wing Commander → Group Captain → Air Marshal.",
  },
  "Indian Navy Officer": {
    class10: { focus: "PT + maritime awareness" },
    class12: { stream: "PCM (Engineering/Executive), Any (Logistics/Education)", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "60%+" },
    undergrad: [
      { degree: "NDA (3 yr Khadakwasla + 1 yr INA Ezhimala) — for inter-services entry", duration: "4 years", entranceExams: ["NDA", "SSB"] },
      { degree: "10+2 B.Tech Cadet Entry → 4 yr at INA Ezhimala", duration: "4 years", entranceExams: ["JEE Main", "SSB"] },
    ],
    finalRole: "Sub Lieutenant → Lt Cdr → Commander → Captain → Admiral. Indian Navy + civilian post-retirement.",
  },
  "Air Traffic Controller": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"], minScore: "60%+" },
    undergrad: [{ degree: "B.Tech ECE / EEE / CSE / IT", duration: "4 years", entranceExams: ["JEE Main"] }],
    postgrad: [{ degree: "AAI Junior Executive (ATC) → training at CATC Allahabad / Hyderabad", duration: "6-12 months", entranceExams: ["AAI JE (ATC)"] }],
    finalRole: "Junior Executive → Manager → Senior Manager → AGM ATM at Airports Authority of India.",
  },

  /* ─── ARTS EXPANSION ─── */
  "Theatre Actor / Director": {
    class12: { stream: "Any", coreSubjects: ["English", "Hindi", "History (helpful)"] },
    undergrad: [
      { degree: "BA Drama / English Literature + parallel theatre group", duration: "3 years" },
      { degree: "NSD 3-yr Diploma in Dramatic Arts", duration: "3 years", entranceExams: ["NSD entrance + workshop"] },
    ],
    postgrad: [{ degree: "Optional MA / MFA Acting", duration: "2 years" }],
    finalRole: "Theatre actor / director on Mumbai/Delhi circuit; many bridge to OTT/film roles.",
  },
  "Voice Artist / Dubbing Artist": {
    class12: { stream: "Any", coreSubjects: ["English", "Hindi", "Regional language"] },
    undergrad: [{ degree: "Diploma in Voice Acting (Whistling Woods / FTII Sound) OR self-taught + reel", duration: "1-3 years" }],
    finalRole: "Voice artist for animation / dubbing / audiobooks / video games. Top names earn ₹5L+ per project.",
  },
  "Illustrator / Cartoonist": {
    class12: { stream: "Any", coreSubjects: ["Any — portfolio matters most"] },
    undergrad: [{ degree: "B.A. Applied / Fine Arts OR B.Des Communication Design", duration: "3-4 years", entranceExams: ["NID DAT", "UCEED", "NIFT"] }],
    finalRole: "Illustrator at publishing houses / ad agencies / animation studios / freelance.",
  },
  "Stand-up Comedian / Content Creator": {
    class12: { stream: "Any", coreSubjects: ["English", "Hindi"] },
    undergrad: [{ degree: "Any UG + open mics in parallel", duration: "3 years", notes: "Build 1-hour set + YouTube channel by end of UG" }],
    finalRole: "Comedian on Comicstaan / OTT special / corporate gigs / brand deals.",
  },

  /* ─── CIVIL SERVICES EXPANSION ─── */
  "RBI Grade B Officer": {
    class12: { stream: "Commerce / Humanities / PCM", coreSubjects: ["Economics", "Math", "English"] },
    undergrad: [{ degree: "B.A. Economics (H) / B.Com / B.Sc / B.Tech", duration: "3-4 years" }],
    postgrad: [{ degree: "RBI Grade B prep (Phase 1 + 2 + Interview) — 1-2 yrs", duration: "1-2 years", entranceExams: ["RBI Grade B"] }],
    finalRole: "Manager → AGM → DGM → ED at Reserve Bank of India.",
  },
  "SEBI Officer": {
    class12: { stream: "Commerce / Any", coreSubjects: ["Economics", "Accountancy", "English"] },
    undergrad: [{ degree: "B.Com / BBA / B.A. Economics / LLB", duration: "3-5 years" }],
    postgrad: [{ degree: "SEBI Grade A prep (parallel with CA / CFA helpful)", duration: "1-2 years", entranceExams: ["SEBI Grade A"] }],
    finalRole: "Assistant Manager → Manager → AGM → CGM → Whole-Time Member at SEBI.",
  },
  "Indian Forest Service (IFoS) Officer": {
    class12: { stream: "PCB / PCM", coreSubjects: ["Biology", "Geography (helpful)", "Chemistry"] },
    undergrad: [{ degree: "B.Sc Forestry / Botany / Zoology / Agriculture / B.V.Sc / B.E.", duration: "3-5 years", notes: "UPSC requires Bachelor's in specified science subjects" }],
    postgrad: [{ degree: "UPSC IFoS prep (1-2 yr)", duration: "1-2 years", entranceExams: ["UPSC IFoS"] }],
    finalRole: "ACF → DFO → CCF → PCCF. Direct involvement in conservation + wildlife.",
  },

  /* ─── OTHERS ─── */
  "Event Manager / Wedding Planner": {
    class12: { stream: "Any", coreSubjects: ["English", "Any"] },
    undergrad: [{ degree: "BBA Event Management / BA Mass Comm + event-cell experience", duration: "3 years" }],
    postgrad: [{ degree: "PG Diploma Event Management (NIEM, EMDI) — optional", duration: "6-12 months" }],
    finalRole: "Event Manager → Senior Producer at Wizcraft / Cineyug / own boutique agency.",
  },
  "Merchant Navy Deck Officer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "60%+ PCM" },
    undergrad: [{ degree: "B.Sc Nautical Science (3 yr) at IMU-approved college", duration: "3 years", entranceExams: ["IMU CET"] }],
    postgrad: [{ degree: "Certificate of Competency exams (Mate, Master) — modular", duration: "Modular while at sea" }],
    finalRole: "3rd Officer → 2nd → Chief Officer → Master Mariner (Captain).",
  },
  "EdTech Founder / Product Lead": {
    class12: { stream: "Any", coreSubjects: ["English", "Any"] },
    undergrad: [{ degree: "B.Tech / Any UG + side projects in education", duration: "3-4 years" }],
    postgrad: [{ degree: "MBA / Work experience at edtech startup", duration: "2-5 years", entranceExams: ["CAT", "GMAT"] }],
    finalRole: "Product Manager → Director of Product → Founder / VP at edtech (Unacademy / PhysicsWallah / etc.).",
  },
  "Hospital Administrator": {
    class12: { stream: "PCB / Any", coreSubjects: ["Biology (helpful)", "Economics", "English"] },
    undergrad: [{ degree: "MBBS / B.Sc Nursing / BBA Healthcare / B.A. Any", duration: "3-5.5 years" }],
    postgrad: [{ degree: "MHA (Master of Hospital Administration) — TISS / IIHMR / AIIMS", duration: "2 years", entranceExams: ["CAT", "TISS NET", "AIIMS MHA"] }],
    finalRole: "Hospital Administrator → COO → CEO at Apollo / Fortis / Manipal Hospitals.",
  },
};
