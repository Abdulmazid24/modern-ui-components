"use client";
import React from "react";

export const VelvetScrollArea: React.FC<{ children?: React.ReactNode; height?: number }> = ({ children, height = 200 }) => {
  return (
    <div className="relative w-full max-w-sm rounded-xl border border-white/10 overflow-hidden" style={{ height }}>
      <div className="h-full overflow-y-auto pr-3 pl-4 py-3 [scrollbar-width:thin] [scrollbar-color:rgba(124,58,237,0.3)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-violet-500/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-violet-500/50">
        {children || Array.from({ length: 20 }, (_, i) => <div key={i} className="py-2 border-b border-white/5 text-sm text-zinc-400">Item {i + 1} — Custom scrollbar area</div>)}
      </div>
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-zinc-900 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
    </div>
  );
};
