"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Products", href: "#" },
  { name: "Solutions", href: "#" },
  { name: "Developers", href: "#" },
  { name: "Pricing", href: "#" },
];

export function SingularityNavbar({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn("fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center", className)}>
      <motion.div
        layout
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ borderRadius: 100, width: 48, height: 48 }}
        animate={{
          borderRadius: isHovered ? 24 : 100,
          width: isHovered ? 500 : 48,
          height: isHovered ? 64 : 48,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          "relative flex items-center shadow-2xl overflow-hidden backdrop-blur-xl transition-colors duration-500",
          isHovered 
            ? "bg-black/80 border border-white/20 justify-between px-6" 
            : "bg-black border border-white/10 justify-center cursor-pointer"
        )}
      >
        {/* The Singularity Event Horizon Glow (Visible when collapsed) */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[2px] rounded-full border-[1px] border-transparent bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] pointer-events-none"
              style={{ maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}
            />
          )}
        </AnimatePresence>

        {/* The Dot / Brand Icon */}
        <motion.div layout className="relative z-10 flex items-center justify-center">
          {isHovered ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          ) : (
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
          )}
        </motion.div>

        {/* Expanded Navigation Links */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.1 } }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center gap-6 z-10"
            >
              {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-4 w-[1px] bg-white/20 mx-2" />
              <button className="text-sm font-semibold bg-white text-black px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
