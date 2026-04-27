"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "../utils";

export interface QuantumBackToTopProps {
  readonly threshold?: number; // scroll offset to show
  readonly position?: "bottom-right" | "bottom-left";
  readonly className?: string;
}

/** QuantumBackToTop — Floating back-to-top button with scroll progress border and neon glow. */
export const QuantumBackToTop = React.forwardRef<HTMLButtonElement, QuantumBackToTopProps>(
  ({ className, threshold = 400, position = "bottom-right", ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        setIsVisible(scrollTop > threshold);
        setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const posClass = position === "bottom-right" ? "bottom-8 right-8" : "bottom-8 left-8";

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.button
            ref={ref} {...props}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn("fixed z-50 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-white shadow-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all group", posClass, className)}
          >
            {/* Scroll Progress SVG Border */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-800" />
              <motion.circle 
                cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="144" strokeLinecap="round"
                className="text-violet-500 transition-all duration-150"
                style={{ strokeDashoffset: 144 - progress * 144 }}
              />
            </svg>

            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    );
  }
);
QuantumBackToTop.displayName = "QuantumBackToTop";
