"use client";

import React, { useState, useRef, useCallback } from 'react';
import { cn } from "@/lib/utils";

export interface FluidNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
    className?: string;
}

export interface FluidArcNavbarProps {
  items: FluidNavItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
    className?: string;
}

/**
 * FluidArcNavbar — A bottom navbar where the active item rises on a curved SVG arc.
 * The arc path morphs dynamically based on which item is active, creating a
 * liquid bridge between the navigation bar and the selected icon.
 */
export const FluidArcNavbar = React.forwardRef<any, FluidArcNavbarProps>(({ className, items, defaultActive, onChange, ...props }, ref) => {
        const [activeId, setActiveId] = useState(defaultActive || items[0]?.id);
        const navRef = useRef<HTMLDivElement>(null);

        const activeIndex = items.findIndex((i) => i.id === activeId);
        const itemWidth = 100 / items.length;
        const activeCenter = itemWidth * activeIndex + itemWidth / 2;

        const handleClick = useCallback(
        (id: string) => {
          setActiveId(id);
          onChange?.(id);
        },
        [onChange]
        );

        // SVG arc path — creates a smooth U-shaped cutout at the active item
        const arcWidth = 18; // percentage
        const arcDepth = 28; // px
        const leftStart = Math.max(0, activeCenter - arcWidth / 2);
        const rightEnd = Math.min(100, activeCenter + arcWidth / 2);

        const pathD = `
    M 0,${arcDepth}
    L ${leftStart}%,${arcDepth}
    C ${leftStart + arcWidth * 0.2}%,${arcDepth} ${activeCenter - arcWidth * 0.15}%,0 ${activeCenter}%,0
    C ${activeCenter + arcWidth * 0.15}%,0 ${rightEnd - arcWidth * 0.2}%,${arcDepth} ${rightEnd}%,${arcDepth}
    L 100%,${arcDepth}
    L 100%,80
    L 0,80
    Z
  `;

        return (
        <div ref={ref} {...props} className={cn("fluid-arc-nav", className)} ref={navRef}>
          {/* SVG Background with arc cutout */}
          <svg
            className="fluid-arc-bg"
            viewBox={`0 0 100 80`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.15)" />
                <stop offset="100%" stopColor="rgba(15, 15, 25, 0.95)" />
              </linearGradient>
            </defs>
            <path d={pathD} fill="url(#arcGrad)" className="fluid-arc-path" />
          </svg>

          {/* Nav items */}
          <div className="fluid-arc-items">
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  className={`fluid-arc-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className="fluid-arc-icon-wrap"
                    style={{
                      transform: isActive ? 'translateY(-22px) scale(1.2)' : 'translateY(0) scale(1)',
                    }}
                  >
                    {/* Active glow ring */}
                    {isActive && <span className="fluid-arc-glow" />}
                    <span className="fluid-arc-icon">{item.icon}</span>
                  </span>
                  <span
                    className="fluid-arc-label"
                    style={{
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        );
        });
