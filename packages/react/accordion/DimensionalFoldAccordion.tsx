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
}

const defaultItems: AccordionItem[] = [
  { id: "1", title: "Quantum Architecture", content: "Explore the depths of sub-atomic layout systems where every pixel is entangled.", icon: <Box size={18} /> },
  { id: "2", title: "Dimensional Layering", content: "Stack infinite UI planes with zero latency using our proprietary fold technology.", icon: <Layers size={18} /> },
  { id: "3", title: "Kinetic Energy", content: "Convert user interactions into raw visual power through optimized vertex shaders.", icon: <Zap size={18} /> },
];

export const DimensionalFoldAccordion = React.forwardRef<HTMLDivElement, DimensionalFoldAccordionProps>(
  ({ items = defaultItems, defaultOpenId, className }, ref) => {
    const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

    const toggle = (id: string) => {
      setOpenId(openId === id ? null : id);
    };

    return (
      <div 
        ref={ref} 
        style={{ perspective: "2000px" }}
        className={cn("w-full max-w-xl space-y-6", className)}
      >
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* Header / Trigger - Elevated Card Look */}
              <button
                onClick={() => toggle(item.id)}
                className={cn(
                  "relative w-full flex items-center justify-between p-6 z-20 transition-all duration-500",
                  "bg-zinc-950 border border-zinc-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]",
                  isOpen ? "rounded-t-xl" : "rounded-xl hover:border-zinc-600 hover:-translate-y-1"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                      "p-3 rounded-lg shadow-inner flex items-center justify-center transition-all duration-500",
                      isOpen ? "bg-amber-500 text-black rotate-[360deg]" : "bg-zinc-900 text-zinc-500"
                  )}>
                    {item.icon}
                  </div>
                  <span className={cn(
                    "text-lg font-bold uppercase tracking-[0.2em] transition-colors",
                    isOpen ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                  )}>
                    {item.title}
                  </span>
                </div>
                
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800",
                      isOpen ? "bg-zinc-800 text-amber-500" : "text-zinc-600"
                  )}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              {/* Dimensional Content Fold - Perspective Logic */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ rotateX: -110, opacity: 0, originY: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -110, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 14,
                      opacity: { duration: 0.2 }
                    }}
                    className="relative z-10 origin-top"
                  >
                    {/* The "Paper" container */}
                    <div className="relative p-8 rounded-b-xl bg-zinc-900 border border-t-0 border-zinc-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
                      
                      {/* Crease Lighting Effect (Gradient at the top to simulate a fold) */}
                      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                      
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="relative z-10 text-zinc-400 leading-relaxed font-mono text-sm uppercase tracking-wide"
                      >
                        <div className="mb-4 text-xs text-amber-500/50">DATA_BLOCK.LOADED</div>
                        {item.content}
                      </motion.div>
                      
                      {/* Subtle Grid Pattern for Material Feel */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                      />
                    </div>
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
