"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const FEATURES = [
  { title: "Velocity", desc: "Ship to production in milliseconds.", colSpan: "col-span-1 md:col-span-2", delay: 0.1 },
  { title: "Physics", desc: "Spring animations built into the core.", colSpan: "col-span-1", delay: 0.2 },
  { title: "Type-Safe", desc: "100% strict TypeScript compliance.", colSpan: "col-span-1", delay: 0.4 },
  { title: "Glassmorphic", desc: "Real-time blur and volumetric lighting.", colSpan: "col-span-1 md:col-span-2", delay: 0.3 },
];

export function KineticBentoGrid({ className }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={cn("w-full py-24 bg-neutral-950", className)}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-16 text-center">
          <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-4xl md:text-5xl font-black text-white tracking-tighter"
          >
            Feature Origami.
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
          {FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              // Origami unfold animation
              initial={{ opacity: 0, rotateX: 90, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: feat.delay, 
                type: "spring", 
                bounce: 0.4 
              }}
              whileHover={{ 
                 scale: 1.02, 
                 zIndex: 10,
                 boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                 backgroundColor: "rgba(255,255,255,0.05)" 
              }}
              className={cn(
                "relative group flex flex-col justify-end min-h-[250px] p-8 rounded-3xl bg-neutral-900 border border-white/5 overflow-hidden origin-bottom transition-colors",
                feat.colSpan
              )}
            >
              {/* Internal abstract graphic */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700 ease-out" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-neutral-400">{feat.desc}</p>
              </div>

              {/* Hover Line Expansion */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
