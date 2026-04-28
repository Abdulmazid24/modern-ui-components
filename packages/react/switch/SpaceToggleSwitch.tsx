"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface SpaceToggleSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const SpaceToggleSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
}: SpaceToggleSwitchProps) => {
  const [isInternalChecked, setIsInternalChecked] = useState(defaultChecked);

  const isChecked = checked !== undefined ? checked : isInternalChecked;

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={cn(
        "relative flex items-center p-2 rounded-full overflow-hidden transition-colors duration-500",
        "w-36 h-16",
        isChecked ? "bg-[#0f172a]" : "bg-[#1e1e2f]", // Dark space background
        className
      )}
      style={{
        boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Starry Background (Twinkling dots) */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Speed Lines / Nebula trails */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-3 opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="h-[1px] rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{
              x: isChecked ? ["-100%", "200%"] : ["200%", "-100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 1 + 1,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 0.5,
            }}
            style={{ width: "60%" }}
          />
        ))}
      </div>

      {/* Track Target Rings */}
      <div className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none">
        <div className="w-12 h-12 rounded-full border-2 border-[#334155] opacity-50" />
        <div className="w-12 h-12 rounded-full border-2 border-cyan-900 opacity-50" />
      </div>

      {/* The Thumb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className={cn(
          "relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
          isChecked ? "ml-auto" : "mr-auto"
        )}
        style={{
          boxShadow: isChecked 
            ? "0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(255,255,255,0.5)" 
            : "0 0 20px rgba(244, 63, 94, 0.4), inset 0 0 10px rgba(255,255,255,0.3)",
        }}
      >
        {/* Turbine / Conic Gradient Engine */}
        <motion.div
          className="absolute inset-1 rounded-full"
          animate={{ rotate: isChecked ? 360 : -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: isChecked
              ? "repeating-conic-gradient(from 0deg, #06b6d4 0deg 10deg, #22d3ee 10deg 20deg)" // Cyan turbine
              : "repeating-conic-gradient(from 0deg, #e11d48 0deg 10deg, #f43f5e 10deg 20deg)", // Rose/Red turbine
          }}
        />

        {/* Engine Core (Center Dot) */}
        <div 
          className={cn(
            "absolute w-4 h-4 rounded-full",
            isChecked ? "bg-[#cffafe] shadow-[0_0_10px_#fff]" : "bg-[#ffe4e6] shadow-[0_0_10px_#fff]"
          )}
        />
      </motion.div>
    </button>
  );
};
