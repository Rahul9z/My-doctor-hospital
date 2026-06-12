import { createClient } from '@supabase/supabase-js';

// These environment variables need to be added to .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
