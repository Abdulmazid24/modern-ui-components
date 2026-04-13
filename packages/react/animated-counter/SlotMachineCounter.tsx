"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

export const SlotMachineCounter = React.forwardRef<any, any>(({ className, value = 8247, label = "Total Users", ...props }, ref) => {
        const digits = String(value).split("").map(Number);
        return (
        <div ref={ref} {...props} className={cn("flex flex-col items-center gap-2", className)}>
          <div className="flex gap-1">
            {digits.map((d, i) => (
              <div key={i} className="relative w-10 h-14 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span key={d} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute inset-0 flex items-center justify-center text-xl font-black text-white font-mono">{d}</motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>
          {label && <span className="text-xs text-zinc-500 font-semibold tracking-widest uppercase">{label}</span>}
        </div>
        );
        });
