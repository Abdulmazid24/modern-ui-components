"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

const ITEM_SPRING = { type: "spring", stiffness: 350, damping: 25 } as const;
const DEFAULT_INTERVAL_MS = 3000;
const MAX_VISIBLE_ITEMS = 5;

export interface PulseStreamListProps {
  items: readonly React.ReactNode[];
  interval?: number;
  maxVisible?: number;
  className?: string;
}

/**
 * PulseStreamList — Auto-animated notification/activity list where
 * new items slide in from top with a glow pulse, pushing older
 * items down. Inspired by Magic UI's Animated List.
 */
export const PulseStreamList = React.forwardRef<
  HTMLDivElement,
  PulseStreamListProps
>(({ className, items, interval = DEFAULT_INTERVAL_MS, maxVisible = MAX_VISIBLE_ITEMS, ...props }, ref) => {
  const [visibleItems, setVisibleItems] = useState<React.ReactNode[]>([]);
  const indexRef = useRef(0);

  const addNextItem = useCallback(() => {
    if (items.length === 0) return;
    const nextItem = items[indexRef.current % items.length];
    setVisibleItems((prev) => [nextItem, ...prev].slice(0, maxVisible));
    indexRef.current += 1;
  }, [items, maxVisible]);

  useEffect(() => {
    addNextItem();
    const timer = setInterval(addNextItem, interval);
    return () => clearInterval(timer);
  }, [addNextItem, interval]);

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "relative flex flex-col gap-3 overflow-hidden",
        className
      )}
    >
      {/* Fade-out gradient at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none" />

      <AnimatePresence initial={false}>
        {visibleItems.map((item, index) => (
          <motion.div
            key={`stream-${indexRef.current - index}`}
            layout
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={ITEM_SPRING}
            className="relative"
          >
            {/* Entry glow pulse */}
            {index === 0 && (
              <motion.div
                className="absolute -inset-1 rounded-xl bg-violet-500/10 blur-sm"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />
            )}
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

PulseStreamList.displayName = "PulseStreamList";
