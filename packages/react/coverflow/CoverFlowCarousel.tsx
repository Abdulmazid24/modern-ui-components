"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export interface CoverFlowItem {
  id: string;
  image: string;
    className?: string;
}

export interface CoverFlowCarouselProps {
  items?: CoverFlowItem[];
    className?: string;
}

export const CoverFlowCarousel = React.forwardRef<any, CoverFlowCarouselProps>(({ className, items = [
            { id: "1", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
            { id: "2", image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop" },
            { id: "3", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
            { id: "4", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop" },
            { id: "5", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1000&auto=format&fit=crop" }
          ], ...props }, ref) => {
        const [activeIndex, setActiveIndex] = useState(2);

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-4xl h-96 flex items-center justify-center overflow-hidden bg-zinc-950 rounded-[3rem] border border-zinc-900 perspective-[1000px]", className)}>
          
          {/* Background illumination */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/10 blur-[100px] pointer-events-none" />

          <div className="relative w-full flex items-center justify-center transform-style-3d">
            {items.map((item, i) => {
              // Calculate distance from center active index
              const offset = i - activeIndex;
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;
              
              let x = offset * 120; // horizontal spacing distance
              let z = -absOffset * 150; // push depth further back
              let rotateY = offset > 0 ? -45 : offset < 0 ? 45 : 0; // rotate in towards center
              let scale = 1 - (absOffset * 0.1); 

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(i)}
                  initial={false}
                  animate={{
                     x,
                     z,
                     rotateY,
                     scale,
                     opacity: absOffset > 3 ? 0 : 1, // hide extreme items for performance
                     zIndex: items.length - absOffset
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute w-48 h-64 sm:w-64 sm:h-80 rounded-2xl cursor-pointer overflow-hidden shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Actual Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Glare and Dim overlays based on state */}
                  <div 
                    className={`absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none ${isCenter ? 'opacity-0' : 'opacity-40'}`} 
                  />
                  
                  {/* Reflection trick pointing downwards via CSS reflection or pseudo box shadow */}
                  <div 
                    className="absolute top-full left-0 w-full h-full pointer-events-none"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      transform: 'scaleY(-1)',
                      opacity: 0.1,
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)'
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
          
          {/* Click-to-drag invisible overlay handler could be implemented here */}
        </div>
        );
        });
