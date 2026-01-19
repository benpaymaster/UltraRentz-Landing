import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! || 'https://jwnwpbyevbdabzpqszds.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
|| 'sb_publishable_fP8hvy1h_USBsdwUcJipYA_Aa9KLqV0'

export const supabase = createClient(supabaseUrl, supabaseKey);
