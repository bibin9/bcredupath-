/**
 * Roadmap overrides for the existing (pre-expansion) careers. Indexed by
 * career name (matches SeedCareer.name exactly). Applied in seed-content.mjs.
 *
 * For careers without an explicit roadmap here AND no inline roadmap on the
 * SeedCareer object, the seeder uses a permissive default
 * ({ class12: { stream: 'Any' }, undergrad: ['Bachelor degree'] }).
 */

import type { CareerRoadmap } from "./careers";

export const ROADMAP_OVERRIDES: Record<string, CareerRoadmap> = {
  "Software Engineer": {
    class10: { focus: "Math, computer basics, English", minScore: "75%+" },
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry", "Computer Science (recommended)"], minScore: "85%+ for top colleges" },
    undergrad: [
      { degree: "B.Tech / B.E. (CSE / IT / ECE)", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "State CET"] },
      { degree: "B.Sc Computer Science / BCA", duration: "3 years", notes: "Alternative cheaper path" },
    ],
    postgrad: [
      { degree: "M.Tech / MS Computer Science (optional)", duration: "2 years", entranceExams: ["GATE", "GRE (abroad)"], notes: "Optional — strong work experience often more valuable than MS in India" },
    ],
    finalRole: "Software Engineer at product/services company or founder.",
  },
  "Mechanical Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Mechanical Engineering", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced"] }],
    postgrad: [{ degree: "M.Tech (Thermal / Design / Manufacturing)", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Mechanical Engineer — automotive, aerospace, manufacturing.",
  },
  "Civil Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Civil Engineering", duration: "4 years", entranceExams: ["JEE Main"] }],
    postgrad: [{ degree: "M.Tech Structural / Geo-tech / Construction Mgmt", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Civil Engineer — construction firm, govt (PWD), consultancy.",
  },
  "Electrical Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Electrical Engineering", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced"] }],
    postgrad: [{ degree: "M.Tech Power Systems / VLSI / Control", duration: "2 years", entranceExams: ["GATE"] }],
    finalRole: "Electrical Engineer — PSU, semiconductors, EV, power sector.",
  },
  "Aerospace Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Aerospace / Aeronautical", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced"] }],
    postgrad: [{ degree: "M.Tech / MS Aerospace", duration: "2 years", entranceExams: ["GATE", "GRE"] }],
    finalRole: "Aerospace Engineer — ISRO, HAL, Boeing India, Skyroot.",
  },
  "Doctor (MBBS)": {
    class10: { focus: "Strong PCB fundamentals, English fluency", minScore: "85%+" },
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"], minScore: "85%+ NEET cutoff territory" },
    undergrad: [{ degree: "MBBS", duration: "5.5 years (4.5 + internship)", entranceExams: ["NEET UG"] }],
    postgrad: [{ degree: "MD / MS (specialisation)", duration: "3 years", entranceExams: ["NEET PG"], notes: "Optional but typical — choose your sub-speciality" }],
    finalRole: "General Practitioner OR specialist after MD/MS.",
  },
  "Dentist (BDS)": {
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
    undergrad: [{ degree: "BDS", duration: "5 years (4 + internship)", entranceExams: ["NEET UG"] }],
    postgrad: [{ degree: "MDS (specialisation)", duration: "3 years", entranceExams: ["NEET MDS"], notes: "Optional — Ortho, Endo, Implants etc." }],
    finalRole: "Dentist — own clinic / multi-specialist dental hospital.",
  },
  Pharmacist: {
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology / Math"] },
    undergrad: [{ degree: "B.Pharm", duration: "4 years", entranceExams: ["GPAT", "State CET"] }, { degree: "Pharm.D (clinical track)", duration: "6 years", entranceExams: ["NEET UG"] }],
    postgrad: [{ degree: "M.Pharm (industry R&D / specialisation)", duration: "2 years", entranceExams: ["GPAT"] }],
    finalRole: "Pharmacist — pharma R&D / community / clinical / regulatory.",
  },
  Physiotherapist: {
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
    undergrad: [{ degree: "BPT", duration: "4.5 years (3.5 + internship)" }],
    postgrad: [{ degree: "MPT (specialisation)", duration: "2 years" }],
    finalRole: "Physiotherapist — sports / ortho / neuro / private practice.",
  },
  "Chartered Accountant": {
    class12: { stream: "Commerce", coreSubjects: ["Accountancy", "Business Studies", "Economics", "Math (recommended)"] },
    undergrad: [{ degree: "B.Com (parallel, optional)", duration: "3 years", notes: "Many do CA without a degree — ICAI is the certifying body" }],
    postgrad: [
      { degree: "CA Foundation", duration: "4 months", entranceExams: ["CA Foundation"] },
      { degree: "CA Intermediate", duration: "8 months + articleship" },
      { degree: "CA Final", duration: "2 years + articleship", notes: "Average 4-5 years total. ~30% pass rate." },
    ],
    finalRole: "Chartered Accountant — Big 4, MNC, own practice, CFO track.",
  },
  "Investment Banker": {
    class12: { stream: "Commerce", coreSubjects: ["Accountancy", "Business Studies", "Economics", "Math"] },
    undergrad: [{ degree: "B.Com / BBA / B.Tech", duration: "3-4 years", notes: "Top IIT-feeder programmes preferred" }],
    postgrad: [{ degree: "MBA from IIM-A/B/C / ISB", duration: "2 years", entranceExams: ["CAT", "GMAT"], notes: "Near-mandatory for front-office banking roles" }],
    finalRole: "Investment Banker — Goldman, JP Morgan, Morgan Stanley, ICICI iBank.",
  },
  "Financial Analyst": {
    class12: { stream: "Commerce", coreSubjects: ["Accountancy", "Economics", "Math"] },
    undergrad: [{ degree: "B.Com / BBA + CFA Level 1", duration: "3 years" }],
    postgrad: [{ degree: "MBA Finance / CFA charter", duration: "2 years", entranceExams: ["CAT", "CFA"] }],
    finalRole: "Financial Analyst — buy-side, sell-side, PE/VC.",
  },
  "Marketing Manager": {
    class12: { stream: "Any", coreSubjects: ["English", "Economics (recommended)"] },
    undergrad: [{ degree: "B.Com / BBA / BA Communications", duration: "3 years" }],
    postgrad: [{ degree: "MBA Marketing", duration: "2 years", entranceExams: ["CAT", "XAT"] }],
    finalRole: "Marketing Manager — brand mgmt / digital / growth.",
  },
  Entrepreneur: {
    class12: { stream: "Any", coreSubjects: ["Any"], notes: "No specific path. Build, test, learn." },
    undergrad: [{ degree: "Any UG or skip (high risk)", duration: "Variable" }],
    postgrad: [{ degree: "MBA (optional)", duration: "2 years", notes: "Useful network + skills but not required" }],
    finalRole: "Founder — your own company.",
  },
  Lawyer: {
    class12: { stream: "Any", coreSubjects: ["English", "Political Science (recommended)"] },
    undergrad: [{ degree: "BA LLB / BBA LLB (integrated)", duration: "5 years", entranceExams: ["CLAT", "AILET", "LSAT India"] }, { degree: "LLB (after any UG)", duration: "3 years" }],
    postgrad: [{ degree: "LLM (optional)", duration: "1-2 years" }],
    finalRole: "Lawyer — corporate / litigation / judiciary / civil services.",
  },
  "IAS / IPS Officer": {
    class12: { stream: "Any", coreSubjects: ["Any — what you'll really need is GS prep"], notes: "Stream doesn't matter; build general awareness early" },
    undergrad: [{ degree: "Any UG degree", duration: "3 years", notes: "Required to attempt UPSC CSE" }],
    postgrad: [{ degree: "UPSC CSE prep (1-3 years)", duration: "1-3 years", entranceExams: ["UPSC Civil Services"] }],
    finalRole: "IAS / IPS / IRS / IFS Officer.",
  },
  "Defense Officer (NDA → Indian Armed Forces)": {
    class12: { stream: "PCM (for Air Force/Navy)", coreSubjects: ["Math", "Physics", "Chemistry (for Air Force / Navy)"], notes: "Army accepts any stream" },
    undergrad: [{ degree: "NDA (3 yr at Khadakwasla + 1 yr at IMA/INA/AFA)", duration: "4 years", entranceExams: ["NDA / NA"] }],
    finalRole: "Lieutenant in Army / Navy / Air Force.",
  },
  "Graphic / UI Designer": {
    class12: { stream: "Any", coreSubjects: ["Any — portfolio matters most"] },
    undergrad: [{ degree: "B.Des (Industrial / Communication)", duration: "4 years", entranceExams: ["NID DAT", "UCEED", "NIFT"] }, { degree: "Self-taught + portfolio", duration: "Variable" }],
    postgrad: [{ degree: "M.Des (optional)", duration: "2 years" }],
    finalRole: "Product / UI / UX Designer — tech company / agency / freelance.",
  },
  "Fashion Designer": {
    class12: { stream: "Any", coreSubjects: ["Any"] },
    undergrad: [{ degree: "B.Des Fashion Design", duration: "4 years", entranceExams: ["NIFT", "Pearl Academy"] }],
    finalRole: "Fashion Designer — house / own label / D2C.",
  },
  Architect: {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Arch", duration: "5 years", entranceExams: ["NATA", "JEE Main Paper 2"] }],
    postgrad: [{ degree: "M.Arch (specialisation)", duration: "2 years" }],
    finalRole: "Architect — own practice / firm / urban planning.",
  },
  Journalist: {
    class12: { stream: "Any", coreSubjects: ["English", "Social Studies"] },
    undergrad: [{ degree: "BA Journalism / Mass Communication", duration: "3 years" }],
    postgrad: [{ degree: "PG Diploma Journalism (IIMC, ACJ)", duration: "1-2 years", entranceExams: ["IIMC entrance", "ACJ entrance"] }],
    finalRole: "Journalist — newspaper / digital / investigative.",
  },
  "Filmmaker / Director": {
    class12: { stream: "Any", coreSubjects: ["Any — portfolio + showreel matter"] },
    undergrad: [{ degree: "BA Film / Mass Comm", duration: "3 years" }, { degree: "Skip degree, build showreel", duration: "Variable" }],
    postgrad: [{ degree: "FTII Direction / Cinematography (optional)", duration: "3 years", entranceExams: ["FTII entrance"] }],
    finalRole: "Film Director / Showrunner — production house / streaming / indie.",
  },
  "Content Creator / YouTuber": {
    class12: { stream: "Any", coreSubjects: ["Any"] },
    undergrad: [{ degree: "Any UG (parallel to building channel)", duration: "Variable", notes: "No formal qualification needed" }],
    finalRole: "Content Creator — YouTube / Instagram / brand-owned media.",
  },
  "Data Scientist": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "Strong Math foundation matters" },
    undergrad: [{ degree: "B.Tech CSE / Statistics / Math", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced", "ISI"] }],
    postgrad: [{ degree: "MS Data Science / Statistics", duration: "2 years", entranceExams: ["GRE", "GATE"] }],
    finalRole: "Data Scientist — tech / fintech / pharma / consulting.",
  },
  "Research Scientist": {
    class12: { stream: "PCMB (recommended) or PCM/PCB", coreSubjects: ["Math", "Physics", "Chemistry", "Biology (for life sciences)"] },
    undergrad: [{ degree: "B.Sc / Integrated MSc (5 yr)", duration: "3-5 years", entranceExams: ["IISER Aptitude", "NEST", "JEST"] }],
    postgrad: [{ degree: "M.Sc + PhD", duration: "2 + 4-5 years", notes: "Total 8-10 years post-Class 12" }],
    finalRole: "Research Scientist — IISc / IITs / TIFR / international labs.",
  },
  Biotechnologist: {
    class12: { stream: "PCB / PCMB", coreSubjects: ["Physics", "Chemistry", "Biology", "Math (helpful)"] },
    undergrad: [{ degree: "B.Tech / B.Sc Biotechnology", duration: "4 / 3 years", entranceExams: ["JEE Main", "GAT-B"] }],
    postgrad: [{ degree: "M.Tech / M.Sc / PhD Biotech", duration: "2-5 years" }],
    finalRole: "Biotechnologist — pharma / agri-biotech / R&D startup.",
  },
  Psychologist: {
    class12: { stream: "Any", coreSubjects: ["Psychology (recommended)", "Biology (helpful)"] },
    undergrad: [{ degree: "BA / B.Sc Psychology", duration: "3 years" }],
    postgrad: [{ degree: "MA Psychology + M.Phil Clinical Psych (RCI)", duration: "4 years" }],
    finalRole: "Psychologist — clinical / organisational / sports / school.",
  },
  "Teacher / Professor": {
    class12: { stream: "Any", coreSubjects: ["The subject you want to teach"] },
    undergrad: [{ degree: "B.A. / B.Sc / B.Com in subject", duration: "3 years" }, { degree: "+ B.Ed (for school teaching)", duration: "2 years" }],
    postgrad: [{ degree: "M.A./M.Sc + NET + PhD (for college)", duration: "4-7 years", entranceExams: ["UGC NET", "CTET"] }],
    finalRole: "Teacher / Lecturer / Professor.",
  },
  Economist: {
    class12: { stream: "Commerce / Humanities", coreSubjects: ["Economics", "Math", "Statistics (recommended)"] },
    undergrad: [{ degree: "BA Economics (Hons)", duration: "3 years", entranceExams: ["CUET UG (DSE, Presidency)"] }],
    postgrad: [{ degree: "MA / MSc Economics", duration: "2 years", entranceExams: ["DSE entrance", "ISI"] }, { degree: "PhD (academic / RBI)", duration: "4-5 years" }],
    finalRole: "Economist — RBI / NITI Aayog / consulting / academia.",
  },
  "Historian / Archaeologist": {
    class12: { stream: "Humanities", coreSubjects: ["History", "Geography", "Sanskrit / Languages (helpful)"] },
    undergrad: [{ degree: "BA History / Archaeology / Anthropology", duration: "3 years" }],
    postgrad: [{ degree: "MA + PhD", duration: "2-7 years" }],
    finalRole: "Historian / Archaeologist — ASI / museums / academia / UNESCO.",
  },
  "Cybersecurity Specialist": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry", "Computer Science"] },
    undergrad: [{ degree: "B.Tech CSE / IT", duration: "4 years", entranceExams: ["JEE Main"] }],
    postgrad: [{ degree: "M.Tech Cyber Security + CEH / OSCP certifications", duration: "2 years + cert" }],
    finalRole: "Cybersecurity Engineer — banks / fintech / govt / consulting.",
  },
  "Game Developer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"] },
    undergrad: [{ degree: "B.Tech CSE / Game Design diploma", duration: "4 years", entranceExams: ["JEE Main"] }],
    postgrad: [{ degree: "MS Game Design (optional, often abroad)", duration: "1-2 years" }],
    finalRole: "Game Developer — studio / indie / mobile gaming.",
  },
  "AI/ML Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math (Linear Algebra heavy)", "Physics", "Computer Science"], minScore: "90%+ for top colleges" },
    undergrad: [{ degree: "B.Tech CSE / AI / Data Science", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced", "IIIT-H"] }],
    postgrad: [{ degree: "MS / PhD ML (often abroad)", duration: "2-5 years", entranceExams: ["GRE"] }],
    finalRole: "ML Engineer / Research Scientist — Google, Anthropic, OpenAI, ISRO labs.",
  },
  Pilot: {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "50%+ for DGCA medical" },
    undergrad: [{ degree: "Commercial Pilot License (CPL)", duration: "1.5-2 years", entranceExams: ["DGCA exams"], notes: "Flight school — IGRUA Rae Bareli is the top govt option" }, { degree: "NDA → Air Force (military route)", duration: "4 years", entranceExams: ["NDA", "AFCAT"] }],
    finalRole: "Commercial Pilot (Indigo, Air India, Vistara) OR Air Force Officer.",
  },
  "Hotel / Hospitality Manager": {
    class12: { stream: "Any", coreSubjects: ["English"] },
    undergrad: [{ degree: "BHM / B.Sc Hospitality", duration: "4 years", entranceExams: ["NCHMCT JEE"] }],
    postgrad: [{ degree: "MBA Hospitality (optional)", duration: "2 years" }],
    finalRole: "Hospitality Manager — Marriott, Taj, IHG, Oberoi, cruise lines.",
  },

  /* ─────────── EMERGING TECH (PCM) ─────────── */
  "Product Manager": {
    class12: { stream: "Any", coreSubjects: ["English", "Math (recommended)"] },
    undergrad: [{ degree: "B.Tech / B.B.A. / B.Des", duration: "3-4 years", entranceExams: ["JEE Main", "NMIMS NPAT", "CUET UG"] }],
    postgrad: [{ degree: "MBA (IIM / ISB) — common but not required", duration: "2 years", entranceExams: ["CAT", "GMAT"] }],
    finalRole: "Product Manager — APM → PM → Senior PM → Director → CPO.",
  },
  "DevOps / Cloud Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry", "Computer Science (recommended)"] },
    undergrad: [{ degree: "B.Tech CSE / IT", duration: "4 years", entranceExams: ["JEE Main", "BITSAT"] }],
    postgrad: [{ degree: "AWS / GCP / Azure professional certifications", duration: "Self-paced", notes: "Often more valuable than M.Tech for this track" }],
    finalRole: "DevOps / SRE / Cloud Engineer — every tech company hires.",
  },
  "Robotics Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Tech Mechanical / ECE / Mechatronics", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced"] }],
    postgrad: [{ degree: "M.Tech Robotics / Control / Mechatronics", duration: "2 years", entranceExams: ["GATE", "GRE"] }],
    finalRole: "Robotics Engineer — Addverb, GreyOrange, Boston Dynamics, ISRO.",
  },
  "Quantum Computing Researcher": {
    class12: { stream: "PCM", coreSubjects: ["Math (Linear Algebra heavy)", "Physics", "Chemistry"] },
    undergrad: [{ degree: "B.Sc Physics / B.Tech Engineering Physics", duration: "3-4 years", entranceExams: ["IISER Aptitude", "JEE Advanced", "NEST"] }],
    postgrad: [{ degree: "M.Sc Physics + PhD Quantum Info", duration: "5-7 years", entranceExams: ["JEST", "GATE"] }],
    finalRole: "Quantum Researcher — IISc / TIFR / IBM / Google Quantum AI.",
  },
  "Blockchain / Web3 Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"] },
    undergrad: [{ degree: "B.Tech CSE", duration: "4 years", entranceExams: ["JEE Main", "BITSAT"] }],
    postgrad: [{ degree: "Self-taught Solidity / Rust + open-source contracts", duration: "Variable", notes: "GitHub portfolio > formal PG in this field" }],
    finalRole: "Smart Contract Engineer — Polygon, ConsenSys, Coinbase, indie DeFi.",
  },
  "Cloud Solutions Architect": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"] },
    undergrad: [{ degree: "B.Tech CSE / IT", duration: "4 years", entranceExams: ["JEE Main", "BITSAT"] }],
    postgrad: [{ degree: "AWS Solutions Architect Pro / GCP Pro / Azure Solutions Architect Expert", duration: "1-2 years experience + certs" }],
    finalRole: "Cloud Solutions Architect — TCS, Infosys, AWS, large enterprises.",
  },
  "Data Engineer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Computer Science"] },
    undergrad: [{ degree: "B.Tech CSE / IT / Data Science", duration: "4 years", entranceExams: ["JEE Main", "JEE Advanced"] }],
    postgrad: [{ degree: "MS Data Engineering (optional, abroad)", duration: "2 years", entranceExams: ["GRE"] }],
    finalRole: "Data Engineer — every fintech, e-commerce, OTT hires.",
  },

  /* ─────────── HEALTHCARE EXTENDED (PCB) ─────────── */
  Veterinarian: {
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"], minScore: "60%+" },
    undergrad: [{ degree: "B.V.Sc & AH", duration: "5.5 years", entranceExams: ["NEET UG (AIPVT merged)"] }],
    postgrad: [{ degree: "M.V.Sc (specialisation)", duration: "2 years" }],
    finalRole: "Veterinarian — private practice / govt animal husbandry / wildlife.",
  },
  Optometrist: {
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
    undergrad: [{ degree: "B.Optom", duration: "4 years (incl. internship)", entranceExams: ["NEET UG (state-dependent)", "AIIMS B.Optom"] }],
    postgrad: [{ degree: "M.Optom", duration: "2 years" }],
    finalRole: "Optometrist — Lenskart, Titan EyePlus, hospital eye clinics, own practice.",
  },
  "Speech Language Pathologist": {
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
    undergrad: [{ degree: "BASLP", duration: "4 years (incl. internship)", entranceExams: ["AIISH entrance", "NEET UG (some states)"] }],
    postgrad: [{ degree: "M.Sc Audiology & Speech-Language Pathology", duration: "2 years" }],
    finalRole: "SLP — hospitals, autism centers, schools, private practice.",
  },
  "Public Health Specialist": {
    class12: { stream: "PCB / Any", coreSubjects: ["Biology (recommended)", "English", "Economics (helpful)"] },
    undergrad: [{ degree: "MBBS / B.Sc / BDS / BAMS / Statistics", duration: "3-5.5 years", entranceExams: ["NEET UG (clinical)", "CUET UG"] }],
    postgrad: [{ degree: "MPH (Master of Public Health)", duration: "2 years", entranceExams: ["AIIMS MPH", "PHFI entrance"] }],
    finalRole: "Public Health Specialist — WHO, UNICEF, govt health ministries, BMGF.",
  },
  "Nurse Practitioner": {
    class12: { stream: "PCB", coreSubjects: ["Physics", "Chemistry", "Biology"], minScore: "50%+" },
    undergrad: [{ degree: "B.Sc Nursing", duration: "4 years", entranceExams: ["AIIMS B.Sc Nursing", "JIPMER Nursing", "State CET"] }],
    postgrad: [{ degree: "M.Sc Nursing / Nurse Practitioner specialisation", duration: "2 years" }],
    finalRole: "Nurse Practitioner — AIIMS, Apollo, abroad (UK / US / Gulf).",
  },

  /* ─────────── MEDIA / CREATIVE (Any stream) ─────────── */
  "3D Animator / VFX Artist": {
    class12: { stream: "Any", coreSubjects: ["Any — portfolio > marks"] },
    undergrad: [{ degree: "B.A. / B.Sc Animation OR MAAC/Arena diploma", duration: "3-4 years", entranceExams: ["NID DAT (optional)"] }],
    postgrad: [{ degree: "Specialised cert in Houdini / Maya / Nuke", duration: "6-12 months" }],
    finalRole: "VFX Artist — DNEG, MPC, ILM India, Prime Focus, indie studios.",
  },
  "Sound Engineer": {
    class12: { stream: "Any (PCM helps for acoustic theory)", coreSubjects: ["Physics (recommended)", "English"] },
    undergrad: [{ degree: "Diploma in Sound Engineering / B.Sc Audio Engg", duration: "1-3 years" }, { degree: "B.Tech ECE (alt route)", duration: "4 years", entranceExams: ["JEE Main"] }],
    finalRole: "Sound Engineer — film studios, music labels, podcasts, live concerts.",
  },
  Photographer: {
    class12: { stream: "Any", coreSubjects: ["Any — build a portfolio"] },
    undergrad: [{ degree: "B.A. Photography / B.Des Photography (optional)", duration: "3-4 years" }, { degree: "Self-taught + portfolio", duration: "Variable", notes: "Most pros have no degree" }],
    finalRole: "Photographer — wedding / editorial / wildlife / commercial / agency.",
  },

  /* ─────────── EARTH / SPACE SCIENCES (PCM / PCB) ─────────── */
  "Marine Biologist": {
    class12: { stream: "PCB / PCMB", coreSubjects: ["Physics", "Chemistry", "Biology"] },
    undergrad: [{ degree: "B.Sc Marine Biology / Zoology", duration: "3 years", entranceExams: ["CUET UG"] }],
    postgrad: [{ degree: "M.Sc Marine Biology + PhD", duration: "2 + 4 years", entranceExams: ["IIT JAM", "CUET PG"] }],
    finalRole: "Marine Biologist — NIO Goa, CMFRI, WWF, international research stations.",
  },
  "Climate Scientist": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "Strong fundamentals needed" },
    undergrad: [{ degree: "B.Sc Physics / Atmospheric Science / B.Tech", duration: "3-4 years", entranceExams: ["JEE Main", "IISER Aptitude"] }],
    postgrad: [{ degree: "M.Sc Atmospheric Science + PhD", duration: "2 + 4-5 years", entranceExams: ["IIT JAM", "JEST"] }],
    finalRole: "Climate Scientist — IITM Pune, IPCC, climate-tech startups, NASA / ESA.",
  },
  "Astrophysicist / Astronomer": {
    class12: { stream: "PCM", coreSubjects: ["Math", "Physics", "Chemistry"], minScore: "Strong Physics + Math" },
    undergrad: [{ degree: "B.Sc Physics / Integrated MSc", duration: "3-5 years", entranceExams: ["IISER Aptitude", "NEST", "JEE Advanced"] }],
    postgrad: [{ degree: "M.Sc Physics → PhD Astrophysics", duration: "2 + 4-5 years", entranceExams: ["JEST", "JAM", "CSIR NET"] }],
    finalRole: "Astrophysicist — IUCAA, IIA, TIFR, ISRO, NASA/ESA collaborations.",
  },
  "Forensic Scientist": {
    class12: { stream: "PCB / PCM", coreSubjects: ["Physics", "Chemistry", "Biology"] },
    undergrad: [{ degree: "B.Sc Forensic Science / Biotechnology / Chemistry", duration: "3 years", entranceExams: ["NFSU entrance", "CUET UG"] }],
    postgrad: [{ degree: "M.Sc Forensic Science", duration: "2 years", entranceExams: ["NFSU entrance"] }],
    finalRole: "Forensic Scientist — CBI, state labs, NFSU, private cyber-forensics.",
  },

  /* ─────────── PUBLIC SERVICE / SOCIAL (Any) ─────────── */
  "Diplomat (IFS Officer)": {
    class12: { stream: "Any", coreSubjects: ["English", "History / Pol Science (recommended)"], notes: "Stream doesn't matter for UPSC" },
    undergrad: [{ degree: "Any UG degree", duration: "3 years" }],
    postgrad: [{ degree: "UPSC CSE prep (with IFS preference)", duration: "1-3 years", entranceExams: ["UPSC Civil Services"] }],
    finalRole: "IFS Officer — Embassies, UN, MEA, eventual Ambassador.",
  },
  "Social Entrepreneur": {
    class12: { stream: "Any", coreSubjects: ["Any"] },
    undergrad: [{ degree: "Any UG (Engineering / Commerce / Social Work common)", duration: "3-4 years" }],
    postgrad: [{ degree: "MBA / MA Development Studies (optional)", duration: "2 years", entranceExams: ["CAT", "TISS NET", "IRMA entrance"] }],
    finalRole: "Social Entrepreneur — Acumen Fellow / Echoing Green / govt advisory.",
  },
  "NGO Worker / Development Professional": {
    class12: { stream: "Any (Humanities common)", coreSubjects: ["Sociology", "Economics", "English"] },
    undergrad: [{ degree: "BA Social Work / Sociology / Public Policy", duration: "3 years" }],
    postgrad: [{ degree: "MA Social Work / Development Mgmt (TISS, IRMA)", duration: "2 years", entranceExams: ["TISS NET", "IRMA entrance"] }],
    finalRole: "Development Professional — BMGF, Tata Trusts, World Bank, govt advisory.",
  },

  /* ─────────── SPORTS / SPECIALIZED (Any) ─────────── */
  "Sports Coach / Sports Scientist": {
    class12: { stream: "PCB / Any", coreSubjects: ["Biology (helpful)", "Physical Education"] },
    undergrad: [{ degree: "B.P.Ed / B.Sc Sports Science", duration: "3-4 years", entranceExams: ["LNIPE entrance"] }],
    postgrad: [{ degree: "M.P.Ed / M.Sc Sports Science", duration: "2 years" }],
    finalRole: "Sports Coach / Scientist — IPL teams, SAI, Olympic prep squads.",
  },
  "eSports Athlete / Streamer": {
    class12: { stream: "Any", coreSubjects: ["Any — practice + audience matter most"] },
    undergrad: [{ degree: "Any UG (parallel to grinding ranked)", duration: "3 years", notes: "No formal path — talent + grind + streaming brand" }],
    finalRole: "Pro player / Streamer — S8UL, Velocity Gaming, indie creator brand.",
  },
  "Chef / Culinary Professional": {
    class12: { stream: "Any", coreSubjects: ["Any — palate + creativity"] },
    undergrad: [{ degree: "BHM / B.Sc Culinary Arts", duration: "3-4 years", entranceExams: ["NCHMCT JEE"] }, { degree: "Le Cordon Bleu / CIA Diploma (abroad)", duration: "1-3 years" }],
    finalRole: "Chef — fine dining / cloud kitchen / restaurant ownership / MasterChef.",
  },
  "Real Estate Developer": {
    class12: { stream: "Commerce / Any", coreSubjects: ["Math", "Accountancy", "Economics"] },
    undergrad: [{ degree: "B.Com / B.B.A. / B.Arch / B.Tech Civil", duration: "3-5 years", entranceExams: ["CUET UG", "NATA"] }],
    postgrad: [{ degree: "MBA Real Estate (RICS / NICMAR) — optional but useful", duration: "2 years", entranceExams: ["CAT", "RICS entrance"] }],
    finalRole: "Real Estate Developer — family business / REIT / urban planning consultancy.",
  },
};

/**
 * Default fallback roadmap for any career without a specific one.
 * Permissive: "any stream", "Bachelor degree", "specialisation optional".
 */
export const DEFAULT_ROADMAP: CareerRoadmap = {
  class12: { stream: "Any", coreSubjects: ["Subject of your interest"] },
  undergrad: [{ degree: "Relevant Bachelor's degree", duration: "3-4 years" }],
  postgrad: [{ degree: "Master's / specialisation (optional)", duration: "2 years" }],
  finalRole: "Professional in this field.",
};
