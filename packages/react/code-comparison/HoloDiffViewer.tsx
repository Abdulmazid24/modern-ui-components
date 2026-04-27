"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const SLIDER_SPRING = { type: "spring", stiffness: 300, damping: 28 } as const;
const LINE_HEIGHT_PX = 24;

export interface DiffLine {
  readonly content: string;
  readonly type: "added" | "removed" | "unchanged";
}

export interface HoloDiffViewerProps {
  beforeTitle?: string;
  afterTitle?: string;
  beforeCode: string;
  afterCode: string;
  language?: string;
  className?: string;
}

/**
 * HoloDiffViewer — A side-by-side code comparison component with
 * holographic diff highlighting. Added lines glow green, removed
 * lines glow red, with a draggable split slider. Inspired by
 * Magic UI's Code Comparison.
 */
export const HoloDiffViewer = React.forwardRef<
  HTMLDivElement,
  HoloDiffViewerProps
>(({ className, beforeTitle = "Before", afterTitle = "After", beforeCode, afterCode, language = "tsx", ...props }, ref) => {
  const [splitPos, setSplitPos] = useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSplitPos(Math.max(10, Math.min(90, percent)));
  };

  const beforeLines = beforeCode.split("\n");
  const afterLines = afterCode.split("\n");
  const maxLines = Math.max(beforeLines.length, afterLines.length);

  const renderLine = (line: string, side: "before" | "after", index: number) => {
    const otherLine = side === "before" ? afterLines[index] : beforeLines[index];
    const isDiff = line !== otherLine;
    const isAdded = side === "after" && isDiff;
    const isRemoved = side === "before" && isDiff;

    return (
      <div
        key={`${side}-${index}`}
        className={cn(
          "flex items-center gap-3 px-4 font-mono text-xs whitespace-pre",
          isAdded && "bg-emerald-500/10 text-emerald-300",
          isRemoved && "bg-red-500/10 text-red-300",
          !isDiff && "text-zinc-400"
        )}
        style={{ height: LINE_HEIGHT_PX }}
      >
        <span className="w-8 text-right text-zinc-600 select-none shrink-0">
          {index + 1}
        </span>
        <span className="w-4 text-center select-none shrink-0">
          {isAdded && <span className="text-emerald-400 font-bold">+</span>}
          {isRemoved && <span className="text-red-400 font-bold">−</span>}
        </span>
        <span>{line ?? ""}</span>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex border-b border-zinc-800">
        <div className="flex-1 px-4 py-3 text-xs font-bold text-red-400 uppercase tracking-widest border-r border-zinc-800 bg-red-500/5">
          {beforeTitle}
        </div>
        <div className="flex-1 px-4 py-3 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5">
          {afterTitle}
        </div>
      </div>

      {/* Diff Content */}
      <div
        ref={containerRef}
        className="relative flex overflow-auto"
        onMouseMove={(e) => { if (e.buttons === 1) handleDrag(e); }}
        onTouchMove={handleDrag}
      >
        {/* Before Panel */}
        <div className="flex-1 overflow-hidden py-3" style={{ maxWidth: `${splitPos}%` }}>
          {Array.from({ length: maxLines }).map((_, i) =>
            renderLine(beforeLines[i] ?? "", "before", i)
          )}
        </div>

        {/* Draggable Splitter */}
        <motion.div
          className="relative w-1 bg-zinc-700 cursor-col-resize z-10 hover:bg-violet-500 transition-colors flex-shrink-0"
          style={{ left: 0 }}
          transition={SLIDER_SPRING}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-12 rounded-full bg-zinc-800 border border-zinc-700 hover:border-violet-500 flex items-center justify-center cursor-col-resize transition-colors">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-zinc-600 rounded-full" />
              <div className="w-0.5 h-4 bg-zinc-600 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* After Panel */}
        <div className="flex-1 overflow-hidden py-3">
          {Array.from({ length: maxLines }).map((_, i) =>
            renderLine(afterLines[i] ?? "", "after", i)
          )}
        </div>
      </div>
    </div>
  );
});

HoloDiffViewer.displayName = "HoloDiffViewer";
