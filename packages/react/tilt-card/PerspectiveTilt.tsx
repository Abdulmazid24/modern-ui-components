"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils";

export const PerspectiveTilt = React.forwardRef<any, any>(({ className, children, ...props }, ref) => {
        const ref = useRef<HTMLDivElement>(null);
        const x = useMotionValue(0); const y = useMotionValue(0);
        const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
        const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
        const handleMove = (e: React.MouseEvent) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); };
        const handleLeave = () => { x.set(0); y.set(0); };
        return (
        <div ref={ref} {...props} className={cn(className)}  style={{ perspective: 800 }}>
          <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="w-72 h-40 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-white/10 p-6 cursor-default" whileHover={{ boxShadow: "0 20px 40px rgba(124,58,237,0.2), 0 0 30px rgba(6,182,212,0.1)" }}>
            {children || <><h3 className="text-white font-bold text-lg" style={{ transform: "translateZ(40px)" }}>3D Tilt Card</h3><p className="text-zinc-400 text-sm mt-2" style={{ transform: "translateZ(25px)" }}>Move your mouse to see the perspective effect.</p></>}
          </motion.div>
        </div>
        );
        });
