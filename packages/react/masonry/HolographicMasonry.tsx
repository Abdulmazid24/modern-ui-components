"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface HolographicMasonryProps {
  readonly items: React.ReactNode[];
  readonly columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  readonly gap?: number; // in px
  readonly className?: string;
}

/** HolographicMasonry — Responsive masonry grid with staggered entrances and optimized column distribution. */
export const HolographicMasonry = React.forwardRef<HTMLDivElement, HolographicMasonryProps>(
  ({ className, items, columns = { default: 1, sm: 2, md: 3, lg: 4 }, gap = 24, ...props }, ref) => {
    const [cols, setCols] = useState(columns.default);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const updateCols = () => {
        const width = window.innerWidth;
        if (width >= 1280 && columns.xl) setCols(columns.xl);
        else if (width >= 1024 && columns.lg) setCols(columns.lg);
        else if (width >= 768 && columns.md) setCols(columns.md);
        else if (width >= 640 && columns.sm) setCols(columns.sm);
        else setCols(columns.default);
      };

      updateCols();
      window.addEventListener("resize", updateCols);
      return () => window.removeEventListener("resize", updateCols);
    }, [columns]);

    // Distribute items into columns
    const columnWrapper: React.ReactNode[][] = Array.from({ length: cols }, () => []);
    items.forEach((item, index) => {
      columnWrapper[index % cols].push(item);
    });

    return (
      <div 
        ref={ref || containerRef} 
        {...props} 
        className={cn("flex w-full", className)}
        style={{ gap: `${gap}px` }}
      >
        {columnWrapper.map((colItems, i) => (
          <div key={i} className="flex flex-col flex-1" style={{ gap: `${gap}px` }}>
            {colItems.map((item, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: (i * 0.1) + (j * 0.05), duration: 0.5 }}
                className="w-full relative group"
              >
                {/* Wrap children to add optional hover effects */}
                <div className="relative z-10 w-full h-full">
                  {item}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    );
  }
);
HolographicMasonry.displayName = "HolographicMasonry";
