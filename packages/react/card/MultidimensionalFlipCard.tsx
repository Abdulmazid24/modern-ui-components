"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface MultidimensionalFlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  side?: React.ReactNode;
  enableAudio?: boolean;
  className?: string;
}

/**
 * A spatial card that "unfolds" in 3D space rather than a simple 2D flip.
 * Features 3-axis rotation and cuboid panel expansion.
 */
export const MultidimensionalFlipCard = ({
  front,
  back,
  side,
  enableAudio = false,
  className,
}: MultidimensionalFlipCardProps) => {
  const [state, setState] = useState<"front" | "back" | "side">("front");

  const { play: playFlip } = useSpatialAudio({ 
    enabled: enableAudio, 
    url: "https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3" 
  });

  const cycle = () => {
    playFlip();
    if (state === "front") setState("side");
    else if (state === "side") setState("back");
    else setState("front");
  };

  return (
    <div 
      onClick={cycle}
      className={cn("relative w-80 h-96 [perspective:1500px] cursor-pointer group", className)}
    >
      <motion.div
        animate={{
          rotateY: state === "front" ? 0 : state === "side" ? -90 : -180,
          rotateX: state === "side" ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden z-20 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
           {front}
           <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-zinc-700">Level 01</div>
        </div>

        {/* Side Face (Unfolding Panel) */}
        <div 
          className="absolute inset-0 backface-hidden z-10 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center shadow-2xl"
          style={{ transform: "rotateY(90deg) translateZ(160px)" }}
        >
           {side || (
             <div className="space-y-4">
                <div className="h-2 w-20 bg-purple-500/50 rounded-full animate-pulse" />
                <h4 className="text-sm font-bold text-zinc-400">Transdimensional Data</h4>
             </div>
           )}
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden z-0 bg-black border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center text-center shadow-2xl"
          style={{ transform: "rotateY(180deg)" }}
        >
           {back}
        </div>

        {/* Holographic Edge Lighting */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl border-r-2 border-purple-500/0 group-hover:border-purple-500/20 transition-all duration-700" />
      </motion.div>
      
      {/* Interaction Hint */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em] opacity-40">
         Click to Unfold
      </div>
    </div>
  );
};
