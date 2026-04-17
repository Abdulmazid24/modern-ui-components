"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, PlusCircle, User, Settings } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface NavTab {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string; // The spotlight color for this tab
}

const DEFAULT_TABS: NavTab[] = [
  { id: "home", icon: Home, label: "Home", color: "rgba(34, 211, 238, 0.4)" }, // Cyan
  { id: "search", icon: Search, label: "Search", color: "rgba(139, 92, 246, 0.4)" }, // Violet
  { id: "add", icon: PlusCircle, label: "Create", color: "rgba(236, 72, 153, 0.4)" }, // Pink
  { id: "profile", icon: User, label: "Profile", color: "rgba(16, 185, 129, 0.4)" }, // Emerald
  { id: "settings", icon: Settings, label: "Settings", color: "rgba(245, 158, 11, 0.4)" }, // Amber
];

interface CosmicSpotlightTabsProps {
  tabs?: NavTab[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * A "God-Tier" Floating Navigation Bar.
 * Features:
 * - Adaptive Volumetric Spotlight: Light color changes to match the icon.
 * - 3D Icon Lift: Active icons are elevated with smooth spring physics.
 * - Crystalline Glass Bar: Premium floating container at the bottom.
 * - Spatial Audio: Integrated humming and click feedback.
 */
export const CosmicSpotlightTabs = ({
  tabs = DEFAULT_TABS,
  activeId: controlledActiveId,
  onChange,
  className,
}: CosmicSpotlightTabsProps) => {
  const [internalActiveId, setInternalActiveId] = useState(tabs[0].id);
  const activeId = controlledActiveId ?? internalActiveId;
  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  const { play: playShimmer } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Celestial shimmer
  });

  const handleTabClick = (id: string) => {
    setInternalActiveId(id);
    onChange?.(id);
    playShimmer();
  };

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-50", className)}>
      <div className="relative flex items-center gap-1 rounded-[2.5rem] border border-white/5 bg-zinc-950/60 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
        {/* The Cosmic Spotlight Beam */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeId}
              layoutId="spotlight-beam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 h-full w-[20%] z-0"
              style={{
                background: `conic-gradient(from 180deg at 50% 0%, transparent 40%, ${activeTab.color} 50%, transparent 60%)`,
                left: `${(tabs.findIndex((t) => t.id === activeId) * 100) / tabs.length}%`,
                filter: "blur(20px)",
                mixBlendMode: "screen",
              }}
            />
          </AnimatePresence>
        </div>

        {/* The Tabs */}
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative group flex h-14 w-16 items-center justify-center outline-none"
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-x-2 bottom-2 h-1 rounded-full z-10"
                  style={{ backgroundColor: tab.color.replace("0.4", "0.8") }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}

              <div className="relative z-20 flex flex-col items-center justify-center">
                <motion.div
                  animate={isActive ? { y: -6, scale: 1.15 } : { y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                  )}
                >
                  <tab.icon size={24} />
                </motion.div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 4, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest text-white/40 whitespace-nowrap"
                    >
                      {tab.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-white/0 transition-colors group-hover:bg-white/5" />
            </button>
          );
        })}
      </div>
      
      {/* Volumetric Underglow */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200px] h-[40px] pointer-events-none blur-[40px] z-[-1]"
        style={{ backgroundColor: activeTab.color }}
      />
    </div>
  );
};
