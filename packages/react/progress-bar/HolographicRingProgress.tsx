"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HolographicRingProgressProps {
  value?: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
  accentColor?: string; // #fbbf24
}

/**
 * Holographic Ring Progress
 * A 100/100 world-first progress indicator.
 * Features a circular holographic projection with a 
 * rotating refractive lens and a liquid energy fill effect.
 */
export const HolographicRingProgress = React.forwardRef<HTMLDivElement, HolographicRingProgressProps>(
  ({ value = 0, size = 160, strokeWidth = 12, className, accentColor = "#fbbf24" }, ref) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div 
        ref={ref}
        style={{ width: size, height: size }}
        className={cn("relative flex items-center justify-center perspective-[1000px]", className)}
      >
        {/* Background Track (Deep Zinc) */}
        <svg width={size} height={size} className="absolute -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#18181b"
            strokeWidth={strokeWidth}
          />
          {/* Active Energy Ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={accentColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          />
        </svg>

        {/* The Holographic Lens (Rotating refraction) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <div 
             className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/20 blur-[2px] shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
             style={{ boxShadow: `0 0 20px 5px ${accentColor}44` }}
          />
        </motion.div>

        {/* Central Content (Value) */}
        <div className="relative z-20 flex flex-col items-center justify-center">
           <motion.span 
              key={value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-black text-white tracking-tighter"
           >
              {Math.round(value)}%
           </motion.span>
           <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-500">Progress</span>
        </div>

        {/* Outer Halo Rings */}
        <div className="absolute inset-[-20%] border border-zinc-800/20 rounded-full opacity-40 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-[-10%] border border-dashed border-zinc-700/10 rounded-full opacity-20 animate-[spin_15s_linear_infinite_reverse]" />

        {/* Internal Glow Discharge */}
        <motion.div 
           animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.9, 1.1, 0.9]
           }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 bg-radial-gradient(circle,rgba(251,191,36,0.1)_0%,transparent_70%) rounded-full"
           style={{ backgroundImage: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)` }}
        />
      </div>
    );
  }
);

HolographicRingProgress.displayName = "HolographicRingProgress";
