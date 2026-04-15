"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Check, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PuzzleVerificationProps {
  onSuccess?: () => void;
    className?: string;
}

export const PuzzleVerification = React.forwardRef<any, PuzzleVerificationProps>(({ className, onSuccess, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [isVerified, setIsVerified] = useState(false);
        const [isDragging, setIsDragging] = useState(false);

        // For simplicity, hardcode the puzzle gap relative position
        // In a real generic component, this would be computed or randomized server-side
        const targetX = 200; 
        const tolerance = 10; // Pixel tolerance

        const x = useMotionValue(0);

        // Map x drag to the opacity of the target box to give visual feedback when getting closer
        const targetOpacity = useTransform(x, [targetX - 50, targetX, targetX + 50], [0.3, 1, 0.3]);
        const handleColor = useTransform(x, [0, targetX, 300], ["#71717a", "#22d3ee", "#71717a"]);

        const handleDragEnd = () => {
        setIsDragging(false);
        const currentX = x.get();

        if (Math.abs(currentX - targetX) <= tolerance) {
          // Verified!
          setIsVerified(true);
          if (onSuccess) onSuccess();
          // Snap to exact target
          x.set(targetX);
        } else {
          // Failed, snap back to start
          x.set(0);
        }
        };

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-sm p-6 bg-zinc-950 border border-zinc-900 rounded-3xl shadow-xl", className)}>
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="text-zinc-400" size={20} />
            <h3 className="text-white font-medium">Security Verification</h3>
          </div>

          {!isVerified ? (
            <div className="space-y-6">
              {/* Main Context Area */}
              <div 
                ref={containerRef}
                className="relative w-full h-40 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* The Target Hole (Empty slot missing piece) */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 border border-white/20 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] backdrop-blur-md rounded-md"
                  style={{ left: targetX, opacity: targetOpacity }}
                />

                {/* The Draggable Piece */}
                <motion.div
                  drag="x"
                  dragConstraints={containerRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  style={{ x }}
                  className={`absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.8)] border-2 z-10 cursor-grab active:cursor-grabbing backdrop-blur-none ${isDragging ? 'border-cyan-400' : 'border-zinc-400'}`}
                  // We simulate the piece matching the background by shifting its background position
                  // This is a classic captcha technique
                >
                   <div 
                     className="w-full h-full rounded-sm"
                     style={{
                       backgroundImage: 'url("https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop")',
                       backgroundSize: '334px 158px', // Approx width/height of container to map correctly
                       backgroundPosition: `-${targetX}px -50px`, // Offset matches where it should be dropped
                     }}
                   />
                   
                   {/* Shine effect */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 pointer-events-none rounded-sm" />
                </motion.div>
              </div>

              {/* Slider Custom Track */}
              <div className="relative w-full h-12 bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden group">
                <span className={`absolute inset-0 flex items-center justify-center text-sm font-medium transition-opacity ${isDragging ? 'opacity-0' : 'opacity-100 text-zinc-500 group-hover:text-zinc-400'}`}>
                  Slide to complete puzzle
                </span>
                
                {/* Sync Draggable Slider Handle with Piece X */}
                <motion.div 
                  className="absolute top-1 bottom-1 left-1 w-10 bg-zinc-700 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing"
                  style={{ x, backgroundColor: handleColor }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 334 - 40 - 8 }} // Container max width minus handle width minus padding
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-3 bg-zinc-900/50 rounded-full" />
                    <div className="w-0.5 h-3 bg-zinc-900/50 rounded-full" />
                    <div className="w-0.5 h-3 bg-zinc-900/50 rounded-full" />
                  </div>
                </motion.div>

                {/* Trailing Progress Bar */}
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 bg-cyan-500/20 pointer-events-none"
                  style={{ width: x }}
                />
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 gap-4"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Check size={32} />
              </div>
              <span className="text-emerald-400 font-medium">Verification Successful</span>
            </motion.div>
          )}
        </div>
        );
        });
