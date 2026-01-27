-- Migration: Add detailed waitlist fields for Landlords and Renters
-- Run this in your Supabase SQL Editor to update the existing waitlist table

-- =====================================================
-- SHARED FIELDS (Both Landlord and Renter)
-- =====================================================

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- =====================================================
-- LANDLORD-SPECIFIC FIELDS
-- =====================================================

-- Landlord Segmentation
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS landlord_type TEXT
  CHECK (landlord_type IS NULL OR landlord_type IN ('individual', 'limited_company', 'letting_agent', 'institutional_pbsa'));

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS portfolio_size TEXT
  CHECK (portfolio_size IS NULL OR portfolio_size IN ('1', '2-5', '6-20', '20+'));

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS property_location TEXT;

-- Current Pain Points
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS current_deposit_scheme TEXT
  CHECK (current_deposit_scheme IS NULL OR current_deposit_scheme IN ('custodial', 'insurance_backed', 'none_halls'));

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS biggest_headaches TEXT[];
-- Array of: 'slow_deposit_release', 'dispute_resolution', 'admin_costs', 'lack_of_yield'

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS has_pms BOOLEAN; -- Uses Property Management System

-- Compliance & Technical
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS prs_database_status TEXT
  CHECK (prs_database_status IS NULL OR prs_database_status IN ('yes', 'no', 'in_progress'));

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS web3_familiarity INTEGER
  CHECK (web3_familiarity IS NULL OR (web3_familiarity >= 1 AND web3_familiarity <= 5));

-- Verification
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS linkedin_website TEXT;

-- Deposit Scheme Provider (UK specific)
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS deposit_scheme_provider TEXT
  CHECK (deposit_scheme_provider IS NULL OR deposit_scheme_provider IN ('mydeposit', 'tdp', 'dps', 'none'));

-- =====================================================
-- RENTER-SPECIFIC FIELDS
-- =====================================================

-- Basic Info
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS target_moving_date DATE;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS desired_location TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS current_rent DECIMAL(10, 2);
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS budget DECIMAL(10, 2);

-- Pre-Qualification Details
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS student_status TEXT
  CHECK (student_status IS NULL OR student_status IN ('university', 'private_hmo', 'hall', 'not_student'));

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS moving_status TEXT
  CHECK (moving_status IS NULL OR moving_status IN ('currently_looking', 'tenancy_ends_3_6_months'));

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS employment_type TEXT
  CHECK (employment_type IS NULL OR employment_type IN ('full_time', 'student', 'self_employed', 'international'));

-- Pain Point Feedback
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS biggest_rental_fears TEXT[];
-- Array of: 'deposit_withheld', 'two_deposits_at_once', '56_year_wait'

-- =====================================================
-- CREATE INDEXES FOR NEW FIELDS
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_waitlist_landlord_type ON waitlist(landlord_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_portfolio_size ON waitlist(portfolio_size);
CREATE INDEX IF NOT EXISTS idx_waitlist_property_location ON waitlist(property_location);
CREATE INDEX IF NOT EXISTS idx_waitlist_employment_type ON waitlist(employment_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_desired_location ON waitlist(desired_location);

-- =====================================================
-- UPDATED VIEW FOR ANALYTICS
-- =====================================================

DROP VIEW IF EXISTS waitlist_analytics;
CREATE VIEW waitlist_analytics AS
SELECT
  id,
  email,
  role,
  position,
  referral_count,
  created_at,
  -- Landlord fields
  landlord_type,
  portfolio_size,
  property_location,
  current_deposit_scheme,
  biggest_headaches,
  has_pms,
  prs_database_status,
  web3_familiarity,
  deposit_scheme_provider,
  -- Renter fields
  target_moving_date,
  desired_location,
  current_rent,
  budget,
  student_status,
  moving_status,
  employment_type,
  biggest_rental_fears
FROM waitlist
ORDER BY created_at DESC;

-- =====================================================
-- HELPFUL ANALYTICS QUERIES
-- =====================================================

-- Landlord breakdown by type
-- SELECT landlord_type, COUNT(*) FROM waitlist WHERE role = 'landlord' GROUP BY landlord_type;

-- Renter employment breakdown
-- SELECT employment_type, COUNT(*) FROM waitlist WHERE role = 'renter' GROUP BY employment_type;

-- Most common landlord pain points
-- SELECT unnest(biggest_headaches) as pain_point, COUNT(*) FROM waitlist WHERE role = 'landlord' GROUP BY pain_point ORDER BY count DESC;

-- Most common renter fears
-- SELECT unnest(biggest_rental_fears) as fear, COUNT(*) FROM waitlist WHERE role = 'renter' GROUP BY fear ORDER BY count DESC;

-- Web3 familiarity distribution
-- SELECT web3_familiarity, COUNT(*) FROM waitlist WHERE role = 'landlord' GROUP BY web3_familiarity ORDER BY web3_familiarity;

-- Portfolio size distribution
-- SELECT portfolio_size, COUNT(*) FROM waitlist WHERE role = 'landlord' GROUP BY portfolio_size;

-- Deposit scheme provider distribution
-- SELECT deposit_scheme_provider, COUNT(*) FROM waitlist WHERE role = 'landlord' GROUP BY deposit_scheme_provider;
