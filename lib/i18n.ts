/**
 * Lightweight i18n. Not a full route-localized setup — just a shared
 * translation map + helper. Good enough to surface Hindi strings for the
 * highest-traffic surfaces (landing, onboarding, key CTAs).
 *
 * For a full app-wide translation, swap in next-intl with middleware-based
 * locale routing (`app/[locale]/...`). That's a separate sprint of work.
 */

export type Locale = "en" | "hi";
export const LOCALES: { id: Locale; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "hi", label: "हिन्दी", flag: "🇮🇳" },
];

export const DICT: Record<string, Record<Locale, string>> = {
  /* Landing page */
  "landing.tagline": {
    en: "Crack boards like it's a game.",
    hi: "बोर्ड्स को एक खेल की तरह क्रैक करें।",
  },
  "landing.sub": {
    en: "AI predicts what'll be asked. PYQs from a decade. Streaks, XP and a leaderboard.",
    hi: "AI बताता है क्या पूछा जाएगा। एक दशक के PYQs। स्ट्रीक्स, XP और लीडरबोर्ड।",
  },
  "cta.start_free": {
    en: "Start free",
    hi: "मुफ्त शुरू करें",
  },
  "cta.login": {
    en: "Log in",
    hi: "लॉग इन",
  },
  "cta.signup": {
    en: "Get started",
    hi: "शुरू करें",
  },

  /* Dashboard */
  "dashboard.greet.morning": {
    en: "Good morning",
    hi: "सुप्रभात",
  },
  "dashboard.greet.evening": {
    en: "Good evening",
    hi: "शुभ संध्या",
  },
  "dashboard.daily_challenge": {
    en: "Daily Challenge",
    hi: "दैनिक चुनौती",
  },
  "dashboard.streak": {
    en: "streak",
    hi: "स्ट्रीक",
  },
  "dashboard.xp_total": {
    en: "total XP",
    hi: "कुल XP",
  },

  /* Practice */
  "practice.submit": {
    en: "Submit answer",
    hi: "उत्तर सबमिट करें",
  },
  "practice.show_solution": {
    en: "Show solution",
    hi: "उत्तर देखें",
  },
  "practice.next": {
    en: "Next question",
    hi: "अगला प्रश्न",
  },
  "practice.skip": {
    en: "Skip",
    hi: "छोड़ें",
  },

  /* Common */
  "common.loading": {
    en: "Loading…",
    hi: "लोड हो रहा है…",
  },
  "common.error": {
    en: "Something went wrong",
    hi: "कुछ गलत हुआ",
  },
};

/** Lookup a translation. Falls back to English if Hindi missing. */
export function t(key: string, locale: Locale = "en"): string {
  const entry = DICT[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en ?? key;
}
