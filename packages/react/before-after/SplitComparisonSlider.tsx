"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/utils";

export interface SplitComparisonSliderProps {
  beforeImage?: string;
  afterImage?: string;
  labelBefore?: string;
  labelAfter?: string;
    className?: string;
}

export const SplitComparisonSlider = React.forwardRef<any, SplitComparisonSliderProps>(({ className, beforeImage = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop&grayscale=true", afterImage = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop", labelBefore = "Before", labelAfter = "After", ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);

        // Starting at 50% width
        const dragX = useMotionValue(0); 
        const [containerWidth, setContainerWidth] = useState(0);

        useEffect(() => {
        if (containerRef.current) {
           // Setup initial constraint widths
           const w = containerRef.current.offsetWidth;
           setContainerWidth(w);
           dragX.set(w / 2);
        }
        }, [dragX]);

        // Convert exact drag pixel coordinates into a percentage for the image mask
        const clipWidth = useTransform(dragX, v => {
         if (containerWidth === 0) return "50%";
         return `${(v / containerWidth) * 100}%`;
        });

        return (
        <div ref={ref} {...props} className={cn(className)}  
          ref={containerRef}
          className="relative w-full max-w-4xl aspect-[16/9] rounded-[2rem] overflow-hidden border border-zinc-900 shadow-2xl bg-zinc-950"
        >
           {/* Base Image (After) - Takes full width underneath */}
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img 
             src={afterImage} 
             alt={labelAfter} 
             className="absolute inset-0 w-full h-full object-cover pointer-events-none"
           />

           {/* Overlay Image (Before) - Masked width based on Slider */}
           <motion.div 
             className="absolute inset-y-0 left-0 overflow-hidden shadow-[10px_0_20px_rgba(0,0,0,0.5)]"
             style={{ width: clipWidth }}
           >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={beforeImage} 
                alt={labelBefore} 
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style={{ width: containerWidth ? `${containerWidth}px` : '100vw' }} // Forces image not to squish when parent div shrinks
              />
           </motion.div>

           {/* Labels */}
           <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-widest pointer-events-none">
             {labelBefore}
           </div>
           <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-widest pointer-events-none">
             {labelAfter}
           </div>

           {/* Drag Handle Container limits drag exactly to container bounds */}
           <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-0 bottom-0 flex flex-col justify-center pointer-events-auto"
                style={{ x: dragX }}
                // shift left by half its width to center exactly over the mask edge
                drag="x"
                dragConstraints={containerRef} 
                dragElastic={0}
                dragMomentum={false}
              >
                 {/* Physical Divider Line */}
                 <div className="absolute top-0 bottom-0 w-1 bg-white -ml-[2px] shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                 
                 {/* Circle Handle */}
                 <div className="relative z-10 w-12 h-12 -ml-6 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] border-4 border-zinc-900 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                    <ArrowLeftRight size={20} className="text-zinc-900" />
                 </div>
              </motion.div>
           </div>
        </div>
        );
        });
