"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const LIST_SPRING = { type: "spring", stiffness: 300, damping: 25 } as const;

export interface NeonListItem {
  readonly id: string;
  readonly title: React.ReactNode;
  readonly description?: React.ReactNode;
  readonly avatar?: React.ReactNode;
  readonly extra?: React.ReactNode;
  readonly meta?: React.ReactNode;
}

export interface NeonListProps {
  readonly items: readonly NeonListItem[];
  readonly bordered?: boolean;
  readonly hoverable?: boolean;
  readonly size?: "sm" | "md" | "lg";
  readonly loadMore?: React.ReactNode;
  readonly emptyText?: string;
  readonly className?: string;
}

const SIZE_MAP = { sm: "py-2 px-3", md: "py-3.5 px-4", lg: "py-5 px-5" } as const;

/** NeonList — Structured list with avatar, meta, actions, staggered reveal, and neon hover accent. */
export const NeonList = React.forwardRef<HTMLDivElement, NeonListProps>(
  ({ className, items, bordered = true, hoverable = true, size = "md", loadMore, emptyText = "No items", ...props }, ref) => (
    <div ref={ref} {...props} className={cn(bordered && "border border-zinc-800 rounded-2xl overflow-hidden", className)}>
      {items.length === 0 && (
        <div className="py-12 text-center text-zinc-600 text-xs">{emptyText}</div>
      )}
      {items.map((item, i) => (
        <motion.div key={item.id}
          className={cn("flex items-center gap-4 border-b border-zinc-800/50 last:border-b-0 group transition-colors", SIZE_MAP[size], hoverable && "hover:bg-white/[0.02]")}
          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.03, ...LIST_SPRING }}>
          {/* Left accent line on hover */}
          {hoverable && <div className="w-[2px] self-stretch rounded-full bg-transparent group-hover:bg-violet-500/40 transition-colors shrink-0" />}

          {item.avatar && <div className="shrink-0">{item.avatar}</div>}

          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-zinc-200 truncate">{item.title}</div>
            {item.description && <div className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{item.description}</div>}
            {item.meta && <div className="text-[10px] text-zinc-600 mt-1">{item.meta}</div>}
          </div>

          {item.extra && <div className="shrink-0">{item.extra}</div>}
        </motion.div>
      ))}
      {loadMore && <div className="p-4 border-t border-zinc-800/50 text-center">{loadMore}</div>}
    </div>
  )
);
NeonList.displayName = "NeonList";
