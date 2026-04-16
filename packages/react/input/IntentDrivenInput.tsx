"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface IntentDrivenInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  enableAudio?: boolean;
}

/**
 * An input field that "wakes up" as the user's mouse approaches.
 * Uses Proximity-Aware animation logic.
 */
export const IntentDrivenInput = ({
  label,
  className,
  enableAudio = false,
  ...props
}: IntentDrivenInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });
  const proximity = useSpring(0, { stiffness: 100, damping: 30 });

  const { play: playWake } = useSpatialAudio({ 
    enabled: enableAudio, 
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3" 
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dist = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      // Max proximity reached at 300px
      const p = Math.max(0, 1 - dist / 300);
      proximity.set(p);

      if (p > 0.8 && !isFocused && !enableAudio) {
         // Subtle wake logic if needed
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [proximity, isFocused, enableAudio]);

  const glowOpacity = useTransform(proximity, [0, 1], [0, 0.4]);
  const scale = useTransform(proximity, [0, 1], [0.98, 1.02]);

  return (
    <motion.div
      ref={containerRef}
      style={{ scale }}
      onMouseEnter={() => playWake()}
      className={cn("relative w-full max-w-md", className)}
    >
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2 block ml-2">
          {label}
        </label>
      )}

      <div className="relative group">
         <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl py-5 px-8 outline-none transition-all placeholder:text-zinc-800 focus:border-purple-500/50"
            {...props}
         />

         {/* Intent Glow Aura */}
         <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 -z-10 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"
         />
         
         {/* Animated Border Ring */}
         <div className="absolute inset-0 border border-purple-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
};
