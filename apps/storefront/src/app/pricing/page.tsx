"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2, Sparkles } from "lucide-react";

const tiers = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Core components for personal projects",
    icon: <Sparkles size={24} />,
    features: [
      "70+ Animated Components",
      "TSX & JSX Dialects",
      "CLI Installation",
      "Community Support",
      "MIT License",
    ],
    cta: "Get Started",
    href: "/",
    popular: false,
    gradient: "from-zinc-600 to-zinc-800",
    glow: "rgba(113, 113, 122, 0.15)",
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    period: "lifetime",
    description: "Full vault for individual developers",
    icon: <Zap size={24} />,
    features: [
      "All 300+ Components",
      "All Dialects (TSX, JSX)",
      "1 Year of Updates",
      "3 Machine Activations",
      "Priority Email Support",
      "Commercial License",
      "Premium Templates (Soon)",
    ],
    cta: "Buy Pro License",
    href: process.env.NEXT_PUBLIC_CHECKOUT_PRO || "#",
    popular: true,
    gradient: "from-violet-600 to-purple-600",
    glow: "rgba(139, 92, 246, 0.25)",
  },
  {
    id: "team",
    name: "Team",
    price: 199,
    period: "lifetime",
    description: "For teams of up to 10 developers",
    icon: <Crown size={24} />,
    features: [
      "Everything in Pro",
      "10 Machine Activations",
      "Team License Agreement",
      "Priority Support Channel",
      "Early Access to New Components",
    ],
    cta: "Buy Team License",
    href: process.env.NEXT_PUBLIC_CHECKOUT_TEAM || "#",
    popular: false,
    gradient: "from-cyan-600 to-blue-600",
    glow: "rgba(34, 211, 238, 0.2)",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    period: "lifetime",
    description: "Unlimited seats with white-label rights",
    icon: <Building2 size={24} />,
    features: [
      "Everything in Team",
      "Unlimited Activations",
      "White-Label Rights",
      "Custom Components (2/mo)",
      "Dedicated Support & SLA",
    ],
    cta: "Buy Enterprise",
    href: process.env.NEXT_PUBLIC_CHECKOUT_ENTERPRISE || "#",
    popular: false,
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(245, 158, 11, 0.2)",
  },
];

export default function PricingPage() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Simple Pricing
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4">
            Pay once, own forever. No subscriptions, no hidden fees.
          </p>
          <p className="text-sm text-zinc-600 uppercase tracking-widest font-bold">
            All prices are one-time payments
          </p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-500 ${
                tier.popular
                  ? "border-purple-500/50 bg-zinc-900/80 shadow-[0_0_60px_rgba(139,92,246,0.15)]"
                  : "border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700"
              }`}
              style={{
                boxShadow: hoveredTier === tier.id
                  ? `0 0 80px ${tier.glow}`
                  : undefined,
              }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-4`}>
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                <p className="text-zinc-500 text-sm">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">
                    ${tier.price}
                  </span>
                  <span className="text-zinc-500 text-sm font-medium">
                    /{tier.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} className={`mt-0.5 shrink-0 ${tier.popular ? "text-purple-400" : "text-zinc-500"}`} />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.href}
                className={`block w-full py-4 rounded-2xl text-center font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                  tier.popular
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
                    : tier.id === "free"
                    ? "bg-zinc-800 text-white hover:bg-zinc-700"
                    : "bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]"
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* FAQ / Trust Signals */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            {[
              {
                q: "Is this really a one-time payment?",
                a: "Yes. Pay once, use forever. No recurring charges. Your purchased components are yours to keep and use in unlimited projects.",
              },
              {
                q: "What happens after 1 year of updates?",
                a: "After 1 year, you keep all components you've downloaded. You just won't get access to NEW components added after your update period ends. You can renew anytime.",
              },
              {
                q: "Can I use this in commercial projects?",
                a: "The Free tier uses MIT license — use it anywhere. Pro/Team/Enterprise include a commercial license that covers client work, SaaS products, and production apps.",
              },
              {
                q: "What if I'm not satisfied?",
                a: "We offer a 14-day refund policy through LemonSqueezy. No questions asked.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
