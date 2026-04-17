"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Stars } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface AtmosphericThemeToggleProps {
  isDark?: boolean;
  onThemeChange?: (isDark: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  enableLogic?: boolean; // If true, automatically toggles document.documentElement class
}

/**
 * A "God-Tier" Theme Switcher inspired by the celestial cycle.
 * Features:
 * - Shifting atmosphere track (Daylight Blue to Deep Midnight).
 * - Morphing orb (Sun with corona to Moon with craters).
 * - Interactive stars that appear during dark mode.
 * - Spatial audio feedback.
 */
export const AtmosphericThemeToggle = ({
  isDark: controlledIsDark,
  onThemeChange,
  className,
  size = "md",
  enableLogic = true,
}: AtmosphericThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);
  
  const { play: playShimmer } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Celestial shimmer
  });

  // Handle controlled/uncontrolled state
  const activeIsDark = controlledIsDark !== undefined ? controlledIsDark : isDark;

  useEffect(() => {
    if (enableLogic) {
      const root = window.document.documentElement;
      if (activeIsDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [activeIsDark, enableLogic]);

  const toggleTheme = () => {
    const nextState = !activeIsDark;
    if (controlledIsDark === undefined) setIsDark(nextState);
    onThemeChange?.(nextState);
    playShimmer();
  };

  const sizes = {
    sm: "w-12 h-6 p-0.5",
    md: "w-20 h-10 p-1",
    lg: "w-28 h-14 p-1.5",
  };

  const orbSizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-11 h-11",
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center rounded-full transition-colors duration-700 ease-in-out shadow-2xl",
        sizes[size],
        activeIsDark 
          ? "bg-gradient-to-br from-indigo-950 via-purple-950 to-zinc-950 border border-purple-500/30" 
          : "bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 border border-white/40",
        className
      )}
    >
      {/* Atmosphere Layer: Stars */}
      <AnimatePresence>
        {activeIsDark && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 2 + "px",
                  height: Math.random() * 2 + "px",
                  top: Math.random() * 80 + 10 + "%",
                  left: Math.random() * 80 + 10 + "%",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cloud Layer (Light Mode) */}
      <AnimatePresence>
        {!activeIsDark && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.4, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute left-2 top-0 bottom-0 flex items-center pointer-events-none"
          >
             <div className="w-8 h-2 bg-white/40 rounded-full blur-sm" />
             <div className="w-4 h-1 bg-white/40 rounded-full blur-sm -ml-2 mb-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Celestial Orb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
        className={cn(
          "z-10 relative flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]",
          orbSizes[size],
          activeIsDark 
            ? "bg-zinc-200" // Moon
            : "bg-amber-100" // Sun
        )}
        style={{
          marginLeft: activeIsDark ? "auto" : "0",
        }}
      >
        {/* Sun Aura */}
        {!activeIsDark && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] bg-amber-400/20 rounded-full blur-md"
          />
        )}

        {/* Visual Content: Sun Rays or Moon Craters */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
          {activeIsDark ? (
            <div className="relative w-full h-full">
              {/* Moon Craters */}
              <div className="absolute top-2 left-1 w-2 h-2 bg-zinc-300 rounded-full opacity-60" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-zinc-300 rounded-full opacity-60" />
              <div className="absolute top-1/2 right-1 w-1 h-1 bg-zinc-300 rounded-full opacity-60" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <Sun size={size === "sm" ? 12 : 20} className="text-amber-500 animate-pulse" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Fixed Icons for context */}
      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none opacity-20">
        <Sun size={14} className={cn("text-white", activeIsDark ? "hidden" : "block")} />
        <Moon size={14} className={cn("text-white ml-auto", !activeIsDark ? "hidden" : "block")} />
      </div>
    </button>
  );
};
