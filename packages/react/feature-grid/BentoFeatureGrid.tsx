"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface BentoFeatureItem {
  readonly id: string;
  readonly title: string;
  readonly description: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly visual?: React.ReactNode;
  readonly colSpan?: 1 | 2 | 3;
  readonly rowSpan?: 1 | 2;
  readonly className?: string;
}

export interface BentoFeatureGridProps {
  readonly features: readonly BentoFeatureItem[];
  readonly columns?: 2 | 3 | 4;
  readonly className?: string;
}

/** BentoFeatureGrid — 2026 Bento Grid layout for feature showcases with glassmorphic cards and hover reveals. */
export const BentoFeatureGrid = React.forwardRef<HTMLDivElement, BentoFeatureGridProps>(
  ({ className, features, columns = 3, ...props }, ref) => {
    return (
      <div ref={ref} {...props} 
        className={cn(
          "grid gap-4 md:gap-6 auto-rows-[250px]", 
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "md:grid-cols-2 lg:grid-cols-4",
          className
        )}>
        {features.map((feature, i) => (
          <motion.div 
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "relative group rounded-[2rem] bg-zinc-950 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-500 flex flex-col",
              feature.colSpan === 2 && "md:col-span-2",
              feature.colSpan === 3 && "md:col-span-2 lg:col-span-3",
              feature.rowSpan === 2 && "row-span-2",
              feature.className
            )}
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Optional Visual / Graphic Area */}
            {feature.visual && (
              <div className="flex-1 relative overflow-hidden bg-zinc-900/30 flex items-center justify-center p-6 border-b border-zinc-800/50">
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  {feature.visual}
                </div>
              </div>
            )}

            {/* Text Content */}
            <div className={cn("p-8 relative z-10", !feature.visual && "flex-1 flex flex-col justify-center")}>
              {feature.icon && (
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <div className="text-sm text-zinc-400 leading-relaxed">{feature.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
);
BentoFeatureGrid.displayName = "BentoFeatureGrid";
