"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/utils";

export const MechanicalClock = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        // Use MotionValues to prevent React re-renders while updating every frame
        const secondsRot = useMotionValue(0);
        const minutesRot = useMotionValue(0);
        const hoursRot = useMotionValue(0);

        useEffect(() => {
        let animationFrame: number;

        const updateClock = () => {
          const now = new Date();
          // Sweeping seconds (includes milliseconds for smoothness)
          const ms = now.getMilliseconds();
          const s = now.getSeconds() + ms / 1000;
          const m = now.getMinutes() + s / 60;
          const h = now.getHours() % 12 + m / 60;

          secondsRot.set(s * 6); // 360 / 60 = 6 deg per sec
          minutesRot.set(m * 6);
          hoursRot.set(h * 30); // 360 / 12 = 30 deg per hour
          
          animationFrame = requestAnimationFrame(updateClock);
        };

        updateClock();
        return () => cancelAnimationFrame(animationFrame);
        }, [hoursRot, minutesRot, secondsRot]);

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-sm aspect-square bg-zinc-950 border border-zinc-900 shadow-2xl rounded-3xl flex items-center justify-center p-8", className)}>
          
          {/* Outer Bezel */}
          <div className="relative w-full h-full rounded-full bg-zinc-900 border-4 border-zinc-800 shadow-[inset_0_20px_30px_rgba(0,0,0,0.8),0_10px_30px_rgba(34,211,238,0.1)] flex items-center justify-center overflow-hidden">
             
             {/* Inner watch face background pattern */}
             <div 
               className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                 backgroundImage: 'radial-gradient(circle at center, transparent 0, transparent 4px, white 4px, white 5px, transparent 5px)',
                 backgroundSize: '10px 10px',
                 maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                 WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)'
               }}
             />

             {/* Tick Marks */}
             <div className="absolute inset-0 pointer-events-none">
               {Array.from({ length: 60 }).map((_, i) => {
                 const isHour = i % 5 === 0;
                 return (
                   <div 
                     key={i} 
                     className="absolute w-full h-full flex justify-center py-2"
                     style={{ transform: `rotate(${i * 6}deg)` }}
                   >
                     <div className={`rounded-full bg-zinc-600 ${isHour ? 'w-1.5 h-4 bg-zinc-300' : 'w-0.5 h-2'}`} />
                   </div>
                 );
               })}
             </div>

             {/* Numbers */}
             <div className="absolute inset-6 pointer-events-none text-zinc-400 font-bold font-mono text-xl">
               <span className="absolute top-0 left-1/2 -translate-x-1/2">12</span>
               <span className="absolute bottom-0 left-1/2 -translate-x-1/2">6</span>
               <span className="absolute right-0 top-1/2 -translate-y-1/2">3</span>
               <span className="absolute left-0 top-1/2 -translate-y-1/2">9</span>
             </div>

             {/* Hands Container (Centered) */}
             <div className="absolute w-4 h-4 bg-transparent z-10 flex items-center justify-center">
                
                {/* Hour Hand */}
                <motion.div 
                   className="absolute w-2 h-20 bg-zinc-300 rounded-full border border-zinc-800 z-10"
                   style={{ rotate: hoursRot, originY: 1, y: -40 }} // Shift up so bottom is at center
                >
                   {/* Faux lume */}
                   <div className="absolute top-2 w-[2px] h-10 bg-cyan-100 left-1/2 -translate-x-1/2 rounded-full" />
                </motion.div>
                
                {/* Minute Hand */}
                <motion.div 
                   className="absolute w-1.5 h-28 bg-white rounded-full border border-zinc-300 z-20"
                   style={{ rotate: minutesRot, originY: 1, y: -56 }}
                >
                   <div className="absolute top-2 w-[1px] h-16 bg-cyan-100 left-1/2 -translate-x-1/2 rounded-full" />
                </motion.div>
                
                {/* Second Hand (Sweeping) */}
                <motion.div 
                   className="absolute w-[2px] h-32 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] z-30"
                   style={{ rotate: secondsRot, originY: 0.8, y: -50 }} // Origin offset for tail
                >
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500" />
                </motion.div>

                {/* Center Pin */}
                <div className="absolute w-3 h-3 bg-white rounded-full z-40 border-2 border-zinc-900 shadow-md flex justify-center items-center">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                </div>
             </div>

          </div>
        </div>
        );
        });
