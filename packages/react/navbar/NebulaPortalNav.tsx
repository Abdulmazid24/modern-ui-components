"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from "@/utils";

export interface NebulaNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
    className?: string;
}

export interface NebulaPortalNavProps {
  items: NebulaNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * NebulaPortalNav — A navigation bar resembling a window into another dimension.
 * Features a parallax nebula background that shifts with mouse movement.
 */
export const NebulaPortalNav = React.forwardRef<any, NebulaPortalNavProps>(({ items, activeId: controlledActiveId, onChange, className = '', ...props }, ref) => {
        const [internalActiveId, setInternalActiveId] = useState(items[0]?.id);
        const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

        const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
        const navRef = useRef<HTMLDivElement>(null);

        const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
        }, []);

        const handleClick = (id: string) => {
        setInternalActiveId(id);
        onChange?.(id);
        };

        return (
        <nav ref={ref} {...props} className={cn(className)}  
          ref={navRef}
          className={`nebula-nav ${className}`}
          onMouseMove={handleMouseMove}
          role="navigation"
        >
          {/* Parallax Nebula Background Layers */}
          <div className="nebula-layers">
            <div 
              className="nebula-layer nebula-bg" 
              style={{ transform: `translate(${(mousePos.x - 50) * 0.1}%, ${(mousePos.y - 50) * 0.1}%)` }}
            />
            <div 
              className="nebula-layer nebula-stars" 
              style={{ transform: `translate(${(mousePos.x - 50) * 0.2}%, ${(mousePos.y - 50) * 0.2}%)` }}
            />
            <div 
              className="nebula-layer nebula-clouds" 
              style={{ transform: `translate(${(mousePos.x - 50) * 0.3}%, ${(mousePos.y - 50) * 0.3}%)` }}
            />
          </div>

          <div className="nebula-content">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button ref={ref} {...props} className={cn(className)} 
                  key={item.id}
                  className={`nebula-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleClick(item.id)}
                  aria-selected={isActive}
                >
                  <div className="nebula-icon-orb">
                    <span className="nebula-icon">{item.icon}</span>
                    {isActive && <div className="nebula-supernova" />}
                  </div>
                  <span className="nebula-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        );
        });
