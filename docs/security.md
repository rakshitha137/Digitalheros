# Security & Row Level Security (RLS) Architecture

This document describes the security model, server-side authorization controls, Row Level Security (RLS) policies, and private proof storage mechanisms implemented in **Digital Heroes**.

---

## 1. Database Row Level Security (RLS) Overview

All public database tables have PostgreSQL Row Level Security (RLS) strictly enabled.

### Table Policies Summary

| Table | Policy Name | Permitted Operations | Role / Condition |
| :--- | :--- | :--- | :--- |
| `profiles` | Users can read/update own profile | SELECT, UPDATE | `auth.uid() = id` |
| `profiles` | Admins can read all profiles | ALL | `role = 'admin'` checked server-side |
| `scores` | Users can manage own scores | SELECT, INSERT, UPDATE, DELETE | `auth.uid() = user_id` |
| `charities` | Public can view active charities | SELECT | `is_active = TRUE AND is_archived = FALSE` |
| `charities` | Admins can manage charities | ALL | `role = 'admin'` |
| `user_charity_preferences` | Users manage own charity preference | ALL | `auth.uid() = user_id` |
| `subscriptions` | Users view own subscriptions | SELECT | `auth.uid() = user_id` |
| `draws` | Public view published draws | SELECT | `status = 'published'` |
| `draw_entries` | Users view own entries | SELECT | `auth.uid() = user_id` |
| `winners` | Winners view own win records | SELECT | `auth.uid() = user_id` |
| `winners` | Winners update own proof storage path | UPDATE | `auth.uid() = user_id` (only `proof_storage_path`) |
| `winners` | Admins manage all winners | ALL | `role = 'admin'` |
| `audit_logs` | Admins only access logs | ALL | `role = 'admin'` |

---

## 2. Server-Side Role Authorization

- **Rule**: Client-submitted role parameters (e.g. `role: "admin"` in body or headers) are **never trusted**.
- Every protected route (`/dashboard/*`, `/admin/*`), Server Action, and API endpoint verifies authorization server-side by fetching the user session from Supabase Auth and querying `profiles.role`.
- Admin-only routes return `403 Forbidden` or redirect to `/dashboard` if `role !== 'admin'`.

---

## 3. Private Winner Proof Storage & Signed URLs

- **Storage Bucket**: `winner-proofs` bucket is marked **Private** (`public = false`).
- **Storage Policies**:
  - `winner_upload`: Authenticated winner (`auth.uid() = user_id`) can INSERT proof files into their own path `user_id/winner_id_filename`.
  - `admin_access`: Admins can read all objects in `winner-proofs`.
- **Signed URLs**: Proof files are rendered via short-lived signed URLs (TTL: 3,600 seconds / 1 hour). Public direct URLs do not exist and will return HTTP 404/403.

---

## 4. Stripe Webhook Security

- **Raw Request Body**: The `/api/stripe/webhook` endpoint consumes the raw unparsed request body.
- **Header Signature Verification**: The `Stripe-Signature` header is verified using `stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)`.
- **Idempotency**: Webhook event IDs are stored in `processed_webhook_events`. Duplicate events are skipped safely.

---

## 5. Local Demo Mode Security Boundaries

- When `NEXT_PUBLIC_SUPABASE_URL` or `STRIPE_SECRET_KEY` is missing, the application runs in a clearly labeled **Local Demo Mode**.
- **Production Guard**: Demo mode is strictly disabled in production (`NODE_ENV === 'production'`). Missing credentials in production throw explicit startup errors to prevent mock data exposure.
