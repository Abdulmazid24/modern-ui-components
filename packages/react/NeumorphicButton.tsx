"use client";

import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from "@/utils";

interface NeumorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
    className?: string;
}

export const NeumorphicButton = React.forwardRef<any, NeumorphicButtonProps>(({ children, className = '', ...props }, ref) => {
        return (
        <button ref={ref} {...props} className={cn(className)} 
          className={`neo-btn px-8 py-3 font-semibold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {children}
        </button>
        );
        });
