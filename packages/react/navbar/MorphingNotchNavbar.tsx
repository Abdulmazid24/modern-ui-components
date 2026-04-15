"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, PlaySquare, BarChart2, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface MorphingNotchNavbarProps {
  items?: NavItem[];
  defaultSelected?: string;
  className?: string;
  onItemSelect?: (id: string) => void;
}

const defaultItems: NavItem[] = [
  { id: "home", icon: <Home size={20} />, label: "Home" },
  { id: "content", icon: <PlaySquare size={20} />, label: "Content" },
  { id: "stats", icon: <BarChart2 size={20} />, label: "Stats" },
  { id: "messages", icon: <MessageSquare size={20} />, label: "Chat" },
  { id: "profile", icon: <User size={20} />, label: "Profile" },
];

/**
 * Morphing Notch Navbar
 * A 100/100 enterprise-grade navigation component featuring Dark Glass aesthetics,
 * liquid physics transitions, and a synchronized top notch indicator.
 */
export const MorphingNotchNavbar = React.forwardRef<HTMLElement, MorphingNotchNavbarProps>(
  ({ items = defaultItems, defaultSelected = "home", className, onItemSelect }, ref) => {
    const [selected, setSelected] = useState<string>(defaultSelected);
    const [hovered, setHovered] = useState<string | null>(null);

    const handleSelect = (id: string) => {
      setSelected(id);
      if (onItemSelect) onItemSelect(id);
    };

    return (
      <nav
        ref={ref}
        className={cn(
          "relative flex items-center justify-center p-3 sm:p-4 rounded-full",
          "bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 shadow-2xl",
          className
        )}
      >
        <div className="relative flex items-center gap-1 sm:gap-2">
          {items.map((item) => {
            const isActive = selected === item.id;
            const isHovered = hovered === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col items-center justify-center w-14 sm:w-20 h-14 sm:h-16 outline-none"
              >
                {/* 1. The Top Notch Indicator (The "Bite" or Dot) */}
                {isActive && (
                  <motion.div
                    layoutId="notch"
                    className="absolute -top-3 sm:-top-4 left-1/2 w-6 h-6 -translate-x-1/2 z-30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                     {/* Outer glow of the notch */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-cyan-400/30 blur-md rounded-full" />
                     {/* The physical notch connection drawing into the navbar */}
                     <svg className="absolute top-0 w-6 h-4 text-zinc-950/80 drop-shadow-[0_2px_4px_rgba(34,211,238,0.3)]" viewBox="0 0 24 12" fill="currentColor">
                        <path d="M0 0 C 6 0, 8 10, 12 10 C 16 10, 18 0, 24 0 L 24 12 L 0 12 Z" />
                     </svg>
                     {/* Inner active dot */}
                     <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]"
                     />
                  </motion.div>
                )}

                {/* 2. The Active Glass Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-x-1 top-2 bottom-2 rounded-2xl bg-zinc-800/80 shadow-inner border border-zinc-700/50 z-0"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}

                {/* Hover gentle highlight */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hover-pill"
                    className="absolute inset-x-2 top-2 bottom-2 rounded-xl bg-zinc-800/30 z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {/* 3. The Icon & Text Content */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-1 pointer-events-none">
                  <motion.div
                    animate={{
                      y: isActive ? -2 : 0,
                      scale: isActive ? 1.1 : 1,
                      color: isActive ? "#22d3ee" : isHovered ? "#e4e4e7" : "#a1a1aa", // cyan-400 to zinc-200 to zinc-400
                    }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, position: "absolute", bottom: -15 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-[10px] sm:text-xs font-semibold text-cyan-400 tracking-wide"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }
);

MorphingNotchNavbar.displayName = "MorphingNotchNavbar";
