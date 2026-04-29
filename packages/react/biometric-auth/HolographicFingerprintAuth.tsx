"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Fingerprint, CheckCircle2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HolographicFingerprintAuthProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  requiredScanTimeMs?: number;
}

export const HolographicFingerprintAuth = React.forwardRef<HTMLDivElement, HolographicFingerprintAuthProps>(
  ({ className, onSuccess, requiredScanTimeMs = 2000, ...props }, ref) => {
    const [scanState, setScanState] = useState<"idle" | "scanning" | "success" | "error">("idle");
    const [progress, setProgress] = useState(0);
    const scanTimerRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const controls = useAnimation();

    const startScan = () => {
      if (scanState === "success") return;
      
      setScanState("scanning");
      setProgress(0);
      controls.start({
        y: ["-100%", "100%"],
        transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
      });

      // Increment progress visually
      const intervalTime = 50;
      const increment = (intervalTime / requiredScanTimeMs) * 100;
      
      progressIntervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p + increment >= 100) return 100;
          return p + increment;
        });
      }, intervalTime);

      scanTimerRef.current = setTimeout(() => {
        completeScan();
      }, requiredScanTimeMs);
    };

    const stopScan = () => {
      if (scanState === "success") return;
      
      setScanState("idle");
      setProgress(0);
      controls.stop();
      
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    const completeScan = () => {
      setScanState("success");
      setProgress(100);
      controls.stop();
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      
      if (onSuccess) {
        setTimeout(onSuccess, 1000);
      }
    };

    useEffect(() => {
      return () => {
        if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      };
    }, []);

    return (
      <div 
        ref={ref} 
        className={cn("flex flex-col items-center justify-center p-8", className)} 
        {...props}
      >
        <motion.div
          onMouseDown={startScan}
          onMouseUp={stopScan}
          onMouseLeave={stopScan}
          onTouchStart={startScan}
          onTouchEnd={stopScan}
          animate={{
            scale: scanState === "scanning" ? 0.95 : 1,
            boxShadow: scanState === "scanning" 
              ? "0 0 40px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.4)" 
              : scanState === "success"
                ? "0 0 60px rgba(16, 185, 129, 0.5)"
                : "0 0 0px rgba(139, 92, 246, 0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "relative w-40 h-40 rounded-full border-2 flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-md transition-colors duration-300 select-none",
            scanState === "success" 
              ? "border-emerald-500 bg-emerald-500/10" 
              : "border-zinc-800 bg-zinc-950/80 hover:border-violet-500/50 hover:bg-zinc-900"
          )}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
          
          {/* Fingerprint Icon Container */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {scanState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="fingerprint"
                  animate={{ 
                    opacity: scanState === "scanning" ? 0.8 : 0.4,
                  }}
                  className="relative"
                >
                  <Fingerprint className={cn(
                    "w-20 h-20 transition-colors duration-300",
                    scanState === "scanning" ? "text-violet-400" : "text-zinc-600"
                  )} />
                  
                  {/* Holographic Scanner Line */}
                  {scanState === "scanning" && (
                    <motion.div
                      animate={controls}
                      className="absolute left-[-20%] right-[-20%] h-1 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee,0_0_30px_#8b5cf6]"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Ring */}
          {scanState !== "success" && (
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
              <circle
                cx="80"
                cy="80"
                r="78"
                fill="none"
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="4"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="78"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray="490"
                strokeDashoffset={490 - (490 * progress) / 100}
                strokeLinecap="round"
                className="transition-all duration-100 ease-linear"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>

        <div className="mt-8 text-center h-12">
          <AnimatePresence mode="wait">
            {scanState === "idle" && (
              <motion.p 
                key="idle" 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="text-zinc-500 font-medium tracking-wide uppercase text-sm"
              >
                Press & Hold to Authenticate
              </motion.p>
            )}
            {scanState === "scanning" && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-1"
              >
                <p className="text-violet-400 font-bold tracking-widest uppercase text-sm animate-pulse">
                  Analyzing Biometrics...
                </p>
                <p className="text-xs text-zinc-500 font-mono">{Math.round(progress)}% MATCH</p>
              </motion.div>
            )}
            {scanState === "success" && (
              <motion.p 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="text-emerald-400 font-bold tracking-widest uppercase text-sm drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              >
                Identity Confirmed
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

HolographicFingerprintAuth.displayName = "HolographicFingerprintAuth";
