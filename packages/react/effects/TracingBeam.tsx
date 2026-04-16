"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * An animated path/beam that follows the scroll progress along a vertical line.
 * Ideal for guiding the user through high-density landing page sections.
 */
export const TracingBeam = ({ children, className }: TracingBeamProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  const scrollVelocity = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pathHeight = useTransform(scrollVelocity, [0, 1], ["0%", "100%"]);

  return (
    <div ref={contentRef} className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <div className="absolute left-[-20px] top-0 bottom-0 w-[2px] bg-zinc-900 overflow-hidden hidden md:block">
        <motion.div
          style={{ height: pathHeight }}
          className="w-full bg-gradient-to-b from-purple-500 via-cyan-400 to-transparent shadow-[0_0_15px_rgba(139,92,246,0.5)]"
        />
        
        {/* Glow point */}
        <motion.div 
           style={{ top: pathHeight }}
           className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white blur-sm opacity-50"
        />
      </div>

      <div className="md:pl-10">
        {children}
      </div>
    </div>
  );
};
