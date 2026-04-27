"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils";

export interface Breadcrumb {
  readonly label: string;
  readonly href?: string;
}

export interface CinematicPageHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly breadcrumbs?: readonly Breadcrumb[];
  readonly actions?: React.ReactNode;
  readonly className?: string;
}

/** CinematicPageHeader — Admin page header with breadcrumbs, glowing backdrop, and staggered entrance. */
export const CinematicPageHeader = React.forwardRef<HTMLDivElement, CinematicPageHeaderProps>(
  ({ className, title, description, breadcrumbs, actions, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn("relative mb-8 md:mb-12", className)}>
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-0 w-[400px] h-[200px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
          
          <motion.div 
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col"
          >
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-2 mb-3 text-sm text-zinc-500">
                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={i}>
                    {crumb.href ? (
                      <a href={crumb.href} className="hover:text-violet-400 transition-colors">{crumb.label}</a>
                    ) : (
                      <span className="text-zinc-300">{crumb.label}</span>
                    )}
                    {i < breadcrumbs.length - 1 && <ChevronRight size={14} className="text-zinc-700" />}
                  </React.Fragment>
                ))}
              </motion.div>
            )}

            {/* Title & Description */}
            <motion.h1 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {title}
            </motion.h1>
            {description && (
              <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-zinc-400 mt-2 max-w-2xl">
                {description}
              </motion.p>
            )}
          </motion.div>

          {/* Actions */}
          {actions && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-3 shrink-0"
            >
              {actions}
            </motion.div>
          )}

        </div>
      </div>
    );
  }
);
CinematicPageHeader.displayName = "CinematicPageHeader";
