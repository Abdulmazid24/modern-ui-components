"use client";
import React, { useRef, useState } from "react";
export const AuraCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{x:number;y:number;id:number}[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setPos({ x, y });
    setTrail(t => [...t.slice(-15), { x, y, id: Date.now() }]);
  };
  return (
    <div ref={ref} onMouseMove={handleMove} className="relative w-full max-w-2xl h-64 rounded-2xl overflow-hidden bg-zinc-950 border border-white/8 cursor-none">
      <div className="absolute inset-0 flex items-center justify-center"><p className="text-zinc-700 text-sm">Move cursor inside</p></div>
      {trail.map((t, i) => <div key={t.id} className="absolute rounded-full pointer-events-none" style={{ left: t.x - 4, top: t.y - 4, width: 8, height: 8, background: `rgba(124,58,237,${0.1 + (i/trail.length)*0.4})`, filter: `blur(${2 + i * 0.3}px)`, transform: `scale(${0.5 + (i/trail.length)*1.5})` }} />)}
      <div className="absolute w-6 h-6 rounded-full pointer-events-none" style={{ left: pos.x - 12, top: pos.y - 12, background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent)", boxShadow: "0 0 25px rgba(124,58,237,0.4)", border: "1px solid rgba(124,58,237,0.3)" }} />
    </div>
  );
};
