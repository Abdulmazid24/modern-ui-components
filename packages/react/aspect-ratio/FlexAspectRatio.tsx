"use client";
import React from "react";

export const FlexAspectRatio: React.FC<{ ratio?: number; children?: React.ReactNode }> = ({ ratio = 16 / 9, children }) => (
  <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: ratio }}>
    {children || <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-zinc-400 text-sm font-medium">{Math.round(ratio * 100) / 100} : 1</div>}
  </div>
);
