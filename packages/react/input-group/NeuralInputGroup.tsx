"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const FOCUS_SPRING = { type: "spring", stiffness: 300, damping: 25 } as const;
const GLOW_COLOR = "rgba(139, 92, 246, 0.3)";

export interface NeuralInputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly prefix?: React.ReactNode;
  readonly suffix?: React.ReactNode;
  readonly inputClassName?: string;
}

/**
 * NeuralInputGroup — An input with magnetically-attached prefix
 * and suffix addons. On focus, a neural energy beam travels from
 * the prefix through the input to the suffix, connecting all
 * elements as one living organism. The addons pulse with the
 * typing rhythm.
 */
export const NeuralInputGroup = React.forwardRef<HTMLInputElement, NeuralInputGroupProps>(
  ({ className, inputClassName, prefix, suffix, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <motion.div
        className={cn(
          "relative flex items-stretch rounded-2xl border overflow-hidden transition-colors",
          isFocused
            ? "border-violet-500/40 bg-zinc-950"
            : "border-zinc-800 bg-zinc-950 hover:border-zinc-700",
          className
        )}
        animate={{
          boxShadow: isFocused ? `0 0 25px ${GLOW_COLOR}, inset 0 0 25px rgba(139,92,246,0.05)` : "0 0 0 transparent",
        }}
        transition={FOCUS_SPRING}
      >
        {/* Neural beam on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}

        {/* Prefix Addon */}
        {prefix && (
          <motion.div
            className={cn(
              "flex items-center px-3.5 border-r text-xs font-semibold shrink-0 transition-colors",
              isFocused
                ? "border-violet-500/20 text-violet-300 bg-violet-500/5"
                : "border-zinc-800 text-zinc-500 bg-zinc-900/50"
            )}
            animate={isFocused ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {prefix}
          </motion.div>
        )}

        {/* Input */}
        <input
          ref={ref}
          {...props}
          className={cn(
            "flex-1 bg-transparent px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none min-w-0",
            inputClassName
          )}
          onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
        />

        {/* Suffix Addon */}
        {suffix && (
          <motion.div
            className={cn(
              "flex items-center px-3.5 border-l text-xs font-semibold shrink-0 transition-colors",
              isFocused
                ? "border-violet-500/20 text-violet-300 bg-violet-500/5"
                : "border-zinc-800 text-zinc-500 bg-zinc-900/50"
            )}
            animate={isFocused ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {suffix}
          </motion.div>
        )}
      </motion.div>
    );
  }
);

NeuralInputGroup.displayName = "NeuralInputGroup";
