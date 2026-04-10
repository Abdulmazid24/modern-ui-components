"use client";
import React from "react";
export const RetroKbd: React.FC<{ keys?: string[] }> = ({ keys = ["⌘", "Shift", "P"] }) => (
  <div className="flex items-center gap-1">
    {keys.map((key, i) => (
      <React.Fragment key={i}>
        <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-lg text-xs font-mono font-semibold text-zinc-300 bg-zinc-800 border border-zinc-700 border-b-2 border-b-zinc-600 shadow-sm select-none">{key}</kbd>
        {i < keys.length - 1 && <span className="text-zinc-600 text-xs">+</span>}
      </React.Fragment>
    ))}
  </div>
);
