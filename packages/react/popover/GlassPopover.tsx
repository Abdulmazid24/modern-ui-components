"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlassPopover = React.forwardRef<any, any>(({ className, trigger, children, ...props }, ref) => {
        const [open, setOpen] = useState(false);
        const localRef = useRef<HTMLDivElement>(null);
        const handleRef = (node: any) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        };

        useEffect(() => { const h = (e: MouseEvent) => { if (localRef.current && !localRef.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
        return (
        <div ref={handleRef} {...props} className={cn(className)} className="relative inline-block">
          <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-lg bg-zinc-800 border border-white/10 text-white text-sm font-medium cursor-pointer hover:bg-zinc-700 transition-colors">{trigger || "Show Info"}</button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-2xl border border-white/10 z-50" style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(124,58,237,0.1)" }}>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-zinc-900/90 border-r border-b border-white/10" />
                {children || <div><p className="text-white text-sm font-semibold">Glass Popover</p><p className="text-zinc-400 text-xs mt-1">This floating content appears with spring physics and glassmorphism blur effects.</p></div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        );
        });
