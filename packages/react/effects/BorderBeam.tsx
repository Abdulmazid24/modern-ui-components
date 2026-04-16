"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  className?: string;
}

/**
 * A focused beam of light that travels along the border of a container.
 * Perfect for highlighting "Pro" cards or active states.
 */
export const BorderBeam = ({
  size = 150,
  duration = 8,
  anchor = 90,
  colorFrom = "#8b5cf6",
  colorTo = "#06b6d4",
  delay = 0,
  className,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className
      )}
    >
      <motion.div
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        style={{
          offsetPath: `rect(0 auto auto 0 round ${anchor}px)`,
        }}
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-transparent"
      />
    </div>
  );
};
