"use client";

import React, { useState, useRef, useCallback } from 'react';
import { cn } from "@/lib/utils";

export interface HoloCardProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
    className?: string;
}

export const HoloCard = React.forwardRef<any, HoloCardProps>(({ className, image, title, subtitle, badge, children, ...props }, ref) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
        const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
        const [isHovering, setIsHovering] = useState(false);

        const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;  // 0 to 1
        const y = (e.clientY - rect.top) / rect.height;   // 0 to 1

        // Tilt: ±15 degrees
        const rotateY = (x - 0.5) * 30;
        const rotateX = (0.5 - y) * 30;

        setTransform({ rotateX, rotateY });
        setGlarePos({ x: x * 100, y: y * 100 });
        }, []);

        const handleMouseLeave = () => {
        setIsHovering(false);
        setTransform({ rotateX: 0, rotateY: 0 });
        setGlarePos({ x: 50, y: 50 });
        };

        return (
        <div ref={ref} {...props} className={cn("holo-card-perspective", className)}>
          <div
            ref={cardRef}
            className="holo-card"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
              transition: isHovering ? 'transform 0.1s ease' : 'transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1)',
            }}
          >
            {/* Base Image */}
            <div className="holo-card-image">
              <img src={image} alt={title} draggable={false} />
            </div>

            {/* Holographic Rainbow Sheen Layer */}
            <div
              className="holo-sheen"
              style={{
                opacity: isHovering ? 1 : 0,
                backgroundPosition: `${glarePos.x}% ${glarePos.y}%`,
              }}
            />

            {/* Sparkle / Glare */}
            <div
              className="holo-glare"
              style={{
                opacity: isHovering ? 0.6 : 0,
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4), transparent 60%)`,
              }}
            />

            {/* Content */}
            <div className="holo-card-content">
              {badge && <span className="holo-badge">{badge}</span>}
              <h3 className="holo-title">{title}</h3>
              {subtitle && <p className="holo-subtitle">{subtitle}</p>}
              {children}
            </div>
          </div>
        </div>
        );
        });
