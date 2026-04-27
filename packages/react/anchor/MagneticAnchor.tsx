"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface AnchorLink {
  readonly href: string; // #id
  readonly title: string;
}

export interface MagneticAnchorProps {
  readonly links: readonly AnchorLink[];
  readonly offset?: number;
  readonly className?: string;
}

/** MagneticAnchor — Floating table of contents / anchor navigation with smooth scroll and intersection observer highlighting. */
export const MagneticAnchor = React.forwardRef<HTMLDivElement, MagneticAnchorProps>(
  ({ className, links, offset = 80, ...props }, ref) => {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
      const handleScroll = () => {
        let current = "";
        for (const link of links) {
          const id = link.href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the element is near the top of the viewport
            if (rect.top <= offset + 50) {
              current = link.href;
            }
          }
        }
        if (current !== activeId) setActiveId(current);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial check
      return () => window.removeEventListener("scroll", handleScroll);
    }, [links, offset, activeId]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    return (
      <div ref={ref} {...props} className={cn("relative flex flex-col gap-1 border-l border-zinc-800/50 pl-3", className)}>
        {links.map((link) => {
          const isActive = activeId === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={cn(
                "relative py-1 text-sm transition-colors",
                isActive ? "text-violet-400 font-medium" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {link.title}
              {isActive && (
                <motion.div
                  layoutId="anchor-indicator"
                  className="absolute -left-[13px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-violet-500 rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>
    );
  }
);
MagneticAnchor.displayName = "MagneticAnchor";
