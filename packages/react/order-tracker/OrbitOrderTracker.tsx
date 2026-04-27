"use client";
import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle2, Box } from "lucide-react";
import { cn } from "../utils";

export interface OrderStage {
  readonly id: string;
  readonly label: string;
  readonly date?: string;
  readonly icon?: React.ReactNode;
}

export interface OrbitOrderTrackerProps {
  readonly stages: readonly OrderStage[];
  readonly currentStage: number; // 0-indexed
  readonly className?: string;
}

const DEFAULT_STAGES: OrderStage[] = [
  { id: "s1", label: "Order Placed", icon: <Box size={20} /> },
  { id: "s2", label: "Processing", icon: <Package size={20} /> },
  { id: "s3", label: "In Transit", icon: <Truck size={20} /> },
  { id: "s4", label: "Delivered", icon: <CheckCircle2 size={20} /> }
];

/** OrbitOrderTracker — E-commerce tracking display with animated glowing connection beams. */
export const OrbitOrderTracker = React.forwardRef<HTMLDivElement, OrbitOrderTrackerProps>(
  ({ className, stages = DEFAULT_STAGES, currentStage, ...props }, ref) => {
    
    return (
      <div ref={ref} {...props} className={cn("w-full py-8", className)}>
        <div className="relative flex justify-between items-start max-w-4xl mx-auto">
          
          {/* Background Track Line */}
          <div className="absolute top-6 left-10 right-10 h-1 bg-zinc-800 -z-10 rounded-full" />

          {/* Animated Progress Beam */}
          <motion.div 
            className="absolute top-6 left-10 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 -z-10 shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-full"
            initial={false}
            animate={{ width: `calc(${(Math.min(currentStage, stages.length - 1) / (stages.length - 1)) * 100}% - ${40}px)` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />

          {stages.map((stage, idx) => {
            const isCompleted = idx <= currentStage;
            const isActive = idx === currentStage;

            return (
              <div key={stage.id} className="relative z-10 flex flex-col items-center text-center w-32 -mx-6">
                {/* Node */}
                <div 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 bg-zinc-950",
                    isCompleted ? "border-violet-500 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]" : "border-zinc-800 text-zinc-600"
                  )}
                >
                  <div className={cn("transition-transform duration-500", isActive && "scale-110")}>
                    {stage.icon}
                  </div>
                  
                  {/* Pulse on active */}
                  {isActive && (
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border-2 border-cyan-400 rounded-full"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="mt-4 flex flex-col gap-1">
                  <span className={cn("font-semibold text-sm transition-colors duration-500", isCompleted ? "text-white" : "text-zinc-500")}>
                    {stage.label}
                  </span>
                  {stage.date && (
                    <span className="text-xs font-mono text-zinc-500">{stage.date}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
OrbitOrderTracker.displayName = "OrbitOrderTracker";
