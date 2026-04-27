"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface CosmicAuroraProps { readonly className?: string; readonly children?: React.ReactNode; }

/** CosmicAurora — Northern lights background with layered animated gradients that flow and shift organically. */
export const CosmicAurora = React.forwardRef<HTMLDivElement, CosmicAuroraProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("relative overflow-hidden bg-zinc-950", className)}>
      <div className="absolute inset-0">
        {[
          { colors: "from-violet-600/20 via-transparent to-transparent", dur: 8, delay: 0 },
          { colors: "from-cyan-500/15 via-transparent to-transparent", dur: 12, delay: 2 },
          { colors: "from-emerald-500/10 via-transparent to-transparent", dur: 10, delay: 4 },
        ].map((layer, i) => (
          <motion.div key={i}
            className={`absolute inset-0 bg-gradient-to-br ${layer.colors}`}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: layer.dur, delay: layer.delay, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(80px)" }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
);
CosmicAurora.displayName = "CosmicAurora";
