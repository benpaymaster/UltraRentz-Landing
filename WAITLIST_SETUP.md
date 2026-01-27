# UltraRentz Waitlist with Referral System - Setup Guide

## 🎯 Overview

This waitlist system includes:
- Email collection with role selection (Landlord/Renter)
- Automatic position tracking ("You're #50 on the list")
- Unique referral link generation for each user
- "Share on X" button for viral growth
- Referral tracking (who referred whom)
- Automatic referral count updates

---

## 📋 Setup Instructions

### 1. Run the Database Schema

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to the **SQL Editor**
3. Open the file: `supabase/schema.sql`
4. Copy and paste the entire contents into the SQL Editor
5. Click **Run** to execute the schema

This will create:
- `waitlist` table with all necessary columns
- Automatic position numbering
- Unique referral code generation
- Triggers for updating referral counts
- Row Level Security (RLS) policies

### 2. Deploy the Supabase Edge Function (Optional)

The edge function is optional - the main functionality works without it. If you want to use it:

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy the edge function
supabase functions deploy get-referral-info
```

### 3. Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your production URL
```

### 4. Install Dependencies (if needed)

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

---

## 🚀 How It Works

### User Flow:

1. **User visits site** → Sees waitlist form
2. **User enters email** → Selects role (Landlord/Renter) and property details
3. **Submits form** → Gets added to waitlist
4. **Success screen shows**:
   - Their position (#50)
   - Unique referral link
   - Copy button for the link
   - "Share on X" button

### Referral Flow:

1. **User A** joins and gets referral code: `ABC123XY`
2. **User A** shares: `https://yoursite.com?ref=ABC123XY`
3. **User B** clicks link → Sees "You were referred!" banner
4. **User B** joins → Automatically linked to User A
5. **User A's** referral count increments

---

## 📊 Database Schema

### `waitlist` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `email` | TEXT | User's email (unique) |
| `role` | TEXT | "landlord" or "renter" |
| `property_details` | TEXT | User's property info |
| `referral_code` | TEXT | Unique 8-char code (auto-generated) |
| `referred_by` | UUID | ID of user who referred them |
| `position` | INTEGER | Position in waitlist (auto-calculated) |
| `referral_count` | INTEGER | Number of successful referrals |
| `created_at` | TIMESTAMP | When they joined |
| `updated_at` | TIMESTAMP | Last update |

### Automatic Features:

- **Position**: Auto-increments for each new user
- **Referral Code**: Randomly generated unique 8-character code
- **Referral Count**: Auto-updates when someone joins via their link

---

## 🎨 UI Features

### Success Screen Includes:

✅ Animated position display (#50)
✅ Referral link with copy button
✅ "Share on X" button (pre-filled tweet)
✅ Visual referral code display
✅ Gradient animations

### Referral Detection:

When users arrive via `?ref=CODE`:
- Shows blue banner: "🎉 You were referred!"
- Automatically tracks the referral on signup

---

## 🔍 Testing

### Test the Complete Flow:

1. **Submit a waitlist entry**:
   - Go to your site
   - Fill out the form
   - Submit

2. **Check your position**:
   - You should see "You're #1 on the list"

3. **Get your referral link**:
   - Copy the referral link shown

4. **Test referral**:
   - Open incognito/private window
   - Paste your referral link
   - Should see "You were referred!" banner
   - Submit another entry
   - Check database to verify `referred_by` is set

### Verify in Supabase:

```sql
-- View all waitlist entries
SELECT * FROM waitlist ORDER BY position;

-- Check referral counts
SELECT email, referral_count, position
FROM waitlist
ORDER BY referral_count DESC;

-- See referral chain
SELECT
  w1.email as referrer,
  w2.email as referred,
  w1.referral_code
FROM waitlist w1
LEFT JOIN waitlist w2 ON w1.id = w2.referred_by;
```

---

## 🛠️ Customization

### Change Referral Code Length:

In `supabase/schema.sql`, modify the `generate_referral_code()` function:

```sql
FOR i IN 1..8 LOOP  -- Change 8 to your desired length
```

### Customize Share Message:

In `components/CTA.tsx`, find the `shareOnX` function:

```typescript
const text = `Your custom message here!`;
```

### Update App URL:

In `.env.local`:

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 📈 Analytics Ideas

Track these metrics in Supabase:

```sql
-- Total signups
SELECT COUNT(*) FROM waitlist;

-- Signups by role
SELECT role, COUNT(*) FROM waitlist GROUP BY role;

-- Top referrers
SELECT email, referral_count
FROM waitlist
WHERE referral_count > 0
ORDER BY referral_count DESC
LIMIT 10;

-- Referral conversion rate
SELECT
  ROUND(100.0 * COUNT(CASE WHEN referred_by IS NOT NULL THEN 1 END) / COUNT(*), 2) as referral_percentage
FROM waitlist;
```

---

## 🐛 Troubleshooting

### Issue: "Failed to join waitlist"

**Check**:
1. Supabase URL and keys are correct in `.env.local`
2. Schema has been run in Supabase SQL Editor
3. RLS policies are enabled
4. Check browser console for errors

### Issue: Duplicate email error

**Expected behavior**: System prevents duplicate signups
**Message**: "This email is already on the waitlist."

### Issue: Position not showing

**Check**:
1. `position` column exists in database
2. Trigger `trigger_update_waitlist_positions` is active
3. Check database for the position value

### Issue: Referral not tracking

**Check**:
1. URL contains `?ref=CODE` parameter
2. Referral code exists in database
3. `referred_by` foreign key constraint is set up

---

## 🔐 Security Notes

- RLS (Row Level Security) is enabled
- Email uniqueness is enforced at database level
- Referral codes are randomly generated (8 chars = 2.8 trillion combinations)
- Public can INSERT and SELECT (needed for waitlist functionality)
- Consider adding rate limiting in production

---

## 📝 Next Steps

Consider adding:
- Email confirmation/verification
- Admin dashboard to view waitlist
- Export waitlist to CSV
- Automated email sequences
- Referral leaderboard page
- Move users up in position based on referrals

---

## 🎉 You're Done!

Your waitlist is now ready with:
✅ Email collection
✅ Position tracking
✅ Referral system
✅ Share on X functionality
✅ Automatic referral counting

Questions? Check the code comments in:
- `supabase/schema.sql`
- `app/actions.ts`
- `components/CTA.tsx`
