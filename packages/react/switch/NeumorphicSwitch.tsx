"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

export interface NeumorphicSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const NeumorphicSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
  size = "md",
}: NeumorphicSwitchProps) => {
  const [isInternalChecked, setIsInternalChecked] = useState(defaultChecked);
  
  const { play: playClick } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Crisp mechanical click
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
      track: "w-20 h-8",
      thumb: "w-9 h-6",
      text: "text-xs",
      padding: "p-1",
      px: "px-3"
    },
    md: {
      track: "w-28 h-12",
      thumb: "w-12 h-10",
      text: "text-sm",
      padding: "p-1",
      px: "px-4"
    },
    lg: {
      track: "w-36 h-16",
      thumb: "w-16 h-13",
      text: "text-base",
      padding: "p-1.5",
      px: "px-5"
    }
  };

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={cn(
        "relative flex items-center rounded-full transition-colors duration-500",
        sizes[size].track,
        sizes[size].padding,
        isChecked 
          ? "bg-[#21f3a3] shadow-[inset_0_3px_10px_rgba(0,0,0,0.15)]" 
          : "bg-[#e0e5ec] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,1)]",
        className
      )}
    >
      {/* Background Track Texts */}
      <div className={cn("absolute inset-0 flex items-center justify-between font-extrabold tracking-wider pointer-events-none", sizes[size].px, sizes[size].text)}>
        <span className={cn(
          "transition-all duration-500 transform",
          isChecked ? "opacity-100 text-white translate-x-0" : "opacity-0 text-white -translate-x-4"
        )}>
          On
        </span>
        <span className={cn(
          "transition-all duration-500 transform",
          !isChecked ? "opacity-100 text-zinc-600 translate-x-0" : "opacity-0 text-zinc-600 translate-x-4"
        )}>
          Off
        </span>
      </div>

      {/* Thumb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 35,
          mass: 1.2
        }}
        className={cn(
          "z-10 flex items-center justify-center rounded-full bg-[#f1f5f8] font-extrabold overflow-hidden",
          "shadow-[inset_2px_2px_4px_rgba(255,255,255,1),inset_-2px_-2px_4px_rgba(163,177,198,0.2),3px_3px_6px_rgba(163,177,198,0.4),-2px_-2px_4px_rgba(255,255,255,0.8)]",
          sizes[size].thumb,
          sizes[size].text,
          isChecked ? "ml-auto text-red-500" : "mr-auto text-[#21f3a3]"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isChecked ? "on" : "off"}
            initial={{ opacity: 0, y: isChecked ? 20 : -20, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: isChecked ? -20 : 20, rotateX: -90 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="drop-shadow-sm"
          >
            {isChecked ? "On" : "Off"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </button>
  );
};
