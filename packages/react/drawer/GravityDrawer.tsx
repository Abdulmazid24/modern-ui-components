"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Home, Settings, BarChart3, Users } from "lucide-react";
const nav = [{ icon: <Home size={18}/>, label: "Home" },{ icon: <BarChart3 size={18}/>, label: "Analytics" },{ icon: <Users size={18}/>, label: "Team" },{ icon: <Settings size={18}/>, label: "Settings" }];
export const GravityDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-[300px] flex items-center justify-center">
      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOpen(true)} className="p-3 rounded-xl bg-zinc-800 border border-white/10 text-white cursor-pointer"><Menu size={20} /></motion.button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-zinc-900 border-r border-white/8 z-50 p-6">
              <div className="flex items-center justify-between mb-8"><h2 className="text-white font-bold text-lg">Navigation</h2><button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white cursor-pointer"><X size={18} /></button></div>
              <div className="space-y-1">{nav.map((item, i) => (
                <motion.button key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors cursor-pointer">{item.icon}{item.label}</motion.button>
              ))}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
