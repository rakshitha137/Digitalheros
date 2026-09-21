# Production Deployment Guide

Guide for deploying **Digital Heroes** on Vercel and Supabase.

---

## 1. Prerequisites
- Node.js `v20.x` or `v24.x`
- Supabase Project & PostgreSQL Database
- Stripe Account (Live/Test environment)
- Vercel Account

---

## 2. Environment Variables Checklist (Vercel Project Settings)

- `NEXT_PUBLIC_APP_URL`: Production domain (e.g. `https://digitalheroes.com`)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Project API URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Client Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Server Service Role Key (Admin)
- `STRIPE_SECRET_KEY`: Stripe API Secret Key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe Publishable Key
- `STRIPE_WEBHOOK_SECRET`: Webhook Signing Secret (`whsec_...`)
- `STRIPE_MONTHLY_PRICE_ID`: Monthly Subscription Price ID
- `STRIPE_YEARLY_PRICE_ID`: Yearly Subscription Price ID
- `CRON_SECRET`: Secret token for automated scheduled draw routes

---

## 3. Database & Storage Migration Steps

1. Execute DDL SQL migration: `supabase/migrations/20260921000000_initial_schema.sql`
2. Seed initial charities: `supabase/seed.sql`
3. Create private Supabase Storage Bucket: `winner-proofs` (`public = false`).
