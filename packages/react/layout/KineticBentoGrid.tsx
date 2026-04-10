"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export interface BentoItem {
  id: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  content: React.ReactNode;
  bg?: string;
}

export interface KineticBentoGridProps {
  items: BentoItem[];
}

/**
 * KineticBentoGrid
 * A masonry/bento layout where cards dynamically resize, auto-arrange, 
 * and react to cursor proximity with subtle repelling physics.
 */
export const KineticBentoGrid: React.FC<KineticBentoGridProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative grid grid-cols-3 gap-4 p-8 max-w-4xl mx-auto auto-rows-[160px]"
    >
      {items.map((item) => (
        <KineticCard 
          key={item.id} 
          item={item} 
          mousePos={mousePos} 
          containerRef={containerRef}
        />
      ))}
    </div>
  );
};

const KineticCard = ({ item, mousePos, containerRef }: { item: BentoItem, mousePos: { x: number, y: number }, containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Repel logic
  const [distance, setDistance] = useState(1000);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!cardRef.current || !containerRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Card center relative to container
    const cardCenterX = (cardRect.left - containerRect.left) + cardRect.width / 2;
    const cardCenterY = (cardRect.top - containerRect.top) + cardRect.height / 2;

    const dx = cardCenterX - mousePos.x;
    const dy = cardCenterY - mousePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    setDistance(dist);
    setAngle(Math.atan2(dy, dx));
  }, [mousePos, containerRef]);

  // Spring physics for smooth repulsion
  const springConfig = { damping: 20, stiffness: 300 };
  
  // Calculate repulsive force (max push 15px if very close, drops to 0 at 250px distance)
  const repelAmount = Math.max(0, 250 - distance) / 250 * 15;
  
  const targetX = Math.cos(angle) * repelAmount;
  const targetY = Math.sin(angle) * repelAmount;

  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  // Col/Row span classes
  const colClass = item.colSpan === 3 ? "col-span-3" : item.colSpan === 2 ? "col-span-2" : "col-span-1";
  const rowClass = item.rowSpan === 2 ? "row-span-2" : "row-span-1";

  // Spotlight glow based on mouse proximity
  const glowOpacity = Math.max(0, 1 - distance / 300);

  return (
    <motion.div
      ref={cardRef}
      style={{ x, y }}
      className={`relative rounded-3xl border border-zinc-800 overflow-hidden ${colClass} ${rowClass} ${item.bg || 'bg-zinc-900'} group`}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Spotlight Hover Effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(circle 150px at ${mousePos.x - (cardRef.current?.offsetLeft || 0)}px ${mousePos.y - (cardRef.current?.offsetTop || 0)}px, rgba(255,255,255,0.1), transparent)`
        }}
      />
      <div className="relative z-10 w-full h-full p-6 text-white flex flex-col justify-end">
        {item.content}
      </div>
    </motion.div>
  );
};
