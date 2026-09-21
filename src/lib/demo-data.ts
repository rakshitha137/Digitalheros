// Digital Heroes Local Demo Data & State Store
// Used when Supabase or Stripe credentials are not present locally.

export interface DemoCharity {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  logo_url: string;
  website: string;
  is_active: boolean;
  is_featured: boolean;
  is_archived: boolean;
  total_raised_minor: number;
}

export interface DemoScore {
  id: string;
  user_id: string;
  score_value: number;
  date_played: string;
  created_at: string;
}

export interface DemoSubscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'past_due';
  plan_type: 'monthly' | 'yearly';
  cancel_at_period_end: boolean;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface DemoUserCharityPref {
  user_id: string;
  charity_id: string;
  contribution_percent: number;
  updated_at: string;
}

export interface DemoDraw {
  id: string;
  draw_year: number;
  draw_month: number;
  draw_date: string;
  draw_mode: 'random' | 'algorithmic';
  winning_numbers: number[];
  total_subscription_revenue_minor: number;
  prize_pool_allocated_minor: number;
  jackpot_rollover_brought_forward_minor: number;
  jackpot_rollover_carried_forward_minor: number;
  undistributed_tier_amount_minor: number;
  status: 'draft' | 'simulated' | 'published';
  converter_version: string;
  published_at?: string;
}

export interface DemoWinner {
  id: string;
  draw_id: string;
  draw_entry_id: string;
  user_id: string;
  user_name: string;
  tier_level: 3 | 4 | 5;
  prize_amount_minor: number;
  status: 'pending_proof' | 'proof_submitted' | 'verified' | 'paid' | 'rejected';
  proof_storage_path?: string;
  rejection_reason?: string;
  payment_reference?: string;
  created_at: string;
}

export const INITIAL_DEMO_CHARITIES: DemoCharity[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    slug: "veterans-golf-wellness",
    name: "Veterans Golf & Wellness Foundation",
    category: "Veterans & Rehabilitation",
    description: "Providing therapeutic golf programs, mental health counseling, and community support for military veterans.",
    logo_url: "",
    website: "https://example.org/veterans-golf",
    is_active: true,
    is_featured: true,
    is_archived: false,
    total_raised_minor: 4850000,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    slug: "junior-golf-opportunity",
    name: "Junior Golf & Youth Opportunity Fund",
    category: "Youth & Education",
    description: "Granting equipment, coaching, and academic scholarships to underrepresented youth across the country.",
    logo_url: "",
    website: "https://example.org/junior-golf",
    is_active: true,
    is_featured: false,
    is_archived: false,
    total_raised_minor: 3920000,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    slug: "clean-oceans-trust",
    name: "Clean Oceans & Environmental Trust",
    category: "Environment & Conservation",
    description: "Funding coastal cleanup initiatives and marine habitat restoration through grassroots ocean protection projects.",
    logo_url: "",
    website: "https://example.org/clean-oceans",
    is_active: true,
    is_featured: false,
    is_archived: false,
    total_raised_minor: 3410000,
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    slug: "national-cancer-research",
    name: "National Cancer Research Alliance",
    category: "Health & Medical Research",
    description: "Pioneering breakthrough medical research and providing patient care assistance for families affected by cancer.",
    logo_url: "",
    website: "https://example.org/cancer-research",
    is_active: true,
    is_featured: true,
    is_archived: false,
    total_raised_minor: 5280000,
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    slug: "food-bank-hero-network",
    name: "Food Bank Hero Network",
    category: "Hunger & Community",
    description: "Distributing fresh produce and nutritious meals to local food pantries and underserved communities.",
    logo_url: "",
    website: "https://example.org/food-bank-heroes",
    is_active: true,
    is_featured: false,
    is_archived: false,
    total_raised_minor: 2150000,
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    slug: "wildlife-habitat-rescue",
    name: "Wildlife Habitat Rescue Fund",
    category: "Animal Welfare",
    description: "Rescuing injured wildlife and rehabilitating native forest and wetland sanctuaries.",
    logo_url: "",
    website: "https://example.org/wildlife-rescue",
    is_active: true,
    is_featured: false,
    is_archived: false,
    total_raised_minor: 1890000,
  },
];

export const INITIAL_DEMO_SCORES: DemoScore[] = [
  { id: "s1", user_id: "demo-user-1", score_value: 36, date_played: "2026-09-18", created_at: "2026-09-18T10:00:00Z" },
  { id: "s2", user_id: "demo-user-1", score_value: 38, date_played: "2026-09-15", created_at: "2026-09-15T10:00:00Z" },
  { id: "s3", user_id: "demo-user-1", score_value: 34, date_played: "2026-09-10", created_at: "2026-09-10T10:00:00Z" },
  { id: "s4", user_id: "demo-user-1", score_value: 41, date_played: "2026-09-05", created_at: "2026-09-05T10:00:00Z" },
  { id: "s5", user_id: "demo-user-1", score_value: 39, date_played: "2026-09-01", created_at: "2026-09-01T10:00:00Z" },
];

export const INITIAL_DEMO_DRAWS: DemoDraw[] = [
  {
    id: "draw-prev-1",
    draw_year: 2026,
    draw_month: 8,
    draw_date: "2026-08-31",
    draw_mode: "random",
    winning_numbers: [12, 18, 24, 34, 41],
    total_subscription_revenue_minor: 1500000,
    prize_pool_allocated_minor: 750000,
    jackpot_rollover_brought_forward_minor: 0,
    jackpot_rollover_carried_forward_minor: 300000,
    undistributed_tier_amount_minor: 0,
    status: "published",
    converter_version: "v1_date_order_increment_wrap",
    published_at: "2026-08-31T23:59:59Z",
  },
  {
    id: "draw-curr-1",
    draw_year: 2026,
    draw_month: 9,
    draw_date: "2026-09-30",
    draw_mode: "random",
    winning_numbers: [],
    total_subscription_revenue_minor: 1800000,
    prize_pool_allocated_minor: 900000,
    jackpot_rollover_brought_forward_minor: 300000,
    jackpot_rollover_carried_forward_minor: 0,
    undistributed_tier_amount_minor: 0,
    status: "draft",
    converter_version: "v1_date_order_increment_wrap",
  },
];
