"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulseDelay: number;
}

interface NeuromorphicSynapseGraphProps {
  nodeCount?: number;
  enableAudio?: boolean;
  className?: string;
}

/**
 * A generative, bio-inspired node network where "neurons" pulse 
 * and connections fire based on autonomy and cursor interaction.
 */
export const NeuromorphicSynapseGraph = ({
  nodeCount = 15,
  enableAudio = false,
  className,
}: NeuromorphicSynapseGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [synapses, setSynapses] = useState<[number, number][]>([]);

  const { play: playPulse } = useSpatialAudio({ 
    enabled: enableAudio, 
    url: "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3",
    volume: 0.05
  });

  useEffect(() => {
    // Initialize nodes with random positions and velocities
    const initialNodes = Array.from({ length: nodeCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      pulseDelay: Math.random() * 5,
    }));
    
    setNodes(initialNodes);

    // Create sparse connections
    const links: [number, number][] = [];
    for(let i=0; i<initialNodes.length; i++) {
        for(let j=i+1; j<initialNodes.length; j++) {
            if(Math.random() > 0.85) links.push([i, j]);
        }
    }
    setSynapses(links);

    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
         let newX = node.x + node.vx;
         let newY = node.y + node.vy;
         
         // Bounce logic
         let newVx = node.vx;
         let newVy = node.vy;
         if(newX < 0 || newX > 100) newVx *= -1;
         if(newY < 0 || newY > 100) newVy *= -1;

         return { ...node, x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [nodeCount]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-[500px] bg-zinc-950 border border-zinc-900 rounded-[3rem] overflow-hidden group", className)}
    >
      <svg className="absolute inset-0 w-full h-full opacity-40">
         {synapses.map(([i, j]) => {
            const start = nodes[i];
            const end = nodes[j];
            if(!start || !end) return null;
            
            return (
               <React.Fragment key={`${i}-${j}`}>
                  <line 
                     x1={`${start.x}%`} y1={`${start.y}%`} 
                     x2={`${end.x}%`} y2={`${end.y}%`} 
                     stroke="rgba(139, 92, 246, 0.2)" 
                     strokeWidth="1" 
                  />
                  {/* Dynamic Firing Pulse */}
                  <motion.circle 
                     r="2"
                     fill="#8b5cf6"
                     animate={{
                        cx: [`${start.x}%`, `${end.x}%`],
                        cy: [`${start.y}%`, `${end.y}%`],
                        opacity: [0, 1, 0]
                     }}
                     transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: start.pulseDelay,
                        ease: "linear"
                     }}
                     onUpdate={(latest: any) => {
                        if(latest.opacity > 0.9 && Math.random() > 0.98) playPulse();
                     }}
                  />
               </React.Fragment>
            );
         })}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
          style={{ 
             left: `${node.x}%`, 
             top: `${node.y}%`,
             x: "-50%",
             y: "-50%" 
          }}
        >
           <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
        </motion.div>
      ))}

      {/* Surface Depth Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />
    </div>
  );
};
