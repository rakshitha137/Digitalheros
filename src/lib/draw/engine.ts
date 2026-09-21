// Digital Heroes Draw Engine & Financial Prize Calculation System
// All money handled strictly in integer minor currency units (e.g. cents)

import { ScoreConverterResult } from "./score-converter";

export interface ParticipantEntry {
  user_id: string;
  charity_id?: string;
  score_values: number[];
  score_dates: string[];
  generated_numbers: number[]; // 5 unique numbers (1-45)
  converter_version: string;
}

export interface DrawEngineConfig {
  prize_pool_revenue_percent: number; // e.g. 50 (50% of subscription revenue)
  tier_split_percents: {
    tier_5: number; // 40
    tier_4: number; // 35
    tier_3: number; // 25
  };
}

export const DEFAULT_DRAW_CONFIG: DrawEngineConfig = {
  prize_pool_revenue_percent: 50,
  tier_split_percents: {
    tier_5: 40,
    tier_4: 35,
    tier_3: 25,
  },
};

export interface DrawSimulationResult {
  winning_numbers: number[];
  draw_mode: 'random' | 'algorithmic';
  total_subscription_revenue_minor: number;
  prize_pool_allocated_minor: number;
  jackpot_rollover_brought_forward_minor: number;
  jackpot_rollover_carried_forward_minor: number;
  undistributed_tier_amount_minor: number;
  tier_results: {
    tier_5: { allocated_minor: number; winner_count: number; payout_per_winner_minor: number; remainder_minor: number; is_rolled_over: boolean; winners: string[] };
    tier_4: { allocated_minor: number; winner_count: number; payout_per_winner_minor: number; remainder_minor: number; is_rolled_over: boolean; winners: string[] };
    tier_3: { allocated_minor: number; winner_count: number; payout_per_winner_minor: number; remainder_minor: number; is_rolled_over: boolean; winners: string[] };
  };
  matched_entries: {
    user_id: string;
    match_count: number;
    tier_level?: 3 | 4 | 5;
    prize_amount_minor: number;
  }[];
}

/**
 * Generates 5 distinct winning numbers in 1-45 for Random mode.
 */
export function generateRandomWinningNumbers(): number[] {
  const numbers: number[] = [];
  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b);
}

/**
 * Generates 5 distinct winning numbers deterministically for Algorithmic mode.
 */
export function generateAlgorithmicWinningNumbers(seedDate: string): number[] {
  let hash = 0;
  for (let i = 0; i < seedDate.length; i++) {
    hash = (hash << 5) - hash + seedDate.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const numbers: number[] = [];
  let current = (positiveHash % 45) + 1;
  while (numbers.length < 5) {
    if (!numbers.includes(current)) {
      numbers.push(current);
    }
    current = (current % 45) + 1;
  }
  return numbers.sort((a, b) => a - b);
}

/**
 * Calculates the number of matching numbers between subscriber numbers and winning numbers.
 */
export function countMatches(userNumbers: number[], winningNumbers: number[]): number {
  const winSet = new Set(winningNumbers);
  return userNumbers.filter((num) => winSet.has(num)).length;
}

/**
 * Executes a draw simulation given subscriber entries, total revenue, rollover, and winning numbers.
 */
export function runDrawEngine(
  entries: ParticipantEntry[],
  totalSubscriptionRevenueMinor: number,
  jackpotRolloverBroughtForwardMinor: number = 0,
  winningNumbersOverride?: number[],
  config: DrawEngineConfig = DEFAULT_DRAW_CONFIG
): DrawSimulationResult {
  const winning_numbers = winningNumbersOverride || generateRandomWinningNumbers();
  const draw_mode: 'random' | 'algorithmic' = winningNumbersOverride ? 'algorithmic' : 'random';

  // 1. Calculate Allocated Prize Pool (Integer math)
  const prize_pool_allocated_minor = Math.floor(
    (totalSubscriptionRevenueMinor * config.prize_pool_revenue_percent) / 100
  );

  // 2. Compute Tier Allocations (Integer math)
  const tier5_base = Math.floor(
    (prize_pool_allocated_minor * config.tier_split_percents.tier_5) / 100
  );
  const tier4_base = Math.floor(
    (prize_pool_allocated_minor * config.tier_split_percents.tier_4) / 100
  );
  const tier3_base = Math.floor(
    (prize_pool_allocated_minor * config.tier_split_percents.tier_3) / 100
  );

  const tier5_total_pool = tier5_base + jackpotRolloverBroughtForwardMinor;
  const tier4_total_pool = tier4_base;
  const tier3_total_pool = tier3_base;

  // 3. Match Entries & Determine Highest Matching Tier
  const matched_entries: {
    user_id: string;
    match_count: number;
    tier_level?: 3 | 4 | 5;
    prize_amount_minor: number;
  }[] = [];

  const tier5_winners: string[] = [];
  const tier4_winners: string[] = [];
  const tier3_winners: string[] = [];

  for (const entry of entries) {
    const matchCount = countMatches(entry.generated_numbers, winning_numbers);
    if (matchCount === 5) {
      tier5_winners.push(entry.user_id);
    } else if (matchCount === 4) {
      tier4_winners.push(entry.user_id);
    } else if (matchCount === 3) {
      tier3_winners.push(entry.user_id);
    }
  }

  // Sort winner arrays by user_id deterministically for remainder distribution
  tier5_winners.sort();
  tier4_winners.sort();
  tier3_winners.sort();

  // 4. Equal Division & Integer Remainder Handling
  const calculateTierPayout = (poolMinor: number, winners: string[]) => {
    if (winners.length === 0) {
      return { payoutPerWinner: 0, remainder: poolMinor, isRolledOver: false };
    }
    const payoutPerWinner = Math.floor(poolMinor / winners.length);
    const remainder = poolMinor - payoutPerWinner * winners.length;
    return { payoutPerWinner, remainder, isRolledOver: false };
  };

  const tier5_payout = calculateTierPayout(tier5_total_pool, tier5_winners);
  const tier4_payout = calculateTierPayout(tier4_total_pool, tier4_winners);
  const tier3_payout = calculateTierPayout(tier3_total_pool, tier3_winners);

  // 5. Jackpot Rollover & Undistributed Rules
  let jackpot_rollover_carried_forward_minor = 0;
  let undistributed_tier_amount_minor = 0;

  if (tier5_winners.length === 0) {
    tier5_payout.isRolledOver = true;
    jackpot_rollover_carried_forward_minor = tier5_total_pool;
  } else {
    undistributed_tier_amount_minor += tier5_payout.remainder;
  }

  if (tier4_winners.length === 0) {
    undistributed_tier_amount_minor += tier4_total_pool;
  } else {
    undistributed_tier_amount_minor += tier4_payout.remainder;
  }

  if (tier3_winners.length === 0) {
    undistributed_tier_amount_minor += tier3_total_pool;
  } else {
    undistributed_tier_amount_minor += tier3_payout.remainder;
  }

  // Populate matched entries
  for (const entry of entries) {
    const matchCount = countMatches(entry.generated_numbers, winning_numbers);
    let prize = 0;
    let tier: 3 | 4 | 5 | undefined;

    if (matchCount === 5) {
      tier = 5;
      prize = tier5_payout.payoutPerWinner;
    } else if (matchCount === 4) {
      tier = 4;
      prize = tier4_payout.payoutPerWinner;
    } else if (matchCount === 3) {
      tier = 3;
      prize = tier3_payout.payoutPerWinner;
    }

    matched_entries.push({
      user_id: entry.user_id,
      match_count: matchCount,
      tier_level: tier,
      prize_amount_minor: prize,
    });
  }

  return {
    winning_numbers,
    draw_mode,
    total_subscription_revenue_minor: totalSubscriptionRevenueMinor,
    prize_pool_allocated_minor,
    jackpot_rollover_brought_forward_minor: jackpotRolloverBroughtForwardMinor,
    jackpot_rollover_carried_forward_minor,
    undistributed_tier_amount_minor,
    tier_results: {
      tier_5: {
        allocated_minor: tier5_total_pool,
        winner_count: tier5_winners.length,
        payout_per_winner_minor: tier5_payout.payoutPerWinner,
        remainder_minor: tier5_payout.remainder,
        is_rolled_over: tier5_payout.isRolledOver,
        winners: tier5_winners,
      },
      tier_4: {
        allocated_minor: tier4_total_pool,
        winner_count: tier4_winners.length,
        payout_per_winner_minor: tier4_payout.payoutPerWinner,
        remainder_minor: tier4_payout.remainder,
        is_rolled_over: false,
        winners: tier4_winners,
      },
      tier_3: {
        allocated_minor: tier3_total_pool,
        winner_count: tier3_winners.length,
        payout_per_winner_minor: tier3_payout.payoutPerWinner,
        remainder_minor: tier3_payout.remainder,
        is_rolled_over: false,
        winners: tier3_winners,
      },
    },
    matched_entries,
  };
}
