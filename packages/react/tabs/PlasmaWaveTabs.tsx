"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

const defaultTabs: Tab[] = [
  { id: "design", label: "Design" },
  { id: "develop", label: "Develop" },
  { id: "deploy", label: "Deploy" },
  { id: "monitor", label: "Monitor" },
];

export const PlasmaWaveTabs = React.forwardRef<any, any>(({ className, tabs = defaultTabs, ...props }, ref) => {
        const [active, setActive] = useState(tabs[0].id);

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-lg mx-auto p-6", className)}>
          <div className="relative flex bg-zinc-900/80 rounded-2xl p-1.5 border border-white/5 backdrop-blur-xl">
            {tabs.map((tab, i) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="relative flex-1 py-3 px-4 text-sm font-semibold tracking-wide z-10 transition-colors duration-300 cursor-pointer"
                  style={{ color: isActive ? "#fff" : "#71717a" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="plasma-tab-bg"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(236,72,153,0.4))",
                        boxShadow: "0 0 30px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                      layoutId="plasma-indicator"
                      style={{
                        background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                        boxShadow: "0 0 12px rgba(124,58,237,0.8)",
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
              className="mt-6 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 text-white/70 text-sm min-h-[80px]"
            >
              {tabs.find((t) => t.id === active)?.content || (
                <p>Content for <span className="text-white font-bold">{tabs.find((t) => t.id === active)?.label}</span> tab</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        );
        });
