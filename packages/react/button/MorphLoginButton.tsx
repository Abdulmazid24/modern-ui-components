"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/utils";

export interface MorphLoginButtonProps {
  onLogin?: (username: string, password: string) => void;
    className?: string;
}

export const MorphLoginButton = React.forwardRef<any, MorphLoginButtonProps>(({ className, onLogin, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [isHovered, setIsHovered] = useState(false);

        const handleLogin = () => {
        if (onLogin) onLogin(username, password);
        };

        return (
        <div ref={ref} {...props} className={cn("relative flex items-center justify-center w-full min-h-[500px]", className)}>

          {/* Background Ambient Glow — pulses when form is open */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            animate={{
              background: isOpen
                ? "radial-gradient(circle, rgba(30,68,209,0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(25,187,209,0.08) 0%, transparent 70%)",
              scale: isOpen ? 1.5 : 1,
            }}
            transition={{ duration: 0.8 }}
          />

          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* ===================== THE MORPH BUTTON ===================== */
              <motion.button
                key="morph-btn"
                layoutId="morph-container"
                onClick={() => setIsOpen(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative overflow-hidden cursor-pointer outline-none border-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  width: 180,
                  height: 60,
                  borderRadius: 40,
                  background: "linear-gradient(45deg, #1e44d1, #19bbd1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: isHovered
                    ? "0 0 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(30, 68, 209, 0.3)"
                    : "0 0 20px rgba(0, 255, 255, 0.4)",
                  transition: "box-shadow 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                }}
              >
                {/* Shimmer sweep effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    ],
                    x: [-200, 200],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  style={{ width: "200%", height: "100%" }}
                />

                <span className="relative z-10 text-white font-bold text-base tracking-wider select-none">
                  Login
                </span>
              </motion.button>
            ) : (
              /* ===================== THE LOGIN FORM ===================== */
              <motion.div
                key="morph-form"
                layoutId="morph-container"
                className="relative overflow-hidden flex flex-col"
                initial={{ borderRadius: 40 }}
                animate={{ borderRadius: 24 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  width: 380,
                  background: "linear-gradient(160deg, #1a2980 0%, #0f1b3d 40%, #0a0e1a 100%)",
                  boxShadow:
                    "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(30, 68, 209, 0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    setIsOpen(false);
                    setUsername("");
                    setPassword("");
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all z-20 cursor-pointer"
                >
                  <X size={16} />
                </motion.button>

                {/* Form Content */}
                <div className="px-10 pt-10 pb-8">
                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="text-white text-2xl font-bold mb-8 text-center tracking-wide"
                  >
                    Welcome
                  </motion.h2>

                  {/* Username Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="mb-5"
                  >
                    <label className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-2 block">
                      Username
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                      />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#0d1528] border border-white/10 focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:shadow-[0_0_15px_rgba(25,187,209,0.15)]"
                        placeholder="Enter username"
                      />
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="mb-8"
                  >
                    <label className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#0d1528] border border-white/10 focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:shadow-[0_0_15px_rgba(25,187,209,0.15)]"
                        placeholder="Enter password"
                      />
                    </div>
                  </motion.div>

                  {/* Login Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    onClick={handleLogin}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-white text-[#1a2980] font-bold text-sm tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all hover:bg-white/90"
                  >
                    Login
                    <ArrowRight size={16} />
                  </motion.button>
                </div>

                {/* Bottom Gradient Accent Line */}
                <div className="h-1 w-full bg-gradient-to-r from-[#1e44d1] via-[#19bbd1] to-[#1e44d1]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        );
        });
