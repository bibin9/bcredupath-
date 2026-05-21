/**
 * NRI quota seat info for top Indian colleges.
 *
 * Most centrally-funded institutions reserve seats for NRI candidates
 * (Non-Resident Indians + Persons of Indian Origin + Overseas Citizens):
 *   • AIIMS / Govt Medical: ~15% (seperate counselling, NRI-specific cutoff)
 *   • IITs / NITs / IIITs: ~10-15% (CIWG, DASA route)
 *   • IIMs: marginal NRI consideration via GMAT
 *   • NLUs: 15% NRI / supernumerary
 *   • Private medical / engineering colleges: typically 15-25%, higher fees
 *
 * Fees are approximate INR annual values (sourced from official websites
 * for 2024-25 session). They're displayed in user currency via the
 * currency module at render time.
 */

export type NRIQuotaInfo = {
  available: boolean;
  annualFeeINR?: number;
  cutoffNotes?: string;
  seatPercent?: number;
  notes?: string;
};

export const NRI_QUOTA: Record<string, NRIQuotaInfo> = {
  // ─── AIIMS ────────────────────────────────────────────────────────────
  "AIIMS Delhi": {
    available: true,
    annualFeeINR: 1_750_000,
    seatPercent: 7,
    cutoffNotes: "NEET-UG ~50th percentile (vs ~95th for domestic). Separate AIIMS-NRI counselling.",
    notes: "Need NRI passport / OCI / PIO card + sponsor declaration. Apply via AIIMS NRI portal.",
  },
  "AIIMS Bhopal": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 7,
    cutoffNotes: "NEET-UG required; NRI category cutoff is lower than domestic.",
  },
  "AIIMS Jodhpur": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 7,
    cutoffNotes: "NEET-UG required; NRI category cutoff is lower than domestic.",
  },
  "AIIMS Rishikesh": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 7,
    cutoffNotes: "NEET-UG required; NRI category cutoff is lower than domestic.",
  },

  // ─── IITs ─────────────────────────────────────────────────────────────
  "IIT Bombay": {
    available: true,
    annualFeeINR: 3_500_000,
    seatPercent: 10,
    cutoffNotes: "DASA route (no JEE Advanced needed). SAT score (>1450) + good Class 12 marks.",
    notes: "Apply via DASA portal (dasanit.org). Fees in USD: ~$8000-12000/year for NRI.",
  },
  "IIT Delhi": {
    available: true,
    annualFeeINR: 3_500_000,
    seatPercent: 10,
    cutoffNotes: "DASA route via SAT/JEE Main. ~10% supernumerary seats.",
    notes: "Apply via dasanit.org.",
  },
  "IIT Madras": {
    available: true,
    annualFeeINR: 3_500_000,
    seatPercent: 10,
    cutoffNotes: "DASA route via SAT (>1450) + Class 12 marks. No JEE required.",
  },
  "IIT Kanpur": {
    available: true,
    annualFeeINR: 3_500_000,
    seatPercent: 10,
    cutoffNotes: "DASA / CIWG route via SAT or JEE Main.",
  },
  "IIT Kharagpur": {
    available: true,
    annualFeeINR: 3_500_000,
    seatPercent: 10,
    cutoffNotes: "DASA route via SAT or JEE Main scores.",
  },
  "IIT Roorkee": {
    available: true,
    annualFeeINR: 3_500_000,
    seatPercent: 10,
    cutoffNotes: "DASA route via SAT.",
  },
  "IIT Guwahati": {
    available: true,
    annualFeeINR: 3_500_000,
    seatPercent: 10,
    cutoffNotes: "DASA route via SAT or JEE Main.",
  },

  // ─── NITs ─────────────────────────────────────────────────────────────
  "NIT Trichy": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 15,
    cutoffNotes: "DASA route via SAT (>1300) + Class 12. No JEE required.",
    notes: "Apply via DASA portal. ~$5500/year tuition.",
  },
  "NIT Warangal": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 15,
    cutoffNotes: "DASA route via SAT or JEE Main.",
  },
  "NIT Surathkal": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 15,
    cutoffNotes: "DASA route via SAT or JEE Main.",
  },

  // ─── IIITs ────────────────────────────────────────────────────────────
  "IIIT Hyderabad": {
    available: true,
    annualFeeINR: 800_000,
    seatPercent: 10,
    cutoffNotes: "DASA route or direct admission via SAT + Class 12 marks.",
  },
  "IIIT Bangalore": {
    available: true,
    annualFeeINR: 800_000,
    seatPercent: 10,
    cutoffNotes: "SAT score + Class 12 board marks.",
  },

  // ─── BITS ─────────────────────────────────────────────────────────────
  "BITS Pilani": {
    available: true,
    annualFeeINR: 2_000_000,
    seatPercent: 15,
    cutoffNotes: "BITSAT (NRI cutoff lower) OR direct via SAT >1300 + Class 12 marks.",
    notes: "BITS Pilani's NRI seats fill faster than its Indian seats.",
  },
  "BITS Goa": {
    available: true,
    annualFeeINR: 2_000_000,
    seatPercent: 15,
    cutoffNotes: "BITSAT or direct via SAT.",
  },
  "BITS Hyderabad": {
    available: true,
    annualFeeINR: 2_000_000,
    seatPercent: 15,
    cutoffNotes: "BITSAT or direct via SAT.",
  },

  // ─── NLUs ─────────────────────────────────────────────────────────────
  "NLSIU Bangalore": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 15,
    cutoffNotes: "CLAT score required; NRI quota is supernumerary at most NLUs.",
    notes: "Foreign nationals & NRIs apply via separate counselling.",
  },
  "NALSAR Hyderabad": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 15,
    cutoffNotes: "CLAT score; NRI cutoff lower than General.",
  },
  "NLU Delhi": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 15,
    cutoffNotes: "AILET score; ~10% NRI supernumerary seats.",
  },

  // ─── IIMs (for context, mostly post-grad) ─────────────────────────────
  "IIM Ahmedabad": {
    available: true,
    annualFeeINR: 3_200_000,
    seatPercent: 5,
    cutoffNotes: "MBA — GMAT route for NRI candidates (vs CAT for domestic).",
    notes: "Need 3+ years work ex. NRI status doesn't reduce GMAT cutoff much.",
  },
  "IIM Bangalore": {
    available: true,
    annualFeeINR: 3_200_000,
    seatPercent: 5,
    cutoffNotes: "GMAT route for international applicants.",
  },

  // ─── Top Private Medical (high NRI demand) ─────────────────────────────
  "CMC Vellore": {
    available: true,
    annualFeeINR: 5_500_000,
    seatPercent: 20,
    cutoffNotes: "NEET-UG required. NRI counselling separate; admissions interview-heavy.",
    notes: "Strong NRI presence in MBBS batch.",
  },
  "Manipal Academy of Higher Education": {
    available: true,
    annualFeeINR: 6_000_000,
    seatPercent: 25,
    cutoffNotes: "NEET-UG + Manipal's own MET. NRI fees ~$70K for MBBS.",
    notes: "Single largest private medical NRI quota in India.",
  },
  "KMC Manipal": {
    available: true,
    annualFeeINR: 6_000_000,
    seatPercent: 25,
    cutoffNotes: "NEET-UG required.",
  },
  "JIPMER Puducherry": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 7,
    cutoffNotes: "NEET-UG required.",
  },
  "MAMC Delhi": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 7,
    cutoffNotes: "NEET-UG required.",
  },
  "Lady Hardinge Medical College": {
    available: true,
    annualFeeINR: 1_500_000,
    seatPercent: 7,
    cutoffNotes: "NEET-UG required. Women only.",
  },

  // ─── Notable colleges WITHOUT NRI quota (or unavailable) ──────────────
  "Tata Memorial Mumbai": {
    available: false,
    notes: "Post-grad only — DM/MCh; no NRI quota at PG level.",
  },
};

/**
 * Look up NRI quota info by college name. Returns null if not found.
 */
export function getNRIQuota(collegeName: string): NRIQuotaInfo | null {
  return NRI_QUOTA[collegeName] ?? null;
}
