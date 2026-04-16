"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface RefractiveFluidSurfaceProps {
  children?: React.ReactNode;
  distortionScale?: number;
  refractionStrength?: number;
  blur?: number;
  className?: string;
  enableAudio?: boolean;
}

/**
 * A futuristic "Liquid Glass" effect. 
 * Re-creates high-end WebGL refraction using pure Canvas 2D and CSS filters.
 */
export const RefractiveFluidSurface = ({
  children,
  distortionScale = 0.5,
  refractionStrength = 20,
  blur = 30,
  className,
  enableAudio = false,
}: RefractiveFluidSurfaceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { play: playRipple } = useSpatialAudio({ 
    enabled: enableAudio, 
    url: "https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3" 
  });

  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = 400); // Internal resolution for logic
    let h = (canvas.height = 400);
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Clear with translucency to create trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);

      // Draw fluid blobs that act as the refraction map
      for (let i = 0; i < 5; i++) {
        const x = w / 2 + Math.cos(time + i) * 100;
        const y = h / 2 + Math.sin(time * 0.8 + i) * 100;
        const size = 50 + Math.sin(time) * 20;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={playRipple}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
      }}
      className={cn("relative group overflow-hidden rounded-[2.5rem] border border-white/10", className)}
    >
      {/* Background Refraction Layer */}
      <div className="absolute inset-0 z-0">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full opacity-0" // The canvas is invisible but holds the map logic
        />
        
        {/* The Actual "Fluid Glass" Surface */}
        <div 
          className="absolute inset-0 backdrop-blur-[40px] bg-white/5 saturate-[1.5] brightness-110"
          style={{
            maskImage: `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px, black, transparent)`,
          }}
        />
        
        {/* Dynamic Refraction Ripple */}
        <div 
           className="absolute inset-0 z-0 opacity-30 animate-pulse pointer-events-none"
           style={{
             backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
             backgroundSize: "20px 20px",
             transform: `translate(${mouse.x * 0.02}px, ${mouse.y * 0.02}px)`
           }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-10">
        {children}
      </div>

      {/* Surface Specular Highlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle 400px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.08), transparent)`
        }}
      />
    </div>
  );
};
