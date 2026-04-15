"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Compass, MessageCircle, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MagneticLiquidDockProps {
  items?: { id: string; icon: React.ReactNode; label: string }[];
    className?: string;
}

const defaultItems = [
  { id: "home", icon: <Home size={24} />, label: "Home" },
  { id: "explore", icon: <Compass size={24} />, label: "Explore" },
  { id: "messages", icon: <MessageCircle size={24} />, label: "Messages" },
  { id: "likes", icon: <Heart size={24} />, label: "Likes" },
  { id: "profile", icon: <User size={24} />, label: "Profile" },
];

export const MagneticLiquidDock = React.forwardRef<any, MagneticLiquidDockProps>(({ className, items = defaultItems, ...props }, ref) => {
        const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
        const mouseX = useMotionValue(Infinity);

        // Spring config for the entire dock stretch
        const springConfig = { damping: 15, stiffness: 200 };

        return (
        <div ref={handleRef} {...props} className={cn("flex items-center justify-center p-20 bg-zinc-950 min-h-[300px]", className)}>
          
          {/* SVG filter needed for the Liquid/Gooey effect */}
          <svg width="0" height="0" className="absolute hidden">
            <filter id="liquid-dock-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="liquid-dock-goo"
              />
              <feBlend in="SourceGraphic" in2="liquid-dock-goo" />
            </filter>
          </svg>

          <motion.nav 
            className="relative flex items-end h-24 px-4 pb-4 mx-auto rounded-full"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => {
              mouseX.set(Infinity);
              setHoveredIndex(null);
            }}
            style={{
              // Apply gooey filter to merge the background blobs
              filter: "url('#liquid-dock-goo')", 
            }}
          >
            {/* The solid track (Black pill) */}
            <div className="absolute inset-x-0 bottom-4 h-16 bg-zinc-900 rounded-full border border-white/5" />

            {items.map((item, i) => {
              return (
                <DockItem 
                  key={item.id} 
                  item={item} 
                  mouseX={mouseX} 
                  index={i}
                  isHovered={hoveredIndex === i}
                  setHovered={() => setHoveredIndex(i)}
                />
              );
            })}
          </motion.nav>
        </div>
        );
        });

// Extracted Dock Item for individual physics calculations
function DockItem({ item, mouseX, index, isHovered, setHovered }: any) {
  const localRef = useRef<HTMLDivElement>(null);
        const handleRef = (node: any) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        };


  // Measure distance from mouse to center of this icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = localRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate dynamic properties based on distance
  // If close (within 100px), it scales up to 1.8x, width expands, Y translates up
  const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.8, 1]);
  const scale = useSpring(scaleSync, { damping: 15, stiffness: 200, mass: 0.1 });
  
  const widthSync = useTransform(distance, [-100, 0, 100], [60, 100, 60]);
  const width = useSpring(widthSync, { damping: 15, stiffness: 200, mass: 0.1 });

  const ySync = useTransform(distance, [-100, 0, 100], [0, -20, 0]);
  const y = useSpring(ySync, { damping: 15, stiffness: 200, mass: 0.1 });

  return (
    <motion.div
      ref={handleRef}
      style={{ width }}
      className="relative flex flex-col items-center justify-end h-full cursor-pointer z-10"
      onMouseEnter={setHovered}
    >
      {/* Liquid background blob that extrudes when scaled up, forming a peak that merges via Gooey filter */}
      <motion.div
        className="absolute bottom-0 bg-cyan-500 rounded-full opacity-0 pointer-events-none"
        style={{
          width: scaleSync, // Use non-springed value for smoother gooey merging
          height: scaleSync,
        }}
        animate={{
           opacity: isHovered ? 0.8 : 0,
           y: isHovered ? -10 : 0
        }}
      />
      
      {/* Icon bubble */}
      <motion.div
        style={{ scale, y }}
        className="relative flex items-center justify-center w-12 h-12 bg-zinc-800 border border-white/10 rounded-full shadow-xl text-zinc-300 z-20 group peer"
      >
        <span className={`transition-colors duration-300 ${isHovered ? 'text-cyan-400' : ''}`}>
          {item.icon}
        </span>
        
        {/* Tooltip */}
        <motion.div 
           initial={{ opacity: 0, y: 10, scale: 0.5 }}
           animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -50 : 10, scale: isHovered ? 1 : 0.5 }}
           className="absolute px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white bg-black/80 backdrop-blur-md rounded-md pointer-events-none whitespace-nowrap border border-white/10"
        >
           {item.label}
        </motion.div>
      </motion.div>

      {/* Underglow dot */}
      <motion.div 
         animate={{ width: isHovered ? 20 : 4, opacity: isHovered ? 1 : 0.4 }}
         className="absolute -bottom-2 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] transition-all duration-300" 
      />
    </motion.div>
  );
}
