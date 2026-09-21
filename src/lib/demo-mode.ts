// Digital Heroes Local Demo Mode Manager
// Checks whether Supabase/Stripe environment keys are present.
// Hard disabled in production (NODE_ENV === 'production').

export function isDemoMode(): boolean {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  const hasSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co" &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return !hasSupabase;
}

export function isStripeDemoMode(): boolean {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  const hasStripe =
    !!process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_SECRET_KEY !== "sk_test_sample";

  return !hasStripe;
}
