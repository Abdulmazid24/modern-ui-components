"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

interface LetterSwapProps {
  text: string;
  className?: string;
}

/**
 * A playful text animation where characters swap or rotate on hover.
 */
export const LetterSwap = ({ text, className }: LetterSwapProps) => {
  const characters = text.split("");

  return (
    <div className={cn("inline-flex flex-wrap gap-[0.05em] font-bold cursor-default", className)}>
      {characters.map((char, i) => (
        <Letter key={i} char={char} />
      ))}
    </div>
  );
};

function Letter({ char }: { char: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const randomChars = "1234567890!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[0.6em] h-[1.2em] overflow-hidden flex items-center justify-center"
    >
      <AnimatePresence mode="popLayout">
        {!isHovered ? (
          <motion.span
            key="normal"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute"
          >
            {char}
          </motion.span>
        ) : (
          <motion.span
            key="alt"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute text-purple-500"
          >
            {char === " " ? "\u00A0" : randomChars[Math.floor(Math.random() * randomChars.length)]}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
