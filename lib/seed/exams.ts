/**
 * Major entrance exams for Class 10 & 12 students. Dates are approximate
 * for the 2026 cycle (update once official notifications are out).
 */

export type SeedExam = {
  name: string;
  fullName: string;
  category: "entrance" | "scholarship" | "olympiad" | "board";
  examDate?: string; // ISO
  applicationStart?: string;
  applicationEnd?: string;
  eligibility?: string;
  syllabus?: string;
  pattern?: string;
  officialWebsite?: string;
  fees?: number;
  description?: string;
};

export const EXAMS: SeedExam[] = [
  /* ─── Engineering ─── */
  {
    name: "JEE Main",
    fullName: "Joint Entrance Examination (Main)",
    category: "entrance",
    examDate: "2026-01-22",
    applicationStart: "2025-11-01",
    applicationEnd: "2025-12-15",
    eligibility: "Class 12 with PCM, minimum 75% (65% for SC/ST). Up to 3 consecutive years.",
    syllabus: "Class 11 & 12 Physics, Chemistry, Mathematics (NCERT-based).",
    pattern: "300 marks (75 Q × 4 marks), -1 for wrong MCQs, no negative for numerical. 3 hours.",
    officialWebsite: "https://jeemain.nta.nic.in",
    fees: 1000,
    description: "Gateway to NITs, IIITs, GFTIs. Top 2.5 lakh qualify for JEE Advanced (→ IITs).",
  },
  {
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination (Advanced)",
    category: "entrance",
    examDate: "2026-05-17",
    applicationStart: "2026-04-25",
    applicationEnd: "2026-05-04",
    eligibility: "Top 2.5 lakh in JEE Main + Class 12 with min 75% PCM.",
    syllabus: "Same syllabus as JEE Main but harder questions, Class 11+12 PCM.",
    pattern: "Paper 1 & 2, each 3 hours. Mix of MCQ, numerical, integer types. Negative marking varies.",
    officialWebsite: "https://jeeadv.ac.in",
    fees: 3200,
    description: "The single gateway to IITs. Among the toughest UG exams in the world.",
  },
  {
    name: "BITSAT",
    fullName: "BITS Admission Test",
    category: "entrance",
    examDate: "2026-05-25",
    applicationStart: "2026-01-15",
    applicationEnd: "2026-04-10",
    eligibility: "Class 12 PCM with min 75% aggregate and 60% in each subject.",
    syllabus: "Class 11+12 PCM + English + Logical Reasoning.",
    pattern: "150 questions, computer-based, 3 hours. -1 negative marking.",
    officialWebsite: "https://bitsadmission.com",
    fees: 3400,
    description: "Admission to BITS Pilani / Goa / Hyderabad campuses.",
  },

  /* ─── Medical ─── */
  {
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test (UG)",
    category: "entrance",
    examDate: "2026-05-03",
    applicationStart: "2026-02-07",
    applicationEnd: "2026-03-07",
    eligibility: "Class 12 with PCB, min 50% (40% SC/ST). No upper age limit.",
    syllabus: "Class 11+12 Physics, Chemistry, Biology.",
    pattern: "180 questions × 4 marks = 720 total. -1 for wrong, 0 for unattempted. 3h 20m.",
    officialWebsite: "https://neet.nta.nic.in",
    fees: 1700,
    description: "Single gateway for MBBS, BDS, AYUSH, BVSc admissions across India.",
  },
  {
    name: "AIIMS PG / NEET PG",
    fullName: "Post-graduate medical entrance",
    category: "entrance",
    examDate: "2026-03-15",
    eligibility: "MBBS degree + completed internship.",
    syllabus: "All MBBS subjects.",
    pattern: "200 MCQs, 3h 30m. Negative marking.",
    officialWebsite: "https://nbe.edu.in",
    fees: 4250,
    description: "Gateway to MD/MS specialization seats.",
  },

  /* ─── Commerce / MBA ─── */
  {
    name: "CAT",
    fullName: "Common Admission Test",
    category: "entrance",
    examDate: "2026-11-29",
    applicationStart: "2026-08-01",
    applicationEnd: "2026-09-15",
    eligibility: "Bachelor's degree with 50%+ (45% SC/ST).",
    syllabus: "Verbal Ability + DI/LR + Quantitative Ability (no fixed syllabus).",
    pattern: "3 sections × 40 min each. 66-72 questions total. -1 negative on MCQs.",
    officialWebsite: "https://iimcat.ac.in",
    fees: 2400,
    description: "Gateway to IIMs and most top B-schools. Score percentile-based.",
  },
  {
    name: "CA Foundation",
    fullName: "Chartered Accountancy Foundation",
    category: "entrance",
    examDate: "2026-06-15",
    eligibility: "Class 12 pass (any stream).",
    syllabus: "Accounts, Business Laws, Quant Aptitude, Business Economics.",
    pattern: "4 papers × 100 marks. Mix of subjective + objective.",
    officialWebsite: "https://www.icai.org",
    fees: 9000,
    description: "First milestone in becoming a Chartered Accountant. ~30% pass rate.",
  },

  /* ─── Law ─── */
  {
    name: "CLAT",
    fullName: "Common Law Admission Test",
    category: "entrance",
    examDate: "2026-12-07",
    applicationStart: "2026-07-15",
    applicationEnd: "2026-11-15",
    eligibility: "Class 12 with min 45% (40% SC/ST). No upper age limit.",
    syllabus: "English, Current Affairs, Legal Reasoning, Logical Reasoning, Quant.",
    pattern: "120 MCQs, 2 hours. -0.25 negative marking.",
    officialWebsite: "https://consortiumofnlus.ac.in",
    fees: 4000,
    description: "Gateway to 22 National Law Universities.",
  },
  {
    name: "AILET",
    fullName: "All India Law Entrance Test",
    category: "entrance",
    examDate: "2026-12-08",
    eligibility: "Class 12 with min 45%.",
    syllabus: "English, GK, Legal Reasoning, Logical Reasoning.",
    pattern: "150 MCQs, 90 min.",
    officialWebsite: "https://nationallawuniversitydelhi.in",
    fees: 3500,
    description: "Exclusive to NLU Delhi (~110 BA LLB seats).",
  },

  /* ─── Defense ─── */
  {
    name: "NDA",
    fullName: "National Defence Academy",
    category: "entrance",
    examDate: "2026-04-21",
    eligibility: "Class 12 (PCM for Air Force/Navy). Unmarried, 16.5-19.5 yrs.",
    syllabus: "Math (Class 11+12) + General Ability Test (English, GK, Science).",
    pattern: "Paper 1 Math (300m) + Paper 2 GAT (600m). Both 2.5 hrs each.",
    officialWebsite: "https://upsc.gov.in",
    fees: 100,
    description: "Single largest path to officer cadre in Indian Armed Forces.",
  },
  {
    name: "AFCAT",
    fullName: "Air Force Common Admission Test",
    category: "entrance",
    examDate: "2026-08-10",
    eligibility: "Class 12 + UG. Specific age limits per branch.",
    syllabus: "General Awareness, Verbal, Numerical Ability, Reasoning, Military Aptitude.",
    pattern: "100 MCQs, 2 hours. -1 per wrong.",
    officialWebsite: "https://afcat.cdac.in",
    fees: 550,
    description: "For Flying / Technical / Ground Duty branches in IAF.",
  },

  /* ─── University-wide ─── */
  {
    name: "CUET UG",
    fullName: "Common University Entrance Test (Undergraduate)",
    category: "entrance",
    examDate: "2026-05-15",
    applicationStart: "2026-02-15",
    applicationEnd: "2026-03-31",
    eligibility: "Class 12 from any recognized board.",
    syllabus: "Languages + Domain subjects + General Test (varies by course).",
    pattern: "Computer-based, multiple subjects, ~2 hours per subject.",
    officialWebsite: "https://cuet.nta.nic.in",
    fees: 800,
    description: "Admission to 250+ central, state, and private universities including DU, JNU, BHU.",
  },

  /* ─── Design ─── */
  {
    name: "NID DAT",
    fullName: "NID Design Aptitude Test",
    category: "entrance",
    examDate: "2026-01-04",
    eligibility: "Class 12 pass (any stream).",
    syllabus: "Design aptitude — observation, analysis, sketching, creativity.",
    pattern: "Prelims (written) + Mains (studio test) + Personal interview.",
    officialWebsite: "https://admissions.nid.edu",
    fees: 2000,
    description: "Admission to NID Ahmedabad (B.Des).",
  },
  {
    name: "NIFT Entrance",
    fullName: "NIFT Entrance Exam",
    category: "entrance",
    examDate: "2026-02-09",
    eligibility: "Class 12 (any stream) for B.Des; below 24 yrs.",
    syllabus: "GAT (English, Math, GK) + CAT (creative ability).",
    pattern: "GAT + CAT + Situation Test (for shortlisted candidates).",
    officialWebsite: "https://www.nift.ac.in",
    fees: 2500,
    description: "Admission to 17 NIFT campuses across India.",
  },
  {
    name: "UCEED",
    fullName: "Undergraduate Common Entrance Exam for Design",
    category: "entrance",
    examDate: "2026-01-19",
    eligibility: "Class 12 (any stream) born on or after 1 Oct 2001.",
    syllabus: "Visualization, observation, design thinking.",
    pattern: "Paper-based, 3 hours, 3 sections.",
    officialWebsite: "https://www.uceed.iitb.ac.in",
    fees: 3500,
    description: "Admission to B.Des at IITB, IITG, IITH, IIITDM.",
  },

  /* ─── Science ─── */
  {
    name: "IISER Aptitude Test",
    fullName: "IISER Aptitude Test",
    category: "entrance",
    examDate: "2026-06-09",
    eligibility: "Class 12 with PCB/PCM, min 60%.",
    syllabus: "Class 11+12 PCMB.",
    pattern: "60 MCQs (15 per subject), 3 hours.",
    officialWebsite: "https://www.iiseradmission.in",
    fees: 2000,
    description: "Admission to IISER Pune/Mohali/Kolkata/Bhopal/Trivandrum/Tirupati BS-MS dual.",
  },
  {
    name: "NEST",
    fullName: "National Entrance Screening Test",
    category: "entrance",
    examDate: "2026-06-22",
    eligibility: "Class 12 PCM/PCB with min 60%.",
    syllabus: "General + Physics + Chemistry + Math + Biology (pick 3 of last 4).",
    pattern: "180 minutes, computer-based.",
    officialWebsite: "https://www.nestexam.in",
    fees: 1200,
    description: "Admission to NISER Bhubaneswar and UM-DAE CBS Mumbai.",
  },

  /* ─── Hospitality / Hotel Management ─── */
  {
    name: "NCHMCT JEE",
    fullName: "Hotel Management Entrance",
    category: "entrance",
    examDate: "2026-04-26",
    eligibility: "Class 12 with min 50%, age below 25.",
    syllabus: "English, Reasoning, GK, Numerical, Aptitude for service.",
    pattern: "200 MCQs, 3 hours.",
    officialWebsite: "https://nchmjee.nta.nic.in",
    fees: 1000,
    description: "Admission to 21 Central IHMs + state IHMs + private institutes.",
  },

  /* ─── Class 10 Olympiads / Class 9 → 10 ─── */
  {
    name: "NTSE",
    fullName: "National Talent Search Examination",
    category: "olympiad",
    examDate: "2026-11-15",
    eligibility: "Class 10 students.",
    syllabus: "MAT (Mental Ability) + SAT (Maths, Science, Social Science).",
    pattern: "Stage 1 (state) → Stage 2 (national). 200 MCQs total.",
    officialWebsite: "https://ncert.nic.in",
    fees: 0,
    description: "Govt scholarship for 2,000 Class 10 students until PhD.",
  },
  {
    name: "KVPY",
    fullName: "Kishore Vaigyanik Protsahan Yojana",
    category: "olympiad",
    examDate: "Discontinued from 2022 (merged with INSPIRE)",
    eligibility: "Class 11/12/UG science students (historical).",
    syllabus: "PCM/PCB analytical aptitude.",
    pattern: "Aptitude test + interview.",
    officialWebsite: "https://kvpy.iisc.ernet.in",
    fees: 0,
    description: "Historic scholarship program; replaced by INSPIRE in 2022.",
  },
];
