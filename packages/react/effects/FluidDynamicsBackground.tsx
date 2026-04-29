"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FluidDynamicsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  color1?: string;
  color2?: string;
  intensity?: "low" | "medium" | "high";
}

export const FluidDynamicsBackground = React.forwardRef<HTMLDivElement, FluidDynamicsBackgroundProps>(
  ({ color1 = "#8b5cf6", color2 = "#06b6d4", intensity = "medium", className, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const blobCount = intensity === "low" ? 3 : intensity === "medium" ? 6 : 10;

    return (
      <div 
        ref={ref}
        className={cn("fixed inset-0 -z-10 bg-zinc-950 overflow-hidden", className)}
        {...props}
      >
        {/* SVG Filter for Fluid/Gooey Effect */}
        <svg className="hidden">
          <defs>
            <filter id="fluid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -20" 
                result="goo" 
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        <div className="w-full h-full" style={{ filter: "url(#fluid-goo)" }}>
          {/* Main Interactive Blob */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-3xl opacity-60"
          />

          {/* Random Ambient Blobs */}
          {[...Array(blobCount)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                x: [
                  Math.random() * 1000, 
                  Math.random() * 1000, 
                  Math.random() * 1000
                ],
                y: [
                  Math.random() * 800, 
                  Math.random() * 800, 
                  Math.random() * 800
                ],
                scale: [1, 1.5, 1],
              }}
              transition={{ 
                duration: 20 + i * 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-96 h-96 rounded-full opacity-30"
              style={{ 
                backgroundColor: i % 2 === 0 ? color1 : color2,
                filter: "blur(80px)"
              }}
            />
          ))}
        </div>

        {/* Ambient Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      </div>
    );
  }
);

FluidDynamicsBackground.displayName = "FluidDynamicsBackground";
