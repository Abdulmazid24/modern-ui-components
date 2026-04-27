"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

const HOVER_SPRING = { type: "spring", stiffness: 300, damping: 25 } as const;

type Direction = "top" | "bottom" | "left" | "right";

export interface DirectionAwareHoverProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  className?: string;
}

/**
 * DirectionAwareHover — The overlay enters and exits from the
 * exact direction the cursor enters/leaves. Uses atan2 math
 * to calculate the edge of entry. Inspired by Aceternity UI's
 * Direction Aware Hover.
 */
export const DirectionAwareHover = React.forwardRef<
  HTMLDivElement,
  DirectionAwareHoverProps
>(({ className, children, overlay, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("top");
  const containerRef = useRef<HTMLDivElement>(null);

  const getDirection = useCallback((e: React.MouseEvent): Direction => {
    const el = containerRef.current;
    if (!el) return "top";

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);

    if (angle >= -45 && angle < 45) return "right";
    if (angle >= 45 && angle < 135) return "bottom";
    if (angle >= -135 && angle < -45) return "top";
    return "left";
  }, []);

  const directionToTransform: Record<Direction, { x: string; y: string }> = {
    top: { x: "0%", y: "-100%" },
    bottom: { x: "0%", y: "100%" },
    left: { x: "-100%", y: "0%" },
    right: { x: "100%", y: "0%" },
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setDirection(getDirection(e));
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setDirection(getDirection(e));
    setIsHovered(false);
  };

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      {...props}
      className={cn(
        "relative overflow-hidden rounded-2xl group cursor-pointer",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Content */}
      <div className="relative z-0">{children}</div>

      {/* Direction-Aware Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-10 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={directionToTransform[direction]}
            animate={{ x: "0%", y: "0%" }}
            exit={directionToTransform[direction]}
            transition={HOVER_SPRING}
          >
            {overlay}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DirectionAwareHover.displayName = "DirectionAwareHover";
