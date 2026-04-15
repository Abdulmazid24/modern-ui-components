"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MicroPortalSwitchProps {
  initialState?: boolean;
    className?: string;
}

export const MicroPortalSwitch = React.forwardRef<any, MicroPortalSwitchProps>(({ className, initialState = false, ...props }, ref) => {
        const [isOn, setIsOn] = useState(initialState);
        const [isTeleporting, setIsTeleporting] = useState(false);

        const handleToggle = () => {
        if (isTeleporting) return;
        setIsTeleporting(true);

        // Total animation timeline:
        // 0-300ms: Box shrinks into current portal
        // 300-600ms: Invisible (in the void)
        // 600-900ms: Box shoots out from the destination portal

        setTimeout(() => {
           setIsOn(!isOn);
        }, 450); // Mid-point of void transit

        setTimeout(() => {
           setIsTeleporting(false);
        }, 900);
        };

        return (
        <div ref={ref} {...props} className={cn("flex items-center justify-center p-12 bg-zinc-950 min-h-[300px]", className)}>
          
          {/* Container Track */}
          <div 
            className="relative w-48 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-between px-2 cursor-pointer shadow-inner"
            onClick={handleToggle}
          >
            
            {/* Blue Portal (Left / OFF) */}
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center z-10">
               {/* Portal Rim */}
               <motion.div 
                 className="absolute w-12 h-14 rounded-full border-4 border-blue-500 bg-blue-950/40"
                 animate={{ rotateY: [0, 180, 360], scale: !isOn && isTeleporting ? 1.2 : 1 }}
                 transition={{ rotateY: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 0.3 } }}
                 style={{ perspective: 200, rotateY: 45 }}
               />
               {/* Glow */}
               <div className="absolute inset-0 rounded-full shadow-[0_0_15px_#3b82f6] opacity-50 blur-sm pointer-events-none" />
            </div>

            {/* Orange Portal (Right / ON) */}
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center z-10">
               {/* Portal Rim */}
               <motion.div 
                 className="absolute w-12 h-14 rounded-full border-4 border-orange-500 bg-orange-950/40"
                 animate={{ rotateY: [360, 180, 0], scale: isOn && isTeleporting ? 1.2 : 1 }}
                 transition={{ rotateY: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 0.3 } }}
                 style={{ perspective: 200, rotateY: -45 }}
               />
               {/* Glow */}
               <div className="absolute inset-0 rounded-full shadow-[0_0_15px_#f97316] opacity-50 blur-sm pointer-events-none" />
            </div>

            {/* The Companion Cube / Switch Head */}
            <div className="absolute inset-0 pointer-events-none flex items-center px-[1.1rem]">
               <AnimatePresence mode="popLayout">
                 {!isTeleporting && (
                   <motion.div
                     key={`cube-${isOn}`}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0, opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     className={`absolute w-10 h-10 rounded-lg bg-zinc-200 border-2 border-zinc-400 shadow-xl flex items-center justify-center ${isOn ? 'right-[1.1rem]' : 'left-[1.1rem]'}`}
                   >
                      {/* Companion Cube details */}
                      <div className="w-6 h-6 border-2 border-zinc-400 rounded-full flex items-center justify-center bg-white">
                         <div className={`w-3 h-3 rounded-full ${isOn ? 'bg-orange-500 shadow-[0_0_8px_#f97316]' : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'}`} />
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Teleportation Dust Effects */}
            <AnimatePresence>
              {isTeleporting && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute w-14 h-14 rounded-full border-4 blur-sm ${isOn ? 'border-orange-400 right-1' : 'border-blue-400 left-1'}`}
                />
              )}
            </AnimatePresence>

          </div>
        </div>
        );
        });
