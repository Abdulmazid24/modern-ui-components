"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils";

interface ThreeDProductShowcaseProps {
  children: React.ReactNode;
  label?: string;
  price?: string;
  className?: string;
}

/**
 * A floating 3D showcase for products.
 * Uses 3-axis rotation and layered shadows to create depth.
 */
export const ThreeDProductShowcase = ({
  children,
  label,
  price,
  className,
}: ThreeDProductShowcaseProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 100, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-72 h-96 [perspective:1000px] cursor-crosshair group",
        className
      )}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-10 flex flex-col items-center justify-between backdrop-blur-xl shadow-2xl"
      >
        {/* Floor Shadow */}
        <div className="absolute bottom-10 w-32 h-8 bg-black/40 blur-2xl rounded-full -translate-z-10" />

        {/* Level Indicator */}
        <div className="absolute top-8 left-8 text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">
           Premium Model
        </div>

        {/* The Product Core */}
        <div 
          className="relative transition-all duration-500 group-hover:scale-110"
          style={{ transform: "translateZ(100px)" }}
        >
           {children}
        </div>

        {/* Info Area */}
        <div 
          className="text-center"
          style={{ transform: "translateZ(50px)" }}
        >
           {label && <h4 className="text-xl font-black text-white italic">{label}</h4>}
           {price && <p className="text-purple-400 font-mono text-sm mt-1">{price}</p>}
        </div>

        {/* Floating Particle Accents */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          style={{ transform: "translateZ(80px)" }}
        >
           <div className="absolute top-1/4 right-8 w-1 h-1 bg-white rounded-full animate-ping" />
           <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};
