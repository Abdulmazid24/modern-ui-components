import React from 'react';
import {
  DotsLoader,
  BarsLoader,
  DoubleSpinner,
  PulseLoader,
  Spinner,
} from '../components/loaders';

/* ──────────────────────────────────────────────
   Loader Card — displays one loader in a showcase card
   ────────────────────────────────────────────── */

interface LoaderCardProps {
  title: string;
  children: React.ReactNode;
}

const LoaderCard: React.FC<LoaderCardProps> = ({ title, children }) => (
  <div className="group relative flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-purple-500/5">
    {/* Loader Area */}
    <div className="flex items-center justify-center w-full h-48">
      {children}
    </div>
    {/* Label */}
    <div className="w-full px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
      <h3 className="text-sm font-semibold text-white/80 tracking-wide text-center">
        {title}
      </h3>
    </div>
  </div>
);

/* ──────────────────────────────────────────────
   Demo Page
   ────────────────────────────────────────────── */

export const LoadersDemo: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-20 bg-gradient-to-br from-[#0f0a1e] via-[#1a1040] to-[#1e1145]"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Hero Title */}
      <div className="text-center mb-14 mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            CSS Loader
          </span>{' '}
          Animations
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Enterprise-grade loading spinners — drop into any project instantly
        </p>
      </div>

      {/* Loaders Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <LoaderCard title="Bouncing Dots">
          <DotsLoader size={16} color="rgb(56, 189, 248)" speed={0.6} />
        </LoaderCard>

        <LoaderCard title="Stretching Bars">
          <BarsLoader count={4} barWidth={12} barHeight={56} color="rgb(245, 158, 11)" speed={1} />
        </LoaderCard>

        <LoaderCard title="Double Spinner">
          <DoubleSpinner size={72} borderWidth={7} primaryColor="rgb(244, 63, 94)" secondaryColor="rgb(34, 197, 94)" speed={1} />
        </LoaderCard>

        <LoaderCard title="Pulse">
          <PulseLoader size={64} color="rgb(34, 197, 94)" speed={1.2} />
        </LoaderCard>

        <LoaderCard title="Spinner">
          <Spinner size={72} borderWidth={7} color="rgb(56, 189, 248)" trackColor="rgb(30, 41, 59)" speed={1} />
        </LoaderCard>

        {/* Bonus — Gradient variant */}
        <LoaderCard title="Dots · Violet">
          <DotsLoader size={16} color="rgb(167, 139, 250)" speed={0.5} />
        </LoaderCard>
      </div>

      {/* Footer Tip */}
      <p className="text-gray-500/50 text-xs mt-12 tracking-widest uppercase">
        Fully configurable · TypeScript · Accessible ♿
      </p>
    </div>
  );
};
