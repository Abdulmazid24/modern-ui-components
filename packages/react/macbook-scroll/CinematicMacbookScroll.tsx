"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../utils";

export interface MacbookScrollProps { readonly src: string; readonly title?: string; readonly badge?: React.ReactNode; readonly className?: string; }

/** CinematicMacbookScroll — A scroll-triggered MacBook that opens its lid as you scroll, revealing your content inside the screen. */
export const CinematicMacbookScroll = React.forwardRef<HTMLDivElement, MacbookScrollProps>(
  ({ className, src, title, badge, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const lidRotate = useTransform(scrollYProgress, [0, 0.4], ["-80deg", "0deg"]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
      <div ref={containerRef} className={cn("relative h-[150vh]", className)}>
        <div className="sticky top-20 flex flex-col items-center" ref={ref} {...props}>
          {title && <motion.h3 className="text-3xl font-bold text-white mb-8 text-center" style={{ opacity }}>{title}</motion.h3>}
          {badge && <motion.div className="mb-4" style={{ opacity }}>{badge}</motion.div>}
          <motion.div className="relative" style={{ scale, perspective: "1200px" }}>
            {/* Screen / Lid */}
            <motion.div className="relative w-[600px] bg-zinc-900 rounded-t-2xl border border-zinc-700 overflow-hidden origin-bottom"
              style={{ rotateX: lidRotate }}>
              <div className="p-2 bg-zinc-950">
                <div className="flex items-center gap-1.5 mb-2 px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <img src={src} alt="Screen content" className="w-full rounded-lg" />
              </div>
            </motion.div>
            {/* Base / Keyboard */}
            <div className="w-[660px] h-4 bg-zinc-800 rounded-b-xl mx-auto border-x border-b border-zinc-700" style={{ background: "linear-gradient(to bottom, #3f3f46, #27272a)" }}>
              <div className="w-20 h-1 bg-zinc-600 rounded-full mx-auto mt-1" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);
CinematicMacbookScroll.displayName = "CinematicMacbookScroll";
