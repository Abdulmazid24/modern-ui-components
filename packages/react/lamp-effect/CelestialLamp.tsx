"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface CelestialLampProps { readonly children: React.ReactNode; readonly color?: string; readonly className?: string; }

/** CelestialLamp — A dramatic desk-lamp lighting effect for hero sections. A cone of light expands from a narrow source, creating an ethereal, divine spotlight with volumetric glow. */
export const CelestialLamp = React.forwardRef<HTMLDivElement, CelestialLampProps>(
  ({ className, children, color = "#8b5cf6", ...props }, ref) => (
    <div ref={ref} {...props} className={cn("relative flex flex-col items-center overflow-hidden", className)}>
      {/* Light source */}
      <div className="relative w-full flex justify-center">
        <motion.div className="absolute top-0"
          initial={{ width: "10rem", opacity: 0.5 }}
          whileInView={{ width: "30rem", opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            height: "40rem",
            background: `conic-gradient(from 90deg at 50% 0%, transparent 30%, ${color}15 40%, ${color}30 50%, ${color}15 60%, transparent 70%)`,
            maskImage: "linear-gradient(to bottom, white 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, white 30%, transparent 100%)",
          }}
        />
        {/* Source dot */}
        <div className="relative z-10 w-32 h-1 rounded-full" style={{ background: color, boxShadow: `0 0 40px ${color}, 0 0 80px ${color}60` }} />
      </div>
      {/* Content */}
      <div className="relative z-10 mt-[-4rem]">{children}</div>
    </div>
  )
);
CelestialLamp.displayName = "CelestialLamp";
