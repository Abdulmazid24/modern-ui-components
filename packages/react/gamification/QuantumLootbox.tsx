"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantumLootboxProps extends React.HTMLAttributes<HTMLDivElement> {
  rewardName?: string;
  onOpen?: () => void;
}

export const QuantumLootbox = React.forwardRef<HTMLDivElement, QuantumLootboxProps>(
  ({ rewardName = "Dimensional Fragment", onOpen, className, ...props }, ref) => {
    const [status, setStatus] = useState<"idle" | "opening" | "opened">("idle");

    const handleOpen = () => {
      if (status !== "idle") return;
      setStatus("opening");
      setTimeout(() => {
        setStatus("opened");
        if (onOpen) onOpen();
      }, 2000);
    };

    return (
      <div 
        ref={ref}
        className={cn("relative w-64 h-64 flex items-center justify-center", className)}
        {...props}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleOpen}
              className="relative cursor-pointer group"
            >
              {/* Outer Glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-[-40px] rounded-full bg-violet-500/20 blur-3xl group-hover:bg-violet-500/40 transition-colors"
              />

              {/* 3D Cube Visual */}
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative w-32 h-32 bg-zinc-900 border-2 border-violet-500/50 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent" />
                <Gift className="w-12 h-12 text-violet-400" />
                
                {/* Internal Light Pulse */}
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-4 rounded-xl bg-violet-500/10 blur-xl"
                />
              </motion.div>
              
              <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Click to materialize
              </p>
            </motion.div>
          )}

          {status === "opening" && (
            <motion.div
              key="opening"
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 10],
                  rotate: [0, 180],
                  opacity: [1, 0]
                }}
                transition={{ duration: 2, ease: "circIn" }}
                className="w-32 h-32 rounded-3xl bg-white shadow-[0_0_100px_white]"
              />
              
              {/* Particle Rays */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos(i * 30 * (Math.PI / 180)) * 200,
                    y: Math.sin(i * 30 * (Math.PI / 180)) * 200,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute w-2 h-20 bg-gradient-to-t from-transparent to-violet-400 rounded-full blur-sm"
                  style={{ rotate: i * 30 }}
                />
              ))}
            </motion.div>
          )}

          {status === "opened" && (
            <motion.div
              key="opened"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_80px_rgba(139,92,246,0.6)]"
                >
                  <Sparkles className="w-20 h-20 text-white" />
                </motion.div>
                
                {/* Reward Stars */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute"
                    style={{ 
                      top: `${Math.random() * 100}%`, 
                      left: `${Math.random() * 100}%` 
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">Reward Manifested</h3>
                <p className="text-violet-400 font-bold tracking-widest uppercase text-xs">{rewardName}</p>
              </div>

              <button 
                onClick={() => setStatus("idle")}
                className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Reset Anomaly
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

QuantumLootbox.displayName = "QuantumLootbox";
