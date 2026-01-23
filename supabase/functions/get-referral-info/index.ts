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
  role: string;
}

interface WaitlistEntry {
  // Shared fields
  email: string;
  role: 'landlord' | 'renter';
  phone_number?: string;
  referral_code?: string;
  referred_by?: string;

  // Landlord fields
  landlord_type?: 'individual' | 'limited_company' | 'letting_agent' | 'institutional_pbsa';
  portfolio_size?: '1' | '2-5' | '6-20' | '20+';
  property_location?: string;
  current_deposit_scheme?: 'custodial' | 'insurance_backed' | 'none_halls';
  biggest_headaches?: string[];
  has_pms?: boolean;
  prs_database_status?: 'yes' | 'no' | 'in_progress';
  web3_familiarity?: number;
  linkedin_website?: string;
  deposit_scheme_provider?: 'mydeposit' | 'tdp' | 'dps' | 'none';

  // Renter fields
  target_moving_date?: string;
  desired_location?: string;
  current_rent?: number;
  budget?: number;
  student_status?: 'university' | 'private_hmo' | 'hall' | 'not_student';
  moving_status?: 'currently_looking' | 'tenancy_ends_3_6_months';
  employment_type?: 'full_time' | 'student' | 'self_employed' | 'international';
  biggest_rental_fears?: string[];
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'get_referral';

    // Action: Get referral info by code
    if (action === 'get_referral') {
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

      const { data, error } = await supabaseClient
        .from('waitlist')
        .select('id, email, position, referral_code, referral_count, role')
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

      const baseUrl = req.headers.get('origin') || 'https://ultrarentz.vercel.app';
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
    }

    // Action: Get waitlist analytics (for presentations)
    if (action === 'analytics') {
      // Total counts
      const { count: totalCount } = await supabaseClient
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      const { count: landlordCount } = await supabaseClient
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'landlord');

      const { count: renterCount } = await supabaseClient
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'renter');

      // Landlord type breakdown
      const { data: landlordTypes } = await supabaseClient
        .from('waitlist')
        .select('landlord_type')
        .eq('role', 'landlord')
        .not('landlord_type', 'is', null);

      // Portfolio size breakdown
      const { data: portfolioSizes } = await supabaseClient
        .from('waitlist')
        .select('portfolio_size')
        .eq('role', 'landlord')
        .not('portfolio_size', 'is', null);

      // Deposit scheme providers
      const { data: depositProviders } = await supabaseClient
        .from('waitlist')
        .select('deposit_scheme_provider')
        .eq('role', 'landlord')
        .not('deposit_scheme_provider', 'is', null);

      // Employment types
      const { data: employmentTypes } = await supabaseClient
        .from('waitlist')
        .select('employment_type')
        .eq('role', 'renter')
        .not('employment_type', 'is', null);

      // Web3 familiarity average
      const { data: web3Data } = await supabaseClient
        .from('waitlist')
        .select('web3_familiarity')
        .eq('role', 'landlord')
        .not('web3_familiarity', 'is', null);

      const web3Avg = web3Data && web3Data.length > 0
        ? web3Data.reduce((sum: number, item: { web3_familiarity: number }) => sum + item.web3_familiarity, 0) / web3Data.length
        : 0;

      // Count occurrences helper
      const countOccurrences = (arr: { [key: string]: string }[], key: string) => {
        const counts: { [key: string]: number } = {};
        arr?.forEach(item => {
          const value = item[key];
          if (value) {
            counts[value] = (counts[value] || 0) + 1;
          }
        });
        return counts;
      };

      const analytics = {
        total_signups: totalCount,
        landlords: landlordCount,
        renters: renterCount,
        landlord_types: countOccurrences(landlordTypes || [], 'landlord_type'),
        portfolio_sizes: countOccurrences(portfolioSizes || [], 'portfolio_size'),
        deposit_providers: countOccurrences(depositProviders || [], 'deposit_scheme_provider'),
        employment_types: countOccurrences(employmentTypes || [], 'employment_type'),
        avg_web3_familiarity: Math.round(web3Avg * 10) / 10,
      };

      return new Response(
        JSON.stringify(analytics),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
