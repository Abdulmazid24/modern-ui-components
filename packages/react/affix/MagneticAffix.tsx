"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

export interface MagneticAffixProps { readonly offsetTop?: number; readonly offsetBottom?: number; readonly position?: "top" | "bottom"; readonly children: React.ReactNode; readonly className?: string; }

/** MagneticAffix — An element that becomes fixed (sticky) when scrolled past, with a magnetic slide-in animation and neon border on activation. */
export const MagneticAffix = React.forwardRef<HTMLDivElement, MagneticAffixProps>(
  ({ className, offsetTop = 0, position = "top", children, ...props }, ref) => {
    const [isFixed, setIsFixed] = useState(false);
    const sentinelRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;
      const observer = new IntersectionObserver(([entry]) => setIsFixed(!entry.isIntersecting), { rootMargin: `-${offsetTop}px 0px 0px 0px` });
      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [offsetTop]);

    return (
      <>
        <div ref={sentinelRef} className="h-0 w-full" />
        <motion.div ref={ref} {...props}
          className={cn(isFixed ? "fixed left-0 right-0 z-40" : "relative", position === "top" ? "top-0" : "bottom-0", className)}
          style={isFixed ? { top: offsetTop } : undefined}
          animate={isFixed ? { y: [position === "top" ? -20 : 20, 0] } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}>
          {isFixed && <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />}
          {children}
        </motion.div>
      </>
    );
  }
);
MagneticAffix.displayName = "MagneticAffix";
