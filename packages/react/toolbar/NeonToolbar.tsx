"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface NeonToolbarProps { readonly children: React.ReactNode; readonly orientation?: "horizontal" | "vertical"; readonly className?: string; }

/** NeonToolbar — A glowing toolbar container that unifies buttons, toggles, and controls with a shared neon border beam and glass surface. */
export const NeonToolbar = React.forwardRef<HTMLDivElement, NeonToolbarProps>(
  ({ className, children, orientation = "horizontal", ...props }, ref) => (
    <div ref={ref} {...props}
      className={cn("relative inline-flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/60 overflow-hidden",
        orientation === "vertical" && "flex-col", className)}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      {React.Children.map(children, (child) => (
        <div className="relative z-10">{child}</div>
      ))}
    </div>
  )
);
NeonToolbar.displayName = "NeonToolbar";

export interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { readonly active?: boolean; }
export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, active, children, ...props }, ref) => (
    <motion.button ref={ref} {...props} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
        active ? "bg-violet-500/15 text-violet-300 border border-violet-500/20" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border border-transparent", className)}>
      {children}
    </motion.button>
  )
);
ToolbarButton.displayName = "ToolbarButton";

export const ToolbarSeparator = ({ className }: { className?: string }) => (
  <div className={cn("w-px h-5 bg-zinc-800 mx-0.5", className)} />
);
