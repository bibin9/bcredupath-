/**
 * Currency conversion + formatting.
 *
 * All career salaries / college fees in the DB are stored in INR (the
 * "source of truth"). This module converts to a user's preferred currency
 * for display only — the DB never stores converted values.
 *
 * Rates are deliberately hard-coded snapshot values (May 2026). They're
 * not meant to be precise — we just want students in Dubai to see a
 * sensible AED figure without an external API call. We refresh annually.
 */

export type CurrencyCode =
  | "INR"
  | "USD"
  | "AED"
  | "SAR"
  | "QAR"
  | "OMR"
  | "KWD"
  | "BHD"
  | "SGD"
  | "MYR"
  | "GBP"
  | "EUR"
  | "AUD"
  | "CAD"
  | "NPR";

/** Conversion factor: 1 INR = N units of target currency (snapshot ~May 2026). */
export const INR_TO: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,    //  ₹83 ≈ $1
  AED: 0.044,    //  ₹23 ≈ AED 1
  SAR: 0.045,    //  ₹22 ≈ SAR 1
  QAR: 0.044,    //  ₹23 ≈ QAR 1
  OMR: 0.0046,   //  ₹217 ≈ OMR 1
  KWD: 0.0037,   //  ₹271 ≈ KWD 1
  BHD: 0.0045,   //  ₹220 ≈ BHD 1
  SGD: 0.016,    //  ₹62 ≈ SGD 1
  MYR: 0.057,    //  ₹17.5 ≈ MYR 1
  GBP: 0.0095,   //  ₹105 ≈ GBP 1
  EUR: 0.011,    //  ₹91 ≈ EUR 1
  AUD: 0.019,    //  ₹53 ≈ AUD 1
  CAD: 0.017,    //  ₹59 ≈ CAD 1
  NPR: 1.6,      //  ₹1 ≈ NPR 1.6
};

export const CURRENCY_META: Record<
  CurrencyCode,
  { symbol: string; label: string; flag: string }
> = {
  INR: { symbol: "₹", label: "Indian Rupee", flag: "🇮🇳" },
  USD: { symbol: "$", label: "US Dollar", flag: "🇺🇸" },
  AED: { symbol: "AED ", label: "UAE Dirham", flag: "🇦🇪" },
  SAR: { symbol: "SAR ", label: "Saudi Riyal", flag: "🇸🇦" },
  QAR: { symbol: "QAR ", label: "Qatari Riyal", flag: "🇶🇦" },
  OMR: { symbol: "OMR ", label: "Omani Rial", flag: "🇴🇲" },
  KWD: { symbol: "KWD ", label: "Kuwaiti Dinar", flag: "🇰🇼" },
  BHD: { symbol: "BHD ", label: "Bahraini Dinar", flag: "🇧🇭" },
  SGD: { symbol: "S$", label: "Singapore Dollar", flag: "🇸🇬" },
  MYR: { symbol: "RM ", label: "Malaysian Ringgit", flag: "🇲🇾" },
  GBP: { symbol: "£", label: "British Pound", flag: "🇬🇧" },
  EUR: { symbol: "€", label: "Euro", flag: "🇪🇺" },
  AUD: { symbol: "A$", label: "Australian Dollar", flag: "🇦🇺" },
  CAD: { symbol: "C$", label: "Canadian Dollar", flag: "🇨🇦" },
  NPR: { symbol: "Rs.", label: "Nepalese Rupee", flag: "🇳🇵" },
};

/** Sensible default currency for a given country. */
export function defaultCurrencyForCountry(country: string | null | undefined): CurrencyCode {
  switch (country) {
    case "India": return "INR";
    case "United Arab Emirates": return "AED";
    case "Saudi Arabia": return "SAR";
    case "Qatar": return "QAR";
    case "Oman": return "OMR";
    case "Kuwait": return "KWD";
    case "Bahrain": return "BHD";
    case "Singapore": return "SGD";
    case "Malaysia": return "MYR";
    case "United States": return "USD";
    case "Canada": return "CAD";
    case "United Kingdom": return "GBP";
    case "Australia": return "AUD";
    case "New Zealand": return "AUD";
    case "Germany":
    case "France": return "EUR";
    case "Nepal": return "NPR";
    default: return "USD";
  }
}

export function isCurrency(code: string | null | undefined): code is CurrencyCode {
  return !!code && code in INR_TO;
}

/**
 * Convert INR → target currency.
 */
export function convertFromINR(amountINR: number, to: CurrencyCode): number {
  return amountINR * (INR_TO[to] ?? 1);
}

/**
 * Format a salary (annual, INR-denominated) for display in the user's currency.
 * For large numbers uses local short notation (10L for INR, 100K for USD/AED, etc.).
 */
export function formatSalary(amountINR: number, currency: CurrencyCode = "INR"): string {
  const v = convertFromINR(amountINR, currency);
  const meta = CURRENCY_META[currency];

  if (currency === "INR") {
    // Indian numbering: 1L = 100,000 / 1Cr = 10,000,000
    if (v >= 10_000_000) return `${meta.symbol}${(v / 10_000_000).toFixed(1)}Cr`;
    if (v >= 100_000) return `${meta.symbol}${(v / 100_000).toFixed(1)}L`;
    if (v >= 1_000) return `${meta.symbol}${(v / 1_000).toFixed(0)}K`;
    return `${meta.symbol}${v.toFixed(0)}`;
  }
  if (currency === "NPR") {
    // Nepalese also uses Indian-style lakh/crore
    if (v >= 10_000_000) return `${meta.symbol}${(v / 10_000_000).toFixed(1)}Cr`;
    if (v >= 100_000) return `${meta.symbol}${(v / 100_000).toFixed(1)}L`;
    return `${meta.symbol}${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  }
  // Western: K / M
  if (v >= 1_000_000) return `${meta.symbol}${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `${meta.symbol}${(v / 1_000).toFixed(1)}K`;
  return `${meta.symbol}${v.toFixed(0)}`;
}

/**
 * Format a one-time fee (e.g. college tuition) — same as salary but
 * doesn't say "per year". Caller adds suffix if needed.
 */
export const formatAmount = formatSalary;
