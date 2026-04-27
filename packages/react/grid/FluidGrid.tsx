"use client";
import React from "react";
import { cn } from "../utils";

/* ──────────────────── FluidGrid ──────────────────── */
export interface FluidGridProps {
  readonly columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  readonly gap?: number;
  readonly children: React.ReactNode;
  readonly className?: string;
}

/** FluidGrid — Responsive CSS grid with breakpoint-aware columns and configurable gap. */
export const FluidGrid = React.forwardRef<HTMLDivElement, FluidGridProps>(
  ({ className, columns = 12, gap = 6, children, ...props }, ref) => {
    const colStr = typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : undefined;

    const responsiveClass = typeof columns === "object"
      ? cn(
          columns.sm && `grid-cols-${columns.sm}`,
          columns.md && `md:grid-cols-${columns.md}`,
          columns.lg && `lg:grid-cols-${columns.lg}`,
          columns.xl && `xl:grid-cols-${columns.xl}`,
        )
      : "";

    return (
      <div ref={ref} {...props}
        className={cn("grid", responsiveClass, className)}
        style={{ gridTemplateColumns: colStr, gap: `${gap * 4}px` }}>
        {children}
      </div>
    );
  }
);
FluidGrid.displayName = "FluidGrid";

export interface GridColProps {
  readonly span?: number;
  readonly offset?: number;
  readonly children: React.ReactNode;
  readonly className?: string;
}

/** GridCol — Grid column child with span and offset support. */
export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
  ({ className, span, offset, children, ...props }, ref) => (
    <div ref={ref} {...props}
      className={cn(className)}
      style={{ gridColumn: span ? `span ${span}` : undefined, gridColumnStart: offset ? offset + 1 : undefined }}>
      {children}
    </div>
  )
);
GridCol.displayName = "GridCol";

/* ──────────────────── Container ──────────────────── */
export interface NeonContainerProps {
  readonly size?: "sm" | "md" | "lg" | "xl" | "full";
  readonly children: React.ReactNode;
  readonly className?: string;
}

const CONTAINER_SIZES = { sm: "max-w-2xl", md: "max-w-4xl", lg: "max-w-6xl", xl: "max-w-7xl", full: "max-w-full" } as const;

/** NeonContainer — Max-width centered wrapper with consistent padding. */
export const NeonContainer = React.forwardRef<HTMLDivElement, NeonContainerProps>(
  ({ className, size = "xl", children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", CONTAINER_SIZES[size], className)}>
      {children}
    </div>
  )
);
NeonContainer.displayName = "NeonContainer";

/* ──────────────────── FlexSpace ──────────────────── */
export interface FlexSpaceProps {
  readonly direction?: "row" | "column";
  readonly gap?: number;
  readonly align?: "start" | "center" | "end" | "stretch" | "baseline";
  readonly justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  readonly wrap?: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
}

const ALIGN_MAP = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch", baseline: "items-baseline" } as const;
const JUSTIFY_MAP = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between", around: "justify-around", evenly: "justify-evenly" } as const;

/** FlexSpace — Flex layout utility with direction, gap, alignment control. Replaces manual flex CSS. */
export const FlexSpace = React.forwardRef<HTMLDivElement, FlexSpaceProps>(
  ({ className, direction = "row", gap = 3, align = "center", justify = "start", wrap = false, children, ...props }, ref) => (
    <div ref={ref} {...props}
      className={cn("flex", direction === "column" && "flex-col", ALIGN_MAP[align], JUSTIFY_MAP[justify], wrap && "flex-wrap", className)}
      style={{ gap: `${gap * 4}px` }}>
      {children}
    </div>
  )
);
FlexSpace.displayName = "FlexSpace";
