"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

const MORPH_SPRING = { type: "spring", stiffness: 100, damping: 15 } as const;
const DEFAULT_INTERVAL_MS = 3000;
const CHAR_STAGGER_SECONDS = 0.03;

export interface QuantumMorphTextProps {
  texts: readonly string[];
  interval?: number;
  className?: string;
}

/**
 * QuantumMorphText — Text that morphs between multiple strings with
 * per-character stagger and blur transitions. Each character dissolves
 * and re-forms individually, creating a "quantum teleportation" effect.
 * Inspired by Magic UI's Morphing Text.
 */
export const QuantumMorphText = React.forwardRef<
  HTMLDivElement,
  QuantumMorphTextProps
>(({ className, texts, interval = DEFAULT_INTERVAL_MS, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);
  }, [texts.length, interval]);

  useEffect(() => {
    startCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startCycle]);

  const currentText = texts[currentIndex];

  return (
    <div
      ref={ref}
      {...props}
      className={cn("relative inline-flex overflow-hidden", className)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          className="flex"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            visible: { transition: { staggerChildren: CHAR_STAGGER_SECONDS } },
            exit: { transition: { staggerChildren: CHAR_STAGGER_SECONDS, staggerDirection: -1 } },
          }}
        >
          {currentText.split("").map((char, i) => (
            <motion.span
              key={`${currentText}-${i}`}
              className="inline-block whitespace-pre"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                  filter: "blur(12px)",
                  scale: 0.8,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                },
                exit: {
                  opacity: 0,
                  y: -20,
                  filter: "blur(12px)",
                  scale: 0.8,
                },
              }}
              transition={MORPH_SPRING}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

QuantumMorphText.displayName = "QuantumMorphText";
