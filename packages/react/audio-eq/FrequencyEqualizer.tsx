"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export const FrequencyEqualizer = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [bands, setBands] = useState<number[]>(Array(16).fill(10));

        // Simulating an audio spectrum analyzer reacting to music
        useEffect(() => {
        const interval = setInterval(() => {
           setBands(prev => 
             prev.map(() => {
                // Generate a random height percentage between 5% and 100%
                const r = Math.random();
                // Bias it slightly towards lower numbers for realistic audio hum
                const bias = r * r * 100;
                return Math.max(5, bias);
             })
           );
        }, 100); // Super fast 100ms updates to feel like live audio frames
        return () => clearInterval(interval);
        }, []);

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-lg h-64 bg-zinc-950 border border-zinc-900 rounded-3xl p-8 flex flex-col justify-end gap-2 shadow-[0_0_40px_rgba(34,211,238,0.1)] relative overflow-hidden group", className)}>
           
           {/* Background Grid Ambience */}
           <div 
             className="absolute inset-0 pointer-events-none opacity-10"
             style={{
               backgroundImage: 'linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}
           />

           {/* Top readout faux text */}
           <div className="absolute top-6 left-6 text-cyan-400 font-mono text-[10px] tracking-widest font-bold uppercase opacity-50 group-hover:opacity-100 transition-opacity">
              Spectral Analysis / Live
           </div>

           {/* Equalizer Bars Container */}
           <div className="flex-1 w-full flex items-end justify-between gap-1 z-10">
              {bands.map((val, i) => {
                 // Math for gradients: lower frequencies (left) are red/warm, highs (right) are blue/cool
                 const p = i / bands.length;
                 // We can do standard Tailwind but since they are highly dynamic, inline gradients are powerful
                 // Let's just use CSS vars or strict classes for simplicity
                 const bgGradient = `linear-gradient(to top, rgba(14,165,233, 1), rgba(16,185,129, 1))`;
                 
                 return (
                   <div key={i} className="flex-1 rounded-sm overflow-hidden bg-zinc-900 relative">
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 w-full rounded-sm"
                        animate={{ height: `${val}%` }}
                        transition={{ type: "tween", duration: 0.1, ease: "linear" }}
                        style={{ background: bgGradient }}
                      />
                      
                      {/* Digital led segmentation mask */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: 'linear-gradient(to bottom, #09090b 2px, transparent 2px)',
                          backgroundSize: '100% 6px' // This slices the vertical bar into distinct LED squares
                        }}
                      />
                   </div>
                 );
              })}
           </div>

           {/* Ground Reflection line */}
           <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-2 relative z-10" />
        </div>
        );
        });
