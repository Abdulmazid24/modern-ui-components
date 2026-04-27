"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { cn } from "../utils";

export interface HolographicCookieConsentProps {
  readonly onAccept?: () => void;
  readonly onDecline?: () => void;
  readonly title?: string;
  readonly description?: React.ReactNode;
  readonly position?: "bottom" | "bottom-left" | "bottom-right";
  readonly className?: string;
}

const POSITION_MAP = {
  "bottom": "bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4",
  "bottom-left": "bottom-6 left-6 max-w-md",
  "bottom-right": "bottom-6 right-6 max-w-md"
};

/** HolographicCookieConsent — Floating GDPR cookie consent banner with glassmorphism and animated entrance. */
export const HolographicCookieConsent = React.forwardRef<HTMLDivElement, HolographicCookieConsentProps>(
  ({ className, onAccept, onDecline, title = "We respect your privacy", description = "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.", position = "bottom-right", ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    // Show after a short delay on mount
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
      setIsVisible(false);
      onAccept?.();
    };

    const handleDecline = () => {
      setIsVisible(false);
      onDecline?.();
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <div className={cn("fixed z-[9999] pointer-events-none", POSITION_MAP[position], className)}>
            <motion.div 
              ref={ref} {...props}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="pointer-events-auto relative p-6 rounded-3xl bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              {/* Subtle top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              
              <button onClick={handleDecline} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                <X size={16} />
              </button>

              <div className="flex gap-4 mb-6">
                <div className="shrink-0 w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-zinc-800/50">
                <button onClick={handleDecline} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                  Decline
                </button>
                <button onClick={handleAccept} className="px-6 py-2 bg-white text-black text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Accept Cookies
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);
HolographicCookieConsent.displayName = "HolographicCookieConsent";
