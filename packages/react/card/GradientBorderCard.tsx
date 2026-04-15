"use client";

import React from 'react';
import { cn } from "@/lib/utils";

export interface GradientBorderCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  gradientColors?: [string, string, string];
    className?: string;
}

export const GradientBorderCard = React.forwardRef<any, GradientBorderCardProps>(({ className, title, description, children, gradientColors = ['#f43f5e', '#a855f7', '#3b82f6'], ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn("gradient-border-wrapper", className)}
          style={{
            '--color-1': gradientColors[0],
            '--color-2': gradientColors[1],
            '--color-3': gradientColors[2],
          } as React.CSSProperties}
        >
          <div className="gradient-border-card">
            <div className="gradient-border-content">
              <h3 className="gradient-border-title">{title}</h3>
              <p className="gradient-border-desc">{description}</p>
              {children && <div className="mt-4">{children}</div>}
            </div>
          </div>
        </div>
        );
        });
