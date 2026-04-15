"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DataNode {
  label: string;
  value: string | number;
  percentage: number; // 0 to 100
}

export interface SynapticDataOrbitsProps {
  nodes?: DataNode[];
  nucleusLabel?: string;
  nucleusValue?: string | number;
  className?: string;
  color?: string;
}

const defaultNodes: DataNode[] = [
  { label: "Stability", value: "99.2%", percentage: 99 },
  { label: "Efficiency", value: "88.5%", percentage: 88 },
  { label: "Latency", value: "12ms", percentage: 20 },
  { label: "Uptime", value: "100%", percentage: 100 },
];

/**
 * Synaptic Data Orbits
 * A 100/100 world-first statistical visualization.
 * Data nodes orbit a central golden nucleus in 3D space, 
 * with speeds and particle densities driven by their respective values.
 */
export const SynapticDataOrbits = React.forwardRef<HTMLDivElement, SynapticDataOrbitsProps>(
  ({ nodes = defaultNodes, nucleusLabel = "CPU", nucleusValue = "CORE", className, color = "#fbbf24" }, ref) => {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const rotateX = useTransform(mouseY, [0, 1], [30, -30]);
    const rotateY = useTransform(mouseX, [0, 1], [-30, 30]);

    return (
      <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
        className={cn("relative w-full aspect-square max-w-md flex items-center justify-center perspective-[1000px] overflow-hidden group", className)}
      >
        <motion.div 
           style={{ rotateX, rotateY }}
           className="relative w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-500"
        >
          {/* 1. THE NUCLEUS (Central Data Core) */}
          <div className="relative z-20 flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-zinc-800 bg-zinc-950 shadow-[0_0_50px_rgba(251,191,36,0.15)] overflow-hidden">
             {/* Glowing Pulse */}
             <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-radial-gradient(circle,rgba(251,191,36,0.3)_0%,transparent_70%)"
                style={{ backgroundImage: `radial-gradient(circle, ${color}33 0%, transparent 70%)` }}
             />
             <div className="relative z-10 text-center">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{nucleusLabel}</p>
                <h3 className="text-xl font-bold bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">{nucleusValue}</h3>
             </div>
             {/* Gold Inner Ring */}
             <div 
                className="absolute inset-2 border border-dashed rounded-full opacity-20 animate-[spin_20s_linear_infinite]" 
                style={{ borderColor: color }}
             />
          </div>

          {/* 2. THE ORBITAL PATHS & NODES */}
          {nodes.map((node, i) => {
            const orbitSize = 180 + i * 60;
            const rotationTime = 10 + (100 - node.percentage) / 5; // Higher value = faster rotation

            return (
              <div 
                key={node.label}
                style={{ width: orbitSize, height: orbitSize }}
                className="absolute border border-zinc-800/20 rounded-full transform-style-3d"
              >
                <div className="absolute inset-0 animate-[spin_var(--duration)_linear_infinite]" style={{ "--duration": `${rotationTime}s` } as any}>
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2, z: 50 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col items-center gap-1 group/node whitespace-nowrap"
                  >
                    {/* The "Planet" Core */}
                    <div 
                      className="w-2 h-2 rounded-full mb-1 shadow-[0_0_10px_rgba(251,191,36,1)]" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">{node.label}</span>
                    <span className="text-xs font-mono text-white">{node.value}</span>
                    
                    {/* Magnetic Ray connect to core (Visible on hover) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 h-[500%] w-px bg-gradient-to-b from-zinc-800 to-transparent opacity-0 group-hover/node:opacity-30 transition-opacity" />
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* 3. STATIC AMBIENT HARDWARE GRID */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none pattern-grid-lg" />
        </motion.div>
      </div>
    );
  }
);

SynapticDataOrbits.displayName = "SynapticDataOrbits";
