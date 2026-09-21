import { describe, it, expect } from "vitest";
import {
  isValidScoreValue,
  convertScoresToDrawNumbers,
  ScoreEntryInput,
} from "../src/lib/draw/score-converter";

describe("Stableford Score Validation & Converter Algorithm", () => {
  it("should validate integer scores strictly between 1 and 45 inclusive", () => {
    expect(isValidScoreValue(1)).toBe(true);
    expect(isValidScoreValue(45)).toBe(true);
    expect(isValidScoreValue(28)).toBe(true);
    expect(isValidScoreValue(0)).toBe(false);
    expect(isValidScoreValue(46)).toBe(false);
    expect(isValidScoreValue(-5)).toBe(false);
    expect(isValidScoreValue(36.5)).toBe(false);
  });

  it("should sort 5 latest scores newest-first by date_played", () => {
    const mockScores: ScoreEntryInput[] = [
      { score_value: 30, date_played: "2026-09-01" },
      { score_value: 32, date_played: "2026-09-10" },
      { score_value: 34, date_played: "2026-09-15" },
      { score_value: 36, date_played: "2026-09-20" },
      { score_value: 38, date_played: "2026-09-05" },
      { score_value: 40, date_played: "2026-08-01" }, // 6th score should be ignored
    ];

    const result = convertScoresToDrawNumbers(mockScores);
    expect(result.candidate_dates).toEqual([
      "2026-09-20",
      "2026-09-15",
      "2026-09-10",
      "2026-09-05",
      "2026-09-01",
    ]);
    expect(result.candidate_scores).toEqual([36, 34, 32, 38, 30]);
  });

  it("should handle duplicate score values with +1 increment", () => {
    const duplicateScores: ScoreEntryInput[] = [
      { score_value: 12, date_played: "2026-09-05" },
      { score_value: 12, date_played: "2026-09-04" },
      { score_value: 15, date_played: "2026-09-03" },
      { score_value: 20, date_played: "2026-09-02" },
      { score_value: 25, date_played: "2026-09-01" },
    ];

    const result = convertScoresToDrawNumbers(duplicateScores);
    expect(result.generated_numbers).toEqual([12, 13, 15, 20, 25]);
  });

  it("should handle repeated 45 values with wraparound to 1", () => {
    const scoresWith45: ScoreEntryInput[] = [
      { score_value: 45, date_played: "2026-09-05" },
      { score_value: 45, date_played: "2026-09-04" },
      { score_value: 45, date_played: "2026-09-03" },
      { score_value: 10, date_played: "2026-09-02" },
      { score_value: 20, date_played: "2026-09-01" },
    ];

    const result = convertScoresToDrawNumbers(scoresWith45);
    expect(result.generated_numbers).toEqual([45, 1, 2, 10, 20]);
  });

  it("should handle all-identical scores correctly", () => {
    const allIdentical: ScoreEntryInput[] = [
      { score_value: 18, date_played: "2026-09-05" },
      { score_value: 18, date_played: "2026-09-04" },
      { score_value: 18, date_played: "2026-09-03" },
      { score_value: 18, date_played: "2026-09-02" },
      { score_value: 18, date_played: "2026-09-01" },
    ];

    const result = convertScoresToDrawNumbers(allIdentical);
    expect(result.generated_numbers).toEqual([18, 19, 20, 21, 22]);
    expect(result.converter_version).toBe("v1_date_order_increment_wrap");
  });
});
