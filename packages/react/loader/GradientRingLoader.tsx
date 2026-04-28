"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface GradientRingLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  gradientColors?: [string, string];
}

export const GradientRingLoader = ({
  className,
  size = "md",
  gradientColors = ["#3b82f6", "#ec4899"], // Default: Blue to Pink
}: GradientRingLoaderProps) => {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const innerSizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-zinc-900",
        "shadow-[inset_0_4px_10px_rgba(0,0,0,0.6),0_2px_10px_rgba(255,255,255,0.05)]",
        sizes[size],
        className
      )}
    >
      {/* Rotating Gradient Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1.5,
        }}
        className="absolute rounded-full w-[80%] h-[80%]"
        style={{
          background: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`,
          // Add a drop shadow to the gradient itself to make it glow slightly
          boxShadow: `0 0 15px ${gradientColors[1]}40`,
        }}
      />

      {/* Inner White/Light Core */}
      <div
        className={cn(
          "relative z-10 rounded-full bg-white",
          "shadow-[inset_0_2px_5px_rgba(0,0,0,0.1),0_0_15px_rgba(255,255,255,0.5)]",
          innerSizes[size]
        )}
      />
    </div>
  );
};
