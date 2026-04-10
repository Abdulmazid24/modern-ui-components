"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Edit2, Trash2, Share2, X } from "lucide-react";

export interface OrbAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

export interface ContextOrbProps {
  children: React.ReactNode;
  actions?: OrbAction[];
}

export const ContextOrb: React.FC<ContextOrbProps> = ({ children, actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const defaultActions: OrbAction[] = [
    { id: "copy", icon: <Copy size={18} />, label: "Copy", onClick: () => {}, color: "text-blue-400" },
    { id: "edit", icon: <Edit2 size={18} />, label: "Edit", onClick: () => {}, color: "text-emerald-400" },
    { id: "share", icon: <Share2 size={18} />, label: "Share", onClick: () => {}, color: "text-purple-400" },
    { id: "delete", icon: <Trash2 size={18} />, label: "Delete", onClick: () => {}, color: "text-red-400" },
  ];

  const displayActions = actions || defaultActions;

  // Handle Right Click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  // Close on outside click or scroll
  useEffect(() => {
    const handleOutsideClick = () => setIsOpen(false);
    const handleScroll = () => setIsOpen(false);
    
    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
      window.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      <div 
        onContextMenu={handleContextMenu}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ 
              perspective: "1000px" 
            }}
          >
            {/* Dark Overlay (optional, focusing the orb) */}
            <motion.div 
              className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* The Orb Center */}
            <motion.div
              className="absolute pointer-events-auto"
              style={{ left: position.x, top: position.y }}
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Close Button in Center */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50 focus:outline-none"
              >
                <X size={20} />
              </button>

              {/* Orbiting Actions */}
              {displayActions.map((action, index) => {
                const total = displayActions.length;
                // Calculate position on a circle (using standard math)
                const angle = (index / total) * 360 - 90; // -90 starts at top
                const radius = 80; // Distance from center
                const radian = angle * (Math.PI / 180);
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <motion.button
                    key={action.id}
                    onClick={(e) => { e.stopPropagation(); action.onClick(); setIsOpen(false); }}
                    className={`absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-zinc-950 border border-zinc-800 rounded-full shadow-lg hover:scale-110 hover:bg-zinc-800 transition-colors focus:outline-none group ${action.color}`}
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{ x, y, scale: 1 }}
                    exit={{ x: 0, y: 0, scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 20, 
                      delay: index * 0.05 // Stagger out
                    }}
                    title={action.label}
                  >
                    {action.icon}
                    
                    {/* Tooltip Label */}
                    <span className="absolute -top-8 px-2 py-1 bg-zinc-900 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {action.label}
                    </span>
                  </motion.button>
                );
              })}
              
              {/* Decorative Magic Ring */}
              <motion.div 
                className="absolute w-[160px] h-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-800/50 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ borderStyle: "dashed" }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
