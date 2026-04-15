"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface SpotlightHeroProps {
  title: string;
  subtitle: string;
  spotlightColor?: string;
  spotlightSize?: number;
    className?: string;
}

export const SpotlightHero = React.forwardRef<any, SpotlightHeroProps>(({ className, title, subtitle, spotlightColor = 'rgba(255, 255, 255, 0.15)', spotlightSize = 400, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
        const [isHovering, setIsHovering] = useState(false);

        const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        /* Track position relative to the container */
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        }, []);

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        /* Touch support for mobile */
        useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
          if (!containerRef.current || e.touches.length === 0) return;
          const rect = containerRef.current.getBoundingClientRect();
          const touch = e.touches[0];
          setMousePosition({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
          });
          setIsHovering(true);
        };

        const container = containerRef.current;
        if (container) {
          container.addEventListener('touchmove', handleTouchMove, { passive: true });
        }
        return () => {
          if (container) {
            container.removeEventListener('touchmove', handleTouchMove);
          }
        };
        }, []);

        return (
        <div ref={ref} {...props} className={cn(className)} 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="spotlight-hero-container"
          style={{
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`,
            '--spotlight-color': spotlightColor,
            '--spotlight-size': `${spotlightSize}px`,
          } as React.CSSProperties}
        >
          {/* Background layer representing the "unlit" state */}
          <div className="spotlight-hero-bg">
            <div className="spotlight-content" aria-hidden="true">
              <h1 className="spotlight-title">{title}</h1>
              <p className="spotlight-subtitle">{subtitle}</p>
            </div>
          </div>

          {/* Foreground layer (illuminated) mapped via CSS mask */}
          <div 
            className={`spotlight-hero-fg ${isHovering ? 'active' : ''}`}
          >
            <div className="spotlight-content">
              <h1 className="spotlight-title glow">{title}</h1>
              <p className="spotlight-subtitle glow">{subtitle}</p>
            </div>
          </div>

          {/* Grid overlay for aesthetic texture */}
          <div className="spotlight-grid" />
        </div>
        );
        });
