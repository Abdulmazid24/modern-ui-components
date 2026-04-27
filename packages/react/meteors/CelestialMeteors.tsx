"use client";
import React, { useMemo } from "react";
import { cn } from "../utils";

export interface CelestialMeteorsProps { readonly count?: number; readonly className?: string; }

/** CelestialMeteors — Shooting star / meteor shower with CSS-only animation for zero-JS overhead. */
export const CelestialMeteors = React.forwardRef<HTMLDivElement, CelestialMeteorsProps>(
  ({ className, count = 12, ...props }, ref) => {
    const meteors = useMemo(() => Array.from({ length: count }).map((_, i) => ({
      id: i, left: `${Math.random() * 100}%`, delay: `${Math.random() * 5}s`, duration: `${1.5 + Math.random() * 3}s`, size: Math.random() * 1.5 + 0.5,
    })), [count]);

    return (
      <div ref={ref} {...props} className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {meteors.map((m) => (
          <div key={m.id} className="absolute" style={{ left: m.left, top: "-5%", animation: `meteor-fall ${m.duration} ${m.delay} linear infinite` }}>
            <div className="w-px rounded-full" style={{ height: `${40 + Math.random() * 60}px`, background: "linear-gradient(to bottom, #8b5cf6, transparent)", boxShadow: "0 0 4px #8b5cf6", width: `${m.size}px` }} />
          </div>
        ))}
        <style>{`@keyframes meteor-fall { 0% { transform: translateY(0) translateX(0) rotate(215deg); opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(120vh) translateX(-30vw) rotate(215deg); opacity: 0; } }`}</style>
      </div>
    );
  }
);
CelestialMeteors.displayName = "CelestialMeteors";
