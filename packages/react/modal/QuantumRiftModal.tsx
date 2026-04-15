"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Hexagon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantumRiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
    className?: string;
}

export const QuantumRiftModal = React.forwardRef<any, QuantumRiftModalProps>(({ className, isOpen, onClose, title = "QUANTUM ENTANGLEMENT", ...props }, ref) => {
        const [stage, setStage] = useState<"hidden" | "tearing" | "open">("hidden");

        useEffect(() => {
        if (isOpen) {
          setStage("tearing");
          const timer = setTimeout(() => setStage("open"), 800); // Tearing duration
          return () => clearTimeout(timer);
        } else {
          setStage("hidden");
        }
        }, [isOpen]);

        // Generate random particles for the rift sparks
        const sparks = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        delay: Math.random() * 0.8,
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 500,
        size: Math.random() * 4 + 1,
        }));

        return (
        <AnimatePresence>
          {(stage === "tearing" || stage === "open") && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              
              {/* Background Dimmer */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* The Rift (Tear in Reality) */}
              {stage === "tearing" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="h-1 bg-cyan-300 rounded-full shadow-[0_0_50px_10px_rgba(34,211,238,1)]"
                    initial={{ width: 0, scaleY: 1 }}
                    animate={{ width: ["0%", "80%", "100%"], scaleY: [1, 5, 20] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                  />
                  {/* Sparks flying out horizontally */}
                  {sparks.map((spark) => (
                    <motion.div
                      key={spark.id}
                      className="absolute w-2 h-1 bg-white rounded-full mix-blend-screen"
                      style={{ boxShadow: "0 0 10px #22d3ee" }}
                      initial={{ x: 0, y: 0, scale: spark.size }}
                      animate={{ x: spark.x, y: spark.y, opacity: 0, scale: 0 }}
                      transition={{ duration: 1, delay: spark.delay, ease: "easeOut" }}
                    />
                  ))}
                </div>
              )}

              {/* The Actual Modal Box resolving from the rift */}
              {stage === "open" && (
                 <motion.div
                   className="relative z-10 w-full max-w-2xl bg-zinc-950 border-2 border-cyan-500 shadow-[0_0_100px_rgba(34,211,238,0.2)] rounded-2xl overflow-hidden pointer-events-auto"
                   initial={{ height: 10, width: "100%", opacity: 0 }}
                   animate={{ height: "auto", width: "100%", maxWidth: "42rem", opacity: 1 }}
                   exit={{ scaleY: 0, opacity: 0 }}
                   transition={{ type: "spring", stiffness: 200, damping: 20 }}
                 >
                    {/* Stylized Tech Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.3),transparent_70%)]" />
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#22d3ee 1px, transparent 1px)", backgroundSize: "100% 4px" }} />

                    {/* Header */}
                    <div className="relative p-6 flex justify-between items-start border-b border-cyan-500/30">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-cyan-950 border border-cyan-500 rounded-xl rounded-tl-none animate-pulse">
                            <Hexagon className="text-cyan-400" size={24} />
                         </div>
                         <div>
                            <h2 className="text-2xl font-black text-white tracking-widest uppercase">{title}</h2>
                            <span className="text-cyan-500 font-mono text-xs">STATUS: STABLE CONNECTION</span>
                         </div>
                      </div>
                      <button onClick={onClose} className="text-zinc-500 hover:text-cyan-400 transition-colors">
                         <X size={24} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="relative p-8 text-zinc-300 font-mono text-sm leading-relaxed space-y-6">
                       <p>Warning: You have successfully pierced the dimensional veil. Data transfer from Sector Alpha is now active.</p>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-black border border-zinc-800 rounded-lg">
                            <span className="block text-zinc-600 mb-1">RESONANCE</span>
                            <span className="text-xl text-white font-bold inline-flex items-center gap-2">
                              98.7% <Zap size={16} className="text-yellow-400" />
                            </span>
                          </div>
                          <div className="p-4 bg-black border border-zinc-800 rounded-lg">
                            <span className="block text-zinc-600 mb-1">ENTROPY</span>
                            <span className="text-xl text-white font-bold">0.003 ΔS</span>
                          </div>
                       </div>
                       
                       <p className="text-xs text-zinc-500">Ensure stabilization protocols remain active before closing this rift. Unstable closures may result in fragmented data across local timelines.</p>
                    </div>

                    {/* Footer Actions */}
                    <div className="relative p-6 border-t border-cyan-500/30 bg-black/50 flex justify-end gap-4">
                       <button onClick={onClose} className="px-6 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors font-bold uppercase text-xs tracking-widest">
                         Abort
                       </button>
                       <button onClick={onClose} className="px-6 py-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all font-bold uppercase text-xs tracking-widest">
                         Extract Data
                       </button>
                    </div>
                 </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
        );
        });
