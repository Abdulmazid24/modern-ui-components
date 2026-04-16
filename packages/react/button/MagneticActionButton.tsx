"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../utils";

interface MagneticActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  distance?: number;
  strength?: number;
  className?: string;
}

/**
 * A premium interaction where the button "attracts" the cursor within a specific radius.
 * Ideal for Primary CTAs and Navigation items.
 */
export const MagneticActionButton = ({
  children,
  distance = 100,
  strength = 0.4,
  className,
  ...props
}: MagneticActionButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={cn(
        "relative group px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest transition-colors duration-300 hover:bg-zinc-100",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
      
      {/* Magnetic Aura / Glow */}
      <div className="absolute inset-0 z-0 bg-white/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />
    </motion.button>
  );
};
