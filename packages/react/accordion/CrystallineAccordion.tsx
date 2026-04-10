"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface CrystallineAccordionProps {
  items: AccordionItem[];
}

export const CrystallineAccordion: React.FC<CrystallineAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-lg">
            
            {/* Header */}
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full relative z-20 flex items-center justify-between p-5 bg-zinc-900/50 hover:bg-zinc-800/80 backdrop-blur-md transition-colors"
            >
              <span className="font-bold text-zinc-100 tracking-wide">{item.title}</span>
              <motion.div
                animate={{ rotate: openId === item.id ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-inner"
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
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="relative overflow-hidden"
                >
                  {/* The Crystalline Shatter Effect inside the content specifically upon entry */}
                  <motion.div 
                    className="absolute inset-0 z-0 pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <CrystalShards />
                  </motion.div>

                  <div className="relative z-10 p-6 pt-2 text-zinc-400 leading-relaxed border-t border-zinc-900/50 bg-zinc-950/80">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

// Component building random "crystal shards" that fly apart
const CrystalShards = () => {
  // We use standard clip-paths to make shard triangles and randomize their exit trajectory
  const shards = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 flex flex-wrap">
      {shards.map((_, i) => {
        // Random exit vectors
        const xDir = Math.random() > 0.5 ? 1 : -1;
        const yDir = Math.random() > 0.5 ? 1 : -1;
        
        return (
          <motion.div
            key={i}
            className="w-1/4 h-1/2 bg-cyan-500 border border-cyan-300 backdrop-blur-3xl"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", 
              opacity: 0.3
            }}
            initial={{ scale: 1, x: 0, y: 0, rotate: 0 }}
            animate={{ 
              scale: 0, 
              x: Math.random() * 200 * xDir, 
              y: Math.random() * 100 * yDir,
              rotate: Math.random() * 180 * xDir
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20, mass: 2 }}
          />
        );
      })}
    </div>
  );
};
