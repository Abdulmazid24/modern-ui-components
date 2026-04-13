"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export const LiquidSwitch = React.forwardRef<any, any>(({ className, defaultChecked = false, onChange, ...props }, ref) => {
        const [on, setOn] = useState(defaultChecked);
        return (
        <button ref={ref} {...props} className={cn(className)} 
          onClick={() => { setOn(!on); onChange?.(!on); }}
          className="relative w-16 h-9 rounded-full cursor-pointer outline-none border-none p-1 transition-colors duration-500"
          style={{ background: on ? "linear-gradient(135deg,#7c3aed,#06b6d4)" : "#27272a" }}
        >
          <motion.div
            className="w-7 h-7 rounded-full bg-white shadow-lg"
            animate={{ x: on ? 28 : 0, scale: on ? 1 : 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            style={{ boxShadow: on ? "0 0 15px rgba(6,182,212,0.5)" : "0 2px 8px rgba(0,0,0,0.3)" }}
          />
          {on && <motion.div className="absolute inset-0 rounded-full pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 1 }} style={{ background: "radial-gradient(circle,rgba(6,182,212,0.4),transparent)" }} />}
        </button>
        );
        });
