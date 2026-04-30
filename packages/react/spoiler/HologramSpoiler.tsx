"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils";

const SPOILER_SPRING = { type: "spring", stiffness: 300, damping: 25 } as const;
const DEFAULT_MAX_HEIGHT = 80;

export interface HologramSpoilerProps { readonly maxHeight?: number; readonly showLabel?: string; readonly hideLabel?: string; readonly children: React.ReactNode; readonly className?: string; }

/** HologramSpoiler — A "Show more / Show less" component with holographic reveal. The hidden content fades in through a glowing dissolution effect. */
export const HologramSpoiler = React.forwardRef<HTMLDivElement, HologramSpoilerProps>(
  ({ className, maxHeight = DEFAULT_MAX_HEIGHT, showLabel = "Show more", hideLabel = "Show less", children, ...props }, ref) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div ref={ref} {...props} className={cn("relative", className)}>
        <motion.div className="overflow-hidden" initial={{ maxHeight }} animate={{ maxHeight: expanded ? 2000 : maxHeight }} transition={SPOILER_SPRING}>
          {children}
        </motion.div>

        {/* Gradient fade overlay when collapsed */}
        <AnimatePresence>
          {!expanded && (
            <motion.div className="absolute bottom-8 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          )}
        </AnimatePresence>

        <button onClick={() => setExpanded(!expanded)}
          className="relative z-10 flex items-center gap-1.5 mx-auto mt-2 px-4 py-1.5 rounded-xl text-xs font-semibold text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/30 transition-all cursor-pointer">
          {expanded ? hideLabel : showLabel}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={14} /></motion.span>
        </button>
      </div>
    );
  }
);
HologramSpoiler.displayName = "HologramSpoiler";
