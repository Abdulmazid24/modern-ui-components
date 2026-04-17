"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutGrid, 
  Settings, 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Cloud, 
  Zap, 
  Cpu 
} from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface GridItem {
  id: string | number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

interface SynapticGridMenuProps {
  items?: GridItem[];
  className?: string;
}

const DEFAULT_GRID_ITEMS: GridItem[] = [
  { id: "profile", icon: User, title: "Profile", description: "Identity & Access", color: "from-cyan-500 to-blue-500" },
  { id: "mail", icon: Mail, title: "Messages", description: "Neural Comms", color: "from-purple-500 to-pink-500" },
  { id: "settings", icon: Settings, title: "Settings", description: "Core config", color: "from-amber-500 to-orange-500" },
  { id: "notifications", icon: Bell, title: "Alerts", description: "Node status", color: "from-red-500 to-rose-500" },
  { id: "cloud", icon: Cloud, title: "Storage", description: "Distributed data", color: "from-sky-500 to-indigo-500" },
  { id: "security", icon: Shield, title: "Vault", description: "Quantum lock", color: "from-emerald-500 to-teal-500" },
  { id: "compute", icon: Cpu, title: "Logic", description: "Process cluster", color: "from-zinc-500 to-slate-500" },
  { id: "power", icon: Zap, title: "Energy", description: "Battery grid", color: "from-yellow-400 to-amber-600" },
  { id: "layout", icon: LayoutGrid, title: "Dashboard", description: "Overview", color: "from-violet-500 to-indigo-600" },
];

/**
 * A "God-Tier" Grid Navigation Inspired by the 9-Dot concept.
 * Features:
 * - Morphing 3x3 Neural Trigger.
 * - Liquid-staggered expansion into Bento tiles.
 * - Neon synaptic glows and glassmorphic depth.
 */
export const SynapticGridMenu = ({
  items = DEFAULT_GRID_ITEMS,
  className,
}: SynapticGridMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { play: playGrid } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3", // Neutral pop server
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    playGrid();
  };

  return (
    <div className={cn("relative flex items-center justify-center min-h-[500px]", className)}>
      {/* 9-Dot Neural Trigger */}
      <button
        onClick={toggleMenu}
        className="group relative flex items-center justify-center p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-500"
      >
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.5, backgroundColor: "rgb(34 211 238 / 0.8)" }}
              className="w-1.5 h-1.5 rounded-full bg-zinc-600 transition-colors duration-300 group-hover:bg-zinc-400"
            />
          ))}
        </div>
        
        {/* 'X' icon during expansion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-cyan-400"
            >
              <LayoutGrid size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Expanded Grid Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-20 z-50 p-6 rounded-[2.5rem] bg-zinc-950/80 border border-zinc-800 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            <div className="grid grid-cols-3 gap-4">
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  className="group relative flex flex-col items-center justify-center p-6 w-32 h-32 rounded-3xl border border-zinc-900 transition-all duration-300 hover:border-zinc-700"
                >
                  <div className={cn(
                    "mb-3 p-2 rounded-xl bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity",
                    item.color
                  )}>
                    <item.icon size={24} className="text-white" />
                  </div>
                  
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-white uppercase tracking-widest font-mono">
                    {item.title}
                  </span>
                  
                  <span className="mt-1 text-[8px] text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-tight text-center">
                    {item.description}
                  </span>

                  {/* Synaptic Glow on hover */}
                  <div className="absolute inset-0 z-[-1] rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity bg-white blur-xl" />
                </motion.button>
              ))}
            </div>

            {/* Panel Decoration */}
            <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center px-2">
              <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                Nodes Active • Vault v3.1
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
