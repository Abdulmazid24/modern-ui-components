"use client";
import React from "react";
import { cn } from "../utils";

export interface AtmosphericBlurProps { readonly direction?: "top" | "bottom" | "left" | "right"; readonly intensity?: number; readonly height?: number; readonly className?: string; }

/** AtmosphericBlur — A progressive blur overlay that gradually blurs content from one edge, creating depth of field. */
export const AtmosphericBlur = React.forwardRef<HTMLDivElement, AtmosphericBlurProps>(
  ({ className, direction = "bottom", intensity = 12, height = 200, ...props }, ref) => {
    const dirMap = { top: "to top", bottom: "to bottom", left: "to left", right: "to right" };
    const posMap = { top: "top-0 left-0 right-0", bottom: "bottom-0 left-0 right-0", left: "left-0 top-0 bottom-0", right: "right-0 top-0 bottom-0" };
    const sizeMap = { top: { height }, bottom: { height }, left: { width: height }, right: { width: height } };

    return (
      <div ref={ref} {...props} className={cn("absolute pointer-events-none z-20", posMap[direction], className)} style={sizeMap[direction]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute inset-0" style={{
            backdropFilter: `blur(${(i / 5) * intensity}px)`,
            maskImage: `linear-gradient(${dirMap[direction]}, rgba(0,0,0,${i / 5}) ${(i / 6) * 100}%, rgba(0,0,0,${(i + 1) / 5}) ${((i + 1) / 6) * 100}%, transparent ${((i + 1) / 6) * 100 + 1}%)`,
            WebkitMaskImage: `linear-gradient(${dirMap[direction]}, rgba(0,0,0,${i / 5}) ${(i / 6) * 100}%, rgba(0,0,0,${(i + 1) / 5}) ${((i + 1) / 6) * 100}%, transparent ${((i + 1) / 6) * 100 + 1}%)`,
          }} />
        ))}
      </div>
    );
  }
);
AtmosphericBlur.displayName = "AtmosphericBlur";
