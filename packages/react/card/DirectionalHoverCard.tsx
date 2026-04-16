"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

interface DirectionalHoverCardProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  className?: string;
}

/**
 * A card where the overlay entrance corresponds to the mouse entry side.
 */
export const DirectionalHoverCard = ({
  children,
  overlay,
  className,
}: DirectionalHoverCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right" | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    const x = clientX - left;
    const y = clientY - top;

    const topDist = y;
    const bottomDist = height - y;
    const leftDist = x;
    const rightDist = width - x;

    const minDist = Math.min(topDist, bottomDist, leftDist, rightDist);

    if (minDist === topDist) setDirection("top");
    else if (minDist === bottomDist) setDirection("bottom");
    else if (minDist === leftDist) setDirection("left");
    else if (minDist === rightDist) setDirection("right");
  };

  const variants = {
    hidden: (dir: string) => ({
      x: dir === "left" ? "-100%" : dir === "right" ? "100%" : 0,
      y: dir === "top" ? "-100%" : dir === "bottom" ? "100%" : 0,
    }),
    visible: { x: 0, y: 0 },
    exit: (dir: string) => ({
      x: dir === "left" ? "-100%" : dir === "right" ? "100%" : 0,
      y: dir === "top" ? "-100%" : dir === "bottom" ? "100%" : 0,
    }),
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setDirection(null)}
      className={cn("relative group overflow-hidden rounded-3xl bg-zinc-900", className)}
    >
      <div className="h-full w-full">{children}</div>

      <AnimatePresence>
        {direction && (
          <motion.div
            custom={direction}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
          >
            {overlay}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
