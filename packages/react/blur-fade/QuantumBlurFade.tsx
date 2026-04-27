"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface QuantumBlurFadeProps { readonly children: React.ReactNode; readonly delay?: number; readonly duration?: number; readonly yOffset?: number; readonly className?: string; }

/** QuantumBlurFade — A reveal animation where content materializes from a blurred, translucent state with vertical offset. */
export const QuantumBlurFade = React.forwardRef<HTMLDivElement, QuantumBlurFadeProps>(
  ({ className, children, delay = 0, duration = 0.6, yOffset = 12, ...props }, ref) => (
    <motion.div ref={ref} {...props} className={cn("", className)}
      initial={{ opacity: 0, y: yOffset, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}>
      {children}
    </motion.div>
  )
);
QuantumBlurFade.displayName = "QuantumBlurFade";
