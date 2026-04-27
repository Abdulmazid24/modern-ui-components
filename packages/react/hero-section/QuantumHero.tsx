"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "../utils";

export interface QuantumHeroProps {
  readonly badge?: string;
  readonly title: React.ReactNode;
  readonly highlight?: string;
  readonly description: React.ReactNode;
  readonly primaryCta?: { label: string; onClick?: () => void; href?: string };
  readonly secondaryCta?: { label: string; onClick?: () => void; href?: string };
  readonly visual?: React.ReactNode;
  readonly className?: string;
}

const SPRING_TRANSITION = { type: "spring", stiffness: 200, damping: 20 } as const;

/** QuantumHero — 2026-style "Content-first" Kinetic Hero with Cyber-Gradients, staggered reveals, and floating visual slot. */
export const QuantumHero = React.forwardRef<HTMLElement, QuantumHeroProps>(
  ({ className, badge, title, highlight, description, primaryCta, secondaryCta, visual, ...props }, ref) => {
    return (
      <section ref={ref} {...props} className={cn("relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24", className)}>
        {/* Cyber-Gradient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-2xl">
              
              {badge && (
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={SPRING_TRANSITION}>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    {badge}
                  </span>
                </motion.div>
              )}

              <motion.h1 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={SPRING_TRANSITION}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                {title}{" "}
                {highlight && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 animate-gradient-x">
                    {highlight}
                  </span>
                )}
              </motion.h1>

              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={SPRING_TRANSITION}
                className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-8 max-w-xl">
                {description}
              </motion.p>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={SPRING_TRANSITION}
                className="flex flex-wrap items-center gap-4">
                {primaryCta && (
                  <button onClick={primaryCta.onClick} className="group relative px-8 py-3.5 bg-white text-black font-semibold rounded-2xl overflow-hidden hover:scale-105 transition-transform active:scale-95">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      {primaryCta.label}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                )}
                
                {secondaryCta && (
                  <button onClick={secondaryCta.onClick} className="px-8 py-3.5 bg-zinc-900 border border-zinc-800 text-white font-semibold rounded-2xl hover:bg-zinc-800 hover:border-zinc-700 transition-colors active:scale-95">
                    {secondaryCta.label}
                  </button>
                )}
              </motion.div>
            </motion.div>

            {/* Visual Slot */}
            {visual && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }} 
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
                className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px]">
                {visual}
              </motion.div>
            )}

          </div>
        </div>
      </section>
    );
  }
);
QuantumHero.displayName = "QuantumHero";
