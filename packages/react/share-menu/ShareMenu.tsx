"use client";

import React, { useState, useCallback } from 'react';
import { Share2 } from 'lucide-react';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface ShareMenuItem {
  /** Unique identifier */
  id: string;
  /** Icon to display (any React node — SVG, emoji, component) */
  icon: React.ReactNode;
  /** Accessible label & tooltip */
  label: string;
  /** Background color of the item circle */
  color: string;
  /** URL to navigate to */
  href?: string;
  /** Click handler (alternative to href) */
  onClick?: () => void;
}

export interface ShareMenuProps {
  /** Array of social share items */
  items: ShareMenuItem[];
  /** Radius of the circular layout in pixels */
  radius?: number;
  /** Size of each item circle in pixels */
  itemSize?: number;
  /** Size of the toggle button in pixels */
  toggleSize?: number;
  /** Starting angle in degrees (default: -90 = top) */
  startAngle?: number;
  /** Toggle icon override */
  toggleIcon?: React.ReactNode;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when open state changes */
  onToggle?: (open: boolean) => void;
  /** Additional CSS classes */
  className?: string;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export const ShareMenu: React.FC<ShareMenuProps> = ({
  items,
  radius = 110,
  itemSize = 50,
  toggleSize = 60,
  startAngle = -90,
  toggleIcon,
  isOpen: controlledOpen,
  onToggle,
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  }, [isOpen, isControlled, onToggle]);

  // Close menu when an item is clicked
  const handleItemClick = useCallback(
    (item: ShareMenuItem) => {
      if (item.onClick) {
        item.onClick();
      }
      if (!isControlled) setInternalOpen(false);
      onToggle?.(false);
    },
    [isControlled, onToggle]
  );

  const angleStep = 360 / items.length;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: (radius + itemSize) * 2, height: (radius + itemSize) * 2 }}
      role="menu"
      aria-label="Share menu"
    >
      {/* Social Items */}
      {items.map((item, index) => {
        const angle = startAngle + angleStep * index;
        const rad = (angle * Math.PI) / 180;
        const x = isOpen ? Math.cos(rad) * radius : 0;
        const y = isOpen ? Math.sin(rad) * radius : 0;

        const Wrapper = item.href ? 'a' : 'button';
        const wrapperProps = item.href
          ? { href: item.href, target: '_blank' as const, rel: 'noopener noreferrer' }
          : { type: 'button' as const };

        return (
          <Wrapper
            key={item.id}
            {...wrapperProps}
            role="menuitem"
            aria-label={item.label}
            title={item.label}
            className="absolute rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{
              width: itemSize,
              height: itemSize,
              backgroundColor: item.color,
              transform: `translate(${x}px, ${y}px) scale(${isOpen ? 1 : 0})`,
              opacity: isOpen ? 1 : 0,
              transition: `transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${index * 0.05}s, opacity 0.3s ease ${index * 0.04}s`,
              zIndex: 2,
            }}
            onClick={() => handleItemClick(item)}
          >
            {item.icon}
          </Wrapper>
        );
      })}

      {/* Toggle Button */}
      <button
        type="button"
        aria-label={isOpen ? 'Close share menu' : 'Open share menu'}
        aria-expanded={isOpen}
        className="absolute rounded-full flex items-center justify-center cursor-pointer border-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        style={{
          width: toggleSize,
          height: toggleSize,
          backgroundColor: '#ffffff',
          color: '#333333',
          zIndex: 5,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
          transform: isOpen ? 'rotate(360deg)' : 'rotate(0deg)',
          boxShadow: isOpen
            ? '0 6px 8px rgba(0,0,0,0.15), 0 0 0 2px #333, 0 0 0 8px #fff'
            : '0 4px 16px rgba(0,0,0,0.15)',
        }}
        onClick={handleToggle}
      >
        {toggleIcon || <Share2 size={24} />}
      </button>
    </div>
  );
};
