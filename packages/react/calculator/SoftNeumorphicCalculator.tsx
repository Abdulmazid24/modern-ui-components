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
        <div className="w-full h-32 mb-6 rounded-3xl bg-[#e0e5ec] shadow-[inset_8px_8px_16px_rgba(163,177,198,0.6),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] flex flex-col items-end justify-between p-6 overflow-hidden">
          <div className="text-zinc-500 text-base tracking-widest w-full text-right h-6 overflow-hidden text-ellipsis whitespace-nowrap">
            {equation}
          </div>
          <div
            className={cn(
              "font-semibold text-zinc-700 tracking-tight w-full text-right break-all",
              display.length > 10 ? "text-3xl" : "text-5xl"
            )}
          >
            {display || "0"}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((btn, index) => (
            <motion.button
              key={index}
              onClick={() => handleInput(btn.label)}
              whileTap={{ 
                scale: 0.95, 
                boxShadow: "inset 6px 6px 10px rgba(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,1), 0px 0px 0px rgba(163,177,198,0.6), 0px 0px 0px rgba(255,255,255,1)" 
              }}
              style={{
                boxShadow: "6px 6px 12px rgba(163,177,198,0.6), -6px -6px 12px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.9), inset -1px -1px 2px rgba(163,177,198,0.2)"
              }}
              className={cn(
                "h-16 flex items-center justify-center rounded-xl text-2xl font-bold select-none transition-shadow duration-200",
                "bg-[#e0e5ec]",
                btn.type === "action" ? "text-pink-600" : "text-zinc-600",
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
