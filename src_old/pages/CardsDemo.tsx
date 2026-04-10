import React from 'react';
import { GradientBorderCard } from '../components/cards';
import { MorphToggle } from '../components/inputs';
import { Sparkles, Zap, Shield } from 'lucide-react';

export const CardsDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-16"
      style={{
        backgroundColor: '#050507',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Gradient Border <span className="text-violet-400">&</span> Morph Toggle
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          Rotating conic-gradient borders with glow, and satisfying morphing toggle switches with spring physics.
        </p>
      </div>

      {/* Gradient Border Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full z-10">
        <GradientBorderCard
          title="AI Powered"
          description="Leverage cutting-edge machine learning to auto-suggest component layouts and color palettes."
          gradientColors={['#f43f5e', '#a855f7', '#3b82f6']}
        >
          <Sparkles className="text-violet-400 mt-2" size={28} />
        </GradientBorderCard>

        <GradientBorderCard
          title="Blazing Fast"
          description="Built on Vite with zero-config HMR. Sub-second reload times during development."
          gradientColors={['#f59e0b', '#ef4444', '#ec4899']}
        >
          <Zap className="text-amber-400 mt-2" size={28} />
        </GradientBorderCard>

        <GradientBorderCard
          title="Enterprise Security"
          description="End-to-end encryption, RBAC, and SOC 2 compliance baked into every component."
          gradientColors={['#22d3ee', '#6366f1', '#a855f7']}
        >
          <Shield className="text-cyan-400 mt-2" size={28} />
        </GradientBorderCard>
      </div>

      {/* Morph Toggle Section */}
      <div className="w-full max-w-lg bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 z-10">
        <h2 className="text-white font-bold text-lg mb-6">Settings</h2>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Dark Mode</span>
            <MorphToggle defaultChecked={true} size="md" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Email Notifications</span>
            <MorphToggle defaultChecked={false} size="md" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Auto-save Drafts</span>
            <MorphToggle defaultChecked={true} size="md" />
          </div>
          <hr className="border-white/5 my-2" />
          <div className="flex items-center gap-6">
            <MorphToggle size="sm" label="Small" />
            <MorphToggle defaultChecked size="md" label="Medium" />
            <MorphToggle size="lg" label="Large" />
          </div>
        </div>
      </div>

      <p className="text-gray-700/30 text-xs tracking-widest uppercase z-10">
        The border gradient rotates continuously using @property CSS Houdini ✨
      </p>
    </div>
  );
};
