"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface InfiniteMovingCardsProps { readonly items: readonly React.ReactNode[]; readonly speed?: "slow" | "normal" | "fast"; readonly direction?: "left" | "right"; readonly pauseOnHover?: boolean; readonly className?: string; }

const SPEED_MAP = { slow: 60, normal: 35, fast: 20 } as const;

/** CosmicMovingCards — An infinite marquee of cards with cosmic trailing glow. Pauses on hover with a gravity-brake effect. */
export const CosmicMovingCards = React.forwardRef<HTMLDivElement, InfiniteMovingCardsProps>(
  ({ className, items, speed = "normal", direction = "left", pauseOnHover = true, ...props }, ref) => {
    const duration = SPEED_MAP[speed];
    const dir = direction === "left" ? "-50%" : "0%";
    const dirStart = direction === "left" ? "0%" : "-50%";

    return (
      <div ref={ref} {...props} className={cn("relative overflow-hidden group", className)}>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
        <motion.div className="flex gap-4 w-max" style={{ x: dirStart }}
          animate={{ x: [dirStart, dir] }}
          transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          {...(pauseOnHover ? { whileHover: { animationPlayState: "paused" } } : {})}>
          {[...items, ...items].map((item, i) => (
            <div key={i} className="shrink-0">{item}</div>
          ))}
        </motion.div>
      </div>
    );
  }
);
CosmicMovingCards.displayName = "CosmicMovingCards";
