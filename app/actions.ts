'use server';

import { supabase } from '@/lib/supabase';

export async function submitWaitlist(formData: FormData) {
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const propertyDetails = formData.get('propertyDetails') as string;
  const referralCode = formData.get('referralCode') as string | null;
  const origin = formData.get('origin') as string | null;

  if (!email || !role) {
    return { error: 'Email and Role are required.' };
  }

  try {
    // If there's a referral code, look up the referrer
    let referredBy = null;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('waitlist')
        .select('id')
        .eq('referral_code', referralCode)
        .single();

      if (referrer) {
        referredBy = referrer.id;
      }
    }

    // Insert the new waitlist entry
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          role,
          property_details: propertyDetails,
          referred_by: referredBy,
        }
      ])
      .select('id, position, referral_code')
      .single();

    if (error) {
      console.error('Supabase Error:', error);

      // Check for duplicate email
      if (error.code === '23505') {
        return { error: 'This email is already on the waitlist.' };
      }

      return { error: 'Failed to join waitlist. Please try again.' };
    }

    // Generate referral link using the origin from the client request
    const baseUrl = origin || 'http://localhost:3000';
    const referralLink = `${baseUrl}?ref=${data.referral_code}`;

    return {
      success: true,
      position: data.position,
      referralCode: data.referral_code,
      referralLink
    };
  } catch (err) {
    console.error('Server Action Error:', err);
    return { error: 'Something went wrong.' };
  }
}
