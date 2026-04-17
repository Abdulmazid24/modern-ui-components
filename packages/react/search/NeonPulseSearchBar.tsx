"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Command } from "lucide-react";
import { cn } from "../utils";

interface NeonPulseSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  hotkey?: string; // e.g. "k"
}

/**
 * A "God-Tier" Atmospheric Search Bar.
 * Features:
 * - Rotating Multi-Color Border Beam: Continuous magenta-purple racing light.
 * - Constant Atmospheric Underglow: Perpetual breathing ambient light behind the input.
 * - Typing-Reactive Pulse: Glow intensifies and speeds up as the user types.
 * - Command Center Logic: Supports Cmd/Ctrl + K auto-focus within a glassmorphic container.
 */
export const NeonPulseSearchBar = ({
  placeholder = "Search anything or press ⌘K",
  onSearch,
  className,
  hotkey = "k",
}: NeonPulseSearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === hotkey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hotkey]);

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto py-12 px-4", className)}>
      {/* Constant Atmospheric Underglow */}
      <motion.div
        animate={{ 
          opacity: isFocused ? [0.4, 0.6, 0.4] : [0.2, 0.3, 0.2],
          scale: isFocused ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{ 
          duration: value.length > 0 ? 1.5 : 3, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-gradient-to-r from-magenta-500/20 via-purple-500/20 to-magenta-500/20 rounded-[2rem] blur-[60px] pointer-events-none z-0"
        style={{
           // Fallback colors if magenta isn't in tailwind
           background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)"
        }}
      />

      <div className="relative z-10">
        {/* The Input Container */}
        <div 
          className={cn(
            "relative flex items-center gap-3 bg-zinc-950/80 rounded-[1.25rem] p-1 transition-all duration-500",
            isFocused ? "shadow-[0_0_40px_rgba(168,85,247,0.15)] bg-black/90 scale-[1.02]" : "shadow-2xl"
          )}
        >
          {/* Rotating Multi-Color Border Beam */}
          <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden pointer-events-none">
            <div 
              className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_60%,#ec4899_75%,#a855f7_90%,transparent_100%)] animate-border-beam opacity-40 transition-opacity"
              style={{ animationDuration: value.length > 0 ? "2s" : "4s" }}
            />
          </div>

          {/* Inner Content Area */}
          <div className="relative flex-1 flex items-center gap-3 px-4 h-14 bg-zinc-950/90 rounded-[1.15rem] border border-white/5 backdrop-blur-3xl overflow-hidden">
             <Search className={cn("shrink-0 transition-colors", isFocused ? "text-purple-400" : "text-zinc-600")} size={20} />
             
             <input
               ref={inputRef}
               type="text"
               value={value}
               onChange={(e) => {
                 setValue(e.target.value);
                 onSearch?.(e.target.value);
               }}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               placeholder={placeholder}
               className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-700 font-medium"
             />

             {/* Hotkey Indicator */}
             <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-500 select-none">
                <Command size={10} />
                <span>K</span>
             </div>

             {/* Filter Icon */}
             <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-600 hover:text-white transition-all">
                <SlidersHorizontal size={18} />
             </button>
          </div>
        </div>
        
        {/* Shimmer Effect on Focus */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-20"
            />
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes border-beam {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-border-beam {
          animation: border-beam 4s linear infinite;
        }
      `}</style>
    </div>
  );
};
