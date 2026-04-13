"use client";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

const COLORS = ["#ff3366","#ff9933","#33cc66","#3399ff","#cc33ff","#ffcc00"];
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
interface Particle { id: number; x: number; y: number; color: string; size: number; angle: number; velocity: number; }
export const ParticleConfetti = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [particles, setParticles] = useState<Particle[]>([]);
        const fire = useCallback(() => {
        const burst: Particle[] = Array.from({ length: 50 }, (_, i) => ({ id: Date.now() + i, x: 50, y: 50, color: COLORS[Math.floor(Math.random() * COLORS.length)], size: rand(4, 10), angle: rand(0, 360), velocity: rand(200, 500) }));
        setParticles(burst);
        setTimeout(() => setParticles([]), 3000);
        }, []);
        return (
        <div ref={ref} {...props} className={cn("relative flex items-center justify-center min-h-[300px] w-full", className)}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              return <motion.div key={p.id} initial={{ x: "50%", y: "50%", opacity: 1, scale: 1 }} animate={{ x: `calc(50% + ${Math.cos(rad) * p.velocity}px)`, y: `calc(50% + ${Math.sin(rad) * p.velocity - 100}px)`, opacity: 0, scale: 0, rotate: rand(-180, 180) }} transition={{ duration: 2, ease: "easeOut" }} className="absolute rounded-sm" style={{ width: p.size, height: p.size * rand(1, 3), background: p.color }} />;
            })}
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={fire} className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm font-bold cursor-pointer z-10" style={{ boxShadow: "0 0 25px rgba(236,72,153,0.3)" }}>🎉 Celebrate!</motion.button>
        </div>
        );
        });
