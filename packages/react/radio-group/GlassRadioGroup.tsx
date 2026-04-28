"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface GlassRadioOption {
  id: string;
  label: string;
  value: string;
  color: string; // e.g., "#ffcc00" for Gold, "#a0d8ff" for Platinum
}

export interface GlassRadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options?: GlassRadioOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const GlassRadioGroup = React.forwardRef<HTMLDivElement, GlassRadioGroupProps>(
  (
    {
      options = [
        { id: "1", label: "Silver", value: "silver", color: "#e2e8f0" },
        { id: "2", label: "Gold", value: "gold", color: "#fbbf24" },
        { id: "3", label: "Platinum", value: "platinum", color: "#38bdf8" },
      ],
      defaultValue,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value);

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      onChange?.(value);
    };

    const selectedIndex = options.findIndex((opt) => opt.value === selectedValue);
    const activeOption = options[selectedIndex];

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "relative flex items-center p-1 rounded-full",
          "bg-zinc-900/50 backdrop-blur-xl border border-white/10 shadow-2xl",
          className
        )}
        {...props}
      >
        {/* The Animated Glider */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full pointer-events-none"
          initial={false}
          animate={{
            x: `calc(${selectedIndex * 100}% + ${selectedIndex * 4}px)`, // Accounts for gap or no gap
            width: `calc(${100 / options.length}% - 8px)`,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.1), ${activeOption?.color}40)`,
            boxShadow: `0 0 20px ${activeOption?.color}30, inset 0 0 10px ${activeOption?.color}20, inset 1px 1px 2px rgba(255,255,255,0.3)`,
            border: `1px solid ${activeOption?.color}50`,
          }}
        />

        {/* The Options */}
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative z-10 flex-1 flex items-center justify-center px-6 py-2.5 text-sm font-bold transition-colors duration-300 rounded-full outline-none",
                isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              )}
              style={{
                textShadow: isSelected ? `0 0 10px ${option.color}` : "none",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
);

GlassRadioGroup.displayName = "GlassRadioGroup";
