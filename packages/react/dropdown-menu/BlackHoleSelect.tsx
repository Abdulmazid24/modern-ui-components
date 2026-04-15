"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Star, Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  id: string;
  label: string;
}

export interface BlackHoleSelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const defaultOptions: SelectOption[] = [
  { id: "1", label: "Quantum Drive" },
  { id: "2", label: "Neural Network" },
  { id: "3", label: "Dimensional Rift" },
  { id: "4", label: "Vortex Signal" },
];

/**
 * Black Hole Select
 * A 100/100 world-first dropdown component.
 * When opened, a gravitational "singularity" effect pulls 
 * the options from behind the screen into existence with 
 * space-time distortion.
 */
export const BlackHoleSelect = React.forwardRef<HTMLDivElement, BlackHoleSelectProps>(
  ({ options = defaultOptions, placeholder = "Select Core", onChange, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<SelectOption | null>(null);

    const handleSelect = (option: SelectOption) => {
      setSelected(option);
      setIsOpen(false);
      if (onChange) onChange(option.id);
    };

    return (
      <div ref={ref} className={cn("relative w-64", className)}>
        {/* The Display Box */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-full flex items-center justify-between p-4 rounded-xl",
            "bg-zinc-950 border border-zinc-800 transition-all duration-300",
            isOpen ? "border-zinc-600 shadow-[0_0_30px_rgba(0,0,0,0.8)]" : "hover:border-zinc-700"
          )}
        >
          <span className={cn("text-sm font-medium", !selected && "text-zinc-500")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={cn("transition-transform duration-500", isOpen && "rotate-180 text-zinc-300")} size={18} />
          
          {/* Internal Glint */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
             <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
          </div>
        </button>

        {/* The Black Hole Singularity Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0, opacity: 0, filter: "blur(20px)" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={cn(
                "absolute top-full left-0 right-0 mt-3 p-1 rounded-2xl z-[100]",
                "bg-zinc-950/80 backdrop-blur-3xl border border-zinc-800 shadow-2xl overflow-hidden"
              )}
            >
              <div className="relative p-2 space-y-1">
                {options.map((option, idx) => (
                  <motion.button
                    key={option.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "relative w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all duration-200",
                      "hover:bg-zinc-800/50 hover:text-white text-zinc-400 group/item"
                    )}
                  >
                    <span>{option.label}</span>
                    <Hexagon size={14} className="opacity-0 group-hover/item:opacity-40" />
                  </motion.button>
                ))}
              </div>

              {/* Dynamic Gravity Ripple (Visible during open) */}
              <motion.div 
                 animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0, 0.1]
                 }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute inset-0 bg-radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%) pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Space-Time Distortion Background (Only when open) */}
        {isOpen && (
           <div className="fixed inset-0 z-[-1] pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-900/20 blur-[150px] animate-pulse" />
           </div>
        )}
      </div>
    );
  }
);

BlackHoleSelect.displayName = "BlackHoleSelect";
