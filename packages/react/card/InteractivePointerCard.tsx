"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils";

interface InteractivePointerCardProps {
  children: React.ReactNode;
  pointerLabel?: string;
  className?: string;
  pointerColor?: string;
}

/**
 * A card with a floating "tag" or "pointer" that tracks the user's cursor.
 */
export const InteractivePointerCard = ({
  children,
  pointerLabel = "Explore",
  className,
  pointerColor = "#8b5cf6",
}: InteractivePointerCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative group overflow-hidden rounded-3xl cursor-none", className)}
    >
      <div className="h-full w-full">{children}</div>

      {/* Floating Pointer */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          backgroundColor: pointerColor,
        }}
        className="pointer-events-none absolute z-50 px-3 py-1 text-[10px] font-black uppercase text-white rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center gap-1 whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {pointerLabel}
      </motion.div>
      
      {/* Visual Indicator of Pointer Path */}
      <div className="absolute inset-0 z-0 bg-transparent group-hover:bg-zinc-950/20 transition-colors pointer-events-none" />
    </motion.div>
  );
};
