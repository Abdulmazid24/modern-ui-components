"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/utils";

export interface GravityOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
    className?: string;
}

export interface GravitySelectProps {
  options: GravityOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
    className?: string;
}

export const GravitySelect = React.forwardRef<any, GravitySelectProps>(({ className, options, value, onChange, placeholder = "Select an option...", ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);

        const selectedOption = options.find((opt) => opt.value === value);

        // Close on outside click
        useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
          if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsOpen(false);
          }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
        }, []);

        const handleSelect = (val: string) => {
        onChange?.(val);
        setIsOpen(false);
        };

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-xs", className)} ref={containerRef}>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-100 font-medium hover:border-zinc-700 hover:bg-zinc-800/50 transition-colors shadow-lg"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              {selectedOption ? (
                <>
                  {selectedOption.icon && <span className="text-purple-400">{selectedOption.icon}</span>}
                  <span>{selectedOption.label}</span>
                </>
              ) : (
                <span className="text-zinc-500">{placeholder}</span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <ChevronDown size={18} className="text-zinc-500" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <div className="absolute top-[110%] left-0 w-full z-50 perspective-[1000px]">
                <motion.div 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-2 shadow-2xl overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="flex flex-col gap-1">
                    {options.map((option, index) => {
                      const isSelected = value === option.value;
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleSelect(option.value)}
                          // Gravity drop effect: Starts high up and angled, drops and bounces
                          initial={{ y: -50, opacity: 0, rotateX: 45 }}
                          animate={{ y: 0, opacity: 1, rotateX: 0 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            mass: 0.8,
                            delay: index * 0.05, // Staggered drop
                          }}
                          className={`relative flex items-center justify-between w-full px-4 py-3 rounded-2xl text-left font-medium transition-colors ${
                            isSelected 
                              ? "bg-purple-600/20 text-purple-400" 
                              : "text-zinc-300 hover:bg-zinc-800"
                          }`}
                        >
                          <div className="flex items-center gap-3 relative z-10">
                            {option.icon}
                            {option.label}
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="relative z-10"
                            >
                              <Check size={16} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
        );
        });
