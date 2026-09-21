// Digital Heroes Deterministic Score-to-Number Converter Algorithm
// Version: v1_date_order_increment_wrap

export interface ScoreEntryInput {
  score_value: number;
  date_played: string; // YYYY-MM-DD
  created_at?: string;
}

export interface ScoreConverterResult {
  generated_numbers: number[];
  candidate_scores: number[];
  candidate_dates: string[];
  converter_version: string;
}

export const CONVERTER_VERSION = "v1_date_order_increment_wrap";

/**
 * Validates whether a single score value is within 1 to 45 inclusive.
 */
export function isValidScoreValue(score: number): boolean {
  return Number.isInteger(score) && score >= 1 && score <= 45;
}

/**
 * Converts a set of Stableford scores into 5 unique draw numbers (1–45).
 * 
 * Algorithm:
 * 1. Sort the 5 latest scores by date_played descending (newest first).
 * 2. Use each score as a candidate number.
 * 3. If a duplicate occurs, increment by 1 with wraparound (45 -> 1) until an unused number is found.
 * 4. Returns exactly 5 unique integers in 1–45.
 */
export function convertScoresToDrawNumbers(scores: ScoreEntryInput[]): ScoreConverterResult {
  if (!scores || scores.length < 5) {
    throw new Error("Score-to-number converter requires at least 5 Stableford scores.");
  }

  // 1. Sort 5 latest scores by date_played descending (newest first)
  const sortedScores = [...scores]
    .sort((a, b) => {
      const dateDiff = new Date(b.date_played).getTime() - new Date(a.date_played).getTime();
      if (dateDiff !== 0) return dateDiff;
      const createdA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const createdB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return createdB - createdA;
    })
    .slice(0, 5);

  const candidate_scores: number[] = [];
  const candidate_dates: string[] = [];
  const generated_numbers: number[] = [];
  const usedNumbersSet = new Set<number>();

  for (const item of sortedScores) {
    if (!isValidScoreValue(item.score_value)) {
      throw new Error(`Score value ${item.score_value} is out of bounds (1-45).`);
    }

    candidate_scores.push(item.score_value);
    candidate_dates.push(item.date_played);

    let num = item.score_value;
    while (usedNumbersSet.has(num)) {
      num = num + 1;
      if (num > 45) {
        num = 1;
      }
    }

    usedNumbersSet.add(num);
    generated_numbers.push(num);
  }

  return {
    generated_numbers,
    candidate_scores,
    candidate_dates,
    converter_version: CONVERTER_VERSION,
  };
}
