"use client";

import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HudLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HudLoginForm = forwardRef<HTMLDivElement, HudLoginFormProps>(
  ({ className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    // Number of dashes in the outer circular HUD ring
    const dashes = Array.from({ length: 48 });

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center min-h-[500px] w-full max-w-lg mx-auto overflow-hidden",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Outer Rotating HUD Ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {dashes.map((_, i) => {
            const rotation = i * (360 / dashes.length);
            // We highlight a quadrant of the circle (e.g., the right side) to create the sweep look
            const isHighlighted = i > 35 || i < 10;
            return (
              <div
                key={i}
                className="absolute w-2 flex justify-end"
                style={{
                  height: "380px", // diameter of the HUD ring
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div
                  className={cn(
                    "w-full h-4 rounded-full transition-colors duration-500",
                    isHighlighted
                      ? "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                      : "bg-white/10"
                  )}
                />
              </div>
            );
          })}
        </motion.div>

        {/* Counter-rotating inner faint ring for depth */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
           <div className="w-[320px] h-[320px] rounded-full border border-dashed border-white/5" />
        </motion.div>

        {/* The Login Form Card */}
        <motion.div
          className="relative z-10 w-[300px] bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Subtle top glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-10 bg-cyan-500/20 blur-2xl" />

          <h2 className="text-2xl font-bold text-white text-center mb-8">Login</h2>

          <form className="space-y-5">
            <div className="space-y-1">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div className="space-y-1">
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div className="flex justify-end pt-1">
              <a href="#" className="text-[11px] text-zinc-400 hover:text-cyan-400 transition-colors">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-95"
            >
              Login
            </button>

            <p className="text-center text-xs text-zinc-400 pt-4">
              Don't have an account?{" "}
              <a href="#" className="text-white hover:text-cyan-400 font-semibold transition-colors">
                Signup
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    );
  }
);

HudLoginForm.displayName = "HudLoginForm";
