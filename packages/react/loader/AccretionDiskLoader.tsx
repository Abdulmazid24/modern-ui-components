"use client";

import React from "react";
import { motion } from "framer-motion";

export interface AccretionDiskLoaderProps {
  size?: number;
}

export const AccretionDiskLoader: React.FC<AccretionDiskLoaderProps> = ({ size = 200 }) => {
  return (
    <div className="flex items-center justify-center p-12 bg-black min-h-[300px] overflow-hidden">
      
      {/* 
        To achieve the volumetric black hole effect:
        We use a sharp black circle (the event horizon) overlaying multiple rotating rings 
        that mimic the accretion disk (the glowing matter). We apply SVG filters for that fiery blur.
      */}
      
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="accretion-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="glow"
          />
          <feBlend in="SourceGraphic" in2="glow" />
        </filter>
      </svg>

      <div 
         className="relative flex items-center justify-center"
         style={{ width: size, height: size, filter: "url(#accretion-glow)" }}
      >
        {/* Core Event Horizon (The absolute black sphere) */}
        <div 
           className="absolute z-30 rounded-full bg-black"
           style={{ width: size * 0.45, height: size * 0.45, boxShadow: "inset 0 0 10px rgba(0,0,0,1)" }}
        />

        {/* Inner intense fiery ring (The photon sphere) */}
        <motion.div
           className="absolute z-20 rounded-full border-[4px] border-orange-500/80 mix-blend-screen"
           style={{ width: size * 0.5, height: size * 0.5 }}
           animate={{ rotateX: [60, 65, 60], rotateZ: [0, 360] }}
           transition={{ 
             rotateZ: { repeat: Infinity, duration: 2, ease: "linear" },
             rotateX: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" }
           }}
        />

        {/* The main Accretion Disk (glowing orbiting matter) */}
        <motion.div
           className="absolute z-10 rounded-full"
           style={{ 
             width: size * 0.9, 
             height: size * 0.9,
             background: "conic-gradient(from 0deg, transparent 0%, rgba(255, 120, 0, 0.4) 30%, rgba(255, 200, 100, 0.8) 50%, rgba(255, 120, 0, 0.4) 70%, transparent 100%)",
             borderRadius: "50%",
             border: "1px solid rgba(255,100,0,0.2)"
           }}
           animate={{ rotateX: 75, rotateZ: [360, 0] }} // Tilted 75deg to look like a disk
           transition={{ 
             rotateZ: { repeat: Infinity, duration: 3, ease: "linear" },
           }}
        />

        {/* Disk Lensing Effect (The part of the disk wrapping *above* the hole visually) */}
        <motion.div
           className="absolute z-40 rounded-full top-[-10%]"
           style={{ 
             width: size * 0.55, 
             height: size * 0.55,
             background: "conic-gradient(from 180deg, transparent 0%, rgba(255, 150, 50, 0.6) 50%, transparent 100%)",
             clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" // Only show top half to fake lensing over the top
           }}
           animate={{ rotateZ: [0, 360] }}
           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />

        {/* High Energy Jets (Quasar beams shooting up and down) */}
        <motion.div
           className="absolute z-0 w-1 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
           style={{ height: size * 2.5 }}
           animate={{ opacity: [0.3, 0.8, 0.3], height: [size * 2.5, size * 2.8, size * 2.5] }}
           transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        />
      </div>
      
      {/* Loading Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-orange-400/70 uppercase">
         Gravitational Pulling...
      </div>
    </div>
  );
};
