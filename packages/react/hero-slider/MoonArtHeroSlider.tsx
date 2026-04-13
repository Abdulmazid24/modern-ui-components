"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils";

export interface MoonArtSlide {
  id: string;
  url: string;
  title: string;
    className?: string;
}

export interface MoonArtHeroSliderProps {
  heading?: string;
  subheading?: string;
  slides?: MoonArtSlide[];
  autoplayInterval?: number;
  onSeeMore?: () => void;
    className?: string;
}

const defaultSlides: MoonArtSlide[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=550&fit=crop", title: "Crimson Moon" },
  { id: "2", url: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&h=550&fit=crop", title: "Golden Dusk" },
  { id: "3", url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=550&fit=crop", title: "Amber Horizon" },
  { id: "4", url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=550&fit=crop", title: "Twilight Peak" },
  { id: "5", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=550&fit=crop", title: "Mystic Range" },
];

export const MoonArtHeroSlider = React.forwardRef<any, MoonArtHeroSliderProps>(({ className, heading = "EXPLORE\nMOON ART", subheading = "Some beautiful moons cannot be created without\npushing creativity", slides = defaultSlides, autoplayInterval = 3000, onSeeMore, ...props }, ref) => {
        const [active, setActive] = useState(0);

        const next = useCallback(() => {
        setActive((a) => (a + 1) % slides.length);
        }, [slides.length]);

        useEffect(() => {
        const timer = setInterval(next, autoplayInterval);
        return () => clearInterval(timer);
        }, [next, autoplayInterval]);

        // Show 3 visible cards at a time
        const getVisibleSlides = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
          visible.push((active + i) % slides.length);
        }
        return visible;
        };

        const visibleSlides = getVisibleSlides();

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-4xl rounded-3xl overflow-hidden mx-auto", className)}
          style={{
            background: "linear-gradient(135deg, #0c0015 0%, #1a0533 30%, #0d001f 100%)",
            minHeight: 420,
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative flex items-stretch min-h-[420px]">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center px-10 py-8 z-10">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight whitespace-pre-line mb-4"
              >
                {heading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm text-zinc-400 leading-relaxed max-w-xs mb-6 whitespace-pre-line"
              >
                {subheading}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onSeeMore}
                className="flex items-center gap-2 w-fit px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                See more <ChevronRight size={14} />
              </motion.button>

              {/* Dot indicators */}
              <div className="flex gap-2 mt-8">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      width: active === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: active === i
                        ? "linear-gradient(90deg, #8b5cf6, #c084fc)"
                        : "rgba(255,255,255,0.15)",
                      border: "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Card Slider */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden py-8 pr-6">
              <AnimatePresence mode="popLayout">
                {visibleSlides.map((slideIdx, position) => {
                  const slide = slides[slideIdx];
                  const isFirst = position === 0;
                  const xOffset = position * 115;
                  const scale = 1 - position * 0.08;
                  const zIndex = 3 - position;
                  const opacity = 1 - position * 0.2;

                  return (
                    <motion.div
                      key={`${slide.id}-${slideIdx}`}
                      layout
                      initial={{ x: 300, opacity: 0, scale: 0.8 }}
                      animate={{
                        x: xOffset,
                        opacity,
                        scale,
                        rotateY: position * -5,
                      }}
                      exit={{ x: -200, opacity: 0, scale: 0.7 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute rounded-2xl overflow-hidden cursor-pointer"
                      style={{
                        width: 160,
                        height: 220,
                        zIndex,
                        transformStyle: "preserve-3d",
                        boxShadow: isFirst
                          ? "0 15px 40px rgba(0,0,0,0.5), 0 0 20px rgba(139,92,246,0.15)"
                          : "0 10px 30px rgba(0,0,0,0.3)",
                      }}
                      onClick={() => setActive(slideIdx)}
                    >
                      <img
                        src={slide.url}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient overlay on cards */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isFirst
                            ? "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)"
                            : "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.4) 100%)",
                        }}
                      />

                      {/* Title on front card */}
                      {isFirst && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-3 left-3 text-xs font-bold text-white/90"
                        >
                          {slide.title}
                        </motion.p>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        );
        });
