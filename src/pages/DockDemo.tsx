import React from 'react';
import { MacDock } from '../components/dock';

export const DockDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Desktop Content Area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
          macOS Dock
        </h1>
        <p className="text-white/80 text-lg max-w-xl drop-shadow-md">
          Smooth proximity-based magnification effect spanning across multiple icons. Hover over the dock below.
        </p>
      </div>

      {/* The Dock fixed at the bottom */}
      <div className="absolute bottom-6 w-full flex justify-center px-4 z-50">
        <MacDock />
      </div>
    </div>
  );
};
