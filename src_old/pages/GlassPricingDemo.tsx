import React from 'react';
import { GlassPricingCard } from '../components/pricing';

export const GlassPricingDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-16 relative"
      style={{
        backgroundColor: '#030712',
        backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(56, 189, 248, 0.15) 0%, transparent 40%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div className="text-center z-10 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Liquid Glass
          </span>{' '}
          Pricing
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Stunning frosted glass cards with 3D tilt, spotlight tracking, and animated gradient borders.
        </p>
      </div>

      {/* Grid of Pricing Cards */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8 max-w-6xl w-full z-10 relative">
        
        {/* Basic Plan */}
        <div className="w-full max-w-[340px]">
          <GlassPricingCard
            title="Starter"
            price="15"
            description="Perfect for small projects and independent developers."
            accentColor="#64748b"
            features={[
              { name: '1 Project limit', included: true },
              { name: 'Basic Analytics', included: true },
              { name: '24-hour support response', included: true },
              { name: 'Custom domains', included: false },
              { name: 'Team collaboration', included: false },
            ]}
          />
        </div>

        {/* Pro Plan (Popular) */}
        <div className="w-full max-w-[360px] lg:-mt-8">
          <GlassPricingCard
            title="Professional"
            price="49"
            description="Everything you need to scale your growing business today."
            isPopular={true}
            accentColor="#a855f7"
            features={[
              { name: 'Unlimited Projects', included: true },
              { name: 'Advanced Analytics', included: true },
              { name: '1-hour support response', included: true },
              { name: 'Custom domains', included: true },
              { name: 'Team collaboration', included: false },
            ]}
          />
        </div>

        {/* Enterprise Plan */}
        <div className="w-full max-w-[340px]">
          <GlassPricingCard
            title="Enterprise"
            price="199"
            description="Advanced features for large teams and organizations."
            accentColor="#38bdf8"
            buttonText="Contact Sales"
            features={[
              { name: 'Unlimited Projects', included: true },
              { name: 'Custom Analytics', included: true },
              { name: 'Dedicated account manager', included: true },
              { name: 'Custom domains', included: true },
              { name: 'Team collaboration', included: true },
            ]}
          />
        </div>

      </div>

      {/* Footer */}
      <p className="text-gray-700/40 text-xs tracking-widest uppercase z-10">
        Move your mouse over the cards to see the 3D parallax and spotlight effect ✨
      </p>
    </div>
  );
};
