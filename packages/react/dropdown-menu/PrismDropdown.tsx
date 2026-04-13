"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings, User, LogOut, Zap } from "lucide-react";
import { cn } from "@/utils";

const menuItems = [
  { icon: <User size={15} />, label: "Profile", shortcut: "⌘P" },
  { icon: <Settings size={15} />, label: "Settings", shortcut: "⌘S" },
  { icon: <Zap size={15} />, label: "Upgrade to Pro", shortcut: "", highlight: true },
  { icon: <LogOut size={15} />, label: "Sign Out", shortcut: "⌘Q", danger: true },
];

export const PrismDropdown = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [open, setOpen] = useState(false);
        const ref = useRef<HTMLDivElement>(null);
        useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
        return (
        <div ref={ref} {...props} className={cn(className)}  ref={ref} className="relative inline-block">
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setOpen(!open)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm font-medium cursor-pointer hover:border-white/20 transition-colors">
            Options <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </motion.button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.15 }} className="absolute top-full mt-2 right-0 w-56 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 py-1.5 z-50" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                {menuItems.map((item, i) => (
                  <button key={i} onClick={() => setOpen(false)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer transition-colors ${item.danger ? "text-red-400 hover:bg-red-500/10" : item.highlight ? "text-violet-400 hover:bg-violet-500/10" : "text-zinc-300 hover:bg-white/5"}`}>
                    {item.icon}<span className="flex-1 text-left">{item.label}</span>{item.shortcut && <span className="text-xs text-zinc-600 font-mono">{item.shortcut}</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        );
        });
