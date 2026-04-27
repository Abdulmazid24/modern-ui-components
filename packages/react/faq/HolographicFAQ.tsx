"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../utils";

export interface FAQItem {
  readonly id: string;
  readonly question: string;
  readonly answer: React.ReactNode;
}

export interface HolographicFAQProps {
  readonly items: readonly FAQItem[];
  readonly allowMultiple?: boolean;
  readonly className?: string;
}

/** HolographicFAQ — Expandable FAQ accordion with cyber-gradients, glassmorphism, and spring physics. */
export const HolographicFAQ = React.forwardRef<HTMLDivElement, HolographicFAQProps>(
  ({ className, items, allowMultiple = false, ...props }, ref) => {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
      setExpandedIds(prev => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <div ref={ref} {...props} className={cn("max-w-3xl mx-auto w-full flex flex-col gap-3", className)}>
        {items.map((item) => {
          const isExpanded = expandedIds.has(item.id);

          return (
            <motion.div 
              key={item.id}
              layout
              className={cn(
                "relative rounded-2xl border transition-colors duration-500 overflow-hidden",
                isExpanded ? "bg-zinc-950 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)]" : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
              )}
            >
              {/* Active Gradient Top Border */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" 
                  />
                )}
              </AnimatePresence>

              <button 
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full p-5 sm:p-6 text-left"
              >
                <span className={cn("text-base sm:text-lg font-medium transition-colors duration-300 pr-8", isExpanded ? "text-violet-100" : "text-zinc-300")}>
                  {item.question}
                </span>
                <div className={cn(
                  "shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500",
                  isExpanded ? "bg-violet-500/20 border-violet-500/30 text-violet-400 rotate-45" : "bg-zinc-900 border-zinc-700 text-zinc-500"
                )}>
                  <Plus size={16} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-zinc-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  }
);
HolographicFAQ.displayName = "HolographicFAQ";
