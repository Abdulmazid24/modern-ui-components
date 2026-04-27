"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

export interface DimensionalLoadingOverlayProps { readonly visible: boolean; readonly label?: string; readonly children: React.ReactNode; readonly className?: string; }

/** DimensionalLoadingOverlay — A full-area loading overlay with a dimensional rift spinner and glitch effect. */
export const DimensionalLoadingOverlay = React.forwardRef<HTMLDivElement, DimensionalLoadingOverlayProps>(
  ({ className, visible, label = "Loading...", children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("relative", className)}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md rounded-inherit"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-10 h-10 rounded-full border-2 border-transparent border-t-violet-500 border-r-cyan-500"
              animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ boxShadow: "0 0 20px rgba(139,92,246,0.3)" }} />
            <motion.span className="mt-4 text-xs font-mono text-zinc-400"
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>{label}</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
);
DimensionalLoadingOverlay.displayName = "DimensionalLoadingOverlay";
