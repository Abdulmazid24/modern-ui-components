"use client";
import React from "react";
import { motion } from "framer-motion";

export const HolographicForm: React.FC = () => {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/60 border border-white/8 backdrop-blur-xl" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <h2 className="text-xl font-bold text-white mb-6">Create Account</h2>
      <div className="space-y-4">
        <div><label className="text-xs text-zinc-500 font-semibold tracking-wider uppercase mb-1.5 block">Full Name</label><input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white text-sm outline-none placeholder:text-zinc-600 focus:border-violet-500/50 focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all" /></div>
        <div><label className="text-xs text-zinc-500 font-semibold tracking-wider uppercase mb-1.5 block">Email</label><input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white text-sm outline-none placeholder:text-zinc-600 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all" /></div>
        <div><label className="text-xs text-zinc-500 font-semibold tracking-wider uppercase mb-1.5 block">Password</label><input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white text-sm outline-none placeholder:text-zinc-600 focus:border-pink-500/50 focus:shadow-[0_0_15px_rgba(236,72,153,0.1)] transition-all" /></div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold cursor-pointer" style={{ boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}>Create Account</motion.button>
      <p className="text-center text-xs text-zinc-600 mt-4">Already have an account? <span className="text-violet-400 cursor-pointer">Sign in</span></p>
    </div>
  );
};
