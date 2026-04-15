"use client";

import React from 'react';
import { cn } from "@/lib/utils";

export interface DotsLoaderProps {
  /** Size of each dot in pixels */
  size?: number;
  /** Dot color — any valid CSS color */
  color?: string;
  /** Animation speed in seconds */
  speed?: number;
  /** Accessible label */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

export const DotsLoader = React.forwardRef<any, DotsLoaderProps>(({ size = 14, color = 'rgb(56, 189, 248)', speed = 0.5, label = 'Loading', className = '', ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn(className)} 
          className={`inline-flex items-center gap-[5px] ${className}`}
          role="status"
          aria-label={label}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                animation: `loaderBounce ${speed}s ease infinite alternate`,
                animationDelay: `${i * (speed / 3)}s`,
              }}
              aria-hidden="true"
            />
          ))}
          <span className="sr-only">{label}</span>
        </div>
        );
        });
