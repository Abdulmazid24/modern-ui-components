"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface ChronosNeonClockProps {
  className?: string;
  size?: number;
  accentColor?: string;
}

/**
 * A "God-Tier" Holographic Analog Clock.
 * Features:
 * - Liquid Sweeping: Continuous, high-precision motion for all hands.
 * - Sparkler Particle System: The second hand leaves a trail of glowing sparks.
 * - Full Chronology: Full 1-12 numbering with neon typography.
 * - Interactive 3D Tilt: Use-centric parallax based on mouse position.
 * - 2026 Aesthetics: Obsidian glass, volumetric neon glow, and deep space obsidian.
 */
export const ChronosNeonClock = ({
  className,
  size = 400,
  accentColor = "#22d3ee", // Cyan-400
}: ChronosNeonClockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const [time, setTime] = useState(new Date());

  // Mouse tilt logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Time Engine (Sweeping)
  useEffect(() => {
    let frameId: number;
    const update = () => {
      setTime(new Date());
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = (canvas.width / 2) * 0.85;

      // Calculate current second hand position
      const now = new Date();
      const seconds = now.getSeconds();
      const ms = now.getMilliseconds();
      const totalSeconds = seconds + ms / 1000;
      const angle = (totalSeconds * 6 - 90) * (Math.PI / 180);
      
      const tipX = centerX + Math.cos(angle) * radius;
      const tipY = centerY + Math.sin(angle) * radius;

      // Add sparks
      if (Math.random() > 0.2) {
        particles.current.push({
          x: tipX,
          y: tipY,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          life: 1.0,
          color: accentColor,
        });
      }

      // Draw and update particles
      particles.current = particles.current.filter(p => {
        p.life -= 0.02;
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.life <= 0) return false;

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [accentColor]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Rotation Calculations
  const ms = time.getMilliseconds();
  const sec = time.getSeconds() + ms / 1000;
  const min = time.getMinutes() + sec / 60;
  const hr = (time.getHours() % 12) + min / 60;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative flex items-center justify-center perspective-1000", className)}
      style={{ width: size, height: size }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full bg-zinc-950 flex items-center justify-center rounded-full border-4 border-white/5 shadow-[0_0_100px_rgba(34,211,238,0.1)] overflow-hidden"
      >
        {/* Dynamic Underglow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent blur-3xl" />

        {/* Clock Face (Glass Layer) */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/5 backdrop-blur-xl z-10" />

        {/* Numbers 1-12 */}
        <div className="absolute inset-0 z-20">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i + 1) * 30 * (Math.PI / 180) - Math.PI / 2;
            const radius = (size / 2) * 0.7;
            const nx = size / 2 + Math.cos(angle) * radius;
            const ny = size / 2 + Math.sin(angle) * radius;

            return (
              <span
                key={i}
                className="absolute text-zinc-500 font-bold text-lg -translate-x-1/2 -translate-y-1/2 select-none"
                style={{ left: nx, top: ny }}
              >
                {i + 1}
              </span>
            );
          })}
        </div>

        {/* Center Node */}
        <div className="absolute z-50 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white]" />

        {/* Hands */}
        {/* Hour Hand */}
        <motion.div
          style={{ rotate: hr * 30 }}
          className="absolute bottom-1/2 left-1/2 w-2 h-[25%] bg-white/40 transform-origin-bottom rounded-full -translate-x-1/2 z-30"
        />

        {/* Minute Hand */}
        <motion.div
          style={{ rotate: min * 6 }}
          className="absolute bottom-1/2 left-1/2 w-1.5 h-[35%] bg-white/60 transform-origin-bottom rounded-full -translate-x-1/2 z-40"
        />

        {/* Second Hand (Beam) */}
        <motion.div
          style={{ rotate: sec * 6 }}
          className="absolute bottom-1/2 left-1/2 w-[2px] h-[45%] bg-cyan-400 transform-origin-bottom rounded-full -translate-x-1/2 z-[45] shadow-[0_0_15px_#22d3ee]"
        />

        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="absolute inset-0 z-[44] pointer-events-none opacity-80"
        />

        {/* Inner Ring Glow */}
        <div className="absolute inset-8 rounded-full border border-cyan-500/10 shadow-[inset_0_0_50px_rgba(34,211,238,0.05)]" />
      </motion.div>
    </div>
  );
};
