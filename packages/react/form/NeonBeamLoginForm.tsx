"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, ArrowRight, Activity, Heart } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface NeonBeamLoginFormProps {
  onSubmit?: (data: any) => void;
  className?: string;
}

/**
 * A "God-Tier" Kinetic Neon Login Form (#262).
 * Features:
 * - Rotating Neon Beam: A high-precision light beam that orbits the card margin.
 * - Holographic HUD Grid: Detailed internal grid pattern for a military-grade aesthetic.
 * - Reactive Input Auras: Inputs that glow and breathe when focused.
 * - Power-Up Ignition: The beam completes a high-speed "Ignition" lap on mount.
 */
export const NeonBeamLoginForm = ({
  onSubmit,
  className,
}: NeonBeamLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const { play: playFocus } = useSpatialAudio({
    enabled: true,
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Tech chime
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <div className={cn("relative flex items-center justify-center p-8", className)}>
      {/* The Rotating Neon Beam Wrapper */}
      <div className="absolute inset-0 z-0">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="absolute inset-[-2px] rounded-[2.5rem] bg-[conic-gradient(from_0deg,transparent_0%,#22d3ee_20%,transparent_40%)]"
        />
        {/* Shadow glow that follows the beam */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="absolute inset-[-10px] rounded-[2.5rem] bg-[conic-gradient(from_0deg,transparent_0%,rgba(34,211,238,0.2)_20%,transparent_40%)] blur-xl"
        />
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-sm bg-zinc-950/90 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
        
        {/* Holographic Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="relative z-10 p-10 space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Activity size={18} className="text-cyan-400 animate-pulse" />
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/50">Terminal Login</h2>
             </div>
             <Heart size={14} className="text-rose-500 fill-rose-500" />
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <div className="relative group">
                <User size={16} className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                  isFocused === "email" ? "text-cyan-400" : "text-zinc-600"
                )} />
                <input
                  type="email"
                  placeholder="USERNAME"
                  value={email}
                  onFocus={() => { setIsFocused("email"); playFocus(); }}
                  onBlur={() => setIsFocused(null)}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest text-white uppercase outline-none transition-all duration-300 placeholder:text-zinc-700",
                    isFocused === "email" && "border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)] bg-zinc-900"
                  )}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative group">
                <Lock size={16} className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                  isFocused === "password" ? "text-cyan-400" : "text-zinc-600"
                )} />
                <input
                  type="password"
                  placeholder="PASSCODE"
                  value={password}
                  onFocus={() => { setIsFocused("password"); playFocus(); }}
                  onBlur={() => setIsFocused(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest text-white uppercase outline-none transition-all duration-300 placeholder:text-zinc-700",
                    isFocused === "password" && "border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)] bg-zinc-900"
                  )}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full relative group h-14 rounded-2xl bg-cyan-500 shadow-[0_10px_30px_rgba(34,211,238,0.3)] overflow-hidden transition-transform active:scale-95"
          >
             {/* Button Glint */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
             
             <div className="relative flex items-center justify-center gap-2 text-zinc-950 font-black uppercase text-xs tracking-widest">
                <span>Authorize Access</span>
                <ArrowRight size={16} />
             </div>
          </button>

          <div className="flex items-center justify-between px-2 pt-2">
            <button type="button" className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Forgot PID?</button>
            <button type="button" className="text-[10px] font-black text-cyan-400 hover:brightness-125 transition-all uppercase tracking-widest">Request Credentials</button>
          </div>
        </form>

        {/* Bottom Shimmer Bar */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-cyan-500 opacity-20" />
      </div>
    </div>
  );
};
