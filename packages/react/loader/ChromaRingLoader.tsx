"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface ChromaRingLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ChromaRingLoader = React.forwardRef<HTMLDivElement, ChromaRingLoaderProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizes = {
      sm: "w-12 h-12",
      md: "w-24 h-24",
      lg: "w-32 h-32",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center rounded-full",
          sizes[size],
          className
        )}
        style={{
          boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)",
        }}
        {...props}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] 
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              ease: "linear",
              duration: 1.5,
            },
            filter: {
              repeat: Infinity,
              ease: "linear",
              duration: 3,
            }
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(to top right, #06b6d4, #3b82f6)",
            maskImage: "radial-gradient(circle, transparent 55%, black 56%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 56%)",
            boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.8)",
          }}
        />
        
        {/* Optional: Add an outer soft ring for more depth */}
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
      </div>
    );
  }
);

ChromaRingLoader.displayName = "ChromaRingLoader";
