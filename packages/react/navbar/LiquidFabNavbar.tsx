"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Home, 
  BarChart2, 
  User, 
  Settings, 
  Camera, 
  Image as ImageIcon, 
  Video, 
  FileText,
  X 
} from 'lucide-react';
import { cn } from "@/utils";

export interface LiquidFabNavbarProps {
  className?: string;
  onAction?: (actionId: string) => void;
}

/**
 * LiquidFabNavbar — A world-class bottom navigation bar featuring a central 
 * Floating Action Button (FAB) that expands into a sub-menu with fluid animations.
 * Uses SVG path morphing to create a "liquid" cutout for the FAB.
 */
export const LiquidFabNavbar = React.forwardRef<any, LiquidFabNavbarProps>(({ className = '', onAction, ...props }, ref) => {
        const [activeTab, setActiveTab] = useState('home');
        const [isOpen, setIsOpen] = useState(false);

        const mainNavItems = [
        { id: 'home', icon: <Home size={22} />, label: 'Home' },
        { id: 'stats', icon: <BarChart2 size={22} />, label: 'Stats' },
        { id: 'profile', icon: <User size={22} />, label: 'Profile' },
        { id: 'settings', icon: <Settings size={22} />, label: 'Settings' },
        ];

        const actionItems = [
        { id: 'camera', icon: <Camera size={20} />, label: 'Camera', color: 'bg-blue-500' },
        { id: 'gallery', icon: <ImageIcon size={20} />, label: 'Gallery', color: 'bg-indigo-500' },
        { id: 'video', icon: <Video size={20} />, label: 'Video', color: 'bg-purple-500' },
        { id: 'docs', icon: <FileText size={20} />, label: 'Docs', color: 'bg-pink-500' },
        ];

        const handleAction = (id: string) => {
        onAction?.(id);
        setIsOpen(false);
        };

        // SVG path for the container with a central curve/dip
        // The path uses quadratic bezier curves (Q) to create a smooth drop-down for the FAB
        const svgPath = "M0,20 L35,20 Q40,20 42,25 Q50,45 58,25 Q60,20 65,20 L100,20 L100,80 L0,80 Z";

        return (
        <div ref={ref} {...props} className={cn(className)}  className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50 ${className}`}>
          <div className="relative">
            
            {/* Sub-menu (Floating above) */}
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[240px] bg-blue-600 rounded-3xl p-2 shadow-2xl flex items-center justify-around z-20"
                >
                  {actionItems.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleAction(item.id)}
                      className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/20 rounded-2xl transition-all"
                      aria-label={item.label}
                    >
                      {item.icon}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Navbar Body */}
            <div className="relative h-20 filter drop-shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
              {/* Liquid SVG Background */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 100 80" 
                preserveAspectRatio="none"
              >
                <path 
                  d={svgPath} 
                  fill="white" 
                  className="transition-all duration-500 ease-in-out"
                />
              </svg>

              {/* Nav Items Grid */}
              <div className="absolute inset-0 grid grid-cols-5 items-center px-4 pt-4">
                {/* First two items */}
                {mainNavItems.slice(0, 2).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center justify-center transition-all ${
                      activeTab === item.id ? 'text-blue-600 scale-110' : 'text-zinc-400'
                    }`}
                  >
                    {item.icon}
                  </button>
                ))}

                {/* Central FAB Slot (Empty, FAB sits above it) */}
                <div className="flex justify-center" />

                {/* Last two items */}
                {mainNavItems.slice(2, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center justify-center transition-all ${
                      activeTab === item.id ? 'text-blue-600 scale-110' : 'text-zinc-400'
                    }`}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>

              {/* The Actual FAB */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-colors z-30 ${
                  isOpen ? 'bg-blue-700' : 'bg-blue-600'
                }`}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Plus size={32} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
        );
        });
