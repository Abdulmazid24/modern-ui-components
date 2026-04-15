"use client";

import React, { useState, useCallback } from 'react';
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Types & Interfaces
   ────────────────────────────────────────────── */

export interface MagicNavItem {
  /** Unique identifier for the nav item */
  id: string;
  /** React node to render as the icon */
  icon: React.ReactNode;
  /** Accessible label for screen readers & tooltips */
  label: string;
    className?: string;
}

export interface MagicNavbarProps {
  /** Array of navigation items to display */
  items: MagicNavItem[];
  /** Active item ID — makes this a controlled component */
  activeId?: string;
  /** Default active item ID for uncontrolled usage */
  defaultActiveId?: string;
  /** Callback fired when the active item changes */
  onChange?: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles — use for CSS custom property overrides */
  style?: React.CSSProperties;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export const MagicNavbar = React.forwardRef<any, MagicNavbarProps>(({ items, activeId: controlledActiveId, defaultActiveId, onChange, className = '', style, ...props }, ref) => {
        // Internal state for uncontrolled mode
        const [internalActiveId, setInternalActiveId] = useState(
        defaultActiveId || items[0]?.id || ''
        );

        const isControlled = controlledActiveId !== undefined;
        const activeId = isControlled ? controlledActiveId : internalActiveId;
        const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));

        // Handle item selection
        const handleClick = useCallback(
        (id: string) => {
          if (!isControlled) setInternalActiveId(id);
          onChange?.(id);
        },
        [isControlled, onChange]
        );

        // Full keyboard navigation: Arrow keys, Home, End
        const handleKeyDown = useCallback(
        (e: React.KeyboardEvent, idx: number) => {
          let next = idx;
          switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              next = (idx + 1) % items.length;
              break;
            case 'ArrowLeft':
            case 'ArrowUp':
              next = (idx - 1 + items.length) % items.length;
              break;
            case 'Home':
              next = 0;
              break;
            case 'End':
              next = items.length - 1;
              break;
            default:
              return;
          }
          e.preventDefault();
          handleClick(items[next].id);

          // Move focus to the newly active button
          const nav = (e.currentTarget as HTMLElement).closest('.magic-nav');
          const buttons = nav?.querySelectorAll<HTMLButtonElement>('.magic-nav-btn');
          buttons?.[next]?.focus();
        },
        [items, handleClick]
        );

        // Calculate indicator horizontal position
        const itemWidthPercent = 100 / items.length;
        const indicatorLeft = `calc(${activeIndex * itemWidthPercent}% + ${itemWidthPercent / 2}% - 35px)`;

        return (
        <nav ref={ref} {...props} className={cn(className)} 
          className={`magic-nav ${className}`}
          role="navigation"
          aria-label="Main navigation"
          style={style}
        >
          {/* Animated curved indicator */}
          <div
            className="magic-nav-indicator"
            style={{ left: indicatorLeft }}
            aria-hidden="true"
          />

          {/* Navigation items */}
          <ul className="magic-nav-list" role="tablist" aria-label="Navigation tabs">
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              return (
                <li ref={ref} {...props} className={cn(className)} 
                  key={item.id}
                  className="magic-nav-item"
                  style={{ width: `${itemWidthPercent}%` }}
                >
                  <button
                    role="tab"
                    id={`magic-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-label={item.label}
                    tabIndex={isActive ? 0 : -1}
                    className={`magic-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleClick(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    title={item.label}
                  >
                    <span
                      className={`magic-nav-icon ${isActive ? 'magic-nav-icon-active' : ''}`}
                    >
                      {item.icon}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        );
        });
