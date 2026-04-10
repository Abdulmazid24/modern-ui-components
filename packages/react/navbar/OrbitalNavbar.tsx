"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface OrbitalNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string; // e.g. '#8b5cf6'
}

export interface OrbitalNavbarProps {
  items: OrbitalNavItem[];
  centerIcon?: React.ReactNode;
  defaultActive?: string;
  onChange?: (id: string) => void;
}

export const OrbitalNavbar: React.FC<OrbitalNavbarProps> = ({
  items,
  centerIcon,
  defaultActive,
  onChange,
}) => {
  const [activeId, setActiveId] = useState(defaultActive || items[0]?.id);
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [radius, setRadius] = useState(130);

  // Responsive radius
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      setRadius(w <= 480 ? 80 : w <= 768 ? 110 : 130);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <div className="orbital-nav-container">
      {/* Orbital ring */}
      <div className="orbital-ring" />
      <div className="orbital-ring-glow" />

      {/* Center hub */}
      <button
        className="orbital-center"
        onClick={() => setIsExpanded((p) => !p)}
        aria-label="Toggle navigation"
      >
        <div className="orbital-center-pulse" />
        {centerIcon || (
          <div className="orbital-center-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </div>
        )}
      </button>

      {/* Orbiting items */}
      {items.map((item, index) => {
        const angle = (index / items.length) * 360 - 90; // Start from top
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <button
            key={item.id}
            className={`orbital-item ${isActive ? 'active' : ''}`}
            style={{
              '--orbital-x': `${x}px`,
              '--orbital-y': `${y}px`,
              '--orbital-color': item.color,
              '--orbital-delay': `${index * 0.08}s`,
              transform: isExpanded
                ? `translate(${x}px, ${y}px) scale(${isHovered ? 1.2 : 1})`
                : 'translate(0, 0) scale(0)',
              opacity: isExpanded ? 1 : 0,
            } as React.CSSProperties}
            onClick={() => handleClick(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Glow behind active */}
            {isActive && <div className="orbital-item-glow" style={{ background: item.color }} />}

            <span className="orbital-item-icon">{item.icon}</span>

            {/* Tooltip */}
            <span className="orbital-item-tooltip">{item.label}</span>

            {/* Connection line to center */}
            {isActive && (
              <svg className="orbital-line" viewBox="0 0 200 200" style={{
                width: radius * 2 + 60,
                height: radius * 2 + 60,
                left: `calc(50% - ${radius + 30}px)`,
                top: `calc(50% - ${radius + 30}px)`,
              }}>
                <line
                  x1="50%" y1="50%"
                  x2={`${50 + (x / (radius * 2 + 60)) * 100}%`}
                  y2={`${50 + (y / (radius * 2 + 60)) * 100}%`}
                  stroke={item.color}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
};
