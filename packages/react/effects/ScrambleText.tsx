"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface ScrambleTextProps {
  text: string;
  characters?: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  speed = 40,
  delay = 500,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animate = useCallback(() => {
    let frame = 0;
    const length = text.length;
    // Map of which characters have resolved to their final state
    let resolvedChars: boolean[] = new Array(length).fill(false);

    const interval = setInterval(() => {
      let output = '';
      let allResolved = true;

      for (let i = 0; i < length; i++) {
        // Spaces resolve instantly
        if (text[i] === ' ') {
          output += ' ';
          resolvedChars[i] = true;
          continue;
        }

        // The math ensures letters resolve from left to right gradually over time
        // The further right a character is, the more frames it takes to resolve
        if (frame >= i * 2) {
          output += text[i];
          resolvedChars[i] = true;
        } else {
          output += characters[Math.floor(Math.random() * characters.length)];
          allResolved = false;
        }
      }

      setDisplayText(output);
      frame++;

      if (allResolved) {
        clearInterval(interval);
        setHasAnimated(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, characters, speed]);

  useEffect(() => {
    if (isIntersecting) {
      const timeoutId = setTimeout(() => {
        animate();
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [isIntersecting, animate, delay]);

  const handleMouseEnter = () => {
    if (hasAnimated) {
      setHasAnimated(false);
      animate();
    }
  };

  return (
    <span 
      ref={ref} 
      className={`font-mono inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ minHeight: '1.2em' }} // Prevent layout shift
      title="Hover to replay"
    >
      {/* Before animation starts, show nothing or just spaces */}
      {!isIntersecting && !hasAnimated ? text.replace(/./g, '\xa0') : displayText}
    </span>
  );
};
