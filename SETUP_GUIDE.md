# Modern UI Vault - Backend & Payment Setup Guide

আপনার প্রজেক্টের কোডবেস ১০০% প্রস্তুত। কিন্তু ডাটাবেস এবং পেমেন্ট রিসিভ করার জন্য আপনাকে **Supabase** এবং **LemonSqueezy** (পেমেন্ট গেটওয়ে)-তে কিছু ম্যানুয়াল সেটআপ করতে হবে। এই গাইডটি ধাপে ধাপে ফলো করুন।

---

## 🟢 ধাপ ১: Supabase (ডাটাবেস) সেটআপ

১. [Supabase](https://supabase.com/)-এ লগইন করুন এবং একটি নতুন প্রজেক্ট তৈরি করুন। Database Password টি মনে রাখুন।
২. বা দিকের মেনু থেকে **"SQL Editor"** এ যান।
৩. আপনার প্রজেক্টের `apps/storefront/supabase/schema.sql` ফাইলের পুরো কোডটি কপি করুন এবং SQL Editor এ পেস্ট করে **Run** এ ক্লিক করুন। 
   *(এটি স্বয়ংক্রিয়ভাবে Licenses, Downloads, Webhooks এবং Analytics টেবিল তৈরি করে দেবে এবং Security Policy সেট করে দেবে।)*
৪. ডাটাবেস সেটআপ হয়ে গেলে, বা দিকের মেনু থেকে **"Project Settings"** (গিয়ার আইকন) এ ক্লিক করুন এবং **"API"** সেকশনে যান।
৫. এখান থেকে দুটি জিনিস কপি করুন:
   - **Project URL** (এটি `NEXT_PUBLIC_SUPABASE_URL` হিসেবে লাগবে)
   - **service_role secret** (এটি `SUPABASE_SERVICE_ROLE_KEY` হিসেবে লাগবে। ভুলেও 'anon public' কী নেবেন না, কারণ আমাদের ব্যাকএন্ড লাইসেন্স তৈরি করার জন্য এডমিন পারমিশন দরকার)।

---

## 🍋 ধাপ ২: LemonSqueezy (পেমেন্ট গেটওয়ে) সেটআপ

যেহেতু আমরা স্ট্রাইপের বদলে LemonSqueezy ব্যবহার করছি (এটি Merchant of Record, তাই গ্লোবাল ট্যাক্স নিয়ে আপনার ভাবতে হবে না), নিচের ধাপগুলো ফলো করুন:

১. [LemonSqueezy](https://www.lemonsqueezy.com/)-এ স্টোর খুলুন।
২. **Store Settings** থেকে **Products** এ যান এবং ৩টি প্রোডাক্ট (বা ভ্যারিয়েন্ট) তৈরি করুন:
   - প্রোডাক্ট ১: **Pro License** (Price: $79, Single Payment/Subscription আপনার ইচ্ছা অনুযায়ী)।
   - প্রোডাক্ট ২: **Team License** (Price: $199)।
   - প্রোডাক্ট ৩: **Enterprise License** (Price: $499)।
৩. প্রতিটি প্রোডাক্ট সেভ করার পর আপনি একটি **Variant ID** পাবেন। এই ID গুলো কপি করে রাখুন।

### ওয়েবহুক (Webhook) সেটআপ
*ওয়েবহুক খুবই গুরুত্বপূর্ণ। কেউ পেমেন্ট করলেই LemonSqueezy আপনার ওয়েবসাইটে সিগন্যাল পাঠাবে এবং আপনার ওয়েবসাইট সাথে সাথে Supabase-এ একটি লাইসেন্স কী (License Key) তৈরি করে ইউজারকে ইমেইল করবে।*

৪. LemonSqueezy-এর বা দিকের মেনু থেকে **Settings > Webhooks** এ যান এবং **"New Webhook"** বা বাটনে ক্লিক করুন।
৫. **Webhook URL** এর জায়গায় আপনার Vercel এ ডেপ্লয় করা সাইটের URL দিন এভাবে: 
   `https://[আপনার-ডোমেইন.com]/api/webhooks/lemonsqueezy`
   *(যদি সাইট এখনো ডেপ্লয় না করে থাকেন, তবে Vercel এ আগে ডেপ্লয় করে লিংকটি বসান)।*
৬. **Events** সেকশনে নিচেরগুলো সিলেক্ট করুন (টিক দিন):
   - `order_created`
   - `order_refunded`
   - `subscription_created` (যদি সাবস্ক্রিপশন মডেল রাখেন)
   - `subscription_cancelled`
   - `subscription_expired`
৭. **Signing Secret**: এখানে নিজের মতো একটি কঠিন পাসওয়ার্ড দিন (যেমন: `my_super_secret_webhook_key_2026`)। এটি কপি করে যত্ন করে রাখুন।
৮. **Save Webhook** এ ক্লিক করুন।

### চেকআউট লিঙ্ক (Checkout Links) তৈরি
৯. প্রোডাক্ট পেজ থেকে আপনার ৩টি প্রোডাক্টের "Checkout Link" বা "Share Link" কপি করে রাখুন।

---

## 🔒 ধাপ ৩: Environment Variables (.env) সেটআপ করা

আপনার লোকাল মেশিনে (টেস্টিংয়ের জন্য) `apps/storefront/.env.local` ফাইলে এবং Vercel-এর Project Settings -> Environment Variables এ গিয়ে নিচের কোডগুলো বসিয়ে দিন:

```env
# URL of your Next.js application
NEXT_PUBLIC_SITE_URL=https://আপনার-ডোমেইন.com

# Supabase API credentials (ধাপ ১ থেকে পাওয়া)
NEXT_PUBLIC_SUPABASE_URL=আপনার_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=আপনার_service_role_key

# LemonSqueezy Webhook Secret (ধাপ ২.৭ থেকে পাওয়া)
LEMONSQUEEZY_WEBHOOK_SECRET=my_super_secret_webhook_key_2026

# LemonSqueezy Variant IDs (ধাপ ২.৩ থেকে পাওয়া)
LEMONSQUEEZY_PRO_VARIANT_ID=12345
LEMONSQUEEZY_TEAM_VARIANT_ID=12346
LEMONSQUEEZY_ENTERPRISE_VARIANT_ID=12347

# Checkout URLs (ধাপ ২.৯ থেকে পাওয়া)
NEXT_PUBLIC_PRO_CHECKOUT_URL=https://আপনার-স্টোর.lemonsqueezy.com/checkout/buy/xxx
NEXT_PUBLIC_TEAM_CHECKOUT_URL=https://আপনার-স্টোর.lemonsqueezy.com/checkout/buy/yyy
NEXT_PUBLIC_ENTERPRISE_CHECKOUT_URL=https://আপনার-স্টোর.lemonsqueezy.com/checkout/buy/zzz
```

## ✅ চেকলিস্ট ও টেস্টিং

সব ঠিকঠাক থাকলে এই ঘটনাটি ঘটবে:
১. ইউজার আপনার সাইট থেকে `Buy Now` তে ক্লিক করে LemonSqueezy এর চেকআউট পেজে যাবে।
২. ইউজার পেমেন্ট কমপ্লিট করবে (LemonSqueezy 'Test Mode' ব্যবহার করে ফেক কার্ড দিয়ে পেমেন্ট চেক করতে পারেন)।
৩. পেমেন্ট সাকসেসফুল হলে LemonSqueezy আপনার সাইটের `/api/webhooks/lemonsqueezy` তে কল করবে।
৪. আপনার সিস্টেম সিগনেচার ভেরিফাই করে Supabase এ ডাটা এন্ট্রি করবে এবং ইউজার তার CLI ও সাইট ব্যবহারের জন্য একটি License Key পেয়ে যাবে!
