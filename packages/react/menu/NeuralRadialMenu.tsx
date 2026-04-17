"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Home, Settings, Mail, Video, Camera, Gamepad2, User, Key } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface MenuItem {
  id: string | number;
  icon: React.ElementType;
  label: string;
}

interface NeuralRadialMenuProps {
  items?: MenuItem[];
  onSelect?: (item: MenuItem) => void;
  className?: string;
  radius?: number;
}

const DEFAULT_ITEMS: MenuItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "user", icon: User, label: "Profile" },
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "mail", icon: Mail, label: "Messages" },
  { id: "video", icon: Video, label: "Video" },
  { id: "camera", icon: Camera, label: "Camera" },
  { id: "game", icon: Gamepad2, label: "Gaming" },
  { id: "key", icon: Key, label: "Security" },
];

/**
 * A "God-Tier" Radial Menu inspired by the "Magic Indicator" concept.
 * Features:
 * - Exponential radial expansion.
 * - Synaptic Indicator: A glowing active state that flows between items.
 * - 3D icon transforms and spring physics.
 */
export const NeuralRadialMenu = ({
  items = DEFAULT_ITEMS,
  onSelect,
  className,
  radius = 120,
}: NeuralRadialMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const { play: playPop } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3", // Expansion pop
  });

  const { play: playClick } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Selection click
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
    playPop();
  };

  const handleSelect = (item: MenuItem) => {
    setActiveId(item.id);
    onSelect?.(item);
    playClick();
    // Optional: Close on select logic can be added here
  };

  return (
    <div className={cn("relative flex items-center justify-center min-h-[400px] min-w-[400px]", className)}>
      {/* Central Toggle Button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "relative z-50 flex items-center justify-center w-16 h-16 rounded-full border shadow-2xl transition-all duration-500",
          isOpen 
            ? "bg-zinc-950 border-cyan-500/50 text-cyan-400 rotate-315 shadow-[0_0_30px_rgba(34,211,238,0.3)]" 
            : "bg-white border-zinc-200 text-zinc-900 rotate-0 shadow-lg"
        )}
      >
        <Plus size={32} />
      </motion.button>

      {/* Radial Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => {
              const angle = (index * 360) / items.length;
              const angleRad = (angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              return (
                <motion.div
                  key={item.id}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ 
                    x, 
                    y, 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      delay: index * 0.05, 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20 
                    } 
                  }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0, transition: { delay: (items.length - index) * 0.03 } }}
                  className="absolute pointer-events-auto"
                >
                  <button
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "group relative flex items-center justify-center w-12 h-12 rounded-full border bg-zinc-950/80 backdrop-blur-md transition-all duration-300",
                      activeId === item.id 
                        ? "border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                        : "border-zinc-800 hover:border-zinc-600 shadow-xl"
                    )}
                  >
                    {/* Active Indicator (The Magic Magic) */}
                    {activeId === item.id && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute inset-[-4px] rounded-full border-2 border-cyan-500 bg-cyan-500/10 blur-[2px]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <item.icon 
                      size={20} 
                      className={cn(
                        "transition-all duration-300",
                        activeId === item.id ? "text-cyan-400 scale-110" : "text-zinc-500 group-hover:text-zinc-300 group-hover:scale-110"
                      )} 
                    />

                    {/* Label on Hover */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap pointer-events-none uppercase tracking-widest font-mono">
                      {item.label}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Outer Ring */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute z-0 w-[300px] h-[300px] rounded-full border border-dashed border-zinc-800/50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
