"use client";

import React, { useState, useRef, useEffect } from 'react';

export interface BlobNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface MorphBlobNavbarProps {
  items: BlobNavItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
}

export const MorphBlobNavbar: React.FC<MorphBlobNavbarProps> = ({
  items,
  defaultActive,
  onChange,
}) => {
  const [activeId, setActiveId] = useState(defaultActive || items[0]?.id);
  const navRef = useRef<HTMLDivElement>(null);
  const [blobStyle, setBlobStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(
      `[data-nav-id="${activeId}"]`
    ) as HTMLElement | null;

    if (activeEl) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setBlobStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        height: elRect.height,
      });
    }
  }, [activeId, items]);

  const handleClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <nav className="morph-blob-nav" ref={navRef}>
      {/* The morphing blob indicator */}
      <div className="morph-blob" style={blobStyle}>
        <div className="morph-blob-inner" />
        <div className="morph-blob-glow" />
      </div>

      {items.map((item) => (
        <button
          key={item.id}
          data-nav-id={item.id}
          className={`morph-blob-item ${activeId === item.id ? 'active' : ''}`}
          onClick={() => handleClick(item.id)}
        >
          <span className="morph-blob-icon">{item.icon}</span>
          <span className="morph-blob-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
