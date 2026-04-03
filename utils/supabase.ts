import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mpegkjugzlWqehdwdjmo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_XFr0zIUiXx0LN3hVa1l9XQ_RnQDORVF';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
