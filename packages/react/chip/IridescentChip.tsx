"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../utils";

const CHIP_SPRING = { type: "spring", stiffness: 400, damping: 22 } as const;
const IRIDESCENT_GRADIENT = "linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #8b5cf6)";

export interface IridescentChipProps {
  readonly label: string;
  readonly selected?: boolean;
  readonly removable?: boolean;
  readonly onRemove?: () => void;
  readonly onClick?: () => void;
  readonly icon?: React.ReactNode;
  readonly color?: string;
  readonly className?: string;
}

/**
 * IridescentChip — A selectable tag/chip with a living iridescent
 * surface that shifts colors as you move your cursor. On select,
 * the chip "crystallizes" with a prismatic border. On remove, it
 * implodes into particles.
 */
export const IridescentChip = React.forwardRef<HTMLDivElement, IridescentChipProps>(
  ({ className, label, selected = false, removable = false, onRemove, onClick, icon, ...props }, ref) => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isRemoving, setIsRemoving] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsRemoving(true);
      setTimeout(() => onRemove?.(), 300);
    };

    return (
      <motion.div
        ref={ref}
        {...props}
        className={cn(
          "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer select-none overflow-hidden",
          selected
            ? "text-white border border-white/20"
            : "text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700",
          className
        )}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isRemoving ? { scale: 0, opacity: 0, rotate: 15 } : {}}
        transition={CHIP_SPRING}
      >
        {/* Iridescent surface */}
        {selected && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: IRIDESCENT_GRADIENT,
              backgroundSize: "400% 400%",
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              transition: "background-position 0.3s ease",
            }}
          />
        )}

        {/* Cursor-tracking specular highlight */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(circle 60px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.12), transparent)`,
          }}
        />

        {icon && <span className="relative z-10 w-3.5 h-3.5">{icon}</span>}
        <span className="relative z-10">{label}</span>

        {removable && (
          <button
            onClick={handleRemove}
            className="relative z-10 w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={10} />
          </button>
        )}
      </motion.div>
    );
  }
);

IridescentChip.displayName = "IridescentChip";
