"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils";

export interface QuantumDataCardProps {
  readonly title: string;
  readonly description?: string;
  readonly headerAction?: React.ReactNode;
  readonly footerAction?: { label: string; onClick: () => void };
  readonly children: React.ReactNode; // The data view (chart, list, etc)
  readonly className?: string;
}

/** QuantumDataCard — Data-focused container card with animated cyber-gradient border on hover. */
export const QuantumDataCard = React.forwardRef<HTMLDivElement, QuantumDataCardProps>(
  ({ className, title, description, headerAction, footerAction, children, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn("relative group rounded-[2rem] bg-zinc-950 flex flex-col", className)}>
        {/* Animated Gradient Border (visible on hover) */}
        <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        <div className="absolute inset-0 rounded-[2rem] bg-zinc-950/90 backdrop-blur-3xl -z-10" />
        <div className="absolute inset-0 rounded-[2rem] border border-zinc-800 group-hover:border-transparent transition-colors duration-500 pointer-events-none -z-10" />

        <div className="p-6 pb-4 flex items-start justify-between gap-4 border-b border-zinc-800/50 relative z-10">
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
            {description && <p className="text-sm text-zinc-400 mt-1">{description}</p>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>

        <div className="p-6 flex-1 relative z-10">
          {children}
        </div>

        {footerAction && (
          <div className="p-4 pt-0 relative z-10">
            <button 
              onClick={footerAction.onClick}
              className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all group/btn"
            >
              <span className="text-sm font-medium text-zinc-300 group-hover/btn:text-white transition-colors">{footerAction.label}</span>
              <ChevronRight size={16} className="text-zinc-500 group-hover/btn:text-violet-400 group-hover/btn:translate-x-1 transition-all" />
            </button>
          </div>
        )}
      </div>
    );
  }
);
QuantumDataCard.displayName = "QuantumDataCard";
