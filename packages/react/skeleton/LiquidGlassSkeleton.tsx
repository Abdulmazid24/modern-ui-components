"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const LiquidGlassSkeleton = React.forwardRef<any, LiquidGlassSkeletonProps>(({ className = "", width = "100%", height = "20px", borderRadius = "12px", ...props }, ref) => {
        // A unique ID so if multiple skeletons are on screen, their SVG filters don't clash
        const filterId = React.useId().replace(/:/g, "");

        return (
        <div ref={ref} {...props} className={cn(className)} 
          className={`relative overflow-hidden bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 ${className}`}
          style={{
            width,
            height,
            borderRadius,
            // Apply the SVG filter to the entire div to distort the gradient sweeping across it
            filter: `url(#liquid-filter-${filterId})`,
          }}
        >
          {/* SVG Turbulence Filter definitions mapped to the top-level HTML, invisible to DOM layout */}
          <svg className="hidden">
            <defs>
              <filter id={`liquid-filter-${filterId}`}>
                {/* The base noise moving horizontally slowly */}
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.02 0.05"
                  numOctaves="2"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.02 0.05; 0.03 0.06; 0.02 0.05"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                {/* Displace the element's actual graphics (the wave gradient) using the noise */}
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="20"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* The Liquid Wave moving across the skeleton */}
          <div 
            className="absolute inset-0 z-0 h-full w-[200%] rotate-[10deg] scale-150"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.03) 70%, transparent 100%)",
              animation: "liquid-sweep 3s ease-in-out infinite",
            }}
          />
          
          {/* Fallback standard CSS animation if SVG filter is computationally heavy */}
          <style dangerouslySetInnerHTML={{__html: `
        @keyframes liquid-sweep {
          0% { transform: translateX(-100%) rotate(10deg) scale(1.5); }
          100% { transform: translateX(50%) rotate(10deg) scale(1.5); }
        }
      `}} />
        </div>
        );
        });
