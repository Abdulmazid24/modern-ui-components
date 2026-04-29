"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Plus, MousePointer2, Move, Layers, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Node {
  id: string;
  x: number;
  y: number;
  title: string;
  content: string;
  color: string;
}

export const InfiniteNodeCanvas = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const [nodes, setNodes] = useState<Node[]>([
      { id: "1", x: 100, y: 100, title: "Neural Genesis", content: "The starting point of the logic flow.", color: "bg-violet-500" },
      { id: "2", x: 400, y: 250, title: "Quantum Buffer", content: "Temporary storage for subatomic data.", color: "bg-cyan-500" },
    ]);

    const canvasX = useMotionValue(0);
    const canvasY = useMotionValue(0);
    const scale = useMotionValue(1);

    const addNode = (e: React.MouseEvent) => {
      const newNode: Node = {
        id: Math.random().toString(36).substr(2, 9),
        x: (e.clientX - canvasX.get()) / scale.get() - 100,
        y: (e.clientY - canvasY.get()) / scale.get() - 50,
        title: "New Concept",
        content: "Double click to edit this node's dimensional data.",
        color: "bg-fuchsia-500",
      };
      setNodes([...nodes, newNode]);
    };

    return (
      <div 
        ref={ref}
        className={cn("relative w-full h-[600px] bg-zinc-950 overflow-hidden cursor-crosshair rounded-[2.5rem] border border-zinc-800/50", className)}
        onDoubleClick={addNode}
        {...props}
      >
        {/* Infinite Grid Background */}
        <motion.div 
          style={{ x: canvasX, y: canvasY, scale }}
          className="absolute inset-[-2000px] pointer-events-none"
        >
          <div className="w-full h-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:40px_40px] opacity-30" />
        </motion.div>

        {/* Draggable Canvas Layer */}
        <motion.div
          drag
          dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
          style={{ x: canvasX, y: canvasY, scale }}
          className="relative w-full h-full"
        >
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              initial={{ x: node.x, y: node.y }}
              className={cn(
                "absolute w-64 p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-zinc-900/40 shadow-2xl cursor-grab active:cursor-grabbing group",
                "hover:border-white/20 transition-colors"
              )}
            >
              <div className={cn("absolute top-0 left-0 w-full h-1 rounded-t-3xl", node.color)} />
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-bold text-lg tracking-tight">{node.title}</h3>
                <Settings2 className="w-4 h-4 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{node.content}</p>
              
              {/* Connection Ports (Visual Only) */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-700" />
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-700" />
            </motion.div>
          ))}
        </motion.div>

        {/* Toolbar UI */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <button className="p-3 rounded-xl bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <Plus className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-zinc-800 mx-2" />
          <button className="p-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
            <MousePointer2 className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
            <Move className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
            <Layers className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute top-8 left-8">
          <div className="px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Double click to spawn node
          </div>
        </div>
      </div>
    );
  }
);

InfiniteNodeCanvas.displayName = "InfiniteNodeCanvas";
