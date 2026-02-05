-- UltraRentz Pilot Signups (Simplified)
-- Run this in your Supabase SQL Editor

-- Create pilot_signups table
CREATE TABLE IF NOT EXISTS pilot_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('landlord', 'renter')),
  university_name TEXT NOT NULL DEFAULT 'University of Hertfordshire',
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES pilot_signups(id) ON DELETE SET NULL,
  position INTEGER,
  referral_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pilot_signups_email ON pilot_signups(email);
CREATE INDEX IF NOT EXISTS idx_pilot_signups_referral_code ON pilot_signups(referral_code);
CREATE INDEX IF NOT EXISTS idx_pilot_signups_created_at ON pilot_signups(created_at);

-- Reuse the existing generate_referral_code() function from schema.sql

-- Trigger function for auto-position and referral code
CREATE OR REPLACE FUNCTION update_pilot_signup_positions()
RETURNS TRIGGER AS $$
BEGIN
  -- Set position for new entry
  NEW.position := (SELECT COALESCE(MAX(position), 0) + 1 FROM pilot_signups);

  -- Generate unique referral code
  IF NEW.referral_code IS NULL OR NEW.referral_code = '' THEN
    LOOP
      NEW.referral_code := generate_referral_code();
      EXIT WHEN NOT EXISTS (SELECT 1 FROM pilot_signups WHERE referral_code = NEW.referral_code);
    END LOOP;
  END IF;

  -- Update referrer's referral count
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE pilot_signups
    SET referral_count = referral_count + 1
    WHERE id = NEW.referred_by;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS trigger_update_pilot_signup_positions ON pilot_signups;
CREATE TRIGGER trigger_update_pilot_signup_positions
  BEFORE INSERT ON pilot_signups
  FOR EACH ROW
  EXECUTE FUNCTION update_pilot_signup_positions();

-- Enable Row Level Security
ALTER TABLE pilot_signups ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "Allow public insert pilot" ON pilot_signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow public read
CREATE POLICY "Allow public read pilot" ON pilot_signups
  FOR SELECT TO anon, authenticated
  USING (true);

-- Allow updates (for referral counts)
CREATE POLICY "Allow referral updates pilot" ON pilot_signups
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);
