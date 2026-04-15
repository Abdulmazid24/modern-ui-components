"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CalendarEvent {
  date: number; // 1-31
  title: string;
  color: string;
    className?: string;
}

export interface IsometricCalendarProps {
  events?: CalendarEvent[];
    className?: string;
}

export const IsometricCalendar = React.forwardRef<any, IsometricCalendarProps>(({ className, events = [
            { date: 4, title: "Launch Phase 1", color: "bg-cyan-500" },
            { date: 12, title: "Meeting", color: "bg-purple-500" },
            { date: 13, title: "Workshop", color: "bg-purple-500" },
            { date: 24, title: "Code Freeze", color: "bg-rose-500" }
          ], ...props }, ref) => {
        const [hoveredDay, setHoveredDay] = useState<number | null>(null);

        // Generate 35 days (5 weeks)
        const days = Array.from({ length: 35 }, (_, i) => i + 1 - 2); // Start some from prev month padding to look realistic

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-4xl p-12 bg-zinc-950 border border-zinc-900 rounded-3xl flex items-center justify-center overflow-hidden perspective-[1200px]", className)}>
          
          {/* 3D Container Wrapper mapping flat grid into Isometric projection */}
          <div 
            className="transform-style-3d relative"
            style={{
              transform: "rotateX(60deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d" // Ensure children pop out
            }}
          >
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                 const isRealDay = day > 0 && day <= 31;
                 const displayDay = isRealDay ? day : "";
                 
                 // Check if there's an event
                 const dayEvents = isRealDay ? events.filter(e => e.date === day) : [];
                 const hasEvent = dayEvents.length > 0;
                 const isHovered = hoveredDay === day;

                 return (
                   <div 
                     key={idx}
                     className="relative w-16 h-16 sm:w-20 sm:h-20"
                     onMouseEnter={() => isRealDay && setHoveredDay(day)}
                     onMouseLeave={() => setHoveredDay(null)}
                     style={{ transformStyle: "preserve-3d" }}
                   >
                     {/* Floor Surface */}
                     <div className={`absolute inset-0 bg-zinc-900 border ${isRealDay ? 'border-zinc-700' : 'border-zinc-800 opacity-30'} rounded-lg flex items-center justify-center shadow-inner transition-colors ${isHovered && isRealDay ? 'bg-zinc-800' : ''}`}>
                        <span className="text-zinc-500 text-xl font-bold -rotate-[45deg] origin-center opacity-40">
                          {displayDay}
                        </span>
                     </div>

                     {/* 3D Floating Event Block */}
                     {hasEvent && (
                       <motion.div
                         initial={{ z: 20 }}
                         animate={{ z: isHovered ? 60 : 30 }}
                         transition={{ type: "spring", stiffness: 300, damping: 20 }}
                         className={`absolute inset-2 ${dayEvents[0].color} rounded-md shadow-[20px_20px_20px_rgba(0,0,0,0.8)] border border-white/20`}
                         style={{
                           // TranslateZ lifts it off the grid floor in 3D
                           transform: "translateZ(30px)"
                         }}
                       >
                          {/* Top Face Content */}
                          <div className="absolute inset-0 flex items-center justify-center p-1">
                            <span className="text-white text-[10px] font-bold text-center -rotate-[45deg] leading-tight block whitespace-pre-wrap break-words w-full">
                              {dayEvents[0].title}
                            </span>
                          </div>
                          
                          {/* 3D Sides using pseudo elements would be exact, but we simulate volume with drop shadow and border in this simplified projection */}
                       </motion.div>
                     )}
                   </div>
                 );
              })}
            </div>
          </div>
          
        </div>
        );
        });
