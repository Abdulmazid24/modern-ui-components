"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export interface CrypticOtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
    className?: string;
}

export const CrypticOtpInput = React.forwardRef<any, CrypticOtpInputProps>(({ className, length = 4, onComplete, ...props }, ref) => {
        const [value, setValue] = useState("");
        const inputRef = useRef<HTMLInputElement>(null);

        const handleContainerClick = () => {
        inputRef.current?.focus();
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, "").slice(0, length);
        setValue(val);
        if (val.length === length) {
           onComplete?.(val);
        }
        };

        return (
        <div ref={ref} {...props} className={cn("relative flex flex-col items-center gap-6 p-8 bg-zinc-950 border border-zinc-900 rounded-3xl cursor-text", className)} onClick={handleContainerClick}>
          
          {/* Hidden native input for mobile keyboard support & focus management */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={value}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text pointer-events-none"
            maxLength={length}
          />

          <div className="flex gap-4">
            {Array.from({ length }).map((_, i) => {
              const char = value[i] || "";
              const isActive = value.length === i;
              
              return (
                <CrypticCharBox 
                  key={i} 
                  char={char} 
                  isActive={isActive} 
                />
              );
            })}
          </div>
          
          <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-mono">
            Awaiting Decryption
          </p>
        </div>
        );
        });

const CrypticCharBox = ({ char, isActive }: { char: string, isActive: boolean }) => {
  const [displayChar, setDisplayChar] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const alienSymbols = ["ア", "九", "Ω", "∑", "∆", "█", "░", "┼", "※", "‡"];

  // When a character is entered, run the decryption scramble effect
  useEffect(() => {
    if (!char) {
      setDisplayChar("");
      return;
    }
    
    setIsDecrypting(true);
    let iterations = 0;
    
    const interval = setInterval(() => {
      if (iterations >= 8) {
        clearInterval(interval);
        setDisplayChar(char);
        setIsDecrypting(false);
      } else {
        setDisplayChar(alienSymbols[Math.floor(Math.random() * alienSymbols.length)]);
        iterations++;
      }
    }, 50);
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char]);

  return (
    <div className={`relative flex items-center justify-center w-14 h-16 rounded-xl border-2 transition-colors ${isActive ? 'border-cyan-500 bg-cyan-500/10' : char ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-800 bg-zinc-950/50'}`}>
      
      {/* Blinking Cursor */}
      {!char && isActive && (
        <motion.div 
          className="w-4 h-[2px] bg-cyan-400 absolute bottom-3"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* The Character */}
      <span className={`font-mono text-2xl font-black ${isDecrypting ? 'text-cyan-300' : 'text-white'}`}>
        {displayChar}
      </span>

      {/* Success Neon Flash when decrypted */}
      {char && !isDecrypting && (
        <motion.div 
          className="absolute inset-0 bg-cyan-400 z-10 pointer-events-none"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </div>
  );
};
