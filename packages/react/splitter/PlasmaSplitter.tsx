"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "../utils";

export interface PlasmaSplitterProps {
  readonly children: [React.ReactNode, React.ReactNode];
  readonly defaultRatio?: number; // 0.1 to 0.9 (e.g. 0.5 for 50/50)
  readonly minRatio?: number;
  readonly maxRatio?: number;
  readonly direction?: "horizontal" | "vertical";
  readonly className?: string;
}

/** PlasmaSplitter — Resizable split pane with a glowing plasma drag handle. */
export const PlasmaSplitter = React.forwardRef<HTMLDivElement, PlasmaSplitterProps>(
  ({ className, children, defaultRatio = 0.5, minRatio = 0.1, maxRatio = 0.9, direction = "horizontal", ...props }, ref) => {
    const [ratio, setRatio] = useState(defaultRatio);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const isHorizontal = direction === "horizontal";

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        let newRatio = 0;
        
        if (isHorizontal) {
          const x = e.clientX - rect.left;
          newRatio = x / rect.width;
        } else {
          const y = e.clientY - rect.top;
          newRatio = y / rect.height;
        }

        if (newRatio >= minRatio && newRatio <= maxRatio) {
          setRatio(newRatio);
        }
      };

      const handleMouseUp = () => setIsDragging(false);

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        // Add class to body to prevent text selection and keep cursor during drag
        document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
        document.body.style.userSelect = "none";
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }, [isDragging, isHorizontal, minRatio, maxRatio]);

    return (
      <div 
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }} 
        {...props} 
        className={cn("flex w-full h-full relative overflow-hidden bg-zinc-950", isHorizontal ? "flex-row" : "flex-col", className)}
      >
        {/* Pane 1 */}
        <div 
          className="relative overflow-hidden" 
          style={{ [isHorizontal ? "width" : "height"]: `${ratio * 100}%` }}
        >
          {children[0]}
        </div>

        {/* Resizer Handle */}
        <div 
          onMouseDown={handleMouseDown}
          className={cn(
            "relative group flex items-center justify-center shrink-0 z-10 transition-colors",
            isHorizontal ? "w-1 cursor-col-resize hover:bg-violet-500/30" : "h-1 cursor-row-resize hover:bg-violet-500/30",
            isDragging && "bg-violet-500/50"
          )}
        >
          {/* Plasma Glow Area */}
          <div className={cn(
            "absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-violet-500 to-cyan-400 blur-sm pointer-events-none",
            isHorizontal ? "w-4 inset-y-0 -left-1.5" : "h-4 inset-x-0 -top-1.5",
            isDragging && "opacity-100 blur-md"
          )} />
          
          {/* Visible Grip Line */}
          <div className={cn(
            "absolute bg-zinc-700 rounded-full transition-colors",
            isHorizontal ? "w-px h-8 group-hover:bg-violet-400" : "h-px w-8 group-hover:bg-violet-400",
            isDragging && "bg-cyan-400"
          )} />
        </div>

        {/* Pane 2 */}
        <div 
          className="relative overflow-hidden flex-1 min-w-0 min-h-0"
        >
          {children[1]}
        </div>
      </div>
    );
  }
);
PlasmaSplitter.displayName = "PlasmaSplitter";
