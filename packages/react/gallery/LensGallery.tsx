"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface LensGalleryProps {
  images: GalleryImage[];
}

export const LensGallery: React.FC<LensGalleryProps> = ({ images }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex gap-2 h-[400px]">
      {images.map((image) => {
        const isHovered = hoveredId === image.id;
        const isAdjacent = hoveredId !== null && !isHovered; // Simplified: everything else shrinks slightly

        return (
          <motion.div
            key={image.id}
            onHoverStart={() => setHoveredId(image.id)}
            onHoverEnd={() => setHoveredId(null)}
            layout
            // The "Lens" effect happens organically through flex sizing
            // Hovered item takes up much more space, others compress
            animate={{
              flex: isHovered ? 4 : hoveredId ? 0.5 : 1,
              filter: isAdjacent ? "brightness(0.3) blur(2px) grayscale(50%)" : "brightness(1) blur(0px) grayscale(0%)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="group relative h-full rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* The Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={image.url} 
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Internal Lens flare on hover */}
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-overlay pointer-events-none"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Inner Border */}
            <div className={`absolute inset-0 border-2 rounded-2xl transition-colors duration-300 ${isHovered ? 'border-white/50' : 'border-zinc-800/20'}`} />
          </motion.div>
        );
      })}
    </div>
  );
};
