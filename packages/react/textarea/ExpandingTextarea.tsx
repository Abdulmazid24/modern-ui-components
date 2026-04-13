"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export const ExpandingTextarea = React.forwardRef<any, any>(({ className, placeholder = "Write something amazing...", onChange, ...props }, ref) => {
        const [value, setValue] = useState("");
        const [focused, setFocused] = useState(false);
        const ref = useRef<HTMLTextAreaElement>(null);
        useEffect(() => { if (ref.current) { ref.current.style.height = "auto"; ref.current.style.height = Math.max(80, ref.current.scrollHeight) + "px"; } }, [value]);
        return (
        <div ref={ref} {...props} className={cn("w-full max-w-md", className)}>
          <motion.div className="relative rounded-xl overflow-hidden" animate={{ boxShadow: focused ? "0 0 0 2px rgba(124,58,237,0.5), 0 0 20px rgba(124,58,237,0.15)" : "0 0 0 1px rgba(255,255,255,0.08)" }} transition={{ duration: 0.2 }}>
            <textarea ref={ref} value={value} onChange={(e) => { setValue(e.target.value); onChange?.(e.target.value); }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} className="w-full min-h-[80px] max-h-[300px] p-4 bg-zinc-900/80 text-white text-sm resize-none outline-none placeholder:text-zinc-600 transition-all" />
          </motion.div>
          <div className="flex justify-between mt-2 px-1"><span className="text-xs text-zinc-600">{value.length} characters</span>{value.length > 0 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-500">Auto-saving...</motion.span>}</div>
        </div>
        );
        });
