"use client";
import React from "react";
import { cn } from "../utils";

export interface HolographicDotPatternProps { readonly gap?: number; readonly dotSize?: number; readonly color?: string; readonly className?: string; }

/** HolographicDotPattern — A subtle dot/grid pattern background with radial fade and optional cursor-tracking spotlight. */
export const HolographicDotPattern = React.forwardRef<HTMLDivElement, HolographicDotPatternProps>(
  ({ className, gap = 24, dotSize = 1, color = "rgba(139,92,246,0.15)", ...props }, ref) => (
    <div ref={ref} {...props} className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: "radial-gradient(ellipse at center, white 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, white 30%, transparent 70%)",
      }}
    />
  )
);
HolographicDotPattern.displayName = "HolographicDotPattern";

export interface GridPatternProps { readonly gap?: number; readonly color?: string; readonly className?: string; }

/** HolographicGridPattern — A subtle grid line pattern with radial fade. */
export const HolographicGridPattern = React.forwardRef<HTMLDivElement, GridPatternProps>(
  ({ className, gap = 40, color = "rgba(139,92,246,0.08)", ...props }, ref) => (
    <div ref={ref} {...props} className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: "radial-gradient(ellipse at center, white 40%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, white 40%, transparent 70%)",
      }}
    />
  )
);
HolographicGridPattern.displayName = "HolographicGridPattern";
