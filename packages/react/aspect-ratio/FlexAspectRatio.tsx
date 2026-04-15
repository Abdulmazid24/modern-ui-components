"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const FlexAspectRatio = React.forwardRef<any, any>(({ className, ratio = 16 / 9, children, ...props }, ref) => {
        (
          <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: ratio }}>
            {children || <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-zinc-400 text-sm font-medium">{Math.round(ratio * 100) / 100} : 1</div>}
          </div>
        )
        });
