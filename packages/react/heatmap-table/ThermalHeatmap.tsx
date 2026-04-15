"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ThermalHeatmapProps {
  data?: number[][]; // 2D array of values 0-100
  xLabels?: string[];
  yLabels?: string[];
    className?: string;
}

export const ThermalHeatmap = React.forwardRef<any, ThermalHeatmapProps>(({ className, data, xLabels = ["12A","2A","4A","6A","8A","10A","12P","2P","4P","6P","8P","10P"], yLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], ...props }, ref) => {
        // Generate random data block if none provided
        const activeData = useMemo(() => {
        if (data) return data;
        return yLabels.map(() => 
          xLabels.map(() => Math.floor(Math.random() * 100))
        );
        }, [data, xLabels, yLabels]);

        // Color interpolator: maps 0-100 to a gradient (Blue -> Cyan -> Yellow -> Red)
        const getColor = (value: number) => {
        if (value < 25) return `rgba(14, 165, 233, ${Math.max(0.2, value/25)})`; // Sky Blue
        if (value < 50) return `rgba(34, 211, 238, ${value/50})`;                // Cyan
        if (value < 75) return `rgba(234, 179, 8, ${(value-25)/50})`;             // Yellow
        return `rgba(239, 68, 68, ${value/100})`;                                 // Red
        };

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-4xl bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl overflow-x-auto", className)}>
          <div className="flex gap-2 min-w-max">
            
            {/* Y Axis Labels */}
            <div className="flex flex-col gap-2 mt-8 mr-4 justify-between h-[392px]">
               {yLabels.map(label => (
                 <div key={label} className="text-zinc-500 text-xs font-bold font-mono h-12 flex items-center justify-end w-8 tracking-tighter uppercase">
                   {label}
                 </div>
               ))}
            </div>
            
            {/* Table/Grid Area */}
            <div className="flex flex-col gap-2">
               {/* X Axis Labels */}
               <div className="flex gap-2 mb-2">
                 {xLabels.map(label => (
                   <div key={label} className="w-12 text-center text-zinc-600 text-[10px] font-mono tracking-widest uppercase">
                     {label}
                   </div>
                 ))}
               </div>
               
               {/* Matrix Cells */}
               {activeData.map((row, rIdx) => (
                 <div key={rIdx} className="flex gap-2 h-12">
                   {row.map((val, cIdx) => (
                     <motion.div 
                       key={`${rIdx}-${cIdx}`}
                       initial={{ opacity: 0, scale: 0.5 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: (rIdx * 0.05) + (cIdx * 0.02) }}
                       className="relative w-12 h-12 rounded-lg cursor-pointer group flex items-center justify-center transition-transform hover:scale-110 hover:z-10 shadow-sm border border-black/20"
                       style={{ backgroundColor: getColor(val) }}
                     >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full mb-1 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {val}%
                        </div>
                     </motion.div>
                   ))}
                 </div>
               ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-8 pt-4 border-t border-zinc-900">
             <span className="text-zinc-600 text-xs font-mono">Cold</span>
             <div className="w-32 h-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 via-yellow-500 to-red-500 opacity-80" />
             <span className="text-zinc-600 text-xs font-mono">Hot</span>
          </div>
        </div>
        );
        });
