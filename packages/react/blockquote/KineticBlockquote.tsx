"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "../utils";

export interface KineticBlockquoteProps {
  readonly children: React.ReactNode;
  readonly author?: string;
  readonly source?: string;
  readonly gradient?: boolean;
  readonly className?: string;
}

/** KineticBlockquote — Animated blockquote with neon accent line and floating quote mark. */
export const KineticBlockquote = React.forwardRef<HTMLQuoteElement, KineticBlockquoteProps>(
  ({ className, children, author, source, gradient = true, ...props }, ref) => {
    return (
      <motion.blockquote 
        ref={ref} {...props} 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={cn("relative pl-6 sm:pl-8 py-2 my-8 group", className)}
      >
        {/* Animated Left Border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 rounded-full overflow-hidden">
          {gradient && (
            <motion.div 
              initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 to-cyan-400" 
            />
          )}
        </div>

        {/* Floating Quote Icon */}
        <Quote className="absolute -top-3 -left-3 w-8 h-8 text-zinc-800/50 group-hover:text-violet-500/20 transition-colors duration-500 -rotate-12 pointer-events-none" />

        <div className="relative z-10 text-xl sm:text-2xl font-medium text-zinc-300 leading-relaxed italic">
          {children}
        </div>

        {(author || source) && (
          <footer className="mt-4 flex items-center gap-2 text-sm">
            {author && <span className="font-semibold text-white">{author}</span>}
            {author && source && <span className="text-zinc-600">—</span>}
            {source && <cite className="text-zinc-500 not-italic">{source}</cite>}
          </footer>
        )}
      </motion.blockquote>
    );
  }
);
KineticBlockquote.displayName = "KineticBlockquote";
