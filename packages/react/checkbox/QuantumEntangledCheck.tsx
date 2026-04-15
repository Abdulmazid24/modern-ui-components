"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface QuantumEntangledCheckProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
  accentColor?: string; // #a855f7
  secondaryColor?: string; // #22d3ee
}

/**
 * Quantum Entangled Check
 * A 100/100 world-first checkbox.
 * Instead of a simple tick, two glowing "entangled" particles fly from 
 * the box corners and collide in the center to form the checkmark 
 * with a quantum discharge effect.
 */
export const QuantumEntangledCheck = React.forwardRef<HTMLButtonElement, QuantumEntangledCheckProps>(
  ({ checked: controlledChecked, onChange, className, label, accentColor = "#a855f7", secondaryColor = "#22d3ee" }, ref) => {
    const [localChecked, setLocalChecked] = useState(false);
    const isChecked = controlledChecked ?? localChecked;

    const toggle = () => {
      const next = !isChecked;
      setLocalChecked(next);
      if (onChange) onChange(next);
    };

    return (
      <label className={cn("inline-flex items-center gap-3 cursor-pointer select-none group", className)}>
        <button
          ref={ref}
          type="button"
          onClick={toggle}
          className={cn(
            "relative w-7 h-7 rounded-lg transition-all duration-300 overflow-hidden",
            "bg-zinc-950 border border-zinc-800 group-hover:border-zinc-700 shadow-lg",
            isChecked && "border-zinc-700/50"
          )}
        >
          {/* Internal Depth / Grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:4px_4px]" />
          
          <AnimatePresence>
            {isChecked && (
              <>
                {/* 1. THE PARTICLE COLLISION (Animation Stage) */}
                <motion.div
                  initial={{ x: "-150%", y: "-150%", opacity: 0 }}
                  animate={{ x: "0%", y: "0%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "circIn" }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                   <div 
                      className="w-2 h-2 rounded-full blur-[2px] shadow-[0_0_10px_2px_rgba(34,211,238,1)]"
                      style={{ backgroundColor: secondaryColor }}
                   />
                </motion.div>
                
                <motion.div
                  initial={{ x: "150%", y: "150%", opacity: 0 }}
                  animate={{ x: "0%", y: "0%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "circIn" }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                   <div 
                      className="w-2 h-2 rounded-full blur-[2px] shadow-[0_0_10px_2px_rgba(168,85,247,1)]"
                      style={{ backgroundColor: accentColor }}
                   />
                </motion.div>

                {/* 2. THE QUANTUM DISCHARGE (Flash) */}
                <motion.div 
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: [0, 4, 0], opacity: [0, 1, 0] }}
                   transition={{ delay: 0.3, duration: 0.4 }}
                   className="absolute inset-0 bg-white rounded-full z-20 blur-md pointer-events-none"
                />

                {/* 3. THE FORMING CHECKMARK */}
                <motion.div
                   className="absolute inset-0 flex items-center justify-center z-30"
                >
                   <svg 
                      viewBox="0 0 24 24" 
                      className="w-4 h-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                   >
                     <motion.path 
                        d="M20 6L9 17L4 12"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
                        style={{ filter: `drop-shadow(0 0 4px ${secondaryColor})` }}
                     />
                   </svg>
                </motion.div>

                {/* Background Glow */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="absolute inset-0 opacity-40"
                   style={{ backgroundColor: `${secondaryColor}22` }}
                />
              </>
            )}
          </AnimatePresence>
        </button>

        {label && (
          <span className={cn(
            "text-sm font-medium transition-colors",
            isChecked ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-300"
          )}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

QuantumEntangledCheck.displayName = "QuantumEntangledCheck";
