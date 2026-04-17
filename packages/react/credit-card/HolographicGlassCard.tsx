"use client";

import React, { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface HolographicGlassCardProps {
  number?: string;
  name?: string;
  expiry?: string;
  cvv?: string;
  isFlipped?: boolean;
  className?: string;
}

/**
 * A "God-Tier" Interactive Credit Card Display.
 * Features:
 * - Hybrid 3D Flip: Controlled via `isFlipped` prop for professional form integration.
 * - Holographic Prism Foil: A light-reactive shimmer that shifts as the card tilts.
 * - Matte Frosted Glass: Deep, multi-layered glassmorphic finish (Matte).
 * - Isometric Parallax: Elastic 3D response to cursor position.
 * - Smart Identification: Detects card network and rendering high-end SVG logos.
 */
export const HolographicGlassCard = ({
  number = "4121 1211 2121 1111",
  name = "ADUOK CODE",
  expiry = "12/28",
  cvv = "251",
  isFlipped = false,
  className,
}: HolographicGlassCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion Values for Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Holographic Prism Position
  const prismX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "150%"]);
  const prismY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "150%"]);

  const { play: playFlip } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Low mechanical snap
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardBrand = useMemo(() => {
    if (number.startsWith("4")) return "Visa";
    if (number.startsWith("5")) return "Mastercard";
    if (number.startsWith("3")) return "Amex";
    return "Generic";
  }, [number]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-[400px] h-[250px] perspective-1000 select-none",
        className
      )}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateY: isFlipped ? 180 : 0, // Simplified flip for consistency with prop
          transformStyle: "preserve-3d",
        }}
        initial={false}
        animate={{ 
            rotateY: isFlipped ? 180 : 0,
            rotateX: 0, // Reset tilt baseline 
        }}
        transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            onUpdate: (latest) => {
               if (typeof latest.rotateY === 'number' && Math.abs(latest.rotateY - 90) < 5) playFlip();
            }
        }}
        className="w-full h-full relative"
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 backface-hidden z-20 overflow-hidden rounded-[24px] bg-zinc-950/80 border border-white/5 shadow-2xl backdrop-blur-3xl"
        >
          {/* Deep Matte Frost Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          {/* Holographic Prism Foil */}
          <motion.div 
            style={{ left: prismX, top: prismY }}
            className="absolute w-full h-full pointer-events-none z-10 mix-blend-color-dodge opacity-20"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
             <div className="w-full h-full bg-[conic-gradient(from_0deg,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] blur-[100px] transform scale-150 rotate-45" />
          </motion.div>

          <div className="relative z-20 h-full p-8 flex flex-col justify-between">
            {/* Header: Chip & Logo */}
            <div className="flex justify-between items-start">
              {/* Holographic Chip */}
              <div className="w-14 h-11 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_5px,rgba(255,255,255,0.05)_5px,rgba(255,255,255,0.05)_10px)]" />
                 <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10" />
                 <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />
              </div>

              {/* Card Brand Logo */}
              <div className="text-right">
                 <span className="text-white/60 font-black italic text-xl tracking-tighter uppercase">{cardBrand}</span>
                 <div className="text-[10px] text-white/20 tracking-[0.3em] font-mono mt-0.5">PRIORITY PLATINUM</div>
              </div>
            </div>

            {/* Card Number */}
            <div className="space-y-1">
              <div className="text-[10px] text-white/30 tracking-[0.2em] font-mono uppercase">Card Number</div>
              <div className="text-2xl text-white font-mono tracking-[0.1em] flex gap-4">
                {number.split(" ").map((chunk, i) => (
                  <span key={i}>{chunk}</span>
                ))}
              </div>
            </div>

            {/* Footer: Name & Expiry */}
            <div className="flex justify-between items-end">
               <div className="space-y-1">
                 <div className="text-[10px] text-white/30 tracking-[0.2em] font-mono uppercase">Card Holder</div>
                 <div className="text-sm text-white font-bold tracking-widest uppercase">{name}</div>
               </div>
               <div className="space-y-1 text-right">
                 <div className="text-[10px] text-white/30 tracking-[0.2em] font-mono uppercase">Exp. Date</div>
                 <div className="text-sm text-white font-bold tracking-widest font-mono">{expiry}</div>
               </div>
            </div>
          </div>
          
          {/* Edge Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 backface-hidden z-10 overflow-hidden rounded-[24px] bg-zinc-900 border border-white/5 shadow-2xl rotate-y-180"
        >
           <div className="mt-10 h-12 bg-black w-full" />
           <div className="px-10 mt-10">
              <div className="flex items-center gap-4">
                 <div className="h-10 grow bg-zinc-800 rounded flex items-center px-4">
                    <div className="w-full h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,255,255,0.02)_5px,rgba(255,255,255,0.02)_10px)]" />
                 </div>
                 <div className="shrink-0 w-16 h-10 bg-white rounded flex items-center justify-center font-mono font-bold text-zinc-900">
                    {cvv}
                 </div>
              </div>
              <div className="mt-2 text-[8px] text-white/20 leading-relaxed max-w-[200px]">
                 This is a digital cryptographic asset provided by Modern UI Vault. By using this card you agree to our terms of service and holographic security protocol 0.1.2.
              </div>
           </div>
           
           <div className="absolute bottom-8 right-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-white/0 border border-white/5" />
           </div>
        </div>
      </motion.div>

      {/* Underglow foundation */}
      <div className="absolute -z-10 -inset-10 bg-cyan-500/5 blur-[100px] pointer-events-none" />
    </div>
  );
};
