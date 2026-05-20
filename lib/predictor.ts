/**
 * Question-likelihood predictor.
 * Pure scoring function — no DB access here, callers pass in topic weight.
 */

import type { IQuestion } from "@/models/Question";
import { CURRENT_YEAR } from "@/lib/academic-year";
export { CURRENT_YEAR };

export type ProbabilityBreakdown = {
  frequency: number;
  recency: number;
  topic: number;
  sleeperBoost: number;
  total: number;
};

/**
 * 40% frequency, 25% recency, 20% topic-weight, 15% sleeper boost.
 * topicWeight is 0..1 (precomputed from chapter marks share).
 */
export function calculateProbability(
  q: Pick<IQuestion, "frequencyScore" | "yearsAsked">,
  topicWeight: number,
  currentYear: number = CURRENT_YEAR
): ProbabilityBreakdown {
  const frequency = (q.frequencyScore / 10) * 0.4;

  const lastAsked = q.yearsAsked?.length
    ? Math.max(...q.yearsAsked)
    : currentYear - 10;
  const yearsSince = currentYear - lastAsked;
  const recencyRaw =
    yearsSince <= 2 ? 1.0 : yearsSince <= 4 ? 0.7 : 0.4;
  const recency = recencyRaw * 0.25;

  const topic = Math.max(0, Math.min(1, topicWeight)) * 0.2;

  const sleeperBoost =
    yearsSince >= 3 && q.frequencyScore >= 7 ? 0.15 : 0;

  const total = Math.min(1, frequency + recency + topic + sleeperBoost);

  return { frequency, recency, topic, sleeperBoost, total };
}

export type PredictionRow<T = unknown> = {
  question: T;
  probability: number;
  breakdown: ProbabilityBreakdown;
  isSleeper: boolean;
  isHotPick: boolean; // top 20% probability
};

export function rankQuestions<T extends Pick<IQuestion, "frequencyScore" | "yearsAsked" | "chapter">>(
  questions: T[],
  topicWeights: Map<string, number>,
  currentYear: number = CURRENT_YEAR
): PredictionRow<T>[] {
  const scored = questions.map((q) => {
    const breakdown = calculateProbability(
      q,
      topicWeights.get(q.chapter) ?? 0.5,
      currentYear
    );
    return {
      question: q,
      probability: breakdown.total,
      breakdown,
      isSleeper: breakdown.sleeperBoost > 0,
      isHotPick: false,
    };
  });

  scored.sort((a, b) => b.probability - a.probability);
  const cutoff = Math.ceil(scored.length * 0.2);
  scored.slice(0, cutoff).forEach((r) => (r.isHotPick = true));
  return scored;
}
