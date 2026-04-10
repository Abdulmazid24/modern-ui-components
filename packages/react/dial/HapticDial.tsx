"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export interface HapticDialProps {
  onValueChange?: (val: number) => void;
}

export const HapticDial: React.FC<HapticDialProps> = ({ onValueChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track X drag as the primary controller for the dial
  const dragX = useMotionValue(0);
  
  // Transform horizontal drag into radial rotation (-150deg to 150deg)
  const rotation = useTransform(dragX, [-200, 200], [-150, 150]);
  
  // Transform horizontal drag into a 0-100 value
  const value = useTransform(dragX, [-200, 200], [0, 100]);

  const [activeValue, setActiveValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Sync value out to parent
  rotation.onChange((v) => {
    // Clamp the drag visually in transform hook? No, dragConstraints handles that.
    // Sync active value
    const rawVal = value.get();
    const clamped = Math.max(0, Math.min(100, Math.round(rawVal)));
    setActiveValue(clamped);
    if (onValueChange) onValueChange(clamped);
  });

  return (
    <div className="relative w-full max-w-sm p-10 bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl flex flex-col items-center">
      
      {/* Percentage Readout */}
      <div className="mb-8 text-center text-zinc-500 font-mono tracking-widest text-xs uppercase flex items-center gap-2">
         Output Level
         <span className={`text-xl font-bold transition-colors ${isDragging ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-white'}`}>
           {activeValue}%
         </span>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        
        {/* Radial Tick Marks Container */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => {
            // Distribute 40 ticks from -150 to 150 degrees (300 degree span)
            const angle = -150 + (i * (300 / 39));
            // Calculate if this tick is "active" based on current rotation
            const isActive = angle <= rotation.get();
            
            return (
              <div 
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div 
                  className={`mx-auto w-[2px] rounded-full transition-colors duration-200 mt-1 ${
                    isActive 
                      ? 'h-3 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' 
                      : 'h-2 bg-zinc-800'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* The Physical Knob - We drag an invisible box but animate the knob rotation */}
        <motion.div 
          className="absolute w-32 h-32 rounded-full border-2 border-zinc-800 bg-zinc-900 shadow-[inset_0_20px_20px_rgba(255,255,255,0.05),_0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center"
          style={{ rotate: rotation }}
        >
           {/* Inner Grip Ring */}
           <div className="w-24 h-24 rounded-full border border-zinc-800/50 flex items-start justify-center pt-2">
              {/* Position Indicator Dot */}
              <div className={`w-3 h-3 rounded-full transition-colors ${isDragging ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]' : 'bg-zinc-600'}`} />
           </div>
        </motion.div>

        {/* 
          Invisible Drag Controller: 
          We place an invisible square over the entire knob zone that captures X dragging.
          This maps horizontal dragging directly to the dial's rotation seamlessly.
        */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto" ref={containerRef}>
          <motion.div
            className="w-full h-full rounded-full cursor-grab active:cursor-grabbing opacity-0"
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0}
            dragMomentum={false}
            style={{ x: dragX }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          />
        </div>

      </div>
    </div>
  );
};
