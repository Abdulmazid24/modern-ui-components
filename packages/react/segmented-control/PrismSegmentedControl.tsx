"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const SEGMENT_SPRING = { type: "spring", stiffness: 500, damping: 32 } as const;

export interface SegmentItem { readonly id: string; readonly label: string; readonly icon?: React.ReactNode; readonly disabled?: boolean; }
export interface PrismSegmentedControlProps { readonly items: readonly SegmentItem[]; readonly value?: string; readonly onChange?: (id: string) => void; readonly size?: "sm" | "md" | "lg"; readonly className?: string; }

/** PrismSegmentedControl — A segmented control with a prismatic glass indicator that refracts light as it slides between options. */
export const PrismSegmentedControl = React.forwardRef<HTMLDivElement, PrismSegmentedControlProps>(
  ({ className, items, value, onChange, size = "md", ...props }, ref) => {
    const [selected, setSelected] = useState(value ?? items[0]?.id ?? "");
    const handleSelect = (id: string) => { setSelected(id); onChange?.(id); };
    const sizeClasses = { sm: "text-[11px] px-3 py-1", md: "text-xs px-4 py-2", lg: "text-sm px-5 py-2.5" };

    return (
      <div ref={ref} {...props} className={cn("relative inline-flex items-center p-1 rounded-2xl bg-zinc-900 border border-zinc-800", className)}>
        {items.map((item) => {
          const isActive = item.id === selected;
          return (
            <button key={item.id} onClick={() => !item.disabled && handleSelect(item.id)} disabled={item.disabled}
              className={cn("relative z-10 flex items-center gap-1.5 rounded-xl font-semibold transition-colors cursor-pointer", sizeClasses[size], item.disabled && "opacity-30 cursor-not-allowed", isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300")}>
              {isActive && (
                <motion.div className="absolute inset-0 rounded-xl bg-zinc-800 border border-zinc-700/50" layoutId="prism-segment"
                  style={{ boxShadow: "0 0 20px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  transition={SEGMENT_SPRING} />
              )}
              {item.icon && <span className="relative z-10">{item.icon}</span>}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
PrismSegmentedControl.displayName = "PrismSegmentedControl";
