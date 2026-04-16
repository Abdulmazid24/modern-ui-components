"use client";

import React from "react";
import { cn } from "../utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

/**
 * A cinematic 3D perspective grid background with an animated infinite scroll.
 */
export const RetroGrid = ({ className, angle = 65 }: RetroGridProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]",
        className
      )}
    >
      {/* Grid Container */}
      <div
        className="absolute inset-0 [transform:rotateX(var(--grid-angle))] "
        style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
      >
        <div className="animate-grid [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300%] [inset:0%_-50%] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>

      {/* Atmospheric Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
      
      <style jsx global>{`
        @keyframes grid {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-grid {
          animation: grid 15s linear infinite;
        }
      `}</style>
    </div>
  );
};
