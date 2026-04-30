"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ElasticSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
    className?: string;
}

export const ElasticSlider = React.forwardRef<any, ElasticSliderProps>(({ className, min = 0, max = 100, defaultValue = 50, onChange, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);
        const [containerWidth, setContainerWidth] = useState(0);

        // Motion values for thumb and SVG path
        const x = useMotionValue(0);
        const pathY = useMotionValue(0); // Y pull of the elastic line

        useEffect(() => {
        if (containerRef.current) {
          const width = containerRef.current.getBoundingClientRect().width;
          setContainerWidth(width);
          // Set initial position
          const initialPercent = (defaultValue - min) / (max - min);
          x.set(width * initialPercent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [containerRef]);

        // Calculate value based on x position
        const percentage = useTransform(x, [0, containerWidth || 1], [0, 100]);
        const value = useTransform(percentage, (p) => {
        const val = min + (p / 100) * (max - min);
        return Math.max(min, Math.min(max, Math.round(val)));
        });

        // The SVG path draws a straight line, but curves down/up when dragged
        const svgPath = useTransform([x, pathY], ([latestX, latestY]) => {
        const width = containerWidth || 300;
        const cx = latestX as number;
        const cy = latestY as number;

        // Q is quadratic bezier: start, control point (cx, cy), end
        // To make it look elastic, the curve only happens heavily near the thumb
        return `M 0 20 Q ${cx} ${20 + cy * 2} ${width} 20`;
        });

        const handleDragStart = () => {
        setIsDragging(true);
        };

        const handleDrag = (_event: any, info: any) => {
        // Pull the string down/up based on vertical drag velocity, bounded loosely
        const dragY = Math.max(-30, Math.min(30, info.offset.y));
        pathY.set(dragY);
        onChange?.(value.get());
        };

        const handleDragEnd = () => {
        setIsDragging(false);
        onChange?.(value.get());
        // Snap the string back to center like a rubber band
        animate(pathY, 0, { type: "spring", stiffness: 500, damping: 10 });
        };

        return (
        <div ref={ref} {...props} className={cn(className)} 
          ref={containerRef}
          className="relative w-full max-w-md h-40 flex items-center justify-center p-6"
        >
          {/* Dynamic Tooltip following thumb */}
          <motion.div
            className="absolute top-0 flex flex-col items-center pointer-events-none"
            style={{ x }}
          >
            <motion.div
              animate={{
                y: isDragging ? -10 : 0,
                scale: isDragging ? 1 : 0.8,
                opacity: isDragging ? 1 : 0,
              }}
              className="bg-pink-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg relative"
            >
              <ValueDisplay value={value} />
              {/* Tooltip triangle */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-500" />
            </motion.div>
          </motion.div>

          {/* Elastic SVG Line */}
          <svg className="absolute w-full h-10 top-1/2 -translate-y-1/2 overflow-visible pointer-events-none">
            {/* Track Track */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Active Track Overlay (clipped to thumb position using complex SVG could work, but easy hack is gradient) */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: percentage }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Draggable Thumb */}
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="absolute left-0 w-8 h-8 -ml-4 rounded-full bg-white shadow-[0_0_20px_rgba(236,72,153,0.5)] cursor-grab active:cursor-grabbing flex items-center justify-center z-10"
          >
            <motion.div
              animate={{ scale: isDragging ? 0 : 1 }}
              className="w-3 h-3 rounded-full bg-pink-500"
            />
          </motion.div>
        </div>
        );
        });
        
function ValueDisplay({ value }: { value: any }) {
  const [display, setDisplay] = useState(value.get());
  useEffect(() => {
    const unsub = value.on("change", (v: number) => {
      queueMicrotask(() => setDisplay(v));
    });
    return unsub;
  }, [value]);
  return <>{display}</>;
}
