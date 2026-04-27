"use client";
import React from "react";
import { cn } from "../utils";

export interface PlasmaShineBorderProps { readonly color?: string; readonly speed?: number; readonly children: React.ReactNode; readonly className?: string; }

/** PlasmaShineBorder — A border with a rotating shine beam that orbits the element's perimeter using conic gradient animation. */
export const PlasmaShineBorder = React.forwardRef<HTMLDivElement, PlasmaShineBorderProps>(
  ({ className, color = "#8b5cf6", speed = 3, children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("relative rounded-2xl p-px overflow-hidden", className)}>
      <div className="absolute inset-0 rounded-2xl" style={{
        background: `conic-gradient(from 0deg, transparent 70%, ${color} 85%, transparent 100%)`,
        animation: `shine-rotate ${speed}s linear infinite`,
      }} />
      <div className="relative z-10 bg-zinc-950 rounded-[calc(1rem-1px)] h-full">{children}</div>
      <style>{`@keyframes shine-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  )
);
PlasmaShineBorder.displayName = "PlasmaShineBorder";
