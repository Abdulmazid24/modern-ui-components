"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, X, Code as Code2, Globe as Facebook, 
  Briefcase as Briefcase, Camera as Instagram, Video as Youtube, MessageCircle 
} from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface SocialItem {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  href: string;
}

const DEFAULT_ITEMS: SocialItem[] = [
  { id: "x", icon: MessageCircle, label: "X", color: "#000000", href: "#" },
  { id: "facebook", icon: Facebook, label: "Facebook", color: "#1877f2", href: "#" },
  { id: "linkedin", icon: Briefcase, label: "LinkedIn", color: "#0077b5", href: "#" },
  { id: "instagram", icon: Instagram, label: "Instagram", color: "#e4405f", href: "#" },
  { id: "github", icon: Code2, label: "GitHub", color: "#333333", href: "#" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", color: "#25d366", href: "#" },
  { id: "youtube", icon: Youtube, label: "YouTube", color: "#ff0000", href: "#" },
];

interface CosmicRadialShareMenuProps {
  items?: SocialItem[];
  radius?: number;
  className?: string;
}

/**
 * A "God-Tier" Radial Social Menu (#261).
 * Features:
 * - Centrifugal Spiral Expansion: Icons fly out in a spiral motion.
 * - Continuous Orbital Rotation: The ring slowly orbits the center when open.
 * - Brand-Adaptive Aura Glow: Each icon radiates its identity in a soft volumetric glow.
 * - Liquid Morph Core: The share icon liquid-morphs into a Close (X) icon.
 * - Auto-Close Logic: Implodes back into the center once a destination is selected.
 */
export const CosmicRadialShareMenu = ({
  items = DEFAULT_ITEMS,
  radius = 120,
  className,
}: CosmicRadialShareMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { play: playWhoosh } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Orbital whoosh/click
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    playWhoosh();
  };

  const handleItemClick = (href: string) => {
    setIsOpen(false);
    playWhoosh();
    // In a real app, window.open(href, '_blank') or similar would happen here
    console.log(`Navigating to ${href}`);
  };

  return (
    <div className={cn("relative flex items-center justify-center w-[350px] h-[350px]", className)}>
      {/* Central Trigger Button */}
      <motion.button
        onClick={toggleMenu}
        className="relative z-50 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-90 transition-transform outline-none"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
            >
              <X size={28} className="text-zinc-900" />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
            >
              <Share2 size={28} className="text-zinc-900" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Decorative inner ring */}
        <div className="absolute inset-1 rounded-full border border-black/5 pointer-events-none" />
      </motion.button>

      {/* The Orbital Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              className="relative w-full h-full"
            >
              {/* Continuous Slow Orbital Rotation Wrapper */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
              >
                {items.map((item, index) => {
                  const angle = (index / items.length) * (2 * Math.PI);
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        scale: 1, 
                        x, 
                        y,
                      }}
                      exit={{ scale: 0, x: 0, y: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        delay: index * 0.05 
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    >
                      <button
                        onClick={() => handleItemClick(item.href)}
                        className="group relative w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all outline-none"
                      >
                        {/* Brand Aura Glow */}
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-md transition-opacity"
                          style={{ backgroundColor: item.color }}
                        />
                        
                        {/* Icon - Counter-rotating to stay upright */}
                        <motion.div
                           animate={{ rotate: -360 }}
                           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                          <item.icon 
                            size={20} 
                            strokeWidth={2.5}
                            style={{ color: item.color }} 
                          />
                        </motion.div>

                        {/* Label Tooltip */}
                        <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-white bg-black/80 px-2 py-1 rounded-md">
                          {item.label}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Blur Orbs */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 bg-black/5 backdrop-blur-sm rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
