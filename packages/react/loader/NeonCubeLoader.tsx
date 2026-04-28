"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface NeonCubeLoaderProps {
  /**
   * The text to display. Each character will be rendered in a separate cube.
   * @default "LOADING"
   */
  text?: string;
  /**
   * The neon glow color.
   * @default "#21f3a3"
   */
  color?: string;
  className?: string;
  cubeClassName?: string;
}

export const NeonCubeLoader = ({
  text = "LOADING",
  color = "#21f3a3",
  className,
  cubeClassName,
}: NeonCubeLoaderProps) => {
  const letters = text.split("");

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    animate: {
      color: [
        "rgba(255, 255, 255, 0.1)", // 0%
        "#ffffff",                  // 30%
        "rgba(255, 255, 255, 0.1)", // 40%
        "rgba(255, 255, 255, 0.1)", // 100%
      ],
      textShadow: [
        `0 0 0px transparent`,
        `0 0 10px ${color}, 0 0 20px ${color}`,
        `0 0 0px transparent`,
        `0 0 0px transparent`,
      ],
      boxShadow: [
        `inset 0 0 2px 1px rgba(255,255,255,0.05), inset 0 0 12px 1px rgba(255,255,255,0.02), 0 0 0px transparent`,
        `inset 0 0 2px 1px rgba(255,255,255,0.5), inset 0 0 12px 1px ${color}, 0 0 25px ${color}`,
        `inset 0 0 2px 1px rgba(255,255,255,0.05), inset 0 0 12px 1px rgba(255,255,255,0.02), 0 0 0px transparent`,
        `inset 0 0 2px 1px rgba(255,255,255,0.05), inset 0 0 12px 1px rgba(255,255,255,0.02), 0 0 0px transparent`,
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        times: [0, 0.25, 0.4, 1], 
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap items-center justify-center gap-1 sm:gap-2", className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {letters.map((char, index) => (
        <motion.div
          key={index}
          variants={childVariants}
          // Using style to enforce the hardware acceleration and keep it smooth
          style={{ willChange: "box-shadow, color, text-shadow" }}
          className={cn(
            "flex h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-sm",
            "text-lg sm:text-xl md:text-2xl font-black uppercase tracking-widest",
            "bg-[#111] backdrop-blur-sm",
            cubeClassName
          )}
        >
          {char === " " ? "\u00A0" : char}
        </motion.div>
      ))}
    </motion.div>
  );
};
