"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AuraStatus = "online" | "idle" | "dnd" | "offline";

export interface AuraAvatarProps {
  src: string;
  alt?: string;
  size?: number;
  status?: AuraStatus;
    className?: string;
}

export const AuraAvatar = React.forwardRef<any, AuraAvatarProps>(({ className, src, alt = "User Avatar", size = 64, status = "online", ...props }, ref) => {
        // Define aura colors based on status
        const styleMap = {
        online: {
          shadow: "0 0 20px rgba(16, 185, 129, 0.4)", // Emerald
          border: "border-emerald-500",
          pulse: "bg-emerald-500/20"
        },
        idle: {
          shadow: "0 0 20px rgba(245, 158, 11, 0.4)", // Amber
          border: "border-amber-500",
          pulse: "bg-amber-500/20"
        },
        dnd: {
          shadow: "0 0 20px rgba(239, 68, 68, 0.4)", // Red
          border: "border-red-500",
          pulse: "bg-red-500/20"
        },
        offline: {
          shadow: "0 0 10px rgba(113, 113, 122, 0.2)", // Zinc
          border: "border-zinc-500",
          pulse: "bg-zinc-500/10"
        }
        };

        const currentStyle = styleMap[status];

        return (
        <div ref={ref} {...props} className={cn("relative inline-flex items-center justify-center p-2", className)}>
          {/* Dynamic Breathing Aura Rings */}
          {status !== "offline" && (
            <>
              <motion.div
                className={`absolute inset-0 rounded-full ${currentStyle.pulse}`}
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className={`absolute inset-1 rounded-full ${currentStyle.pulse}`}
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </>
          )}

          {/* Main Avatar Container */}
          <div 
            className={`relative rounded-full border-2 p-1 bg-zinc-950 ${currentStyle.border} z-10 transition-colors duration-500`}
            style={{ width: size, height: size, boxShadow: currentStyle.shadow }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-full rounded-full object-cover"
            />
            
            {/* Status indicator dot */}
            <div 
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-950 ${
                status === 'online' ? 'bg-emerald-500' :
                status === 'idle' ? 'bg-amber-500' :
                status === 'dnd' ? 'bg-red-500' :
                'bg-zinc-500'
              }`}
            />
          </div>
        </div>
        );
        });
