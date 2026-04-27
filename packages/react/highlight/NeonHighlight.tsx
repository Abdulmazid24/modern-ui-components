"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface NeonHighlightProps {
  readonly children: React.ReactNode;
  readonly color?: "violet" | "emerald" | "cyan" | "amber" | "rose";
  readonly delay?: number;
  readonly className?: string;
}

const COLOR_MAP = {
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

/** NeonHighlight — Animated inline text marker with neon glow and border. */
export const NeonHighlight = React.forwardRef<HTMLSpanElement, NeonHighlightProps>(
  ({ className, children, color = "violet", delay = 0, ...props }, ref) => {
    return (
      <span ref={ref} {...props} className={cn("relative inline-block whitespace-nowrap mx-1", className)}>
        <motion.span 
          initial={{ scaleX: 0 }} 
          whileInView={{ scaleX: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn("absolute inset-0 border-b-2 origin-left rounded-sm -z-10", COLOR_MAP[color])} 
        />
        <span className="relative z-10 font-semibold px-1">{children}</span>
      </span>
    );
  }
);
NeonHighlight.displayName = "NeonHighlight";
