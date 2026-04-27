"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

const ORBIT_SPEED = 0.003;
const SPHERE_RADIUS = 150;

export interface NebulaeIconCloudProps { readonly icons: readonly React.ReactNode[]; readonly size?: number; readonly className?: string; }

/** NebulaeIconCloud — A 3D rotating sphere of technology icons with depth-based opacity and glow trails. Uses trigonometric projection for real 3D positioning. */
export const NebulaeIconCloud = React.forwardRef<HTMLDivElement, NebulaeIconCloudProps>(
  ({ className, icons, size = 400, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const angleRef = useRef(0);
    const frameRef = useRef<number>(0);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const animate = () => {
        angleRef.current += ORBIT_SPEED;
        const items = container.querySelectorAll<HTMLElement>("[data-cloud-item]");
        const total = items.length;

        items.forEach((item, i) => {
          const phi = Math.acos(-1 + (2 * i + 1) / total);
          const theta = Math.sqrt(total * Math.PI) * phi + angleRef.current;
          const x = SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi);
          const y = SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);
          const z = SPHERE_RADIUS * Math.cos(phi);
          const scale = (z + SPHERE_RADIUS) / (2 * SPHERE_RADIUS);
          const opacity = 0.3 + scale * 0.7;

          item.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${0.6 + scale * 0.6})`;
          item.style.opacity = String(opacity);
          item.style.zIndex = String(Math.round(scale * 100));
          item.style.filter = `blur(${(1 - scale) * 2}px)`;
        });

        frameRef.current = requestAnimationFrame(animate);
      };

      frameRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameRef.current);
    }, [icons.length]);

    return (
      <div ref={ref} {...props} className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
        <div ref={containerRef} className="relative" style={{ width: 0, height: 0 }}>
          {icons.map((icon, i) => (
            <div key={i} data-cloud-item className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-900/60 border border-zinc-800/40 backdrop-blur-sm text-zinc-300 hover:text-violet-400 hover:border-violet-500/30 transition-colors cursor-pointer" style={{ willChange: "transform, opacity" }}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
NebulaeIconCloud.displayName = "NebulaeIconCloud";
