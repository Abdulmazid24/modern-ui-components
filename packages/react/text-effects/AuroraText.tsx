"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AuroraTextProps {
  text?: string;
  className?: string;
}

const AURORA_COLORS = [
  { color: "#ff3366", delay: 0 },
  { color: "#ff9933", delay: 0.5 },
  { color: "#ffcc33", delay: 1.0 },
  { color: "#33cc66", delay: 1.5 },
  { color: "#3399ff", delay: 2.0 },
  { color: "#9933ff", delay: 2.5 },
];

export const AuroraText = React.forwardRef<any, AuroraTextProps>(({ text = "Beautiful", className, ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn(className)}  className={`relative flex items-center justify-center p-16 ${className || ""}`}>
          <div className="relative">
            {/* The text with aurora effect — using inline SVG clip approach */}
            <div className="relative inline-block">
              {/* Aurora blobs container — clipped by the text shape using mix-blend-mode */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
                style={{
                  mixBlendMode: "lighten",
                }}
              >
                {AURORA_COLORS.map((aurora, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 180,
                      height: 180,
                      background: `radial-gradient(circle, ${aurora.color} 0%, ${aurora.color}80 30%, transparent 70%)`,
                      filter: "blur(35px)",
                      left: `${10 + i * 16}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      x: [0, 30, -20, 15, 0],
                      y: [0, -30, 20, -15, 0],
                      scale: [1, 1.4, 0.8, 1.2, 1],
                    }}
                    transition={{
                      duration: 5 + i * 0.5,
                      delay: aurora.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* The actual text — acts as the visible mask via background-clip */}
              <h1
                className="relative text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter select-none"
                style={{
                  WebkitTextStroke: "0px",
                  color: "transparent",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  backgroundImage: "linear-gradient(90deg, #ff3366, #ff9933, #ffcc33, #33cc66, #3399ff, #9933ff, #ff3366)",
                  backgroundSize: "200% 100%",
                  animation: "aurora-shift 4s ease infinite",
                }}
              >
                {text}
              </h1>

              {/* CSS Keyframe injection */}
              <style>{`
            @keyframes aurora-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
            </div>

            {/* Ambient glow reflection beneath the text */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #ff3366, #ffcc33, #33cc66, #3399ff, #9933ff)",
                filter: "blur(25px)",
                opacity: 0.25,
              }}
              animate={{
                opacity: [0.15, 0.35, 0.15],
                scaleX: [0.85, 1.1, 0.85],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
        );
        });
