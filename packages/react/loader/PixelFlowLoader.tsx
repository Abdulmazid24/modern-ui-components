"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface PixelImage {
  url: string;
  title: string;
  subtitle: string;
}

const DEFAULT_IMAGES: PixelImage[] = [
  {
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    title: "We just love pixels",
    subtitle: "Precision in every frame"
  },
  {
    url: "https://images.unsplash.com/photo-1614850523296-d811cd93d402?auto=format&fit=crop&q=80&w=1000",
    title: "Chromatic Flow",
    subtitle: "Organic digital movement"
  },
  {
    url: "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1000",
    title: "Nature Synapse",
    subtitle: "Connecting the dots"
  },
  {
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
    title: "Obsidian Core",
    subtitle: "Deep architectural depth"
  }
];

interface PixelFlowLoaderProps {
  images?: PixelImage[];
  interval?: number;
  className?: string;
  autoPlay?: boolean;
}

/**
 * A "God-Tier" Cinematic Image Loader.
 * Features:
 * - Segmented Vertical Strips: High-fidelity image strips that cycle through a brand's narrative.
 * - Dynamic Text Reveals: Glitchy, reveal-style typography that changes with each image cycle.
 * - Interactive Expansion: Hovering over strips expands them to fill the background.
 * - Spatial Audio: Synchronized shutter/slide feedback on transitions.
 */
export const PixelFlowLoader = ({
  images = DEFAULT_IMAGES,
  interval = 4000,
  className,
  autoPlay = true,
}: PixelFlowLoaderProps) => {
  const [index, setIndex] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { play: playSlide } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Shutter/Slide sound
  });

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
      playSlide();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, images.length, interval, playSlide]);

  const currentImage = images[index];

  return (
    <div className={cn("relative w-full h-[600px] overflow-hidden bg-black flex flex-col items-center justify-center", className)}>
      {/* Background Full Fill (on hover or main image) */}
      <AnimatePresence mode="wait">
        <motion.div
           key={index}
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 0.3, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0 z-0 bg-cover bg-center grayscale"
           style={{ backgroundImage: `url(${currentImage.url})` }}
        />
      </AnimatePresence>

      {/* Dynamic Text Reveal Overlay */}
      <div className="relative z-20 text-center mb-12 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.title}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="space-y-2"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              {currentImage.title}
            </h2>
            <p className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.4em]">
              {currentImage.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vertical Image Strips Mosaic */}
      <div className="relative z-30 flex items-center justify-center gap-4 px-8 h-48 md:h-64">
        {images.map((img, i) => {
          const isActive = index === i;
          const isHovered = hoveredIdx === i;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => { setIndex(i); playSlide(); }}
              animate={{
                width: isHovered ? 200 : isActive ? 120 : 60,
                opacity: isActive || isHovered ? 1 : 0.4,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-full rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10"
            >
              <img 
                src={img.url} 
                alt="strip" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
              />
              
              {/* Inner Glow/Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              
              {/* Active Indicator Line */}
              {isActive && (
                <motion.div 
                  layoutId="active-line"
                  className="absolute bottom-2 left-2 right-2 h-1 bg-white rounded-full z-10 shadow-[0_0_10px_white]"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Finishing Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
         {images.map((_, i) => (
           <div 
             key={i} 
             className={cn(
               "w-1.5 h-1.5 rounded-full transition-all duration-500",
               index === i ? "bg-white w-8 shadow-[0_0_10px_white]" : "bg-white/20"
             )} 
           />
         ))}
      </div>
    </div>
  );
};
