"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

export interface HolographicSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const HolographicSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
  size = "md",
}: HolographicSwitchProps) => {
  const [isInternalChecked, setIsInternalChecked] = useState(defaultChecked);
  const [isHovered, setIsHovered] = useState(false);

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
      track: "w-16 h-6",
      thumb: "w-6 h-6",
      text: "text-[10px]",
      padding: "p-0",
      px: "px-2",
      orbOffset: "left-0",
      orbOffsetChecked: "left-[calc(100%-1.5rem)]",
    },
    md: {
      track: "w-24 h-10",
      thumb: "w-10 h-10",
      text: "text-xs",
      padding: "p-0",
      px: "px-3",
      orbOffset: "left-0",
      orbOffsetChecked: "left-[calc(100%-2.5rem)]",
    },
    lg: {
      track: "w-32 h-12",
      thumb: "w-12 h-12",
      text: "text-sm",
      padding: "p-0",
      px: "px-4",
      orbOffset: "left-0",
      orbOffsetChecked: "left-[calc(100%-3rem)]",
    },
  };

  // Holographic Colors
  const offColorBase = "0, 150, 255"; // Cyan/Blue
  const onColorBase = "0, 255, 150"; // Green/Cyan

  const activeColor = isChecked ? onColorBase : offColorBase;

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center rounded-full transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-md border border-white/10",
        sizes[size].track,
        sizes[size].padding,
        className
      )}
      style={{
        background: `radial-gradient(ellipse at center, rgba(${activeColor}, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)`,
        boxShadow: isHovered
          ? `0 0 25px rgba(${activeColor}, 0.4), inset 0 0 15px rgba(${activeColor}, 0.3)`
          : `0 0 15px rgba(${activeColor}, 0.2), inset 0 0 10px rgba(${activeColor}, 0.2)`,
      }}
    >
      {/* Background Track Texts */}
      <div className={cn("absolute inset-0 flex items-center justify-between font-bold tracking-widest pointer-events-none z-0", sizes[size].px, sizes[size].text)}>
        <span
          className="transition-all duration-500"
          style={{
            color: isChecked ? `rgba(${activeColor}, 0.9)` : "rgba(255, 255, 255, 0.2)",
            textShadow: isChecked ? `0 0 8px rgba(${activeColor}, 0.8)` : "none",
          }}
        >
          ON
        </span>
        <span
          className="transition-all duration-500"
          style={{
            color: !isChecked ? `rgba(${activeColor}, 0.9)` : "rgba(255, 255, 255, 0.2)",
            textShadow: !isChecked ? `0 0 8px rgba(${activeColor}, 0.8)` : "none",
          }}
        >
          OFF
        </span>
      </div>

      {/* Holographic Glowing Orb (Thumb) */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className={cn(
          "absolute z-10 rounded-full flex items-center justify-center",
          sizes[size].thumb,
          isChecked ? sizes[size].orbOffsetChecked : sizes[size].orbOffset
        )}
      >
        <div 
          className="w-full h-full rounded-full transition-all duration-500"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(${activeColor}, 0.8) 40%, rgba(${activeColor}, 0) 70%)`,
            boxShadow: `0 0 20px 5px rgba(${activeColor}, 0.6), inset 0 0 10px 2px rgba(255,255,255,0.8)`,
            filter: isHovered ? "brightness(1.3) blur(0.5px)" : "brightness(1) blur(1px)",
          }}
        />
        {/* Core highlight dot */}
        <div className="absolute w-[30%] h-[30%] bg-white rounded-full blur-[1px] shadow-[0_0_10px_rgba(255,255,255,1)]" />
      </motion.div>
      
      {/* Scanning line effect */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 bottom-0 w-[10%] opacity-30 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${activeColor}, 1), transparent)`,
          transform: "skewX(-20deg)",
        }}
      />
    </button>
  );
};
