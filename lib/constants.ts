export const AVATAR_EMOJIS = [
  "🦊", "🐯", "🐼", "🦁", "🐸", "🐵", "🦄", "🐲",
  "🐺", "🦉", "🦅", "🐙", "🦋", "🐢", "🦚", "🐬",
  "🍕", "🚀", "⚡", "🔥", "🌈", "🎯", "🎮", "🧠",
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Jammu & Kashmir", "Ladakh", "Puducherry",
  "Andaman & Nicobar", "Lakshadweep", "Dadra & Nagar Haveli",
] as const;

export type ClassNum = 10 | 12;
export type Stream = "pcm" | "pcb" | "commerce" | "humanities";

export const STREAMS: { id: Stream; label: string; emoji: string }[] = [
  { id: "pcm", label: "PCM (Physics, Chem, Math)", emoji: "⚙️" },
  { id: "pcb", label: "PCB (Physics, Chem, Bio)", emoji: "🧬" },
  { id: "commerce", label: "Commerce", emoji: "📊" },
  { id: "humanities", label: "Humanities / Arts", emoji: "🎨" },
];

export const SUBJECTS_BY_CLASS: Record<
  ClassNum,
  Partial<Record<Stream | "all", { id: string; name: string; emoji: string; color: string }[]>>
> = {
  10: {
    all: [
      { id: "math", name: "Mathematics", emoji: "📐", color: "neon-cyan" },
      // Science strand split — chapter-driven, queries science questions
      { id: "physics", name: "Physics", emoji: "⚛️", color: "neon-cyan" },
      { id: "chemistry", name: "Chemistry", emoji: "🧪", color: "neon-green" },
      { id: "biology", name: "Biology", emoji: "🧬", color: "neon-pink" },
      // Social Science strand split
      { id: "history", name: "History", emoji: "🏛️", color: "neon-yellow" },
      { id: "geography", name: "Geography", emoji: "🗺️", color: "neon-cyan" },
      { id: "civics", name: "Civics", emoji: "🗳️", color: "neon-purple" },
      { id: "economics", name: "Economics", emoji: "📈", color: "neon-green" },
      { id: "english", name: "English", emoji: "📖", color: "neon-pink" },
      { id: "hindi", name: "Hindi", emoji: "📜", color: "neon-purple" },
    ],
  },
  12: {
    pcm: [
      { id: "physics", name: "Physics", emoji: "⚛️", color: "neon-cyan" },
      { id: "chemistry", name: "Chemistry", emoji: "🧪", color: "neon-green" },
      { id: "math", name: "Mathematics", emoji: "📐", color: "neon-pink" },
      { id: "english", name: "English", emoji: "📖", color: "neon-yellow" },
    ],
    pcb: [
      { id: "physics", name: "Physics", emoji: "⚛️", color: "neon-cyan" },
      { id: "chemistry", name: "Chemistry", emoji: "🧪", color: "neon-green" },
      { id: "biology", name: "Biology", emoji: "🧬", color: "neon-pink" },
      { id: "english", name: "English", emoji: "📖", color: "neon-yellow" },
    ],
    commerce: [
      { id: "accountancy", name: "Accountancy", emoji: "📒", color: "neon-cyan" },
      { id: "business", name: "Business Studies", emoji: "💼", color: "neon-pink" },
      { id: "economics", name: "Economics", emoji: "📈", color: "neon-green" },
      { id: "math", name: "Mathematics", emoji: "📐", color: "neon-yellow" },
      { id: "english", name: "English", emoji: "📖", color: "neon-purple" },
    ],
    humanities: [
      { id: "history", name: "History", emoji: "🏛️", color: "neon-yellow" },
      { id: "geography", name: "Geography", emoji: "🗺️", color: "neon-cyan" },
      { id: "polsci", name: "Political Science", emoji: "🗳️", color: "neon-pink" },
      { id: "psychology", name: "Psychology", emoji: "🧠", color: "neon-purple" },
      { id: "english", name: "English", emoji: "📖", color: "neon-green" },
    ],
  },
};

export const INTEREST_QUIZ = [
  { id: "q1", text: "I love solving tricky math puzzles", tags: ["math", "logic", "engineering"], emoji: "🧮" },
  { id: "q2", text: "I'd happily dissect a frog to see how it works", tags: ["biology", "medical", "research"], emoji: "🐸" },
  { id: "q3", text: "I notice when ads or websites have bad design", tags: ["design", "creative", "tech"], emoji: "🎨" },
  { id: "q4", text: "I follow stock markets or business news", tags: ["finance", "commerce", "economics"], emoji: "📈" },
  { id: "q5", text: "I get fired up arguing about politics and society", tags: ["law", "social", "humanities"], emoji: "⚖️" },
  { id: "q6", text: "I love taking apart gadgets or writing code", tags: ["engineering", "tech", "cs"], emoji: "🔧" },
  { id: "q7", text: "Helping someone in pain feels deeply rewarding", tags: ["medical", "psychology", "social"], emoji: "💊" },
  { id: "q8", text: "I sketch, write, or make videos for fun", tags: ["creative", "design", "media"], emoji: "✏️" },
  { id: "q9", text: "I'd run a small shop or YouTube channel as a side hustle", tags: ["commerce", "entrepreneur", "media"], emoji: "🛍️" },
  { id: "q10", text: "I'd rather lead a team than be told what to do", tags: ["management", "commerce", "law"], emoji: "🎖️" },
] as const;
