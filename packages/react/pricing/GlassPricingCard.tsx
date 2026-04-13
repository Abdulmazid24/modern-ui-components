"use client";

import React, { useRef, useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { cn } from "@/utils";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface PricingFeature {
  name: string;
  included: boolean;
    className?: string;
}

export interface GlassPricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  buttonText?: string;
  isPopular?: boolean;
  /** Primary gradient color inside the card */
  accentColor?: string;
  onSelect?: () => void;
    className?: string;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export const GlassPricingCard = React.forwardRef<any, GlassPricingCardProps>(({ className, title, price, period = '/month', description, features, buttonText = 'Get Started', isPopular = false, accentColor = '#8b5cf6', onSelect, ...props }, ref) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [transformStyle, setTransformStyle] = useState('');
        const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

        // 3D Parallax Tilt Effect
        const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setGradientPos({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
        });

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (-5 to 5 degrees)
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
        }, []);

        const handleMouseLeave = useCallback(() => {
        setTransformStyle('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        setGradientPos({ x: 50, y: 50 });
        }, []);

        return (
        <div ref={ref} {...props} className={cn(className)} 
          ref={cardRef}
          className={`glass-pricing-card ${isPopular ? 'popular' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transformStyle,
            '--accent': accentColor,
            '--mouse-x': `${gradientPos.x}%`,
            '--mouse-y': `${gradientPos.y}%`,
          } as React.CSSProperties}
        >
          {/* Animated Gradient Border (pseudo-element equivalent wrapper) */}
          <div className="glass-pricing-border"></div>

          {/* Card Content */}
          <div className="glass-pricing-content">
            {isPopular && (
              <div className="glass-popular-badge">
                Most Popular
              </div>
            )}

            <div className="glass-pricing-header">
              <h3 className="glass-pricing-title">{title}</h3>
              <p className="glass-pricing-desc">{description}</p>
            </div>

            <div className="glass-pricing-price-container">
              <span className="glass-pricing-currency">$</span>
              <span className="glass-pricing-amount">{price}</span>
              <span className="glass-pricing-period">{period}</span>
            </div>

            <ul className="glass-pricing-features">
              {features.map((feature, i) => (
                <li key={i} className={`glass-feature-item ${!feature.included ? 'disabled' : ''}`}>
                  <div className="glass-feature-icon">
                    {feature.included && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>

            <button className="glass-pricing-btn" onClick={onSelect}>
              {buttonText}
            </button>
          </div>
        </div>
        );
        });
