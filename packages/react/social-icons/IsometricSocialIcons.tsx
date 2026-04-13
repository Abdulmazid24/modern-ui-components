"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export interface SocialIcon {
  id: string;
  name: string;
  color1: string;
  color2: string;
  svg: React.ReactNode;
    className?: string;
}

const defaultIcons: SocialIcon[] = [
  {
    id: "tiktok",
    name: "TikTok",
    color1: "#ff0050",
    color2: "#00f2ea",
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11V9a6.33 6.33 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.37a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.8z"/>
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    color1: "#1877f2",
    color2: "#4599ff",
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    color1: "#ff0000",
    color2: "#ff4e4e",
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    id: "x",
    name: "X",
    color1: "#000000",
    color2: "#333333",
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z"/>
      </svg>
    ),
  },
];

export interface IsometricSocialIconsProps {
  icons?: SocialIcon[];
    className?: string;
}

export const IsometricSocialIcons = React.forwardRef<any, IsometricSocialIconsProps>(({ className, icons = defaultIcons, ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn("flex items-center justify-center gap-10 p-12", className)}>
          {icons.map((icon) => (
            <motion.div
              key={icon.id}
              className="relative cursor-pointer group"
              whileHover="hovered"
              initial="rest"
              style={{ perspective: "800px" }}
            >
              {/* Shadow on ground */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-lg pointer-events-none"
                variants={{
                  rest: {
                    width: 50,
                    height: 8,
                    opacity: 0.15,
                    background: "#000",
                  },
                  hovered: {
                    width: 60,
                    height: 14,
                    opacity: 0.5,
                    background: icon.color1,
                  },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* 3D Isometric Cube Container */}
              <motion.div
                className="relative w-[72px] h-[72px]"
                style={{ transformStyle: "preserve-3d" }}
                variants={{
                  rest: {
                    rotateX: 0,
                    rotateY: 0,
                    y: 0,
                  },
                  hovered: {
                    rotateX: -15,
                    rotateY: 15,
                    y: -12,
                  },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                {/* Top Face */}
                <div
                  className="absolute inset-0 rounded-xl flex items-center justify-center border border-white/20"
                  style={{
                    background: "linear-gradient(135deg, #f5f5f5, #e8e8e8)",
                    transformStyle: "preserve-3d",
                    transform: "translateZ(8px)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="text-zinc-700 transition-colors duration-300"
                    variants={{
                      rest: { color: "#3f3f46" },
                      hovered: { color: icon.color1 },
                    }}
                  >
                    {icon.svg}
                  </motion.div>
                </div>

                {/* Right Face (3D side) */}
                <div
                  className="absolute top-0 right-0 w-[16px] h-full origin-right"
                  style={{
                    background: "linear-gradient(180deg, #d4d4d8, #a1a1aa)",
                    transform: "rotateY(90deg) translateZ(0px)",
                    borderRadius: "0 8px 8px 0",
                  }}
                />

                {/* Bottom Face (3D bottom) */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[16px] origin-bottom"
                  style={{
                    background: "linear-gradient(90deg, #d4d4d8, #b4b4b8)",
                    transform: "rotateX(-90deg) translateZ(0px)",
                    borderRadius: "0 0 8px 8px",
                  }}
                />
              </motion.div>

              {/* Colored accent bar on hover */}
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full"
                variants={{
                  rest: { width: 0, opacity: 0 },
                  hovered: { width: 40, opacity: 1 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ background: `linear-gradient(90deg, ${icon.color1}, ${icon.color2})` }}
              />

              {/* Label */}
              <motion.p
                className="text-center text-xs font-bold tracking-wider mt-4 select-none"
                variants={{
                  rest: { opacity: 0, y: -5, color: "#71717a" },
                  hovered: { opacity: 1, y: 0, color: icon.color1 },
                }}
                transition={{ duration: 0.2 }}
              >
                {icon.name}
              </motion.p>
            </motion.div>
          ))}
        </div>
        );
        });
