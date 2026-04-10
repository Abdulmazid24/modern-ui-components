import React from 'react';
import { AnimatedCounter } from '../components/stats';
import { Users, Code, Trophy, Star } from 'lucide-react';

export const StatsDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center pt-24 pb-24 overflow-y-auto"
      style={{
        background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Spacer to force scrolling to demonstrate IntersectionObserver */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Animated <span className="text-blue-600">Stats Counter</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10">
          These counters will only start animating when they scroll into the viewport. 
          Powered by IntersectionObserver and requestAnimationFrame.
        </p>
        <div className="animate-bounce p-4 rounded-full bg-white text-blue-600 shadow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <p className="text-slate-400 font-medium uppercase tracking-widest text-sm mt-4">Scroll down</p>
      </div>

      {/* The Stats Section */}
      <div className="w-full max-w-6xl px-6 py-24 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Stat 1 */}
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-blue-100 text-blue-600">
              <Users size={28} />
            </div>
            <AnimatedCounter end={15200} suffix="+" label="Active Users" duration={2500} />
          </div>

          {/* Stat 2 */}
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-emerald-100 text-emerald-600">
              <Code size={28} />
            </div>
            <AnimatedCounter end={120} prefix="<" suffix="K" label="Lines of Code" duration={2200} />
          </div>

          {/* Stat 3 */}
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-amber-100 text-amber-600">
              <Star size={28} />
            </div>
            <AnimatedCounter end={4} suffix=".9" label="Average Rating" duration={1500} />
          </div>

          {/* Stat 4 */}
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-fuchsia-100 text-fuchsia-600">
              <Trophy size={28} />
            </div>
            <AnimatedCounter end={35} label="Awards Won" duration={1800} />
          </div>

        </div>
      </div>
    </div>
  );
};
