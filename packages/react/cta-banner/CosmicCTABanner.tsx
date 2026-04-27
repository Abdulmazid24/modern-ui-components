"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "../utils";

export interface CosmicCTABannerProps {
  readonly title: React.ReactNode;
  readonly description?: React.ReactNode;
  readonly primaryCta: { label: string; onClick?: () => void };
  readonly secondaryCta?: { label: string; onClick?: () => void };
  readonly badge?: string;
  readonly className?: string;
}

/** CosmicCTABanner — High-conversion Call-To-Action banner with animated cyber-gradients and floating light orbs. */
export const CosmicCTABanner = React.forwardRef<HTMLDivElement, CosmicCTABannerProps>(
  ({ className, title, description, primaryCta, secondaryCta, badge, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn("relative overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-zinc-800 p-8 md:p-16 lg:p-20 text-center shadow-2xl", className)}>
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 opacity-40">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5], rotate: [0, 90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4], rotate: [0, -90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {badge && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium mb-6 backdrop-blur-md">
              <Sparkles size={14} className="text-violet-400" />
              {badge}
            </motion.div>
          )}

          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            {title}
          </motion.h2>

          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-2xl">
              {description}
            </motion.p>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            
            <button onClick={primaryCta.onClick} className="w-full sm:w-auto group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                {primaryCta.label}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            {secondaryCta && (
              <button onClick={secondaryCta.onClick} className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-700 text-white font-semibold rounded-2xl hover:bg-zinc-800 hover:border-zinc-600 transition-colors active:scale-95">
                {secondaryCta.label}
              </button>
            )}

          </motion.div>
        </div>
      </div>
    );
  }
);
CosmicCTABanner.displayName = "CosmicCTABanner";
