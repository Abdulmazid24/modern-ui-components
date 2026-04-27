"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface StellarSparklesProps { readonly count?: number; readonly color?: string; readonly children?: React.ReactNode; readonly className?: string; }

/** StellarSparkles — Floating sparkle particles that orbit around children with randomized size, position, and blink timing. */
export const StellarSparkles = React.forwardRef<HTMLDivElement, StellarSparklesProps>(
  ({ className, count = 20, color = "#8b5cf6", children, ...props }, ref) => {
    const particles = useMemo(() => Array.from({ length: count }).map((_, i) => ({
      id: i, x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, size: Math.random() * 3 + 1,
      delay: Math.random() * 3, duration: 1.5 + Math.random() * 2,
    })), [count]);

    return (
      <div ref={ref} {...props} className={cn("relative inline-block", className)}>
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: color, boxShadow: `0 0 ${p.size * 3}px ${color}` }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          />
        ))}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
StellarSparkles.displayName = "StellarSparkles";
