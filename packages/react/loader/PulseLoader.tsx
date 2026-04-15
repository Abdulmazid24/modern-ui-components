"use client";

import React from 'react';
import { cn } from "@/lib/utils";

export interface PulseLoaderProps {
  /** Circle diameter in pixels */
  size?: number;
  /** Pulse color */
  color?: string;
  /** Animation speed in seconds */
  speed?: number;
  /** Accessible label */
  label?: string;
  className?: string;
}

export const PulseLoader = React.forwardRef<any, PulseLoaderProps>(({ size = 70, color = 'rgb(34, 197, 94)', speed = 1, label = 'Loading', className = '', ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn(className)} 
          className={`inline-flex items-center justify-center ${className}`}
          role="status"
          aria-label={label}
        >
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              animation: `loaderPulse ${speed}s ease infinite`,
            }}
            aria-hidden="true"
          />
          <span className="sr-only">{label}</span>
        </div>
        );
        });
