"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface CrystallineAccordionProps {
  items: AccordionItem[];
  className?: string;
  accentColor?: string;
}

export const CrystallineAccordion = React.forwardRef<HTMLDivElement, CrystallineAccordionProps>(
  ({ className, items, accentColor = "#00f2ff" }, ref) => {
    const [openId, setOpenId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
      setOpenId(openId === id ? null : id);
    };

    return (
      <div ref={ref} className={cn("w-full max-w-2xl flex flex-col gap-6", className)}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group relative"
            style={{ 
              clipPath: "polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)" 
            }}
          >
            {/* Shimmer / Prism Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/5 opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden shadow-[0_0_30px_rgba(0,242,255,0.05)]">
              
              {/* Header */}
              <button
                onClick={() => handleToggle(item.id)}
                className="w-full relative z-20 flex items-center justify-between p-6 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="text-cyan-400">
                    <Zap size={20} className={openId === item.id ? "animate-pulse" : ""} />
                  </div>
                  <span className={cn(
                    "text-lg font-black italic tracking-tighter uppercase transition-all duration-300",
                    openId === item.id ? "text-white scale-110" : "text-zinc-500"
                  )}>
                    {item.title}
                  </span>
                </div>
                
                <motion.div
                  animate={{ 
                    rotate: openId === item.id ? 180 : 0,
                    scale: openId === item.id ? 1.2 : 1,
                    color: openId === item.id ? accentColor : "#52525b" 
                  }}
                  className="p-1 rounded bg-white/5 border border-white/10"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* Content Area */}
              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="relative overflow-hidden"
                  >
                    {/* High-Velocity Shatter Effect */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
                    
                    <motion.div 
                      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                    >
                       <CrystalShards />
                    </motion.div>

                    <div className="relative z-10 p-8 pt-2 text-zinc-300 font-medium leading-relaxed">
                      <div className="p-4 border-l-2 border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
                         {item.content}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

CrystallineAccordion.displayName = "CrystallineAccordion";

const CrystalShards = () => {
  const shards = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {shards.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 border border-white/40"
          style={{
            width: Math.random() * 40 + 10,
            height: Math.random() * 40 + 10,
            clipPath: `polygon(${Math.random()*100}% 0%, 100% ${Math.random()*100}%, 0% 100%)`,
          }}
          initial={{ scale: 0.2, opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 300,
            rotate: Math.random() * 720
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: Math.random() * 0.2 
          }}
        />
      ))}
    </div>
  );
};
