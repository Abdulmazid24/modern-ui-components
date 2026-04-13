"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

export interface XRayTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
    className?: string;
}

export const XRayTooltip = React.forwardRef<any, XRayTooltipProps>(({ className, children, content, ...props }, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
        const containerRef = useRef<HTMLDivElement>(null);

        const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate cursor position relative to the center of the container
        setMousePos({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
        };

        return (
        <div ref={ref} {...props} className={cn(className)}  
          ref={containerRef}
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {children}

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  // Move the tooltip slightly in the opposite direction of the mouse
                  // to create a 3D parallax float effect
                  x: mousePos.x * -0.2,
                  y: mousePos.y * -0.2 - 60 // -60 to position it above the element
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-0 left-1/2 -ml-[100px] w-[200px] z-50 pointer-events-none"
              >
                {/* The X-Ray Lens Effect */}
                <div className="relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/50 to-purple-500/50 shadow-[0_10px_40px_rgba(6,182,212,0.3)]">
                  {/* Backdrop filter is what creates the "X-Ray" negative/distortion effect */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-invert-[0.1] backdrop-hue-rotate-180 z-0" />
                  
                  <div className="relative z-10 px-4 py-3 text-sm font-medium text-white text-center">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                    {content}
                    
                    {/* Tech scanline inside tooltip */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-[10px]"
                      animate={{ y: ["-10px", "50px", "-10px"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
                
                {/* Tooltip Arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-black/40 border-r border-b border-purple-500/50 backdrop-blur-md backdrop-invert-[0.1]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        );
        });
