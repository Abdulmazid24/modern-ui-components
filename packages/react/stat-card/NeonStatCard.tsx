"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "../utils";

export interface NeonStatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly trend?: {
    value: number; // percentage
    isPositive?: boolean; // If not provided, inferred from value > 0
    label?: string; // e.g. "vs last month"
  };
  readonly icon?: React.ReactNode;
  readonly sparkline?: React.ReactNode; // SVG or mini chart
  readonly className?: string;
}

/** NeonStatCard — KPI dashboard card with neon accents, trend indicator, and optional sparkline slot. */
export const NeonStatCard = React.forwardRef<HTMLDivElement, NeonStatCardProps>(
  ({ className, title, value, prefix, suffix, trend, icon, sparkline, ...props }, ref) => {
    const isPositive = trend?.isPositive ?? (trend?.value ? trend.value > 0 : undefined);
    const TrendIcon = isPositive === true ? TrendingUp : isPositive === false ? TrendingDown : Minus;
    const trendColor = isPositive === true ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : isPositive === false ? "text-rose-400 bg-rose-500/10 border-rose-500/20" : "text-zinc-400 bg-zinc-800 border-zinc-700";

    return (
      <div ref={ref} {...props} className={cn("relative p-6 rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all duration-500", className)}>
        {/* Neon Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-start justify-between mb-4 relative z-10">
          <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center shrink-0 group-hover:text-violet-400 group-hover:bg-violet-500/10 group-hover:border-violet-500/20 transition-colors">
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-baseline gap-1">
              {prefix && <span className="text-xl font-medium text-zinc-500">{prefix}</span>}
              <motion.span 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-3xl font-bold text-white tabular-nums tracking-tight">
                {value}
              </motion.span>
              {suffix && <span className="text-xl font-medium text-zinc-500">{suffix}</span>}
            </div>

            {trend && (
              <div className="flex items-center gap-2 mt-2">
                <div className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-xs font-semibold", trendColor)}>
                  <TrendIcon size={12} />
                  {Math.abs(trend.value)}%
                </div>
                {trend.label && <span className="text-xs text-zinc-500">{trend.label}</span>}
              </div>
            )}
          </div>

          {/* Sparkline Slot */}
          {sparkline && (
            <div className="w-24 h-12 opacity-50 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end">
              {sparkline}
            </div>
          )}
        </div>
      </div>
    );
  }
);
NeonStatCard.displayName = "NeonStatCard";
