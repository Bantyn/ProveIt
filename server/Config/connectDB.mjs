import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables');
}

export const supabase = createClient(
    supabaseUrl, 
    supabaseServiceRoleKey,
    {
        auth: { 
            persistSession: false //In simple words : “Don’t store or remember login sessions automatically.”
        }
    }
);

console.log('Supabase client created successfully');