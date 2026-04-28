"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

export interface RadioOption {
  id: string;
  label: string;
  value: string;
}

export interface GlowingRadioNavProps {
  options: RadioOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  orientation?: "vertical" | "horizontal";
  glowColor?: string; // e.g. "rgba(255, 215, 0, 1)" (Gold)
}

export const GlowingRadioNav = ({
  options = [
    { id: "1", label: "Free", value: "free" },
    { id: "2", label: "Basic", value: "basic" },
    { id: "3", label: "Premium", value: "premium" },
  ],
  defaultValue,
  onChange,
  className,
  orientation = "vertical",
  glowColor = "rgba(255, 215, 0, 1)", // Default to a golden yellow like the screenshot
}: GlowingRadioNavProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "relative flex w-full max-w-xs",
        isVertical ? "flex-col gap-4" : "flex-row gap-4",
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <button
            key={option.id}
            role="radio"
            aria-checked={isSelected}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "relative flex items-center justify-center p-3 text-lg font-medium transition-colors duration-300 w-full z-10",
              isSelected ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
            style={{
              textShadow: isSelected ? `0 0 10px ${glowColor}, 0 0 20px ${glowColor}` : "none",
              color: isSelected ? glowColor : undefined,
            }}
          >
            {/* The Text */}
            <span className="relative z-20 mix-blend-screen">{option.label}</span>

            {/* The Animated Glider */}
            {isSelected && (
              <motion.div
                layoutId="glider"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className={cn(
                  "absolute inset-0 z-0",
                  "bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
                )}
                style={{
                  color: glowColor,
                  boxShadow: `0 0 20px 2px ${glowColor.replace("1)", "0.3)")}, inset 0 0 10px ${glowColor.replace("1)", "0.2)")}`,
                  borderTop: `1px solid ${glowColor.replace("1)", "0.5)")}`,
                  borderBottom: `1px solid ${glowColor.replace("1)", "0.5)")}`,
                }}
              >
                {/* Core bright center for the glider */}
                <div 
                  className="absolute inset-0 bg-current blur-md opacity-40 mix-blend-screen"
                  style={{ color: glowColor }}
                />
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
};
