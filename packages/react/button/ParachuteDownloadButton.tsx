"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

export interface ParachuteDownloadButtonProps {
  onComplete?: () => void;
  duration?: number;
    className?: string;
}

export const ParachuteDownloadButton = React.forwardRef<any, ParachuteDownloadButtonProps>(({ className, onComplete, duration = 3000, ...props }, ref) => {
        const [state, setState] = useState<"idle" | "downloading" | "complete">("idle");
        const [progress, setProgress] = useState(0);

        useEffect(() => {
        if (state !== "downloading") return;

        const interval = 50; // update every 50ms
        const increment = 100 / (duration / interval);

        const timer = setInterval(() => {
          setProgress((prev) => {
            const next = prev + increment;
            if (next >= 100) {
              clearInterval(timer);
              setState("complete");
              if (onComplete) onComplete();
              // Reset after showing success
              setTimeout(() => {
                setState("idle");
                setProgress(0);
              }, 2000);
              return 100;
            }
            return next;
          });
        }, interval);

        return () => clearInterval(timer);
        }, [state, duration, onComplete]);

        const handleClick = () => {
        if (state === "idle") {
          setState("downloading");
          setProgress(0);
        }
        };

        return (
        <div ref={ref} {...props} className={cn("flex items-center justify-center", className)}>
          <button
            onClick={handleClick}
            disabled={state !== "idle"}
            className="relative flex flex-col items-center justify-center gap-2 w-64 h-48 bg-transparent outline-none border-none cursor-pointer group select-none"
          >
            {/* Parachute Icon Area */}
            <div className="relative w-20 h-28 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {state === "idle" && (
                  <motion.div
                    key="idle-icon"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    {/* Download Arrow Icon */}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    >
                      <path
                        d="M12 3v12m0 0l-4-4m4 4l4-4"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}

                {state === "downloading" && (
                  <motion.div
                    key="parachute-icon"
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      y: { duration: duration / 1000, ease: "easeInOut" },
                      opacity: { duration: 0.3 }
                    }}
                    className="flex flex-col items-center"
                  >
                    {/* Parachute SVG */}
                    <svg
                      width="48"
                      height="56"
                      viewBox="0 0 48 56"
                      fill="none"
                      className="text-cyan-400"
                    >
                      {/* Canopy (dome) */}
                      <motion.path
                        d="M4 20 C4 8 44 8 44 20"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Canopy segments */}
                      <motion.path
                        d="M4 20 C4 28 16 28 16 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.path
                        d="M16 20 C16 28 32 28 32 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                      <motion.path
                        d="M32 20 C32 28 44 28 44 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                      {/* Strings */}
                      <line x1="4" y1="20" x2="22" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                      <line x1="24" y1="20" x2="24" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                      <line x1="44" y1="20" x2="26" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                      {/* Package box */}
                      <rect x="18" y="42" width="12" height="10" rx="2" fill="currentColor" opacity="0.8" />
                      <line x1="18" y1="47" x2="30" y2="47" stroke="#0a0e1a" strokeWidth="1" />
                      <line x1="24" y1="42" x2="24" y2="52" stroke="#0a0e1a" strokeWidth="1" />
                    </svg>
                  </motion.div>
                )}

                {state === "complete" && (
                  <motion.div
                    key="complete-icon"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex flex-col items-center"
                  >
                    {/* Checkmark */}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-emerald-400"
                    >
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.path
                        d="M8 12l2.5 3L16 9"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Bar Zone */}
            <div className="w-48 flex flex-col items-center gap-3">
              {/* Track */}
              <div className="w-full h-[3px] bg-zinc-800 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    background: state === "complete"
                      ? "linear-gradient(90deg, #10b981, #34d399)"
                      : "linear-gradient(90deg, #06b6d4, #22d3ee)",
                    boxShadow: state === "complete"
                      ? "0 0 10px rgba(16, 185, 129, 0.6)"
                      : "0 0 10px rgba(6, 182, 212, 0.6)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              </div>

              {/* Label */}
              <motion.span
                className="font-mono text-sm tracking-widest font-bold"
                animate={{
                  color: state === "complete" ? "#34d399" : state === "downloading" ? "#22d3ee" : "#71717a",
                }}
              >
                {state === "idle" && "Download"}
                {state === "downloading" && `${Math.round(progress)}%`}
                {state === "complete" && "Complete!"}
              </motion.span>
            </div>
          </button>
        </div>
        );
        });
