"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface FluxAuraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: number;
}

/**
 * A "God-Tier" Glow Button inspired by CSS Hover effects.
 * Features:
 * - Magnetic Aura: A liquid neon glow that tracks mouse movement.
 * - Prism Text: Subtle RGB shift on hover.
 * - Crystalline Glass: High-end glassmorphic surface.
 * - Spatial Audio: Tactile feedback on hover and click.
 */
export const FluxAuraButton = ({
  children,
  className,
  glowColor = "rgba(34, 211, 238, 0.4)", // Cyan defaults
  intensity = 1,
  ...props
}: FluxAuraButtonProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { play: playShimmer } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Celestial shimmer
  });

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(
    ${150 * intensity}px circle at ${mouseX}px ${mouseY}px,
    ${glowColor},
    transparent 80%
  )`;

  return (
    <motion.button
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playShimmer()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 px-8 py-4 px-12 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]",
        className
      )}
      {...props}
    >
      {/* Liquid Flux Aura Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Glass Inner Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] PrismEffect">
          {children}
        </span>
      </div>

      {/* Decorative Crystalline Border Glow */}
      <div className="absolute inset-[1px] z-[-1] rounded-[15px] bg-zinc-950" />
      
      <style jsx>{`
        .PrismEffect {
          transition: text-shadow 0.3s ease;
        }
        button:hover .PrismEffect {
          text-shadow: 2px 0px 5px rgba(255, 0, 0, 0.4), -2px 0px 5px rgba(0, 0, 255, 0.4);
        }
      `}</style>
    </motion.button>
  );
};
