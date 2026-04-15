"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";

export interface GlowNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
    className?: string;
}

export interface GlowParticleNavbarProps {
  items: GlowNavItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
    className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

let particleIdCounter = 0;

export const GlowParticleNavbar = React.forwardRef<any, GlowParticleNavbarProps>(({ className, items, defaultActive, onChange, ...props }, ref) => {
        const [activeId, setActiveId] = useState(defaultActive || items[0]?.id);
        const [particles, setParticles] = useState<Particle[]>([]);
        const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
        const navRef = useRef<HTMLDivElement>(null);
        const particleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

        // Update indicator position
        useEffect(() => {
        if (!navRef.current) return;
        const activeEl = navRef.current.querySelector(
          `[data-glow-id="${activeId}"]`
        ) as HTMLElement | null;

        if (activeEl) {
          const navRect = navRef.current.getBoundingClientRect();
          const elRect = activeEl.getBoundingClientRect();
          setIndicatorStyle({
            left: elRect.left - navRect.left + elRect.width / 2,
            width: elRect.width * 0.5,
          });
        }
        }, [activeId, items]);

        // Spawn particles on hover
        const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const colors = ['#a78bfa', '#c084fc', '#818cf8', '#e879f9', '#67e8f9'];
        const newParticle: Particle = {
          id: particleIdCounter++,
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 10,
          size: 2 + Math.random() * 4,
          opacity: 0.5 + Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setParticles((prev) => [...prev.slice(-25), newParticle]);
        }, []);

        // Clean up old particles
        useEffect(() => {
        const timer = setInterval(() => {
          setParticles((prev) => prev.slice(Math.max(0, prev.length - 15)));
        }, 200);
        return () => clearInterval(timer);
        }, []);

        const handleClick = (id: string) => {
        setActiveId(id);
        onChange?.(id);
        };

        return (
        <nav ref={ref} {...props} className={cn("glow-particle-nav", className)}
          ref={navRef}
          onMouseMove={handleMouseMove}
        >
          {/* Particles layer */}
          <div className="glow-particles-layer" aria-hidden="true">
            {particles.map((p) => (
              <div
                key={p.id}
                className="glow-particle-dot"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                }}
              />
            ))}
          </div>

          {/* Active indicator line */}
          <div className="glow-indicator" style={indicatorStyle} />

          {/* Nav items */}
          {items.map((item) => (
            <button
              key={item.id}
              data-glow-id={item.id}
              className={`glow-nav-item ${activeId === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
            >
              <span className="glow-nav-icon">{item.icon}</span>
              <span className="glow-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        );
        });
