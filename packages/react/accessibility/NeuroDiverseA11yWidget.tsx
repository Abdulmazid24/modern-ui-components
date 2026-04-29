"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, X, Type, Contrast, Activity, Eye, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeuroDiverseA11yWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "bottom-left" | "bottom-right";
}

export const NeuroDiverseA11yWidget = React.forwardRef<HTMLDivElement, NeuroDiverseA11yWidgetProps>(
  ({ position = "bottom-left", className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
      highContrast: false,
      dyslexiaFont: false,
      reducedMotion: false,
      largeText: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Apply settings to document body
    useEffect(() => {
      const body = document.body;
      if (settings.highContrast) body.classList.add("a11y-high-contrast"); else body.classList.remove("a11y-high-contrast");
      if (settings.dyslexiaFont) body.classList.add("a11y-dyslexia"); else body.classList.remove("a11y-dyslexia");
      if (settings.reducedMotion) body.classList.add("a11y-reduced-motion"); else body.classList.remove("a11y-reduced-motion");
      if (settings.largeText) body.classList.add("a11y-large-text"); else body.classList.remove("a11y-large-text");
    }, [settings]);

    return (
      <div 
        ref={ref}
        className={cn(
          "fixed z-[100] flex flex-col",
          position === "bottom-left" ? "bottom-8 left-8 items-start" : "bottom-8 right-8 items-end",
          className
        )}
        {...props}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(20px)" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="mb-6 w-80 p-8 rounded-[3rem] bg-zinc-950/80 border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Liquid Background Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-[-50%] bg-gradient-to-tr from-cyan-500 via-transparent to-violet-500 blur-3xl"
                />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-cyan-400" />
                    Adaptive UI
                  </h3>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "dyslexiaFont", label: "Dyslexia Reader", icon: Type, color: "text-amber-400" },
                    { key: "highContrast", label: "Pure Contrast", icon: Contrast, color: "text-emerald-400" },
                    { key: "reducedMotion", label: "Stable Flow", icon: Activity, color: "text-rose-400" },
                    { key: "largeText", label: "Expansive View", icon: Eye, color: "text-blue-400" },
                  ].map((item) => {
                    const active = settings[item.key as keyof typeof settings];
                    const Icon = item.icon;
                    
                    return (
                      <button
                        key={item.key}
                        onClick={() => toggleSetting(item.key as any)}
                        className={cn(
                          "w-full p-4 rounded-2xl border transition-all flex items-center justify-between group",
                          active 
                            ? "bg-white text-black border-white" 
                            : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className={cn("w-5 h-5", active ? "text-black" : item.color)} />
                          <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                        </div>
                        <div className={cn(
                          "w-10 h-6 rounded-full relative transition-colors duration-500",
                          active ? "bg-black" : "bg-zinc-800"
                        )}>
                          <motion.div
                            animate={{ x: active ? 18 : 4 }}
                            className={cn(
                              "absolute top-1 w-4 h-4 rounded-full",
                              active ? "bg-white" : "bg-zinc-600"
                            )}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Neuro-Inclusive Protocol V1.0</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)]",
            isOpen ? "bg-white text-black" : "bg-zinc-950 text-cyan-400 border border-cyan-400/30"
          )}
        >
          <Accessibility className="w-8 h-8" />
        </motion.button>

        {/* Global Styles for the A11y effects */}
        <style dangerouslySetInnerHTML={{ __html: `
          .a11y-dyslexia { font-family: 'OpenDyslexic', sans-serif !important; }
          .a11y-high-contrast { filter: contrast(150%) !important; background: black !important; }
          .a11y-reduced-motion * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
          .a11y-large-text { font-size: 1.25rem !important; }
        `}} />
      </div>
    );
  }
);

NeuroDiverseA11yWidget.displayName = "NeuroDiverseA11yWidget";
