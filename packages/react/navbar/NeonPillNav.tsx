import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NeonPillNavProps extends React.HTMLAttributes<HTMLElement> {
  links?: NavLink[];
  /**
   * Tailwind gradient classes for the pill background
   */
  gradientClasses?: string;
  defaultActiveId?: string;
}

export const NeonPillNav = React.forwardRef<HTMLElement, NeonPillNavProps>(
  (
    {
      className,
      links,
      gradientClasses = "from-[#194b4f] to-[#33fffc]",
      defaultActiveId,
      ...props
    },
    ref
  ) => {
    const defaultLinks: NavLink[] = [
      { id: "home", label: "Home", href: "#" },
      { id: "about", label: "About", href: "#" },
      { id: "product", label: "Product", href: "#" },
      { id: "services", label: "Services", href: "#" },
      { id: "contact", label: "Contact", href: "#" },
    ];

    const finalLinks = links || defaultLinks;
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string>(
      defaultActiveId || finalLinks[0]?.id || ""
    );

    return (
      <nav
        ref={ref}
        className={cn(
          "relative flex items-center p-2 bg-[#1a1a1a] rounded-[14px] shadow-2xl overflow-hidden",
          className
        )}
        onMouseLeave={() => setHoveredId(null)}
        {...props}
      >
        {/* Subtle inner noise texture for premium feel */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />

        {finalLinks.map((link) => {
          const isHovered = hoveredId === link.id;
          const isActive = activeId === link.id;

          return (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveId(link.id);
              }}
              onMouseEnter={() => setHoveredId(link.id)}
              className={cn(
                "relative px-6 py-2.5 text-sm font-semibold transition-colors duration-300 z-10 select-none",
                isHovered || isActive ? "text-white" : "text-zinc-400"
              )}
            >
              <span className="relative z-20">{link.label}</span>

              {/* Hover Highlight (Gliding Pill) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    layoutId="neon-pill-hover"
                    className={cn(
                      "absolute inset-0 z-10 rounded-lg bg-gradient-to-r shadow-[0_0_20px_rgba(51,255,252,0.3)]",
                      gradientClasses
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Active Indicator (Underline Dot) */}
              {isActive && !isHovered && (
                <motion.div
                  layoutId="neon-pill-active"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#33fffc] shadow-[0_0_10px_#33fffc]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>
    );
  }
);

NeonPillNav.displayName = "NeonPillNav";
