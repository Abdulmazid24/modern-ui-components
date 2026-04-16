# 🚀 The Ultimate Production Launch Checklist

আপনার "Modern UI Vault" প্রজেক্টটি কোডিংয়ের দিক থেকে ১০০% প্রস্তুত। সিস্টেমটিকে লাইভ করার জন্য থার্ড-পার্টি সার্ভিসগুলোতে কিছু ম্যানুয়াল একাউন্ট এবং API Key জেনারেট করতে হবে। নিচে এ টু জেড সবকিছুর চেকলিস্ট দেওয়া হলো। 

> [!IMPORTANT]
> প্রোডাকশনে সাইট ডেপ্লয় করার আগ পর্যন্ত নিচের প্রতিটি ধাপ সম্পন্ন করা বাধ্যতামূলক।

---

### 🟢 1. Database Setup (Supabase)
লাইসেন্স ভেরিফিকেশন, ইউজার ডাটা এবং এনালাইটিক্স সেভ করার জন্য।
- [ ] [Supabase.com](https://supabase.com) এ ফ্রি প্রজেক্ট তৈরি করুন।
- [ ] `SQL Editor` এ গিয়ে `apps/storefront/supabase/schema.sql` এর সম্পূর্ণ কোডটি রান করুন। 
- [ ] `Project Settings > API` থেকে `Project URL` কপি করুন।
- [ ] একই জায়গা থেকে **`service_role`** Secret Key টা কপি করবেন। *(সতর্কতা: `anon` public key কপি করবেন না, আমাদের সিস্টেমটি সম্পূর্ণ সুরক্ষিত এবং শুধুমাত্র service_role দিয়েই ডাটাবেস হ্যান্ডেল করে)।*

### 🍋 2. Payment Gateway (LemonSqueezy)
পেমেন্ট রিসিভ করার জন্য Merchant of Record.
- [ ] [LemonSqueezy.com](https://lemonsqueezy.com) এ স্টোর খুলুন।
- [ ] **Products** সেকশনে গিয়ে ৩টি প্রোডাক্ট তৈরি করুন: Pro ($79), Team ($199), Enterprise ($499)।
- [ ] প্রতিটি প্রোডাক্টের `Variant ID` এবং `Checkout Link` কপি করে সংরক্ষণ করুন।
- [ ] **Settings > Webhooks** এ যান এবং নতুন ওয়েবহুক সেটআপ করুন:
  - **URL:** `https://আপনার-লাইভ-ডোমেইন.com/api/webhooks/lemonsqueezy`
  - **Events:** `order_created`, `order_refunded`, `subscription_cancelled` সিলেক্ট করুন।
  - **Signing Secret:** আপনার পছন্দমতো একটি শক্তিশালী পাসওয়ার্ড দিন এবং সেভ করুন।

### 🛡️ 3. API Security & Rate Limiting (Upstash)
স্ক্র্যাপার এবং হ্যাকারদের API Abuse থেকে রক্ষা করতে।
- [ ] [Upstash.com](https://upstash.com) এ ফ্রি একাউন্ট করুন।
- [ ] একটি **Redis Database** তৈরি করুন।
- [ ] ডাটাবেস ড্যাশবোর্ড থেকে `UPSTASH_REDIS_REST_URL` এবং `UPSTASH_REDIS_REST_TOKEN` কপি করুন।

### 📧 4. Transactional Emails (Resend)
পেমেন্ট হওয়ার পর অটোমেটিক ইউজারকে লাইসেন্স কী ইমেইল করার জন্য।
- [ ] [Resend.com](https://resend.com) এ ফ্রি একাউন্ট করুন।
- [ ] আপনার ডোমেইনটি (যথা: `modern-ui-vault.dev`) ভেরিফাই করুন (DNS রেকর্ড ব্যবহার করে)।
- [ ] `API Keys` সেকশন থেকে একটি `RESEND_API_KEY` জেনারেট করে কপি করুন।

### 🚨 5. Error Tracking (Sentry)
প্রোডাকশন সার্ভারে বা পেমেন্ট ওয়েবহুকে কোনো এরর হলে তা সরাসরি আপনার মোবাইলে/ইমেইলে জানার জন্য।
- [ ] [Sentry.io](https://sentry.io) এ একাউন্ট করুন।
- [ ] নতুন প্রজেক্ট হিসেবে `Next.js` সিলেক্ট করুন।
- [ ] `NEXT_PUBLIC_SENTRY_DSN` লিংকটি কপি করুন।

---

### 🌐 6. Vercel Deployment & Environment Variables
সব API Key একত্রিত করে লাইভ সার্ভারে পুশ করা।
- [ ] প্রজেক্টটি GitHub এ পুশ করুন।
- [ ] Vercel এ প্রজেক্টটি ইম্পোর্ট করুন (Framework `Next.js` এবং Root Directory `apps/storefront` সিলেক্ট করুন)।
- [ ] Environment Variables সেকশনে নিচের সব ভ্যালু বসান:
```env
NEXT_PUBLIC_SITE_URL=https://আপনার-ডোমেইন.com
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
LEMONSQUEEZY_WEBHOOK_SECRET=...
DEV_BYPASS_TOKEN=... (যেকোনো জটিল পাসওয়ার্ড, যা আপনি লোকালি পেমেন্ট বাইপাস করতে ব্যবহার করবেন)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
RESEND_API_KEY=...
NEXT_PUBLIC_SENTRY_DSN=...

# LemonSqueezy Checkout URLs
NEXT_PUBLIC_CHECKOUT_PRO=https://...
NEXT_PUBLIC_CHECKOUT_TEAM=https://...
NEXT_PUBLIC_CHECKOUT_ENTERPRISE=https://...
```
- [ ] ডেপ্লয় বাটনে ক্লিক করুন। 

### 📦 7. Publish to NPM
ইউজারদের CLI টুল ব্যবহারের এক্সেস দেওয়ার জন্য।
- [ ] টার্মিনালে `packages/cli` ফোল্ডারে যান: `cd packages/cli`
- [ ] টার্মিনালে রান করুন: `npm run build`
- [ ] এরপর রান করুন: `npm login` (আপনার NPM একাউন্টের ইউজারনেম পাসওয়ার্ড দিন)
- [ ] সবশেষে রান করুন: `npm publish --access public`

**ব্যাস! আপনার প্রজেক্ট এখন ১০০% লাইভ এবং কাস্টমারদের কাছে সেল করার জন্য প্রস্তুত।**
