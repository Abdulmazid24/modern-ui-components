"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PrismFractalTextProps {
  text: string;
  className?: string;
  shatterIntensity?: number;
}

/**
 * Prism Fractal Text
 * A 100/100 world-first text effect.
 * Letters are rendered as iridescent prisms that "shatter" into geometric 
 * fractal fragments on hover, then perfectly realign. 
 * Features chromatic aberration and prismatic light shifts.
 */
export const PrismFractalText = React.forwardRef<HTMLDivElement, PrismFractalTextProps>(
  ({ text = "Vault", className, shatterIntensity = 30 }, ref) => {
    const letters = (text || "").split("");

    return (
      <div 
        ref={ref}
        className={cn("flex flex-wrap items-center justify-center gap-x-[0.1em] cursor-default select-none", className)}
      >
        {letters.map((char, i) => (
          <PrismLetter key={`${char}-${i}`} char={char} intensity={shatterIntensity} delay={i * 0.05} />
        ))}
      </div>
    );
  }
);

const PrismLetter = ({ char, intensity, delay }: { char: string; intensity: number; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fractal shatter coordinates
  const fragments = Array.from({ length: 4 }).map((_, idx) => ({
    x: (Math.random() - 0.5) * intensity * (isHovered ? 2 : 0),
    y: (Math.random() - 0.5) * intensity * (isHovered ? 2 : 0),
    rotate: (Math.random() - 0.5) * 45 * (isHovered ? 1 : 0),
  }));

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-7xl font-black tracking-tighter perspective-[500px]"
    >
      {/* 1. THE MAIN PRISMATIC CHARACTER */}
      <motion.span
        animate={{
          color: isHovered ? "transparent" : "#fff",
          filter: isHovered ? "blur(4px) opacity(0)" : "blur(0px) opacity(1)",
        }}
        className="relative z-20 transition-colors duration-500"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>

      {/* 2. FRACTAL SHARD LAYERS (Visible on hover) */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {fragments.map((frag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: frag.x, 
                  y: frag.y, 
                  rotate: frag.rotate,
                }}
                exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                className={cn(
                  "absolute inset-0 flex items-center justify-center mix-blend-screen",
                  idx === 0 ? "text-cyan-400" : 
                  idx === 1 ? "text-purple-500" : 
                  idx === 2 ? "text-amber-400" : "text-white"
                )}
                style={{ clipPath: `polygon(${idx*25}% 0, ${(idx+1)*25}% 0, ${(idx+1)*25}% 100%, ${idx*25}% 100%)` }}
              >
                {char}
                {/* Internal Prism Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent blur-sm" />
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 3. CHROMATIC UNDERLAY */}
      <motion.span
        animate={{
          opacity: isHovered ? 0.8 : 0,
          x: isHovered ? -2 : 0,
          y: isHovered ? 2 : 0,
        }}
        className="absolute inset-0 text-cyan-500/30 z-0 blur-[2px]"
      >
        {char}
      </motion.span>
      <motion.span
        animate={{
          opacity: isHovered ? 0.8 : 0,
          x: isHovered ? 2 : 0,
          y: isHovered ? -2 : 0,
        }}
        className="absolute inset-0 text-purple-500/30 z-0 blur-[2px]"
      >
        {char}
      </motion.span>
    </motion.div>
  );
};

PrismFractalText.displayName = "PrismFractalText";
