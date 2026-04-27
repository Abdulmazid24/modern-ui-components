"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../utils";

export interface QuantumInputNumberProps {
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly value?: number;
  readonly defaultValue?: number;
  readonly onChange?: (value: number) => void;
  readonly precision?: number;
  readonly prefix?: React.ReactNode;
  readonly suffix?: React.ReactNode;
  readonly disabled?: boolean;
  readonly className?: string;
}

/** QuantumInputNumber — Dedicated numeric input with +/- controls, scrub-to-change (drag), and formatting. */
export const QuantumInputNumber = React.forwardRef<HTMLDivElement, QuantumInputNumberProps>(
  ({ className, min = -Infinity, max = Infinity, step = 1, value, defaultValue = 0, onChange, precision = 0, prefix, suffix, disabled = false, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(isControlled ? value : defaultValue);
    const [inputValue, setInputValue] = useState(internalValue.toFixed(precision));
    
    useEffect(() => {
      if (isControlled) {
        setInternalValue(value);
        setInputValue(value.toFixed(precision));
      }
    }, [value, isControlled, precision]);

    const updateValue = useCallback((newVal: number) => {
      let clamped = Math.max(min, Math.min(max, newVal));
      if (!isControlled) {
        setInternalValue(clamped);
        setInputValue(clamped.toFixed(precision));
      }
      onChange?.(clamped);
    }, [min, max, isControlled, onChange, precision]);

    const handleIncrement = () => updateValue(internalValue + step);
    const handleDecrement = () => updateValue(internalValue - step);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
      const parsed = parseFloat(inputValue);
      if (isNaN(parsed)) {
        setInputValue(internalValue.toFixed(precision));
      } else {
        updateValue(parsed);
      }
    };

    // Scrubbing logic (drag up/down to change value)
    const scrubRef = useRef<HTMLDivElement>(null);
    const [isScrubbing, setIsScrubbing] = useState(false);
    
    useEffect(() => {
      const el = scrubRef.current;
      if (!el || disabled) return;

      let startY = 0;
      let startVal = 0;

      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        startY = e.clientY;
        startVal = internalValue;
        setIsScrubbing(true);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      };

      const onPointerMove = (e: PointerEvent) => {
        const deltaY = startY - e.clientY;
        const ticks = Math.round(deltaY / 10); // 1 tick per 10px
        if (ticks !== 0) {
          updateValue(startVal + ticks * step);
        }
      };

      const onPointerUp = () => {
        setIsScrubbing(false);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      el.addEventListener("pointerdown", onPointerDown);
      return () => {
        el.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
    }, [internalValue, step, updateValue, disabled]);

    return (
      <div ref={ref} {...props} 
        className={cn(
          "relative flex items-center bg-zinc-950 border rounded-2xl overflow-hidden transition-colors focus-within:border-violet-500/40 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
          disabled ? "opacity-50 cursor-not-allowed border-zinc-800" : "border-zinc-800",
          isScrubbing && "cursor-ns-resize",
          className
        )}>
        {prefix && <div className="pl-3 pr-2 text-zinc-500 shrink-0">{prefix}</div>}
        
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          onBlur={handleInputBlur}
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent text-zinc-200 text-sm text-center py-2.5 focus:outline-none"
        />

        {suffix && <div className="pr-3 pl-2 text-zinc-500 shrink-0">{suffix}</div>}

        <div ref={scrubRef} className="absolute inset-0 z-10 touch-none" style={{ cursor: disabled ? 'not-allowed' : 'ns-resize' }} />
        
        <div className="flex flex-col border-l border-zinc-800 shrink-0 relative z-20">
          <button 
            type="button" 
            onClick={handleIncrement} 
            disabled={disabled || internalValue >= max}
            className="flex-1 px-2.5 hover:bg-white/[0.05] hover:text-violet-400 text-zinc-500 transition-colors disabled:opacity-50 border-b border-zinc-800">
            <Plus size={12} strokeWidth={3} />
          </button>
          <button 
            type="button" 
            onClick={handleDecrement} 
            disabled={disabled || internalValue <= min}
            className="flex-1 px-2.5 hover:bg-white/[0.05] hover:text-violet-400 text-zinc-500 transition-colors disabled:opacity-50">
            <Minus size={12} strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  }
);
QuantumInputNumber.displayName = "QuantumInputNumber";
