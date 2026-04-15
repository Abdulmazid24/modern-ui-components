"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Mail, Settings, Camera, Music, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GravityDockProps {
  className?: string;
}

export const GravityDock = React.forwardRef<any, GravityDockProps>(({ className = "", ...props }, ref) => {
        // Mouse X position relative to viewport
        const mouseX = useMotionValue(Infinity);

        const items = [
        { id: "home", icon: <Home size={24} /> },
        { id: "mail", icon: <Mail size={24} /> },
        { id: "music", icon: <Music size={24} /> },
        { id: "camera", icon: <Camera size={24} /> },
        { id: "cloud", icon: <Cloud size={24} /> },
        { id: "settings", icon: <Settings size={24} /> },
        ];

        return (
        <div ref={handleRef} {...props} className={cn(className)}  
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-2 px-4 pb-3 pt-6 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-900 shadow-2xl ${className}`}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {/* Liquid Dock Bed underlying layer */}
          <div className="absolute bottom-2 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent rounded-2xl pointer-events-none z-0" />
          
          {items.map((item) => (
            <DockItem key={item.id} mouseX={mouseX}>
              {item.icon}
            </DockItem>
          ))}
        </div>
        );
        });

const DockItem = ({ mouseX, children }: { mouseX: any; children: React.ReactNode }) => {
  const localRef = useRef<HTMLButtonElement>(null);
        const handleRef = (node: any) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        };


  // Measure distance from mouse to the center of this item
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = localRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate dynamic properties based on distance
  // Only items within 150px of the cursor will be impacted
  const widthTransform = useTransform(distance, [-150, 0, 150], [50, 90, 50]);
  const yTransform = useTransform(distance, [-150, 0, 150], [0, -30, 0]);
  
  // Smooth the physics via Spring
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const y = useSpring(yTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button ref={handleRef} {...props} className={cn(className)}
      style={{ width, height: width, y }}
      className="relative z-10 flex items-center justify-center bg-zinc-800 rounded-2xl border border-zinc-700/50 text-zinc-300 hover:text-white hover:bg-zinc-700 shadow-lg"
    >
      {/* Responsive Icon sizing - scale icon slightly when container grows */}
      <motion.div 
        style={{ scale: useTransform(width, [50, 90], [1, 1.4]) }}
        className="pointer-events-none"
      >
        {children}
      </motion.div>
      
      {/* Light Reflection */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />
    </motion.button>
  );
};
