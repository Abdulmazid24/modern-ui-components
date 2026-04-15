"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface QuantumLineChartProps {
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
    className?: string;
}

export const QuantumLineChart = React.forwardRef<any, QuantumLineChartProps>(({ className, data = [10, 40, 25, 60, 45, 80, 50, 95], width = 600, height = 300, color = "#8b5cf6", ...props }, ref) => {
        const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

        // Normalize data to SVG coordinates
        const points = useMemo(() => {
        const maxVal = Math.max(...data, 100);
        const minVal = Math.min(...data, 0);
        const range = maxVal - minVal;

        // Padding
        const pX = 20; 
        const pY = 40;

        const usableW = width - (pX * 2);
        const usableH = height - (pY * 2);

        const stepX = usableW / (data.length - 1 || 1);

        return data.map((val, i) => {
          const x = pX + (i * stepX);
          const normalizedY = (val - minVal) / (range || 1);
          const y = (height - pY) - (normalizedY * usableH);
          return { x, y, val };
        });
        }, [data, width, height]);

        // Generate SVG Path using Catmull-Rom or basic bezier logic.
        // For simplicity and raw cyberpunk feel, we use sharp lines, but let's smooth them slightly.
        const pathD = useMemo(() => {
        if (points.length === 0) return "";
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
           // Simple smooth curve approximation
           const prev = points[i-1];
           const curr = points[i];
           const controlX = (prev.x + curr.x) / 2;
           d += ` C ${controlX} ${prev.y}, ${controlX} ${curr.y}, ${curr.x} ${curr.y}`;
        }
        return d;
        }, [points]);

        // Area under the graph
        const areaD = useMemo(() => {
        if (points.length === 0) return "";
        const first = points[0];
        const last = points[points.length - 1];
        return `${pathD} L ${last.x} ${height} L ${first.x} ${height} Z`;
        }, [pathD, points, height]);

        return (
        <div ref={ref} {...props} className={cn("relative bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-2xl overflow-hidden max-w-full overflow-x-auto", className)}>
          
          {/* Background Grid Lines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
          
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="relative z-10 overflow-visible">
             <defs>
               <linearGradient id="chart-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                 <stop offset="100%" stopColor={color} stopOpacity={0.0} />
               </linearGradient>
               <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="4" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
             </defs>

             {/* Animated Fill Area */}
             <motion.path 
               d={areaD} 
               fill="url(#chart-fill)" 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
             />

             {/* The Glowing Laser Line */}
             <motion.path 
               d={pathD} 
               fill="none" 
               stroke={color} 
               strokeWidth="3"
               filter="url(#neon-glow)"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
             
             {/* Data Points */}
             {points.map((pt, i) => {
               const isHovered = hoveredPoint === i;
               return (
                 <g key={i} className="cursor-pointer" 
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                 >
                   {/* Invisible large circle for easier hover targeting */}
                   <circle cx={pt.x} cy={pt.y} r={15} fill="transparent" />
                   
                   <motion.circle 
                     cx={pt.x} 
                     cy={pt.y} 
                     r={4}
                     fill="#fff"
                     stroke={color}
                     strokeWidth={2}
                     filter="url(#neon-glow)"
                     initial={{ scale: 0 }}
                     animate={{ scale: isHovered ? 2 : 1 }}
                     transition={{ type: "spring", stiffness: 300 }}
                   />

                   {/* Tooltip Popup on Hover */}
                   {isHovered && (
                     <motion.g
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                     >
                       <rect x={pt.x - 20} y={pt.y - 35} width="40" height="24" rx="4" fill="#18181b" stroke="#3f3f46" />
                       <text x={pt.x} y={pt.y - 18} fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold">
                         {pt.val}
                       </text>
                     </motion.g>
                   )}
                 </g>
               );
             })}
          </svg>
        </div>
        );
        });
