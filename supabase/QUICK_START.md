# 🚀 Quick Start - 5 Minutes to Launch

## Step 1: Setup Supabase (2 minutes)

### A. Run the Schema
1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy everything from `supabase/schema.sql`
6. Paste and click **Run**
7. ✅ You should see "Success. No rows returned"

### B. Get Your Credentials
1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values:

```
Project URL: https://xxx.supabase.co
anon/public key: eyJhbGc...
```

---

## Step 2: Configure Environment (1 minute)

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace with your actual values from Step 1B.

---

## Step 3: Install & Run (2 minutes)

```bash
# Install dependencies (if not already done)
npm install
# or
yarn install

# Start dev server
npm run dev
# or
yarn dev
```

---

## Step 4: Test It! (1 minute)

1. Open http://localhost:3000
2. Scroll to the "Join the Pilot Program" section
3. Enter your email
4. Select Landlord or Renter
5. Add property details
6. Click "Join Pilot Waitlist"

You should see:
- ✅ "You're on the list!"
- ✅ "You're #1 on the list" (your position)
- ✅ A unique referral link
- ✅ Copy and Share buttons

---

## ✅ Verify in Database

Go back to Supabase → **Table Editor** → `waitlist`

You should see your entry with:
- Email
- Role
- Position (1)
- Referral code (8 chars)
- Timestamp

---

## 🎉 Done!

Your waitlist is live! Now test the referral system:

1. Copy your referral link
2. Open in incognito/private window
3. You'll see "🎉 You were referred!"
4. Sign up with different email
5. Check database - `referred_by` should link to first entry
6. First entry's `referral_count` should be 1

---

## 🆘 Troubleshooting

**Issue**: "Failed to join waitlist"
- ✅ Check `.env.local` has correct Supabase URL and key
- ✅ Verify schema was run successfully
- ✅ Check browser console for errors

**Issue**: Position not showing
- ✅ Refresh the page after schema creation
- ✅ Check `position` column exists in database
- ✅ Verify trigger was created

**Issue**: Can't find waitlist table
- ✅ Re-run the schema.sql file
- ✅ Check you're in the correct Supabase project

---

## 🔧 Production Deployment

When deploying to production:

1. Update `.env.local` → production values
2. Change `NEXT_PUBLIC_APP_URL` to your domain
3. Deploy to Vercel/Netlify/etc
4. Test with real domain

Example production `.env`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_APP_URL=https://ultrarentz.com
```

---

## 📚 Next Steps

- Read [WAITLIST_SETUP.md](../WAITLIST_SETUP.md) for detailed docs
- Read [IMPLEMENTATION_SUMMARY.md](../IMPLEMENTATION_SUMMARY.md) for technical overview
- Customize the share message in [components/CTA.tsx](../components/CTA.tsx)
- Set up email notifications (optional)
- Create admin dashboard (optional)

---

## 💡 Pro Tips

1. **Test referral flow thoroughly** - This is your viral growth engine
2. **Monitor signups** - Watch the `waitlist` table in Supabase
3. **Incentivize referrals** - Consider rewards for top referrers
4. **Share the "Share on X" button** - Make it prominent
5. **Track analytics** - Use the SQL queries in WAITLIST_SETUP.md

---

**Questions?** Check the docs or inspect the code - it's well commented!
