"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../utils";

const ORBIT_SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;
const ORBIT_RADIUS = 70;

export interface FloatAction { readonly id: string; readonly icon: React.ReactNode; readonly label: string; readonly onClick?: () => void; }
export interface OrbitingFloatButtonProps { readonly actions: readonly FloatAction[]; readonly icon?: React.ReactNode; readonly className?: string; }

/** OrbitingFloatButton — A FAB that explodes into orbiting action buttons arranged in a semicircle with spring physics. */
export const OrbitingFloatButton = React.forwardRef<HTMLDivElement, OrbitingFloatButtonProps>(
  ({ className, actions, icon, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div ref={ref} {...props} className={cn("fixed bottom-6 right-6 z-50", className)}>
        <AnimatePresence>
          {isOpen && actions.map((action, i) => {
            const angle = (Math.PI / 2) + (i / (actions.length - 1 || 1)) * Math.PI;
            const x = Math.cos(angle) * ORBIT_RADIUS;
            const y = Math.sin(angle) * -ORBIT_RADIUS;
            return (
              <motion.button key={action.id} onClick={() => { action.onClick?.(); setIsOpen(false); }}
                className="absolute bottom-0 right-0 w-11 h-11 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-violet-600 hover:border-violet-500 transition-colors cursor-pointer shadow-lg group"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x, y: y - 28, scale: 1, opacity: 1 }}
                exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                transition={{ ...ORBIT_SPRING, delay: i * 0.05 }}
                title={action.label}>
                {action.icon}
                <span className="absolute right-full mr-3 px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{action.label}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
        <motion.button onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:bg-violet-500 transition-colors cursor-pointer"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={ORBIT_SPRING}>
          {icon ?? <Plus size={24} />}
        </motion.button>
      </div>
    );
  }
);
OrbitingFloatButton.displayName = "OrbitingFloatButton";
