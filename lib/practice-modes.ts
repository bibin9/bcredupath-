export const PRACTICE_MODES = {
  "daily-challenge": {
    id: "daily-challenge",
    name: "Daily Challenge",
    emoji: "🎯",
    tagline: "Today's curated 10 · +100 XP bonus",
    description: "10 hand-picked questions, rotated daily by subject. Bonus XP on completion.",
    questionCount: 10,
    perQuestionSeconds: null,
    color: "pink",
  },
  "hot-20": {
    id: "hot-20",
    name: "Hot 20 Sprint",
    emoji: "🔥",
    tagline: "Top AI-predicted questions for Boards 2026",
    description: "The 20 questions most likely to appear, ranked by probability.",
    questionCount: 20,
    perQuestionSeconds: null, // no per-question timer
    color: "pink",
  },
  "rapid-fire": {
    id: "rapid-fire",
    name: "Rapid Fire MCQ",
    emoji: "⚡",
    tagline: "10 MCQs · 30 seconds each · pure speed",
    description: "MCQ blitz. Each question auto-submits after 30 seconds.",
    questionCount: 10,
    perQuestionSeconds: 30,
    color: "yellow",
  },
  "pyq-marathon": {
    id: "pyq-marathon",
    name: "PYQ Marathon",
    emoji: "📅",
    tagline: "Past year questions, year-wise",
    description: "Drill through actual board questions from recent years.",
    questionCount: 15,
    perQuestionSeconds: null,
    color: "cyan",
  },
  random: {
    id: "random",
    name: "Random Roulette",
    emoji: "🎲",
    tagline: "Mixed bag · surprise yourself",
    description: "A random sample across all chapters and types.",
    questionCount: 10,
    perQuestionSeconds: null,
    color: "purple",
  },
  "weakness-hunter": {
    id: "weakness-hunter",
    name: "Weakness Hunter",
    emoji: "🎯",
    tagline: "Auto-picks chapters you've struggled with",
    description: "Targets your weak chapters. Improves where it hurts.",
    questionCount: 10,
    perQuestionSeconds: null,
    color: "green",
  },
  "predicted-paper": {
    id: "predicted-paper",
    name: "Mock Board Paper",
    emoji: "📄",
    tagline: "3-hour timed simulation · solutions locked until end",
    description: "A mock paper modelled on the actual board pattern. Strict timer, no peeking — real exam experience.",
    questionCount: 25,
    perQuestionSeconds: null,
    color: "pink",
    /** Total session time in seconds. When set, the runner shows a single big countdown. */
    sessionSeconds: 3 * 60 * 60, // 3 hours
    /** Hide solutions until the session ends. */
    locked: true,
  },
} as const;

export type PracticeModeId = keyof typeof PRACTICE_MODES;

export function isPracticeMode(s: string): s is PracticeModeId {
  return s in PRACTICE_MODES;
}
