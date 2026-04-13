"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/utils";

export type PrismAlertType = "info" | "success" | "warning" | "error";

export interface PrismAlertProps {
  type?: PrismAlertType;
  title: string;
  message: string;
  onClose?: () => void;
    className?: string;
}

export const PrismAlert = React.forwardRef<any, PrismAlertProps>(({ className, type = "info", title, message, onClose, ...props }, ref) => {
        const styles = {
        info: {
          from: "from-blue-500/20",
          to: "to-cyan-500/10",
          border: "border-blue-500/30",
          icon: <Info className="text-blue-400" />,
          glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]"
        },
        success: {
          from: "from-emerald-500/20",
          to: "to-teal-500/10",
          border: "border-emerald-500/30",
          icon: <CheckCircle className="text-emerald-400" />,
          glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]"
        },
        warning: {
          from: "from-amber-500/20",
          to: "to-orange-500/10",
          border: "border-amber-500/30",
          icon: <AlertTriangle className="text-amber-400" />,
          glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]"
        },
        error: {
          from: "from-rose-500/20",
          to: "to-red-500/10",
          border: "border-rose-500/30",
          icon: <XCircle className="text-rose-400" />,
          glow: "shadow-[0_0_30px_rgba(244,63,94,0.15)]"
        }
        };

        const selected = styles[type];

        return (
        <motion.div ref={ref} {...props} className={cn(className)} 
          initial={{ opacity: 0, y: -20, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative w-full max-w-lg p-[1px] rounded-2xl overflow-hidden ${selected.glow}`}
          style={{ perspective: 1000 }}
        >
          {/* Prism Iridescent Border Layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-color-dodge" />
          
          {/* Dynamic Animated Rainbow Prism effect on the border edges */}
          <motion.div 
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.4),transparent)] opacity-50 z-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Main Glass Content Box */}
          <div className={`relative z-10 w-full rounded-2xl bg-zinc-950/70 backdrop-blur-xl border ${selected.border} p-4 flex items-start gap-4`}>
            {/* Colorful Gradient Overlay inside the glass */}
            <div className={`absolute inset-0 bg-gradient-to-br ${selected.from} ${selected.to} opacity-50 pointer-events-none`} />
            
            {/* Icon */}
            <div className="relative z-10 p-2 bg-zinc-900/50 rounded-xl border border-white/5 shadow-inner backdrop-blur-md">
              {selected.icon}
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex-1 pt-1">
              <h4 className="text-zinc-100 font-semibold mb-1 tracking-wide">{title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{message}</p>
            </div>

            {/* Close Button */}
            {onClose && (
              <button 
                onClick={onClose}
                className="relative z-10 p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <span className="sr-only">Dismiss</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </motion.div>
        );
        });
