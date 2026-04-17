"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface ElasticMorphSearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

/**
 * A "God-Tier" Elastic Morph Search Bar (#263).
 * Features:
 * - Right-Side Elastic Expansion: High-stiffness spring expansion for a rubbery feel.
 * - Kinetic Icon Travel: The magnifying glass rotates 180deg and moves to the end of the bar.
 * - Subtle Glass Close: A sophisticated glass-surfaced 'X' icon for minimalist control.
 * - Cmd+K Command Hub: Hotkey support for quick terminal-style searching.
 */
export const ElasticMorphSearchBar = ({
  onSearch,
  className,
}: ElasticMorphSearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { play: playSlide } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Slide sound
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    playSlide();
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setQuery("");
    playSlide();
  };

  // Hotkey Support: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleOpen();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className={cn("relative flex items-center h-16", className)}>
      <motion.div
        initial={false}
        animate={{ 
          width: isOpen ? 320 : 56,
          backgroundColor: isOpen ? "rgba(9, 9, 11, 0.9)" : "rgba(255, 255, 255, 1)",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
        }}
        onClick={() => !isOpen && toggleOpen()}
        className={cn(
          "relative h-14 flex items-center rounded-2xl cursor-pointer overflow-hidden border border-white/10 shadow-lg backdrop-blur-xl",
          isOpen ? "px-2" : "justify-center"
        )}
      >
        {/* Search Icon (Travelling & Rotating) */}
        <motion.div
           animate={{ 
             x: isOpen ? 250 : 0,
             rotate: isOpen ? 180 : 0,
             color: isOpen ? "#94a3b8" : "#09090b"
           }}
           transition={{ type: "spring", stiffness: 400, damping: 30 }}
           className="relative z-20 flex items-center justify-center w-10 h-10 rounded-xl"
        >
          <Search size={22} strokeWidth={2.5} />
        </motion.div>

        {/* Search Input Area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(5px)" }}
              transition={{ delay: 0.1 }}
              className="absolute left-4 right-14"
            >
              <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type to search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-sm font-bold placeholder:text-zinc-600 outline-none select-none"
                />
                
                {/* Hotkey Hint */}
                <div className="hidden md:flex items-center gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                   <Command size={10} className="text-white" />
                   <span className="text-[10px] font-black text-white">K</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Shimmer Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>

      {/* Subtle Glass Close Icon (Outside but linked) */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ scale: 0, x: -20, opacity: 0 }}
            animate={{ scale: 1, x: 12, opacity: 1 }}
            exit={{ scale: 0, x: -20, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors outline-none"
          >
            <X size={18} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
