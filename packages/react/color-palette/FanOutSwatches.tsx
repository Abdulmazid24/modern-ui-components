"use client";

import React from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { cn } from "@/utils";

export interface ColorSwatch {
  hex: string;
  name: string;
    className?: string;
}

export interface FanOutSwatchesProps {
  colors?: ColorSwatch[];
    className?: string;
}

export const FanOutSwatches = React.forwardRef<any, FanOutSwatchesProps>(({ className, colors = [
            { hex: "#06b6d4", name: "Cyan Base" },
            { hex: "#8b5cf6", name: "Purple Core" },
            { hex: "#ec4899", name: "Pink Accent" },
            { hex: "#10b981", name: "Emerald Success" },
            { hex: "#f59e0b", name: "Amber Warning" }
          ], ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn("w-full max-w-sm h-80 flex items-center justify-center p-8 bg-zinc-950 border border-zinc-900 shadow-2xl rounded-[3rem]", className)}>
          {/* 
            The parent handles the hover state.
            When hovered, we animate children based on their index. 
          */}
          <motion.div 
            className="relative w-32 h-48 cursor-pointer"
            whileHover="hovered"
            initial="rest"
          >
            {colors.map((color, i) => {
              // Math to fan them out like a deck of cards
              // i=0 is back, i=(length-1) is front.
              const length = colors.length;
              const middleIndex = (length - 1) / 2;
              const indexOffset = i - middleIndex; // e.g. -2, -1, 0, 1, 2
              
              // Hover states
              const rotateOffset = indexOffset * 15; // Spread 15deg apart
              const yOffset = Math.abs(indexOffset) * 10; // Arcing downwards at edges
              
              // Interaction variants
              const variants = {
                rest: { 
                  rotate: indexOffset * 2, // Slight organic messiness resting
                  y: 0,
                  x: indexOffset * 2,
                  scale: 1,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                },
                hovered: {
                  rotate: rotateOffset,
                  y: yOffset,
                  x: indexOffset * 20, // Spread horizontally too
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }
              };

              return (
                <motion.div
                  key={color.hex}
                  variants={variants}
                  className="absolute inset-0 rounded-2xl shadow-xl border border-white/20 flex flex-col justify-between p-3 origin-bottom"
                  style={{ backgroundColor: color.hex, zIndex: i }}
                  whileTap={{ scale: 1.15, zIndex: 50 }}
                  onClick={() => {
                     navigator.clipboard.writeText(color.hex);
                     // Toast logic would theoretically go here
                  }}
                >
                   {/* Inner styling of the swatch card */}
                   <div className="w-full h-24 bg-white/10 rounded-xl" />
                   <div className="flex items-center justify-between mt-auto">
                     <div>
                       <p className="text-white text-xs font-bold leading-tight">{color.name}</p>
                       <p className="text-white/70 text-[10px] font-mono tracking-widest">{color.hex}</p>
                     </div>
                     <Copy size={14} className="text-white/50" />
                   </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        );
        });
