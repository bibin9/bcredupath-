/**
 * Maps Class 10 CBSE chapters to sub-subjects.
 *
 * CBSE Class 10 has unified Science (Physics + Chemistry + Biology) and
 * Social Science (History + Geography + Civics + Economics) papers, but
 * students typically want to practice each strand separately.
 *
 * These maps let `/dashboard/bank/physics` query the existing Science
 * questions filtered to physics chapters, without any DB migration.
 */

export const CLASS_10_SCIENCE_CHAPTERS = {
  physics: [
    "Electricity",
    "Magnetic Effects of Electric Current",
    "Light - Reflection and Refraction",
    "The Human Eye and the Colourful World",
    "Sources of Energy",
  ],
  chemistry: [
    "Acids, Bases and Salts",
    "Carbon and its Compounds",
    "Chemical Reactions and Equations",
    "Metals and Non-metals",
    "Periodic Classification of Elements",
  ],
  biology: [
    "Control and Coordination",
    "Heredity",
    "How do Organisms Reproduce",
    "Life Processes",
    "Our Environment",
    "Management of Natural Resources",
  ],
} as const;

export const CLASS_10_SST_CHAPTERS = {
  history: [
    "Nationalism in India",
    "Rise of Nationalism in Europe",
    "The Making of a Global World",
    "Print Culture and the Modern World",
    "The Age of Industrialisation",
  ],
  geography: [
    "Agriculture",
    "Minerals and Energy Resources",
    "Resources and Development",
    "Water Resources",
    "Forest and Wildlife Resources",
    "Manufacturing Industries",
    "Lifelines of National Economy",
  ],
  civics: [
    "Democracy and Diversity",
    "Federalism",
    "Political Parties",
    "Power Sharing",
    "Gender, Religion and Caste",
    "Outcomes of Democracy",
    "Challenges to Democracy",
    "Popular Struggles and Movements",
  ],
  economics: [
    "Development",
    "Globalisation and the Indian Economy",
    "Money and Credit",
    "Sectors of the Indian Economy",
    "Consumer Rights",
  ],
} as const;

export type SubSubject =
  | "physics"
  | "chemistry"
  | "biology"
  | "history"
  | "geography"
  | "civics"
  | "economics";

/**
 * For a virtual sub-subject ID, return the underlying DB filter
 * { subject, chapter: { $in: [...] } }. Used in the bank/[subject] route.
 *
 * For real subject IDs (math, science, sst, english, hindi, etc.) it
 * returns the trivial `{ subject: id }` filter.
 */
export function resolveSubjectFilter(
  subjectId: string,
  cls: 10 | 12
): { subject: string; chapter?: { $in: string[] }; displayName?: string } {
  if (cls === 10) {
    if (subjectId in CLASS_10_SCIENCE_CHAPTERS) {
      return {
        subject: "science",
        chapter: { $in: [...CLASS_10_SCIENCE_CHAPTERS[subjectId as keyof typeof CLASS_10_SCIENCE_CHAPTERS]] },
      };
    }
    if (subjectId in CLASS_10_SST_CHAPTERS) {
      return {
        subject: "sst",
        chapter: { $in: [...CLASS_10_SST_CHAPTERS[subjectId as keyof typeof CLASS_10_SST_CHAPTERS]] },
      };
    }
  }
  return { subject: subjectId };
}

/**
 * For a given (subject, chapter), returns the strand name — used to
 * display a "Physics" / "Biology" pill on combined Science questions.
 */
export function chapterStrand(
  subject: string,
  chapter: string,
  cls: 10 | 12
): SubSubject | null {
  if (cls !== 10) return null;
  if (subject === "science") {
    for (const [strand, chapters] of Object.entries(CLASS_10_SCIENCE_CHAPTERS)) {
      if ((chapters as readonly string[]).includes(chapter)) return strand as SubSubject;
    }
  }
  if (subject === "sst") {
    for (const [strand, chapters] of Object.entries(CLASS_10_SST_CHAPTERS)) {
      if ((chapters as readonly string[]).includes(chapter)) return strand as SubSubject;
    }
  }
  return null;
}
