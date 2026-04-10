"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertOctagon, RefreshCw } from "lucide-react";
export const GlitchErrorBoundary: React.FC<{ error?: string }> = ({ error = "Something went wrong" }) => (
  <div className="w-full max-w-md mx-auto flex flex-col items-center py-16 px-6 text-center">
    <motion.div animate={{ x: [0, -2, 2, -1, 1, 0] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }} className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mb-6">
      <AlertOctagon size={28} className="text-red-400" />
    </motion.div>
    <h3 className="text-white text-lg font-bold mb-2">{error}</h3>
    <p className="text-zinc-500 text-sm mb-6">An unexpected error occurred. Please try again.</p>
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.reload()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600/80 text-white text-sm font-semibold cursor-pointer">
      <RefreshCw size={14} /> Retry
    </motion.button>
  </div>
);
