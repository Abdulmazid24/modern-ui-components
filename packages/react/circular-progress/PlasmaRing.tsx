"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PlasmaRingProps {
  progress?: number; // 0 to 100
  size?: number;
    className?: string;
}

export const PlasmaRing = React.forwardRef<any, PlasmaRingProps>(({ className, progress = 75, size = 200, ...props }, ref) => {
        const strokeWidth = 4;
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const strokeDashoffset = circumference - (progress / 100) * circumference;

        // The speed of rotation intensifies as progress increases
        const duration = Math.max(1, 10 - (progress / 100) * 8);

        return (
        <div ref={ref} {...props} className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
          
          {/* Percentage Text Core */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
             <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-600 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
               {Math.round(progress)}
               <span className="text-lg text-cyan-500">%</span>
             </span>
          </div>

          {/* Outer Plasma Ring (Rotates constantly) */}
          <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0 -rotate-90 pointer-events-none"
            animate={{ rotate: 270 }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#plasma-gradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference / 6} ${circumference / 12}`}
              strokeLinecap="round"
              className="opacity-70 blur-[1px]"
            />
            {/* Core glowing line */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#plasma-gradient)"
              strokeWidth={strokeWidth / 2}
              strokeDasharray={`${circumference / 8} ${circumference / 8}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="plasma-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                <stop offset="50%" stopColor="#3b82f6" /> {/* Blue */}
                <stop offset="100%" stopColor="#8b5cf6" /> {/* Purple */}
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Actual Progress Ring */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0 -rotate-90 pointer-events-none"
          >
            {/* Track Background */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#18181b"
              strokeWidth={strokeWidth}
            />
            {/* Progress Fill */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#plasma-gradient)"
              strokeWidth={strokeWidth + 2}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
              strokeLinecap="round"
              className="shadow-[0_0_20px_rgba(34,211,238,0.8)]"
              style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.5))" }}
            />
          </svg>
          
          {/* Inner spark particles could go here if we want more explosion, but this is clean */}
        </div>
        );
        });
