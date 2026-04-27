"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "../utils";

const TEAR_SPRING = { type: "spring", stiffness: 200, damping: 18 } as const;
const SPARK_COUNT = 30;
const TEAR_DURATION_MS = 600;

export interface RealityTearAlertDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly title?: string;
  readonly description?: string;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly variant?: "danger" | "warning";
  readonly className?: string;
}

/**
 * RealityTearAlertDialog — A confirmation dialog that rips open
 * the fabric of the UI. A glowing tear line splits the screen,
 * sparks fly outward, and the dialog materializes from the void.
 * Destructive actions deserve dramatic confirmation.
 */
export const RealityTearAlertDialog = React.forwardRef<HTMLDivElement, RealityTearAlertDialogProps>(
  ({ className, isOpen, onClose, onConfirm, title = "Confirm Action", description = "This action cannot be undone.", confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "danger", ...props }, ref) => {
    const [stage, setStage] = useState<"closed" | "tearing" | "open">("closed");

    const accentColor = variant === "danger" ? "#ef4444" : "#f59e0b";
    const accentGlow = variant === "danger" ? "rgba(239, 68, 68, 0.5)" : "rgba(245, 158, 11, 0.5)";

    useEffect(() => {
      if (isOpen) {
        setStage("tearing");
        const timer = setTimeout(() => setStage("open"), TEAR_DURATION_MS);
        return () => clearTimeout(timer);
      }
      setStage("closed");
    }, [isOpen]);

    const sparks = Array.from({ length: SPARK_COUNT }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 400,
      delay: Math.random() * 0.5,
      size: Math.random() * 3 + 1,
    }));

    return (
      <AnimatePresence>
        {stage !== "closed" && (
          <div ref={ref} {...props} className={cn("fixed inset-0 z-50 flex items-center justify-center", className)}>
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Tear Effect */}
            {stage === "tearing" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="h-[2px] rounded-full"
                  style={{ backgroundColor: accentColor, boxShadow: `0 0 40px 8px ${accentGlow}` }}
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: TEAR_DURATION_MS / 1000, ease: "easeIn" }}
                />
                {sparks.map((s) => (
                  <motion.div
                    key={s.id}
                    className="absolute rounded-full"
                    style={{ width: s.size, height: s.size, backgroundColor: accentColor, boxShadow: `0 0 6px ${accentGlow}` }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: s.x, y: s.y, opacity: 0 }}
                    transition={{ duration: 0.8, delay: s.delay, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}

            {/* Dialog */}
            {stage === "open" && (
              <motion.div
                className="relative z-10 w-full max-w-md bg-zinc-950 border rounded-2xl overflow-hidden"
                style={{ borderColor: `${accentColor}40` }}
                initial={{ scaleY: 0.1, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={TEAR_SPRING}
              >
                {/* Top accent beam */}
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
                    >
                      <AlertTriangle size={20} style={{ color: accentColor }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
                    </div>
                    <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-zinc-800/50 bg-black/30">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
                  >
                    {cancelLabel}
                  </button>
                  <motion.button
                    onClick={() => { onConfirm(); onClose(); }}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer"
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentGlow}` }}
                    whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${accentGlow}` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {confirmLabel}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    );
  }
);

RealityTearAlertDialog.displayName = "RealityTearAlertDialog";
