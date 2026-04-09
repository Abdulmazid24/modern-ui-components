import React from 'react';
import { SpotlightHero } from '../components/effects';

export const SpotlightDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <SpotlightHero 
        title="Illuminate"
        subtitle="Move your cursor across the darkness to reveal the glowing content beneath."
        spotlightColor="rgba(255, 255, 255, 0.2)"
        spotlightSize={500}
      />
    </div>
  );
};
