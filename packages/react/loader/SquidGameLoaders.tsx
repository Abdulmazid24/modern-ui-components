"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SHAPE SHIFTER LOADER (The Squad)
 * Morphs between Circle -> Triangle -> Square using Framer Motion clipPath
 */
export function ShapeShifterLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <span className="text-xs font-black tracking-[0.3em] text-[#ff005a]">
        THE SQUAD
      </span>
      <motion.div
        className="w-12 h-12 bg-[#ff005a]"
        animate={{
          clipPath: [
            "circle(50% at 50% 50%)", // Circle
            "polygon(50% 0%, 0% 100%, 100% 100%)", // Triangle
            "inset(0% 0% 0% 0%)", // Square
            "circle(50% at 50% 50%)", // Back to Circle
          ],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.33, 0.66, 1],
          repeat: Infinity,
        }}
      />
    </div>
  );
}

/**
 * DALGONA LOADER
 * Simulates a shaking honeycomb cookie that continuously cracks in the middle
 */
export function DalgonaLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <span className="text-xs font-black tracking-[0.3em] text-[#ff005a]">
        DALGONA
      </span>
      <motion.div
        className="relative w-12 h-12 bg-[#e2b04a] rounded-full flex items-center justify-center overflow-hidden"
        animate={{
          x: [-2, 2, -2, 2, -1, 1, 0],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* The Crack Line */}
        <motion.div
          className="absolute w-full h-[3px] bg-zinc-950/40"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </div>
  );
}

/**
 * RED LIGHT LOADER
 * Simulates a scanning eye that flashes red
 */
export function RedLightLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <span className="text-xs font-black tracking-[0.3em] text-[#ff005a]">
        RED LIGHT
      </span>
      <motion.div
        className="w-12 h-12 rounded-full"
        animate={{
          backgroundColor: ["#ffffff", "#ff005a", "#ffffff"],
          boxShadow: [
            "0 0 0px rgba(255,0,90,0)",
            "0 0 30px rgba(255,0,90,0.8)",
            "0 0 0px rgba(255,0,90,0)",
          ],
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}

/**
 * STROKE DRAW LOADER
 * Infinite spinning SVG circle matching the series color
 */
export function StrokeDrawLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <span className="text-xs font-black tracking-[0.3em] text-[#ff005a]">
        STROKE DRAW
      </span>
      <div className="relative w-12 h-12">
        <motion.svg
          viewBox="0 0 50 50"
          className="w-full h-full absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#ff005a"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ strokeDasharray: "1 150", strokeDashoffset: 0 }}
            animate={{
              strokeDasharray: ["1 150", "90 150", "90 150"],
              strokeDashoffset: [0, -35, -124],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
}

/**
 * GROUP EXPORT: A showcase container of all loaders for easy viewing
 */
export function SquidGameLoaders() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12 p-12 bg-zinc-950 rounded-[32px] border border-white/5">
      <ShapeShifterLoader />
      <DalgonaLoader />
      <RedLightLoader />
      <StrokeDrawLoader />
    </div>
  );
}
