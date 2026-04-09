import React from 'react';
import { UploadButton } from '../components/buttons';

export const ButtonsDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-16"
      style={{
        background: 'linear-gradient(160deg, #0a0e1a 0%, #111827 40%, #0f172a 100%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Animated
          </span>{' '}
          Buttons
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Interactive button components with stunning state transitions
        </p>
      </div>

      {/* Upload Button Variants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl w-full">
        {/* Default Blue */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center justify-center w-full h-48 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <UploadButton />
          </div>
          <span className="text-sm font-semibold text-white/60 tracking-wide">Default Blue</span>
        </div>

        {/* Emerald */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center justify-center w-full h-48 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <UploadButton
              bgColor="#059669"
              label="SEND FILE"
              completeLabel="SENT!"
              uploadDuration={1800}
            />
          </div>
          <span className="text-sm font-semibold text-white/60 tracking-wide">Emerald · Fast</span>
        </div>

        {/* Purple Pill */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center justify-center w-full h-48 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <UploadButton
              bgColor="#7c3aed"
              label="ATTACH"
              completeLabel="ATTACHED"
              width={200}
              height={52}
              uploadDuration={3000}
            />
          </div>
          <span className="text-sm font-semibold text-white/60 tracking-wide">Violet · Slow</span>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-600/40 text-xs tracking-widest uppercase">
        Click any button to see the animation ✨
      </p>
    </div>
  );
};
