"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SynthwaveGalleryProps {
  title?: string;
  subtitle?: string;
  images?: { id: string; url: string; alt: string }[];
    className?: string;
}

const defaultImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=500&fit=crop", alt: "Sunset landscape" },
  { id: "2", url: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&h=500&fit=crop", alt: "Mountain moon" },
  { id: "3", url: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=500&fit=crop", alt: "Night sky" },
  { id: "4", url: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=400&h=500&fit=crop", alt: "Galaxy view" },
  { id: "5", url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=500&fit=crop", alt: "Star trail" },
];

export const SynthwaveGallery = React.forwardRef<any, SynthwaveGalleryProps>(({ className, title = "EXPLORE", subtitle = "MOON ART", images = defaultImages, ...props }, ref) => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [isPlaying, setIsPlaying] = useState(false);

        React.useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % images.length);
        }, 2500);
        return () => clearInterval(timer);
        }, [isPlaying, images.length]);

        const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
        const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-3xl mx-auto overflow-hidden rounded-3xl select-none", className)} style={{ aspectRatio: "16/10" }}>
          {/* Synthwave Background */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, #1a0533 0%, #2d1066 30%, #6b21a8 55%, #ec4899 75%, #f97316 90%, #fbbf24 100%)",
          }}>
            {/* Sun/Moon Circle */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[30%]" style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "radial-gradient(circle, #fbbf24 0%, #f97316 40%, #ec4899 70%, transparent 100%)",
              boxShadow: "0 0 80px rgba(236, 72, 153, 0.5), 0 0 120px rgba(249, 115, 22, 0.3)",
            }} />

            {/* Horizon line glow */}
            <div className="absolute left-0 right-0 bottom-[25%] h-px" style={{
              background: "linear-gradient(90deg, transparent, #ec4899, #f97316, #ec4899, transparent)",
              boxShadow: "0 0 20px rgba(236, 72, 153, 0.8)",
            }} />

            {/* Grid perspective floor */}
            <div className="absolute left-0 right-0 bottom-0 h-[25%] overflow-hidden" style={{
              background: "linear-gradient(180deg, transparent, rgba(26, 5, 51, 0.8))",
            }}>
              {/* Horizontal grid lines */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0"
                  style={{
                    bottom: `${i * 14}%`,
                    height: 1,
                    background: "rgba(168, 85, 247, 0.3)",
                    transform: `scaleY(${1 + i * 0.3})`,
                  }}
                />
              ))}
              {/* Vertical grid lines */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${(i + 1) * (100 / 13)}%`,
                    width: 1,
                    background: "rgba(168, 85, 247, 0.2)",
                  }}
                />
              ))}
            </div>

            {/* Mountain silhouettes */}
            <svg className="absolute left-0 right-0 bottom-[22%] w-full" viewBox="0 0 800 100" fill="none" preserveAspectRatio="none" style={{ height: "15%" }}>
              <path d="M0 100 L0 60 L80 30 L160 55 L240 20 L320 45 L400 10 L480 40 L560 25 L640 50 L720 15 L800 40 L800 100Z" fill="#1a0533" opacity="0.9" />
            </svg>
          </div>

          {/* Title Section */}
          <div className="absolute top-6 left-8 z-10">
            <motion.h2
              className="text-white/90 text-sm md:text-base font-bold tracking-[0.5em] uppercase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {title}
            </motion.h2>
            <motion.h1
              className="text-white text-2xl md:text-4xl font-black tracking-wider"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {subtitle}
            </motion.h1>
          </div>

          {/* Image Cards Row */}
          <div className="absolute right-4 top-[15%] bottom-[30%] flex items-center gap-3 z-10">
            <AnimatePresence mode="popLayout">
              {images.map((img, i) => {
                const offset = i - activeIndex;
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={img.id}
                    layout
                    onClick={() => setActiveIndex(i)}
                    className="relative cursor-pointer overflow-hidden rounded-xl flex-shrink-0"
                    style={{
                      width: isActive ? 140 : 100,
                      height: isActive ? 180 : 140,
                    }}
                    animate={{
                      scale: isActive ? 1.05 : 0.95,
                      opacity: Math.abs(offset) > 2 ? 0.3 : 1,
                      zIndex: isActive ? 10 : 5 - Math.abs(offset),
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      style={{
                        border: isActive ? "2px solid rgba(236, 72, 153, 0.8)" : "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 12,
                        boxShadow: isActive ? "0 0 20px rgba(236, 72, 153, 0.4)" : "0 4px 15px rgba(0,0,0,0.4)",
                      }}
                    />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ border: "2px solid rgba(236, 72, 153, 0.6)" }}
                        layoutId="active-border"
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 transition-all"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="absolute bottom-6 right-6 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIndex
                    ? "linear-gradient(135deg, #ec4899, #f97316)"
                    : "rgba(255,255,255,0.3)",
                  transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
                  boxShadow: i === activeIndex ? "0 0 8px rgba(236, 72, 153, 0.6)" : "none",
                }}
              />
            ))}
          </div>

          {/* Neon border glow ring */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-[2px] rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, #a855f7, #ec4899, #a855f7, transparent)",
              boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        );
        });
