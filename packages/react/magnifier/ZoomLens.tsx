"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils";

export interface ZoomLensProps {
  imageSrc?: string;
  zoomFactor?: number;
    className?: string;
}

export const ZoomLens = React.forwardRef<any, ZoomLensProps>(({ className, imageSrc = "https://images.unsplash.com/photo-1620121478247-ec786d38935d?q=80&w=2544&auto=format&fit=crop", zoomFactor = 2.5, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [isHovering, setIsHovering] = useState(false);

        // Raw mouse coordinates relative to image container
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        // Smooth them with a spring so the loupe trails the mouse slightly like it has weight
        const smoothX = useSpring(mouseX, { stiffness: 300, damping: 25 });
        const smoothY = useSpring(mouseY, { stiffness: 300, damping: 25 });

        const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        };

        // Convert exact mouse positions to percentage mappings for background-position
        const bgPosX = useTransform(smoothX, (x) => {
        if (!containerRef.current) return "50%";
        const pct = (x / containerRef.current.offsetWidth) * 100;
        return `${pct}%`;
        });

        const bgPosY = useTransform(smoothY, (y) => {
        if (!containerRef.current) return "50%";
        const pct = (y / containerRef.current.offsetHeight) * 100;
        return `${pct}%`;
        });

        return (
        <div ref={ref} {...props} className={cn(className)}  
          ref={containerRef}
          className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden cursor-none bg-zinc-900 border border-zinc-800"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Base Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageSrc} 
            alt="Product to zoom" 
            className="w-full h-full object-cover"
          />

          {/* The Magnifying Loupe */}
          <motion.div
            className="absolute w-32 h-32 rounded-full border-4 border-zinc-200/50 shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none backdrop-blur-sm z-10 overflow-hidden"
            style={{
              // Center the 128px (32*4) loupe on the exact mouse coordinate
              x: useTransform(smoothX, x => x - 64),
              y: useTransform(smoothY, y => y - 64),
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.5
            }}
            transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 300 } }}
          >
            {/* Inner zoomed Image mapping. It moves its background opposite to the mouse position. */}
            <motion.div 
              className="w-full h-full"
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${zoomFactor * 100}%`,
                backgroundPositionX: bgPosX,
                backgroundPositionY: bgPosY,
                backgroundRepeat: "no-repeat"
              }}
            />
            
            {/* Glass reflection overly */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none mix-blend-overlay" />
          </motion.div>
        </div>
        );
        });
