"use client";

import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { BrainCircuit, Database, Server, Cpu } from "lucide-react";
import { cn } from "@/utils";

export interface SynapseNodeGraphProps {
  className?: string;
}

export const SynapseNodeGraph = React.forwardRef<any, GraphNodeProps>(({ className = "", ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);

        // Define Motion Values for Nodes to connect lines performantly without re-renders
        const node1X = useMotionValue(100);
        const node1Y = useMotionValue(150);

        const node2X = useMotionValue(300);
        const node2Y = useMotionValue(100);

        const node3X = useMotionValue(250);
        const node3Y = useMotionValue(250);

        const node4X = useMotionValue(400);
        const node4Y = useMotionValue(200);

        return (
        <div ref={ref} {...props} className={cn(className)}  
          ref={containerRef}
          className={`relative w-full max-w-2xl h-[400px] bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl ${className}`}
        >
           {/* Background Grid */}
           <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                 backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                 backgroundSize: '24px 24px'
              }}
           />

           {/* SVG Lines connecting MotionValues directly */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
              </defs>
              <motion.line x1={node1X} y1={node1Y} x2={node2X} y2={node2Y} stroke="#06b6d4" strokeWidth="2" filter="url(#glow)" strokeOpacity="0.4" />
              <motion.line x1={node2X} y1={node2Y} x2={node3X} y2={node3Y} stroke="#8b5cf6" strokeWidth="2" filter="url(#glow)" strokeOpacity="0.4" />
              <motion.line x1={node1X} y1={node1Y} x2={node3X} y2={node3Y} stroke="#ec4899" strokeWidth="2" filter="url(#glow)" strokeOpacity="0.4" />
              <motion.line x1={node2X} y1={node2Y} x2={node4X} y2={node4Y} stroke="#10b981" strokeWidth="2" filter="url(#glow)" strokeOpacity="0.4" />
              <motion.line x1={node3X} y1={node3Y} x2={node4X} y2={node4Y} stroke="#f59e0b" strokeWidth="2" filter="url(#glow)" strokeOpacity="0.4" />
           </svg>

           {/* Draggable Nodes */}
           <GraphNode x={node1X} y={node1Y} color="text-cyan-400" bgColor="bg-cyan-950/80" borderColor="border-cyan-500/50" icon={<BrainCircuit size={20} />} label="AI Core" containerRef={containerRef} />
           <GraphNode x={node2X} y={node2Y} color="text-purple-400" bgColor="bg-purple-950/80" borderColor="border-purple-500/50" icon={<Server size={20} />} label="Load Balancer" containerRef={containerRef} />
           <GraphNode x={node3X} y={node3Y} color="text-pink-400" bgColor="bg-pink-950/80" borderColor="border-pink-500/50" icon={<Database size={20} />} label="Data Lake" containerRef={containerRef} />
           <GraphNode x={node4X} y={node4Y} color="text-emerald-400" bgColor="bg-emerald-950/80" borderColor="border-emerald-500/50" icon={<Cpu size={20} />} label="Worker" containerRef={containerRef} />

        </div>
        );
        });

interface GraphNodeProps {
  x: any;
  y: any;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  label: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
}

const GraphNode: React.FC<GraphNodeProps> = ({ x, y, color, bgColor, borderColor, icon, label, containerRef }) => {
  return (
    <motion.div ref={ref} {...props} className={cn(className)} 
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      dragMomentum={false}
      style={{ x, y }}
      // Note: framer motion drag actually mutates the layout transform, so we use `onDrag` to sync the raw MotionValues
      // However, x and y provided above directly control the style x/y, which syncs the lines natively.
      className={`absolute w-14 h-14 -ml-7 -mt-7 ${bgColor} ${borderColor} border-2 rounded-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md z-10`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
       <div className={`${color}`}>
         {icon}
       </div>
       <span className="absolute top-full mt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap pointer-events-none selection:bg-none">
         {label}
       </span>
    </motion.div>
  );
};
