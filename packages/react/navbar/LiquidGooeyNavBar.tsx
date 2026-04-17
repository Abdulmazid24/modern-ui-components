"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, MessageCircle, Camera, Settings } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { id: "home", icon: Home, label: "Home", color: "#a3e635" }, // Lime
  { id: "profile", icon: User, label: "User", color: "#a3e635" },
  { id: "chat", icon: MessageCircle, label: "Chat", color: "#a3e635" },
  { id: "camera", icon: Camera, label: "Photo", color: "#a3e635" },
  { id: "settings", icon: Settings, label: "Setup", color: "#a3e635" },
];

interface LiquidGooeyNavBarProps {
  items?: NavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * A "God-Tier" Liquid Morphology Navigation Bar.
 * Features:
 * - Metaball SVG Filtering: Real-time liquid pull between the bubble and the bar.
 * - Solid Neon Bubble: High-contrast circular highlight that lifts out-of-bounds.
 * - Always-On Clarity: Labels remain visible beneath the icons for better UX.
 * - Fluid Cutout: The bar indentation is perfectly synchronized with the active item.
 */
export const LiquidGooeyNavBar = ({
  items = DEFAULT_ITEMS,
  activeId: controlledActiveId,
  onChange,
  className,
}: LiquidGooeyNavBarProps) => {
  const [internalActiveId, setInternalActiveId] = useState(items[0].id);
  const activeId = controlledActiveId ?? internalActiveId;
  const activeItem = items.find((item) => item.id === activeId) || items[0];

  const { play: playLiquid } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3", // Liquid slide/pop
  });

  const handleItemClick = (id: string) => {
    setInternalActiveId(id);
    if (onChange) onChange(id);
    playLiquid();
  };

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-50", className)}>
      {/* SVG Filter for Gooey Effect */}
      <svg className="hidden">
        <defs>
          <filter id="gooey-morph">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="relative flex items-end justify-center h-24 px-4"
        style={{ filter: "url(#gooey-morph)" }}
      >
        {/* The Sliding Liquid Bubble */}
        <motion.div
          layoutId="liquid-bubble"
          className="absolute z-0 w-16 h-16 rounded-full bottom-[45px]"
          style={{ backgroundColor: activeItem.color }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />

        {/* The Main Navigation Bar Body */}
        <div className="relative flex items-center justify-around w-[380px] h-[70px] bg-zinc-950 rounded-3xl z-10 px-2 border border-white/5">
           {/* Shadow to make the bar body look solid inside the gooey filter */}
           <div className="absolute inset-0 bg-zinc-950 rounded-3xl -z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* The Icons and Labels (Outside the filter to remain sharp) */}
      <div className="absolute inset-x-0 bottom-0 h-24 flex items-end justify-around px-6 pointer-events-none">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="relative flex flex-col items-center justify-center w-16 h-full pointer-events-auto group outline-none"
            >
              {/* Lifted Icon Container */}
              <motion.div
                animate={isActive ? { y: -52, scale: 1.15 } : { y: -20, scale: 1 }}
                className={cn(
                  "transition-colors duration-300",
                  isActive ? "text-zinc-950" : "text-zinc-500 group-hover:text-zinc-200"
                )}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>

              {/* Bottom Label (Always Visible) */}
              <span 
                className={cn(
                  "absolute bottom-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                  isActive ? "text-white opacity-100 scale-100" : "text-zinc-600 opacity-60 scale-95"
                )}
              >
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <motion.div
                  layoutId="indicator-dot"
                  className="absolute bottom-1 w-1 h-1 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
