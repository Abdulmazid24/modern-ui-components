"use client";

import React, { forwardRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Delete } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeumorphicCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NeumorphicCalculator = forwardRef<HTMLDivElement, NeumorphicCalculatorProps>(
  ({ className, ...props }, ref) => {
    const [display, setDisplay] = useState("0");
    const [equation, setEquation] = useState("");
    const [isNewNumber, setIsNewNumber] = useState(true);

    const handleNumber = useCallback(
      (num: string) => {
        if (isNewNumber) {
          setDisplay(num);
          setIsNewNumber(false);
        } else {
          setDisplay(display === "0" ? num : display + num);
        }
      },
      [display, isNewNumber]
    );

    const handleOperator = useCallback(
      (op: string) => {
        setEquation(display + " " + op + " ");
        setIsNewNumber(true);
      },
      [display]
    );

    const calculate = useCallback(() => {
      try {
        // Safe evaluation since we strictly control the input
        // eslint-disable-next-line no-eval
        const result = eval((equation + display).replace(/×/g, "*").replace(/÷/g, "/"));
        setDisplay(String(result));
        setEquation("");
        setIsNewNumber(true);
      } catch (e) {
        setDisplay("Error");
        setIsNewNumber(true);
      }
    }, [equation, display]);

    const clearDisplay = useCallback(() => {
      setDisplay("0");
      setEquation("");
      setIsNewNumber(true);
    }, []);

    const deleteLast = useCallback(() => {
      if (isNewNumber) return;
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    }, [display, isNewNumber]);

    const handleDecimal = useCallback(() => {
      if (isNewNumber) {
        setDisplay("0.");
        setIsNewNumber(false);
      } else if (!display.includes(".")) {
        setDisplay(display + ".");
      }
    }, [display, isNewNumber]);

    const handlePercentage = useCallback(() => {
      const val = parseFloat(display);
      setDisplay(String(val / 100));
      setIsNewNumber(true);
    }, [display]);

    // Keyboard support mimicking the screenshot's JS logic
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key >= "0" && e.key <= "9") {
          handleNumber(e.key);
        } else if (["+", "-", "*", "/"].includes(e.key)) {
          // Map * and / to our visual operators
          const visualOp = e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key;
          handleOperator(visualOp);
        } else if (e.key === "Enter" || e.key === "=") {
          calculate();
        } else if (e.key === "Backspace") {
          deleteLast();
        } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
          clearDisplay();
        } else if (e.key === ".") {
          handleDecimal();
        } else if (e.key === "%") {
          handlePercentage();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
      handleNumber,
      handleOperator,
      calculate,
      deleteLast,
      clearDisplay,
      handleDecimal,
      handlePercentage,
    ]);

    // Button config mapping
    const buttons = [
      { id: "clear", label: "C", type: "action", onClick: clearDisplay, className: "bg-red-500/10 text-red-500 hover:bg-red-500/20" },
      { id: "delete", label: <Delete size={18} />, type: "action", onClick: deleteLast },
      { id: "percent", label: "%", type: "action", onClick: handlePercentage },
      { id: "divide", label: "÷", type: "operator", onClick: () => handleOperator("÷") },

      { id: "7", label: "7", type: "number", onClick: () => handleNumber("7") },
      { id: "8", label: "8", type: "number", onClick: () => handleNumber("8") },
      { id: "9", label: "9", type: "number", onClick: () => handleNumber("9") },
      { id: "multiply", label: "×", type: "operator", onClick: () => handleOperator("×") },

      { id: "4", label: "4", type: "number", onClick: () => handleNumber("4") },
      { id: "5", label: "5", type: "number", onClick: () => handleNumber("5") },
      { id: "6", label: "6", type: "number", onClick: () => handleNumber("6") },
      { id: "subtract", label: "-", type: "operator", onClick: () => handleOperator("-") },

      { id: "1", label: "1", type: "number", onClick: () => handleNumber("1") },
      { id: "2", label: "2", type: "number", onClick: () => handleNumber("2") },
      { id: "3", label: "3", type: "number", onClick: () => handleNumber("3") },
      { id: "add", label: "+", type: "operator", onClick: () => handleOperator("+") },

      { id: "0", label: "0", type: "number", onClick: () => handleNumber("0"), className: "col-span-2" },
      { id: "dot", label: ".", type: "number", onClick: handleDecimal },
      { id: "equals", label: "=", type: "action", onClick: calculate, className: "bg-cyan-500 text-zinc-900 border-none shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:bg-cyan-400" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-[340px] mx-auto p-5 rounded-[32px]",
          // Deep Glassmorphism matching the video
          "bg-zinc-900/80 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "border border-white/10",
          className
        )}
        {...props}
      >
        {/* Display Screen */}
        <div className="w-full h-24 mb-6 rounded-2xl bg-zinc-950/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex flex-col items-end justify-end p-4 border border-white/5">
          <span className="text-zinc-500 text-sm h-5 tracking-widest">{equation}</span>
          <span
            className={cn(
              "text-4xl font-light text-white tracking-tight break-all line-clamp-1",
              display.length > 10 && "text-2xl"
            )}
          >
            {display}
          </span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <motion.button
              key={btn.id}
              onClick={btn.onClick}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "h-16 flex items-center justify-center rounded-2xl text-xl font-medium select-none transition-colors duration-200",
                "bg-zinc-800 border border-white/5 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-zinc-700",
                btn.type === "operator" ? "text-cyan-400 font-normal" : "text-zinc-300",
                btn.className
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

NeumorphicCalculator.displayName = "NeumorphicCalculator";
