"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export interface GlassLoginFormProps {
  backgroundUrl?: string;
  onLogin?: (username: string, password: string) => void;
  onRegister?: () => void;
}

export const GlassLoginForm: React.FC<GlassLoginFormProps> = ({
  backgroundUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
  onLogin,
  onRegister,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(username, password);
  };

  return (
    <div
      className="relative w-full max-w-4xl h-[500px] rounded-3xl overflow-hidden mx-auto"
      style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />

      {/* Ambient overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Floating glass login card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm"
      >
        <form
          onSubmit={handleSubmit}
          className="relative p-8 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 45px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          {/* Title */}
          <h1 className="text-center text-2xl font-bold text-white mb-8 tracking-wide">
            Login
          </h1>

          {/* Username Field */}
          <div className="relative mb-5">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: `1px solid ${focused === "user" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}`,
                boxShadow: focused === "user" ? "0 0 15px rgba(255,255,255,0.1)" : "none",
              }}
            >
              <User size={16} className="text-white/50 flex-shrink-0" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocused("user")}
                onBlur={() => setFocused(null)}
                placeholder=" "
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-transparent peer"
                id="glass-username"
                required
              />
              <label
                htmlFor="glass-username"
                className="absolute left-12 text-sm text-white/40 transition-all duration-200 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-white/70 peer-valid:-translate-y-6 peer-valid:text-[10px] peer-valid:text-white/70"
              >
                Username
              </label>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative mb-4">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: `1px solid ${focused === "pass" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}`,
                boxShadow: focused === "pass" ? "0 0 15px rgba(255,255,255,0.1)" : "none",
              }}
            >
              <Lock size={16} className="text-white/50 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                placeholder=" "
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-transparent peer"
                id="glass-password"
                required
              />
              <label
                htmlFor="glass-password"
                className="absolute left-12 text-sm text-white/40 transition-all duration-200 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-white/70 peer-valid:-translate-y-6 peer-valid:text-[10px] peer-valid:text-white/70"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-white/70"
              />
              <span className="text-xs text-white/50">Remember me</span>
            </label>
            <button type="button" className="text-xs text-white/50 hover:text-white/90 transition-colors cursor-pointer">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl text-sm font-bold text-white cursor-pointer transition-all"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(4px)",
            }}
          >
            Login
          </motion.button>

          {/* Register Link */}
          <p className="text-center text-xs text-white/40 mt-5">
            Don&#39;t have an account?{" "}
            <button
              type="button"
              onClick={onRegister}
              className="text-white/80 font-semibold hover:text-white cursor-pointer underline underline-offset-2"
            >
              Register
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
