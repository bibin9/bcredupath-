/**
 * Score careers against a user's interest tags. Simple Holland-Code-style
 * overlap with primary-tag weighting.
 */

import type { ICareer } from "@/models/Career";

export type MatchResult = {
  career: ICareer;
  score: number; // 0..1
  matchedTags: string[];
};

/**
 * Compute a fit score for a career given user interest tags + preferred subjects.
 *
 * Uses F1-style harmonic mean of precision (career-fit) and recall (user-fit)
 * for the interest component, so:
 *   • broad careers with many tags aren't unfairly penalised by 1/N
 *   • a user with many interests still gets a sharp differentiation between
 *     careers that match them tightly vs. loosely
 *
 *   precision = matched / career.interestTags.length     (how much of the role fits user)
 *   recall    = matched / user.interestTags.size         (how well user is served)
 *   interest_F1 = 2·P·R / (P+R)
 *
 *   subject_F1 = same recipe on preferredSubjects ∩ user.subjects
 *
 * Final blend:
 *   • both signals present  → 0.6 · interest_F1 + 0.4 · subject_F1
 *   • only interests        → interest_F1
 *   • only subjects         → subject_F1
 *
 * Plus a small bonus (+0.05 capped at 1.0) if the career has ≥ 3 matched
 * interest tags — rewards careers that hit multiple distinct facets of the
 * student's profile.
 *
 * Tags beginning with `q:` are quiz-question IDs from onboarding — ignored.
 */
function f1(matched: number, careerLen: number, userLen: number): number {
  if (matched === 0 || careerLen === 0 || userLen === 0) return 0;
  const precision = matched / careerLen;
  const recall = matched / userLen;
  return (2 * precision * recall) / (precision + recall);
}

export function scoreCareer(
  career: Pick<ICareer, "interestTags" | "preferredSubjects">,
  userInterests: string[],
  userSubjects: string[] = []
): MatchResult["score"] {
  const userTags = new Set(userInterests.filter((t) => !t.startsWith("q:")));
  if (userTags.size === 0 && userSubjects.length === 0) return 0;

  // Interest component
  const interestMatched = career.interestTags.filter((t) => userTags.has(t)).length;
  const interestF1 = f1(interestMatched, career.interestTags.length, userTags.size);

  // Subject component
  const careerSubjects = career.preferredSubjects ?? [];
  const subjectsLC = new Set(userSubjects.map((s) => s.toLowerCase()));
  const subjectMatched = careerSubjects.filter((s) => subjectsLC.has(s.toLowerCase())).length;
  const subjectF1 = f1(subjectMatched, careerSubjects.length, userSubjects.length);

  const haveSubjects = userSubjects.length > 0 && careerSubjects.length > 0;
  const haveInterests = userTags.size > 0 && career.interestTags.length > 0;

  let blended = 0;
  if (haveSubjects && haveInterests) {
    blended = 0.6 * interestF1 + 0.4 * subjectF1;
  } else if (haveSubjects) {
    blended = subjectF1;
  } else {
    blended = interestF1;
  }

  // Reward careers that hit ≥3 distinct interest facets
  if (interestMatched >= 3) blended = Math.min(1, blended + 0.05);
  if (interestMatched >= 5) blended = Math.min(1, blended + 0.05);

  return blended;
}

export function matchedTagsFor(
  career: Pick<ICareer, "interestTags">,
  userInterests: string[]
): string[] {
  const userTags = new Set(userInterests.filter((t) => !t.startsWith("q:")));
  return career.interestTags.filter((t) => userTags.has(t));
}

export function rankCareers<T extends Pick<ICareer, "interestTags" | "preferredSubjects">>(
  careers: T[],
  userInterests: string[],
  userSubjects: string[] = []
): Array<{ career: T; score: number; matchedTags: string[] }> {
  return careers
    .map((c) => ({
      career: c,
      score: scoreCareer(c, userInterests, userSubjects),
      matchedTags: matchedTagsFor(c, userInterests),
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Subject options the student picks during the career quiz.
 * Match IDs to career.preferredSubjects.
 */
export const SUBJECT_OPTIONS = [
  { id: "math", label: "Mathematics", emoji: "📐" },
  { id: "physics", label: "Physics", emoji: "⚛️" },
  { id: "chemistry", label: "Chemistry", emoji: "🧪" },
  { id: "biology", label: "Biology", emoji: "🧬" },
  { id: "computer science", label: "Computer Science", emoji: "💻" },
  { id: "economics", label: "Economics", emoji: "📈" },
  { id: "accountancy", label: "Accountancy", emoji: "📒" },
  { id: "psychology", label: "Psychology", emoji: "🧠" },
  { id: "history", label: "History", emoji: "🏛️" },
  { id: "english", label: "English / Literature", emoji: "📖" },
  { id: "geography", label: "Geography", emoji: "🗺️" },
  { id: "political science", label: "Political Science", emoji: "⚖️" },
] as const;

/**
 * Expanded career interest quiz (20 questions). Used by /dashboard/careers/quiz.
 * Each question maps the swipe-yes answer to a set of interest tags.
 */
export const CAREER_QUIZ = [
  { id: "cq1", text: "I lose track of time solving math or logic puzzles", emoji: "🧮", tags: ["math", "logic", "engineering"] },
  { id: "cq2", text: "I'd happily spend a weekend coding a side project", emoji: "💻", tags: ["tech", "cs", "engineering"] },
  { id: "cq3", text: "Building physical things (robots, furniture, gadgets) is satisfying", emoji: "🔧", tags: ["engineering", "tech"] },
  { id: "cq4", text: "I find biology — how organs work, ecosystems — fascinating", emoji: "🧬", tags: ["biology", "research"] },
  { id: "cq5", text: "Helping someone in physical pain feels meaningful", emoji: "🩺", tags: ["medical", "biology", "social"] },
  { id: "cq6", text: "I'd want to dissect why people behave the way they do", emoji: "🧠", tags: ["psychology", "social", "research"] },
  { id: "cq7", text: "I follow stock markets, startup news, or business deals", emoji: "📈", tags: ["finance", "commerce", "economics"] },
  { id: "cq8", text: "Negotiating and persuading people energizes me", emoji: "🤝", tags: ["commerce", "law", "management"] },
  { id: "cq9", text: "Running my own thing > climbing a corporate ladder", emoji: "🚀", tags: ["entrepreneur", "commerce", "creative"] },
  { id: "cq10", text: "I'd argue about politics, ethics, or society for hours", emoji: "⚖️", tags: ["law", "humanities", "social"] },
  { id: "cq11", text: "I notice when a poster, website, or product looks ugly", emoji: "🎨", tags: ["design", "creative", "media"] },
  { id: "cq12", text: "I sketch, write, paint, or shoot videos in my free time", emoji: "✏️", tags: ["creative", "media", "design"] },
  { id: "cq13", text: "I'd love to direct films, write books, or make music", emoji: "🎬", tags: ["media", "creative"] },
  { id: "cq14", text: "Pure science — physics laws, math theorems — excites me", emoji: "🔬", tags: ["research", "math"] },
  { id: "cq15", text: "I imagine myself working at NASA or ISRO one day", emoji: "🚀", tags: ["research", "engineering", "tech"] },
  { id: "cq16", text: "I'd thrive in a uniform — military, navy, air force", emoji: "🪖", tags: ["humanities", "social"] },
  { id: "cq17", text: "I want to serve the country through civil services", emoji: "🇮🇳", tags: ["social", "humanities", "law", "management"] },
  { id: "cq18", text: "Travel, hospitality, or running a hotel sounds exciting", emoji: "🏨", tags: ["commerce", "social", "management"] },
  { id: "cq19", text: "I'd teach for the joy of seeing someone learn", emoji: "🎓", tags: ["social", "humanities"] },
  { id: "cq20", text: "I want to build AI/ML systems or work in research labs", emoji: "🤖", tags: ["math", "tech", "cs", "research", "logic"] },

  /* ─── Specialty differentiators (10 extra Qs) ─── */
  { id: "cq21", text: "Hearts, lungs, surgery — the body's inner workings amaze me", emoji: "🫀", tags: ["surgery", "medical", "biology", "anatomy"] },
  { id: "cq22", text: "I'd specialise in mental health and brains over physical injury", emoji: "🧠", tags: ["mental-health", "psychology", "neuro", "medical"] },
  { id: "cq23", text: "Working with kids matters more to me than working with adults", emoji: "👶", tags: ["children", "pediatric", "education", "social"] },
  { id: "cq24", text: "I'd love to work in agriculture, food systems, or rural India", emoji: "🌾", tags: ["agriculture", "rural", "biology", "social"] },
  { id: "cq25", text: "Flying planes, ships, or operating big machines sounds incredible", emoji: "✈️", tags: ["aviation", "defense", "engineering", "operations"] },
  { id: "cq26", text: "I want a stable govt job — banking, PSU, civil services", emoji: "🏦", tags: ["govt", "banking", "stable", "commerce"] },
  { id: "cq27", text: "Sustainability and climate change is THE problem of our time", emoji: "🌱", tags: ["climate", "sustainability", "research", "social"] },
  { id: "cq28", text: "I'd happily work in a hospital lab over a patient-facing role", emoji: "🧫", tags: ["lab", "diagnostics", "research", "medical"] },
  { id: "cq29", text: "Numbers and statistics excite me more than abstract math", emoji: "📊", tags: ["stats", "data", "math", "analytics"] },
  { id: "cq30", text: "Fitness, sports, or human performance is my obsession", emoji: "💪", tags: ["fitness", "sports", "health", "biology"] },
] as const;
