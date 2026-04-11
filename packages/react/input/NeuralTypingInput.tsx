"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface NeuralTypingInputProps {
  placeholder?: string;
  onChange?: (val: string) => void;
}

const MATRIX_CHARS = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾌﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ<>-_/[]{}!?@#$%^&*";

export const NeuralTypingInput: React.FC<NeuralTypingInputProps> = ({
  placeholder = "Enter access code...",
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [lightningSparks, setLightningSparks] = useState<{ id: number; top: string; left: string }[]>([]);
  const sparkIdCounter = useRef(0);
  const decodeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synaptic Lightning Effect on keystroke
  useEffect(() => {
    if (value.length === 0) return;
    
    // Spawn a lightning spark near the typing cursor
    const newSpark = {
      id: ++sparkIdCounter.current,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.min(95, value.length * 2 + 5)}%`,
    };
    
    setLightningSparks((prev) => [...prev, newSpark]);
    
    // Remove spark quickly
    setTimeout(() => {
      setLightningSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 300);

    // Matrix Decrypt Effect
    if (decodeIntervalRef.current) clearInterval(decodeIntervalRef.current);
    
    let iterations = 0;
    const maxIterations = 5;
    
    decodeIntervalRef.current = setInterval(() => {
      if (iterations >= maxIterations) {
        setDisplayValue(value);
        if (decodeIntervalRef.current) clearInterval(decodeIntervalRef.current);
        return;
      }
      
      const scrambled = value
        .split("")
        .map((char, index) => {
          if (index < value.length - 1) return char; // Only scramble the latest char
          return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        })
        .join("");
        
      setDisplayValue(scrambled);
      iterations++;
    }, 30);

    return () => {
      if (decodeIntervalRef.current) clearInterval(decodeIntervalRef.current);
    };
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="relative flex items-center justify-center p-8 bg-black w-full max-w-md mx-auto">
      <div className="relative w-full">
        {/* Core Input Field */}
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? "" : placeholder}
          className={`w-full bg-transparent border-none outline-none font-mono text-cyan-400 px-6 py-4 z-20 relative text-lg tracking-[0.15em] ${
            isFocused ? "" : "opacity-70"
          }`}
          spellCheck={false}
          style={{ textShadow: isFocused ? "0 0 8px rgba(34, 211, 238, 0.8)" : "none" }}
        />

        {/* Neural Frame Base */}
        <motion.div
          className="absolute inset-0 border border-cyan-900 z-10 pointer-events-none bg-black/40"
          animate={{
            borderColor: isFocused ? "rgba(34, 211, 238, 0.5)" : "rgba(34, 211, 238, 0.1)",
            boxShadow: isFocused 
              ? "inset 0 0 20px rgba(34, 211, 238, 0.1), 0 0 20px rgba(34, 211, 238, 0.2)" 
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Four Corner Cyberspace Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

        {/* Neural Sweeping Scanner */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ left: "0%", opacity: 0 }}
              animate={{ left: "100%", opacity: [0, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Lightning Sparks */}
        <AnimatePresence>
          {lightningSparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{ opacity: 1, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-4 h-[1px] bg-cyan-300 z-20 pointer-events-none shadow-[0_0_10px_2px_#22d3ee]"
              style={{
                top: spark.top,
                left: spark.left,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
