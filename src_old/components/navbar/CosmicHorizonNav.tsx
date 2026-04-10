import React, { useState, useCallback } from 'react';

export interface CosmicNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface CosmicHorizonNavProps {
  items: CosmicNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * CosmicHorizonNav — A navbar that follows a celestial horizon arc.
 * Selecting an item triggers a "sunrise" illumination effect behind the icon.
 */
export const CosmicHorizonNav: React.FC<CosmicHorizonNavProps> = ({
  items,
  activeId: controlledActiveId,
  onChange,
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(items[0]?.id);
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;
  const activeIndex = items.findIndex((i) => i.id === activeId);

  const handleClick = (id: string) => {
    setInternalActiveId(id);
    onChange?.(id);
  };

  return (
    <nav className={`cosmic-nav ${className}`} role="navigation">
      <div className="cosmic-horizon-arc">
        {/* The Horizon Curve (SVG) */}
        <svg className="cosmic-svg-arc" viewBox="0 0 400 60" preserveAspectRatio="none">
          <path d="M0,60 Q200,0 400,60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </svg>

        <div className="cosmic-items">
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            // Calculate position along the arc (quadratic bezier approximation)
            const t = index / (items.length - 1);
            const x = t * 100;
            const y = 4 * t * (1 - t) * 50; // simple parabola for arc

            return (
              <button
                key={item.id}
                className={`cosmic-item ${isActive ? 'active' : ''}`}
                onClick={() => handleClick(item.id)}
                aria-selected={isActive}
                style={{
                  left: `${x}%`,
                  bottom: `${y}%`,
                  transform: `translateX(-50%) translateY(50%)`
                } as React.CSSProperties}
              >
                {/* Sunrise backdrop */}
                {isActive && <div className="cosmic-sunrise" />}
                
                <div className="cosmic-item-inner">
                  <span className="cosmic-icon">{item.icon}</span>
                  <span className="cosmic-label">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
