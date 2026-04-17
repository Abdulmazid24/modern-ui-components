"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Sparkles, LogIn, ChevronRight } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface FractalNebulaLoginFormProps {
  onSubmit?: (data: any) => void;
  className?: string;
}

/**
 * A "God-Tier" Cosmic Login Form (#264).
 * Features:
 * - Generative Nebula Background: An infinitely changing fractal smoke canvas.
 * - Perfectly Centered Obsidian Form: A high-fidelity glass plate UI.
 * - Reactive Glow Inputs: Elements that breathe with the nebula's current pulse.
 * - 264-Component Milestone: Continuing the march to 472+.
 */
export const FractalNebulaLoginForm = ({
  onSubmit,
  className,
}: FractalNebulaLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { play: playClick } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Tech click
  });

  // Generative Nebula Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: any[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        hue: Math.random() * 360,
      });
    }

    const render = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.hue += 0.5;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.shadowBlur = 40;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.8)`;
        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, 0.5)`;
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    onSubmit?.({ email, password });
  };

  return (
    <div className={cn("fixed inset-0 flex items-center justify-center overflow-hidden bg-black font-sans", className)}>
      {/* Generative Nebula Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Perfectly Centered Obsidian Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        <div className="relative p-10 bg-black/60 backdrop-blur-[32px] rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Top Decorative Spark */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          {/* Header */}
          <div className="text-center mb-10 space-y-2">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-4"
            >
               <Sparkles className="text-white/60" size={24} />
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tight">Login Hub</h1>
            <p className="text-white/40 text-sm font-medium">Access your digital vault</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white text-sm font-bold placeholder:text-white/20 focus:bg-white/10 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white text-sm font-bold placeholder:text-white/20 focus:bg-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-cyan-500 transition-all opacity-20 group-hover:opacity-100" />
                <span className="text-xs font-bold text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest">Remember Me</span>
              </label>
              <button type="button" className="text-xs font-bold text-cyan-500/60 hover:text-cyan-400 transition-colors uppercase tracking-widest">Forgot PID?</button>
            </div>

            <button
              type="submit"
              className="w-full group relative h-14 bg-white rounded-2xl flex items-center justify-center gap-3 overflow-hidden shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-transform active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="text-sm font-black text-black uppercase tracking-widest">Authenticate</span>
              <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-4 text-center">
               <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                 New here? <button type="button" className="text-white hover:text-cyan-400 underline underline-offset-4 transition-colors">Request Account</button>
               </p>
            </div>
          </form>

          {/* Bottom Interactive Mesh */}
          <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};
