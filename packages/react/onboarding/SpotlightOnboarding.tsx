"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Welcome!", desc: "Let's get you started with Modern UI Vault.", target: "top-left" },
  { title: "Browse Components", desc: "Explore 150+ components across 130 categories.", target: "center" },
  { title: "Install via CLI", desc: "Run npx modern-ui-vault add [component] instantly.", target: "bottom-right" },
];
export const SpotlightOnboarding = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [step, setStep] = useState(0); const [active, setActive] = useState(true);
        if (!active) return <button onClick={() => { setActive(true); setStep(0); }} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium cursor-pointer">Start Tour</button>;
        const s = steps[step]; const pos = s.target === "top-left" ? "top-8 left-8" : s.target === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "bottom-8 right-8";
        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-2xl h-64 rounded-2xl bg-zinc-950 border border-white/8 overflow-hidden", className)}>
          <div className="absolute inset-0 bg-black/60 z-10" />
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`absolute ${pos} z-20 w-72 p-5 rounded-2xl bg-zinc-900 border border-white/10`} style={{ boxShadow: "0 0 40px rgba(124,58,237,0.2)" }}>
              <button onClick={() => setActive(false)} className="absolute top-3 right-3 text-zinc-500 hover:text-white cursor-pointer"><X size={14}/></button>
              <div className="flex items-center gap-2 mb-2">{steps.map((_, i) => <div key={i} className={`w-6 h-1 rounded-full ${i <= step ? "bg-violet-500" : "bg-zinc-800"}`} />)}</div>
              <h3 className="text-white font-bold text-sm">{s.title}</h3>
              <p className="text-zinc-400 text-xs mt-1 mb-4">{s.desc}</p>
              <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : setActive(false)} className="flex items-center gap-1 text-xs font-semibold text-violet-400 cursor-pointer">{step < steps.length - 1 ? <>Next <ChevronRight size={12}/></> : "Finish"}</button>
            </motion.div>
          </AnimatePresence>
        </div>
        );
        });
