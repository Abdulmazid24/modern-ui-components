"use client";

import React, { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AgeCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AgeCalculator = forwardRef<HTMLDivElement, AgeCalculatorProps>(
  ({ className, ...props }, ref) => {
    const [dob, setDob] = useState<string>("");
    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
    const [error, setError] = useState<string>("");

    const calculateAge = (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setAge(null);

      if (!dob) {
        setError("Please select your date of birth.");
        return;
      }

      const birthDate = new Date(dob);
      const today = new Date();

      if (birthDate > today) {
        setError("Date of birth cannot be in the future.");
        return;
      }

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      // If days are negative, borrow from previous month
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // 0th day of current month gets last day of previous month
        days += lastMonth.getDate();
      }

      // If months are negative, borrow from previous year
      if (months < 0) {
        years--;
        months += 12;
      }

      setAge({ years, months, days });
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md bg-white dark:bg-zinc-950 p-8 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(26,58,138,0.05),0_20px_25px_-5px_rgba(26,58,138,0.05)] border border-zinc-100 dark:border-zinc-800",
          className
        )}
        {...props}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Age Calculator
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Precise chronological age tracking
          </p>
        </div>

        <form onSubmit={calculateAge} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 pl-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                  "text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow",
                  "color-scheme-light dark:color-scheme-dark" 
                )}
              />
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-medium text-red-500 mt-1"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full relative group overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold py-3.5 rounded-xl transition-transform active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <User size={18} />
              Calculate Now
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Dark mode text color override on hover when gradient shows */}
            <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-semibold">
               <User size={18} />
               Calculate Now
            </span>
          </button>
        </form>

        {/* Results Area */}
        <div className="mt-8 relative min-h-[100px]">
          <AnimatePresence mode="wait">
            {age ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="grid grid-cols-3 gap-3"
              >
                <ResultBox label="Years" value={age.years} delay={0.1} />
                <ResultBox label="Months" value={age.months} delay={0.2} />
                <ResultBox label="Days" value={age.days} delay={0.3} />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl"
              >
                <span className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Clock size={16} />
                  Awaiting input...
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

AgeCalculator.displayName = "AgeCalculator";

// Sub-component for individual result boxes
function ResultBox({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800"
    >
      <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400">
        {value}
      </span>
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-1">
        {label}
      </span>
    </motion.div>
  );
}
