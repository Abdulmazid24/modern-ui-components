"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PortalHoverCard = React.forwardRef<any, any>(({ className, avatar, name = "Sarah Chen", bio = "Senior Engineer building the future of component libraries.", ...props }, ref) => {
        const [hovered, setHovered] = useState(false);
        return (
        <div ref={ref} {...props} className={cn("relative inline-block", className)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <span className="text-violet-400 font-medium cursor-pointer border-b border-dashed border-violet-400/30">@{name.split(" ")[0].toLowerCase()}</span>
          {hovered && (
            <motion.div initial={{ opacity: 0, y: 5, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 p-4 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 z-50" style={{ boxShadow: "0 -15px 40px rgba(0,0,0,0.4)" }}>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-zinc-900/95 border-r border-b border-white/10" />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">{name[0]}</div>
                <div><p className="text-white text-sm font-bold">{name}</p><p className="text-xs text-zinc-500">@{name.split(" ")[0].toLowerCase()}</p></div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{bio}</p>
            </motion.div>
          )}
        </div>
        );
        });
