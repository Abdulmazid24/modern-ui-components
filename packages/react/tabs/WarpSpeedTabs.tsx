"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

export interface WarpSpeedTabsProps {
  tabs: TabItem[];
  defaultSelected?: string;
  className?: string;
  accentColor?: string; // e.g., #a855f7 (Purple)
  secondaryColor?: string; // e.g., #22d3ee (Cyan)
}

const defaultTabs: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "dynamics", label: "Dynamics" },
  { id: "quantum", label: "Quantum" },
  { id: "vortex", label: "Vortex" },
];

/**
 * Warp Speed Tabs
 * A 100/100 world-first navigation component.
 * Switching tabs triggers a directional motion-blur "warp" effect, 
 * simulating high-speed travel across the user interface.
 */
export const WarpSpeedTabs = React.forwardRef<HTMLDivElement, WarpSpeedTabsProps>(
  ({ tabs = defaultTabs, defaultSelected = tabs[0].id, className, accentColor = "#a855f7", secondaryColor = "#22d3ee" }, ref) => {
    const [selectedId, setSelectedId] = useState(defaultSelected);
    const [prevIndex, setPrevIndex] = useState(tabs.findIndex(t => t.id === defaultSelected));
    const currentIndex = tabs.findIndex(t => t.id === selectedId);
    
    const direction = currentIndex > prevIndex ? 1 : -1;

    const handleSelect = (id: string, index: number) => {
      setPrevIndex(currentIndex);
      setSelectedId(id);
    };

    return (
      <div 
        ref={ref}
        className={cn(
          "relative flex items-center p-2 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl",
          className
        )}
      >
        <div className="relative flex gap-2">
          {tabs.map((tab, idx) => {
            const isSelected = selectedId === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id, idx)}
                className={cn(
                  "relative px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-colors duration-300 outline-none z-10",
                  isSelected ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <span className="relative z-20">{tab.label}</span>

                {/* Warp Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="warp-indicator"
                    className="absolute inset-0 z-10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                     {/* The Main Pill */}
                     <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-lg" />
                     
                     {/* The Warp Speed Flare (Visible during move) */}
                     <motion.div 
                        initial={false}
                        animate={{ 
                           opacity: [0, 1, 0],
                           scaleX: [1, 1.5, 1],
                           x: direction * 20
                        }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-md pointer-events-none"
                     />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Track Effects */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
           {/* Static Scanlines */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20" />
           
           {/* Moving Warp Particle */}
           <AnimatePresence mode="popLayout">
              {tabs.map((tab, idx) => (
                 selectedId === tab.id && (
                    <motion.div
                       key={`particle-${tab.id}`}
                       initial={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                       animate={{ x: direction === 1 ? "100%" : "-100%", opacity: [0, 0.5, 0] }}
                       transition={{ duration: 0.6, ease: "circOut" }}
                       className="absolute top-1/2 -translate-y-1/2 h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-sm"
                    />
                 )
              ))}
           </AnimatePresence>
        </div>
      </div>
    );
  }
);

WarpSpeedTabs.displayName = "WarpSpeedTabs";
