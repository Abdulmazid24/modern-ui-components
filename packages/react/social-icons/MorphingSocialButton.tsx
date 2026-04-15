import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MorphingSocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The icon to display in the center (e.g. from lucide-react)
   */
  icon?: React.ReactNode;
  /**
   * Tailwind gradient classes for the hover state
   * @default "from-[#405DE6] via-[#F77737] to-[#FCAF45]" (Instagram-like)
   */
  hoverGradient?: string;
}

export const MorphingSocialButton = forwardRef<HTMLButtonElement, MorphingSocialButtonProps>(
  (
    {
      className,
      icon,
      hoverGradient = "from-[#405DE6] via-[#F77737] to-[#FCAF45]",
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative flex items-center justify-center w-16 h-16 group overflow-hidden bg-black outline-none",
          className
        )}
        // Initial state: square-ish with slight rounding
        initial={{ borderRadius: "12px", background: "#000000" }}
        // Hover state: perfect circle with gradient (handled via CSS opacity to avoid layout thrashing on gradients)
        whileHover={{
          borderRadius: "50%",
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        {...props}
      >
        {/* Default Border Outline */}
        <div className="absolute inset-0 border border-zinc-800 transition-colors duration-300 group-hover:border-transparent rounded-inherit" />

        {/* The Gradient Background that fades in on hover */}
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr",
            hoverGradient
          )}
        />

        {/* Icon Layer - Stays above the background */}
        <div className="relative z-10 text-zinc-400 group-hover:text-white transition-colors duration-300">
          {icon || (
            // Default placeholder icon if none provided
            <svg
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
               <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
               <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          )}
        </div>
      </motion.button>
    );
  }
);

MorphingSocialButton.displayName = "MorphingSocialButton";
