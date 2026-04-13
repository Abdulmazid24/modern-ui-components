"use client";

import React, { useState } from 'react';
import { cn } from "@/utils";

export interface MorphToggleProps {
  defaultChecked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  onChange?: (checked: boolean) => void;
    className?: string;
}

export const MorphToggle = React.forwardRef<any, MorphToggleProps>(({ className, defaultChecked = false, size = 'md', label, onChange, ...props }, ref) => {
        const [checked, setChecked] = useState(defaultChecked);

        const toggle = () => {
        const next = !checked;
        setChecked(next);
        onChange?.(next);
        };

        const sizeClass = size === 'md' ? '' : size;

        return (
        <div ref={ref} {...props} className={cn("flex items-center gap-3", className)}>
          <button
            role="switch"
            aria-checked={checked}
            onClick={toggle}
            className={`morph-toggle-track ${checked ? 'on' : 'off'} ${sizeClass}`}
          >
            <span className="morph-toggle-thumb" />
          </button>
          {label && (
            <span className="text-sm font-medium text-white/70">{label}</span>
          )}
        </div>
        );
        });
