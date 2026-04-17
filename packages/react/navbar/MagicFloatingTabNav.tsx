"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, Heart, User } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface NavTab {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string; // The hex color for the highlight and underglow
}

const DEFAULT_TABS: NavTab[] = [
  { id: "home", icon: Home, label: "Home", color: "#22d3ee" }, // Cyan
  { id: "search", icon: Search, label: "Search", color: "#a855f7" }, // Purple
  { id: "notification", icon: Bell, label: "Alerts", color: "#10b981" }, // Emerald
  { id: "favorites", icon: Heart, label: "Likes", color: "#f43f5e" }, // Rose
  { id: "profile", icon: User, label: "Profile", color: "#6366f1" }, // Indigo
];

interface MagicFloatingTabNavProps {
  tabs?: NavTab[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * A "God-Tier" Floating Navigation Bar.
 * Features:
 * - Wrapping Bubble Geometry: High-elasticity highlight that encases the active icon.
 * - Active Reveal Labels: Minimalist aesthetic where labels only appear for the selected tab.
 * - Chromatic Underglow: Adaptive ambient lighting that changes to match the selected icon.
 * - Spatial Audio: Synchronized liquid-slide feedback on transitions.
 */
export const MagicFloatingTabNav = ({
  tabs = DEFAULT_TABS,
  activeId: controlledActiveId,
  onChange,
  className,
}: MagicFloatingTabNavProps) => {
  const [internalActiveId, setInternalActiveId] = useState(tabs[0].id);
  const activeId = controlledActiveId ?? internalActiveId;
  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  const { play: playSlide } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3", // Clean pop/slide
  });

  const handleTabClick = (id: string) => {
    setInternalActiveId(id);
    onChange?.(id);
    playSlide();
  };

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-50", className)}>
      {/* Chromatic Table Reflection Underglow */}
      <motion.div
        animate={{ 
           backgroundColor: activeTab.color,
           opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[150px] h-[30px] rounded-full blur-[40px] pointer-events-none z-[-1]"
      />

      <div className="relative flex items-center bg-zinc-950/80 border border-white/5 p-2 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative group flex flex-col items-center justify-center w-20 h-16 outline-none"
            >
              {/* Wrapping Bubble Highlight */}
              {isActive && (
                <motion.div
                  layoutId="magic-bubble"
                  className="absolute inset-2 rounded-2xl z-0"
                  style={{ 
                    backgroundColor: tab.color,
                    boxShadow: `0 0 20px ${tab.color}33`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon Container */}
              <motion.div
                animate={isActive ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
                className={cn(
                  "relative z-10 p-1.5 transition-colors duration-300",
                  isActive ? "text-zinc-950" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              >
                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>

              {/* Active Label Reveal */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 whitespace-nowrap"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Edge Reflection Line */}
      <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
    </div>
  );
};
