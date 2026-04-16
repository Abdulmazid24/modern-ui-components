"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "../utils";

interface VortexBackgroundProps {
  particleCount?: number;
  hue?: number;
  rangeY?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  backgroundColor?: string;
  className?: string;
}

/**
 * A mesmerizing canvas-based swirling particle background.
 * Optimized for 60fps performance on hero sections.
 */
export const VortexBackground = ({
  particleCount = 500,
  hue = 200,
  rangeY = 100,
  baseSpeed = 0.1,
  rangeSpeed = 1.5,
  backgroundColor = "black",
  className,
}: VortexBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = h / 2 + (Math.random() - 0.5) * rangeY;
        this.vx = (Math.random() - 0.5) * rangeSpeed + baseSpeed;
        this.vy = (Math.random() - 0.5) * rangeSpeed;
        this.maxLife = 100 + Math.random() * 100;
        this.life = this.maxLife;
        this.size = Math.random() * 2 + 1;
        this.color = `hsla(${hue + Math.random() * 50}, 80%, 60%, 0.8)`;
      }

      update() {
        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
           this.vx += (dx / dist) * 0.1;
           this.vy += (dy / dist) * 0.1;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h || this.life <= 0) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * w;
        this.y = h / 2 + (Math.random() - 0.5) * rangeY;
        this.life = this.maxLife;
        this.vx = (Math.random() - 0.5) * rangeSpeed + baseSpeed;
        this.vy = (Math.random() - 0.5) * rangeSpeed;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, hue, rangeY, baseSpeed, rangeSpeed, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 z-[-1]", className)}
      style={{ backgroundColor }}
    />
  );
};
