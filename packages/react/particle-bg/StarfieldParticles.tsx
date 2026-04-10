"use client";
import React, { useRef, useEffect } from "react";
export const StarfieldParticles: React.FC<{ count?: number }> = ({ count = 120 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.scale(2, 2); };
    resize(); window.addEventListener("resize", resize);
    const stars = Array.from({ length: count }, () => ({ x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight, r: Math.random() * 1.5 + 0.5, speed: Math.random() * 0.5 + 0.1, opacity: Math.random() }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      stars.forEach((s) => {
        s.y -= s.speed; s.opacity += (Math.random() - 0.5) * 0.05; s.opacity = Math.max(0.1, Math.min(1, s.opacity));
        if (s.y < 0) { s.y = canvas.offsetHeight; s.x = Math.random() * canvas.offsetWidth; }
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count]);
  return <canvas ref={canvasRef} className="w-full h-64 rounded-2xl bg-zinc-950 border border-white/5" />;
};
