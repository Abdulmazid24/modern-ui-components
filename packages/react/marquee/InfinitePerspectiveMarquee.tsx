"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface InfinitePerspectiveMarqueeProps {
  items: React.ReactNode[];
  direction?: "left" | "right";
  velocity?: number;
  perspective?: number;
  className?: string;
}

/**
 * A cinematic 3D logo marquee that warps with perspective.
 * Creates a "Tunnel of Trust" effect for marketing sections.
 */
export const InfinitePerspectiveMarquee = ({
  items,
  direction = "left",
  velocity = 30,
  perspective = 1000,
  className,
}: InfinitePerspectiveMarqueeProps) => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden py-20 px-4",
        className
      )}
      style={{ perspective: `${perspective}px` }}
    >
      <div 
        className="flex items-center gap-12"
        style={{ 
          transformStyle: "preserve-3d",
          transform: "rotateY(-15deg) rotateX(5deg)" 
        }}
      >
        <motion.div
           animate={{
             x: direction === "left" ? [0, -1000] : [-1000, 0]
           }}
           transition={{
             duration: velocity,
             repeat: Infinity,
             ease: "linear"
           }}
           className="flex items-center gap-12"
        >
           {duplicatedItems.map((item, i) => (
              <div 
                key={i}
                className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 [transform-style:preserve-3d]"
                style={{ 
                  transform: "translateZ(50px)",
                  filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))"
                }}
              >
                 {item}
              </div>
           ))}
        </motion.div>
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 opacity-50" />
    </div>
  );
};
