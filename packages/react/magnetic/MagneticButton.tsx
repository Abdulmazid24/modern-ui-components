"use client";

import React, { useRef, useCallback, useState } from 'react';
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Magnetic pull strength (0–1). Higher = stronger pull */
  strength?: number;
  /** Radius of attraction zone in px (0 = button bounds only) */
  attractRadius?: number;
  /** Inner content also moves (parallax depth) */
  innerStrength?: number;
  /** Spring-back transition duration */
  transitionDuration?: string;
  /** Disable the magnetic effect */
  disabled?: boolean;
  /** Button click handler */
  onClick?: () => void;
  /** HTML element type */
  as?: 'button' | 'a' | 'div';
  /** Link href (when `as="a"`) */
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export const MagneticButton = React.forwardRef<any, MagneticButtonProps>(({ children, strength = 0.35, attractRadius = 0, innerStrength = 0.15, transitionDuration = '0.5s', disabled = false, onClick, as: Tag = 'button', href, className = '', style, ...props }, ref) => {
        const wrapperRef = useRef<HTMLDivElement>(null);
        const innerRef = useRef<HTMLSpanElement>(null);
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
          if (disabled) return;
          const el = wrapperRef.current;
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          const dx = e.clientX - cx;
          const dy = e.clientY - cy;

          // Move the button wrapper toward cursor
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
          el.style.transition = `transform 0.15s ease-out`;

          // Move inner content even more (parallax)
          if (innerRef.current) {
            innerRef.current.style.transform = `translate(${dx * innerStrength}px, ${dy * innerStrength}px)`;
            innerRef.current.style.transition = `transform 0.15s ease-out`;
          }
        },
        [strength, innerStrength, disabled]
        );

        const handleMouseEnter = useCallback(() => {
        if (!disabled) setIsHovered(true);
        }, [disabled]);

        const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        const el = wrapperRef.current;
        if (el) {
          el.style.transform = `translate(0, 0)`;
          el.style.transition = `transform ${transitionDuration} cubic-bezier(0.22, 1, 0.36, 1)`;
        }
        if (innerRef.current) {
          innerRef.current.style.transform = `translate(0, 0)`;
          innerRef.current.style.transition = `transform ${transitionDuration} cubic-bezier(0.22, 1, 0.36, 1)`;
        }
        }, [transitionDuration]);

        const padStyle: React.CSSProperties = attractRadius > 0
        ? { padding: attractRadius, margin: -attractRadius }
        : {};

        const tagProps: Record<string, unknown> = {};
        if (Tag === 'button') tagProps.type = 'button';
        if (Tag === 'a') {
        tagProps.href = href || '#';
        tagProps.target = '_blank';
        tagProps.rel = 'noopener noreferrer';
        }

        return (
        <div ref={ref} {...props} className={cn(className)} 
          ref={wrapperRef}
          className="magnetic-wrapper"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            ...padStyle,
            display: 'inline-block',
            willChange: 'transform',
          }}
        >
          <Tag
            {...tagProps}
            onClick={onClick}
            className={`magnetic-btn ${isHovered ? 'magnetic-hovered' : ''} ${className}`}
            style={style}
          >
            <span ref={innerRef} className="magnetic-btn-inner">
              {children}
            </span>
          </Tag>
        </div>
        );
        });
