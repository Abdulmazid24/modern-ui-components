"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, Cpu } from "lucide-react";

export interface GlassShatterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const GlassShatterModal: React.FC<GlassShatterModalProps> = ({ 
  isOpen, 
  onClose,
  title = "CRITICAL BREACH DETECTED",
  children
}) => {
  // Hardcoded SVG shard paths roughly radiating from the center of the screen
  const SHARDS = [
    "M 50 50 L 0 0 L 30 0 Z",
    "M 50 50 L 30 0 L 70 0 Z",
    "M 50 50 L 70 0 L 100 0 L 100 20 Z",
    "M 50 50 L 100 20 L 100 60 Z",
    "M 50 50 L 100 60 L 100 100 L 80 100 Z",
    "M 50 50 L 80 100 L 20 100 Z",
    "M 50 50 L 20 100 L 0 100 L 0 50 Z",
    "M 50 50 L 0 50 L 0 0 Z",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ perspective: 1000 }}>
          
          {/* Shards of the "screen glass" blasting outward */}
          <div className="absolute inset-0 z-40 overflow-hidden pointer-events-auto" onClick={onClose}>
             {SHARDS.map((path, i) => {
               // Calculate vector away from center
               const dx = (i < 2 || i > 6) ? -1 : 1;
               const dy = (i > 2 && i < 6) ? 1 : -1;
               
               return (
                 <motion.div
                   key={i}
                   className="absolute inset-0 backdrop-blur-xl border border-white/10"
                   style={{
                     clipPath: `polygon(${path.split("L").map(p => p.replace("M", "").replace("Z", "").trim()).map(p => {
                        const [x,y] = p.split(" ");
                        return `${x}% ${y}%`;
                     }).join(", ")})`,
                     background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.01))"
                   }}
                   initial={{ x: 0, y: 0, rotate: 0, translateZ: 0, opacity: 1 }}
                   animate={{ 
                     x: dx * (Math.random() * 200 + 100), 
                     y: dy * (Math.random() * 200 + 100), 
                     rotate: (Math.random() - 0.5) * 60,
                     translateZ: Math.random() * 500,
                     opacity: 0
                   }}
                   exit={{ x: 0, y: 0, rotate: 0, translateZ: 0, opacity: 1 }}
                   transition={{ duration: 1, ease: "circOut" }}
                 />
               );
             })}
          </div>

          {/* The Void Background revealed behind the glass */}
          <motion.div
            className="absolute inset-0 bg-black z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* The Modal floating forward from the void */}
          <motion.div 
            className="relative z-50 w-full max-w-md bg-zinc-900 border border-red-500/50 rounded-2xl shadow-[0_0_100px_rgba(239,68,68,0.3)] pointer-events-auto overflow-hidden"
            initial={{ scale: 0, translateZ: -1000, opacity: 0, rotateX: 60 }}
            animate={{ scale: 1, translateZ: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, translateZ: -500, opacity: 0, rotateX: -60 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          >
             {/* Danger Scanner Header */}
             <div className="relative bg-red-950/50 p-6 border-b border-red-500/30 overflow-hidden flex items-center gap-4">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444] animate-[ping_2s_linear_infinite]" />
                <ShieldAlert className="text-red-500" size={32} />
                <div className="flex-1">
                  <h3 className="text-red-50 font-black tracking-widest uppercase">{title}</h3>
                  <p className="text-red-500/70 font-mono text-[10px]">AUTH_OVERRIDE_FAILED</p>
                </div>
                <button onClick={onClose} className="p-2 bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                  <X size={20} />
                </button>
             </div>

             <div className="p-6">
                <div className="text-zinc-300 font-mono text-sm leading-relaxed">
                  {children || (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 bg-black p-3 rounded border border-zinc-800">
                         <Cpu className="text-zinc-500" size={16} />
                         <span className="text-red-400">Core temperature critical.</span>
                      </div>
                      <p>Multiple unauthorized access attempts detected on Sector 7G. Initiating purge protocol in T-minus 10 seconds.</p>
                      <button onClick={onClose} className="mt-4 w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                         Acknowledge
                      </button>
                    </div>
                  )}
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
