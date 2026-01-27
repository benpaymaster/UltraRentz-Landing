-- UltraRentz Waitlist Table with Referral Tracking
-- Run this in your Supabase SQL Editor

-- Create waitlist table with referral tracking
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('landlord', 'renter')),
  property_details TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES waitlist(id) ON DELETE SET NULL,
  position INTEGER,
  referral_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to update position on new entry
CREATE OR REPLACE FUNCTION update_waitlist_positions()
RETURNS TRIGGER AS $$
BEGIN
  -- Set position for new entry
  NEW.position := (SELECT COALESCE(MAX(position), 0) + 1 FROM waitlist);

  -- Generate unique referral code if not exists
  IF NEW.referral_code IS NULL OR NEW.referral_code = '' THEN
    LOOP
      NEW.referral_code := generate_referral_code();
      EXIT WHEN NOT EXISTS (SELECT 1 FROM waitlist WHERE referral_code = NEW.referral_code);
    END LOOP;
  END IF;

  -- Update referrer's referral count
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE waitlist
    SET referral_count = referral_count + 1,
        updated_at = NOW()
    WHERE id = NEW.referred_by;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update positions and referral codes
DROP TRIGGER IF EXISTS trigger_update_waitlist_positions ON waitlist;
CREATE TRIGGER trigger_update_waitlist_positions
  BEFORE INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_waitlist_positions();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS trigger_update_waitlist_timestamp ON waitlist;
CREATE TRIGGER trigger_update_waitlist_timestamp
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert (join waitlist)
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow users to read their own data
CREATE POLICY "Allow users to read own data" ON waitlist
  FOR SELECT TO anon, authenticated
  USING (true);

-- Policy to allow updates (for referral counts)
CREATE POLICY "Allow referral count updates" ON waitlist
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Optional: View to get leaderboard (most referrals)
CREATE OR REPLACE VIEW waitlist_leaderboard AS
SELECT
  id,
  email,
  role,
  position,
  referral_count,
  created_at
FROM waitlist
ORDER BY referral_count DESC, created_at ASC
LIMIT 100;
