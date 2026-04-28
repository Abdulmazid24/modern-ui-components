"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Camera as Instagram, 
  Share2 as X, 
  Palette as Dribbble, 
  Code as Code2, 
  Briefcase as Briefcase, 
  Disc as Discord, 
  Send as Telegram,
  Frame,
  Share2
} from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface SocialItem {
  id: string;
  icon: React.ElementType;
  color: string;
  href: string;
  label: string;
}

const DEFAULT_SOCIALS: SocialItem[] = [
  { id: "instagram", icon: Instagram, color: "#E4405F", href: "#", label: "Instagram" },
  { id: "x", icon: X, color: "#000000", href: "#", label: "X" },
  { id: "dribbble", icon: Dribbble, color: "#EA4C89", href: "#", label: "Dribbble" },
  { id: "framer", icon: Framer, color: "#0055FF", href: "#", label: "Framer" },
  { id: "linkedin", icon: Briefcase, color: "#0077B5", href: "#", label: "LinkedIn" },
  { id: "discord", icon: Discord, color: "#5865F2", href: "#", label: "Discord" },
  { id: "github", icon: Code2, color: "#181717", href: "#", label: "GitHub" },
  { id: "telegram", icon: Telegram, color: "#26A5E4", href: "#", label: "Telegram" },
  { id: "reddit", icon: Share2, color: "#FF4500", href: "#", label: "Reddit" },
];

interface NeuralSocialRevealProps {
  items?: SocialItem[];
  className?: string;
}

/**
 * A "God-Tier" Social Media Reveal Card.
 * Features:
 * - Neural Privacy Cover: Blurry crystalline glass state.
 * - Click-to-Reveal: Morphs into a 3x3 social grid with liquid stagger.
 * - 3D Parallax Tilt: Card follows cursor with inertia.
 * - Brand Adaptive Glow: Individual items glow on individual hover.
 */
export const NeuralSocialReveal = ({
  items = DEFAULT_SOCIALS,
  className,
}: NeuralSocialRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { play: playUnlock } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3", // Neutral pop server
  });

  // Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
    playUnlock();
  };

  return (
    <div 
      className={cn("flex items-center justify-center p-10 perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={containerRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onClick={toggleReveal}
        className="relative h-80 w-80 cursor-pointer rounded-[3rem] border border-white/10 bg-zinc-950/20 shadow-[0_50px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl transition-all duration-500 hover:border-white/20"
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Cover State: Privacy Shroud */
            <motion.div
              key="shroud"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-0.5 animate-pulse">
                 <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950">
                    <Share2 className="text-white/60" />
                 </div>
              </div>
              <h3 className="mb-2 text-xl font-black uppercase tracking-[0.3em] text-white/80">
                Connect
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Neural Grid Offline • Click to Reveal
              </p>
              
              {/* Crystalline Artifacts */}
              <div className="absolute top-4 right-4 h-6 w-6 rounded-full border border-white/5" />
              <div className="absolute bottom-4 left-4 h-10 w-10 rounded-full border border-white/5" />
            </motion.div>
          ) : (
            /* Reveal State: 3x3 Social Grid */
            <motion.div
              key="grid"
              initial="hidden"
              animate="visible"
              className="absolute inset-0 z-10 grid grid-cols-3 gap-4 p-6"
            >
              {items.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 20 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0, 
                      transition: { delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 } 
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "rgba(255,255,255,0.05)",
                    transition: { duration: 0.2 }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="group relative flex items-center justify-center rounded-2xl border border-white/5 bg-white/0 transition-all duration-300 hover:border-white/20"
                >
                  <item.icon 
                    size={28} 
                    className="text-zinc-500 transition-all duration-300 group-hover:scale-110" 
                    style={{ color: "var(--brand-color)" }}
                  />
                  
                  {/* Brand Adaptive Background Glow */}
                  <div 
                    className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"
                    style={{ backgroundColor: item.color }}
                  />
                  
                  {/* Dynamic brand color hover CSS hack */}
                  <style jsx>{`
                    a:hover svg { color: ${item.color} !important; }
                  `}</style>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Underglow */}
        <div 
          className={cn(
            "absolute -inset-20 -z-30 opacity-20 blur-[100px] transition-all duration-1000",
            isRevealed ? "bg-cyan-500" : "bg-fuchsia-500"
          )}
        />
      </motion.div>
    </div>
  );
};
