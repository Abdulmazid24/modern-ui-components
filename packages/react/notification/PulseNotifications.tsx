"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, MessageSquare, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const notifs = [
  { id: 1, icon: <MessageSquare size={16}/>, title: "New comment", desc: "Sarah replied to your post", time: "2m ago", color: "#3b82f6" },
  { id: 2, icon: <Zap size={16}/>, title: "Upgrade available", desc: "Pro plan is 50% off today", time: "1h ago", color: "#f59e0b" },
  { id: 3, icon: <Check size={16}/>, title: "Deploy success", desc: "Production build completed", time: "3h ago", color: "#10b981" },
];
export const PulseNotifications = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [open, setOpen] = useState(false); const [items, setItems] = useState(notifs);
        return (
        <div ref={ref} {...props} className={cn("relative inline-block", className)}>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(!open)} className="relative p-3 rounded-xl bg-zinc-900 border border-white/10 text-white cursor-pointer">
            <Bell size={20} />
            {items.length > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center">{items.length}</motion.span>}
          </motion.button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 overflow-hidden z-50" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between"><h3 className="text-white text-sm font-bold">Notifications</h3><button onClick={() => setItems([])} className="text-xs text-violet-400 cursor-pointer">Clear all</button></div>
                <div className="max-h-64 overflow-y-auto">
                  {items.length > 0 ? items.map((n, i) => (
                    <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors border-b border-white/3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${n.color}20`, color: n.color }}>{n.icon}</div>
                      <div className="flex-1 min-w-0"><p className="text-sm text-white font-medium">{n.title}</p><p className="text-xs text-zinc-500 truncate">{n.desc}</p></div>
                      <span className="text-[10px] text-zinc-600 flex-shrink-0">{n.time}</span>
                    </motion.div>
                  )) : <div className="py-8 text-center text-sm text-zinc-600">All caught up! 🎉</div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        );
        });
