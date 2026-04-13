"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function HyperbolicHero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smoother gravity dragging
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate distance from center of the screen
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax the text slightly opposite to the mouse
  const textX = useTransform(springX, [-500, 500], [20, -20]);
  const textY = useTransform(springY, [-500, 500], [20, -20]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full h-[80vh] flex items-center justify-center bg-black overflow-hidden perspective-1000", className)}
    >
      {/* Hyperbolic Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(20px, 4vw, 50px) clamp(20px, 4vw, 50px)',
          transform: 'rotateX(60deg) scale(2)',
          transformOrigin: 'top center',
        }}
      />
      
      {/* Distortion Sphere (Follows mouse, creates the gravity lens illusion) */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full mix-blend-screen pointer-events-none z-10"
        style={{
          x: useTransform(springX, x => x - 200),
          y: useTransform(springY, y => y - 200),
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(236,72,153,0.2) 40%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Main Hero Content */}
      <motion.div 
        style={{ x: textX, y: textY }}
        className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
           <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
           <span className="text-xs font-mono text-neutral-300">SYSTEM V2.0 ONLINE</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500 tracking-tighter mix-blend-difference">
          BEND REALITY.
        </h1>
        <p className="mt-6 text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
          The next generation of interface design. Build applications that don't just sit on the screen, but react to human physics.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <button className="px-8 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:scale-105 transition-transform">
            Start Building
          </button>
          <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-wide hover:bg-white/10 transition-colors">
            View Docs
          </button>
        </div>
      </motion.div>

      {/* Bottom fade out overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
