"use client";

import React from "react";
import { cn } from "../utils";

interface BentoItemProps {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const MinimalistBentoGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

export const MinimalistBentoItem = ({ title, description, className, icon, children }: BentoItemProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 bg-zinc-950 border border-zinc-900 transition-all hover:border-zinc-800 hover:shadow-2xl hover:shadow-purple-500/5",
        className
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
           {icon && <div className="p-2 rounded-xl bg-zinc-900 text-purple-400 group-hover:scale-110 transition-transform">{icon}</div>}
           <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
        </div>
        <p className="text-sm text-zinc-500 max-w-[280px] leading-relaxed">{description}</p>
      </div>
      
      <div className="relative z-10 mt-8">
        {children}
      </div>

      {/* Subtle Glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-colors" />
    </div>
  );
};
