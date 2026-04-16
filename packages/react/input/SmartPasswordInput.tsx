"use client";

import React, { useState } from "react";
import { Eye, EyeOff, X, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

interface SmartPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * A functional premium password input with visibility toggles and real-time validation.
 */
export const SmartPasswordInput = ({ label, className, value, ...props }: SmartPasswordInputProps) => {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState("");

  const strength = val.length === 0 ? 0 : val.length < 6 ? 1 : val.length < 10 ? 2 : 3;
  const strengthColors = ["bg-zinc-800", "bg-red-500", "bg-amber-500", "bg-emerald-500"];

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">{label}</label>}
      <div className="relative group">
        <input
          type={show ? "text" : "password"}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono"
          {...props}
        />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {val && (
               <button onClick={() => setVal("")} className="text-zinc-600 hover:text-white transition-colors">
                  <X size={16} />
               </button>
            )}
            <button onClick={() => setShow(!show)} className="text-zinc-600 hover:text-white transition-colors">
               {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
      </div>

      {/* Strength Indicator */}
      <div className="flex gap-1 h-1 w-full px-1">
         {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={cn("flex-1 rounded-full transition-all duration-500", i < strength ? strengthColors[strength] : "bg-zinc-900")} />
         ))}
      </div>
      
      <div className="flex items-center justify-between px-1">
         <p className="text-[10px] font-bold text-zinc-600">
            {strength === 0 ? "Enter password" : strength === 3 ? "Strong security" : "Increasing complexity..."}
         </p>
         {strength === 3 && <ShieldCheck size={12} className="text-emerald-500" />}
      </div>
    </div>
  );
};
