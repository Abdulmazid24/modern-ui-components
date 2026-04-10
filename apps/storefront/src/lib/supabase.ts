import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';

// Use Service Role Key for backend administration (bypassing RLS)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

/**
 * DB Schema Expectation:
 * Table: `vault_licenses`
 * Columns:
 *  - `id` (uuid)
 *  - `user_id` (string)
 *  - `license_key` (string, unique)
 *  - `tier` (string) e.g., 'pro', 'enterprise'
 *  - `is_active` (boolean)
 */
