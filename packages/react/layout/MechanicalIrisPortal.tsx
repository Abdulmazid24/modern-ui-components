"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface MechanicalIrisPortalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  bladeCount?: number;
  className?: string;
  enableAudio?: boolean;
}

/**
 * A futuristic 3D mechanical iris/shutter portal. 
 * The blades rotate and fold away simultaneously to reveal internal content.
 */
export const MechanicalIrisPortal = ({
  children,
  isOpen: controlledOpen,
  onToggle,
  bladeCount = 6,
  className,
  enableAudio = false,
}: MechanicalIrisPortalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const { play: playShutter } = useSpatialAudio({ 
    enabled: enableAudio, 
    url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" 
  });

  const toggle = () => {
    const newState = !open;
    playShutter();
    if (onToggle) onToggle(newState);
    else setInternalOpen(newState);
  };


  const bladeAngle = 360 / bladeCount;

  return (
    <div className={cn("relative flex items-center justify-center p-20", className)}>
      {/* Background/Internal Content */}
      <div className="relative z-0">
         <AnimatePresence>
            {open && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ delay: 0.2, duration: 0.5 }}
               >
                  {children}
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Iris Shutter Overlay */}
      <div 
        onClick={toggle}
        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer pointer-events-auto"
      >
        <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-zinc-800 bg-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           {Array.from({ length: bladeCount }).map((_, i) => (
              <Blade 
                key={i} 
                index={i} 
                total={bladeCount} 
                angle={bladeAngle} 
                isOpen={open} 
              />
           ))}
           
           {/* Center Lock / Core */}
           {!open && (
             <motion.div 
               exit={{ opacity: 0, scale: 0.5 }}
               className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
             >
                <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-700 shadow-inner flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                </div>
             </motion.div>
           )}
        </div>
      </div>
    </div>
  );
};

function Blade({ index, total, angle, isOpen }: { index: number; total: number; angle: number; isOpen: boolean }) {
  // Logic: Each blade is a sector that rotates around the center
  // and slides 'outward' relative to its own angle
  const rotation = index * angle;

  return (
    <motion.div
      initial={false}
      animate={isOpen ? {
        rotate: rotation + 45, // Twist on opening
        x: Math.cos((rotation * Math.PI) / 180) * 100, // Fold outward X
        y: Math.sin((rotation * Math.PI) / 180) * 100, // Fold outward Y
        opacity: 0,
      } : {
        rotate: rotation,
        x: 0,
        y: 0,
        opacity: 1,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        delay: index * 0.05 
      }}
      style={{
        transformOrigin: "center center",
        // We use clip-path to create the specific iris blade shape (triangle/sector)
        clipPath: `polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%)`, 
      }}
      className="absolute inset-0 bg-zinc-800 border-l border-t border-zinc-700/50"
    />
  );
}
