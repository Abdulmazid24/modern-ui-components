"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface BeamPath {
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
}

interface AnimatedConnectingBeamProps {
  connections: BeamPath[];
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
  beamColor?: string;
}

/**
 * SVG-based beams that connect a central hub to multiple nodes (1-to-Many).
 * Features traveling light pulses along curved paths.
 */
export const AnimatedConnectingBeam = ({
  connections,
  containerRef,
  className,
  beamColor = "#8b5cf6",
}: AnimatedConnectingBeamProps) => {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const updatePaths = () => {
      if (!containerRef || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      const newPaths = (connections || []).map((conn) => {
        if (!conn?.fromRef?.current || !conn?.toRef?.current) return "";
        
        const fromRect = conn.fromRef.current.getBoundingClientRect();
        const toRect = conn.toRef.current.getBoundingClientRect();

        const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
        const x2 = toRect.left + toRect.width / 2 - containerRect.left;
        const y2 = toRect.top + toRect.height / 2 - containerRect.top;

        // Create a curved path (cubic bezier)
        const midX = (x1 + x2) / 2;
        return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
      });

      setPaths(newPaths);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);
    return () => window.removeEventListener("resize", updatePaths);
  }, [connections, containerRef]);

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="beam-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor={beamColor} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {paths.map((path, i) => (
        <React.Fragment key={i}>
          {/* Static Path */}
          <path d={path} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
          
          {/* Animated Beam Pulse */}
          <motion.path
            d={path}
            stroke={`url(#beam-pulse)`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        </React.Fragment>
      ))}
    </svg>
  );
};
