"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface SocialCardData {
  id: string;
  platform: string;
  count: string;
  label: string;
  color: string;
  logo: string; // URL or SVG name
  link?: string;
  height?: number; // For masonry variation
}

const DEFAULT_CARDS: SocialCardData[] = [
  {
    id: "instagram",
    platform: "Instagram",
    count: "625K",
    label: "Followers",
    color: "#e1306c",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    height: 320,
  },
  {
    id: "github",
    platform: "Github",
    count: "150K",
    label: "Developers",
    color: "#f0f6fc",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    height: 280,
  },
  {
    id: "linkedin",
    platform: "Linkedin",
    count: "100K",
    label: "Connections",
    color: "#0a66c2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    height: 300,
  },
  {
    id: "twitter",
    platform: "Twitter",
    count: "210K",
    label: "X-Followers",
    color: "#1d9bf0",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg",
    height: 310,
  },
];

interface KineticSocialCardsProps {
  cards?: SocialCardData[];
  className?: string;
  columns?: number;
}

const SocialCard = ({ card }: { card: SocialCardData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion Values for Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const { play: playHover } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Atmospheric shimmer
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); playHover(); }}
      onMouseLeave={handleMouseLeave}
      className="relative w-full perspective-1000 mb-6"
      style={{ height: card.height }}
    >
      {/* Volumetric Brand Aura (Underglow) */}
      <motion.div
        animate={{ 
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -inset-10 blur-[80px] rounded-full pointer-events-none z-0"
        style={{ backgroundColor: card.color }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative z-10 p-8 rounded-3xl bg-zinc-950/80 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
      >
        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="relative h-full flex flex-col items-center justify-between z-20">
          {/* Logo Container */}
          <motion.div 
            animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            className="w-16 h-16 flex items-center justify-center p-2 bg-zinc-900 rounded-2xl border border-white/10 shadow-xl"
          >
             <img src={card.logo} alt={card.platform} className="w-full h-full object-contain filter drop-shadow-lg" />
          </motion.div>

          {/* Platform Info */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">{card.platform}</h3>
            <div className="space-y-0.5">
               <div className="text-3xl font-black text-white font-mono tracking-tighter">{card.count}</div>
               <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">{card.label}</div>
            </div>
          </div>

          {/* Button Reveal */}
          <div className="w-full h-12 relative overflow-hidden rounded-xl">
             <motion.button
               initial={{ y: 50, opacity: 0 }}
               animate={isHovered ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 25 }}
               className="w-full h-full bg-white text-black text-sm font-bold rounded-xl active:scale-95 transition-transform"
             >
                Follow Profile
             </motion.button>
             
             {/* Ghost State (when not hovered) */}
             <motion.div
               animate={isHovered ? { opacity: 0 } : { opacity: 0.1 }}
               className="absolute inset-0 border border-white/20 rounded-xl"
             />
          </div>
        </div>
        
        {/* Bottom Shimmer */}
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl pointer-events-none" />
      </motion.div>
    </div>
  );
};

/**
 * A "God-Tier" Kinetic Social Profile Exhibition.
 * Features:
 * - Masonry Layout: Optimized flow for cards of varying heights.
 * - Brand Aura Lighting: Adaptive underglow matching brand colors.
 * - Full-Color Fidelity: High-fidelity SVG logos for an authentic look.
 * - Isometric Spring Tilt: Tactile 3D response to cursor position.
 * - Liquid Button Reveal: Hidden CTAs that spring into view on hover.
 */
export const KineticSocialCards = ({
  cards = DEFAULT_CARDS,
  className,
  columns = 2,
}: KineticSocialCardsProps) => {
  return (
    <div className={cn("w-full max-w-6xl mx-auto p-4", className)}>
      <div 
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {cards.map((card) => (
          <SocialCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
