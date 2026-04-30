"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PrismColorPickerProps {
  color?: string;
  onChange?: (color: string) => void;
    className?: string;
}

export const PrismColorPicker = React.forwardRef<any, PrismColorPickerProps>(({ className, color = "#8b5cf6", onChange, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [hue, setHue] = useState(258); // Purple-ish default

        const handlePointerMove = (e: React.PointerEvent) => {
        if (e.buttons !== 1 || !containerRef.current) return;
        updateHue(e.clientX, e.clientY);
        };

        const handlePointerDown = (e: React.PointerEvent) => {
        if (!containerRef.current) return;
        updateHue(e.clientX, e.clientY);
        };

        const updateHue = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Calculate angle from center
        const angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
        const normalizedAngle = angle < 0 ? angle + 360 : angle;
        setHue(normalizedAngle);

        // Convert HSL to HEX for simple output (assuming 100% saturation and 50% lightness)
        // For realistic use, this would have full conversion logic
        const colorOutput = `hsl(${Math.round(normalizedAngle)}, 100%, 50%)`;
        onChange?.(colorOutput);
        };

        // The actual color the thumb represents
        const currentColor = `hsl(${Math.round(hue)}, 100%, 50%)`;

        return (
        <div ref={ref} {...props} className={cn("relative flex flex-col items-center gap-8", className)}>
          {/* Liquid Color Wheel Container */}
          <div 
            className="relative w-64 h-64 border border-zinc-800 rounded-full bg-zinc-950 p-4 shadow-2xl"
            style={{
              filter: "drop-shadow(0 0 30px rgba(0,0,0,0.5))"
            }}
          >
            {/* The Conic Gradient Wheel */}
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              className="absolute inset-4 rounded-full cursor-pointer overflow-hidden z-10"
              style={{
                background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                maskImage: "radial-gradient(circle at center, transparent 40%, black 41%)",
                WebkitMaskImage: "radial-gradient(circle at center, transparent 40%, black 41%)"
              }}
            />

            {/* The Liquid Spill Base (SVG Filter creates the gooey merging effect) */}
            <div className="absolute inset-4 pointer-events-none" style={{ filter: "url(#goo)" }}>
              {/* Animated Center Drop */}
              <motion.div 
                className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
                animate={{ backgroundColor: currentColor, scale: [1, 1.1, 1] }}
                transition={{ 
                  backgroundColor: { type: "spring", stiffness: 100, damping: 10, mass: 1 },
                  scale: { duration: 0.3 }
                }}
              />
              
              {/* Draggable Thumb (Mapped via CSS transform for performance) */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full"
                style={{ 
                  backgroundColor: currentColor,
                  transform: `rotate(${hue}deg) translateX(90px) rotate(-${hue}deg)`
                }}
              />
            </div>

            {/* Output Display Core */}
            <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-zinc-950 shadow-inner z-20"
                 style={{ backgroundColor: currentColor }} 
            />
          </div>

          {/* SVG Gooey Filter Definition */}
          <svg className="hidden">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
              </filter>
            </defs>
          </svg>
        </div>
        );
        });
