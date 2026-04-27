"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const HEADING_SIZES = { h1: "text-5xl md:text-6xl", h2: "text-4xl md:text-5xl", h3: "text-3xl md:text-4xl", h4: "text-2xl md:text-3xl", h5: "text-xl md:text-2xl", h6: "text-lg md:text-xl" } as const;
const GRADIENT_PRESETS = {
  none: "",
  violet: "bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent",
  fire: "bg-gradient-to-r from-amber-400 via-red-500 to-orange-400 bg-clip-text text-transparent",
  ocean: "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent",
  emerald: "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent",
} as const;

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type GradientPreset = keyof typeof GRADIENT_PRESETS;

export interface QuantumHeadingProps {
  readonly as?: HeadingLevel;
  readonly gradient?: GradientPreset;
  readonly glow?: boolean;
  readonly animate?: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * QuantumHeading — Enterprise headings with optional gradient text,
 * neon glow halo, and viewport-triggered reveal animation.
 */
export const QuantumHeading = React.forwardRef<HTMLHeadingElement, QuantumHeadingProps>(
  ({ className, as: Tag = "h2", gradient = "none", glow = false, animate = false, children, ...props }, ref) => {
    const Wrapper = animate ? motion.div : React.Fragment;
    const wrapperProps = animate
      ? { initial: { opacity: 0, y: 20, filter: "blur(8px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
      : {};

    return (
      <Wrapper {...wrapperProps}>
        <Tag ref={ref} {...props}
          className={cn(HEADING_SIZES[Tag], "font-bold tracking-tight", gradient !== "none" ? GRADIENT_PRESETS[gradient] : "text-white", className)}
          style={glow ? { textShadow: "0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.1)" } : undefined}>
          {children}
        </Tag>
      </Wrapper>
    );
  }
);
QuantumHeading.displayName = "QuantumHeading";

export interface QuantumTextProps {
  readonly size?: "xs" | "sm" | "md" | "lg" | "xl";
  readonly muted?: boolean;
  readonly mono?: boolean;
  readonly gradient?: GradientPreset;
  readonly lead?: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
}

const TEXT_SIZES = { xs: "text-xs", sm: "text-sm", md: "text-base", lg: "text-lg", xl: "text-xl" } as const;

/** QuantumText — Body text with semantic sizing, muted variants, and optional gradient. */
export const QuantumText = React.forwardRef<HTMLParagraphElement, QuantumTextProps>(
  ({ className, size = "md", muted = false, mono = false, gradient = "none", lead = false, children, ...props }, ref) => (
    <p ref={ref} {...props}
      className={cn(TEXT_SIZES[size], mono && "font-mono", lead && "text-lg md:text-xl leading-relaxed",
        gradient !== "none" ? GRADIENT_PRESETS[gradient] : muted ? "text-zinc-400" : "text-zinc-200",
        "leading-relaxed", className)}>
      {children}
    </p>
  )
);
QuantumText.displayName = "QuantumText";

export interface QuantumLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly glow?: boolean;
}

/** QuantumLink — Styled link with hover underline animation and optional neon glow. */
export const QuantumLink = React.forwardRef<HTMLAnchorElement, QuantumLinkProps>(
  ({ className, glow = false, children, ...props }, ref) => (
    <a ref={ref} {...props}
      className={cn("relative text-violet-400 hover:text-violet-300 font-medium transition-colors inline-block group", className)}
      style={glow ? { textShadow: "0 0 10px rgba(139,92,246,0.4)" } : undefined}>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
    </a>
  )
);
QuantumLink.displayName = "QuantumLink";

/** QuantumCode — Inline code snippet with neon accent. */
export const QuantumCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <code ref={ref} {...props}
      className={cn("px-1.5 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[0.85em] font-mono", className)}>
      {children}
    </code>
  )
);
QuantumCode.displayName = "QuantumCode";
