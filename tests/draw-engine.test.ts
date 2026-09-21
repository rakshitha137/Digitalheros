import { describe, it, expect } from "vitest";
import {
  countMatches,
  runDrawEngine,
  ParticipantEntry,
} from "../src/lib/draw/engine";

describe("Draw Engine, Prize Calculations & Rollover Rules", () => {
  it("should count matching numbers correctly", () => {
    expect(countMatches([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(5);
    expect(countMatches([1, 2, 3, 4, 5], [1, 2, 3, 10, 11])).toBe(3);
    expect(countMatches([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(0);
  });

  it("should calculate integer minor currency prize pool and split tiers correctly", () => {
    // Total Revenue = $20,000.00 (2000000 cents)
    // Prize pool allocation = 50% = $10,000.00 (1000000 cents)
    // Tier 5 (40%): 400000 cents ($4,000.00)
    // Tier 4 (35%): 350000 cents ($3,500.00)
    // Tier 3 (25%): 250000 cents ($2,500.00)
    const entries: ParticipantEntry[] = [
      {
        user_id: "user-1",
        score_values: [10, 20, 30, 40, 45],
        score_dates: ["2026-09-05", "2026-09-04", "2026-09-03", "2026-09-02", "2026-09-01"],
        generated_numbers: [10, 20, 30, 40, 45],
        converter_version: "v1_date_order_increment_wrap",
      },
    ];

    const result = runDrawEngine(entries, 2000000, 0, [10, 20, 30, 40, 45]);
    expect(result.prize_pool_allocated_minor).toBe(1000000);
    expect(result.tier_results.tier_5.allocated_minor).toBe(400000);
    expect(result.tier_results.tier_4.allocated_minor).toBe(350000);
    expect(result.tier_results.tier_3.allocated_minor).toBe(250000);
    expect(result.tier_results.tier_5.winner_count).toBe(1);
    expect(result.tier_results.tier_5.payout_per_winner_minor).toBe(400000);
  });

  it("should roll over 100% of 5-number jackpot pool when 0 jackpot winners exist", () => {
    const entries: ParticipantEntry[] = [
      {
        user_id: "user-1",
        score_values: [1, 2, 3, 4, 5],
        score_dates: ["2026-09-05", "2026-09-04", "2026-09-03", "2026-09-02", "2026-09-01"],
        generated_numbers: [1, 2, 3, 4, 5],
        converter_version: "v1_date_order_increment_wrap",
      },
    ];

    // Winning numbers don't match 5 numbers
    const result = runDrawEngine(entries, 1000000, 200000, [10, 20, 30, 40, 45]);
    expect(result.tier_results.tier_5.winner_count).toBe(0);
    expect(result.tier_results.tier_5.is_rolled_over).toBe(true);
    // Rollover carried forward = Allocated Tier 5 (200000) + Brought Forward (200000) = 400000
    expect(result.jackpot_rollover_carried_forward_minor).toBe(400000);
  });

  it("should record unclaimed 3-number and 4-number pools as undistributed without shifting to jackpot", () => {
    const entries: ParticipantEntry[] = [];
    const result = runDrawEngine(entries, 1000000, 0, [1, 2, 3, 4, 5]);

    expect(result.tier_results.tier_4.winner_count).toBe(0);
    expect(result.tier_results.tier_3.winner_count).toBe(0);
    // Undistributed tier amount includes Tier 4 (175000) + Tier 3 (125000) = 300000
    expect(result.undistributed_tier_amount_minor).toBe(300000);
    // Rollover carried forward is ONLY Tier 5 (200000)
    expect(result.jackpot_rollover_carried_forward_minor).toBe(200000);
  });
});
