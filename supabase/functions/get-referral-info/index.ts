// Supabase Edge Function: get-referral-info
// Deploy this using: supabase functions deploy get-referral-info

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReferralInfo {
  id: string;
  email: string;
  position: number;
  referral_code: string;
  referral_count: number;
  referral_link: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { referral_code } = await req.json();

    if (!referral_code) {
      return new Response(
        JSON.stringify({ error: 'Referral code is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Look up the referral code
    const { data, error } = await supabaseClient
      .from('waitlist')
      .select('id, email, position, referral_code, referral_count')
      .eq('referral_code', referral_code)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: 'Invalid referral code' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate referral link
    const baseUrl = req.headers.get('origin') || 'https://ultrarentz.com';
    const referral_link = `${baseUrl}?ref=${data.referral_code}`;

    const response: ReferralInfo = {
      ...data,
      referral_link,
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
