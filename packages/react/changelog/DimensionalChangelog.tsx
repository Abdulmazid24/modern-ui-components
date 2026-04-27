"use client";
import React from "react";
import { motion } from "framer-motion";
import { GitCommit, Sparkles, Bug, Zap } from "lucide-react";
import { cn } from "../utils";

export interface ChangelogItem {
  readonly id: string;
  readonly version: string;
  readonly date: string;
  readonly type?: "feature" | "fix" | "improvement" | "release";
  readonly title: string;
  readonly description: React.ReactNode;
}

export interface DimensionalChangelogProps {
  readonly items: readonly ChangelogItem[];
  readonly className?: string;
}

const TYPE_CONFIG = {
  feature: { icon: Sparkles, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  fix: { icon: Bug, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  improvement: { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  release: { icon: GitCommit, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
};

/** DimensionalChangelog — Premium version history timeline with type-based glowing nodes and staggered reveals. */
export const DimensionalChangelog = React.forwardRef<HTMLDivElement, DimensionalChangelogProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn("relative max-w-4xl mx-auto pl-6 sm:pl-10", className)}>
        {/* Animated Timeline Axis */}
        <motion.div 
          initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-4 bottom-4 left-[23px] sm:left-[39px] w-px bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent" 
        />

        <div className="flex flex-col gap-12 sm:gap-16">
          {items.map((item, i) => {
            const config = TYPE_CONFIG[item.type || "release"];
            const Icon = config.icon;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 25 }}
                className="relative group"
              >
                {/* Timeline Node */}
                <div className="absolute -left-10 sm:-left-14 top-1 flex flex-col items-center">
                  <div className={cn("w-8 h-8 rounded-full border flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-125", config.bg, config.border, config.color)}>
                    <Icon size={14} />
                  </div>
                  {/* Outer Glow */}
                  <div className={cn("absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500", config.bg)} />
                </div>

                {/* Content */}
                <div className="pl-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-2xl font-bold text-white tracking-tight">{item.version}</span>
                    <span className={cn("text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border", config.color, config.bg, config.border)}>
                      {item.type || "release"}
                    </span>
                    <span className="text-sm font-medium text-zinc-500 ml-auto">{item.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-zinc-200 mb-3">{item.title}</h3>
                  <div className="text-sm text-zinc-400 leading-relaxed prose prose-invert prose-p:mb-2 max-w-none">
                    {item.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }
);
DimensionalChangelog.displayName = "DimensionalChangelog";
