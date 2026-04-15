"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface WordCloudSphereProps {
  words?: string[];
  radius?: number;
    className?: string;
}

export const WordCloudSphere = React.forwardRef<any, WordCloudSphereProps>(({ className, words = [
            "React", "Framer", "Motion", "Tailwind", "Next.js", "TypeScript",
            "Node", "Quantum", "Gravity", "Cyber", "Neon", "Design",
            "System", "Vault", "Component", "SVG", "Physics", "Spring",
            "CSS", "HTML5", "Vite", "Webpack", "V8", "Architecture"
          ], radius = 150, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [items, setItems] = useState<any[]>([]);

        // We map words to initial spherical coordinates (phi and theta)
        useEffect(() => {
        const newItems = words.map((word, i) => {
          // Golden ratio spiral distribution on a sphere
          const phi = Math.acos(-1 + (2 * i) / words.length);
          const theta = Math.sqrt(words.length * Math.PI) * phi;
          
          return { word, phi, theta };
        });
        setItems(newItems);
        }, [words]);

        // Animation Loop updating rotation
        const [rotation, setRotation] = useState(0);

        useEffect(() => {
        let animationFrame: number;
        const animate = () => {
          setRotation(r => r + 0.005);
          animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
        }, []);

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-sm aspect-square bg-zinc-950 border border-zinc-900 shadow-2xl rounded-full flex items-center justify-center overflow-hidden", className)}
          ref={containerRef}
        >
          {/* Background illumination */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-900/20 to-transparent pointer-events-none" />

          {items.map((item, i) => {
            // Apply global rotation to the sphere points
            // Simplified Math:
            // We rotate around the Y axis by 'rotation'
            const sinRot = Math.sin(rotation);
            const cosRot = Math.cos(rotation);

            // Convert spherical to cartesian
            const x0 = radius * Math.sin(item.phi) * Math.cos(item.theta);
            const y0 = radius * Math.cos(item.phi);
            const z0 = radius * Math.sin(item.phi) * Math.sin(item.theta);

            // Rotate Y axis
            const x = x0 * cosRot - z0 * sinRot;
            const y = y0; // Y axis unchanged for horizontal rotation
            const z = z0 * cosRot + x0 * sinRot;

            // Perspective projection mapping 3D to 2D
            const scale = (radius + z) / (radius * 2); // 0 to 1 roughly
            const alpha = (scale - 0.2) * 1.5; // fade out back elements

            return (
              <div
                key={i}
                className="absolute transition-all duration-0 linear whitespace-nowrap cursor-pointer hover:!text-cyan-400 font-bold tracking-widest uppercase font-mono"
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale * 1.5})`,
                  opacity: Math.max(0.1, Math.min(1, alpha)),
                  zIndex: Math.round(z),
                  color: scale > 0.6 ? '#fff' : '#52525b',
                  filter: `blur(${Math.max(0, 3 - scale*4)}px)`
                }}
              >
                {item.word}
              </div>
            );
          })}
        </div>
        );
        });
