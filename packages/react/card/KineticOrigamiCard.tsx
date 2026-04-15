"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Map, Navigation, ShieldAlert, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KineticOrigamiCardProps {
  title?: string;
    className?: string;
}

// Variants for the 3D unfolding sequencer
const containerVariants = {
  idle: {
    rotateX: 10,
    rotateY: -10,
    z: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  hover: {
    rotateX: 0,
    rotateY: 0,
    z: 50,
    transition: { type: "spring", stiffness: 150, damping: 15, staggerChildren: 0.1 },
  },
};

const topFlapVariants = {
  idle: { rotateX: -175, opacity: 0, originY: 1 },
  hover: { rotateX: 0, opacity: 1, originY: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

const leftFlapVariants = {
  idle: { rotateY: 175, opacity: 0, originX: 1 },
  hover: { rotateY: 0, opacity: 1, originX: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

const rightFlapVariants = {
  idle: { rotateY: -175, opacity: 0, originX: 0 },
  hover: { rotateY: 0, opacity: 1, originX: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

const bottomFlapVariants = {
  idle: { rotateX: 175, opacity: 0, originY: 0 },
  hover: { rotateX: 0, opacity: 1, originY: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

export const KineticOrigamiCard = React.forwardRef<any, KineticOrigamiCardProps>(({ className, title = "KINETIC DATA", ...props }, ref) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
        <div ref={ref} {...props} className={cn("flex items-center justify-center p-20 bg-zinc-950 min-h-[600px]", className)} style={{ perspective: 2000 }}>
          {/* The entire 3D object anchor */}
          <motion.div
            className="relative w-64 h-64"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={containerVariants}
            initial="idle"
            animate={isHovered ? "hover" : "idle"}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Deep Shadow behind the unfolded state */}
            <motion.div
              className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-xl pointer-events-none"
              animate={{
                scale: isHovered ? 2 : 1,
                opacity: isHovered ? 0.5 : 0.2,
                translateZ: -100,
              }}
            />

            {/* --- BASE SQUARE (Always visible, acts as the center anchor) --- */}
            <div 
              className="absolute inset-0 bg-black border border-zinc-800 rounded-xl shadow-2xl flex flex-col items-center justify-center z-20 group transition-colors hover:border-emerald-500/50"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Cpu size={48} className={`mb-4 transition-colors duration-500 ${isHovered ? 'text-emerald-400' : 'text-zinc-600'}`} />
              <h3 className="text-white font-black tracking-widest">{title}</h3>
              <p className="text-zinc-500 text-xs mt-2 font-mono">HOVER TO DEPLOY</p>
              
              {/* Base Panel Inner Grid Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* --- ORIGAMI FLAPS (Hidden folded behind/inside the base, unfolding outwards) --- */}
            
            {/* TOP FLAP */}
            <motion.div
              variants={topFlapVariants}
              className="absolute -top-full left-0 w-full h-full bg-zinc-900 border border-t-emerald-500/40 border-x-emerald-500/40 rounded-t-xl z-10 flex flex-col items-center justify-center p-4 backdrop-blur-md"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Content inside flap */}
              <motion.div style={{ translateZ: 20 }} className="flex flex-col items-center">
                 <ShieldAlert className="text-emerald-400 mb-2" size={24} />
                 <span className="text-white font-mono text-xs text-center border-b border-emerald-500/30 pb-2">SECURITY LAYER PROTOCOL ACTIVE</span>
                 <div className="w-full flex gap-1 mt-3">
                   {[1,2,3,4,5].map(i => <div key={i} className="flex-1 h-1.5 bg-emerald-500/80 rounded-full" />)}
                 </div>
              </motion.div>
            </motion.div>

            {/* BOTTOM FLAP */}
            <motion.div
              variants={bottomFlapVariants}
              className="absolute -bottom-full left-0 w-full h-full bg-zinc-900 border border-b-emerald-500/40 border-x-emerald-500/40 rounded-b-xl z-10 flex flex-col items-center justify-center p-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div style={{ translateZ: 20 }} className="flex flex-col items-center justify-center w-full h-full">
                <span className="text-zinc-400 font-mono text-[10px] mb-2">SYSTEM TELEMETRY</span>
                <div className="w-full h-16 border border-zinc-800 rounded bg-black relative overflow-hidden">
                   {/* Faux Waveform */}
                   <motion.div 
                     className="absolute bottom-0 w-full bg-emerald-500/40"
                     animate={{ height: isHovered ? ["20%", "80%", "40%", "90%", "30%"] : "20%" }}
                     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                   />
                   {/* Scanner line */}
                   <motion.div 
                     className="absolute top-0 bottom-0 w-1 bg-emerald-400 shadow-[0_0_10px_#34d399]"
                     animate={{ left: ["0%", "100%", "0%"] }}
                     transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                   />
                </div>
              </motion.div>
            </motion.div>

            {/* LEFT FLAP */}
            <motion.div
              variants={leftFlapVariants}
              className="absolute top-0 -left-full w-full h-full bg-zinc-900 border border-l-emerald-500/40 border-y-emerald-500/40 rounded-l-xl z-20 flex flex-col p-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div style={{ translateZ: 20 }} className="h-full flex flex-col justify-between">
                <div className="flex items-center gap-2">
                   <Navigation size={16} className="text-emerald-400" />
                   <span className="font-mono text-xs text-white">ORBITAL</span>
                </div>
                <ul className="text-zinc-400 font-mono text-[10px] space-y-3">
                  <li className="flex justify-between"><span>LAT</span> <span className="text-emerald-400">45.289</span></li>
                  <li className="flex justify-between"><span>LON</span> <span className="text-emerald-400">-12.871</span></li>
                  <li className="flex justify-between"><span>ALT</span> <span className="text-emerald-400">400km</span></li>
                  <li className="flex justify-between"><span>VEL</span> <span className="text-emerald-400">7.6km/s</span></li>
                </ul>
              </motion.div>
            </motion.div>

            {/* RIGHT FLAP */}
            <motion.div
              variants={rightFlapVariants}
              className="absolute top-0 -right-full w-full h-full bg-zinc-900 border border-r-emerald-500/40 border-y-emerald-500/40 rounded-r-xl z-20 flex items-center justify-center p-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div style={{ translateZ: 20 }} className="text-center">
                <Map className="text-emerald-400 mx-auto mb-3" size={32} />
                <button className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer">
                   Extract Data
                </button>
                <p className="text-zinc-600 font-mono text-[9px] mt-4">ENCRYPTED X-90</p>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
        );
        });
