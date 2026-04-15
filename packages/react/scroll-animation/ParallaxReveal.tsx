"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const ParallaxReveal = React.forwardRef<any, any>(({ className, children, ...props }, ref) => {
        const localRef = useRef<HTMLDivElement>(null);
        const handleRef = (node: any) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        };

        const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
        const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
        const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
        const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
        return (
        <div ref={handleRef} {...props} className={cn(className)} className="py-20">
          <motion.div style={{ y, opacity, scale }}>
            {children || (
              <div className="w-full max-w-lg mx-auto p-8 rounded-2xl bg-zinc-900/60 border border-white/8 text-center">
                <h2 className="text-2xl font-black text-white mb-2">Scroll Reveal</h2>
                <p className="text-sm text-zinc-400">This content fades in, slides, and scales as you scroll it into view.</p>
              </div>
            )}
          </motion.div>
        </div>
        );
        });
