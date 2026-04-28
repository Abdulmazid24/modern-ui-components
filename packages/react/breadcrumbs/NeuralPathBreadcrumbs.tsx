"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface BreadcrumbNode {
  id: string;
  label: string;
  href?: string;
  className?: string;
}

export interface NeuralPathBreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  paths: BreadcrumbNode[];
  activeId: string;
  onPathClick?: (id: string) => void;
  accentColor?: string;
}

/**
 * NeuralPathBreadcrumbs - A high-end, physics-based breadcrumb component
 * featuring animated neural connections and synapse-like node interactions.
 */
export const NeuralPathBreadcrumbs = React.forwardRef<HTMLElement, NeuralPathBreadcrumbsProps>(
  ({ className, paths = [], activeId, onPathClick, accentColor = "#8b5cf6", ...props }, ref) => {
    const activeIndex = useMemo(() => paths.findIndex((p) => p.id === activeId), [paths, activeId]);

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("relative flex items-center py-8", className)}
        {...props}
      >
        {/* Background Connection Path (Dull) */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-800 -translate-y-1/2" />

        {/* Active Neural Path (Glowing) */}
        <motion.div
          className="absolute top-1/2 left-0 h-[2px] z-0"
          initial={{ width: 0 }}
          animate={{
            width: `${Math.max(0, (activeIndex / Math.max(1, paths.length - 1)) * 100)}%`,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, ${accentColor}dd)`,
            boxShadow: `0 0 15px ${accentColor}88, 0 0 30px ${accentColor}44`,
            translateY: "-50%",
          }}
        />

        <ol className="relative z-10 flex items-center justify-between w-full list-none p-0 m-0">
          {paths.map((path, index) => {
            const isActive = path.id === activeId;
            const isPast = index <= activeIndex;
            const isLast = index === paths.length - 1;

            return (
              <li key={path.id} className="flex-1 flex flex-col items-center relative">
                {/* Synapse Node */}
                <button
                  onClick={() => onPathClick?.(path.id)}
                  className="group relative flex flex-col items-center focus:outline-none"
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* The actual dot */}
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.4 : 1,
                      backgroundColor: isPast ? accentColor : "#27272a",
                      borderColor: isPast ? accentColor : "#3f3f46",
                      boxShadow: isPast 
                        ? `0 0 10px ${accentColor}aa, 0 0 20px ${accentColor}44` 
                        : "none",
                    }}
                    className="w-4 h-4 rounded-full border-2 z-20 bg-zinc-900 transition-colors duration-500"
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: accentColor }}
                        animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </motion.div>

                  {/* Label - Positioned below to avoid line intersection */}
                  <motion.span
                    initial={false}
                    animate={{
                      y: 8,
                      opacity: isPast ? 1 : 0.5,
                      color: isActive ? "#ffffff" : isPast ? "#d1d5db" : "#71717a",
                    }}
                    className={cn(
                      "absolute top-6 whitespace-nowrap text-[11px] font-bold tracking-widest uppercase transition-colors duration-300",
                      path.className
                    )}
                    style={{
                       textShadow: isActive ? `0 0 10px ${accentColor}88` : 'none'
                    }}
                  >
                    {path.label}
                  </motion.span>

                  {/* Hover Effect Ring */}
                  <div className="absolute -inset-2 rounded-full border border-white/0 group-hover:border-white/10 transition-colors duration-300" />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

NeuralPathBreadcrumbs.displayName = "NeuralPathBreadcrumbs";
