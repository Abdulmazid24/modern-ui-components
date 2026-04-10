"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Gamepad2 } from "lucide-react";

export interface ThumbstickPadProps {
  onChange?: (x: number, y: number) => void;
}

export const ThumbstickPad: React.FC<ThumbstickPadProps> = ({ onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);

  // Track raw drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Normalize drag output to a nice -1.0 to 1.0 range based on standard 40px drag radius
  // Maximum drag distance is approx 60px considering physical bounds
  // Syncing out to parent would go here via an effect observing x/y
  /*
  useEffect(() => {
     return x.onChange(v => onChange?.(v/60, y.get()/60));
  }, [x, y, onChange]);
  */

  // Enhance visual feedback by mapping distance to properties
  const distance = useTransform(() => Math.sqrt(x.get()**2 + y.get()**2));
  
  // Stretch or squash shadow based on how far it is pulled
  const shadowSpringX = useSpring(x, { stiffness: 400, damping: 20 });
  const shadowSpringY = useSpring(y, { stiffness: 400, damping: 20 });
  const innerShadowX = useTransform(shadowSpringX, v => -v / 3);
  const innerShadowY = useTransform(shadowSpringY, v => -v / 3);
  const shadowString = useTransform(
    () => `inset ${innerShadowX.get()}px ${innerShadowY.get()}px 20px rgba(0,0,0,0.8), 0 20px 30px rgba(0,0,0,0.5)`
  );

  return (
    <div className="w-full max-w-sm h-80 bg-zinc-950 border border-zinc-900 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-8 gap-8">
      
      {/* Title */}
      <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs">
         <Gamepad2 size={16} /> Pilot Control
      </div>

      {/* Outer Joystick Base */}
      <div 
        ref={containerRef}
        className="relative w-40 h-40 rounded-full border-4 border-zinc-800 bg-zinc-900 shadow-[inset_0_0_30px_rgba(0,0,0,1)] flex items-center justify-center"
      >
         {/* Axis crosshair guides */}
         <div className="absolute top-2 bottom-2 w-px bg-zinc-800/50 pointer-events-none" />
         <div className="absolute left-2 right-2 h-px bg-zinc-800/50 pointer-events-none" />

         {/* The thumbstick */}
         <motion.div 
           ref={stickRef}
           drag
           dragConstraints={{ top: -60, left: -60, right: 60, bottom: 60 }}
           dragElastic={0.1}
           dragSnapToOrigin={true}
           style={{ x, y, boxShadow: shadowString }}
           transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.5 }}
           // The physical appearance of the stick
           className="w-20 h-20 bg-zinc-800 rounded-full border border-zinc-700/50 cursor-grab active:cursor-grabbing flex items-center justify-center relative touch-none"
         >
            {/* Grip Texture dots on thumbstick */}
            <div className="flex flex-wrap gap-1 p-4 items-center justify-center pointer-events-none opacity-20">
               {Array.from({ length: 9 }).map((_, i) => (
                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
               ))}
            </div>
            
            {/* Faux lighting ring */}
            <div className="absolute inset-2 rounded-full border-t border-white/10 pointer-events-none" />
         </motion.div>

      </div>
    </div>
  );
};
