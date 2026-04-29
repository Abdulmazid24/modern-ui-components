"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Rotate3d, Maximize, Box, Info, Zap, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpatialModelViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  modelName?: string;
  modelType?: string;
  specs?: Record<string, string>;
}

export const SpatialModelViewer = React.forwardRef<HTMLDivElement, SpatialModelViewerProps>(
  ({ modelName = "Quantum Core V1", modelType = "Engine Component", specs = { "Core Stability": "99.9%", "Energy Output": "1.21 GW", "Material": "Neural Alloy" }, className, ...props }, ref) => {
    const [activeView, setActiveView] = useState<"front" | "side" | "top">("front");
    const [isRotating, setIsRotating] = useState(true);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-200, 200], [30, -30]);
    const rotateY = useTransform(x, [-200, 200], [-30, 30]);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isRotating) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      if (!isRotating) {
        x.set(0);
        y.set(0);
      }
    };

    return (
      <div 
        ref={ref}
        className={cn("relative w-full h-[600px] bg-zinc-950 rounded-[3rem] border border-zinc-800/50 overflow-hidden flex items-center justify-center", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Holographic Grid Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f6_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
        </div>

        {/* 3D Model Representation (Simulated) */}
        <motion.div
          style={{ rotateX, rotateY, perspective: 1000 }}
          animate={isRotating ? { rotateY: [0, 360] } : {}}
          transition={isRotating ? { duration: 20, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 100 }}
          className="relative w-64 h-64 flex items-center justify-center"
        >
          {/* Main Body */}
          <div className="relative w-48 h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[2rem] border-2 border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex items-center justify-center">
            <Box className="w-20 h-20 text-blue-400 opacity-50" />
            
            {/* Energy Core Pulse */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-12 h-12 bg-blue-500 rounded-full blur-2xl"
            />
          </div>

          {/* Orbiting Elements */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full border border-blue-500/20 rounded-full pointer-events-none"
              style={{ rotateZ: i * 60, rotateX: 60 }}
              animate={{ rotateZ: [i * 60, i * 60 + 360] }}
              transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.div>

        {/* UI Overlays */}
        <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none">
          {/* Header Info */}
          <div className="flex justify-between items-start">
            <div className="pointer-events-auto">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">{modelName}</h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  {modelType}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Stabilized
                </span>
              </div>
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button className="p-3 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-zinc-800 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Controls & Specs */}
          <div className="flex justify-between items-end">
            <div className="space-y-4 pointer-events-auto">
              <div className="p-6 rounded-[2rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 w-64 space-y-4">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4" /> Telemetry
                </h3>
                <div className="space-y-2">
                  {Object.entries(specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-[10px]">
                      <span className="text-zinc-500 uppercase font-bold">{key}</span>
                      <span className="text-white font-mono">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pointer-events-auto">
              <button 
                onClick={() => setIsRotating(!isRotating)}
                className={cn(
                  "p-4 rounded-full border transition-all",
                  isRotating ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "bg-zinc-900/80 border-white/10 text-zinc-400"
                )}
              >
                <Rotate3d className="w-6 h-6" />
              </button>
              <div className="flex gap-1 p-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10">
                {["front", "side", "top"].map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view as any)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                      activeView === view ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                    )}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
      </div>
    );
  }
);

SpatialModelViewer.displayName = "SpatialModelViewer";
