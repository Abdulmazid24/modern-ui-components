"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "../utils";

interface LiquidImageMagnifierProps {
  src: string;
  alt?: string;
  zoom?: number;
  size?: number;
  className?: string;
}

/**
 * A luxury image magnifier with liquid-glass refraction logic.
 * Re-imagines the standard zoom as a high-end Optical Surface interaction.
 */
export const LiquidImageMagnifier = ({
  src,
  alt,
  zoom = 2,
  size = 200,
  className,
}: LiquidImageMagnifierProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePos({ x, y });
    setShow(true);
  };

  return (
    <div 
      className={cn("relative overflow-hidden rounded-[2.5rem] cursor-none", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShow(false)}
    >
      <img ref={imgRef} src={src} alt={alt} className="w-full h-auto" />

      {/* The Liquid Loupe */}
      {show && (
        <div 
          style={{
             left: `${mousePos.x}%`,
             top: `${mousePos.y}%`,
             width: `${size}px`,
             height: `${size}px`,
             backgroundImage: `url(${src})`,
             backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
             backgroundSize: `${100 * zoom}%`,
             transform: "translate(-50%, -50%)",
          }}
          className="absolute z-50 pointer-events-none rounded-full border-4 border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-[2px]"
        >
           {/* Glass Refraction Distortion (Simulated via Shadow) */}
           <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(255,255,255,0.3)]" />
           
           {/* Optical Highlight */}
           <div className="absolute top-4 left-4 w-1/4 h-1/4 rounded-full bg-white/20 blur-md pointer-events-none" />
           
           {/* Inner Ring */}
           <div className="absolute inset-2 border border-white/5 rounded-full" />
        </div>
      )}

      {/* Surface Overlay */}
      {!show && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-black uppercase text-white tracking-[0.5em] bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
             Optical Hover
           </span>
        </div>
      )}
    </div>
  );
};
