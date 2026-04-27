"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { cn } from "../utils";

export interface HolographicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  readonly fallback?: React.ReactNode;
  readonly preview?: boolean;
  readonly rounded?: "none" | "md" | "lg" | "xl" | "full";
  readonly glowOnHover?: boolean;
}

/** HolographicImage — Smart image with lazy loading, graceful fallback, zoom preview lightbox, and hover glow aura. */
export const HolographicImage = React.forwardRef<HTMLImageElement, HolographicImageProps>(
  ({ className, fallback, preview = false, rounded = "lg", glowOnHover = false, alt = "", onError, ...props }, ref) => {
    const [error, setError] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const roundedMap = { none: "", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", full: "rounded-full" };

    if (error) {
      return (
        <div className={cn("flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-600", roundedMap[rounded], className)} style={{ aspectRatio: "16/9" }}>
          {fallback ?? <span className="text-xs font-mono">Image unavailable</span>}
        </div>
      );
    }

    return (
      <>
        <div className={cn("relative overflow-hidden group", roundedMap[rounded], glowOnHover && "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]", "transition-shadow duration-300", className)}>
          <img ref={ref} alt={alt} loading="lazy" {...props}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { setError(true); onError?.(e); }} />
          {preview && (
            <button onClick={() => setIsPreview(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors cursor-zoom-in">
              <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {isPreview && (
            <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPreview(false)}>
              <motion.img alt={alt} {...props}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }} />
              <button onClick={() => setIsPreview(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);
HolographicImage.displayName = "HolographicImage";
