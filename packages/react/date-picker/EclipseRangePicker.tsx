"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

export interface EclipseRangePickerProps {
  // Simplified for demonstration: we'll just show numbers 1-31
  onChange?: (start: number, end: number) => void;
    className?: string;
}

export const EclipseRangePicker = React.forwardRef<any, EclipseRangePickerProps>(({ className, onChange, ...props }, ref) => {
        const [start, setStart] = useState<number | null>(null);
        const [end, setEnd] = useState<number | null>(null);
        const [hoveredDay, setHoveredDay] = useState<number | null>(null);

        const days = Array.from({ length: 31 }, (_, i) => i + 1);

        const handleSelect = (day: number) => {
        if (start === null) {
          setStart(day);
          setEnd(null);
        } else if (end === null) {
          if (day < start) {
            setStart(day);
          } else {
            setEnd(day);
            onChange?.(start, day);
          }
        } else {
          setStart(day);
          setEnd(null);
        }
        };

        // Determine if a day is in the "eclipse" range
        const isEclipseRange = (day: number) => {
        const min = start !== null ? start : null;
        const max = end !== null ? end : hoveredDay !== null && start !== null && hoveredDay > start ? hoveredDay : null;
        return min !== null && max !== null && day >= min && day <= max;
        };

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden", className)}>
          
          <div className="text-center mb-6 text-zinc-300 font-medium tracking-widest uppercase">
            Select Alignment
          </div>

          <div className="grid grid-cols-7 gap-2 relative z-10">
            {days.map((day) => {
              const inRange = isEclipseRange(day);
              const isEdge = day === start || day === end;
              const isStartEdgeOnly = day === start && end === null;

              return (
                <motion.button
                  key={day}
                  onClick={() => handleSelect(day)}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="relative h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium focus:outline-none"
                  animate={{
                    color: inRange ? "#fff" : "#71717a",
                    scale: isEdge || isStartEdgeOnly ? 1.1 : 1
                  }}
                >
                  {/* The "Moon" blocking out the sun (black circle) */}
                  <AnimatePresence>
                    {(inRange || isStartEdgeOnly) && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className={`absolute inset-0 rounded-full z-0 ${isEdge || isStartEdgeOnly ? 'bg-black border-2 border-white' : 'bg-black'}`}
                      />
                    )}
                  </AnimatePresence>

                  {/* Eclipse Corona Glow (only on the range) */}
                  <AnimatePresence>
                    {inRange && !isEdge && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white rounded-full z-[-1] blur-md mix-blend-screen opacity-50 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Connecting dark beam between days */}
                  {inRange && day !== start && (
                     <div className="absolute top-1/2 -left-3 w-4 h-8 -translate-y-1/2 bg-black z-[-1]" />
                  )}
                  {inRange && day !== end && hoveredDay !== end && (
                     <div className="absolute top-1/2 -right-3 w-4 h-8 -translate-y-1/2 bg-black z-[-1]" />
                  )}
                  {/* Connectors glowing corona */}
                  {inRange && day !== start && (
                     <div className="absolute top-1/2 -left-3 w-4 h-10 -translate-y-1/2 bg-white blur-[8px] opacity-30 z-[-2]" />
                  )}

                  <span className="relative z-10">{day}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
        );
        });
