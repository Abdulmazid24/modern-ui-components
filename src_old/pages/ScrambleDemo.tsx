import React from 'react';
import { ScrambleText } from '../components/effects';

export const ScrambleDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-black text-white relative overflow-hidden"
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Subtle matrix-like grid background */}
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
          <ScrambleText text="System Initialization Sequence" delay={200} speed={30} />
        </h2>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
          <span className="block text-white">
            <ScrambleText text="NEURAL" delay={800} speed={40} />
          </span>
          <span className="block text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
            <ScrambleText text="NETWORK" delay={1400} speed={50} />
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl font-mono max-w-2xl mx-auto leading-relaxed border-l-2 border-emerald-500/50 pl-6 text-left">
          <ScrambleText 
            text="> Accessing secure database nodes..." 
            delay={2200} 
            speed={25}
          />
          <br/>
          <ScrambleText 
            text="> Decrypting payload files..." 
            delay={3000} 
            speed={25}
          />
          <br/>
          <span className="text-emerald-400 mt-2 block">
            <ScrambleText 
              text="> ACCESS GRANTED." 
              delay={3800} 
              speed={20}
              characters="01"
            />
          </span>
        </p>
        
        <div className="mt-12 text-gray-600 text-xs tracking-widest font-mono uppercase cursor-default">
          <ScrambleText text="[ Hover over any text to replay decode ]" delay={4500} speed={30} />
        </div>
      </div>
    </div>
  );
};
