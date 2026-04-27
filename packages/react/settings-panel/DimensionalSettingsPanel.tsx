"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

export interface SettingsCategory {
  readonly id: string;
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly content: React.ReactNode;
}

export interface DimensionalSettingsPanelProps {
  readonly title?: string;
  readonly description?: string;
  readonly categories: readonly SettingsCategory[];
  readonly defaultCategory?: string;
  readonly className?: string;
}

/** DimensionalSettingsPanel — Advanced settings layout with smooth category transitions and animated sidebar active state. */
export const DimensionalSettingsPanel = React.forwardRef<HTMLDivElement, DimensionalSettingsPanelProps>(
  ({ className, title = "Settings", description = "Manage your account preferences and configurations.", categories, defaultCategory, ...props }, ref) => {
    const [activeId, setActiveId] = useState<string>(defaultCategory || categories[0]?.id || "");

    const activeCategory = categories.find(c => c.id === activeId);

    return (
      <div ref={ref} {...props} className={cn("max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-8 lg:gap-12", className)}>
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">{title}</h2>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>
          
          <nav className="flex flex-col gap-1 relative">
            {categories.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveId(category.id)}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left z-10",
                    isActive ? "text-violet-100" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                  )}
                >
                  {category.icon && <span className={cn("transition-colors", isActive ? "text-violet-400" : "text-zinc-500")}>{category.icon}</span>}
                  {category.label}
                  
                  {isActive && (
                    <motion.div 
                      layoutId="settings-active-bg"
                      className="absolute inset-0 bg-violet-500/10 border border-violet-500/20 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle gradient glow in the corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {activeCategory?.content}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }
);
DimensionalSettingsPanel.displayName = "DimensionalSettingsPanel";
