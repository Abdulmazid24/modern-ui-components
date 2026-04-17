"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface QuantumPulseLoaderProps {
  messages?: string[];
  interval?: number;
  className?: string;
  variant?: "inline" | "full";
  showScanline?: boolean;
}

const DEFAULT_MESSAGES = ["Initializing Neural Core", "Syncing Synapse Nodes", "Quantum Decryption", "Vault Access Granted"];

/**
 * A "God-Tier" Text Loader inspired by sci-fi holographic interfaces.
 * Features:
 * - Holographic Scanning: A radiant light beam reveals typographic details.
 * - Multi-stage Logic: Cycles through sequences of status messages.
 * - Chromatic Aberration: Deep cyan/magenta pulse on transitions.
 * - Elastic Pulse: Subsurface text jitter for a "Neural" feel.
 */
export const QuantumPulseLoader = ({
  messages = DEFAULT_MESSAGES,
  interval = 3000,
  className,
  variant = "full",
  showScanline = true,
}: QuantumPulseLoaderProps) => {
  const [index, setIndex] = useState(0);

  const { play: playHum } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Synaptic pulse hum
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
      playHum();
    }, interval);
    return () => clearInterval(timer);
  }, [messages, interval]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center font-mono tracking-tighter",
        variant === "full" ? "min-h-[200px] w-full" : "inline-flex h-auto w-auto",
        className
      )}
    >
      {/* Background Pulse Glow */}
      <div className="absolute inset-x-0 h-40 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Holographic Scanline Ray */}
      {showScanline && (
        <motion.div
           animate={{ 
             top: ["-20%", "120%"],
             opacity: [0, 1, 1, 0]
           }}
           transition={{ 
             duration: 2, 
             repeat: Infinity, 
             ease: "linear",
             delay: 0.5
           }}
           className="absolute z-20 h-px w-full max-w-md bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] pointer-events-none"
        />
      )}

      {/* Primary Text Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={messages[index]}
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.2 } }}
          className="relative text-white flex items-center gap-1"
        >
          {/* Main Typography */}
          <span className="text-2xl md:text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {messages[index]}
          </span>
          
          {/* Animated Dots */}
          <div className="flex gap-1 ml-1 mb-1">
             {[0, 1, 2].map((i) => (
                <motion.div
                   key={i}
                   animate={{ 
                     y: [0, -4, 0],
                     opacity: [0.3, 1, 0.3],
                     scale: [1, 1.3, 1]
                   }}
                   transition={{ 
                     duration: 1.2, 
                     repeat: Infinity, 
                     delay: i * 0.15 
                   }}
                   className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                />
             ))}
          </div>

          {/* Phantom Chromatic Layer (Cyan) */}
          <motion.span
            animate={{ x: [-1, 1, -1] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 z-[-1] select-none text-cyan-500/40 blur-[1px] opacity-0 group-hover:opacity-100"
          >
            {messages[index]}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Progress Meta Information */}
      <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
         <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-cyan-500/20 rounded-full overflow-hidden relative">
               <motion.div 
                 animate={{ top: ["100%", "0%"] }}
                 transition={{ duration: interval / 1000, repeat: Infinity, ease: "linear" }}
                 className="absolute bottom-0 left-0 right-0 bg-cyan-400"
               />
            </span>
            <span>NODE_{index.toString().padStart(2, '0')}</span>
         </div>
         <span className="opacity-40"> • </span>
         <span>Latency: {(Math.random() * 50 + 10).toFixed(2)}ms</span>
         <span className="opacity-40"> • </span>
         <span>Uptime: 99.99%</span>
      </div>

      <style jsx>{`
        div {
          user-select: none;
        }
      `}</style>
    </div>
  );
};
