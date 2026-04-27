"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

const MENU_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const;
const SUBMENU_STAGGER = 0.04;
const GLASS_BG = "rgba(24, 24, 27, 0.7)";
const ACTIVE_GLOW = "rgba(139, 92, 246, 0.15)";

export interface MenubarItem {
  readonly id: string;
  readonly label: string;
  readonly shortcut?: string;
  readonly disabled?: boolean;
  readonly separator?: boolean;
  readonly icon?: React.ReactNode;
  readonly onClick?: () => void;
}

export interface MenubarMenu {
  readonly id: string;
  readonly trigger: string;
  readonly items: readonly MenubarItem[];
}

export interface HolographicMenubarProps {
  readonly menus: readonly MenubarMenu[];
  readonly className?: string;
}

/**
 * HolographicMenubar — A desktop-class menubar with holographic
 * glass dropdowns. Each menu opens with a dimensional "fold"
 * animation, items have directional shimmer on hover, and keyboard
 * shortcuts glow with neon accents. The active menu trigger has
 * a pulsing underline beam.
 */
export const HolographicMenubar = React.forwardRef<HTMLDivElement, HolographicMenubarProps>(
  ({ className, menus, ...props }, ref) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const handleTriggerClick = useCallback((menuId: string) => {
      setActiveMenu((prev) => (prev === menuId ? null : menuId));
    }, []);

    const handleTriggerHover = useCallback((menuId: string) => {
      if (activeMenu !== null) setActiveMenu(menuId);
    }, [activeMenu]);

    const handleClose = useCallback(() => {
      setActiveMenu(null);
    }, []);

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative inline-flex items-center gap-0.5 px-2 py-1 rounded-xl border border-zinc-800/50 backdrop-blur-2xl",
          className
        )}
        style={{ background: GLASS_BG }}
        onMouseLeave={handleClose}
      >
        {/* Holographic surface sheen */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        {menus.map((menu) => {
          const isActive = activeMenu === menu.id;

          return (
            <div key={menu.id} className="relative">
              {/* Trigger Button */}
              <button
                onClick={() => handleTriggerClick(menu.id)}
                onMouseEnter={() => handleTriggerHover(menu.id)}
                className={cn(
                  "relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer",
                  isActive
                    ? "text-white bg-white/10"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                )}
              >
                {menu.trigger}

                {/* Active beam underline */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-violet-500 rounded-full"
                    layoutId="menubar-underline"
                    style={{ width: "60%", boxShadow: `0 0 8px ${ACTIVE_GLOW}` }}
                    transition={MENU_SPRING}
                  />
                )}
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 min-w-[220px] rounded-xl border border-zinc-800/60 backdrop-blur-3xl overflow-hidden z-50"
                    style={{ background: GLASS_BG }}
                    initial={{ opacity: 0, y: -8, scaleY: 0.9, transformOrigin: "top" }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                    transition={MENU_SPRING}
                  >
                    {/* Dimensional depth layers */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

                    <div className="py-1.5">
                      {menu.items.map((item, index) => {
                        if (item.separator) {
                          return <div key={`sep-${index}`} className="my-1.5 mx-3 h-px bg-zinc-800/50" />;
                        }

                        const isHovered = hoveredItem === item.id;

                        return (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * SUBMENU_STAGGER, ...MENU_SPRING }}
                            className={cn(
                              "relative w-full flex items-center gap-3 px-3 py-2 text-xs transition-colors cursor-pointer",
                              item.disabled
                                ? "text-zinc-600 cursor-not-allowed"
                                : "text-zinc-300 hover:text-white"
                            )}
                            disabled={item.disabled}
                            onClick={() => { item.onClick?.(); handleClose(); }}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            {/* Directional shimmer hover */}
                            {isHovered && !item.disabled && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-white/5 to-transparent rounded-md"
                                layoutId="menubar-hover"
                                transition={MENU_SPRING}
                              />
                            )}

                            {/* Icon */}
                            {item.icon && (
                              <span className="relative z-10 w-4 h-4 flex items-center justify-center text-zinc-500">
                                {item.icon}
                              </span>
                            )}

                            {/* Label */}
                            <span className="relative z-10 flex-1 text-left">{item.label}</span>

                            {/* Shortcut */}
                            {item.shortcut && (
                              <span
                                className={cn(
                                  "relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded border",
                                  isHovered
                                    ? "text-violet-300 border-violet-500/30 bg-violet-500/10"
                                    : "text-zinc-600 border-zinc-800 bg-zinc-900/50"
                                )}
                              >
                                {item.shortcut}
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }
);

HolographicMenubar.displayName = "HolographicMenubar";
