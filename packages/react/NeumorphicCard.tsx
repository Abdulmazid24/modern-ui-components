"use client";

import React from 'react';
import { cn } from "@/utils";

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
}

export const NeumorphicCard = React.forwardRef<any, NeumorphicCardProps>(({ children, className = '', ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn(className)}  className={`neo-card p-10 w-full max-w-md mx-auto text-center flex flex-col items-center ${className}`}>
          {children}
        </div>
        );
        });
