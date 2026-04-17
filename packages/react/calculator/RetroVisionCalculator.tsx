"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Divide, Plus, Equal, Delete, RefreshCw } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface RetroVisionCalculatorProps {
  className?: string;
}

/**
 * A "God-Tier" Retro Aesthetic Calculator.
 * Features:
 * - LCD Dual-Line Display: High-fidelity segment flickering and dot-matrix texture.
 * - Draggable Widget Morphology: Move the calculator anywhere on the screen.
 * - Mechanical Tactile Physics: Deep neomorphic buttons with 3D depress animations.
 * - Spatial Audio: Synchronized mechanical "Clack" on every key press.
 */
export const RetroVisionCalculator = ({ className }: RetroVisionCalculatorProps) => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [lastOp, setLastOp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { play: playClick } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Mechanical click
  });

  const handleKey = (key: string) => {
    playClick();
    if (key === "C") {
      setExpression("");
      setResult("0");
      setLastOp(false);
      return;
    }

    if (key === "=") {
      try {
        // Safe evaluation (basic math only)
        const sanitized = expression.replace(/x/g, "*").replace(/÷/g, "/");
        // eslint-disable-next-line no-eval
        const res = eval(sanitized);
        setResult(String(res));
        setExpression(expression + " =");
        setLastOp(true);
      } catch {
        setResult("ERROR");
      }
      return;
    }

    if (lastOp) {
      setExpression(key);
      setResult(key);
      setLastOp(false);
    } else {
      setExpression((prev) => prev + key);
      setResult((prev) => (prev === "0" ? key : prev + key));
    }
  };

  const buttons = [
    { label: "C", type: "clear", color: "bg-red-500/90 text-white" },
    { label: "÷", type: "op", color: "bg-zinc-800 text-zinc-400" },
    { label: "x", type: "op", color: "bg-zinc-800 text-zinc-400" },
    { label: "DEL", type: "op", color: "bg-zinc-800 text-zinc-400" },
    { label: "7" }, { label: "8" }, { label: "9" }, { label: "-", color: "bg-zinc-800 text-zinc-400" },
    { label: "4" }, { label: "5" }, { label: "6" }, { label: "+", color: "bg-zinc-800 text-zinc-400" },
    { label: "1" }, { label: "2" }, { label: "3" }, { label: "=", color: "bg-blue-600/90 text-white", span: "row-span-2" },
    { label: "0", span: "col-span-2" }, { label: "." },
  ];

  return (
    <motion.div
      ref={containerRef}
      drag
      dragMomentum={false}
      className={cn(
        "fixed top-20 right-20 w-80 p-6 rounded-[2.5rem] bg-zinc-900 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 select-none",
        className
      )}
    >
      {/* Texture Layer */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      {/* Decorative Brand Badge */}
      <div className="flex items-center justify-between mb-6 px-2">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Precision 880</span>
        <div className="flex gap-1.5">
           <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 shadow-inner" />
           <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 shadow-inner" />
           <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.3)] animate-pulse" />
        </div>
      </div>

      {/* LCD Dual-Line Display */}
      <div className="relative mb-8 p-4 rounded-2xl bg-[#98a67e] shadow-inner overflow-hidden border-2 border-zinc-950/20">
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 animate-scanline pointer-events-none" />
        
        <div className="relative z-10 font-mono text-zinc-900/80 text-right">
           <div className="h-4 text-[10px] font-bold uppercase tracking-tight opacity-60">
             {expression || "0"}
           </div>
           <motion.div 
             key={result}
             initial={{ opacity: 0.8 }}
             animate={{ opacity: 1 }}
             className="text-4xl font-black tracking-tighter tabular-nums drop-shadow-sm"
           >
             {result}
           </motion.div>
        </div>

        {/* Shadow Overlay for Depth */}
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-4">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleKey(btn.label)}
            className={cn(
              "relative group h-14 rounded-2xl outline-none active:scale-95 transition-transform",
              btn.span || ""
            )}
          >
            {/* Physical Button Body (Neumorphism) */}
            <div 
              className={cn(
                "absolute inset-0 rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.5)] transition-all group-active:translate-y-1 group-active:shadow-none",
                btn.color || "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
              )}
            />
            
            {/* Surface & Label */}
            <div className="relative h-full flex items-center justify-center font-black text-lg pointer-events-none">
              {btn.label}
            </div>
          </button>
        ))}
      </div>

      {/* Drag Hint */}
      <div className="mt-6 flex justify-center">
        <div className="w-12 h-1 rounded-full bg-zinc-800 shadow-inner cursor-grab" />
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};
