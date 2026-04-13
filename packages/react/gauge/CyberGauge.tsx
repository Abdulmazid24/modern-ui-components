"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/utils";

export interface CyberGaugeProps {
  value?: number; // 0 to 100
  label?: string;
    className?: string;
}

export const CyberGauge = React.forwardRef<any, CyberGaugeProps>(({ className, value = 75, label = "System Load", ...props }, ref) => {
        // We simulate a live bouncing value if the prop is fixed, just for preview flair
        const [activeValue, setActiveValue] = useState(value);

        useEffect(() => {
         const interval = setInterval(() => {
            // jitter slightly
            setActiveValue(prev => {
              const jitter = (Math.random() - 0.5) * 5;
              return Math.min(100, Math.max(0, prev + jitter));
            });
         }, 1000);
         return () => clearInterval(interval);
        }, []);

        // Format path geometry for a half circle
        // Radius R=100. Center (120, 120).
        const radius = 100;
        // Circumference of half circle = Pi * R = ~314
        const strokeLength = Math.PI * radius; 

        // Spring animate the value
        const springVal = useSpring(activeValue, { stiffness: 60, damping: 15 });

        // Transform 0-100 to the offset (0 = fully hidden = 314, 100 = fully shown = 0)
        const offset = useTransform(springVal, [0, 100], [strokeLength, 0]);

        // Color shifting from Cyan (cool) to Rose (hot)
        const strokeColor = useTransform(springVal, [0, 50, 100], ["#22d3ee", "#eab308", "#f43f5e"]);

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-sm p-8 bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl flex flex-col items-center", className)}>
          
          <div className="relative w-[240px] h-[140px] overflow-hidden flex justify-center">
            <svg width="240" height="240" viewBox="0 0 240 240" className="absolute top-0 rotate-180 origin-center">
               <defs>
                  <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
                     <feGaussianBlur stdDeviation="6" result="blur" />
                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
               </defs>
               
               {/* Background Track */}
               <path 
                 d={`M 20 120 A 100 100 0 0 1 220 120`} 
                 fill="none" 
                 stroke="#27272a" 
                 strokeWidth="20"
                 strokeLinecap="round"
                 strokeDasharray={`${strokeLength} ${strokeLength}`}
               />
               
               {/* Active Value Track */}
               <motion.path 
                 d={`M 20 120 A 100 100 0 0 1 220 120`} 
                 fill="none" 
                 strokeWidth="10"
                 strokeLinecap="round"
                 strokeDasharray={`${strokeLength} ${strokeLength}`}
                 style={{
                    strokeDashoffset: offset,
                    stroke: strokeColor,
                    filter: "url(#gauge-glow)"
                 }}
               />
            </svg>

            {/* Readout Numbers inside the arc */}
            <div className="absolute bottom-2 flex flex-col items-center">
               <motion.div 
                 className="text-4xl font-black font-mono tracking-tighter"
                 style={{ color: strokeColor }}
               >
                 {Math.round(activeValue)}%
               </motion.div>
               <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                 <Activity size={12} /> {label}
               </span>
            </div>
          </div>
          
        </div>
        );
        });
