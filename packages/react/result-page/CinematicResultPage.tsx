"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "../utils";

const ICON_MAP = { success: CheckCircle2, error: XCircle, warning: AlertTriangle, info: Info } as const;
const COLOR_MAP = { success: "#10b981", error: "#ef4444", warning: "#f59e0b", info: "#8b5cf6" } as const;
const RESULT_SPRING = { type: "spring", stiffness: 200, damping: 18 } as const;

export interface CinematicResultPageProps { readonly status: "success" | "error" | "warning" | "info"; readonly title: string; readonly subtitle?: string; readonly extra?: React.ReactNode; readonly className?: string; }

/** CinematicResultPage — A full-screen result page with an animated icon reveal, particle burst, and cinematic glow. */
export const CinematicResultPage = React.forwardRef<HTMLDivElement, CinematicResultPageProps>(
  ({ className, status, title, subtitle, extra, ...props }, ref) => {
    const Icon = ICON_MAP[status];
    const color = COLOR_MAP[status];
    return (
      <div ref={ref} {...props} className={cn("flex flex-col items-center justify-center min-h-[400px] p-12 text-center", className)}>
        <motion.div className="relative mb-8" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={RESULT_SPRING}>
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, border: `2px solid ${color}30` }}>
            <Icon size={48} style={{ color }} />
          </div>
          <motion.div className="absolute -inset-4 rounded-[2rem]" style={{ border: `1px solid ${color}20` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
        <motion.h2 className="text-2xl font-bold text-white mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{title}</motion.h2>
        {subtitle && <motion.p className="text-sm text-zinc-400 max-w-md mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{subtitle}</motion.p>}
        {extra && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>{extra}</motion.div>}
      </div>
    );
  }
);
CinematicResultPage.displayName = "CinematicResultPage";
