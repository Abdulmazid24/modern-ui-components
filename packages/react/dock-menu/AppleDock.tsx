"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, User, Settings, Zap } from "lucide-react";
import { cn } from "@/utils";

const items = [{ icon: <Home size={20}/>, label: "Home" }, { icon: <Search size={20}/>, label: "Search" }, { icon: <Bell size={20}/>, label: "Alerts" }, { icon: <User size={20}/>, label: "Profile" }, { icon: <Settings size={20}/>, label: "Settings" }];
export const AppleDock = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [hovered, setHovered] = useState<number | null>(null);
        return (
        <div ref={ref} {...props} className={cn("flex items-end gap-1.5 px-4 py-3 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 mx-auto", className)} style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
          {items.map((item, i) => {
            const dist = hovered !== null ? Math.abs(hovered - i) : 999;
            const scale = hovered !== null ? Math.max(1, 1.4 - dist * 0.2) : 1;
            return (
              <motion.button key={i} animate={{ scale, y: scale > 1 ? -(scale - 1) * 20 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors">
                {item.icon}
                <AnimatePresence>{hovered === i && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -top-8 px-2 py-1 rounded-lg bg-zinc-800 text-xs text-white font-medium whitespace-nowrap">{item.label}</motion.div>}</AnimatePresence>
              </motion.button>
            );
          })}
        </div>
        );
        });
