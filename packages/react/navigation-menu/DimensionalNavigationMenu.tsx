"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils";

const PORTAL_SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;
const STAGGER_DELAY = 0.05;

export interface NavMenuLink {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
}

export interface NavMenuGroup {
  readonly id: string;
  readonly trigger: string;
  readonly links: readonly NavMenuLink[];
  readonly featured?: {
    readonly title: string;
    readonly description: string;
    readonly href?: string;
    readonly gradient?: string;
  };
}

export interface DimensionalNavigationMenuProps {
  readonly groups: readonly NavMenuGroup[];
  readonly className?: string;
}

/**
 * DimensionalNavigationMenu — A mega-menu navigation where each
 * dropdown opens through a dimensional portal effect. The content
 * appears to emerge from a glowing rift beneath the trigger. Items
 * inside have a holographic glass surface with staggered reveal.
 * Includes an optional "featured" spotlight card.
 */
export const DimensionalNavigationMenu = React.forwardRef<HTMLDivElement, DimensionalNavigationMenuProps>(
  ({ className, groups, ...props }, ref) => {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleEnter = (id: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveGroup(id);
    };

    const handleLeave = () => {
      timeoutRef.current = setTimeout(() => setActiveGroup(null), 200);
    };

    return (
      <nav ref={ref} {...props} className={cn("relative flex items-center gap-1", className)}>
        {groups.map((group) => {
          const isActive = activeGroup === group.id;

          return (
            <div
              key={group.id}
              className="relative"
              onMouseEnter={() => handleEnter(group.id)}
              onMouseLeave={handleLeave}
            >
              {/* Trigger */}
              <button
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                  isActive
                    ? "text-white bg-white/5"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {group.trigger}
                <motion.span
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              {/* Portal beam */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, transparent)", boxShadow: "0 2px 15px rgba(139,92,246,0.4)" }}
                  layoutId="nav-portal-beam"
                  transition={PORTAL_SPRING}
                />
              )}

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[480px] rounded-2xl border border-zinc-800/60 backdrop-blur-3xl overflow-hidden z-50"
                    style={{ background: "rgba(9, 9, 11, 0.92)" }}
                    initial={{ opacity: 0, y: -8, scaleY: 0.9, transformOrigin: "top center" }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                    transition={PORTAL_SPRING}
                    onMouseEnter={() => handleEnter(group.id)}
                    onMouseLeave={handleLeave}
                  >
                    {/* Top accent line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                    <div className="flex">
                      {/* Links */}
                      <div className="flex-1 p-4 grid grid-cols-2 gap-1">
                        {group.links.map((link, i) => (
                          <motion.a
                            key={link.id}
                            href={link.href ?? "#"}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * STAGGER_DELAY, ...PORTAL_SPRING }}
                          >
                            {link.icon && (
                              <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:bg-violet-500/20 transition-colors">
                                {link.icon}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                {link.label}
                              </div>
                              {link.description && (
                                <div className="text-[10px] text-zinc-500 mt-0.5 line-clamp-2">
                                  {link.description}
                                </div>
                              )}
                            </div>
                          </motion.a>
                        ))}
                      </div>

                      {/* Featured card */}
                      {group.featured && (
                        <motion.div
                          className="w-48 p-4 border-l border-zinc-800/50 flex flex-col justify-end"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15, ...PORTAL_SPRING }}
                        >
                          <div
                            className="rounded-xl p-4 h-full flex flex-col justify-end"
                            style={{ background: group.featured.gradient ?? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.1))" }}
                          >
                            <h4 className="text-xs font-bold text-white mb-1">{group.featured.title}</h4>
                            <p className="text-[10px] text-zinc-400 leading-relaxed">{group.featured.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    );
  }
);

DimensionalNavigationMenu.displayName = "DimensionalNavigationMenu";
