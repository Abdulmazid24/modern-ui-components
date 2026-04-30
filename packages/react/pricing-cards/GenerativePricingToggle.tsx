"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface GenerativePricingToggleProps {
  onToggle?: (isYearly: boolean) => void;
  className?: string;
}

/**
 * A luxury pricing switch with a liquid transition effect.
 */
export const GenerativePricingToggle = ({
  onToggle,
  className,
}: GenerativePricingToggleProps) => {
  const [isYearly, setIsYearly] = useState(false);

  const toggle = () => {
    const next = !isYearly;
    setIsYearly(next);
    onToggle?.(next);
  };

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <span className={cn("text-xs font-bold uppercase tracking-widest transition-colors", !isYearly ? "text-white" : "text-zinc-600")}>
        Monthly
      </span>

      <div 
        onClick={toggle}
        className="relative w-24 h-12 bg-zinc-900 rounded-full cursor-pointer p-1.5 overflow-hidden border border-zinc-800"
      >
        {/* The Liquid Metaball Indicator */}
        <motion.div
           animate={{
             x: isYearly ? 48 : 0,
             scaleX: [1, 1.3, 1], // Stretch effect
           }}
           transition={{ 
             x: { type: "spring", stiffness: 220, damping: 25 },
             scaleX: { duration: 0.3 }
           }}
           className="relative w-9 h-9 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
           {/* Inner Optical Highlight */}
           <div className="absolute inset-2 bg-white/20 rounded-full blur-[1px]" />
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-col">
        <span className={cn("text-xs font-bold uppercase tracking-widest transition-colors text-zinc-600", isYearly ? "text-white" : "text-zinc-600")}>
          Yearly
        </span>
        <div className="h-0 w-0 relative">
           <span className="absolute left-0 top-0 whitespace-nowrap text-[8px] font-black text-emerald-400 uppercase tracking-widest">
             20% OFF
           </span>
        </div>
      </div>
    </div>
  );
};
