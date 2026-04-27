"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "../utils";

const PULSE_SPRING = { stiffness: 120, damping: 12 } as const;
const GLOW_IDLE = "rgba(139, 92, 246, 0)" as const;
const GLOW_ACTIVE = "rgba(139, 92, 246, 0.6)" as const;
const BEAM_COLOR = "#8b5cf6" as const;
const PARTICLE_COUNT = 6;
const PARTICLE_TRAVEL_DURATION = 1.2;

export interface QuantumLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  readonly children: React.ReactNode;
  readonly required?: boolean;
  readonly enableBeam?: boolean;
}

/**
 * QuantumLabel — The world's first label that forms a living
 * energy connection to its input. On focus, a glowing particle
 * beam travels from the label text down to the associated input,
 * pulsing with each keystroke. The label text itself breathes
 * with a subtle aurora shimmer.
 */
export const QuantumLabel = React.forwardRef<HTMLLabelElement, QuantumLabelProps>(
  ({ className, children, required, enableBeam = true, htmlFor, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [beamPath, setBeamPath] = useState<string>("");
    const labelRef = useRef<HTMLLabelElement>(null);
    const glowOpacity = useMotionValue(0);
    const springGlow = useSpring(glowOpacity, PULSE_SPRING);

    const computeBeamPath = useCallback(() => {
      if (!htmlFor || !labelRef.current) return;
      const input = document.getElementById(htmlFor);
      if (!input) return;

      const labelRect = labelRef.current.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();

      const startX = labelRect.left + labelRect.width / 2;
      const startY = labelRect.bottom;
      const endX = inputRect.left + 20;
      const endY = inputRect.top;

      const parent = labelRef.current.parentElement;
      const parentRect = parent?.getBoundingClientRect() ?? { left: 0, top: 0 };

      const sx = startX - parentRect.left;
      const sy = startY - parentRect.top;
      const ex = endX - parentRect.left;
      const ey = endY - parentRect.top;
      const cy = sy + (ey - sy) * 0.5;

      setBeamPath(`M ${sx} ${sy} C ${sx} ${cy}, ${ex} ${cy}, ${ex} ${ey}`);
    }, [htmlFor]);

    useEffect(() => {
      if (!htmlFor) return;
      const input = document.getElementById(htmlFor);
      if (!input) return;

      const handleFocus = () => { setIsFocused(true); glowOpacity.set(1); computeBeamPath(); };
      const handleBlur = () => { setIsFocused(false); glowOpacity.set(0); };
      const handleKeyDown = () => { glowOpacity.set(1.3); setTimeout(() => glowOpacity.set(1), 100); };

      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
      input.addEventListener("keydown", handleKeyDown);

      return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
        input.removeEventListener("keydown", handleKeyDown);
      };
    }, [htmlFor, glowOpacity, computeBeamPath]);

    return (
      <div className="relative">
        <motion.label
          ref={(node) => {
            (labelRef as React.MutableRefObject<HTMLLabelElement | null>).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLLabelElement | null>).current = node;
          }}
          htmlFor={htmlFor}
          {...props}
          className={cn(
            "relative inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide cursor-pointer select-none transition-colors duration-300",
            isFocused ? "text-violet-300" : "text-zinc-400",
            className
          )}
          animate={{
            textShadow: isFocused
              ? `0 0 12px ${GLOW_ACTIVE}, 0 0 30px rgba(139, 92, 246, 0.2)`
              : `0 0 0px ${GLOW_IDLE}`,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Aurora shimmer underlay */}
          {isFocused && (
            <motion.span
              className="absolute -inset-x-2 -inset-y-1 rounded-md bg-gradient-to-r from-violet-500/10 via-cyan-500/5 to-violet-500/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <span className="relative z-10">{children}</span>

          {required && (
            <motion.span
              className="relative z-10 text-red-400"
              animate={isFocused ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              *
            </motion.span>
          )}
        </motion.label>

        {/* Particle Beam SVG — connects label to input */}
        {enableBeam && isFocused && beamPath && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <defs>
              <filter id="quantum-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static beam path */}
            <motion.path
              d={beamPath}
              fill="none"
              stroke={BEAM_COLOR}
              strokeWidth="1"
              strokeOpacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Traveling particles */}
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <motion.circle
                key={`particle-${i}`}
                r="2.5"
                fill={BEAM_COLOR}
                filter="url(#quantum-glow)"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                style={{ offsetPath: `path('${beamPath}')` } as React.CSSProperties}
                transition={{
                  duration: PARTICLE_TRAVEL_DURATION,
                  delay: i * (PARTICLE_TRAVEL_DURATION / PARTICLE_COUNT),
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </svg>
        )}
      </div>
    );
  }
);

QuantumLabel.displayName = "QuantumLabel";
