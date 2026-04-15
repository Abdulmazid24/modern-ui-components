"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, X, Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type NeuralType = "success" | "error" | "warning" | "info";

export interface NeuralImpulse {
  id: string;
  type: NeuralType;
  title: string;
  message: string;
  duration?: number;
}

interface NeuralImpulseToastProps extends NeuralImpulse {
  index: number;
  total: number;
  onDismiss: (id: string) => void;
}

/**
 * NeuralImpulseToast
 * A world-first "Biological Synapse" inspired notification system.
 * Features electric connecting threads and neural discharge entry logic.
 */
export const NeuralImpulseToast = React.forwardRef<HTMLDivElement, NeuralImpulseToastProps>(
  ({ id, type, title, message, index, total, duration = 5000, onDismiss }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Auto-dismiss logic
    useEffect(() => {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }, [id, duration, onDismiss]);

    const theme = {
      success: { color: "#22d3ee", icon: <CheckCircle size={20} /> },
      error: { color: "#a855f7", icon: <Zap size={20} /> },
      warning: { color: "#f59e0b", icon: <AlertTriangle size={20} /> },
      info: { color: "#3b82f6", icon: <Info size={20} /> },
    };

    const currentTheme = theme[type] || theme.info;

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, x: 50, scale: 0.8, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: 100, scale: 0.9, filter: "blur(10px)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative group w-80 mb-4 p-[1px] rounded-2xl overflow-hidden",
          "bg-gradient-to-br from-zinc-800 to-zinc-950",
          "shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        )}
      >
        {/* Synapse Connection Line (Connecting To Previous) */}
        {index > 0 && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 20 }}
            className="absolute -top-5 left-8 w-[2px] bg-gradient-to-b from-transparent to-cyan-400 z-0 opacity-40"
          />
        )}

        <div className="relative z-10 bg-zinc-950/90 backdrop-blur-xl p-4 rounded-[15px] flex gap-4 items-start border border-zinc-800/50">
          {/* Animated Icon Ring */}
          <div className="relative shrink-0 mt-1">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-cyan-500/20"
            />
            <div className="relative z-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              {currentTheme.icon}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-zinc-100 font-bold text-sm tracking-tight mb-1 flex items-center gap-2">
              {title}
              <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
              {message}
            </p>
          </div>

          <button 
            onClick={() => onDismiss(id)}
            className="text-zinc-600 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Neural Discharge Pulse Effect */}
        <motion.div
          animate={{
            left: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-[45deg] z-20"
        />

        {/* Progress Bar (Pulse) */}
        <motion.div 
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        />
      </motion.div>
    );
  }
);

NeuralImpulseToast.displayName = "NeuralImpulseToast";

/**
 * NeuralContainer
 * Manage multiple impulse toasts with synaptic wiring.
 */
export const NeuralContainer = ({ toasts, onDismiss }: { toasts: NeuralImpulse[], onDismiss: (id: string) => void }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, idx) => (
          <NeuralImpulseToast
            key={toast.id}
            {...toast}
            index={idx}
            total={toasts.length}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
