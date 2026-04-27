"use client";
import React from "react";
import { cn } from "../utils";

export interface DescriptionItem { readonly label: string; readonly value: React.ReactNode; readonly span?: number; }
export interface HoloDescriptionsProps { readonly title?: string; readonly items: readonly DescriptionItem[]; readonly columns?: number; readonly bordered?: boolean; readonly className?: string; }

/** HoloDescriptions — A key-value display grid with holographic separators and neon label accents. */
export const HoloDescriptions = React.forwardRef<HTMLDivElement, HoloDescriptionsProps>(
  ({ className, title, items, columns = 3, bordered = true, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("bg-zinc-950 rounded-2xl overflow-hidden", bordered && "border border-zinc-800", className)}>
      {title && <div className="px-5 py-3 border-b border-zinc-800 text-sm font-bold text-white">{title}</div>}
      <div className="grid gap-px bg-zinc-800/30" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {items.map((item, i) => (
          <div key={i} className="bg-zinc-950 p-4" style={{ gridColumn: item.span ? `span ${item.span}` : undefined }}>
            <dt className="text-[10px] font-semibold text-violet-400/80 uppercase tracking-widest mb-1">{item.label}</dt>
            <dd className="text-sm text-zinc-200">{item.value}</dd>
          </div>
        ))}
      </div>
    </div>
  )
);
HoloDescriptions.displayName = "HoloDescriptions";
