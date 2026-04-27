"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../utils";

export interface WizardStep {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
}

export interface HolographicWizardProps {
  readonly steps: readonly WizardStep[];
  readonly currentStep: number; // 0-indexed
  readonly direction?: "horizontal" | "vertical";
  readonly className?: string;
}

/** HolographicWizard — Premium step indicator with animated progress beam and glowing nodes. */
export const HolographicWizard = React.forwardRef<HTMLDivElement, HolographicWizardProps>(
  ({ className, steps, currentStep, direction = "horizontal", ...props }, ref) => {
    const isHorizontal = direction === "horizontal";

    return (
      <div 
        ref={ref} {...props} 
        className={cn("relative flex", isHorizontal ? "flex-row items-start justify-between w-full" : "flex-col items-start gap-8", className)}
      >
        {/* Background Track Line */}
        <div className={cn("absolute bg-zinc-800 -z-10", isHorizontal ? "top-6 left-6 right-6 h-1" : "left-6 top-6 bottom-6 w-1")} />

        {/* Animated Progress Beam */}
        <motion.div 
          className={cn("absolute bg-gradient-to-r from-violet-500 to-cyan-400 -z-10 shadow-[0_0_15px_rgba(139,92,246,0.5)]", isHorizontal ? "top-6 left-6 h-1" : "left-6 top-6 w-1 bg-gradient-to-b")}
          initial={false}
          animate={isHorizontal ? { width: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%` } : { height: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const isPending = idx > currentStep;

          return (
            <div key={step.id} className={cn("relative z-10 flex", isHorizontal ? "flex-col items-center text-center w-32 -mx-10" : "flex-row items-center gap-4")}>
              {/* Node */}
              <div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  isCompleted ? "bg-violet-500 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]" : 
                  isActive ? "bg-zinc-950 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110" : 
                  "bg-zinc-900 border-zinc-700 text-zinc-500"
                )}
              >
                {isCompleted ? <Check size={20} /> : (step.icon || <span className="font-bold">{idx + 1}</span>)}
              </div>

              {/* Text */}
              <div className={cn("flex flex-col", isHorizontal ? "mt-4" : "mt-0")}>
                <span className={cn("font-bold text-sm transition-colors", isActive ? "text-white" : isCompleted ? "text-violet-300" : "text-zinc-500")}>
                  {step.title}
                </span>
                {step.description && (
                  <span className={cn("text-xs transition-colors", isActive ? "text-cyan-400/80" : "text-zinc-600")}>
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
HolographicWizard.displayName = "HolographicWizard";
