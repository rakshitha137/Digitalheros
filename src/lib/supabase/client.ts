import { createClient } from "@supabase/supabase-js";
import { isDemoMode } from "../demo-mode";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getBrowserClient() {
  if (isDemoMode()) {
    // Demo Mode client fallback
    return null;
  }
  return supabase;
}
