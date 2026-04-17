"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface NeuralPathTracerProps {
  path?: string; // SVG path data
  color?: string;
  particleColor?: string;
  duration?: number;
  particleDensity?: number;
  gravity?: number;
  className?: string;
  width?: number;
  height?: number;
}

const DEFAULT_SYNAPSE_PATH = "M50,150 C50,150 100,50 150,150 C200,250 250,50 350,150 S450,250 550,150";

/**
 * A "God-Tier" Path Drawing Effect.
 * Features:
 * - Neural SVG Tracing: Follows and draws complex paths with high-end neon glows.
 * - Canvas Spark Engine: High-performance particle simulation with gravity.
 * - Abstract UI: Defaulted to a sophisticated synapse-like curve.
 * - Spatial Audio: Synchronized sizzling/plasma feedback.
 */
export const NeuralPathTracer = ({
  path = DEFAULT_SYNAPSE_PATH,
  color = "#22d3ee", // Cyan-400
  particleColor = "#06b6d4", 
  duration = 4,
  particleDensity = 2,
  gravity = 0.15,
  className,
  width = 600,
  height = 300,
}: NeuralPathTracerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  
  const { play: playSizzle } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Celestial shimmer/sizzle
  });

  // Particle System Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add particles from the lead position
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        // We use the dash offset to calculate current position
        const style = window.getComputedStyle(pathRef.current);
        const dashOffset = parseFloat(style.strokeDashoffset);
        const progress = 1 - (dashOffset / pathLength);
        
        if (progress > 0 && progress < 1) {
          const point = pathRef.current.getPointAtLength(progress * pathLength);
          
          for (let i = 0; i < particleDensity; i++) {
            particles.current.push({
              x: point.x,
              y: point.y,
              vx: (Math.random() - 0.5) * 2,
              vy: Math.random() * -1, // Upwards burst before falling
              life: 1,
              color: particleColor,
              size: Math.random() * 2 + 1,
            });
          }
        }
      }

      // Update and draw particles
      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity; // Gravity effect
        p.life -= 0.015;
        
        if (p.life <= 0) return false;

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gravity, particleDensity, particleColor]);

  const handleComplete = () => {
     // Optional: more particles on finish?
  };

  return (
    <div className={cn("relative flex items-center justify-center bg-zinc-950 rounded-3xl overflow-hidden", className)} style={{ width, height }}>
      {/* Background Deep Glow */}
      <div className="absolute inset-x-0 h-1/2 bottom-0 bg-gradient-to-t from-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* SVG Path Layer */}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="absolute inset-0">
        <defs>
          <filter id="glow">
             <feGaussianBlur stdDeviation="4" result="coloredBlur" />
             <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
             </feMerge>
          </filter>
        </defs>
        
        {/* Shadow Path */}
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Animated Glow Path */}
        <motion.path
          ref={pathRef}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2,
            onUpdate: (latest) => {
               if (typeof latest ==='number' && latest < 100 && latest > 0) playSizzle();
            }
          }}
          onAnimationComplete={handleComplete}
        />
      </svg>

      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Title Decoration */}
      <div className="absolute top-8 left-8 flex flex-col gap-1">
         <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-mono">Neural Sequence Tracing</span>
         <div className="h-0.5 w-12 bg-cyan-500/20" />
      </div>
    </div>
  );
};
