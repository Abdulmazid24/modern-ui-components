"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
// lucide-react does not include brand icons, so we use representations
import { MessageCircle, Camera, Briefcase, Code, Video, Globe } from "lucide-react";

export interface NeonSocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string; // Tailwind gradient classes e.g. "from-blue-500 to-cyan-400"
}

export interface NeonSocialGridProps extends React.HTMLAttributes<HTMLDivElement> {
  platforms?: NeonSocialPlatform[];
}

const defaultPlatforms: NeonSocialPlatform[] = [
  {
    id: "x",
    name: "Follow on X",
    icon: <Globe size={18} />,
    gradient: "from-zinc-400 to-zinc-100", // X is black/white
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Camera size={18} />,
    gradient: "from-[#fd1d1d] via-[#e1306c] to-[#833ab4]",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Briefcase size={18} />,
    gradient: "from-[#0a66c2] to-[#004182]",
  },
  {
    id: "github",
    name: "GitHub",
    icon: <Code size={18} />,
    gradient: "from-zinc-500 to-zinc-300",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Video size={18} />,
    gradient: "from-[#ff0000] to-[#cc0000]",
  },
  {
    id: "discord",
    name: "Discord",
    icon: <MessageCircle size={18} />,
    gradient: "from-[#5865F2] to-[#404eed]",
  },
];

export const NeonSocialGrid = forwardRef<HTMLDivElement, NeonSocialGridProps>(
  ({ className, platforms = defaultPlatforms, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-3xl mx-auto p-8 rounded-3xl bg-zinc-950/80 border border-white/5",
          className
        )}
        {...props}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Connect with me <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              on social
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {platforms.map((platform) => (
            <NeonSocialButton key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    );
  }
);

NeonSocialGrid.displayName = "NeonSocialGrid";

function NeonSocialButton({ platform }: { platform: NeonSocialPlatform }) {
  return (
    <motion.a
      href={`#${platform.id}`}
      className="group relative flex items-center gap-4 px-6 py-4 w-full bg-zinc-900 rounded-2xl overflow-hidden focus:outline-none"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {/* 
        The glowing border technique:
        A pseudo-element positioned slightly larger than the button content,
        containing the gradient, hidden initially, fading in on hover.
      */}
      <motion.div
        className={cn("absolute inset-0 z-0 bg-gradient-to-r opacity-0 transition-opacity duration-300", platform.gradient)}
        variants={{
          hover: { opacity: 1 },
        }}
      />
      
      {/* The inner dark shape that creates the "border" effect by leaving a 2px gap */}
      <div className="absolute inset-[2px] z-10 bg-zinc-900 rounded-[14px] transition-colors duration-300 group-hover:bg-zinc-900/90" />

      {/* Content */}
      <span className="relative z-20 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors duration-300">
        {platform.icon}
      </span>
      <span className="relative z-20 font-medium text-[0.85rem] uppercase tracking-[0.15em] text-zinc-400 group-hover:text-white transition-colors duration-300">
        {platform.name}
      </span>

      {/* Extreme ambient glow dropping below the button */}
      <motion.div
        className={cn("absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 blur-xl opacity-0 bg-gradient-to-r -z-10", platform.gradient)}
        variants={{
          hover: { opacity: 0.4 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
