"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface OrbitalPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const OrbitalPagination: React.FC<OrbitalPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate surrounding pages (up to 2 before and 2 after)
  const getPages = () => {
    const pages = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  // Map pages to an arc (orbit)
  // We want the current page in the center, and others curved around it
  const getOrbitalPosition = (page: number) => {
    const offset = page - currentPage; // e.g., -2, -1, 0, 1, 2
    // Max offset spread is -2 to +2. Map this to an angle.
    // Center is 180 degrees.
    const baseAngle = -90; // degrees (top center of the orbit)
    const angleOffset = offset * 25; // 25 degrees apart
    const angleRad = (baseAngle + angleOffset) * (Math.PI / 180);
    
    const radius = 80; // Distance from center orbit origin
    
    return {
      x: Math.cos(angleRad) * radius,
      y: Math.sin(angleRad) * radius + 80 // Shift down so center is near 0,0
    };
  };

  return (
    <div className="relative w-full max-w-sm h-[120px] flex items-center justify-center mt-10">
      
      {/* The Orbit SVG Path (Visual background) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '-40px' }}>
        <path 
          d="M 50,120 A 80,80 0 0,1 330,120" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.05)" 
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="absolute left-0 p-2 text-zinc-500 hover:text-white disabled:opacity-20 transition-colors"
      >
        <ChevronLeft />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        {pages.map((page) => {
          const isCurrent = page === currentPage;
          const pos = getOrbitalPosition(page);

          return (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              animate={{ 
                x: pos.x, 
                y: pos.y,
                scale: isCurrent ? 1.2 : 0.8,
                opacity: isCurrent ? 1 : 0.6
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`absolute flex items-center justify-center rounded-full font-bold shadow-lg transition-colors ${
                isCurrent 
                  ? "w-12 h-12 bg-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.6)] z-20" 
                  : "w-10 h-10 bg-zinc-900 border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white z-10"
              }`}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="absolute right-0 p-2 text-zinc-500 hover:text-white disabled:opacity-20 transition-colors"
      >
        <ChevronRight />
      </button>

      {/* Page Info */}
      <div className="absolute -bottom-8 text-xs font-medium tracking-widest text-zinc-600 uppercase">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};
