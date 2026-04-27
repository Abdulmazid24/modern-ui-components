"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../utils";

const PROGRESS_SPRING = { stiffness: 200, damping: 30, restDelta: 0.001 } as const;
const GLOW_COLOR_START = "#8b5cf6";
const GLOW_COLOR_END = "#06b6d4";

export interface LaserScrollProgressProps {
  position?: "top" | "bottom";
  height?: number;
  className?: string;
}

/**
 * LaserScrollProgress — A razor-thin, glowing scroll progress indicator
 * that sits at the top or bottom of the viewport. Uses spring physics
 * for buttery-smooth tracking. Inspired by Magic UI's Scroll Progress,
 * enhanced with our vault's neon laser aesthetic.
 */
export const LaserScrollProgress = React.forwardRef<
  HTMLDivElement,
  LaserScrollProgressProps
>(({ className, position = "top", height = 3, ...props }, ref) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, PROGRESS_SPRING);

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "fixed left-0 right-0 z-[100] pointer-events-none",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
    >
      <motion.div
        className="origin-left"
        style={{
          scaleX,
          height,
          background: `linear-gradient(90deg, ${GLOW_COLOR_START}, ${GLOW_COLOR_END})`,
          boxShadow: `0 0 15px ${GLOW_COLOR_START}, 0 0 30px ${GLOW_COLOR_END}`,
        }}
      />
    </div>
  );
});

LaserScrollProgress.displayName = "LaserScrollProgress";
