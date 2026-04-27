"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Sparkles } from "lucide-react";
import { cn } from "../utils";

const SPOTLIGHT_SPRING = { type: "spring", stiffness: 260, damping: 22 } as const;
const SPOTLIGHT_PADDING = 12;

export interface TourStep {
  readonly target: string;
  readonly title: string;
  readonly description: string;
  readonly placement?: "top" | "bottom" | "left" | "right";
}

export interface HolographicGuidedTourProps {
  readonly steps: readonly TourStep[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onComplete?: () => void;
  readonly className?: string;
}

/**
 * HolographicGuidedTour — A product tour where a holographic
 * spotlight beam isolates the target element, dimming everything
 * else. The tooltip card floats with a plasma-glow border and
 * a progress beam tracks steps along the bottom.
 */
export const HolographicGuidedTour = React.forwardRef<HTMLDivElement, HolographicGuidedTourProps>(
  ({ className, steps, isOpen, onClose, onComplete, ...props }, ref) => {
    const [current, setCurrent] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const observerRef = useRef<ResizeObserver | null>(null);

    const step = steps[current];
    const progress = ((current + 1) / steps.length) * 100;

    const updateTarget = useCallback(() => {
      if (!step) return;
      const el = document.querySelector(step.target);
      if (el) setTargetRect(el.getBoundingClientRect());
    }, [step]);

    useEffect(() => {
      if (!isOpen || !step) return;
      updateTarget();
      const el = document.querySelector(step.target);
      if (el) {
        observerRef.current = new ResizeObserver(updateTarget);
        observerRef.current.observe(el);
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      window.addEventListener("resize", updateTarget);
      return () => {
        observerRef.current?.disconnect();
        window.removeEventListener("resize", updateTarget);
      };
    }, [isOpen, step, updateTarget]);

    const handleNext = () => {
      if (current < steps.length - 1) setCurrent((p) => p + 1);
      else { onComplete?.(); onClose(); setCurrent(0); }
    };

    const handlePrev = () => { if (current > 0) setCurrent((p) => p - 1); };

    if (!isOpen || !step || !targetRect) return null;

    const placement = step.placement ?? "bottom";
    const tooltipStyle: React.CSSProperties = {
      position: "fixed",
      zIndex: 10001,
      ...(placement === "bottom" && { top: targetRect.bottom + SPOTLIGHT_PADDING + 8, left: targetRect.left + targetRect.width / 2, transform: "translateX(-50%)" }),
      ...(placement === "top" && { bottom: window.innerHeight - targetRect.top + SPOTLIGHT_PADDING + 8, left: targetRect.left + targetRect.width / 2, transform: "translateX(-50%)" }),
      ...(placement === "left" && { top: targetRect.top + targetRect.height / 2, right: window.innerWidth - targetRect.left + SPOTLIGHT_PADDING + 8, transform: "translateY(-50%)" }),
      ...(placement === "right" && { top: targetRect.top + targetRect.height / 2, left: targetRect.right + SPOTLIGHT_PADDING + 8, transform: "translateY(-50%)" }),
    };

    return (
      <AnimatePresence>
        <div ref={ref} {...props} className={cn("fixed inset-0 z-[10000]", className)}>
          {/* Overlay with spotlight cutout */}
          <svg className="absolute inset-0 w-full h-full" onClick={onClose}>
            <defs>
              <mask id="tour-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect
                  x={targetRect.left - SPOTLIGHT_PADDING}
                  y={targetRect.top - SPOTLIGHT_PADDING}
                  width={targetRect.width + SPOTLIGHT_PADDING * 2}
                  height={targetRect.height + SPOTLIGHT_PADDING * 2}
                  rx="16"
                  fill="black"
                />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tour-mask)" />
          </svg>

          {/* Spotlight glow ring */}
          <motion.div
            className="fixed pointer-events-none rounded-2xl"
            style={{
              left: targetRect.left - SPOTLIGHT_PADDING,
              top: targetRect.top - SPOTLIGHT_PADDING,
              width: targetRect.width + SPOTLIGHT_PADDING * 2,
              height: targetRect.height + SPOTLIGHT_PADDING * 2,
              boxShadow: "0 0 30px rgba(139,92,246,0.3), inset 0 0 30px rgba(139,92,246,0.05)",
              border: "1px solid rgba(139,92,246,0.3)",
            }}
            animate={{ boxShadow: ["0 0 30px rgba(139,92,246,0.3)", "0 0 50px rgba(139,92,246,0.5)", "0 0 30px rgba(139,92,246,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            layout
          />

          {/* Tooltip */}
          <motion.div
            style={tooltipStyle}
            className="w-80 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl overflow-hidden pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={SPOTLIGHT_SPRING}
          >
            {/* Progress beam */}
            <div className="h-[2px] bg-zinc-900">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-violet-400" />
                  <span className="text-[10px] text-zinc-500 font-mono">{current + 1}/{steps.length}</span>
                </div>
                <button onClick={() => { onClose(); setCurrent(0); }} className="text-zinc-600 hover:text-white transition-colors cursor-pointer"><X size={14} /></button>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-5">{step.description}</p>
              <div className="flex items-center justify-between">
                <button onClick={handlePrev} disabled={current === 0} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"><ChevronLeft size={14} /> Back</button>
                <motion.button onClick={handleNext} className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors cursor-pointer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {current === steps.length - 1 ? "Finish" : "Next"} <ChevronRight size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }
);

HolographicGuidedTour.displayName = "HolographicGuidedTour";
