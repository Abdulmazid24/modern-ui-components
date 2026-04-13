"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from "@/utils";

export interface SpectrumNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
    className?: string;
}

export interface SpectrumNavbarProps {
  items: SpectrumNavItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
    className?: string;
}

/**
 * SpectrumNavbar — Every tab owns a unique color from the spectrum.
 * On hover/active, the entire bar's ambient light shifts to match
 * that item's color. A prismatic underline sweeps across transitions.
 */
export const SpectrumNavbar = React.forwardRef<any, SpectrumNavbarProps>(({ className, items, defaultActive, onChange, ...props }, ref) => {
        const [activeId, setActiveId] = useState(defaultActive || items[0]?.id);
        const [hoveredId, setHoveredId] = useState<string | null>(null);
        const navRef = useRef<HTMLDivElement>(null);
        const [lineStyle, setLineStyle] = useState<React.CSSProperties>({});

        const activeItem = items.find((i) => i.id === activeId);
        const ambientItem = items.find((i) => i.id === (hoveredId || activeId));
        const ambientHue = ambientItem?.color || '270';

        // Update underline position
        useEffect(() => {
        if (!navRef.current) return;
        const el = navRef.current.querySelector(`[data-spectrum="${activeId}"]`) as HTMLElement;
        if (!el) return;
        const navRect = navRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setLineStyle({
          left: elRect.left - navRect.left + 8,
          width: elRect.width - 16,
        });
        }, [activeId]);

        const handleClick = useCallback(
        (id: string) => {
          setActiveId(id);
          onChange?.(id);
        },
        [onChange]
        );

        return (
        <nav ref={ref} {...props} className={cn(className)} 
          ref={navRef}
          className="spectrum-nav"
          style={{
            '--spectrum-hue': ambientHue,
          } as React.CSSProperties}
        >
          {/* Ambient glow layer */}
          <div className="spectrum-ambient" />

          {/* Items */}
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button ref={ref} {...props} className={cn(className)} 
                key={item.id}
                data-spectrum={item.id}
                className={`spectrum-item ${isActive ? 'active' : ''}`}
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ '--item-hue': item.color } as React.CSSProperties}
              >
                <span className="spectrum-icon">{item.icon}</span>
                <span className="spectrum-label">{item.label}</span>
              </button>
            );
          })}

          {/* Prismatic underline */}
          <div className="spectrum-line" style={lineStyle} />
        </nav>
        );
        });
