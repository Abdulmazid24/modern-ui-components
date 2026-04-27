"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const FLOAT_ANIMATION = {
  y: [-4, 4, -4],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
} as const;

const DEVICE_BORDER_RADIUS = { safari: "1rem", iphone: "2.5rem", macbook: "1rem" } as const;

export interface DeviceMockupProps {
  type?: "safari" | "iphone" | "macbook";
  url?: string;
  children: React.ReactNode;
  enableFloat?: boolean;
  className?: string;
}

/**
 * DeviceMockup — Realistic device frames (Safari browser, iPhone, MacBook)
 * to showcase your product screenshots. Includes optional floating
 * animation. Inspired by Magic UI's Safari/iPhone components.
 */
export const DeviceMockup = React.forwardRef<HTMLDivElement, DeviceMockupProps>(
  ({ className, type = "safari", url = "modernui.vault", children, enableFloat = false, ...props }, ref) => {
    const Wrapper = enableFloat ? motion.div : "div";
    const wrapperProps = enableFloat ? { animate: FLOAT_ANIMATION } : {};

    return (
      // @ts-expect-error — motion.div and div props are compatible
      <Wrapper
        ref={ref}
        {...props}
        {...wrapperProps}
        className={cn(
          "relative bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50",
          className
        )}
        style={{ borderRadius: DEVICE_BORDER_RADIUS[type] }}
      >
        {/* Safari Browser Chrome */}
        {type === "safari" && (
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-400 font-mono text-center truncate">
                {url}
              </div>
            </div>
          </div>
        )}

        {/* MacBook Chrome */}
        {type === "macbook" && (
          <>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-8">
                <div className="bg-zinc-800 rounded-md px-3 py-1 text-[10px] text-zinc-500 font-mono text-center truncate">
                  {url}
                </div>
              </div>
            </div>
          </>
        )}

        {/* iPhone Notch */}
        {type === "iphone" && (
          <div className="relative pt-4 pb-2 bg-zinc-900 border-b border-zinc-800 flex justify-center">
            <div className="w-28 h-6 bg-black rounded-full" />
          </div>
        )}

        {/* Content Area */}
        <div className="relative overflow-hidden">
          {children}
        </div>

        {/* iPhone Home Indicator */}
        {type === "iphone" && (
          <div className="flex justify-center py-2 bg-zinc-900 border-t border-zinc-800">
            <div className="w-32 h-1 bg-zinc-600 rounded-full" />
          </div>
        )}
      </Wrapper>
    );
  }
);

DeviceMockup.displayName = "DeviceMockup";
