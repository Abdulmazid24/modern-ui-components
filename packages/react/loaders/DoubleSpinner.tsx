"use client";

import React from 'react';
import { cn } from "@/utils";

export interface DoubleSpinnerProps {
  /** Spinner diameter in pixels */
  size?: number;
  /** Border thickness in pixels */
  borderWidth?: number;
  /** Primary color (top arc) */
  primaryColor?: string;
  /** Secondary color (bottom arc) */
  secondaryColor?: string;
  /** Animation speed in seconds */
  speed?: number;
  /** Accessible label */
  label?: string;
  className?: string;
}

export const DoubleSpinner = React.forwardRef<any, DoubleSpinnerProps>(({ size = 80, borderWidth = 8, primaryColor = 'rgb(244, 63, 94)', secondaryColor = 'rgb(34, 197, 94)', speed = 1, label = 'Loading', className = '', ...props }, ref) => {
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
              borderWidth: borderWidth,
              borderStyle: 'solid',
              borderColor: `${primaryColor} transparent ${secondaryColor} transparent`,
              animation: `loaderSpin ${speed}s linear infinite`,
            }}
            aria-hidden="true"
          />
          <span className="sr-only">{label}</span>
        </div>
        );
        });
