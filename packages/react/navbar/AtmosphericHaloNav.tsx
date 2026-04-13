"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

export interface AtmosphericHaloNavProps {
  items?: string[];
    className?: string;
}

const defaultItems = ["MISSIONS", "FLEET", "TECHNOLOGY", "GALAXY", "TRANSMISSIONS"];

export const AtmosphericHaloNav = React.forwardRef<any, AtmosphericHaloNavProps>(({ className, items = defaultItems, ...props }, ref) => {
        const [activeIndex, setActiveIndex] = useState(0);

        return (
        <div ref={ref} {...props} className={cn("flex items-center justify-center p-20 bg-black min-h-[300px]", className)}>
          <nav className="relative flex items-center px-12 py-6 rounded-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 overflow-visible">
            
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              
              // Calculate distance from active item for the "Gravitational Lensing" effect
              const dist = Math.abs(index - activeIndex);
              let lenseScale = 1;
              let color = "text-zinc-500";
              
              if (isActive) {
                 lenseScale = 1.2;
                 color = "text-white";
              } else if (dist === 1) {
                 lenseScale = 0.95;
                 color = "text-zinc-400";
              } else if (dist === 2) {
                 lenseScale = 0.85;
                 color = "text-zinc-600";
              } else {
                 lenseScale = 0.75;
                 color = "text-zinc-700";
              }

              return (
                <div 
                  key={item} 
                  className="relative px-6 py-2 cursor-pointer outline-none select-none group z-20"
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Active Halo & Coronas */}
                  {isActive && (
                    <motion.div
                      layoutId="atmospheric-halo"
                      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                       {/* Main Eclipse Body */}
                       <div className="absolute inset-x-2 inset-y-0 bg-black rounded-full shadow-[0_0_15px_rgba(0,0,0,1)] z-10" />
                       
                       {/* Inner Corona */}
                       <motion.div 
                         className="absolute inset-x-0 -inset-y-2 rounded-full border border-orange-500/30 opacity-80 mix-blend-screen"
                         style={{ boxShadow: "0 0 30px rgba(255,100,0,0.6)" }}
                         animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                         transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                       />

                       {/* Outer Radiance */}
                       <motion.div 
                         className="absolute -inset-x-8 -inset-y-8 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,150,50,0.2),transparent,rgba(200,50,255,0.2),transparent)] blur-xl mix-blend-screen"
                         animate={{ rotate: -360 }}
                         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                       />
                    </motion.div>
                  )}

                  {/* Text Label with Gravitational Lensing simulation */}
                  <motion.span
                    className={`relative z-20 block font-black font-mono tracking-widest text-xs transition-colors duration-500 ${color}`}
                    animate={{ scale: lenseScale }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ 
                      textShadow: isActive ? "0 0 10px rgba(255,255,255,0.5)" : "none",
                      transformOrigin: "center bottom"
                    }}
                  >
                    {item}
                  </motion.span>
                  
                  {/* Event horizon hover line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white opacity-0 group-hover:w-1/2 group-hover:opacity-50 transition-all duration-300" />
                </div>
              );
            })}
          </nav>
        </div>
        );
        });
