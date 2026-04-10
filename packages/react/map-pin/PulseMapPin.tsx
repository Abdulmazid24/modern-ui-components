"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
export const PulseMapPin: React.FC<{ label?: string; color?: string }> = ({ label = "New York", color = "#7c3aed" }) => (
  <div className="relative inline-flex flex-col items-center">
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
      <MapPin size={36} fill={color} stroke={color} className="drop-shadow-lg" />
    </motion.div>
    <motion.div className="w-6 h-2 rounded-full mt-[-2px]" style={{ background: color, filter: "blur(4px)", opacity: 0.4 }} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.2, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
    {label && <span className="mt-2 px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white font-semibold">{label}</span>}
    {/* Pulse rings */}
    {[0, 1, 2].map(i => <motion.div key={i} className="absolute top-3 w-8 h-8 rounded-full border pointer-events-none" style={{ borderColor: color }} animate={{ scale: [1, 3], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }} />)}
  </div>
);
