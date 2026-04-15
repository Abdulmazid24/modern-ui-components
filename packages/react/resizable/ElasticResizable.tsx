"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export const ElasticResizable = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [width, setWidth] = useState(50);
        return (
        <div ref={ref} {...props} className={cn("w-full max-w-2xl flex h-64 rounded-2xl overflow-hidden border border-white/10", className)}>
          <div className="bg-zinc-900/80 p-4 overflow-hidden" style={{ width: `${width}%` }}><p className="text-sm text-zinc-400">Panel A — {Math.round(width)}%</p></div>
          <motion.div className="w-2 bg-zinc-800 hover:bg-violet-500/30 cursor-col-resize flex items-center justify-center transition-colors flex-shrink-0" whileHover={{ backgroundColor: "rgba(124,58,237,0.3)" }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0} dragMomentum={false}
            onDrag={(_, info) => { setWidth((w) => Math.min(80, Math.max(20, w + info.delta.x * 0.15))); }}>
            <GripVertical size={12} className="text-zinc-600" />
          </motion.div>
          <div className="bg-zinc-900/60 p-4 flex-1 overflow-hidden"><p className="text-sm text-zinc-400">Panel B — {Math.round(100 - width)}%</p></div>
        </div>
        );
        });
