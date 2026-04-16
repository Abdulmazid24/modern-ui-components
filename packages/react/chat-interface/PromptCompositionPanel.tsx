"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Send, Cpu, Sliders, X } from "lucide-react";
import { cn } from "../utils";

interface Chip {
  id: string;
  label: string;
  color: string;
}

/**
 * A futuristic UI for composing complex AI prompts.
 * Supports variable chips and real-time computation visuals.
 */
export const PromptCompositionPanel = ({ className }: { className?: string }) => {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState<Chip[]>([]);

  const addChip = (label: string, color: string) => {
    setChips([...chips, { id: Math.random().toString(), label, color }]);
  };

  const removeChip = (id: string) => {
    setChips(chips.filter(c => c.id !== id));
  };

  const complexity = Math.min(100, (input.length / 500) * 100);

  return (
    <div className={cn("w-full max-w-3xl bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden", className)}>
      <div className="bg-zinc-900/40 backdrop-blur-3xl p-6 rounded-[2.2rem]">
         
         {/* Complexity Bar */}
         <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
               <Cpu size={14} className="text-zinc-500" />
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Compute Intensity</span>
            </div>
            <span className="text-[10px] font-mono text-purple-400">{Math.round(complexity)}%</span>
         </div>
         <div className="w-full h-1 bg-zinc-800 rounded-full mb-8 overflow-hidden">
            <motion.div 
               animate={{ width: `${complexity}%` }}
               className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
         </div>

         {/* Chip Area */}
         <div className="flex flex-wrap gap-2 mb-4">
            <AnimatePresence>
               {chips.map((chip) => (
                  <motion.div
                     key={chip.id}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold text-white border", chip.color)}
                  >
                     {chip.label}
                     <button onClick={() => removeChip(chip.id)}><X size={12} /></button>
                  </motion.div>
               ))}
            </AnimatePresence>
            
            <button 
              onClick={() => addChip("Context: User", "bg-blue-500/20 border-blue-500/50")}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold text-zinc-500 border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
               <Plus size={12} /> Add Context
            </button>
         </div>

         {/* Input Area */}
         <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your reasoning model or agent intent..."
            className="w-full min-h-[150px] bg-transparent text-zinc-200 outline-none resize-none placeholder:text-zinc-800 font-mono text-sm leading-relaxed"
         />

         {/* Footer Actions */}
         <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-900">
            <div className="flex gap-4">
               <button className="text-zinc-600 hover:text-zinc-300 transition-colors"><Sliders size={18} /></button>
            </div>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               Initialize Model <Send size={14} />
            </button>
         </div>
      </div>
    </div>
  );
};
