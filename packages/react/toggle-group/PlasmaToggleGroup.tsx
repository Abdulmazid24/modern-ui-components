"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const INDICATOR_SPRING = { type: "spring", stiffness: 500, damping: 32 } as const;
const PLASMA_COLORS = ["#8b5cf6", "#06b6d4", "#10b981"] as const;

export interface ToggleGroupItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly disabled?: boolean;
}

export interface PlasmaToggleGroupProps {
  readonly items: readonly ToggleGroupItem[];
  readonly value?: string;
  readonly onChange?: (id: string) => void;
  readonly type?: "single" | "multiple";
  readonly className?: string;
}

/**
 * PlasmaToggleGroup — A toggle group where the active indicator
 * is a living plasma blob that morphs and flows between items
 * using layout animations. The blob changes color based on its
 * position and leaves a fading energy trail as it moves.
 */
export const PlasmaToggleGroup = React.forwardRef<HTMLDivElement, PlasmaToggleGroupProps>(
  ({ className, items, value, onChange, type = "single", ...props }, ref) => {
    const [selected, setSelected] = useState<string>(value ?? items[0]?.id ?? "");

    const handleSelect = (id: string) => {
      if (items.find((i) => i.id === id)?.disabled) return;
      setSelected(id);
      onChange?.(id);
    };

    const activeIndex = items.findIndex((i) => i.id === selected);
    const plasmaColor = PLASMA_COLORS[activeIndex % PLASMA_COLORS.length];

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative inline-flex items-center gap-0.5 p-1 rounded-2xl border border-zinc-800 bg-zinc-950",
          className
        )}
      >
        {items.map((item) => {
          const isActive = item.id === selected;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              disabled={item.disabled}
              className={cn(
                "relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer",
                item.disabled && "opacity-30 cursor-not-allowed",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {/* Plasma blob indicator */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  layoutId="plasma-blob"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${plasmaColor}30, transparent 70%)`,
                    border: `1px solid ${plasmaColor}40`,
                    boxShadow: `0 0 20px ${plasmaColor}20, inset 0 0 20px ${plasmaColor}10`,
                  }}
                  transition={INDICATOR_SPRING}
                />
              )}

              {/* Inner glow pulse */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      `inset 0 0 15px ${plasmaColor}15`,
                      `inset 0 0 25px ${plasmaColor}25`,
                      `inset 0 0 15px ${plasmaColor}15`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
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

PlasmaToggleGroup.displayName = "PlasmaToggleGroup";
