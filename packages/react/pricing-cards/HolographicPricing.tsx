"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FEATURES_FREE = [
  "10 Basic Components",
  "Community Support",
  "1 Project License",
  "Light Theme Only"
];

const FEATURES_PRO = [
  "170+ Premium Components",
  "Priority Support 24/7",
  "Unlimited Projects",
  "Dark & Light Themes",
  "Framer Motion Physics",
  "Source Code Access"
];

export function HolographicPricing({ className }: { className?: string }) {
  const [hoveredCard, setHoveredCard] = useState<"free" | "pro" | null>(null);

  const freeGlitch = hoveredCard === "pro";

  return (
    <section className={cn("relative w-full py-32 bg-black overflow-hidden perspective-1000", className)}>
      <div className="text-center mb-24 relative z-20">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
          Invest in Velocity.
        </h2>
        <p className="mt-4 text-neutral-400">Unlock the actual future of web design.</p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 relative z-20">
        
        {/* FREE TIER CARD */}
        <motion.div
          animate={{
            scale: freeGlitch ? 0.95 : 1,
            opacity: freeGlitch ? 0.3 : 1,
            rotateY: freeGlitch ? -15 : 0,
            rotateX: freeGlitch ? 5 : 0,
            filter: freeGlitch ? "blur(4px) grayscale(100%)" : "blur(0px) grayscale(0%)",
          }}
          transition={{ duration: 0.4 }}
          onHoverStart={() => setHoveredCard("free")}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative w-full max-w-sm p-8 rounded-3xl bg-neutral-900 border border-white/10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glitch Overlay */}
          {freeGlitch && (
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPqxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50 mix-blend-overlay" />
          )}
          
          <h3 className="text-xl font-bold text-neutral-400">Hobbyist</h3>
          <div className="mt-4 flex items-baseline text-white">
            <span className="text-5xl font-black tracking-tight">$0</span>
            <span className="ml-1 text-neutral-500 font-medium">/forever</span>
          </div>
          <p className="mt-4 text-sm text-neutral-500">For playing around and learning the basics.</p>

          <ul className="mt-8 space-y-4">
            {FEATURES_FREE.map((f) => (
              <li key={f} className="flex items-center text-sm text-neutral-400 gap-3">
                <svg className="w-4 h-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                {f}
              </li>
            ))}
          </ul>
          
          <button className="mt-10 w-full rounded-full border border-white/10 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
            Get Started
          </button>
        </motion.div>

        {/* PRO TIER CARD (HOLOGRAPHIC) */}
        <motion.div
          animate={{
            scale: hoveredCard === "pro" ? 1.05 : 1,
            rotateY: hoveredCard === "free" ? 15 : 0,
            rotateX: hoveredCard === "free" ? 5 : 0,
            opacity: hoveredCard === "free" ? 0.3 : 1,
            filter: hoveredCard === "free" ? "blur(4px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4 }}
          onHoverStart={() => setHoveredCard("pro")}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative w-full max-w-sm p-8 rounded-3xl bg-neutral-900 border border-violet-500/30 overflow-hidden group"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Volumetric Holographic Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Sweeping Highlight */}
          <div className="absolute top-0 -left-[100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 group-hover:left-[200%] transition-all duration-1000 ease-in-out" />

          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Enterprise Vault</h3>
              <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold ring-1 ring-violet-500/50">
                RECOMMENDED
              </span>
            </div>
            
            <div className="mt-4 flex items-baseline text-white">
              <span className="text-5xl font-black tracking-tight">$99</span>
              <span className="ml-1 text-neutral-400 font-medium">/lifetime</span>
            </div>
            <p className="mt-4 text-sm text-neutral-300">Access to every component, forever. Build faster.</p>

            <ul className="mt-8 space-y-4">
              {FEATURES_PRO.map((f) => (
                <li key={f} className="flex items-center text-sm text-white gap-3 font-medium">
                  <svg className="w-4 h-4 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            
            <button className="relative mt-10 w-full rounded-full bg-white py-3 text-sm font-bold text-black hover:scale-105 transition-transform overflow-hidden">
              <span className="relative z-10">Unlock The Vault</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Global Background Glow */}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 pointer-events-none",
          hoveredCard === "pro" ? "bg-violet-600/30 blur-[150px] scale-110" : "bg-blue-600/10"
        )} 
      />
    </section>
  );
}
