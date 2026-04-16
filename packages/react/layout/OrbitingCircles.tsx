"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

/**
 * A cinematic circular layout where nodes orbit a central point.
 * Perfect for showcasing integrations, features, or social proof.
 */
export const OrbitingCircles = ({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) => {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-zinc-800/50 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      <div
        style={
          {
            "--duration": duration,
            "--radius": radius,
            "--delay": -delay,
          } as React.CSSProperties
        }
        className={cn(
          "absolute flex h-full w-full transform-gpu animate-orbit items-center justify-center [animation-delay:calc(var(--delay)*1s)]",
          reverse && "[animation-direction:reverse]",
          className
        )}
      >
        {children}
      </div>
      
      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg);
          }
        }
        .animate-orbit {
          animation: orbit calc(var(--duration) * 1s) linear infinite;
        }
      `}</style>
    </>
  );
};
