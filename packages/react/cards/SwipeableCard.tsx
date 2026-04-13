"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from "@/utils";

export interface SwipeableCardProps {
  id: string | number;
  image: string;
  title: string;
  subtitle: string;
  onSwipe: (id: string | number, direction: 'left' | 'right') => void;
  zIndex?: number;
    className?: string;
}

export const SwipeableCard = React.forwardRef<any, SwipeableCardProps>(({ className, id, image, title, subtitle, onSwipe, zIndex = 1, ...props }, ref) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);
        const [startPos, setStartPos] = useState({ x: 0, y: 0 });
        const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
        const [isAnimatingOut, setIsAnimatingOut] = useState(false);
        const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

        // Settings
        const SWIPE_THRESHOLD = 100;
        const ROTATION_FACTOR = 0.05;

        const handlePointerDown = (e: React.PointerEvent) => {
        e.target.setPointerCapture(e.pointerId);
        setIsDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setCurrentPos({ x: 0, y: 0 });
        };

        const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;
        setCurrentPos({ x: deltaX, y: deltaY });
        };

        const handlePointerUp = (e: React.PointerEvent) => {
        if (!isDragging) return;
        setIsDragging(false);

        if (currentPos.x > SWIPE_THRESHOLD) {
          triggerSwipeOut('right');
        } else if (currentPos.x < -SWIPE_THRESHOLD) {
          triggerSwipeOut('left');
        } else {
          // Spring back to center
          setCurrentPos({ x: 0, y: 0 });
        }
        };

        const triggerSwipeOut = useCallback((direction: 'left' | 'right') => {
        setIsAnimatingOut(true);
        setSwipeDirection(direction);
        // Move card offscreen
        setCurrentPos({
          x: direction === 'right' ? window.innerWidth : -window.innerWidth,
          y: currentPos.y + (direction === 'right' ? 100 : -100),
        });

        // Fire callback after animation completes
        setTimeout(() => {
          onSwipe(id, direction);
        }, 400); // 400ms matches CSS transition
        }, [id, onSwipe, currentPos.y]);

        useEffect(() => {
        // Optional: Add keyboard support (Left/Right Arrows)
        const handleKeyDown = (e: KeyboardEvent) => {
          if (zIndex !== 10) return; // Only top card responds to keyboard
          if (e.key === 'ArrowRight') triggerSwipeOut('right');
          if (e.key === 'ArrowLeft') triggerSwipeOut('left');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        }, [triggerSwipeOut, zIndex]);

        // Calculate dynamic transform values
        const moveX = isAnimatingOut ? currentPos.x : (isDragging ? currentPos.x : 0);
        const moveY = isAnimatingOut ? currentPos.y : (isDragging ? currentPos.y : 0);
        const rotateZ = moveX * ROTATION_FACTOR;

        // Calculate opacity bounds for "LIKE" / "NOPE" stamps
        const likeOpacity = Math.min(Math.max(currentPos.x / SWIPE_THRESHOLD, 0), 1);
        const nopeOpacity = Math.min(Math.max(-currentPos.x / SWIPE_THRESHOLD, 0), 1);

        if (!image) return null;

        return (
        <div ref={ref} {...props} className={cn(className)} 
          ref={cardRef}
          className="absolute w-full h-full rounded-3xl shadow-xl bg-white overflow-hidden select-none touch-none"
          style={{
            zIndex,
            transform: `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          
          {/* Bottom Gradient for Text Readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          {/* LIKE Stamp */}
          <div
            className="absolute top-10 left-10 border-4 border-emerald-500 text-emerald-500 font-extrabold text-4xl rounded-xl px-4 py-1 uppercase tracking-widest origin-center rotate-[-15deg] pointer-events-none"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </div>

          {/* NOPE Stamp */}
          <div
            className="absolute top-10 right-10 border-4 border-rose-500 text-rose-500 font-extrabold text-4xl rounded-xl px-4 py-1 uppercase tracking-widest origin-center rotate-[15deg] pointer-events-none"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </div>

          {/* Metadata */}
          <div className="absolute bottom-0 left-0 p-8 text-white pointer-events-none w-full">
            <h2 className="text-3xl font-bold mb-1 drop-shadow-md">{title}</h2>
            <p className="text-white/80 font-medium drop-shadow-md text-lg">{subtitle}</p>
          </div>
        </div>
        );
        });
