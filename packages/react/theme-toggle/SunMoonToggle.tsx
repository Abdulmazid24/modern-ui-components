"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
const modes = [{ id: "light", icon: <Sun size={16}/> }, { id: "dark", icon: <Moon size={16}/> }, { id: "system", icon: <Monitor size={16}/> }];
export const SunMoonToggle: React.FC<{ onChange?: (mode: string) => void }> = ({ onChange }) => {
  const [active, setActive] = useState("dark");
  return (
    <div className="flex p-1 rounded-xl bg-zinc-900 border border-white/8 gap-0.5">
      {modes.map((m) => (
        <button key={m.id} onClick={() => { setActive(m.id); onChange?.(m.id); }} className="relative px-3 py-2 rounded-lg text-sm cursor-pointer z-10 transition-colors" style={{ color: active === m.id ? "#fff" : "#71717a" }}>
          {active === m.id && <motion.div layoutId="theme-bg" className="absolute inset-0 rounded-lg bg-zinc-800 border border-white/10" transition={{ type: "spring", stiffness: 400, damping: 25 }} />}
          <span className="relative z-10 flex items-center gap-1.5">{m.icon}</span>
        </button>
      ))}
    </div>
  );
};
