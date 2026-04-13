"use client";

import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from "@/utils";

interface NeumorphicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
    className?: string;
}

export const NeumorphicInput = React.forwardRef<any, NeumorphicInputProps>(({ icon, className = '', ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn(className)}  className={`relative w-full ${className}`}>
          <input
            className="neo-input w-full px-5 py-4 focus:outline-none placeholder-gray-500 font-medium tracking-wide transition-all"
            {...props}
          />
          {icon && (
            <div className="absolute inset-y-0 right-5 flex items-center justify-center text-gray-500">
              {icon}
            </div>
          )}
        </div>
        );
        });
