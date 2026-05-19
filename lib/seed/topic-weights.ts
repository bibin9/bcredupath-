/**
 * Approximate marks share per chapter based on CBSE Class 10 blueprints.
 * Used by the predictor (lib/predictor.ts) as the "topic" component (20% of score).
 * Values are 0..1 — together they don't need to sum to 1, they're relative weights.
 */

export const TOPIC_WEIGHTS_CLASS_10: Record<string, Record<string, number>> = {
  math: {
    "Real Numbers": 0.45,
    "Polynomials": 0.50,
    "Pair of Linear Equations": 0.60,
    "Quadratic Equations": 0.75,
    "Arithmetic Progressions": 0.65,
    "Triangles": 0.70,
    "Coordinate Geometry": 0.55,
    "Introduction to Trigonometry": 0.70,
    "Some Applications of Trigonometry": 0.55,
    "Circles": 0.50,
    "Areas Related to Circles": 0.50,
    "Surface Areas and Volumes": 0.65,
    "Statistics": 0.60,
    "Probability": 0.50,
  },
  science: {
    "Light - Reflection and Refraction": 0.80,
    "The Human Eye and the Colourful World": 0.60,
    "Electricity": 0.85,
    "Magnetic Effects of Electric Current": 0.65,
    "Sources of Energy": 0.35,
    "Life Processes": 0.80,
    "Control and Coordination": 0.65,
    "How do Organisms Reproduce": 0.65,
    "Heredity": 0.50,
    "Our Environment": 0.45,
    "Chemical Reactions and Equations": 0.75,
    "Acids, Bases and Salts": 0.70,
    "Metals and Non-metals": 0.75,
    "Carbon and its Compounds": 0.80,
    "Periodic Classification": 0.55,
  },
  sst: {
    "Nationalism in India": 0.80,
    "Rise of Nationalism in Europe": 0.60,
    "The Making of a Global World": 0.55,
    "Resources and Development": 0.65,
    "Water Resources": 0.50,
    "Agriculture": 0.65,
    "Minerals and Energy Resources": 0.55,
    "Manufacturing Industries": 0.55,
    "Lifelines of National Economy": 0.50,
    "Power Sharing": 0.55,
    "Federalism": 0.65,
    "Democracy and Diversity": 0.50,
    "Gender, Religion and Caste": 0.50,
    "Political Parties": 0.65,
    "Outcomes of Democracy": 0.50,
    "Development": 0.60,
    "Sectors of the Indian Economy": 0.70,
    "Money and Credit": 0.55,
    "Globalisation and the Indian Economy": 0.55,
    "Consumer Rights": 0.50,
  },
  english: {
    "A Letter to God": 0.60,
    "Nelson Mandela: Long Walk to Freedom": 0.65,
    "Two Stories About Flying": 0.55,
    "From the Diary of Anne Frank": 0.55,
    "Glimpses of India": 0.60,
    "Mijbil the Otter": 0.50,
    "Madam Rides the Bus": 0.55,
    "The Sermon at Benares": 0.50,
    "Poems": 0.70,
    "Grammar and Writing": 0.85,
  },
};

export function getTopicWeight(
  subject: string,
  chapter: string,
  classNum: 10 | 12 = 10
): number {
  if (classNum !== 10) return 0.5;
  return TOPIC_WEIGHTS_CLASS_10[subject]?.[chapter] ?? 0.5;
}
