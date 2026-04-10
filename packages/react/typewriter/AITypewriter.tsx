"use client";
import React, { useState, useEffect } from "react";
export const AITypewriter: React.FC<{ texts?: string[]; speed?: number }> = ({ texts = ["Building the future of UI...", "One component at a time.", "Modern UI Vault — 150+ components."], speed = 50 }) => {
  const [textIdx, setTextIdx] = useState(0); const [charIdx, setCharIdx] = useState(0); const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) setCharIdx(c => c + 1);
        else setTimeout(() => setDeleting(true), 1500);
      } else {
        if (charIdx > 0) setCharIdx(c => c - 1);
        else { setDeleting(false); setTextIdx((t) => (t + 1) % texts.length); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed]);
  return (
    <div className="flex items-center text-2xl md:text-3xl font-bold text-white tracking-tight">
      <span>{texts[textIdx].slice(0, charIdx)}</span>
      <span className="ml-0.5 w-[3px] h-8 bg-violet-500 inline-block animate-pulse" />
    </div>
  );
};
