"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const STACK_OVERLAP = 10;
const HOVER_LIFT = -8;
const AVATAR_SPRING = { type: "spring", stiffness: 400, damping: 20 } as const;

export interface AvatarData {
  readonly src: string;
  readonly alt: string;
  readonly fallback?: string;
}

export interface GravityAvatarStackProps {
  avatars: readonly AvatarData[];
  size?: number;
  maxVisible?: number;
  className?: string;
}

/**
 * GravityAvatarStack — Overlapping avatar circles with physics-based
 * hover lift and glow ring. Shows "+N" overflow indicator.
 * Inspired by Magic UI's Avatar Circles.
 */
export const GravityAvatarStack = React.forwardRef<
  HTMLDivElement,
  GravityAvatarStackProps
>(({ className, avatars, size = 44, maxVisible = 5, ...props }, ref) => {
  const visible = avatars.slice(0, maxVisible);
  const overflow = avatars.length - maxVisible;

  return (
    <div
      ref={ref}
      {...props}
      className={cn("flex items-center", className)}
    >
      {visible.map((avatar, index) => (
        <motion.div
          key={`${avatar.alt}-${index}`}
          className="relative rounded-full border-2 border-zinc-950 cursor-pointer"
          style={{
            width: size,
            height: size,
            marginLeft: index === 0 ? 0 : -STACK_OVERLAP,
            zIndex: visible.length - index,
          }}
          whileHover={{
            y: HOVER_LIFT,
            scale: 1.15,
            zIndex: 50,
          }}
          transition={AVATAR_SPRING}
        >
          <img
            src={avatar.src}
            alt={avatar.alt}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add("bg-gradient-to-br", "from-violet-600", "to-cyan-500");
                const fallbackEl = document.createElement("span");
                fallbackEl.className = "absolute inset-0 flex items-center justify-center text-white font-bold text-xs";
                fallbackEl.textContent = avatar.fallback ?? avatar.alt.charAt(0).toUpperCase();
                parent.appendChild(fallbackEl);
              }
            }}
          />

          {/* Glow ring on hover */}
          <div className="absolute -inset-0.5 rounded-full bg-violet-500/0 hover:bg-violet-500/20 transition-colors duration-300 pointer-events-none" />
        </motion.div>
      ))}

      {/* Overflow counter */}
      {overflow > 0 && (
        <motion.div
          className="flex items-center justify-center rounded-full bg-zinc-900 border-2 border-zinc-800 text-zinc-400 font-bold text-xs"
          style={{
            width: size,
            height: size,
            marginLeft: -STACK_OVERLAP,
          }}
          whileHover={{ scale: 1.1 }}
          transition={AVATAR_SPRING}
        >
          +{overflow}
        </motion.div>
      )}
    </div>
  );
});

GravityAvatarStack.displayName = "GravityAvatarStack";
