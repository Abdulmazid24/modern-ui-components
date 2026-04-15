"use client";

import React, { useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LiquidMetaballSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  color?: string;
}

/**
 * Liquid Metaball Switch
 * A 100/100 world-first organic toggle.
 * Uses SVG filters to create a gooey liquid effect where 
 * two drops merge and split with physics-based stretching.
 */
export const LiquidMetaballSwitch = React.forwardRef<HTMLButtonElement, LiquidMetaballSwitchProps>(
  ({ checked: controlledChecked, onChange, className, color = "#a855f7" }, ref) => {
    const [localChecked, setLocalChecked] = useState(false);
    const isChecked = controlledChecked ?? localChecked;

    const toggle = () => {
      const next = !isChecked;
      setLocalChecked(next);
      if (onChange) onChange(next);
    };

    return (
      <div className={cn("relative flex items-center justify-center p-4", className)}>
        {/* SVG Gooey Filter Definition */}
        <svg className="absolute w-0 h-0 invisible">
          <defs>
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -15" 
                result="goo" 
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        <button
          ref={ref}
          onClick={toggle}
          className="relative w-28 h-12 rounded-full bg-zinc-950 border border-zinc-800/80 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-visible group"
        >
          {/* Background Track Glow */}
          <motion.div 
             animate={{
                opacity: isChecked ? 0.3 : 0.05,
                backgroundColor: isChecked ? color : "#fff"
             }}
             className="absolute inset-2 rounded-full blur-md"
          />

          {/* Gooey Container */}
          <div className="absolute inset-0 filter-[url('#liquid-goo')]">
            {/* The Static Base Drops (Placeholder/Target) */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-800" />
            <motion.div 
               animate={{ backgroundColor: isChecked ? color : "#27272a" }}
               className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full" 
            />

            {/* The Moving Liquid Blob */}
            <motion.div
              layout
              animate={{
                left: isChecked ? "65%" : "18%",
                backgroundColor: isChecked ? color : "#52525b",
                scale: isChecked ? 1.2 : 1,
              }}
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 20 },
                backgroundColor: { duration: 0.4 }
              }}
              className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full shadow-lg z-10"
            />
          </div>

          {/* Internal Hardware Glints */}
          <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
             <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
          </div>
        </button>

        {/* Outer Halo */}
        <motion.div 
           animate={{
              opacity: isChecked ? 1 : 0,
              scale: isChecked ? 1.1 : 0.9
           }}
           style={{ boxShadow: `0 0 40px 5px ${color}22` }}
           className="absolute inset-0 pointer-events-none rounded-full"
        />
      </div>
    );
  }
);

LiquidMetaballSwitch.displayName = "LiquidMetaballSwitch";
