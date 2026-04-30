"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface TrayMorphDownloadButtonProps {
  onComplete?: () => void;
  className?: string;
  duration?: number; // Simulated download duration in ms
}

/**
 * A "God-Tier" Milestone Button (260th Component).
 * Features:
 * - SVG Path Morphing: Arrow Down -> Data Tray -> Success Check.
 * - Elastic Width Expansion: Expands on click to reveal progress telemetry.
 * - Volumetric Liquid Progress: Background fills with teal liquid from bottom to top.
 * - Spatial Audio: Synchronized click-to-success audio landscape.
 */
export const TrayMorphDownloadButton = ({
  onComplete,
  className,
  duration = 5000,
}: TrayMorphDownloadButtonProps) => {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [progress, setProgress] = useState(0);

  const { play: playClick } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Sharp click
  });

  const { play: playSuccess } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3", // Success ding
  });

  const handleStart = () => {
    if (state !== "idle") return;
    setState("loading");
    playClick();

    let start = 0;
    const interval = 50;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
        setState("success");
        playSuccess();
        onComplete?.();
      } else {
        setProgress(start);
      }
    }, interval);
  };

  // SVG Path Definitions for Morphing
  const arrowPath = "M12 5V19M12 19L19 12M12 19L5 12";
  const trayPath = "M4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12";
  const checkPath = "M20 6L9 17L4 12";

  return (
    <button
      onClick={handleStart}
      className={cn(
        "relative h-14 bg-white border border-black/5 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] group outline-none transition-all duration-500",
        state === "idle" ? "w-44" : "w-64",
        className
      )}
    >
      {/* Liquid Background Fill */}
      <motion.div
        initial={{ top: "100%" }}
        animate={{ 
          top: `${100 - progress}%`,
          backgroundColor: state === "success" ? "#10b981" : "#14b8a6"
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute inset-x-0 bottom-0 z-0 opacity-20"
      />

      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center gap-3 w-full h-full px-4">
        {/* Morphing Icon */}
        <div className="relative w-6 h-6 flex items-center justify-center">
           <svg 
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="2.5" 
             strokeLinecap="round" 
             strokeLinejoin="round"
             className={cn(
               "w-full h-full transition-colors duration-500",
               state === "loading" ? "text-teal-600" : state === "success" ? "text-emerald-600" : "text-zinc-700"
             )}
           >
              <motion.path
                initial={{ strokeWidth: 2.5 }}
                animate={{ 
                   d: state === "idle" ? arrowPath : state === "loading" ? trayPath : checkPath,
                   strokeWidth: state === "success" ? 3.5 : 2.5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {state === "loading" && (
                 <motion.path
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1 }}
                   d="M12 8V12"
                   className="animate-pulse"
                 />
              )}
           </svg>
        </div>

        {/* Text Area */}
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="download"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-sm font-bold text-zinc-800"
            >
              Download
            </motion.span>
          )}

          {state === "loading" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-sm font-black text-teal-700 tabular-nums">
                {Math.floor(progress)}%
              </span>
              <span className="text-[10px] font-bold text-teal-600/60 uppercase tracking-widest">
                Done
              </span>
            </motion.div>
          )}

          {state === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm font-black text-emerald-700"
            >
              Success
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Gloss Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent z-20" />
    </button>
  );
};
