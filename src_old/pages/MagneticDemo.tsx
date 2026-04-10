import React from 'react';
import { MagneticButton } from '../components/magnetic';
import { ArrowRight, Zap, Sparkles, Send } from 'lucide-react';

export const MagneticDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-20"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #0f0a2e 0%, #050510 60%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Magnetic
          </span>{' '}
          Buttons
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Buttons that physically attract toward your cursor — move your mouse close to feel the pull
        </p>
      </div>

      {/* Row 1: Large CTA buttons */}
      <div className="flex flex-wrap items-center justify-center gap-16">
        {/* Primary CTA */}
        <MagneticButton strength={0.4} innerStrength={0.2} attractRadius={40}>
          <span className="magnetic-cta magnetic-cta-primary">
            <span>Get Started</span>
            <ArrowRight size={18} />
          </span>
        </MagneticButton>

        {/* Gradient CTA */}
        <MagneticButton strength={0.35} innerStrength={0.15} attractRadius={40}>
          <span className="magnetic-cta magnetic-cta-gradient">
            <Zap size={18} />
            <span>Try Pro Free</span>
          </span>
        </MagneticButton>

        {/* Outline Ghost */}
        <MagneticButton strength={0.45} innerStrength={0.2} attractRadius={40}>
          <span className="magnetic-cta magnetic-cta-outline">
            <span>Learn More</span>
            <ArrowRight size={16} />
          </span>
        </MagneticButton>
      </div>

      {/* Row 2: Icon-only circular magnetic */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-gray-600 text-sm tracking-widest uppercase">Icon Buttons</p>
        <div className="flex items-center gap-14">
          <MagneticButton strength={0.5} innerStrength={0.25} attractRadius={30}>
            <span className="magnetic-icon" style={{ background: '#7c3aed' }}>
              <Sparkles size={22} />
            </span>
          </MagneticButton>

          <MagneticButton strength={0.5} innerStrength={0.25} attractRadius={30}>
            <span className="magnetic-icon" style={{ background: '#ec4899' }}>
              <Zap size={22} />
            </span>
          </MagneticButton>

          <MagneticButton strength={0.5} innerStrength={0.25} attractRadius={30}>
            <span className="magnetic-icon" style={{ background: '#0ea5e9' }}>
              <Send size={22} />
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Row 3: Super strong magnetic demo */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-gray-600 text-sm tracking-widest uppercase">High Strength (0.6)</p>
        <MagneticButton strength={0.6} innerStrength={0.3} attractRadius={60}>
          <span className="magnetic-cta magnetic-cta-neon">
            <span>🧲 Maximum Pull</span>
          </span>
        </MagneticButton>
      </div>

      {/* Footer */}
      <p className="text-gray-700/40 text-xs tracking-widest uppercase">
        Move your cursor close to each button ✨
      </p>
    </div>
  );
};
