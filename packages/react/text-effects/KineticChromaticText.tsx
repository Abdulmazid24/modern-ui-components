"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface KineticChromaticTextProps {
  text: string;
  className?: string;
  glow?: boolean;
}

/**
 * A "God-Tier" Chromatic Typographic Effect (#265).
 * Features:
 * - Hypnotic Rainbow Flow: A slow, seamless color gradient through the text.
 * - Prismatic RGB Split: Text splits into R, G, B channels on hover (Chromatic Aberration).
 * - Volumetric Pulsing Glow: A soft neon aura behind the characters.
 * - Pure Text Effect: Zero background dependencies.
 */
export const KineticChromaticText = ({
  text,
  className,
  glow = true,
}: KineticChromaticTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { play: playPrism } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Glassy prism chime
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    playPrism();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Gradient animation variants
  const gradientStyles = {
    background: "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div 
      className={cn("relative inline-block cursor-default group select-none", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Volumetric Glow (Pulsing) */}
      <AnimatePresence>
        {glow && (
          <motion.span
            aria-hidden="true"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={gradientStyles}
            className="absolute inset-0 blur-xl select-none animate-gradient-slow"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Main Chromatic Layer (Flowing) */}
      <span 
        style={gradientStyles}
        className="relative z-10 animate-gradient-slow font-black tracking-tight"
      >
        {text}
      </span>

      {/* Prismatic Splitting Layers (On Hover) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
        {/* Red Channel */}
        <motion.span
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            x: isHovered ? -3 : 0,
            y: isHovered ? -1 : 0
          }}
          className="absolute inset-0 font-black tracking-tight text-[#ff0000] mix-blend-screen"
        >
          {text}
        </motion.span>

        {/* Green Channel */}
        <motion.span
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            x: isHovered ? 2 : 0,
            y: isHovered ? 2 : 0
          }}
          className="absolute inset-0 font-black tracking-tight text-[#00ff00] mix-blend-screen"
        >
          {text}
        </motion.span>

        {/* Blue Channel */}
        <motion.span
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            x: isHovered ? 1 : 0,
            y: isHovered ? -2 : 0
          }}
          className="absolute inset-0 font-black tracking-tight text-[#0000ff] mix-blend-screen"
        >
          {text}
        </motion.span>
      </div>

      <style jsx>{`
        .animate-gradient-slow {
          animation: rainbow-flow 25s linear infinite;
        }
        @keyframes rainbow-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};
