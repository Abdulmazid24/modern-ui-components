"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export const NeonCountdown = React.forwardRef<any, any>(({ className, target = new Date(Date.now() + 86400000), ...props }, ref) => {
        const calc = () => { const diff = Math.max(0, target.getTime() - Date.now()); return { d: Math.floor(diff/86400000), h: Math.floor(diff%86400000/3600000), m: Math.floor(diff%3600000/60000), s: Math.floor(diff%60000/1000) }; };
        const [time, setTime] = useState(calc());
        useEffect(() => { const t = setInterval(() => setTime(calc()), 1000); return () => clearInterval(t); }, []);
        const units = [{ v: time.d, l: "Days" }, { v: time.h, l: "Hours" }, { v: time.m, l: "Minutes" }, { v: time.s, l: "Seconds" }];
        return (
        <div ref={ref} {...props} className={cn("flex items-center gap-3", className)}>
          {units.map((u, i) => (
            <React.Fragment key={u.l}>
              <div className="flex flex-col items-center">
                <motion.div key={u.v} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-16 h-16 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center" style={{ boxShadow: "0 0 15px rgba(124,58,237,0.15)" }}>
                  <span className="text-2xl font-black text-white font-mono">{String(u.v).padStart(2, "0")}</span>
                </motion.div>
                <span className="text-[10px] text-zinc-500 mt-1.5 font-semibold tracking-wider uppercase">{u.l}</span>
              </div>
              {i < 3 && <span className="text-xl text-violet-500 font-bold mt-[-12px]">:</span>}
            </React.Fragment>
          ))}
        </div>
        );
        });
