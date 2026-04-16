"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

interface StreamingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  glowColor?: string;
}

/**
 * An AI-style text component that reveals text character-by-character.
 * Features a glowing trail and smooth entry logic.
 */
export const StreamingText = ({
  text,
  speed = 20,
  onComplete,
  className,
  glowColor = "rgba(139, 92, 246, 0.5)",
}: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  // Handle case where text prop changes after animation starts
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className={cn("font-sans leading-relaxed text-zinc-300", className)}>
      <AnimatePresence mode="popLayout">
        {displayedText.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, filter: "blur(4px)", y: 2 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
            style={{
              textShadow: i === currentIndex - 1 ? `0 0 8px ${glowColor}` : "none",
              color: i === currentIndex - 1 ? "white" : "inherit",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
      
      {/* cursor icon */}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-5 ml-1 bg-purple-500 rounded-full vertical-middle"
        />
      )}
    </div>
  );
};
