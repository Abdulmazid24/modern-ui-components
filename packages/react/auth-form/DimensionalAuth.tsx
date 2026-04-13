"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function DimensionalAuth({ className }: { className?: string }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={cn("relative w-full h-[800px] flex items-center justify-center bg-black overflow-hidden perspective-1000", className)}>
      
      {/* Background Starfield representing the 'Dimension' */}
      <Starfield active={!isLogin} />

      <motion.div
        animate={{ rotateY: isLogin ? 0 : 180 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        className="relative w-full max-w-md h-[550px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* LOGIN FACE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <AuthCard 
            title="Welcome Back" 
            subtitle="Enter your credentials to access the vault."
            btnText="Sign In"
            switchText="Need an account? Rotate dimension."
            onSwitch={() => setIsLogin(false)}
          />
        </div>

        {/* SIGNUP FACE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
           <AuthCard 
            title="Initialize Array" 
            subtitle="Create a new entity in the continuum."
            btnText="Sign Up"
            switchText="Already exist? Return."
            onSwitch={() => setIsLogin(true)}
            isSignUp
          />
        </div>
      </motion.div>
    </div>
  );
}

function AuthCard({ 
  title, subtitle, btnText, switchText, onSwitch, isSignUp 
}: { 
  title: string, subtitle: string, btnText: string, switchText: string, onSwitch: () => void, isSignUp?: boolean 
}) {
  return (
    <div className="w-full h-full bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
        <p className="text-neutral-400 mt-2 text-sm">{subtitle}</p>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {isSignUp && (
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase">Username</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 mt-1 text-white focus:border-blue-500 outline-none transition-colors" />
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Email Protocol</label>
            <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 mt-1 text-white focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Passkey</label>
            <input type="password" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 mt-1 text-white focus:border-blue-500 outline-none transition-colors" />
          </div>
          <button className="w-full bg-white text-black font-bold rounded-lg py-3 mt-6 hover:scale-[1.02] active:scale-[0.98] transition-transform">
            {btnText}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center pt-6 border-t border-white/10">
        <button 
          onClick={onSwitch}
          className="text-sm text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
        >
          {switchText}
        </button>
      </div>
    </div>
  );
}

// A highly performant Canvas Starfield that speeds up when the dimension shifts
function Starfield({ active }: { active: boolean }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * w,
    }));

    let animationId: number;

    const render = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      const speed = active ? 15 : 2; // Warp speed when active
      const centerX = w / 2;
      const centerY = h / 2;

      stars.forEach(star => {
        star.z -= speed;
        if (star.z <= 0) {
          star.x = Math.random() * w;
          star.y = Math.random() * h;
          star.z = w;
        }

        const k = 128.0 / star.z;
        const px = (star.x - centerX) * k + centerX;
        const py = (star.y - centerY) * k + centerY;
        const size = (1 - star.z / w) * 3;

        ctx.fillStyle = `rgba(255,255,255, ${1 - star.z / w})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
