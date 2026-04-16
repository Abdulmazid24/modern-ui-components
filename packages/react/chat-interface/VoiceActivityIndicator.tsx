"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface VoiceActivityIndicatorProps {
  isActive?: boolean;
  color?: string;
  className?: string;
}

/**
 * A fluid, multi-layered waveform animation inspired by modern voice assistants.
 */
export const VoiceActivityIndicator = ({
  isActive = true,
  color = "#8b5cf6",
  className,
}: VoiceActivityIndicatorProps) => {
  const bars = Array.from({ length: 5 });

  return (
    <div className={cn("flex items-center justify-center gap-1.5 h-12", className)}>
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={isActive ? {
            height: [12, 32 + Math.random() * 16, 12],
            backgroundColor: [color, "#c084fc", color],
          } : {
            height: 4,
            opacity: 0.3
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className="w-1.5 rounded-full bg-zinc-800"
          style={{ 
            boxShadow: isActive ? `0 0 15px ${color}44` : 'none'
          }}
        />
      ))}
      
      {/* Decorative Aura */}
      <motion.div 
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] } : { scale: 1, opacity: 0 }}
        className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-2xl pointer-events-none"
      />
    </div>
  );
};
