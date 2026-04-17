"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Check, Trash, AlertTriangle } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface LiquidTrashButtonProps {
  onDelete?: () => void;
  label?: string;
  successLabel?: string;
  className?: string;
  resetDelay?: number;
}

type ButtonState = "idle" | "morphing" | "action" | "success" | "resetting";

/**
 * A "God-Tier" Destructive Action Button.
 * Features:
 * - Liquid Morphing: The button body physically morphs into a trash bin.
 * - Multi-stage Sequence: Open lid -> Liquid drop -> Close lid -> Success.
 * - Auto-Reset: Smoothly returns to original state after completion.
 * - Spatial Audio: Synchronized sequence of 3D audio cues.
 */
export const LiquidTrashButton = ({
  onDelete,
  label = "Delete Item",
  successLabel = "Deleted!",
  className,
  resetDelay = 2500,
}: LiquidTrashButtonProps) => {
  const [state, setState] = useState<ButtonState>("idle");

  const { play: playClick } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3", // Neutral pop
  });

  const { play: playMetal } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Metallic shimmer
  });

  const { play: playSuccess } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Low thud/complete
  });

  const handleTrigger = () => {
    if (state !== "idle") return;
    
    setState("morphing");
    playClick();

    // Sequence timing
    setTimeout(() => {
       setState("action");
       playMetal();
    }, 400);

    setTimeout(() => {
       setState("success");
       playSuccess();
       onDelete?.();
    }, 1200);

    setTimeout(() => {
       setState("resetting");
    }, resetDelay + 1200);

    setTimeout(() => {
       setState("idle");
    }, resetDelay + 1800);
  };

  return (
    <div className={cn("relative flex items-center justify-center min-w-[160px] h-[48px]", className)}>
      <motion.button
        layout
        onClick={handleTrigger}
        className={cn(
          "relative flex items-center justify-center overflow-hidden transition-all duration-500",
          state === "idle" || state === "resetting" ? "w-full h-full rounded-2xl px-6" : "w-12 h-14 rounded-b-xl rounded-t-sm",
          state === "success" ? "bg-emerald-500/10 border-emerald-500/50" : "bg-zinc-950/80 border-white/5",
          "border backdrop-blur-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
        )}
      >
        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {(state === "idle" || state === "resetting") && (
            <motion.div
              layoutId="content"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3 text-white"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
              <span className="text-sm font-bold uppercase tracking-widest">{label}</span>
            </motion.div>
          )}

          {/* TRASH CAN BODY */}
          {(state === "morphing" || state === "action") && (
             <motion.div
               layoutId="bin-body"
               className="relative flex flex-col items-center justify-start pt-4"
             >
                {/* Visual "Liquid" Item Falling */}
                {state === "action" && (
                   <motion.div
                     initial={{ y: -30, opacity: 0, scale: 0.5 }}
                     animate={{ y: 10, opacity: 1, scale: 1 }}
                     transition={{ duration: 0.4, ease: "easeIn" }}
                     className="absolute -top-10 z-0 bg-red-500/40 p-1.5 rounded-full blur-[2px]"
                   >
                     <Trash className="w-4 h-4 text-white" />
                   </motion.div>
                )}

                {/* Lid */}
                <motion.div 
                   animate={state === "action" ? { rotate: -45, x: -10, y: -5 } : { rotate: 0, x: 0, y: 0 }}
                   className={cn(
                     "absolute -top-1 left-[-2px] right-[-2px] h-2 rounded-t-lg bg-zinc-800 border-b border-white/20 origin-left z-20",
                     state === "action" && "bg-zinc-600 shadow-[0_0_10px_rgba(255,100,100,0.5)]"
                   )}
                />
                
                {/* Trash Icon Silhouette on Bin */}
                <Trash className="w-5 h-5 text-red-500/20 group-hover:text-red-500/40 transition-colors" />
                
                {/* Vertical Lines Decoration */}
                <div className="flex gap-1 mt-2 opacity-10">
                   {[0,1,2].map(i => <div key={i} className="w-0.5 h-3 bg-white rounded-full" />)}
                </div>
             </motion.div>
          )}

          {/* SUCCESS STATE */}
          {state === "success" && (
            <motion.div
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[10px] uppercase tracking-tighter text-emerald-300 font-bold whitespace-nowrap">
                {successLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liquid Overflow Glow */}
        {(state === "morphing" || state === "action") && (
           <motion.div
             animate={{ opacity: [0.1, 0.4, 0.1] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="absolute inset-0 bg-red-500/5 blur-xl pointer-events-none"
           />
        )}
      </motion.button>

      {/* Underglow foundation */}
      <AnimatePresence>
        {state !== "idle" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className={cn(
               "absolute -z-10 w-[120%] h-[120%] blur-3xl pointer-events-none",
               state === "success" ? "bg-emerald-500/20" : "bg-red-500/20"
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
