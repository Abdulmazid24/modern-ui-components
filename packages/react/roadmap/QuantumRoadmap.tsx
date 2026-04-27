"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, CircleDashed } from "lucide-react";
import { cn } from "../utils";

export interface RoadmapItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date?: string;
  readonly status: "planned" | "in-progress" | "completed";
}

export interface QuantumRoadmapProps {
  readonly items: readonly RoadmapItem[];
  readonly className?: string;
}

const STATUS_CONFIG = {
  "completed": { icon: CheckCircle2, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5", glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
  "in-progress": { icon: Clock, color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/5", glow: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
  "planned": { icon: CircleDashed, color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/5", glow: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]" }
};

/** QuantumRoadmap — Premium grid-based roadmap display with status-specific neon highlights and interactive cards. */
export const QuantumRoadmap = React.forwardRef<HTMLDivElement, QuantumRoadmapProps>(
  ({ className, items, ...props }, ref) => {
    
    // Group items by status
    const grouped = {
      "planned": items.filter(i => i.status === "planned"),
      "in-progress": items.filter(i => i.status === "in-progress"),
      "completed": items.filter(i => i.status === "completed"),
    };

    const Column = ({ title, status, list }: { title: string, status: "planned" | "in-progress" | "completed", list: RoadmapItem[] }) => {
      const config = STATUS_CONFIG[status];
      const Icon = config.icon;

      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-zinc-800">
            <Icon size={18} className={config.color} />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <span className="ml-auto text-xs font-mono bg-zinc-900 px-2 py-0.5 rounded-md text-zinc-500">{list.length}</span>
          </div>

          <div className="flex flex-col gap-4">
            {list.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "group relative p-5 rounded-2xl border transition-all duration-500 cursor-default overflow-hidden",
                  config.border, config.bg, config.glow,
                  "hover:-translate-y-1 hover:bg-zinc-900/80"
                )}
              >
                {/* Subtle top gradient */}
                <div className={cn("absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity", `bg-gradient-to-r from-transparent via-${config.color.split('-')[1]}-500/50 to-transparent`)} />
                
                <h4 className="text-base font-semibold text-zinc-200 mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{item.description}</p>
                
                {item.date && (
                  <div className="inline-flex px-2 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                    {item.date}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} {...props} className={cn("grid md:grid-cols-3 gap-8 lg:gap-12", className)}>
        <Column title="Planned" status="planned" list={grouped["planned"]} />
        <Column title="In Progress" status="in-progress" list={grouped["in-progress"]} />
        <Column title="Completed" status="completed" list={grouped["completed"]} />
      </div>
    );
  }
);
QuantumRoadmap.displayName = "QuantumRoadmap";
