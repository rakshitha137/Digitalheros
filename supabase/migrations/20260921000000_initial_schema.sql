-- Digital Heroes PostgreSQL DDL Migration
-- Version: 20260921000000_initial_schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  display_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'subscriber' CHECK (role IN ('subscriber', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SUBSCRIPTION PLANS TABLE
CREATE TABLE public.subscription_plans (
  id TEXT PRIMARY KEY, -- e.g. 'monthly', 'yearly'
  name TEXT NOT NULL,
  price_minor INT NOT NULL CHECK (price_minor >= 0),
  interval TEXT NOT NULL CHECK (interval IN ('month', 'year')),
  stripe_price_id TEXT UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'incomplete')),
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'yearly')),
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CHARITIES TABLE
CREATE TABLE public.charities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  website TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CHARITY EVENTS TABLE
CREATE TABLE public.charity_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  charity_id UUID NOT NULL REFERENCES public.charities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. USER CHARITY PREFERENCES TABLE
CREATE TABLE public.user_charity_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  charity_id UUID NOT NULL REFERENCES public.charities(id) ON DELETE RESTRICT,
  contribution_percent INT NOT NULL DEFAULT 10 CHECK (contribution_percent BETWEEN 10 AND 100),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SCORES TABLE (Strict 1-45 integer check, UNIQUE user_id + date_played)
CREATE TABLE public.scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score_value INT NOT NULL CHECK (score_value BETWEEN 1 AND 45),
  date_played DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, date_played)
);

-- 8. DRAWS TABLE
CREATE TABLE public.draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_year INT NOT NULL,
  draw_month INT NOT NULL CHECK (draw_month BETWEEN 1 AND 12),
  draw_date DATE NOT NULL,
  draw_mode TEXT NOT NULL CHECK (draw_mode IN ('random', 'algorithmic')),
  winning_numbers INT[] CHECK (array_length(winning_numbers, 1) = 5),
  total_subscription_revenue_minor INT NOT NULL DEFAULT 0,
  prize_pool_allocated_minor INT NOT NULL DEFAULT 0,
  jackpot_rollover_brought_forward_minor INT NOT NULL DEFAULT 0,
  jackpot_rollover_carried_forward_minor INT NOT NULL DEFAULT 0,
  undistributed_tier_amount_minor INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'simulated', 'published')),
  converter_version TEXT NOT NULL DEFAULT 'v1_date_order_increment_wrap',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (draw_year, draw_month)
);

-- 9. DRAW ENTRY SNAPSHOTS TABLE
CREATE TABLE public.draw_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  charity_id UUID REFERENCES public.charities(id) ON DELETE SET NULL,
  score_values INT[] NOT NULL,
  score_dates DATE[] NOT NULL,
  generated_numbers INT[] NOT NULL CHECK (array_length(generated_numbers, 1) = 5),
  match_count INT NOT NULL CHECK (match_count BETWEEN 0 AND 5),
  converter_version TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (draw_id, user_id)
);

-- 10. PRIZE TIERS TABLE
CREATE TABLE public.prize_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
  tier_level INT NOT NULL CHECK (tier_level IN (3, 4, 5)),
  allocated_amount_minor INT NOT NULL DEFAULT 0,
  winner_count INT NOT NULL DEFAULT 0,
  payout_per_winner_minor INT NOT NULL DEFAULT 0,
  remainder_amount_minor INT NOT NULL DEFAULT 0,
  is_rolled_over BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (draw_id, tier_level)
);

-- 11. WINNERS TABLE
CREATE TABLE public.winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
  draw_entry_id UUID NOT NULL REFERENCES public.draw_entries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier_level INT NOT NULL CHECK (tier_level IN (3, 4, 5)),
  prize_amount_minor INT NOT NULL CHECK (prize_amount_minor >= 0),
  status TEXT NOT NULL DEFAULT 'pending_proof' CHECK (status IN ('pending_proof', 'proof_submitted', 'verified', 'paid', 'rejected')),
  proof_storage_path TEXT,
  proof_submitted_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES public.profiles(id),
  paid_at TIMESTAMPTZ,
  paid_by UUID REFERENCES public.profiles(id),
  payment_reference TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. CHARITY CONTRIBUTIONS TABLE
CREATE TABLE public.charity_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  charity_id UUID NOT NULL REFERENCES public.charities(id) ON DELETE RESTRICT,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount_minor INT NOT NULL CHECK (amount_minor > 0),
  period_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. INDEPENDENT DONATIONS TABLE
CREATE TABLE public.independent_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  charity_id UUID NOT NULL REFERENCES public.charities(id) ON DELETE RESTRICT,
  amount_minor INT NOT NULL CHECK (amount_minor > 0),
  donor_name TEXT,
  donor_email TEXT,
  payment_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. AUDIT LOGS TABLE
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. PROCESSED WEBHOOK EVENTS TABLE (Deduplication)
CREATE TABLE public.processed_webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_scores_user_date ON public.scores(user_id, date_played DESC);
CREATE INDEX idx_draw_entries_draw_user ON public.draw_entries(draw_id, user_id);
CREATE INDEX idx_winners_user_status ON public.winners(user_id, status);
CREATE INDEX idx_charity_contributions_charity ON public.charity_contributions(charity_id, period_date);
CREATE INDEX idx_subscriptions_user_status ON public.subscriptions(user_id, status);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_charity_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draw_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prize_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charity_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.independent_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_webhook_events ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR PROFILES
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS POLICIES FOR SCORES
CREATE POLICY "Users can manage own scores" ON public.scores FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can read all scores" ON public.scores FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS POLICIES FOR CHARITIES
CREATE POLICY "Public can view active charities" ON public.charities FOR SELECT USING (is_active = TRUE AND is_archived = FALSE);
CREATE POLICY "Admins can manage charities" ON public.charities FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS POLICIES FOR USER CHARITY PREFERENCES
CREATE POLICY "Users can manage own charity preference" ON public.user_charity_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view charity preferences" ON public.user_charity_preferences FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS POLICIES FOR DRAWS & DRAW ENTRIES
CREATE POLICY "Public can view published draws" ON public.draws FOR SELECT USING (status = 'published');
CREATE POLICY "Users can view own draw entries" ON public.draw_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage draws" ON public.draws FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can manage draw entries" ON public.draw_entries FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS POLICIES FOR WINNERS & PROOF
CREATE POLICY "Winners can view own win records" ON public.winners FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Winners can update own proof storage path" ON public.winners FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all winners" ON public.winners FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS POLICIES FOR AUDIT LOGS
CREATE POLICY "Admins only access audit logs" ON public.audit_logs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
