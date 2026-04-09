import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface IslandNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface DynamicIslandNavProps {
  items: IslandNavItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
}

/**
 * DynamicIslandNav — Inspired by Apple's Dynamic Island.
 * The navbar is a floating pill that morphs its shape. When an item
 * is selected, the island expands to reveal the active label with
 * a smooth spring animation. The active icon slides into the island.
 */
export const DynamicIslandNav: React.FC<DynamicIslandNavProps> = ({
  items,
  defaultActive,
  onChange,
}) => {
  const [activeId, setActiveId] = useState(defaultActive || items[0]?.id);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = items.find((i) => i.id === activeId);

  const handleClick = useCallback(
    (id: string) => {
      if (id === activeId) return;
      setActiveId(id);
      setIsExpanded(true);
      onChange?.(id);

      // Auto-collapse after 2s
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsExpanded(false), 2000);
    },
    [activeId, onChange]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="island-nav-wrapper">
      {/* Dynamic Island — expanded state showing active label */}
      <div className={`island-pill ${isExpanded ? 'expanded' : ''}`}>
        <span className="island-pill-icon">{activeItem?.icon}</span>
        <span className="island-pill-label">{activeItem?.label}</span>
      </div>

      {/* Main navigation items */}
      <nav className="island-nav" ref={navRef}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              className={`island-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="island-nav-icon">{item.icon}</span>
              <span className="island-nav-label">{item.label}</span>
              {isActive && <span className="island-nav-dot" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
