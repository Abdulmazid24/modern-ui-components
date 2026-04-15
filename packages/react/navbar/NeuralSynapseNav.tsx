"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface NeuralNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
    className?: string;
}

export interface NeuralSynapseNavProps {
  items: NeuralNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * NeuralSynapseNav — A biologically inspired navbar where nodes are connected
 * by pulsing filaments. Selecting a new node fires a "synapse pulse" along the path.
 */
export const NeuralSynapseNav = React.forwardRef<any, NeuralSynapseNavProps>(({ items, activeId: controlledActiveId, onChange, className = '', ...props }, ref) => {
        const [internalActiveId, setInternalActiveId] = useState(items[0]?.id);
        const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;
        const [prevActiveId, setPrevActiveId] = useState<string | null>(null);

        const [isFiring, setIsFiring] = useState(false);
        const navRef = useRef<HTMLDivElement>(null);

        const handleClick = (id: string) => {
        if (id === activeId) return;
        setPrevActiveId(activeId);
        setInternalActiveId(id);
        setIsFiring(true);
        onChange?.(id);

        // Reset firing state after animation
        setTimeout(() => setIsFiring(false), 800);
        };

        return (
        <nav ref={ref} {...props} className={`neural-nav ${className}`} ref={navRef} role="navigation">
          {/* The Synapse Connections Layer */}
          <svg className="neural-grid" aria-hidden="true">
            <defs>
              <linearGradient id="synapsePulse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            
            {/* Draw lines between consecutive nodes (simplified grid) */}
            {items.map((_, i) => i < items.length - 1 && (
              <line 
                key={i}
                x1={`${(100 / (items.length - 1)) * i}%`} 
                y1="50%" 
                x2={`${(100 / (items.length - 1)) * (i + 1)}%`} 
                y2="50%"
                className="neural-filament"
              />
            ))}

            {/* Pulse animation line overlaying filaments */}
            {isFiring && (
              <div className="neural-pulse-container">
                {/* The actual pulse logic will be handled via CSS on the filaments or a separate element */}
              </div>
            )}
          </svg>

          <div className="neural-items">
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              const isRecentlyActive = item.id === prevActiveId;
              
              return (
                <button 
                  key={item.id}
                  className={`neural-node ${isActive ? 'active' : ''} ${isRecentlyActive && isFiring ? 'source' : ''}`}
                  onClick={() => handleClick(item.id)}
                  aria-selected={isActive}
                  style={{ left: `${(100 / (items.length - 1)) * index}%` } as React.CSSProperties}
                >
                  <div className="neural-node-core">
                    <span className="neural-icon">{item.icon}</span>
                    <div className="neural-glow" />
                  </div>
                  <span className="neural-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        );
        });
