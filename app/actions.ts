'use server';

import { supabase } from '@/lib/supabase';

interface WaitlistData {
  // Required fields
  email: string;
  role: 'landlord' | 'renter';

  // Shared fields
  phone_number?: string;
  referred_by?: string | null;

  // Landlord-specific fields
  property_details?: string;
  landlord_type?: string;
  portfolio_size?: string;
  property_location?: string;
  current_deposit_scheme?: string;
  biggest_headaches?: string[];
  has_pms?: boolean;
  prs_database_status?: string;
  web3_familiarity?: number;
  linkedin_website?: string;
  deposit_scheme_provider?: string;

  // Renter-specific fields
  target_moving_date?: string;
  desired_location?: string;
  current_rent?: number;
  budget?: number;
  student_status?: string;
  moving_status?: string;
  employment_type?: string;
  biggest_rental_fears?: string[];
}

export async function fetchWaitlist() {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      return { error: 'Failed to fetch waitlist data.' };
    }

    return { data: data || [] };
  } catch (err) {
    console.error('Server Action Error:', err);
    return { error: 'Something went wrong.' };
  }
}

// ── Pilot Signups (simplified form) ──────────────────────────────────

export async function fetchPilotSignups() {
  try {
    const { data, error } = await supabase
      .from('pilot_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      return { error: 'Failed to fetch pilot signups.' };
    }

    return { data: data || [] };
  } catch (err) {
    console.error('Server Action Error:', err);
    return { error: 'Something went wrong.' };
  }
}

export async function submitPilotSignup(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as 'landlord' | 'renter';
  const isStudent = formData.get('is_student') as string | null;
  const universityName = formData.get('university_name') as string | null;
  const gdprConsent = formData.get('gdpr_consent') === 'true';
  const referralCode = formData.get('referralCode') as string | null;
  const origin = formData.get('origin') as string | null;

  // Landlord-specific fields
  const landlordType = formData.get('landlord_type') as string | null;
  const portfolioSize = formData.get('portfolio_size') as string | null;
  const propertyLocation = formData.get('property_location') as string | null;
  const currentDepositScheme = formData.get('current_deposit_scheme') as string | null;
  const depositSchemeProvider = formData.get('deposit_scheme_provider') as string | null;
  const biggestHeadaches = formData.getAll('biggest_headaches') as string[];
  const hasPmsValue = formData.get('has_pms');
  const hasPms = hasPmsValue === 'true' ? true : hasPmsValue === 'false' ? false : null;
  const prsDbStatus = formData.get('prs_db_status') as string | null;
  const web3FamiliarityStr = formData.get('web3_familiarity') as string | null;
  const web3Familiarity = web3FamiliarityStr ? parseInt(web3FamiliarityStr, 10) : null;
  const phoneNumber = formData.get('phone_number') as string | null;
  const linkedinWebsite = formData.get('linkedin_website') as string | null;
  const letterOfIntent = formData.get('letter_of_intent') === 'true';

  if (!name || !email || !role) {
    return { error: 'Name, email, and role are required.' };
  }

  if (!gdprConsent) {
    return { error: 'You must agree to the UK GDPR consent to proceed.' };
  }

  try {
    let referredBy = null;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('pilot_signups')
        .select('id')
        .eq('referral_code', referralCode)
        .single();

      if (referrer) {
        referredBy = referrer.id;
      }
    }

    // Build the insert object
    const insertData: Record<string, unknown> = {
      name,
      email,
      role,
      gdpr_consent: gdprConsent,
      referred_by: referredBy,
    };

    // Add renter-specific fields
    if (role === 'renter') {
      if (isStudent) insertData.is_student = isStudent === 'yes';
      if (universityName) insertData.university_name = universityName;
    }

    // Add landlord-specific fields if role is landlord
    if (role === 'landlord') {
      if (landlordType) insertData.landlord_type = landlordType;
      if (portfolioSize) insertData.portfolio_size = portfolioSize;
      if (propertyLocation) insertData.property_location = propertyLocation;
      if (currentDepositScheme) insertData.current_deposit_scheme = currentDepositScheme;
      if (depositSchemeProvider) insertData.deposit_scheme_provider = depositSchemeProvider;
      if (biggestHeadaches.length > 0) insertData.biggest_headaches = biggestHeadaches;
      if (hasPms !== null) insertData.has_pms = hasPms;
      if (prsDbStatus) insertData.prs_db_status = prsDbStatus;
      if (web3Familiarity !== null) insertData.web3_familiarity = web3Familiarity;
      if (phoneNumber) insertData.phone_number = phoneNumber;
      if (linkedinWebsite) insertData.linkedin_website = linkedinWebsite;
      insertData.letter_of_intent = letterOfIntent;
    }

    const { data, error } = await supabase
      .from('pilot_signups')
      .insert([insertData])
      .select('id, position, referral_code')
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);

      if (error.code === '23505') {
        return { error: 'This email is already on the waitlist.' };
      }
      if (error.code === '42P01') {
        return { error: 'Database table not found. Please run the SQL migration.' };
      }
      if (error.code === '23503') {
        return { error: 'Invalid referral code.' };
      }
      if (error.code === '23514') {
        return { error: `Invalid field value: ${error.message}` };
      }
      return { error: `Failed to join the pilot: ${error.message}` };
    }

    const baseUrl = origin || 'http://localhost:3000';
    const referralLink = `${baseUrl}?ref=${data.referral_code}`;

    return {
      success: true,
      position: data.position,
      referralCode: data.referral_code,
      referralLink,
    };
  } catch (err) {
    console.error('Server Action Error:', err);
    return { error: 'Something went wrong.' };
  }
}

// ── Public Waitlist Stats (no personal details) ──────────────────────

export async function fetchPublicWaitlistStats() {
  try {
    const { data, error } = await supabase
      .from('pilot_signups')
      .select('role, position, created_at, gdpr_consent, letter_of_intent, is_student, university_name')
      .order('position', { ascending: true });

    if (error) {
      console.error('Supabase Error:', error);
      return { error: 'Failed to fetch waitlist stats.' };
    }

    const entries = data || [];
    const totalCount = entries.length;
    const landlordCount = entries.filter(e => e.role === 'landlord').length;
    const renterCount = entries.filter(e => e.role === 'renter').length;

    // Return anonymized list with position, role, and consent info
    const waitlist = entries.map(e => ({
      position: e.position,
      role: e.role,
      joinedAt: e.created_at,
      gdprConsent: e.gdpr_consent,
      letterOfIntent: e.letter_of_intent,
      university: e.university_name,
    }));

    return {
      totalCount,
      landlordCount,
      renterCount,
      waitlist,
    };
  } catch (err) {
    console.error('Server Action Error:', err);
    return { error: 'Something went wrong.' };
  }
}

// ── Legacy Waitlist (detailed form - kept for historical data) ───────

export async function submitWaitlist(formData: FormData) {
  const email = formData.get('email') as string;
  const role = formData.get('role') as 'landlord' | 'renter';
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

    // Build the waitlist entry based on role
    const waitlistData: WaitlistData = {
      email,
      role,
      phone_number: formData.get('phone_number') as string || undefined,
      referred_by: referredBy,
    };

    if (role === 'landlord') {
      // Landlord-specific fields
      waitlistData.property_details = formData.get('propertyDetails') as string || undefined;
      waitlistData.landlord_type = formData.get('landlord_type') as string || undefined;
      waitlistData.portfolio_size = formData.get('portfolio_size') as string || undefined;
      waitlistData.property_location = formData.get('property_location') as string || undefined;
      waitlistData.current_deposit_scheme = formData.get('current_deposit_scheme') as string || undefined;
      waitlistData.deposit_scheme_provider = formData.get('deposit_scheme_provider') as string || undefined;
      waitlistData.prs_database_status = formData.get('prs_database_status') as string || undefined;
      waitlistData.linkedin_website = formData.get('linkedin_website') as string || undefined;

      // Boolean field
      const hasPms = formData.get('has_pms');
      if (hasPms !== null) {
        waitlistData.has_pms = hasPms === 'true' || hasPms === 'yes';
      }

      // Number field
      const web3Familiarity = formData.get('web3_familiarity');
      if (web3Familiarity) {
        waitlistData.web3_familiarity = parseInt(web3Familiarity as string, 10);
      }

      // Array field (checkboxes)
      const headaches = formData.getAll('biggest_headaches') as string[];
      if (headaches.length > 0) {
        waitlistData.biggest_headaches = headaches;
      }
    } else {
      // Renter-specific fields
      waitlistData.desired_location = formData.get('desired_location') as string || undefined;
      waitlistData.student_status = formData.get('student_status') as string || undefined;
      waitlistData.moving_status = formData.get('moving_status') as string || undefined;
      waitlistData.employment_type = formData.get('employment_type') as string || undefined;

      // Date field
      const targetMovingDate = formData.get('target_moving_date') as string;
      if (targetMovingDate) {
        waitlistData.target_moving_date = targetMovingDate;
      }

      // Number fields
      const currentRent = formData.get('current_rent');
      if (currentRent) {
        waitlistData.current_rent = parseFloat(currentRent as string);
      }

      const budget = formData.get('budget');
      if (budget) {
        waitlistData.budget = parseFloat(budget as string);
      }

      // Array field (checkboxes)
      const fears = formData.getAll('biggest_rental_fears') as string[];
      if (fears.length > 0) {
        waitlistData.biggest_rental_fears = fears;
      }
    }

    // Remove undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(waitlistData).filter(([, value]) => value !== undefined)
    );

    // Insert the new waitlist entry
    const { data, error } = await supabase
      .from('waitlist')
      .insert([cleanedData])
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
