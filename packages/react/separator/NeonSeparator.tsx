"use client";
import React from "react";
import { motion } from "framer-motion";

export const NeonSeparator: React.FC<{ label?: string; color?: string }> = ({ label, color = "#7c3aed" }) => (
  <div className="w-full flex items-center gap-4 py-2">
    <motion.div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, ${color})` }} initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }} />
    {label && <span className="text-xs font-semibold tracking-widest uppercase" style={{ color }}>{label}</span>}
    <motion.div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}, ${color}40, transparent)` }} initial={{ scaleX: 0, originX: 1 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }} />
  </div>
);
