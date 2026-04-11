"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Power } from "lucide-react";

export interface ZeroGravityToggleProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

export const ZeroGravityToggle: React.FC<ZeroGravityToggleProps> = ({
  initialState = false,
  onToggle,
}) => {
  const [isOn, setIsOn] = useState(initialState);
  const [isFloating, setIsFloating] = useState(false);

  const handleToggle = () => {
    if (isFloating) return; // Prevent clicking while mid-flight
    setIsFloating(true);
    
    // Simulate the slow zero-g transit
    setTimeout(() => {
      setIsOn(!isOn);
      if (onToggle) onToggle(!isOn);
      setIsFloating(false);
    }, 1200); // 1.2s travel time
  };

  return (
    <div className="flex items-center justify-center p-12 bg-zinc-950 min-h-[300px]">
      
      {/* The Zero-G Tube (Switch Track) */}
      <div 
         className="relative w-64 h-24 rounded-full border-2 border-zinc-800 bg-zinc-900/50 backdrop-blur-md shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] flex items-center px-2 cursor-pointer overflow-hidden group"
         onClick={handleToggle}
      >
         
         {/* Glass glare effect on the tube */}
         <div className="absolute top-1 left-[10%] right-[10%] h-4 rounded-full bg-white/5 blur-[1px] pointer-events-none" />

         {/* Magnetic Sockets */}
         <div className="absolute left-4 w-16 h-16 rounded-full border-2 border-red-500/30 bg-red-950/20 flex items-center justify-center">
            <span className="text-red-500/50 font-mono text-[10px] uppercase font-bold">Cold</span>
         </div>
         <div className="absolute right-4 w-16 h-16 rounded-full border-2 border-cyan-500/30 bg-cyan-950/20 flex items-center justify-center">
            <span className="text-cyan-500/50 font-mono text-[10px] uppercase font-bold">Hot</span>
         </div>

         {/* The Switch Mass (The Floating object) */}
         <motion.div
           className="relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]"
           animate={{
              // Move from Left (0%) to Right (100% of container - width)
              x: isOn ? 168 : 0, 
              // Mid-flight spin
              rotate: isFloating ? (isOn ? -720 : 720) : 0,
              backgroundColor: isOn ? "#06b6d4" : "#ef4444", // Cyan : Red
           }}
           transition={{
             x: { duration: 1.2, ease: "easeInOut" },
             rotate: { duration: 1.2, ease: "linear" },
             backgroundColor: { duration: 0.5, delay: 0.8 } // Wait till it hits socket to change color fully
           }}
           style={{
              // Complex metal shading
              background: isOn 
                ? "radial-gradient(circle at 30% 30%, #67e8f9 0%, #06b6d4 50%, #083344 100%)"
                : "radial-gradient(circle at 30% 30%, #fca5a5 0%, #ef4444 50%, #450a0a 100%)"
           }}
         >
            {/* The indent in the metal ball */}
            <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] flex items-center justify-center border border-white/20">
               <Power className="text-white/80" size={24} />
            </div>
            
            {/* Thruster exhaust particles (Only when transit is active) */}
            {isFloating && (
               <motion.div 
                 className={`absolute ${isOn ? '-right-4' : '-left-4'} w-8 h-8 opacity-50`}
                 animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                 transition={{ repeat: Infinity, duration: 0.2 }}
                 style={{
                   background: isOn ? "radial-gradient(circle, rgba(239,68,68,1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(6,182,212,1) 0%, transparent 70%)"
                 }}
               />
            )}
         </motion.div>

         {/* Ambient Sparks inside tube simulating zero-g particles */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            {[1,2,3,4,5].map(i => (
               <motion.div
                 key={i}
                 className="absolute w-1 h-1 bg-white/30 rounded-full"
                 animate={{
                    x: [Math.random() * 200, Math.random() * 200 + (Math.random() > 0.5 ? 50 : -50)],
                    y: [Math.random() * 80, Math.random() * 80 + (Math.random() > 0.5 ? 10 : -10)],
                    opacity: [0, 0.5, 0]
                 }}
                 transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Infinity,
                    ease: "linear"
                 }}
               />
            ))}
         </div>

      </div>
      
    </div>
  );
};
