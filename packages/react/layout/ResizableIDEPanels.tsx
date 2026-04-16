"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../utils";

interface PanelProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  className?: string;
}

interface ResizableLayoutProps {
  direction?: "horizontal" | "vertical";
  children: React.ReactElement<PanelProps>[];
  className?: string;
}

/**
 * A pro-grade nested layout system. 
 * Supports both Horizontal and Vertical splitting with resizable glass handles.
 */
export const ResizableIDEPanels = ({
  direction = "horizontal",
  children,
  className,
}: ResizableLayoutProps) => {
  const [sizes, setSizes] = useState<number[]>(() => 
     children.map(child => child.props.defaultSize || 100 / children.length)
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingIdx = useRef<number | null>(null);

  const onMouseDown = (idx: number) => {
    draggingIdx.current = idx;
    document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (draggingIdx.current === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const idx = draggingIdx.current;
    
    // Calculate relative position based on direction
    const totalSize = direction === "horizontal" ? rect.width : rect.height;
    const offset = direction === "horizontal" ? rect.left : rect.top;
    const mousePos = direction === "horizontal" ? e.clientX : e.clientY;
    
    const relativePos = ((mousePos - offset) / totalSize) * 100;
    
    // Sum of previous panels
    const prevSum = sizes.slice(0, idx).reduce((a, b) => a + b, 0);
    const newSize = relativePos - prevSum;
    const nextSize = sizes[idx] + sizes[idx+1] - newSize;
    
    // Simple constraint check (min 10%)
    if (newSize > 10 && nextSize > 10) {
      const newSizes = [...sizes];
      newSizes[idx] = newSize;
      newSizes[idx+1] = nextSize;
      setSizes(newSizes);
    }
  }, [sizes, direction]);

  const onMouseUp = () => {
    draggingIdx.current = null;
    document.body.style.cursor = "";
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full h-full overflow-hidden bg-zinc-950 border border-zinc-900 rounded-3xl",
        direction === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {React.Children.map(children, (child, i) => (
        <React.Fragment key={i}>
          <div
            style={{ 
              flex: `${sizes[i]} 1 0%`,
              [direction === "horizontal" ? "width" : "height"]: `${sizes[i]}%`
            }}
            className={cn("relative overflow-hidden", child.props.className)}
          >
            {child}
          </div>
          
          {/* Draggable Divider */}
          {i < children.length - 1 && (
            <div
              onMouseDown={() => onMouseDown(i)}
              className={cn(
                "z-50 transition-colors hover:bg-purple-500/50",
                direction === "horizontal" 
                  ? "w-1 cursor-col-resize bg-zinc-900 h-full" 
                  : "h-1 cursor-row-resize bg-zinc-900 w-full"
              )}
            >
               {/* Decorative handle dot */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={cn("rounded-full bg-zinc-700", direction === "horizontal" ? "w-0.5 h-4" : "h-0.5 w-4")} />
               </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Panel = ({ children, className }: PanelProps) => (
  <div className={cn("w-full h-full p-4 selection:bg-purple-500/30", className)}>
    {children}
  </div>
);
