"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

const options = [
  { id: "starter", label: "Starter", desc: "For individuals" },
  { id: "pro", label: "Pro", desc: "For teams" },
  { id: "enterprise", label: "Enterprise", desc: "Custom scale" },
];

export const NeonRadioGroup = React.forwardRef<any, any>(({ className, items = options, onChange, ...props }, ref) => {
        const [selected, setSelected] = useState(items[0].id);
        return (
        <div ref={ref} {...props} className={cn("flex flex-col gap-3 w-full max-w-sm", className)}>
          {items.map((item) => {
            const isSelected = selected === item.id;
            return (
              <motion.button key={item.id} onClick={() => { setSelected(item.id); onChange?.(item.id); }}
                className="relative flex items-center gap-4 p-4 rounded-xl border cursor-pointer text-left transition-all"
                animate={{ borderColor: isSelected ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)", background: isSelected ? "rgba(124,58,237,0.08)" : "rgba(24,24,27,0.5)" }}
              >
                <div className="relative w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: isSelected ? "#7c3aed" : "#52525b" }}>
                  <AnimatePresence>{isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-2.5 h-2.5 rounded-full bg-violet-500" style={{ boxShadow: "0 0 10px rgba(124,58,237,0.8)" }} />}</AnimatePresence>
                </div>
                <div><p className="text-sm font-semibold text-white">{item.label}</p><p className="text-xs text-zinc-500">{item.desc}</p></div>
                {isSelected && <motion.div layoutId="radio-glow" className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: "0 0 20px rgba(124,58,237,0.15)" }} />}
              </motion.button>
            );
          })}
        </div>
        );
        });
