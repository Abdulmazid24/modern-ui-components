"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils/cn";

export interface HolographicPrismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
    className?: string;
}

export const HolographicPrismCard = React.forwardRef<any, HolographicPrismCardProps>(({ title = "HOLOGRAPHIC", subtitle = "PRISM ENTITY", className, ...props }, ref) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [isHovered, setIsHovered] = useState(false);

        // Motion values to track mouse position across the card
        const mouseX = useMotionValue(0.5); // 0 to 1
        const mouseY = useMotionValue(0.5); // 0 to 1

        // Smooth springs for physics-based movement
        const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
        const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

        // Transform coordinates into 3D rotation angles (-20deg to 20deg)
        const rotateX = useTransform(springY, [0, 1], [20, -20]);
        const rotateY = useTransform(springX, [0, 1], [-20, 20]);

        // Translate coordinates to control background gradients and glare
        const backgroundX = useTransform(springX, [0, 1], [0, 100]);
        const backgroundY = useTransform(springY, [0, 1], [0, 100]);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
        };

        const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
        };

        return (
        <div className={cn("flex items-center justify-center p-12 bg-black min-h-[500px]", className)} style={{ perspective: 1500 }} {...props}>
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-[320px] h-[450px] rounded-2xl cursor-pointer"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Deep Parallax Shadow behind the card */}
            <motion.div
              className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-3xl"
              style={{
                transform: "translateZ(-80px)",
                opacity: isHovered ? 1 : 0.4,
              }}
            />

            {/* The Main Glass Form */}
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/20"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow: "inset 0 0 40px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Holographic Iridescent Layer */}
              <motion.div
                className="absolute inset-0 opacity-0 mix-blend-color-dodge transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `repeating-linear-gradient(
                45deg,
                var(--color-1) 0%,
                var(--color-2) 10%,
                var(--color-3) 20%,
                var(--color-4) 30%,
                var(--color-1) 40%
              )`,
                  backgroundSize: "300% 300%",
                  backgroundPosition: useTransform(
                    () => `${backgroundX.get()}% ${backgroundY.get()}%`
                  ),
                  "--color-1": "rgba(255, 0, 0, 0.5)",
                  "--color-2": "rgba(0, 255, 0, 0.5)",
                  "--color-3": "rgba(0, 0, 255, 0.5)",
                  "--color-4": "rgba(255, 0, 255, 0.5)",
                } as any}
              />

              {/* Liquid Glass Overlay (Moving Glare) */}
              <motion.div
                className="absolute inset-0 w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 40%)",
                  x: useTransform(springX, [0, 1], ["-25%", "25%"]),
                  y: useTransform(springY, [0, 1], ["-25%", "25%"]),
                }}
              />

              {/* Internal Geometric Mesh Map (Matrix Vibe) */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />
            </div>

            {/* 3D Floating Elements (Z-Translated) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
              
              {/* Glowing Orb Object */}
              <motion.div
                className="w-32 h-32 rounded-full mb-12 relative"
                style={{ translateZ: "60px" }} // Floats high above glass
                animate={{
                  boxShadow: isHovered 
                    ? ["0 0 30px rgba(34,211,238,0.4)", "0 0 60px rgba(34,211,238,0.8)", "0 0 30px rgba(34,211,238,0.4)"]
                    : "0 0 20px rgba(34,211,238,0.2)",
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {/* The inner core of the holographic prism */}
                <div className="absolute inset-2 rounded-full border border-cyan-400 bg-cyan-900/30 flex items-center justify-center backdrop-blur-md">
                   <div className="w-16 h-16 border border-fuchsia-500 rounded-full animate-[spin_4s_linear_infinite]" />
                   <div className="w-8 h-8 border border-white absolute rounded-sm animate-[spin_3s_linear_infinite_reverse]" />
                </div>
              </motion.div>

              {/* Floating Typography */}
              <motion.div 
                className="text-center"
                style={{ translateZ: "40px" }} // Floats mid-level above glass
              >
                <h3 className="font-black text-2xl tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {title}
                </h3>
                <p className="text-cyan-400 font-mono tracking-[0.2em] text-xs mt-2 font-bold opacity-80">
                  {subtitle}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        );
        });
