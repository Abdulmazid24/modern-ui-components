import React, { useState, useCallback } from 'react';

export interface PrismNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface CrystallinePrismNavProps {
  items: PrismNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * CrystallinePrismNav — A segmented glass-like navigation bar with prismatic 
 * light refraction effects and caustic shimmers.
 */
export const CrystallinePrismNav: React.FC<CrystallinePrismNavProps> = ({
  items,
  activeId: controlledActiveId,
  onChange,
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(items[0]?.id);
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const handleClick = (id: string) => {
    setInternalActiveId(id);
    onChange?.(id);
  };

  return (
    <nav className={`prism-nav ${className}`} role="navigation">
      <div className="prism-container">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              className={`prism-segment ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-selected={isActive}
            >
              {/* Refraction Layer */}
              <div className="prism-refraction" />
              
              {/* Caustic Shimmer Layer */}
              <div className="prism-shimmer" />

              <div className="prism-content">
                <span className="prism-icon">{item.icon}</span>
                <span className="prism-label">{item.label}</span>
              </div>

              {/* Prismatic Splitting Line */}
              {isActive && <div className="prism-spectrum-line" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
