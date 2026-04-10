"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
export const MaskSpotlight: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 200, y: 200 });
  const handleMove = (e: React.MouseEvent) => { const r = ref.current?.getBoundingClientRect(); if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); };
  return (
    <div ref={ref} onMouseMove={handleMove} className="relative w-full max-w-2xl h-64 rounded-2xl overflow-hidden cursor-none" style={{ background: "#09090b" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl font-black text-zinc-800 tracking-tighter select-none">Move your cursor</h1>
      </div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ maskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`, WebkitMaskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)` }}>
        <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter select-none">Move your cursor</h1>
        {children}
      </div>
      <div className="absolute w-4 h-4 rounded-full bg-white/20 pointer-events-none border border-white/40" style={{ left: pos.x - 8, top: pos.y - 8, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }} />
    </div>
  );
};
