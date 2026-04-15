"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Moon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AstralDatePickerProps {
  selectedDate?: Date;
  onChange?: (date: Date) => void;
    className?: string;
}

export const AstralDatePicker = React.forwardRef<any, AstralDatePickerProps>(({ className, selectedDate = new Date(), onChange, ...props }, ref) => {
        const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
        const [isOpen, setIsOpen] = useState(false);

        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

        const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        };

        const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
        };

        const handleSelectDate = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        onChange?.(newDate);
        setIsOpen(false);
        };

        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-[320px]", className)}>
          {/* Trigger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center gap-4 bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-300 hover:border-indigo-500/50 hover:bg-indigo-950/20 transition-all relative overflow-hidden group"
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen pointer-events-none" />
            <Moon size={20} className="text-indigo-400 group-hover:text-indigo-300 transition-colors z-10" />
            <span className="font-medium tracking-wide z-10">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.button>

          {/* Calendar Popup */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute top-[110%] left-0 w-full z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -20, rotateX: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10, rotateX: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-zinc-950 border border-zinc-800 rounded-[2rem] p-6 shadow-[0_0_50px_rgba(79,70,229,0.15)] relative overflow-hidden"
                  style={{ perspective: 1000 }}
                >
                  {/* Starry Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex items-center gap-2 font-bold text-lg tracking-wider text-indigo-100">
                      <Star size={16} className="text-indigo-400 opacity-50" />
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      <Star size={16} className="text-indigo-400 opacity-50" />
                    </div>
                    <button onClick={handleNextMonth} className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-2 mb-4 text-center relative z-10">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-xs font-bold text-zinc-500">{day}</div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 relative z-10">
                    {/* Empty slots for start of month */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-10" />
                    ))}

                    {/* Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = 
                        selectedDate.getDate() === dayNum &&
                        selectedDate.getMonth() === currentMonth.getMonth() &&
                        selectedDate.getFullYear() === currentMonth.getFullYear();

                      return (
                        <motion.button
                          key={dayNum}
                          onClick={() => handleSelectDate(dayNum)}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          // Star twinkling entry effect
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.01 + 0.1, type: "spring" }}
                          className={`relative h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                            isSelected 
                              ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)]" 
                              : "bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/50"
                          }`}
                        >
                          {/* Connection lines for continuous stars effect (SVG constellation simulation) */}
                          {isSelected && (
                            <motion.div 
                              className="absolute inset-0 rounded-full border border-indigo-400"
                              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                          <span className="relative z-10">{dayNum}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
        );
        });
