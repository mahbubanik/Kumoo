import { createClient } from '@/utils/supabase/server';

/**
 * Verifies that the current request is from an authenticated user.
 * Call this at the top of every admin server action.
 * 
 * @throws Returns an error object if not authenticated.
 * @returns The authenticated user object.
 */
export async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        throw new Error('Unauthorized: You must be logged in to perform this action.');
    }

    return { supabase, user };
}
