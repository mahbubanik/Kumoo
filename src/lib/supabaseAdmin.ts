import { createClient } from "@supabase/supabase-js";

// Server-only admin client — uses the service role key to bypass RLS
// This should ONLY be used in server actions and API routes, NEVER in client code.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
