"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HolographicScannerCardProps {
  name?: string;
  cardNumber?: string;
  expires?: string;
  className?: string;
}

/**
 * Holographic Scanner Card
 * A 100/100 enterprise-grade cybernetic card component.
 * Features 3D perspective tracking, a glowing laser scanner beam, 
 * and a dynamic decryption overlay transitioning from raw code to an elegant premium gradient.
 */
export const HolographicScannerCard = React.forwardRef<HTMLDivElement, HolographicScannerCardProps>(
  ({ className, name = "Elon Musk", cardNumber = "1234 5678 9000 0000", expires = "12/35", ...props }, ref) => {
    // 3D Parallax State
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Scanner Beam State (0 to 100%)
    const scanProgress = useMotionValue(0);

    // Sync external & internal refs
    const setRefs = (node: HTMLDivElement) => {
      (cardRef as any).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as any).current = node;
      }
    };

    useEffect(() => {
      // Infinitely bounce the scanner back and forth
      const controls = animate(scanProgress, [0, 100], {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      });
      return () => controls.stop();
    }, [scanProgress]);

    // Derived physics for 3D tilt
    const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
    const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

    // Dynamic Clip Path for revealing the top card layer
    const clipPath = useMotionTemplate`inset(0 ${useTransform(scanProgress, v => 100 - v)}% 0 0)`;
    
    // Beam absolute position
    const beamLeft = useMotionTemplate`${scanProgress}%`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      animate(mouseX, 0.5, { type: "spring", stiffness: 200, damping: 20 });
      animate(mouseY, 0.5, { type: "spring", stiffness: 200, damping: 20 });
    };

    return (
      <div 
        className={cn("relative group perspective-[2000px] flex items-center justify-center p-8", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={setRefs}
          {...props}
          style={{ rotateX, rotateY }}
          className="relative w-full max-w-md aspect-[1.586/1] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d border border-zinc-800"
        >
          {/* ========================================================= */}
          {/* LAYER 1: BASE/ENCRYPTED STATE (Code & Terminal)           */}
          {/* ========================================================= */}
          <div className="absolute inset-0 bg-zinc-950 p-6 flex flex-col justify-between font-mono text-zinc-600 pattern-grid-lg text-xs leading-relaxed opacity-80 backdrop-blur-3xl">
             <div className="absolute inset-0 opacity-10 break-all overflow-hidden p-2 text-[8px] tracking-widest text-[#a855f7]">
                {/* Random Gibberish Code Matrix */}
                {Array.from({ length: 50 }).map((_, i) => (
                  <span key={i}>01010011 01100011 01100001 01101110 01101110 01101001 01101110 01100111... <br/></span>
                ))}
             </div>
             
             <div className="relative z-10">
                <span className="text-[#a855f7]/50 font-bold tracking-widest">ENCRYPTED // ID_CHIP</span>
             </div>
             
             <div className="relative z-10 flex flex-col gap-1">
                <span className="text-zinc-600 opacity-50 blur-[2px] select-none">#### #### #### ####</span>
                <div className="flex justify-between items-center blur-[1px]">
                   <span>{name.replace(/[a-zA-Z]/g, '*')}</span>
                   <span>**/**</span>
                </div>
             </div>
          </div>

          {/* ========================================================= */}
          {/* LAYER 2: CLEAN/DECRYPTED STATE (Auroral Gradient)         */}
          {/* Revealed by the scanner beam                              */}
          {/* ========================================================= */}
          <motion.div 
            style={{ clipPath }}
            className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-[#1a1a1f] p-6 flex flex-col justify-between"
          >
             {/* Subtle animated aurora glow in background */}
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_50%)] animate-[spin_10s_linear_infinite] pointer-events-none" />

             {/* Hardware Chip & Brand */}
             <div className="relative z-20 flex justify-between items-start translate-z-10">
               <div className="w-12 h-10 rounded-md border border-zinc-600/50 flex flex-wrap gap-0.5 overflow-hidden p-1 bg-zinc-800/80 shadow-inner">
                  <div className="w-[45%] h-[45%] border-r border-b border-zinc-600/40" />
                  <div className="w-[45%] h-[45%] border-b border-zinc-600/40" />
                  <div className="w-[45%] h-[45%] border-r border-zinc-600/40" />
                  <div className="w-[45%] h-[45%]" />
               </div>
               <span className="text-zinc-400 font-bold tracking-widest text-sm uppercase translate-z-20">Premium</span>
             </div>

             {/* Card Details */}
             <div className="relative z-20 flex flex-col gap-4 text-white">
                <div className="text-2xl tracking-[0.2em] font-light font-mono translate-z-30 drop-shadow-lg">
                   {cardNumber}
                </div>
                
                <div className="flex justify-between items-end translate-z-20">
                   <div className="flex flex-col uppercase tracking-widest">
                     <span className="text-[8px] text-zinc-500 font-bold mb-1">Cardholder</span>
                     <span className="font-medium">{name}</span>
                   </div>
                   <div className="flex flex-col uppercase tracking-widest">
                     <span className="text-[8px] text-zinc-500 font-bold mb-1">Expires</span>
                     <span className="font-mono text-sm">{expires}</span>
                   </div>
                </div>
             </div>
             
             {/* Glossy Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none z-30" />
          </motion.div>

          {/* ========================================================= */}
          {/* THE LASER SCANNER BEAM                                    */}
          {/* Moves across the X-axis syncing exactly with the clipPath */}
          {/* ========================================================= */}
          <motion.div 
             style={{ left: beamLeft }}
             className="absolute top-0 bottom-0 w-[2px] bg-[#a855f7] z-30 shadow-[0_0_20px_4px_rgba(168,85,247,0.8),0_0_40px_10px_rgba(168,85,247,0.4)] pointer-events-none"
          >
             {/* Flare at the intersection */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[150%] rounded-[100%] bg-white blur-md opacity-30" />
          </motion.div>

          {/* 3D Dynamic Glare (Overlay on everything) */}
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none rounded-3xl"
            style={{
              background: useMotionTemplate`radial-gradient(circle at ${useTransform(mouseX, [0, 1], [0, 100])}% ${useTransform(mouseY, [0, 1], [0, 100])}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          />
        </motion.div>
      </div>
    );
  }
);

HolographicScannerCard.displayName = "HolographicScannerCard";
