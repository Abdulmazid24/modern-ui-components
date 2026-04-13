"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export const PrismBorder = React.forwardRef<any, any>(({ className, children, ...props }, ref) => {
        (
          <div className="relative p-[2px] rounded-2xl overflow-hidden">
            <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #ec4899, #f59e0b, #10b981, #7c3aed)", filter: "blur(4px)" }} />
            <div className="relative rounded-[14px] bg-zinc-900 p-6">
              {children || <div><h3 className="text-white font-bold text-lg mb-1">Gradient Border</h3><p className="text-zinc-400 text-sm">A rotating conic gradient creates this animated prismatic border effect.</p></div>}
            </div>
          </div>
        )
        });
