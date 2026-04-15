"use client";

import React, { useState, useCallback, useRef } from 'react';
import { cn } from "@/lib/utils";

export interface RippleNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
    className?: string;
}

export interface RippleTideNavProps {
  items: RippleNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * RippleTideNav — A navbar that behaves like a fluid surface. 
 * Selecting an item creates a splash wave that ripples through the bar.
 */
export const RippleTideNav = React.forwardRef<any, RippleTideNavProps>(({ items, activeId: controlledActiveId, onChange, className = '', ...props }, ref) => {
        const [internalActiveId, setInternalActiveId] = useState(items[0]?.id);
        const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;
        const [rippleIndex, setRippleIndex] = useState<number | null>(null);

        const handleClick = (id: string, index: number) => {
        if (id === activeId) return;
        setRippleIndex(index);
        setInternalActiveId(id);
        onChange?.(id);

        // Clear ripple effect for future animations
        setTimeout(() => setRippleIndex(null), 1000);
        };

        return (
        <nav ref={ref} {...props} className={`ripple-nav ${className}`} role="navigation">
          <div className="ripple-surface">
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              const distToRipple = rippleIndex !== null ? Math.abs(index - rippleIndex) : 99;
              
              return (
                <button 
                  key={item.id}
                  className={`ripple-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleClick(item.id, index)}
                  aria-selected={isActive}
                  style={{
                    '--ripple-delay': `${distToRipple * 0.1}s`,
                    '--ripple-scale': rippleIndex !== null ? (1 - distToRipple * 0.15) : 1
                  } as React.CSSProperties}
                >
                  <div className="ripple-icon-wrapper">
                    <span className="ripple-icon">{item.icon}</span>
                    {isActive && <div className="ripple-splash" />}
                  </div>
                  <span className="ripple-label">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Background liquid container */}
          <div className="ripple-water" />
        </nav>
        );
        });
