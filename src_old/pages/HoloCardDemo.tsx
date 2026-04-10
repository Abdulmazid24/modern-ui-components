import React from 'react';
import { HoloCard } from '../components/cards';

export const HoloCardDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-16"
      style={{
        backgroundColor: '#050507',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Holographic <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">3D Cards</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Tilt your mouse over each card. A prismatic rainbow sheen shifts across the surface like a real holographic collectible card.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 z-10 max-w-5xl">
        <HoloCard
          image="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=500&auto=format&fit=crop"
          title="Neon Genesis"
          subtitle="Cyberpunk Collection"
          badge="LEGENDARY"
        />
        <HoloCard
          image="https://images.unsplash.com/photo-1614854262318-831574f15f1f?q=80&w=500&auto=format&fit=crop"
          title="Aurora Wave"
          subtitle="Northern Lights Series"
          badge="EPIC"
        />
        <HoloCard
          image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop"
          title="Cosmic Drift"
          subtitle="Space Gradient Edition"
          badge="RARE"
        />
      </div>

      <p className="text-gray-700/30 text-xs tracking-widest uppercase z-10">
        Multi-layer compositing: base image + prismatic sheen + radial glare + 3D transform
      </p>
    </div>
  );
};
