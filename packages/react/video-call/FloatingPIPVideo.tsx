"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, X, Mic, MicOff, Video, VideoOff, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingPIPVideoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  userName?: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
}

export const FloatingPIPVideo = React.forwardRef<HTMLDivElement, FloatingPIPVideoProps>(
  ({ src, userName = "Alpha Participant", isMuted: initialMuted = false, isVideoOff: initialVideoOff = false, className, ...props }, ref) => {
    const [isMuted, setIsMuted] = useState(initialMuted);
    const [isVideoOff, setIsVideoOff] = useState(initialVideoOff);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    
    const constraintsRef = useRef(null);

    return (
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 pointer-events-none z-[80]" ref={constraintsRef}>
            <motion.div
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                width: isMinimized ? 200 : 320,
                height: isMinimized ? 150 : 200,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "pointer-events-auto relative group overflow-hidden rounded-[2rem] border border-zinc-800/50 bg-zinc-950 shadow-2xl backdrop-blur-xl",
                className
              )}
              {...props}
            >
              {/* Video Content / Placeholder */}
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center overflow-hidden">
                {isVideoOff ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <VideoOff className="w-6 h-6 text-zinc-600" />
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">{userName}</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 relative">
                     {/* Placeholder for real video stream */}
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-700 font-mono text-xs uppercase tracking-widest animate-pulse">Live Stream Buffer...</span>
                     </div>
                  </div>
                )}
              </div>

              {/* Overlay / Controls */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{userName}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-zinc-800 transition-colors"
                    >
                      {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                      onClick={() => setIsVisible(false)}
                      className="p-2 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/20 text-red-400 hover:bg-red-500 transition-colors hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center gap-4">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className={cn(
                        "p-2 rounded-xl transition-all",
                        isMuted ? "text-red-400 bg-red-400/10" : "text-white hover:bg-white/10"
                      )}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={cn(
                        "p-2 rounded-xl transition-all",
                        isVideoOff ? "text-red-400 bg-red-400/10" : "text-white hover:bg-white/10"
                      )}
                    >
                      {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    </button>
                    <button className="p-2 rounded-xl text-white hover:bg-white/10">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Indicators (Always visible) */}
              <div className="absolute bottom-4 left-4 flex gap-2 pointer-events-none group-hover:opacity-0 transition-opacity">
                {isMuted && (
                  <div className="p-1.5 rounded-full bg-red-500 shadow-lg">
                    <MicOff className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

FloatingPIPVideo.displayName = "FloatingPIPVideo";
