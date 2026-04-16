"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils";

interface MegaMenuItem {
  title: string;
  content: React.ReactNode;
}

interface StripeMegaMenuProps {
  items: MegaMenuItem[];
  className?: string;
}

/**
 * A sophisticated navigation system where the dropdown container 
 * smoothly morphs its dimensions to match the sub-menu content.
 */
export const StripeMegaMenu = ({ items, className }: StripeMegaMenuProps) => {
  const [active, setActive] = useState<number | null>(null);
  const [dir, setDir] = useState<"l" | "r" | null>(null);

  const handleEnter = (index: number) => {
    if (active !== null) {
      setDir(index > active ? "r" : "l");
    }
    setActive(index);
  };

  const handleLeave = () => {
    setActive(null);
    setDir(null);
  };

  return (
    <nav 
      onMouseLeave={handleLeave}
      className={cn("relative flex items-center justify-center gap-8 px-8 py-4 bg-zinc-950 border border-zinc-900 rounded-2xl", className)}
    >
      <LayoutGroup id="mega-menu">
        {items.map((item, idx) => (
          <div
            key={item.title}
            onMouseEnter={() => handleEnter(idx)}
            className="relative"
          >
            <button className="flex items-center gap-1.5 text-sm font-bold text-zinc-400 hover:text-white transition-colors py-2 group">
              {item.title}
              <ChevronDown 
                size={14} 
                className={cn("transition-transform duration-300", active === idx && "rotate-180")} 
              />
            </button>

            <AnimatePresence>
              {active === idx && (
                <motion.div
                  layoutId="menu-container"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 origin-top"
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden min-w-[200px]">
                     <motion.div
                       initial={{ x: dir === "r" ? 20 : dir === "l" ? -20 : 0, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ duration: 0.2 }}
                       className="p-6"
                     >
                        {item.content}
                     </motion.div>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-l border-t border-zinc-800 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </LayoutGroup>
    </nav>
  );
};

// Example sub-menu for the registry test
export const MegaMenuContent = () => (
    <div className="grid grid-cols-2 gap-8 w-[400px]">
        <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Products</h4>
            <ul className="space-y-2">
                <li className="text-sm font-bold hover:text-purple-400 cursor-pointer transition-colors">Digital Vault</li>
                <li className="text-sm font-bold hover:text-purple-400 cursor-pointer transition-colors">Quantum API</li>
            </ul>
        </div>
        <div className="space-y-4 font-mono text-[10px] text-zinc-600">
            <p>High-performance component architecture for React dev ecosystems.</p>
        </div>
    </div>
);
