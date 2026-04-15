"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GravityWellLoaderProps {
  size?: number;
  className?: string;
  color?: string;
  particleCount?: number;
}

/**
 * Gravity Well Loader
 * An ultra-premium 100/100 loader featuring a 3D gravity indentation effect.
 * Particles are sucked into a Golden Singularity within a Deep Zinc void.
 */
export const GravityWellLoader = React.forwardRef<HTMLDivElement, GravityWellLoaderProps>(
  ({ size = 200, className, color = "#fbbf24", particleCount = 12 }, ref) => {
    return (
      <div
        ref={ref}
        style={{ width: size, height: size }}
        className={cn("relative flex items-center justify-center perspective-[800px]", className)}
      >
        {/* Background Depth Indentation (The Well) */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_30%,rgba(24,24,27,0.8)_100%)] shadow-inner" />
        
        {/* The Gravitational Core (Singularity) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              `0 0 20px 2px ${color}44`,
              `0 0 50px 10px ${color}88`,
              `0 0 20px 2px ${color}44`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-8 h-8 rounded-full z-20"
          style={{ backgroundColor: color }}
        >
          {/* Internal Glow Flare */}
          <div className="absolute inset-0 rounded-full bg-white blur-[2px] opacity-40" />
        </motion.div>

        {/* Orbiting rings (Space Curvature) */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            animate={{ rotateX: 70, rotateZ: 360 }}
            transition={{
              rotateZ: { duration: 3 + ring, repeat: Infinity, ease: "linear" },
            }}
            style={{
              width: 60 + ring * 40,
              height: 60 + ring * 40,
              borderColor: `${color}${ring === 1 ? '44' : '11'}`,
            }}
            className="absolute border rounded-full transform-style-3d pointer-events-none"
          />
        ))}

        {/* Particles being sucked in */}
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.cos((i * 360) / particleCount) * (size / 2),
              y: Math.sin((i * 360) / particleCount) * (size / 2),
              z: 100
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0.2],
              x: 0,
              y: 0,
              z: 0
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: (i * 2) / particleCount,
              ease: "circIn",
            }}
            className="absolute w-1.5 h-1.5 rounded-full z-10"
            style={{ backgroundColor: color }}
          />
        ))}

        {/* Light Lens Flare */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden rounded-full">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-[35deg]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-[35deg]" />
        </div>
      </div>
    );
  }
);

GravityWellLoader.displayName = "GravityWellLoader";
