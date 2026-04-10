"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const LaserProgressBar: React.FC<{ value?: number; label?: string }> = ({ value = 65, label = "Uploading..." }) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between mb-2"><span className="text-sm text-zinc-400 font-medium">{label}</span><span className="text-sm font-bold text-cyan-400">{value}%</span></div>
      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ background: "linear-gradient(90deg,#06b6d4,#7c3aed)", boxShadow: "0 0 15px rgba(6,182,212,0.5)" }} initial={{ width: "0%" }} animate={{ width: `${value}%` }} transition={{ duration: 1.5, ease: "easeOut" }} />
        <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ background: "linear-gradient(90deg,transparent 60%,rgba(255,255,255,0.3) 80%,transparent)", width: "100%", height: "100%" }} animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
      </div>
    </div>
  );
};
