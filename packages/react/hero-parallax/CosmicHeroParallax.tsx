"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../utils";

export interface ParallaxItem { readonly src: string; readonly title: string; readonly href?: string; }
export interface CosmicHeroParallaxProps { readonly items: readonly ParallaxItem[]; readonly title?: string; readonly className?: string; }

/** CosmicHeroParallax — A multi-layer parallax hero with staggered image cards that move at different speeds. */
export const CosmicHeroParallax = React.forwardRef<HTMLDivElement, CosmicHeroParallaxProps>(
  ({ className, items, title, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const rows = [items.slice(0, Math.ceil(items.length / 3)), items.slice(Math.ceil(items.length / 3), Math.ceil(items.length * 2 / 3)), items.slice(Math.ceil(items.length * 2 / 3))];
    const yTransforms = [y1, y2, y3];

    return (
      <div ref={containerRef} className={cn("relative h-[200vh] overflow-hidden", className)}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden" ref={ref} {...props}>
          {title && <motion.h2 className="text-5xl font-bold text-white mb-12 z-10" style={{ opacity }}>{title}</motion.h2>}
          <div className="absolute inset-0 flex flex-col gap-4 p-8">
            {rows.map((row, ri) => (
              <motion.div key={ri} className="flex gap-4 justify-center" style={{ y: yTransforms[ri] }}>
                {row.map((item, i) => (
                  <a key={i} href={item.href ?? "#"} className="shrink-0 w-72 h-48 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/30 transition-colors group">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </a>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
CosmicHeroParallax.displayName = "CosmicHeroParallax";
