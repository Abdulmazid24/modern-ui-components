"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "../utils";

const COUNTER_DURATION_MS = 1500;

export interface PulseStatisticProps {
  readonly value: number;
  readonly title: string;
  readonly prefix?: React.ReactNode;
  readonly suffix?: React.ReactNode;
  readonly precision?: number;
  readonly trend?: { value: number; label?: string };
  readonly icon?: React.ReactNode;
  readonly animate?: boolean;
  readonly className?: string;
}

/** PulseStatistic — Animated KPI counter that counts up on viewport entry with trend indicator and neon accent. */
export const PulseStatistic = React.forwardRef<HTMLDivElement, PulseStatisticProps>(
  ({ className, value, title, prefix, suffix, precision = 0, trend, icon, animate = true, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(animate ? 0 : value);

    useEffect(() => {
      if (!animate || !isInView) return;
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / COUNTER_DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setDisplayValue(eased * value);
        if (progress >= 1) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    }, [isInView, value, animate]);

    const formattedValue = displayValue.toFixed(precision);
    const trendColor = trend ? (trend.value > 0 ? "text-emerald-400" : trend.value < 0 ? "text-red-400" : "text-zinc-500") : "";
    const TrendIcon = trend ? (trend.value > 0 ? TrendingUp : trend.value < 0 ? TrendingDown : Minus) : null;

    return (
      <div ref={containerRef}>
        <motion.div ref={ref} {...props}
          className={cn("relative p-5 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-colors", className)}
          initial={animate ? { opacity: 0, y: 10 } : {}}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-start justify-between mb-3">
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">{title}</p>
            {icon && <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">{icon}</div>}
          </div>

          <div className="flex items-baseline gap-1">
            {prefix && <span className="text-sm text-zinc-500">{prefix}</span>}
            <span className="text-3xl font-bold text-white tabular-nums">{formattedValue}</span>
            {suffix && <span className="text-sm text-zinc-500">{suffix}</span>}
          </div>

          {trend && (
            <div className={cn("flex items-center gap-1 mt-2 text-xs font-semibold", trendColor)}>
              {TrendIcon && <TrendIcon size={14} />}
              <span>{trend.value > 0 ? "+" : ""}{trend.value}%</span>
              {trend.label && <span className="text-zinc-600 font-normal ml-1">{trend.label}</span>}
            </div>
          )}
        </motion.div>
      </div>
    );
  }
);
PulseStatistic.displayName = "PulseStatistic";
