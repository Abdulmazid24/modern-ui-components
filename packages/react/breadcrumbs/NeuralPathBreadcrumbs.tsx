"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils";

export interface BreadcrumbNode {
  id: string;
  label: string;
  href?: string;
    className?: string;
}

export interface NeuralPathBreadcrumbsProps {
  paths: BreadcrumbNode[];
  activeId: string;
  onPathClick?: (id: string) => void;
    className?: string;
}

export const NeuralPathBreadcrumbs = React.forwardRef<any, NeuralPathBreadcrumbsProps>(({ className, paths, activeId, onPathClick, ...props }, ref) => {
        const activeIndex = paths.findIndex(p => p.id === activeId);

        return (
        <nav ref={ref} {...props} className={cn("flex items-center gap-4 relative", className)}>
          {/* Background Neural Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-zinc-800 -translate-y-1/2 z-0 rounded-full" />
          
          {/* Animated Synapse Pulse (Moves based on active node) */}
          <motion.div 
            className="absolute top-1/2 left-4 h-0.5 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] -translate-y-1/2 z-0 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, (activeIndex / Math.max(1, paths.length - 1)) * 100)}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />

          {paths.map((path, index) => {
            const isActive = path.id === activeId;
            const isPast = index <= activeIndex;

            return (
              <React.Fragment key={path.id}>
                <button
                  onClick={() => onPathClick?.(path.id)}
                  className="relative z-10 flex items-center gap-2 group"
                >
                  {/* Node Point */}
                  <motion.div 
                    animate={{
                      scale: isActive ? 1.5 : 1,
                      backgroundColor: isActive ? "#f43f5e" : isPast ? "#fda4af" : "#27272a",
                      borderColor: isActive ? "#f43f5e" : isPast ? "#fda4af" : "#3f3f46"
                    }}
                    className="w-3 h-3 rounded-full border-2 transition-colors duration-500"
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-rose-500"
                        animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <span className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-rose-400' : isPast ? 'text-zinc-300 hover:text-white' : 'text-zinc-500'
                  }`}>
                    {path.label}
                  </span>
                </button>
                
                {/* The gap is naturally handled, but we could add a subtle icon if we want instead of a solid line */}
                {index < paths.length - 1 && (
                  <ChevronRight size={14} className={`relative z-10 ${isPast ? 'text-rose-500/50' : 'text-zinc-700'}`} />
                )}
              </React.Fragment>
            );
          })}
        </nav>
        );
        });
