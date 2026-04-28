"use client";

import React, { forwardRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

export interface SoftNeumorphicCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SoftNeumorphicCalculator = forwardRef<HTMLDivElement, SoftNeumorphicCalculatorProps>(
  ({ className, ...props }, ref) => {
    const [display, setDisplay] = useState("");
    const [equation, setEquation] = useState("");

    const { play: playClick } = useSpatialAudio({
      enabled: true,
      url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
    });

    const handleInput = useCallback(
      (value: string) => {
        playClick();
        if (value === "AC") {
          setDisplay("");
          setEquation("");
        } else if (value === "DEL") {
          setDisplay((prev) => prev.slice(0, -1));
        } else if (value === "=") {
          try {
            // Replace visual operators with math operators
            const evalStr = (equation + display).replace(/×/g, "*").replace(/÷/g, "/");
            // eslint-disable-next-line no-eval
            const result = eval(evalStr);
            setDisplay(String(result));
            setEquation("");
          } catch (e) {
            setDisplay("Error");
          }
        } else if (["+", "-", "×", "÷", "%"].includes(value)) {
          setEquation(equation + display + value);
          setDisplay("");
        } else {
          setDisplay((prev) => (prev === "Error" ? value : prev + value));
        }
      },
      [display, equation, playClick]
    );

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key >= "0" && e.key <= "9") handleInput(e.key);
        if (e.key === ".") handleInput(".");
        if (e.key === "Enter" || e.key === "=") handleInput("=");
        if (e.key === "Backspace") handleInput("DEL");
        if (e.key === "Escape") handleInput("AC");
        if (e.key === "+") handleInput("+");
        if (e.key === "-") handleInput("-");
        if (e.key === "*") handleInput("×");
        if (e.key === "/") handleInput("÷");
        if (e.key === "%") handleInput("%");
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleInput]);

    const buttons = [
      { label: "AC", type: "action" },
      { label: "DEL", type: "action" },
      { label: "%", type: "action" },
      { label: "÷", type: "action" },
      { label: "7", type: "number" },
      { label: "8", type: "number" },
      { label: "9", type: "number" },
      { label: "×", type: "action" },
      { label: "4", type: "number" },
      { label: "5", type: "number" },
      { label: "6", type: "number" },
      { label: "-", type: "action" },
      { label: "1", type: "number" },
      { label: "2", type: "number" },
      { label: "3", type: "number" },
      { label: "+", type: "action" },
      { label: "0", type: "number" },
      { label: ".", type: "number" },
      { label: "=", type: "action", span: 2 },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-[320px] mx-auto p-6 rounded-[40px]",
          "bg-[#e0e5ec] shadow-[10px_10px_20px_rgba(163,177,198,0.5),-10px_-10px_20px_rgba(255,255,255,1)]",
          className
        )}
        {...props}
      >
        {/* Display */}
        <div className="w-full h-24 mb-8 rounded-[20px] bg-[#e0e5ec] shadow-[inset_6px_6px_10px_rgba(163,177,198,0.5),inset_-6px_-6px_10px_rgba(255,255,255,1)] flex flex-col items-end justify-end p-5 overflow-hidden relative">
          <span className="text-zinc-500 text-sm h-5 tracking-widest absolute top-4 right-5">{equation}</span>
          <span
            className={cn(
              "text-4xl font-semibold text-zinc-700 tracking-tight break-all",
              display.length > 10 && "text-2xl"
            )}
          >
            {display || "0"}
          </span>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((btn, index) => (
            <motion.button
              key={index}
              onClick={() => handleInput(btn.label)}
              whileTap={{ 
                scale: 0.95, 
                boxShadow: "inset 4px 4px 8px rgba(163,177,198,0.5), inset -4px -4px 8px rgba(255,255,255,1)" 
              }}
              className={cn(
                "h-14 flex items-center justify-center rounded-[16px] text-xl font-bold select-none transition-shadow",
                "bg-[#e0e5ec] shadow-[4px_4px_8px_rgba(163,177,198,0.5),-4px_-4px_8px_rgba(255,255,255,1)]",
                btn.type === "action" ? "text-[#d13d7c]" : "text-zinc-600",
                btn.span === 2 && "col-span-2"
              )}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }
);

SoftNeumorphicCalculator.displayName = "SoftNeumorphicCalculator";
