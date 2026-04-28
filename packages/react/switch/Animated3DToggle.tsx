"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

export interface Animated3DToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Animated3DToggle = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
  size = "md",
}: Animated3DToggleProps) => {
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

  const sizes = {
    sm: {
      track: "w-14 h-7",
      thumb: "w-6 h-6",
      thumbOffset: "translate-x-1",
      thumbOffsetChecked: "translate-x-7",
    },
    md: {
      track: "w-20 h-10",
      thumb: "w-8 h-8",
      thumbOffset: "translate-x-1",
      thumbOffsetChecked: "translate-x-11",
    },
    lg: {
      track: "w-28 h-14",
      thumb: "w-12 h-12",
      thumbOffset: "translate-x-1",
      thumbOffsetChecked: "translate-x-15",
    },
  };

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={cn(
        "relative flex items-center rounded-full cursor-pointer transition-colors duration-500",
        sizes[size].track,
        className
      )}
      style={{
        // Deeper 3D inset shadow for the track
        boxShadow: "inset 0 2px 5px rgba(0,0,0,0.3), inset 0 -2px 5px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.1)",
        // Shift background color based on state
        backgroundColor: isChecked ? "#10b981" : "#ef4444", // Emerald 500 : Red 500
      }}
    >
      {/* 3D Thumb */}
      <motion.div
        animate={{
          x: isChecked ? (size === "sm" ? 28 : size === "md" ? 40 : 56) : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          "absolute left-0 rounded-full bg-white flex items-center justify-center",
          sizes[size].thumb
        )}
        style={{
          // The CSS from the video for the 3D thumb
          boxShadow: `
            inset 0 2px 2px hsla(0, 0%, 100%, 1), 
            inset 0 -2px 3px hsla(0, 0%, 0%, 0.25),
            0 2px 4px rgba(0,0,0,0.3),
            0 5px 10px rgba(0,0,0,0.1)
          `,
        }}
      >
        {/* Thumb Inner detail (optional dot or ridge) */}
        <div className="w-[30%] h-[30%] rounded-full opacity-20 bg-gradient-to-br from-transparent to-black" />
      </motion.div>
    </button>
  );
};
