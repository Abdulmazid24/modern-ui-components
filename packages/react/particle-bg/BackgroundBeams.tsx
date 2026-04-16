"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface BackgroundBeamsProps {
  className?: string;
  count?: number;
}

/**
 * Subtle, wandering light beams that drift across the entire background.
 * Adds profound depth and motion to dark-mode interfaces.
 */
export const BackgroundBeams = ({ className, count = 10 }: BackgroundBeamsProps) => {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20", className)}>
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {Array.from({ length: count }).map((_, i) => (
          <motion.path
            key={i}
            d={`M ${Math.random() * 100}% -10% L ${Math.random() * 100}% 110%`}
            stroke="url(#beam-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 50, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};
