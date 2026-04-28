"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

export interface AsymmetricToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const AsymmetricToggle = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
}: AsymmetricToggleProps) => {
  const [isInternalChecked, setIsInternalChecked] = useState(defaultChecked);

  const { play: playClick } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  });

  const isChecked = checked !== undefined ? checked : isInternalChecked;

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsInternalChecked(newValue);
    onChange?.(newValue);
    playClick();
  };

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={cn(
        "relative flex items-center cursor-pointer transition-colors duration-300",
        "w-24 h-12 rounded-full",
        isChecked ? "bg-zinc-200" : "bg-zinc-300",
        className
      )}
      style={{
        boxShadow: "inset 0 4px 8px rgba(0,0,0,0.15), inset 0 -2px 4px rgba(255,255,255,0.7)",
      }}
    >
      <motion.div
        animate={{
          x: isChecked ? 48 : 4,
          // Flip the border radius!
          borderRadius: isChecked ? "30px 10px 10px 30px" : "10px 30px 30px 10px",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute top-1 bottom-1 w-11 flex items-center justify-center overflow-hidden bg-zinc-800"
        style={{
          boxShadow: isChecked
            ? "inset -2px 0 5px rgba(0,0,0,0.5), 2px 2px 5px rgba(0,0,0,0.2)"
            : "inset 2px 0 5px rgba(0,0,0,0.5), 2px 2px 5px rgba(0,0,0,0.2)",
          background: "linear-gradient(to right, #383838, #222222)",
        }}
      >
        {/* Decorative inner grip lines */}
        <div className="flex gap-[2px] opacity-30">
          <div className="w-[1px] h-4 bg-white" />
          <div className="w-[1px] h-4 bg-white" />
          <div className="w-[1px] h-4 bg-white" />
        </div>
      </motion.div>
    </button>
  );
};
