"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface SoftToggleSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const SoftToggleSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
}: SoftToggleSwitchProps) => {
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
        "relative flex items-center p-[6px] cursor-pointer rounded-full bg-[#ebebeb]",
        "w-28 h-14",
        className
      )}
      style={{
        boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff",
      }}
    >
      {/* Track inner design (the two circles and connecting line) */}
      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
        {/* Left Glowing Circle */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-[inset_2px_2px_4px_#d1d1d1,inset_-2px_-2px_4px_#ffffff]">
          <div 
            className="w-4 h-4 rounded-full bg-cyan-400"
            style={{ boxShadow: "0 0 10px 2px rgba(34, 211, 238, 0.6)" }}
          />
        </div>

        {/* Connecting Line */}
        <div className="absolute left-10 right-10 h-1 bg-[#d1d1d1] rounded-full shadow-[inset_1px_1px_2px_#b3b3b3,inset_-1px_-1px_2px_#ffffff]" />

        {/* Right Empty Circle */}
        <div className="relative w-8 h-8 rounded-full shadow-[inset_2px_2px_4px_#d1d1d1,inset_-2px_-2px_4px_#ffffff]" />
      </div>

      {/* Thumb */}
      <motion.div
        animate={{
          x: isChecked ? 56 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="relative z-10 w-11 h-11 rounded-full bg-[#f0f0f0]"
        style={{
          boxShadow: "5px 5px 10px #c8c8c8, -5px -5px 10px #ffffff",
        }}
      >
        {/* Thumb metallic/brushed finish using repeating linear gradient (simulating the conic effect simply) */}
        <div 
           className="absolute inset-1 rounded-full opacity-30"
           style={{
             background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0.1) 100%)",
           }}
        />
        <div 
           className="absolute inset-[2px] rounded-full mix-blend-overlay opacity-20 pointer-events-none blur-[1px]"
           style={{
             backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #000 2px, #000 4px)",
           }}
        />
      </motion.div>
    </button>
  );
};
