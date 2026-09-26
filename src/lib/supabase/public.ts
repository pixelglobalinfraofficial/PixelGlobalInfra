import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";
import type { Database } from "./types";

/**
 * Supabase client for public, unauthenticated reads (project listings) that
 * run outside a request — e.g. generateStaticParams, which executes at build
 * time and cannot read cookies. `projects` and `project_images` are publicly
 * readable under RLS, so no session is needed here; admin actions still go
 * through the cookie-aware client in ./server.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
