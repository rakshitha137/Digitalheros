# Key Architectural & Business Decisions

This document records the non-negotiable business rules and technical implementation decisions for **Digital Heroes**.

---

## Documented Decisions Matrix

| Topic | Decision | Justification |
| :--- | :--- | :--- |
| **Stableford Score Bounds** | Integer 1 through 45 inclusive | Standard Stableford handicap scoring range. Out-of-bounds scores are invalid. |
| **Score Date Limit** | Max 1 score entry per user per date | Prevents duplicate score entry and batch gaming. |
| **Rolling Retention** | Active draw logic uses 5 latest scores | Maintains dynamic, fair participation while keeping score records clean. |
| **Converter Algorithm** | `v1_date_order_increment_wrap` | Sorts 5 latest scores newest-first. Resolves collisions by +1 increment with 45->1 wraparound. |
| **Minor Currency Units** | Integers (e.g. cents) for all money | Eliminates floating-point rounding errors in financial transactions and prize pool splits. |
| **Prize Tier Allocation** | 5-number (40%), 4-number (35%), 3-number (25%) | 40% jackpot pool builds excitement while 35% and 25% tiers reward partial matches. |
| **Rollover Rules** | 5-number jackpot rolls over; 3/4-number pools recorded as undistributed | Unclaimed 3/4-number pools do NOT silently shift to jackpot or other tiers; they are logged as undistributed. |
| **Private Proof Storage** | Bucket `winner-proofs` with Signed URLs | Protects sensitive winner verification documents from public exposure. |
| **Local Demo Mode** | Enabled when credentials missing; hard disabled in production | Allows full offline development and testing without risking fake production transactions. |
