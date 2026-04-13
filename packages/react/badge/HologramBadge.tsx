"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils";

export interface HologramBadgeProps {
  text: string;
  color?: "cyan" | "fuchsia" | "emerald" | "amber";
    className?: string;
}

export const HologramBadge = React.forwardRef<any, HologramBadgeProps>(({ className, text, color = "cyan", ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);

        const x = useMotionValue(0);
        const y = useMotionValue(0);

        // Smooth out the mouse moves
        const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
        const mouseY = useSpring(y, { stiffness: 300, damping: 20 });

        // Convert mouse position to rotation
        const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
        const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

        const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate normalized mouse position (-0.5 to 0.5)
        const posX = (e.clientX - rect.left) / rect.width - 0.5;
        const posY = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(posX);
        y.set(posY);
        };

        const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        };

        const colorStyles = {
        cyan: "from-cyan-500/20 to-blue-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
        fuchsia: "from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/50 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]",
        emerald: "from-emerald-500/20 to-teal-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        amber: "from-amber-500/20 to-orange-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
        };

        return (
        <div ref={ref} {...props} className={cn("perspective-[1000px] inline-block p-4", className)}>
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className={`relative inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-br border backdrop-blur-md ${colorStyles[color]} cursor-default group`}
          >
            {/* Animated Scanline Background */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
               <motion.div 
                 className="absolute top-0 bottom-0 w-8 bg-white/20 skew-x-[45deg] blur-[2px]"
                 animate={{ left: ["-100%", "200%"] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
               />
            </div>
            
            {/* 3D Floating Text Text */}
            <span 
              className="font-bold tracking-wide relative z-10"
              style={{ transform: "translateZ(20px)" }}
            >
              {text}
            </span>
          </motion.div>
        </div>
        );
        });
