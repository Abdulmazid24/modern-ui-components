"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LightningCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string; // Hex color for the lightning
}

export const LightningCard = forwardRef<HTMLDivElement, LightningCardProps>(
  ({ className, color = "#00f0ff", children, ...props }, ref) => {
    const [seed, setSeed] = useState(0);

    // Rapidly change the seed of the SVG turbulence to create the "sparking" electric effect
    useEffect(() => {
      const interval = setInterval(() => {
        setSeed(Math.floor(Math.random() * 100));
      }, 50); // fast flicker like electricity
      return () => clearInterval(interval);
    }, []);

    // Also slowly rotate the dash array for movement along the border
    const dashOffset = useAnimation();
    useEffect(() => {
      dashOffset.start({
        strokeDashoffset: [1000, 0],
        transition: { duration: 10, repeat: Infinity, ease: "linear" },
      });
    }, [dashOffset]);

    return (
      <div
        ref={ref}
        className={cn("relative group w-full max-w-sm rounded-2xl p-[2px] overflow-hidden", className)}
        {...props}
      >
        {/* Hidden SVG filters to generate the electricity displacement map */}
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <filter id={`electric-displacement-${color.replace("#", "")}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="3"
                seed={seed}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="8" // the jag intensity
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* 
          1. The Base Glow Masking Layer
          We recreate a rect the exact size of the container and apply the displacement to its stroke.
          This gives us the jagged electric perimeter.
        */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl">
           <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.rect
                width="100%"
                height="100%"
                rx="16" // match border radius
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeDasharray="100 200"
                animate={dashOffset}
                style={{
                  filter: `url(#electric-displacement-${color.replace("#", "")}) drop-shadow(0 0 10px ${color})`,
                }}
              />
               {/* Faint static border underneath to close the gaps */}
               <rect
                width="100%"
                height="100%"
                rx="16"
                fill="none"
                stroke={color}
                strokeWidth="1"
                opacity={0.3}
                style={{
                  filter: `url(#electric-displacement-${color.replace("#", "")})`,
                }}
              />
           </svg>
        </div>

        {/* 
          2. Large ambient outer glow mimicking the screenshot
        */}
        <div
          className="absolute inset-[1px] -z-10 opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
          style={{ backgroundColor: color }}
        />

        {/* 
          3. The Inner Dark Card
        */}
        <div className="relative z-10 w-full h-full bg-zinc-950 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            {children ? children : (
               <>
                 <span className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4 opacity-50" style={{ color }}>
                   CODEWITH_MUHILAN
                 </span>
                 <h3 className="text-2xl font-bold text-white mb-2">Electric Border</h3>
                 <p className="text-sm text-zinc-400">
                   In case you'd like to emphasize something very dramatically.
                 </p>
               </>
            )}
        </div>
      </div>
    );
  }
);

LightningCard.displayName = "LightningCard";
