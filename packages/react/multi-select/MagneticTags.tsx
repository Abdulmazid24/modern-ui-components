"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils";

export interface Tag {
  id: string;
  label: string;
  color?: string;
    className?: string;
}

export interface MagneticTagsProps {
  tags: Tag[];
  onRemove?: (id: string) => void;
    className?: string;
}

export const MagneticTags = React.forwardRef<any, MagneticTagsProps>(({ className, tags, onRemove, ...props }, ref) => {
        const constraintsRef = useRef<HTMLDivElement>(null);

        const colors = [
        "bg-rose-500", "bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500"
        ];

        return (
        <div ref={ref} {...props} className={cn(className)}  
          ref={constraintsRef} 
          className="relative w-full max-w-2xl h-[300px] bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden p-6 shadow-inner"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <span className="text-zinc-500 text-lg font-bold tracking-widest uppercase">Drag & Toss Tags</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => {
              const colorClass = tag.color || colors[i % colors.length];
              return (
                <motion.div ref={ref} {...props} className={cn(className)} 
                  key={tag.id}
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative z-10 flex items-center gap-2 px-4 py-2 ${colorClass} text-white font-medium rounded-full cursor-grab shadow-lg`}
                >
                  <span className="pointer-events-none">{tag.label}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemove?.(tag.id); }}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
        );
        });
