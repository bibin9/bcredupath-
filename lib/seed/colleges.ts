/**
 * Top Indian colleges across engineering, medical, commerce, law, design, arts.
 * NIRF ranks are approximate 2024 positions.
 */

export type SeedCollege = {
  name: string;
  type: "Govt" | "Private";
  country?: string;
  state: string;
  city: string;
  nirfRank?: number;
  globalRank?: number;
  courses: string[];
  fees: { min: number; max: number };
  website?: string;
  admissionLink?: string;
  hostel: boolean;
  highlights?: string[];
};

export const COLLEGES: SeedCollege[] = [
  /* IITs (top engineering) */
  { name: "IIT Madras", type: "Govt", state: "Tamil Nadu", city: "Chennai", nirfRank: 1, courses: ["B.Tech", "M.Tech", "PhD"], fees: { min: 250_000, max: 1_000_000 }, website: "https://www.iitm.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Delhi", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 2, courses: ["B.Tech", "M.Tech", "MBA", "PhD"], fees: { min: 250_000, max: 1_200_000 }, website: "https://home.iitd.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Bombay", type: "Govt", state: "Maharashtra", city: "Mumbai", nirfRank: 3, courses: ["B.Tech", "M.Tech", "B.Des", "PhD"], fees: { min: 250_000, max: 1_200_000 }, website: "https://www.iitb.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Kanpur", type: "Govt", state: "Uttar Pradesh", city: "Kanpur", nirfRank: 4, courses: ["B.Tech", "M.Tech", "PhD"], fees: { min: 250_000, max: 1_000_000 }, website: "https://www.iitk.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Kharagpur", type: "Govt", state: "West Bengal", city: "Kharagpur", nirfRank: 5, courses: ["B.Tech", "Law", "MBA", "PhD"], fees: { min: 250_000, max: 1_100_000 }, website: "https://www.iitkgp.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Roorkee", type: "Govt", state: "Uttarakhand", city: "Roorkee", nirfRank: 6, courses: ["B.Tech", "B.Arch", "M.Tech"], fees: { min: 250_000, max: 1_000_000 }, website: "https://www.iitr.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Guwahati", type: "Govt", state: "Assam", city: "Guwahati", nirfRank: 7, courses: ["B.Tech", "B.Des", "M.Tech"], fees: { min: 250_000, max: 1_000_000 }, website: "https://www.iitg.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },
  { name: "IIT Hyderabad", type: "Govt", state: "Telangana", city: "Hyderabad", nirfRank: 8, courses: ["B.Tech", "M.Tech", "PhD"], fees: { min: 250_000, max: 1_000_000 }, website: "https://www.iith.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true },

  /* NITs */
  { name: "NIT Trichy", type: "Govt", state: "Tamil Nadu", city: "Tiruchirappalli", nirfRank: 9, courses: ["B.Tech", "M.Tech", "MCA"], fees: { min: 150_000, max: 600_000 }, website: "https://www.nitt.edu", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Surathkal", type: "Govt", state: "Karnataka", city: "Mangalore", nirfRank: 13, courses: ["B.Tech", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://www.nitk.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Warangal", type: "Govt", state: "Telangana", city: "Warangal", nirfRank: 21, courses: ["B.Tech", "M.Tech"], fees: { min: 150_000, max: 600_000 }, website: "https://www.nitw.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },

  /* IIITs */
  { name: "IIIT Hyderabad", type: "Govt", state: "Telangana", city: "Hyderabad", nirfRank: 17, courses: ["B.Tech CS", "MS by Research"], fees: { min: 350_000, max: 1_300_000 }, website: "https://www.iiit.ac.in", admissionLink: "https://www.iiit.ac.in", hostel: true },

  /* Private engineering */
  { name: "BITS Pilani", type: "Private", state: "Rajasthan", city: "Pilani", nirfRank: 25, courses: ["B.E.", "MSc", "MBA"], fees: { min: 1_500_000, max: 2_200_000 }, website: "https://www.bits-pilani.ac.in", admissionLink: "https://bitsadmission.com", hostel: true },
  { name: "VIT Vellore", type: "Private", state: "Tamil Nadu", city: "Vellore", nirfRank: 11, courses: ["B.Tech", "M.Tech", "MBA"], fees: { min: 200_000, max: 1_000_000 }, website: "https://vit.ac.in", admissionLink: "https://viteee.vit.ac.in", hostel: true },
  { name: "Manipal Institute of Technology", type: "Private", state: "Karnataka", city: "Manipal", courses: ["B.Tech", "M.Tech"], fees: { min: 380_000, max: 1_500_000 }, website: "https://manipal.edu/mit.html", admissionLink: "https://manipal.edu", hostel: true },

  /* Medical */
  { name: "AIIMS Delhi", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 1, courses: ["MBBS", "MD", "MS", "B.Sc Nursing"], fees: { min: 6_500, max: 50_000 }, website: "https://www.aiims.edu", admissionLink: "https://www.aiimsexams.ac.in", hostel: true },
  { name: "CMC Vellore", type: "Private", state: "Tamil Nadu", city: "Vellore", nirfRank: 3, courses: ["MBBS", "MD", "BPT"], fees: { min: 50_000, max: 300_000 }, website: "https://www.cmch-vellore.edu", admissionLink: "https://admissions.cmcvellore.ac.in", hostel: true },
  { name: "AFMC Pune", type: "Govt", state: "Maharashtra", city: "Pune", nirfRank: 9, courses: ["MBBS"], fees: { min: 0, max: 0 }, website: "https://afmc.nic.in", admissionLink: "https://afmc.nic.in", hostel: true },
  { name: "JIPMER Puducherry", type: "Govt", state: "Puducherry", city: "Puducherry", nirfRank: 8, courses: ["MBBS", "MD", "MS"], fees: { min: 5_000, max: 30_000 }, website: "https://www.jipmer.edu.in", admissionLink: "https://www.jipmer.edu.in", hostel: true },
  { name: "Maulana Azad Medical College", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 7, courses: ["MBBS", "MD", "MS"], fees: { min: 2_000, max: 25_000 }, website: "https://www.mamc.ac.in", admissionLink: "https://mcc.nic.in", hostel: true },

  /* IIMs (MBA) */
  { name: "IIM Ahmedabad", type: "Govt", state: "Gujarat", city: "Ahmedabad", nirfRank: 1, courses: ["PGP (MBA)", "Executive MBA", "PhD"], fees: { min: 2_500_000, max: 3_000_000 }, website: "https://www.iima.ac.in", admissionLink: "https://iimcat.ac.in", hostel: true },
  { name: "IIM Bangalore", type: "Govt", state: "Karnataka", city: "Bangalore", nirfRank: 2, courses: ["MBA", "EPGP"], fees: { min: 2_500_000, max: 3_200_000 }, website: "https://www.iimb.ac.in", admissionLink: "https://iimcat.ac.in", hostel: true },
  { name: "IIM Calcutta", type: "Govt", state: "West Bengal", city: "Kolkata", nirfRank: 3, courses: ["MBA"], fees: { min: 2_500_000, max: 3_000_000 }, website: "https://www.iimcal.ac.in", admissionLink: "https://iimcat.ac.in", hostel: true },
  { name: "ISB Hyderabad", type: "Private", state: "Telangana", city: "Hyderabad", courses: ["PGP (MBA)"], fees: { min: 4_000_000, max: 4_700_000 }, website: "https://www.isb.edu", admissionLink: "https://www.isb.edu", hostel: true },

  /* Law */
  { name: "NLSIU Bangalore", type: "Govt", state: "Karnataka", city: "Bangalore", nirfRank: 1, courses: ["BA LLB", "LLM"], fees: { min: 250_000, max: 300_000 }, website: "https://www.nls.ac.in", admissionLink: "https://consortiumofnlus.ac.in", hostel: true },
  { name: "NALSAR Hyderabad", type: "Govt", state: "Telangana", city: "Hyderabad", nirfRank: 2, courses: ["BA LLB", "LLM"], fees: { min: 250_000, max: 290_000 }, website: "https://www.nalsar.ac.in", admissionLink: "https://consortiumofnlus.ac.in", hostel: true },
  { name: "NLU Delhi", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 3, courses: ["BA LLB", "LLM"], fees: { min: 150_000, max: 280_000 }, website: "https://nludelhi.ac.in", admissionLink: "https://nationallawuniversitydelhi.in", hostel: true },

  /* Commerce / Arts (DU & others) */
  { name: "SRCC (Delhi University)", type: "Govt", state: "Delhi", city: "New Delhi", nirfRank: 1, courses: ["B.Com (Hons)", "B.A. Economics"], fees: { min: 50_000, max: 150_000 }, website: "https://www.srcc.edu", admissionLink: "https://cuet.nta.nic.in", hostel: true },
  { name: "Hindu College (DU)", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.A.", "B.Sc.", "B.Com"], fees: { min: 30_000, max: 80_000 }, website: "https://www.hinducollege.ac.in", admissionLink: "https://cuet.nta.nic.in", hostel: true },
  { name: "St. Stephen's College (DU)", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.A.", "B.Sc."], fees: { min: 40_000, max: 110_000 }, website: "https://www.ststephens.edu", admissionLink: "https://www.ststephens.edu", hostel: true },
  { name: "Loyola College", type: "Private", state: "Tamil Nadu", city: "Chennai", courses: ["B.A.", "B.Com", "B.Sc."], fees: { min: 30_000, max: 150_000 }, website: "https://www.loyolacollege.edu", admissionLink: "https://www.loyolacollege.edu", hostel: true },
  { name: "Christ University", type: "Private", state: "Karnataka", city: "Bangalore", courses: ["BBA", "B.Com", "B.A.", "M.Sc Psych"], fees: { min: 150_000, max: 500_000 }, website: "https://christuniversity.in", admissionLink: "https://christuniversity.in", hostel: true },

  /* Design */
  { name: "NID Ahmedabad", type: "Govt", state: "Gujarat", city: "Ahmedabad", courses: ["B.Des", "M.Des"], fees: { min: 350_000, max: 800_000 }, website: "https://www.nid.edu", admissionLink: "https://admissions.nid.edu", hostel: true },
  { name: "NIFT Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["B.Des Fashion", "M.Des"], fees: { min: 350_000, max: 1_000_000 }, website: "https://nift.ac.in/delhi", admissionLink: "https://www.nift.ac.in", hostel: true },
  { name: "Srishti Manipal Institute", type: "Private", state: "Karnataka", city: "Bangalore", courses: ["B.Des"], fees: { min: 500_000, max: 900_000 }, website: "https://srishtimanipalinstitute.in", admissionLink: "https://srishtimanipalinstitute.in", hostel: true },

  /* Research / Science */
  { name: "IISc Bangalore", type: "Govt", state: "Karnataka", city: "Bangalore", nirfRank: 1, courses: ["UG", "MS", "PhD"], fees: { min: 80_000, max: 150_000 }, website: "https://www.iisc.ac.in", admissionLink: "https://www.iisc.ac.in/admissions", hostel: true },
  { name: "IISER Pune", type: "Govt", state: "Maharashtra", city: "Pune", courses: ["BS-MS dual", "PhD"], fees: { min: 35_000, max: 80_000 }, website: "https://www.iiserpune.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true },
  { name: "ISI Kolkata", type: "Govt", state: "West Bengal", city: "Kolkata", courses: ["B.Stat", "B.Math", "M.Stat"], fees: { min: 6_000, max: 30_000 }, website: "https://www.isical.ac.in", admissionLink: "https://www.isical.ac.in/admission", hostel: true },
  { name: "CMI Chennai", type: "Private", state: "Tamil Nadu", city: "Chennai", courses: ["B.Sc Math/CS", "MSc"], fees: { min: 80_000, max: 200_000 }, website: "https://www.cmi.ac.in", admissionLink: "https://www.cmi.ac.in/admissions", hostel: true },

  /* Govt institutes — IIMC / FTII */
  { name: "IIMC Delhi", type: "Govt", state: "Delhi", city: "New Delhi", courses: ["PG Diploma Journalism", "Radio & TV"], fees: { min: 90_000, max: 110_000 }, website: "https://iimc.gov.in", admissionLink: "https://iimc.gov.in", hostel: true },
  { name: "FTII Pune", type: "Govt", state: "Maharashtra", city: "Pune", courses: ["Film direction", "Cinematography", "Acting"], fees: { min: 200_000, max: 700_000 }, website: "https://www.ftiindia.com", admissionLink: "https://www.ftiindia.com", hostel: true },

  /* Liberal arts (newer) */
  { name: "Ashoka University", type: "Private", state: "Haryana", city: "Sonipat", courses: ["BA / BSc Liberal Arts", "MA"], fees: { min: 950_000, max: 1_100_000 }, website: "https://www.ashoka.edu.in", admissionLink: "https://www.ashoka.edu.in/admissions", hostel: true },
  { name: "Krea University", type: "Private", state: "Andhra Pradesh", city: "Sri City", courses: ["BA / BSc Liberal Arts"], fees: { min: 800_000, max: 1_000_000 }, website: "https://krea.edu.in", admissionLink: "https://krea.edu.in", hostel: true },

  /* ─── KERALA ─── */
  { name: "IIT Palakkad", type: "Govt", country: "India", state: "Kerala", city: "Palakkad", nirfRank: 48, courses: ["B.Tech", "M.Tech", "PhD"], fees: { min: 250_000, max: 900_000 }, website: "https://iitpkd.ac.in", admissionLink: "https://jeeadv.ac.in", hostel: true, highlights: ["Newest-gen IIT", "Strong on data science + AI"] },
  { name: "IIM Kozhikode", type: "Govt", country: "India", state: "Kerala", city: "Kozhikode", nirfRank: 6, courses: ["PGP (MBA)", "EPGP", "PhD"], fees: { min: 2_300_000, max: 2_900_000 }, website: "https://www.iimk.ac.in", admissionLink: "https://iimcat.ac.in", hostel: true, highlights: ["Top-6 IIM by NIRF", "Most scenic IIM campus"] },
  { name: "IISER Thiruvananthapuram", type: "Govt", country: "India", state: "Kerala", city: "Thiruvananthapuram", courses: ["BS-MS dual", "PhD"], fees: { min: 35_000, max: 80_000 }, website: "https://www.iisertvm.ac.in", admissionLink: "https://www.iiseradmission.in", hostel: true, highlights: ["Research-first integrated MS path"] },
  { name: "NIT Calicut", type: "Govt", country: "India", state: "Kerala", city: "Kozhikode", nirfRank: 23, courses: ["B.Tech", "M.Tech", "MBA"], fees: { min: 150_000, max: 600_000 }, website: "https://nitc.ac.in", admissionLink: "https://josaa.nic.in", hostel: true, highlights: ["Best NIT in South for placements"] },
  { name: "IIST Thiruvananthapuram", type: "Govt", country: "India", state: "Kerala", city: "Thiruvananthapuram", courses: ["B.Tech Aerospace", "B.Tech Avionics", "Dual degree"], fees: { min: 200_000, max: 600_000 }, website: "https://www.iist.ac.in", admissionLink: "https://www.iist.ac.in/admissions", hostel: true, highlights: ["Feeder to ISRO — assured placements", "Only space tech UG institute in India"] },
  { name: "IIIT Kottayam", type: "Govt", country: "India", state: "Kerala", city: "Kottayam", courses: ["B.Tech CSE", "B.Tech ECE", "M.Tech"], fees: { min: 200_000, max: 700_000 }, website: "https://iiitkottayam.ac.in", admissionLink: "https://josaa.nic.in", hostel: true },
  { name: "NIT Calicut LAW (NUALS Kochi)", type: "Govt", country: "India", state: "Kerala", city: "Kochi", courses: ["BA LLB", "LLM"], fees: { min: 100_000, max: 200_000 }, website: "https://nuals.ac.in", admissionLink: "https://consortiumofnlus.ac.in", hostel: true, highlights: ["Kerala's only NLU"] },
  { name: "College of Engineering Trivandrum (CET)", type: "Govt", country: "India", state: "Kerala", city: "Thiruvananthapuram", courses: ["B.Tech", "M.Tech", "MBA"], fees: { min: 30_000, max: 150_000 }, website: "https://www.cet.ac.in", admissionLink: "https://www.cee-kerala.org", hostel: true, highlights: ["Oldest engineering college in Kerala (1939)", "Best Govt placement after IITs/NITs in state"] },
  { name: "Government Engineering College Thrissur", type: "Govt", country: "India", state: "Kerala", city: "Thrissur", courses: ["B.Tech", "M.Tech"], fees: { min: 30_000, max: 150_000 }, website: "https://www.gectcr.ac.in", admissionLink: "https://www.cee-kerala.org", hostel: true },
  { name: "Rajagiri School of Engineering & Technology", type: "Private", country: "India", state: "Kerala", city: "Kochi", courses: ["B.Tech", "MBA"], fees: { min: 150_000, max: 400_000 }, website: "https://rajagiritech.ac.in", admissionLink: "https://www.cee-kerala.org", hostel: true },
  { name: "AIIMS Kalyani (Kerala-adjacent option)", type: "Govt", country: "India", state: "Kerala", city: "Thiruvananthapuram (proposed AIIMS)", courses: ["MBBS", "MD"], fees: { min: 5_000, max: 30_000 }, website: "https://aiimskannur.in", admissionLink: "https://mcc.nic.in", hostel: true, highlights: ["AIIMS Kannur under setup", "AIIMS-level free education"] },
  { name: "Government Medical College Thiruvananthapuram", type: "Govt", country: "India", state: "Kerala", city: "Thiruvananthapuram", courses: ["MBBS", "MD", "MS", "BDS"], fees: { min: 30_000, max: 100_000 }, website: "https://www.tmckerala.com", admissionLink: "https://mcc.nic.in", hostel: true, highlights: ["Among India's top govt medical colleges", "Sub-AIIMS quality"] },
  { name: "Government Medical College Kozhikode", type: "Govt", country: "India", state: "Kerala", city: "Kozhikode", courses: ["MBBS", "MD", "MS"], fees: { min: 30_000, max: 100_000 }, website: "https://www.gmckkd.ac.in", admissionLink: "https://mcc.nic.in", hostel: true },
  { name: "Amrita Vishwa Vidyapeetham (Amritapuri)", type: "Private", country: "India", state: "Kerala", city: "Kollam", nirfRank: 21, courses: ["B.Tech", "MBBS", "M.Tech", "MBA"], fees: { min: 250_000, max: 1_100_000 }, website: "https://www.amrita.edu", admissionLink: "https://www.amrita.edu/admissions", hostel: true, highlights: ["Top-25 NIRF private university", "Strong on AI + research"] },
  { name: "Cochin University of Science & Tech (CUSAT)", type: "Govt", country: "India", state: "Kerala", city: "Kochi", courses: ["B.Tech", "M.Tech", "M.Sc", "LLB"], fees: { min: 50_000, max: 250_000 }, website: "https://cusat.ac.in", admissionLink: "https://admissions.cusat.ac.in", hostel: true, highlights: ["Marine biology + ocean engg are flagship", "Affordable & research-strong"] },
  { name: "St Joseph's College Devagiri (Calicut)", type: "Private", country: "India", state: "Kerala", city: "Kozhikode", courses: ["BA", "BSc", "B.Com", "M.Sc"], fees: { min: 30_000, max: 100_000 }, website: "https://www.devagiricollege.org", admissionLink: "https://cuet.nta.nic.in", hostel: true },
  { name: "Sree Sankaracharya University of Sanskrit", type: "Govt", country: "India", state: "Kerala", city: "Kalady", courses: ["BA Sanskrit", "MA", "Indology"], fees: { min: 20_000, max: 50_000 }, website: "https://www.ssus.ac.in", admissionLink: "https://www.ssus.ac.in/admissions", hostel: true, highlights: ["Niche for Sanskrit + Indian philosophy"] },

  /* ─── ABROAD: USA ─── */
  { name: "Massachusetts Institute of Technology (MIT)", type: "Private", country: "USA", state: "Massachusetts", city: "Cambridge", globalRank: 1, courses: ["BS", "MS", "PhD across STEM"], fees: { min: 5_500_000, max: 6_500_000 }, website: "https://www.mit.edu", admissionLink: "https://mitadmissions.org", hostel: true, highlights: ["#1 QS world rank", "Heavy financial aid for international students"] },
  { name: "Stanford University", type: "Private", country: "USA", state: "California", city: "Stanford", globalRank: 3, courses: ["BS / MS / PhD", "MBA (GSB)"], fees: { min: 5_500_000, max: 6_800_000 }, website: "https://www.stanford.edu", admissionLink: "https://admission.stanford.edu", hostel: true, highlights: ["Silicon Valley access", "Need-blind admissions for US, generous aid for intl"] },
  { name: "Harvard University", type: "Private", country: "USA", state: "Massachusetts", city: "Cambridge", globalRank: 4, courses: ["AB / BS", "MS / PhD", "MBA / JD / MD"], fees: { min: 5_500_000, max: 7_500_000 }, website: "https://www.harvard.edu", admissionLink: "https://college.harvard.edu/admissions", hostel: true, highlights: ["Need-blind for all", "Free if family income < $85K"] },
  { name: "Carnegie Mellon University (CMU)", type: "Private", country: "USA", state: "Pennsylvania", city: "Pittsburgh", globalRank: 52, courses: ["BS CS", "MS / MBA", "BFA"], fees: { min: 5_000_000, max: 6_500_000 }, website: "https://www.cmu.edu", admissionLink: "https://admission.enrollment.cmu.edu", hostel: true, highlights: ["#1 CS school in US", "Strong in AI, robotics, drama"] },
  { name: "UC Berkeley", type: "Govt", country: "USA", state: "California", city: "Berkeley", globalRank: 12, courses: ["BS / BA", "MS / PhD", "MBA (Haas)"], fees: { min: 3_800_000, max: 4_800_000 }, website: "https://www.berkeley.edu", admissionLink: "https://admissions.berkeley.edu", hostel: true, highlights: ["Top public uni in US", "Bay Area tech pipeline"] },

  /* ─── ABROAD: UK ─── */
  { name: "University of Oxford", type: "Govt", country: "UK", state: "England", city: "Oxford", globalRank: 2, courses: ["BA", "MSc", "DPhil", "Law / Medicine"], fees: { min: 3_500_000, max: 5_500_000 }, website: "https://www.ox.ac.uk", admissionLink: "https://www.ox.ac.uk/admissions", hostel: true, highlights: ["Tutorial system (1-on-1 teaching)", "Strong intl scholarships (Rhodes, Clarendon)"] },
  { name: "University of Cambridge", type: "Govt", country: "UK", state: "England", city: "Cambridge", globalRank: 5, courses: ["BA / Tripos", "MPhil / PhD"], fees: { min: 3_500_000, max: 5_500_000 }, website: "https://www.cam.ac.uk", admissionLink: "https://www.undergraduate.study.cam.ac.uk", hostel: true, highlights: ["Strongest in math + natural sciences", "Gates Cambridge scholarship for intl"] },
  { name: "Imperial College London", type: "Govt", country: "UK", state: "England", city: "London", globalRank: 6, courses: ["BEng / MSci", "MBA", "Medicine"], fees: { min: 3_800_000, max: 5_500_000 }, website: "https://www.imperial.ac.uk", admissionLink: "https://www.imperial.ac.uk/study/apply", hostel: true, highlights: ["Pure STEM focus", "London location for finance + biotech"] },

  /* ─── ABROAD: CANADA ─── */
  { name: "University of Toronto", type: "Govt", country: "Canada", state: "Ontario", city: "Toronto", globalRank: 21, courses: ["BS / BA", "MS / PhD"], fees: { min: 3_500_000, max: 5_500_000 }, website: "https://www.utoronto.ca", admissionLink: "https://future.utoronto.ca", hostel: true, highlights: ["PR-friendly path (PGWP)", "AI hub (Vector Institute)"] },
  { name: "University of Waterloo", type: "Govt", country: "Canada", state: "Ontario", city: "Waterloo", globalRank: 110, courses: ["BS CS", "BMath", "BEng"], fees: { min: 2_500_000, max: 3_800_000 }, website: "https://uwaterloo.ca", admissionLink: "https://uwaterloo.ca/future-students", hostel: true, highlights: ["Famous co-op program", "Top feeder to Big Tech in North America"] },
  { name: "McGill University", type: "Govt", country: "Canada", state: "Quebec", city: "Montreal", globalRank: 30, courses: ["BSc / BA", "MD", "MSc"], fees: { min: 2_500_000, max: 4_500_000 }, website: "https://www.mcgill.ca", admissionLink: "https://www.mcgill.ca/undergraduate-admissions", hostel: true, highlights: ["Lower cost vs US Ivy", "Strong in life sciences"] },

  /* ─── ABROAD: SINGAPORE ─── */
  { name: "National University of Singapore (NUS)", type: "Govt", country: "Singapore", state: "Singapore", city: "Singapore", globalRank: 8, courses: ["BS / BA", "MS / PhD"], fees: { min: 2_000_000, max: 3_800_000 }, website: "https://www.nus.edu.sg", admissionLink: "https://www.nus.edu.sg/oam", hostel: true, highlights: ["Top in Asia by QS", "Strong financial aid for ASEAN/India"] },
  { name: "Nanyang Technological University (NTU)", type: "Govt", country: "Singapore", state: "Singapore", city: "Singapore", globalRank: 15, courses: ["BS / BEng", "MS / PhD"], fees: { min: 2_000_000, max: 3_500_000 }, website: "https://www.ntu.edu.sg", admissionLink: "https://www.ntu.edu.sg/admissions", hostel: true },

  /* ─── ABROAD: GERMANY ─── */
  { name: "Technical University of Munich (TUM)", type: "Govt", country: "Germany", state: "Bavaria", city: "Munich", globalRank: 28, courses: ["BSc / MSc / PhD", "Engineering"], fees: { min: 150_000, max: 350_000 }, website: "https://www.tum.de", admissionLink: "https://www.tum.de/en/studies", hostel: true, highlights: ["Almost free tuition (~€144/sem)", "Top engineering in Europe"] },
  { name: "RWTH Aachen", type: "Govt", country: "Germany", state: "North Rhine-Westphalia", city: "Aachen", globalRank: 99, courses: ["BSc / MSc Mechanical, Electrical, CS"], fees: { min: 100_000, max: 300_000 }, website: "https://www.rwth-aachen.de", admissionLink: "https://www.rwth-aachen.de/admission", hostel: true, highlights: ["German automotive industry pipeline", "Very affordable for STEM"] },

  /* ─── ABROAD: AUSTRALIA ─── */
  { name: "University of Melbourne", type: "Govt", country: "Australia", state: "Victoria", city: "Melbourne", globalRank: 13, courses: ["BSc / BA / MD", "MS / PhD"], fees: { min: 2_800_000, max: 4_500_000 }, website: "https://www.unimelb.edu.au", admissionLink: "https://study.unimelb.edu.au", hostel: true, highlights: ["#1 in Australia", "Strong PR pathway"] },
  { name: "University of Sydney", type: "Govt", country: "Australia", state: "New South Wales", city: "Sydney", globalRank: 19, courses: ["BSc / BA", "MS", "MBBS"], fees: { min: 2_800_000, max: 4_500_000 }, website: "https://www.sydney.edu.au", admissionLink: "https://www.sydney.edu.au/study", hostel: true },

  /* ─── ABROAD: NETHERLANDS / EU ─── */
  { name: "TU Delft", type: "Govt", country: "Netherlands", state: "South Holland", city: "Delft", globalRank: 47, courses: ["BSc / MSc Engineering"], fees: { min: 1_700_000, max: 2_500_000 }, website: "https://www.tudelft.nl", admissionLink: "https://www.tudelft.nl/en/education", hostel: false, highlights: ["English-taught masters", "Engineering powerhouse"] },
];
