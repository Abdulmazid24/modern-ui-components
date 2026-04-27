"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "../utils";

const OVERLAY_SPRING = { type: "spring", stiffness: 260, damping: 25 } as const;
const DIALOG_SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const GLOW_COLOR = "rgba(139, 92, 246, 0.4)";

export interface HeroVideoDialogProps {
  thumbnailUrl: string;
  videoUrl: string;
  thumbnailAlt?: string;
  className?: string;
}

/**
 * HeroVideoDialog — A cinematic hero section with a thumbnail that
 * expands into a full-screen video dialog. Inspired by Magic UI's
 * Hero Video Dialog, enhanced with our vault's physics-based springs
 * and glow aesthetics.
 */
export const HeroVideoDialog = React.forwardRef<
  HTMLDivElement,
  HeroVideoDialogProps
>(({ className, thumbnailUrl, videoUrl, thumbnailAlt = "Video thumbnail", ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Thumbnail with Play Button */}
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10",
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={thumbnailUrl}
          alt={thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-500">
          <motion.div
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={OVERLAY_SPRING}
          >
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </motion.div>
        </div>

        {/* Glow ring on hover */}
        <div
          className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 60px ${GLOW_COLOR}, 0 0 80px ${GLOW_COLOR}`,
          }}
        />
      </div>

      {/* Full-screen Video Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Video Container */}
            <motion.div
              className="relative z-10 w-full max-w-5xl aspect-video bg-zinc-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.15)]"
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={DIALOG_SPRING}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Controls Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleClose(); }}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-500/50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

HeroVideoDialog.displayName = "HeroVideoDialog";
