"use client";
import React, { useCallback, useRef } from "react";
import { cn } from "../utils";

const PARTICLE_EMOJIS = ["✨", "🎉", "🔥", "⭐", "💫", "🎊", "❤️", "🚀"] as const;
const PARTICLE_COUNT = 15;
const PARTICLE_LIFESPAN_MS = 1200;

export interface CosmicCoolModeProps { readonly emojis?: readonly string[]; readonly particleCount?: number; readonly children: React.ReactNode; readonly className?: string; }

/** CosmicCoolMode — Wraps any clickable element. On click, a burst of emoji/confetti particles explode outward with physics-based gravity and fade. */
export const CosmicCoolMode = React.forwardRef<HTMLDivElement, CosmicCoolModeProps>(
  ({ className, emojis = PARTICLE_EMOJIS, particleCount = PARTICLE_COUNT, children, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: React.MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 60 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 80;
        const size = 12 + Math.random() * 12;

        particle.textContent = emoji;
        particle.style.cssText = `
          position: absolute; left: ${cx}px; top: ${cy}px; font-size: ${size}px;
          pointer-events: none; z-index: 100; will-change: transform;
          transition: none;
        `;
        container.appendChild(particle);

        let frame = 0;
        const gravity = 3;
        const animate = () => {
          frame++;
          const t = frame / 60;
          const x = vx * t;
          const y = vy * t + 0.5 * gravity * t * t * 60;
          const opacity = Math.max(0, 1 - (frame * 60) / (PARTICLE_LIFESPAN_MS));
          const rotate = frame * (Math.random() > 0.5 ? 5 : -5);

          particle.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${opacity})`;
          particle.style.opacity = String(opacity);

          if (opacity > 0) requestAnimationFrame(animate);
          else particle.remove();
        };
        requestAnimationFrame(animate);
      }
    }, [emojis, particleCount]);

    return (
      <div ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }} {...props} className={cn("relative inline-block overflow-visible", className)} onClick={handleClick}>
        {children}
      </div>
    );
  }
);
CosmicCoolMode.displayName = "CosmicCoolMode";
