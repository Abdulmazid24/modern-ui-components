"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface PlasmaDividerProps {
  readonly orientation?: "horizontal" | "vertical";
  readonly variant?: "solid" | "gradient" | "glow" | "dashed";
  readonly label?: React.ReactNode;
  readonly className?: string;
}

/** PlasmaDivider — Content divider with gradient beam, neon glow pulse, dashed, or solid variants. Optional centered label. */
export const PlasmaDivider = React.forwardRef<HTMLDivElement, PlasmaDividerProps>(
  ({ className, orientation = "horizontal", variant = "gradient", label, ...props }, ref) => {
    const isH = orientation === "horizontal";
    const lineClass = cn(
      isH ? "w-full" : "h-full w-px",
      variant === "solid" && (isH ? "h-px bg-zinc-800" : "bg-zinc-800"),
      variant === "dashed" && (isH ? "h-px border-t border-dashed border-zinc-800" : "border-l border-dashed border-zinc-800"),
      variant === "gradient" && (isH ? "h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" : "bg-gradient-to-b from-transparent via-zinc-700 to-transparent"),
      variant === "glow" && (isH ? "h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" : "bg-gradient-to-b from-transparent via-violet-500/50 to-transparent"),
    );

    if (label && isH) {
      return (
        <div ref={ref} {...props} className={cn("flex items-center gap-4", className)}>
          <div className={cn("flex-1", lineClass)} />
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest shrink-0">{label}</span>
          <div className={cn("flex-1", lineClass)} />
        </div>
      );
    }

    return (
      <div ref={ref} {...props} className={cn(lineClass, variant === "glow" && "shadow-[0_0_8px_rgba(139,92,246,0.3)]", className)} />
    );
  }
);
PlasmaDivider.displayName = "PlasmaDivider";
