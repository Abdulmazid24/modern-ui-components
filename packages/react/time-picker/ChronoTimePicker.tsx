"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "../utils";

const TIME_SPRING = { type: "spring", stiffness: 350, damping: 30 } as const;

export interface ChronoTimePickerProps {
  readonly value?: string; // HH:mm format
  readonly onChange?: (time: string) => void;
  readonly use12Hour?: boolean;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

/** ChronoTimePicker — Clock-inspired time picker with digital scrolling columns and glassmorphic panel. */
export const ChronoTimePicker = React.forwardRef<HTMLDivElement, ChronoTimePickerProps>(
  ({ className, value, onChange, use12Hour = false, placeholder = "Select time", disabled = false, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || "12:00");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (value !== undefined) setInternalValue(value);
    }, [value]);

    const handleTimeChange = (hourStr: string, minStr: string, period?: "AM" | "PM") => {
      let h = parseInt(hourStr, 10);
      if (use12Hour && period) {
        if (period === "AM" && h === 12) h = 0;
        if (period === "PM" && h !== 12) h += 12;
      }
      const finalTime = `${h.toString().padStart(2, "0")}:${minStr}`;
      setInternalValue(finalTime);
      onChange?.(finalTime);
    };

    const parseTime = (timeStr: string) => {
      const [hStr, mStr] = timeStr.split(":");
      let h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10) || 0;
      let period: "AM" | "PM" = "AM";

      if (use12Hour) {
        if (h >= 12) { period = "PM"; if (h > 12) h -= 12; }
        if (h === 0) h = 12;
      }

      return {
        hour: h.toString().padStart(2, "0"),
        minute: m.toString().padStart(2, "0"),
        period
      };
    };

    const { hour, minute, period } = parseTime(internalValue);
    
    const displayTime = use12Hour ? `${hour}:${minute} ${period}` : `${hour}:${minute}`;

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hoursList = use12Hour 
      ? Array.from({ length: 12 }).map((_, i) => (i + 1).toString().padStart(2, "0"))
      : Array.from({ length: 24 }).map((_, i) => i.toString().padStart(2, "0"));
      
    const minutesList = Array.from({ length: 60 }).map((_, i) => i.toString().padStart(2, "0"));

    return (
      <div ref={containerRef} className={cn("relative inline-block w-full", className)}>
        <button 
          ref={ref as any}
          {...props}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2.5 bg-zinc-950 border rounded-2xl transition-all",
            disabled ? "opacity-50 cursor-not-allowed border-zinc-800" : "border-zinc-800 hover:border-violet-500/30",
            isOpen && "border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          )}>
          <span className="text-sm text-zinc-200">{value ? displayTime : <span className="text-zinc-500">{placeholder}</span>}</span>
          <Clock size={16} className={cn("transition-colors", isOpen ? "text-violet-400" : "text-zinc-500")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute top-full left-0 mt-2 p-3 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl z-50 shadow-2xl"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={TIME_SPRING}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
              
              <div className="flex gap-2 h-[200px]">
                {/* Hours */}
                <div className="flex-1 min-w-[60px] overflow-y-auto overflow-x-hidden scrollbar-none snap-y snap-mandatory relative"
                  style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
                  {hoursList.map(h => (
                    <button key={h} type="button" onClick={() => handleTimeChange(h, minute, period)}
                      className={cn("w-full py-2 text-center text-sm font-medium snap-center transition-colors", h === hour ? "text-violet-400 bg-violet-500/10 rounded-lg" : "text-zinc-500 hover:text-zinc-300")}>
                      {h}
                    </button>
                  ))}
                </div>

                <div className="flex items-center text-zinc-700 font-bold">:</div>

                {/* Minutes */}
                <div className="flex-1 min-w-[60px] overflow-y-auto overflow-x-hidden scrollbar-none snap-y snap-mandatory relative"
                  style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
                  {minutesList.map(m => (
                    <button key={m} type="button" onClick={() => handleTimeChange(hour, m, period)}
                      className={cn("w-full py-2 text-center text-sm font-medium snap-center transition-colors", m === minute ? "text-violet-400 bg-violet-500/10 rounded-lg" : "text-zinc-500 hover:text-zinc-300")}>
                      {m}
                    </button>
                  ))}
                </div>

                {/* AM/PM */}
                {use12Hour && (
                  <div className="flex flex-col gap-1 ml-2 justify-center">
                    {(["AM", "PM"] as const).map(p => (
                      <button key={p} type="button" onClick={() => handleTimeChange(hour, minute, p)}
                        className={cn("px-3 py-2 text-xs font-bold rounded-lg transition-colors", p === period ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-transparent")}>
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <style>{`.scrollbar-none::-webkit-scrollbar { display: none; } .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      </div>
    );
  }
);
ChronoTimePicker.displayName = "ChronoTimePicker";
