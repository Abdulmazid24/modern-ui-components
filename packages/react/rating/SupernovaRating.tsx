"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

export interface SupernovaRatingProps {
  maxRating?: number;
  rating?: number;
  onChange?: (rating: number) => void;
    className?: string;
}

export const SupernovaRating = React.forwardRef<any, SupernovaRatingProps>(({ className, maxRating = 5, rating = 0, onChange, ...props }, ref) => {
        const [hoveredRating, setHoveredRating] = useState<number | null>(null);
        const [isAnimating, setIsAnimating] = useState(false);
        const [explodeOrigin, setExplodeOrigin] = useState<{ x: number, y: number } | null>(null);

        const displayRating = hoveredRating !== null ? hoveredRating : rating;

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
        onChange?.(value);

        // Calculate bounding rect to show supernova exactly at click
        const rect = e.currentTarget.getBoundingClientRect();
        const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();

        if (parentRect) {
          setExplodeOrigin({
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top + rect.height / 2,
          });
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 800);
        }
        };

        return (
        <div ref={ref} {...props} className={cn("relative flex items-center p-4 bg-zinc-950 border border-zinc-900 rounded-3xl", className)}
          onMouseLeave={() => setHoveredRating(null)}
        >
          {/* Supernova Shockwave Layer */}
          <AnimatePresence>
            {isAnimating && explodeOrigin && (
              <motion.div
                initial={{ 
                  top: explodeOrigin.y, 
                  left: explodeOrigin.x, 
                  width: 0, 
                  height: 0, 
                  opacity: 1,
                  x: "-50%",
                  y: "-50%"
                }}
                animate={{ 
                  width: 300, 
                  height: 300, 
                  opacity: 0,
                  borderWidth: "0px"
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute rounded-full border-[10px] border-amber-500 shadow-[0_0_50px_rgba(245,158,11,1)] pointer-events-none z-0"
              />
            )}
          </AnimatePresence>

          {/* Stars */}
          <div className="flex gap-2 relative z-10 w-full justify-between sm:justify-start">
            {[...Array(maxRating)].map((_, i) => {
              const value = i + 1;
              const isActive = value <= displayRating;
              // When a newly clicked state completes, we can trigger a bounce on the active stars
              
              return (
                <motion.button
                  key={value}
                  onClick={(e) => handleClick(e, value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  className="relative p-2 rounded-full hover:bg-zinc-900/50 transition-colors focus:outline-none"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill={isActive ? "#fbbf24" : "none"} 
                    stroke={isActive ? "#fbbf24" : "#52525b"} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="transition-colors duration-200"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>

                  {/* Glowing core for active stars that pulses slightly on click */}
                  <AnimatePresence>
                    {isActive && isAnimating && hoveredRating === null && (
                      <motion.div 
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="absolute inset-0 bg-amber-500 rounded-full mix-blend-screen blur-md pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
        );
        });
