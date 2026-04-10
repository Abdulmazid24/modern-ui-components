"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export interface OdometerInputProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const OdometerInput: React.FC<OdometerInputProps> = ({
  initialValue = 0,
  min = 0,
  max = 999,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    if (value < max) {
      const newVal = value + 1;
      setValue(newVal);
      onChange?.(newVal);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const newVal = value - 1;
      setValue(newVal);
      onChange?.(newVal);
    }
  };

  // Convert number to zero-padded string array (e.g., 5 -> ['0','0','5'])
  const maxDigits = max.toString().length;
  const digits = value.toString().padStart(maxDigits, "0").split("");

  return (
    <div className="flex items-center gap-4 bg-zinc-950 p-2 sm:p-4 rounded-3xl border border-zinc-900 shadow-2xl">
      <button 
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-12 h-12 flex items-center justify-center bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-colors border border-zinc-800"
      >
        <Minus size={20} />
      </button>

      {/* Odometer Display */}
      <div className="flex gap-1 overflow-hidden bg-black p-2 rounded-2xl border-4 border-zinc-900 shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] h-[80px]">
        {digits.map((digit, index) => (
          <OdometerDigit 
            key={`${index}-${value}`} // Change key to force remount/re-animate if needed, but doing it via motion y is better
            digit={parseInt(digit, 10)} 
          />
        ))}
      </div>

      <button 
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-12 h-12 flex items-center justify-center bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-colors border border-zinc-800"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

// Extracted digit component which drives the vertical scrolling animation
const OdometerDigit = ({ digit }: { digit: number }) => {
  const digitHeight = 60; // Exact height of one digit number block
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div 
      className="relative w-10 sm:w-12 h-[60px] bg-zinc-900 rounded overflow-hidden"
      style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,1)" }} // Mechanical shadow
    >
      <motion.div
        className="absolute top-0 left-0 w-full flex flex-col"
        initial={false}
        animate={{ y: -(digit * digitHeight) }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      >
        {numbers.map((num) => (
          <div 
            key={num} 
            className="w-full flex items-center justify-center font-black text-3xl sm:text-4xl text-white"
            style={{ height: `${digitHeight}px`, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            {num}
          </div>
        ))}
      </motion.div>
      
      {/* Curved glass reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-full border-t border-b border-black pointer-events-none" />
    </div>
  );
};
