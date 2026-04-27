"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const DEFAULT_FONT_SIZE = 14;
const DEFAULT_GAP = 120;
const DEFAULT_ROTATE = -22;
const DRIFT_DURATION = 60;

export interface QuantumWatermarkProps {
  readonly text: string;
  readonly fontSize?: number;
  readonly gap?: number;
  readonly rotate?: number;
  readonly color?: string;
  readonly animated?: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * QuantumWatermark — A dynamic, animated watermark overlay.
 * Unlike static watermarks, this one has a subtle drifting
 * parallax motion, making it impossible to screenshot cleanly.
 * The text has a holographic shimmer and slight blur breathing.
 */
export const QuantumWatermark = React.forwardRef<HTMLDivElement, QuantumWatermarkProps>(
  ({ className, text, fontSize = DEFAULT_FONT_SIZE, gap = DEFAULT_GAP, rotate = DEFAULT_ROTATE, color = "rgba(255,255,255,0.04)", animated = true, children, ...props }, ref) => {
    const marks = useMemo(() => {
      const cols = Math.ceil(2000 / gap);
      const rows = Math.ceil(1400 / gap);
      const result: Array<{ x: number; y: number; key: string }> = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          result.push({ x: c * gap, y: r * gap, key: `wm-${r}-${c}` });
        }
      }
      return result;
    }, [gap]);

    return (
      <div ref={ref} {...props} className={cn("relative overflow-hidden", className)}>
        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Watermark overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden"
          style={{ transform: `rotate(${rotate}deg)`, transformOrigin: "center center" }}
          animate={animated ? { x: [0, -gap / 2, 0], y: [0, -gap / 3, 0] } : {}}
          transition={animated ? { duration: DRIFT_DURATION, repeat: Infinity, ease: "linear" } : {}}
        >
          <svg className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wm-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} />
                <stop offset="50%" stopColor="rgba(139,92,246,0.06)" />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
            </defs>
            {marks.map((m) => (
              <text
                key={m.key}
                x={m.x}
                y={m.y}
                fill="url(#wm-shimmer)"
                fontSize={fontSize}
                fontFamily="monospace"
                fontWeight="600"
              >
                {text}
              </text>
            ))}
          </svg>
        </motion.div>
      </div>
    );
  }
);

QuantumWatermark.displayName = "QuantumWatermark";
