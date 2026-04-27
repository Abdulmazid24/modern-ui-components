"use client";
import React from "react";
import { cn } from "../utils";

export interface QuantumSpinnerProps {
  readonly size?: "sm" | "md" | "lg" | "xl";
  readonly color?: "violet" | "emerald" | "cyan" | "amber" | "rose" | "zinc";
  readonly variant?: "solid" | "glow" | "dashed";
  readonly className?: string;
}

const SIZE_MAP = { sm: "w-4 h-4 border-2", md: "w-6 h-6 border-2", lg: "w-8 h-8 border-2", xl: "w-12 h-12 border-3" } as const;
const COLOR_MAP = {
  violet: "border-violet-500/20 border-t-violet-500",
  emerald: "border-emerald-500/20 border-t-emerald-500",
  cyan: "border-cyan-500/20 border-t-cyan-500",
  amber: "border-amber-500/20 border-t-amber-500",
  rose: "border-rose-500/20 border-t-rose-500",
  zinc: "border-zinc-500/20 border-t-zinc-500",
};
const GLOW_MAP = {
  violet: "drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]",
  emerald: "drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  cyan: "drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]",
  amber: "drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
  rose: "drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]",
  zinc: "drop-shadow-[0_0_8px_rgba(161,161,170,0.6)]",
};

/** QuantumSpinner — Lightweight inline loading indicator with neon glow and dashed variations. */
export const QuantumSpinner = React.forwardRef<HTMLDivElement, QuantumSpinnerProps>(
  ({ className, size = "md", color = "violet", variant = "solid", ...props }, ref) => {
    return (
      <div ref={ref} {...props} 
        className={cn(
          "inline-block rounded-full animate-spin",
          SIZE_MAP[size],
          COLOR_MAP[color],
          variant === "glow" && GLOW_MAP[color],
          variant === "dashed" && "border-dashed",
          className
        )}
      />
    );
  }
);
QuantumSpinner.displayName = "QuantumSpinner";
