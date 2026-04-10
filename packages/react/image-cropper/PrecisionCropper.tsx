"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Move, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
export const PrecisionCropper: React.FC<{ src?: string }> = ({ src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop" }) => {
  const [zoom, setZoom] = useState(1); const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div className="w-full max-w-md">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
        <motion.div className="absolute inset-0 cursor-grab active:cursor-grabbing" drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} dragElastic={0.1} style={{ scale: zoom }}>
          <img src={src} alt="Crop target" className="w-full h-full object-cover" draggable={false} />
        </motion.div>
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 9999px rgba(0,0,0,0.5)" }}>
          <div className="absolute inset-[15%] border-2 border-white/50 rounded-xl" style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)" }}>
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">{Array.from({length:9},(_,i)=><div key={i} className="border border-white/10"/>)}</div>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 rounded-lg p-1 backdrop-blur-sm">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-1.5 hover:bg-white/10 rounded text-white cursor-pointer"><ZoomIn size={14}/></button>
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-1.5 hover:bg-white/10 rounded text-white cursor-pointer"><ZoomOut size={14}/></button>
          <button onClick={() => { setZoom(1); setPos({x:0,y:0}); }} className="p-1.5 hover:bg-white/10 rounded text-white cursor-pointer"><RotateCcw size={14}/></button>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3"><input type="range" min="50" max="300" value={zoom*100} onChange={e => setZoom(Number(e.target.value)/100)} className="flex-1 accent-violet-500" /><span className="text-xs text-zinc-500 font-mono w-12 text-right">{Math.round(zoom*100)}%</span></div>
    </div>
  );
};
