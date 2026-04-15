"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Home, Search, Bell, Settings, User, Mail, Camera, Music, Video } from 'lucide-react';
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  mouseX: number | null;
    className?: string;
}

/* ──────────────────────────────────────────────
   Dock Item (Handles individual scaling based on mouse distance)
   ────────────────────────────────────────────── */

const DockItem: React.FC<DockItemProps> = ({ icon, label, onClick, mouseX }) => {
  const localRef = useRef<HTMLButtonElement>(null);
        const handleRef = (node: any) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        };


  // Calculate distance from center of item to mouse X
  let scale = 1;
  let translateY = 0;

  if (mouseX !== null && localRef.current) {
    const rect = localRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);
    
    // Magnification logic: the closer the mouse, the bigger the scale
    // Max distance to affect is around 150px
    if (distance < 150) {
      // 1.5 is the max scale, decreases as distance reaches 150
      scale = 1 + (0.5 * (150 - distance) / 150);
      translateY = -15 * ((150 - distance) / 150);
    }
  }

  return (
    <div ref={handleRef} {...props} className={cn("dock-item-container", className)}>
      {/* Tooltip */}
      <div 
        className="dock-tooltip"
        style={{ 
          opacity: scale > 1.1 ? 1 : 0,
          transform: `translateY(${scale > 1.1 ? '0' : '10px'}) scale(${1 / scale})` 
        }}
      >
        {label}
      </div>
      
      {/* The actual dock icon */}
      <button
        ref={handleRef}
        onClick={onClick}
        className="dock-icon-btn"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transition: mouseX === null ? 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
      >
        {icon}
      </button>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Main Dock Container
   ────────────────────────────────────────────── */

export const MacDock = React.forwardRef<any, DockItemProps>(({ className, ...props }, ref) => {
        const [mouseX, setMouseX] = useState<number | null>(null);

        const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setMouseX(e.clientX);
        }, []);

        const handleMouseLeave = useCallback(() => {
        setMouseX(null);
        }, []);

        const icons = [
        { id: 'finder', icon: <Home size={24} />, label: 'Home', bg: 'bg-blue-500' },
        { id: 'search', icon: <Search size={24} />, label: 'Search', bg: 'bg-gray-700' },
        { id: 'mail', icon: <Mail size={24} />, label: 'Mail', bg: 'bg-sky-400' },
        { id: 'music', icon: <Music size={24} />, label: 'Music', bg: 'bg-rose-500' },
        { id: 'camera', icon: <Camera size={24} />, label: 'Photos', bg: 'bg-emerald-500' },
        { id: 'video', icon: <Video size={24} />, label: 'Video', bg: 'bg-purple-500' },
        { id: 'bell', icon: <Bell size={24} />, label: 'Alerts', bg: 'bg-amber-500' },
        { id: 'user', icon: <User size={24} />, label: 'Profile', bg: 'bg-indigo-500' },
        { id: 'settings', icon: <Settings size={24} />, label: 'Settings', bg: 'bg-slate-600' },
        ];

        return (
        <div ref={handleRef} {...props} className={cn("dock-wrapper", className)}>
          <div 
            className="dock-panel"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {icons.map((item) => (
              <DockItem
                key={item.id}
                mouseX={mouseX}
                label={item.label}
                icon={
                  <div className={`w-full h-full rounded-[22%] flex items-center justify-center text-white ${item.bg} dock-icon-inner`}>
                    {item.icon}
                  </div>
                }
              />
            ))}
          </div>
        </div>
        );
        });
