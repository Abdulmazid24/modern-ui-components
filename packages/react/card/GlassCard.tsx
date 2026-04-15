import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The intensity of the background blur
   * @default "md"
   */
  blurIntensity?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  /**
   * Whether to include a subtle animated diagonal shine effect
   * @default false
   */
  shine?: boolean;
}

const blurClasses = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, blurIntensity = "md", shine = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[15px] p-6 text-white",
          // Glass background and blur
          "bg-white/5",
          blurClasses[blurIntensity],
          // Premium subtle borders (brighter top-left, darker bottom-right for 3D depth)
          "border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
          // Light mode fallbacks could be added here, but glassmorphism shines best in dark
          // "dark:bg-white/5 dark:border-white/10 dark:shadow-none bg-black/5 border-black/10",
          className
        )}
        {...props}
      >
        {/* Subtle Shine/Reflect overlay for premium enterprise feel */}
        {shine && (
          <div className="absolute inset-0 pointer-events-none opacity-50 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        )}
        
        {/* Content Wrapper */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
