# Database Schema & Data Dictionary

Comprehensive documentation for all 15 PostgreSQL database tables, indexes, constraints, and seed files.

---

## 1. Tables Overview

1. `profiles`: Extends `auth.users` with `full_name`, `display_name`, `phone`, `avatar_url`, and `role` ('subscriber' | 'admin').
2. `subscription_plans`: Plan definitions (`monthly`, `yearly`), pricing in integer minor currency units.
3. `subscriptions`: Syncs Stripe subscriptions (`status`, `cancel_at_period_end`, `current_period_start`, `current_period_end`). Unique constraint on `stripe_subscription_id`.
4. `charities`: Verified partner charities with `slug` (unique), `is_featured`, `is_archived`.
5. `charity_events`: Events and initiatives organized by partner charities.
6. `user_charity_preferences`: Subscriber charity selections with `contribution_percent` (10–100%).
7. `scores`: Stableford score entries (1–45 range). Unique constraint on `(user_id, date_played)`.
8. `draws`: Monthly draw records. Unique constraint on `(draw_year, draw_month)`.
9. `draw_entries`: Immutable draw entry snapshots stored at draw execution time.
10. `prize_tiers`: Tier allocation summaries for 5-number, 4-number, and 3-number match tiers.
11. `winners`: Winning claim records with status tracking (`pending_proof`, `proof_submitted`, `verified`, `paid`, `rejected`) and `proof_storage_path`.
12. `charity_contributions`: Subscription revenue distribution logs per charity per period.
13. `independent_donations`: One-time optional charity donations.
14. `audit_logs`: Encrypted audit logs for administrative, draw, winner, and billing events.
15. `processed_webhook_events`: Deduplication table for Stripe webhook event IDs.

---

## 2. DDL Migrations & Seed Locations

- DDL Migration: `supabase/migrations/20260921000000_initial_schema.sql`
- Seed File: `supabase/seed.sql` (Contains 6 clearly labelled demo charities)
