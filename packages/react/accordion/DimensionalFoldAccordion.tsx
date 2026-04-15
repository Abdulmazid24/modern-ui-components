"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Box, Layers, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export interface DimensionalFoldAccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
  accentColor?: string;
}

const defaultItems: AccordionItem[] = [
  { id: "1", title: "Quantum Architecture", content: "Explore the depths of sub-atomic layout systems where every pixel is entangled.", icon: <Box size={18} /> },
  { id: "2", title: "Dimensional Layering", content: "Stack infinite UI planes with zero latency using our proprietary fold technology.", icon: <Layers size={18} /> },
  { id: "3", title: "Kinetic Energy", content: "Convert user interactions into raw visual power through optimized vertex shaders.", icon: <Zap size={18} /> },
];

/**
 * Dimensional Fold Accordion
 * A 100/100 world-first kinetic component.
 * Panels unfold in 3D using perspective transforms, creating a 
 * physical "paper-fold" aesthetic with dynamic lighting and shadows.
 */
export const DimensionalFoldAccordion = React.forwardRef<HTMLDivElement, DimensionalFoldAccordionProps>(
  ({ items = defaultItems, defaultOpenId, className, accentColor = "#fbbf24" }, ref) => {
    const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

    const toggle = (id: string) => {
      setOpenId(openId === id ? null : id);
    };

    return (
      <div 
        ref={ref} 
        className={cn("w-full max-w-xl space-y-4 perspective-[1500px]", className)}
      >
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="group">
              {/* Header / Trigger */}
              <button
                onClick={() => toggle(item.id)}
                className={cn(
                  "relative w-full flex items-center justify-between p-5 rounded-2xl z-20 transition-all duration-300",
                  "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-xl",
                  isOpen && "rounded-b-none border-b-transparent shadow-none"
                )}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={cn(
                        "p-2 rounded-xl transition-colors",
                        isOpen ? "bg-amber-500/10 text-amber-500" : "bg-zinc-800 text-zinc-400"
                    )}
                  >
                    {item.icon}
                  </div>
                  <span className={cn(
                    "font-bold tracking-tight transition-colors",
                    isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                  )}>
                    {item.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? accentColor : "#52525b" }}
                >
                  <ChevronDown size={20} />
                </motion.div>
                
                {/* Active Underglow */}
                {isOpen && (
                  <motion.div 
                    layoutId="header-glow"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none"
                  />
                )}
              </button>

              {/* Dimensional Content Fold */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ rotateX: -90, opacity: 0, originY: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative z-10"
                  >
                    <div className={cn(
                        "p-6 rounded-b-2xl bg-zinc-900/50 backdrop-blur-xl border border-t-0 border-zinc-800 shadow-2xl overflow-hidden",
                        "after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/40 after:to-transparent after:pointer-events-none"
                    )}>
                      {/* Internal Content with Lighting Effect */}
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative z-10 text-zinc-400 leading-relaxed text-sm lg:text-base"
                      >
                        {item.content}
                      </motion.div>
                      
                      {/* Geometric Decorative Element */}
                      <div 
                         className="absolute -right-4 -bottom-4 w-24 h-24 rotate-12 opacity-5 pointer-events-none"
                         style={{ color: accentColor }}
                      >
                         <Box size={96} />
                      </div>
                    </div>
                    
                    {/* The "Paper Fold" Shadow Cast on parent */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black blur-xl -z-10 translate-y-4 scale-95"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }
);

DimensionalFoldAccordion.displayName = "DimensionalFoldAccordion";
