"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

const PIN_SPRING = { type: "spring", stiffness: 260, damping: 20 } as const;

export interface HolographicPinProps { readonly children: React.ReactNode; readonly content: React.ReactNode; readonly className?: string; }

/** HolographicPin — A 3D map pin that rises on hover, revealing a holographic content card with depth perspective and glow shadow. */
export const HolographicPin = React.forwardRef<HTMLDivElement, HolographicPinProps>(
  ({ className, children, content, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div ref={ref} {...props} className={cn("relative inline-flex flex-col items-center cursor-pointer", className)}
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: "1000px" }}>
        <AnimatePresence>
          {isHovered && (
            <motion.div className="absolute bottom-full mb-3 w-64 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-4 z-20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: 20, rotateX: -15, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} exit={{ opacity: 0, y: 10, rotateX: -10, scale: 0.95 }}
              transition={PIN_SPRING} style={{ transformOrigin: "bottom center" }}>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              {content}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-950 border-b border-r border-zinc-800 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.1 : 1 }} transition={PIN_SPRING}>
          {children}
        </motion.div>
        {/* Pin shadow */}
        <motion.div className="w-4 h-1 rounded-full bg-violet-500/30 blur-sm mt-1" animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.6 : 0.3 }} />
      </div>
    );
  }
);
HolographicPin.displayName = "HolographicPin";
