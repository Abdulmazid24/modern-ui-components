"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DimensionalPortalInputProps {
  placeholder?: string;
  onChange?: (val: string) => void;
    className?: string;
}

export const DimensionalPortalInput = React.forwardRef<any, DimensionalPortalInputProps>(({ className, placeholder = "Type into the void...", onChange, ...props }, ref) => {
        const [value, setValue] = useState("");
        const [isFocused, setIsFocused] = useState(false);

        // Split value into characters to animate each key press falling into the portal
        const chars = value.split("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (onChange) onChange(e.target.value);
        };

        return (
        <div ref={ref} {...props} className={cn("relative flex items-center justify-center p-12 bg-black min-h-[300px]", className)}>
          <motion.div
            className="relative w-full max-w-sm"
            // Setup the 3D scene container
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="relative w-full h-[60px] preserve-3d"
              animate={{
                rotateX: isFocused ? 20 : 0, // Tilt backwards into screen
                z: isFocused ? -50 : 0,      // Push backward
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main Input Element (Invisible trigger area) */}
              <input
                type="text"
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-text"
              />

              {/* The visible 3D Box */}
              <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                
                {/* Base Floor (The Portal Void) */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 origin-bottom"
                  animate={{
                    height: isFocused ? "200px" : "60px",
                    rotateX: isFocused ? -90 : 0, // Fold out as a floor
                    opacity: isFocused ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  style={{
                    background: "linear-gradient(to top, rgba(139, 92, 246, 0.2), transparent)",
                    boxShadow: "inset 0 0 40px rgba(139, 92, 246, 0.1)",
                    borderBottom: "1px solid rgba(139, 92, 246, 0.5)",
                  }}
                >
                  {/* Grid on the floor */}
                  <div 
                    className="w-full h-full opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px"
                    }}
                  />
                </motion.div>

                {/* Front Glass Pane (Where the cursor theoretically is) */}
                <motion.div
                  className="absolute inset-0 border border-violet-500/50 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm flex items-center px-4"
                  animate={{
                    translateZ: isFocused ? 50 : 0,
                    boxShadow: isFocused 
                      ? "0 20px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(139, 92, 246, 0.2)" 
                      : "0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  {/* Placeholder */}
                  {!value && (
                    <span className="text-violet-400/50 font-medium tracking-wide">
                      {placeholder}
                    </span>
                  )}

                  {/* Rendering actual characters */}
                  <div className="flex items-center" style={{ transformStyle: "preserve-3d" }}>
                    <AnimatePresence>
                      {chars.map((char, i) => (
                        <motion.span
                          key={`${i}-${char}`}
                          initial={{ 
                            opacity: 0, 
                            y: -50, 
                            z: 100, // Starts closer to user
                            scale: 2 
                          }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            z: 0, 
                            scale: 1 
                          }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15,
                          }}
                          className="inline-block text-white font-bold text-xl drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </AnimatePresence>

                    {/* Animated Blinking Cursor */}
                    {isFocused && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="inline-block w-0.5 h-6 bg-violet-400 ml-1 box-shadow-[0_0_8px_#8b5cf6]"
                      />
                    )}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        </div>
        );
        });
