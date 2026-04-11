"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SingularityButtonProps {
  text?: string;
  onClick?: () => void;
}

export const SingularityButton: React.FC<SingularityButtonProps> = ({
  text = "INITIALIZE SINGULARITY",
  onClick,
}) => {
  const [isImploding, setIsImploding] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let particles: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      distSq: number;
      size: number;

      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 100 + 40;
        this.x = width / 2 + Math.cos(this.angle) * this.radius;
        this.y = height / 2 + Math.sin(this.angle) * this.radius;
        this.speed = Math.random() * 0.02 + 0.005;
        this.distSq = 0;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update(imploding: boolean) {
        if (imploding) {
          // Spirals toward center quickly
          this.radius *= 0.85;
          this.speed += 0.05;
        }
        
        this.angle += this.speed;
        this.x = width / 2 + Math.cos(this.angle) * this.radius;
        this.y = height / 2 + Math.sin(this.angle) * this.radius;

        // Reset if too far or too close
        if (this.radius < 2) {
          this.angle = Math.random() * Math.PI * 2;
          this.radius = Math.random() * 100 + 100;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.min(1, 20 / Math.max(1, this.radius))})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle event horizon glow
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.3, "rgba(20, 0, 40, 0.4)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(isImploding);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isImploding]);

  const handleClick = () => {
    if (isImploding || isExploding) return;
    
    setIsImploding(true);
    
    // Sequence
    setTimeout(() => {
      setIsImploding(false);
      setIsExploding(true);
      if (onClick) onClick();
      
      setTimeout(() => {
        setIsExploding(false);
      }, 1000);
    }, 1500); // Implosion duration
  };

  return (
    <div className="relative flex items-center justify-center p-8 bg-black">
      {/* Event Horizon Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="max-w-none"
          style={{ opacity: isExploding ? 0 : 1, transition: "opacity 0.2s" }}
        />
      </div>

      <motion.button
        onClick={handleClick}
        className="relative z-10 px-8 py-4 font-mono font-bold tracking-widest text-cyan-200 uppercase bg-black border border-cyan-500/30 rounded-2xl overflow-hidden cursor-pointer group outline-none"
        animate={{
          scale: isImploding ? 0 : isExploding ? 2 : 1,
          opacity: isExploding ? 0 : 1,
          rotate: isImploding ? 720 : 0,
          borderRadius: isImploding ? "50%" : "16px",
          boxShadow: isImploding 
            ? "0 0 50px 20px rgba(0, 255, 255, 0.8), inset 0 0 50px 20px rgba(0, 0, 0, 1)" 
            : "0 0 15px 2px rgba(0, 255, 255, 0)",
        }}
        transition={{
          scale: { duration: isImploding ? 1.5 : 0.8, ease: isImploding ? "anticipate" : "easeOut" },
          opacity: { duration: isExploding ? 0.3 : 0.5 },
          rotate: { duration: 1.5, ease: "easeIn" },
          borderRadius: { duration: 0.5 },
        }}
        whileHover={!isImploding ? { scale: 1.05, boxShadow: "0 0 25px 5px rgba(0, 255, 255, 0.2)" } : {}}
        whileTap={!isImploding ? { scale: 0.95 } : {}}
      >
        {/* Distorting Text */}
        <motion.span
          className="relative inline-block whitespace-nowrap mix-blend-screen"
          animate={{
            letterSpacing: isImploding ? "-0.2em" : "0.15em",
            filter: isImploding ? "blur(3px)" : "blur(0px)",
            scaleX: isImploding ? 0.2 : 1,
          }}
          transition={{ duration: 1.5, ease: "anticipate" }}
        >
          {text}
        </motion.span>

        {/* Ambient Ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-50"
          animate={{
            scale: isImploding ? 0 : [1, 1.05, 1],
            opacity: isImploding ? 0 : [0.5, 0.8, 0.5],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
        />
      </motion.button>

      {/* Supernova Flash */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 30, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute z-50 w-8 h-8 rounded-full bg-cyan-200 pointer-events-none"
            style={{ boxShadow: "0 0 50px 20px rgba(200, 255, 255, 1)" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
