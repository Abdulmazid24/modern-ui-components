"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AddToCartButtonProps {
  label?: string;
  onAdd?: () => void;
  variant?: "light" | "dark";
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  label = "Add to cart",
  onAdd,
  variant = "dark",
}) => {
  const [state, setState] = useState<"idle" | "dropping" | "done">("idle");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("dropping");
    onAdd?.();
    setTimeout(() => setState("done"), 1200);
    setTimeout(() => setState("idle"), 2500);
  };

  const isDark = variant === "dark";
  const bg = isDark ? "#111" : "#fff";
  const fg = isDark ? "#fff" : "#111";
  const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";

  return (
    <motion.button
      onClick={handleClick}
      whileHover={state === "idle" ? { scale: 1.03 } : {}}
      whileTap={state === "idle" ? { scale: 0.97 } : {}}
      className="relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer overflow-hidden select-none"
      style={{
        background: bg,
        color: fg,
        border: `1px solid ${borderColor}`,
        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,0.4)"
          : "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Cart Icon Container */}
      <div className="relative w-6 h-6">
        {/* Cart body */}
        <motion.svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke={fg}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={
            state === "dropping"
              ? { rotate: [0, -5, 5, -3, 2, 0], y: [0, -2, 0] }
              : {}
          }
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Cart basket */}
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </motion.svg>

        {/* Falling product (T-shirt icon) */}
        <AnimatePresence>
          {state === "dropping" && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ y: -30, opacity: 0, scale: 0.6 }}
              animate={{
                y: [
                  -30, // start above
                  2, // land in cart
                  -4, // bounce up
                  2, // settle
                ],
                opacity: [0, 1, 1, 1],
                scale: [0.6, 0.8, 0.7, 0],
                rotate: [0, 5, -3, 0],
              }}
              transition={{
                duration: 1,
                times: [0, 0.4, 0.6, 1],
                ease: "easeInOut",
              }}
            >
              {/* Product: T-shirt SVG */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={fg}
                opacity="0.9"
              >
                <path d="M20.38 3.46L16 2H8L3.62 3.46a1 1 0 00-.62.92V8a1 1 0 001 1h2v12a1 1 0 001 1h10a1 1 0 001-1V9h2a1 1 0 001-1V4.38a1 1 0 00-.62-.92zM12 4a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label / State Text */}
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
        {state === "dropping" && (
          <motion.span
            key="adding"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="whitespace-nowrap"
          >
            Adding...
          </motion.span>
        )}
        {state === "done" && (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="whitespace-nowrap flex items-center gap-1.5"
          >
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDark ? "#10b981" : "#059669"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            >
              <motion.path
                d="M5 12l5 5L20 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.svg>
            <span style={{ color: isDark ? "#10b981" : "#059669" }}>Added!</span>
          </motion.span>
        )}
      </AnimatePresence>

      {/* Subtle pulse ring on add */}
      <AnimatePresence>
        {state === "dropping" && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 0, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              border: `2px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Demo: Show both variants side by side
export const AddToCartButtonDemo: React.FC = () => (
  <div className="flex items-center justify-center gap-8 p-8">
    <AddToCartButton variant="light" />
    <AddToCartButton variant="dark" />
  </div>
);
