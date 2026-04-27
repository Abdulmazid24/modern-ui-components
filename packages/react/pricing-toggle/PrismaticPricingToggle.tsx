"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface PrismaticPricingToggleProps {
  readonly isYearly: boolean;
  readonly onChange: (isYearly: boolean) => void;
  readonly discountLabel?: string; // e.g. "Save 20%"
  readonly className?: string;
}

/** PrismaticPricingToggle — Animated pill toggle for pricing with dynamic discount badge and glow effects. */
export const PrismaticPricingToggle = React.forwardRef<HTMLDivElement, PrismaticPricingToggleProps>(
  ({ className, isYearly, onChange, discountLabel = "Save 20%", ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn("relative flex items-center justify-center", className)}>
        <div className="relative flex items-center p-1.5 bg-zinc-950 border border-zinc-800 rounded-full shadow-inner">
          {/* Animated Active Pill Background */}
          <motion.div 
            className="absolute top-1.5 bottom-1.5 w-[120px] bg-zinc-800 rounded-full shadow-md z-0"
            animate={{ left: isYearly ? "calc(100% - 120px - 6px)" : "6px" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />

          <button 
            onClick={() => onChange(false)}
            className={cn("relative z-10 w-[120px] py-2.5 text-sm font-semibold transition-colors duration-300 rounded-full", !isYearly ? "text-white" : "text-zinc-500 hover:text-zinc-300")}
          >
            Monthly
          </button>
          
          <button 
            onClick={() => onChange(true)}
            className={cn("relative z-10 w-[120px] py-2.5 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center justify-center gap-2", isYearly ? "text-white" : "text-zinc-500 hover:text-zinc-300")}
          >
            Yearly
          </button>
        </div>

        {/* Floating Discount Badge */}
        {discountLabel && (
          <motion.div 
            initial={false}
            animate={{ 
              x: isYearly ? 50 : 0, 
              y: isYearly ? -15 : -10,
              opacity: isYearly ? 1 : 0.5,
              scale: isYearly ? 1 : 0.9
            }}
            className="absolute top-0 right-0 lg:-right-8 pointer-events-none"
          >
            <div className="relative inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 whitespace-nowrap">
                {discountLabel}
              </span>
              {/* Pointing triangle */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-violet-500/30" />
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);
PrismaticPricingToggle.displayName = "PrismaticPricingToggle";
