import { createClient } from "@supabase/supabase-js";
import { isDemoMode } from "../demo-mode";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-role-key";

/**
 * Creates a server-side Supabase client with admin privileges.
 * NEVER expose this to client components!
 */
export function getAdminSupabaseClient() {
  if (isDemoMode()) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

export interface UserRoleCheckResult {
  userId: string | null;
  role: 'subscriber' | 'admin' | null;
  isAdmin: boolean;
  isDemo: boolean;
}

/**
 * Server-side security authorization check for admin routes.
 * Never trusts client-submitted role parameters.
 */
export async function verifyAdminServerRole(authHeaderOrToken?: string): Promise<UserRoleCheckResult> {
  if (isDemoMode()) {
    // In local demo mode, default mock user has admin access for testing admin panels
    return {
      userId: "demo-admin-1",
      role: "admin",
      isAdmin: true,
      isDemo: true,
    };
  }

  const supabaseAdmin = getAdminSupabaseClient();
  if (!supabaseAdmin) {
    return { userId: null, role: null, isAdmin: false, isDemo: false };
  }

  try {
    // In production, token is retrieved from session cookies / auth header
    // Query profiles.role directly from PostgreSQL
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("id, role")
      .eq("id", authHeaderOrToken)
      .single();

    if (error || !profile) {
      return { userId: null, role: null, isAdmin: false, isDemo: false };
    }

    return {
      userId: profile.id,
      role: profile.role,
      isAdmin: profile.role === "admin",
      isDemo: false,
    };
  } catch (err) {
    console.error("Admin role verification failed:", err);
    return { userId: null, role: null, isAdmin: false, isDemo: false };
  }
}
