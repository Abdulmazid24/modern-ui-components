"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/utils";

export interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
    className?: string;
}

export const AnimatedCounter = React.forwardRef<any, AnimatedCounterProps>(({ className, end, duration = 2000, suffix = '', prefix = '', label, ...props }, ref) => {
        const [count, setCount] = useState(0);
        const [isVisible, setIsVisible] = useState(false);
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );

        if (ref.current) {
          observer.observe(ref.current);
        }

        return () => observer.disconnect();
        }, []);

        useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;

          // easeOutExpo function for smooth ending
          const easeOutExpo = (x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
          };

          const percentage = Math.min(progress / duration, 1);
          const currentCount = Math.floor(end * easeOutExpo(percentage));

          setCount(currentCount);

          if (progress < duration) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            setCount(end); // Ensure we end exactly at the target number
          }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
        }, [isVisible, end, duration]);

        // Format number with commas
        const formattedCount = new Intl.NumberFormat('en-US').format(count);

        return (
        <div ref={ref} {...props} className={cn(className)}  ref={ref} className="animated-counter-container">
          <div className="counter-value-wrapper">
            <span className="counter-prefix">{prefix}</span>
            <span className="counter-number">{formattedCount}</span>
            <span className="counter-suffix">{suffix}</span>
          </div>
          <div className="counter-label">{label}</div>
        </div>
        );
        });
