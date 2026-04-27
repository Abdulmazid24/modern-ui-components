"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "../utils";

export interface HolographicLinkPreviewProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly previewContent?: {
    title: string;
    description: string;
    image?: string;
    domain: string;
  };
  readonly className?: string;
}

/** HolographicLinkPreview — Inline link with animated gradient underline and a floating glassmorphic preview card on hover. */
export const HolographicLinkPreview = React.forwardRef<HTMLAnchorElement, HolographicLinkPreviewProps>(
  ({ className, href, children, previewContent, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <span className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <a 
          ref={ref} {...props} 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn("relative font-medium text-violet-300 hover:text-violet-200 transition-colors group", className)}
        >
          {children}
          {/* Animated underline */}
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
        </a>

        <AnimatePresence>
          {isHovered && previewContent && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-72 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] pointer-events-none z-50 flex flex-col gap-3"
            >
              {/* Pointer triangle */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-zinc-800" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-[7px] border-transparent border-t-zinc-950" />

              {previewContent.image && (
                <div className="w-full h-32 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/50">
                  <img src={previewContent.image} alt={previewContent.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold text-white line-clamp-1">{previewContent.title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{previewContent.description}</p>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                  <ExternalLink size={10} />
                  {previewContent.domain}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    );
  }
);
HolographicLinkPreview.displayName = "HolographicLinkPreview";
