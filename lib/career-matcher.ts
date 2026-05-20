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
 *   interest_score (70% weight) = overlap of interest tags / career.interestTags.length
 *   subject_score  (30% weight) = overlap of subjects   / career.preferredSubjects.length
 *
 * If user picked subjects AND career has preferredSubjects defined, both are
 * blended. Otherwise we fall back to whichever signal we have.
 *
 * Tags beginning with `q:` are quiz-question IDs from onboarding — ignored.
 */
export function scoreCareer(
  career: Pick<ICareer, "interestTags" | "preferredSubjects">,
  userInterests: string[],
  userSubjects: string[] = []
): MatchResult["score"] {
  const userTags = new Set(userInterests.filter((t) => !t.startsWith("q:")));
  if (userTags.size === 0 && userSubjects.length === 0) return 0;

  // Interest component
  const interestOverlap = career.interestTags.filter((t) => userTags.has(t)).length;
  const interestScore =
    career.interestTags.length > 0
      ? interestOverlap / career.interestTags.length
      : 0;

  // Subject component
  const careerSubjects = career.preferredSubjects ?? [];
  const subjectsLC = new Set(userSubjects.map((s) => s.toLowerCase()));
  const subjectOverlap = careerSubjects.filter((s) => subjectsLC.has(s.toLowerCase())).length;
  const subjectScore =
    careerSubjects.length > 0 ? subjectOverlap / careerSubjects.length : 0;

  const haveSubjects = userSubjects.length > 0 && careerSubjects.length > 0;
  if (haveSubjects && userTags.size > 0) {
    return 0.7 * interestScore + 0.3 * subjectScore;
  }
  if (haveSubjects) return subjectScore;
  return interestScore;
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
] as const;
