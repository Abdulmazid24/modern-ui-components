"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LiquidChromeButtonProps {
  text?: string;
  onClick?: () => void;
    className?: string;
}

export const LiquidChromeButton = React.forwardRef<any, LiquidChromeButtonProps>(({ className, text = "LIQUID CHROME", onClick, ...props }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
        const [isHovered, setIsHovered] = useState(false);
        const [isClicked, setIsClicked] = useState(false);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
        };

        const handleMouseDown = () => {
        setIsClicked(true);
        if (onClick) onClick();
        };

        const handleMouseUp = () => {
        setTimeout(() => setIsClicked(false), 300);
        };

        return (
        <div ref={ref} {...props} className={cn("relative flex items-center justify-center p-8 bg-zinc-950", className)}>
          {/* SVG Filters for Liquid/Gooey effects mixed with Turbulence for metallic ripples */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="liquid-chrome-distortion" x="-20%" y="-20%" width="140%" height="140%">
                {/* Base noise for metal grain */}
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={isClicked ? "0.05" : "0.02"}
                  numOctaves="3"
                  result="noise"
                />
                {/* Displacement maps the visual pixels according to the noise */}
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={isHovered ? (isClicked ? 30 : 10) : 0}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displacement"
                />
                {/* Liquid / Gooey edge smoother */}
                <feGaussianBlur in="displacement" stdDeviation="4" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePos({ x: 50, y: 50 });
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="relative px-10 py-5 overflow-hidden rounded-full cursor-pointer outline-none group bg-zinc-800"
            style={{
              filter: "url(#liquid-chrome-distortion)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Dynamic Inner Chrome Gradient tracking mouse */}
            <div
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-80 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.9) 0%, rgba(150,150,150,0.5) 20%, rgba(50,50,50,0.8) 50%, #000 100%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* Liquid reflection highlights */}
            <div 
              className="absolute inset-0 shadow-[inset_0_20px_20px_rgba(255,255,255,0.4),inset_0_-20px_20px_rgba(0,0,0,0.8)] pointer-events-none rounded-full"
            />

            {/* Text */}
            <span className="relative z-10 font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600 mix-blend-difference drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none select-none text-sm">
              {text}
            </span>
          </motion.button>
        </div>
        );
        });
