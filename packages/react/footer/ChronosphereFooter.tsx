"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const ORBIT_LINKS = [
  { name: "About", angle: -45, radius: 140 },
  { name: "Twitter", angle: -15, radius: 180 },
  { name: "GitHub", angle: 15, radius: 180 },
  { name: "Privacy", angle: 45, radius: 140 },
  { name: "Terms", angle: -75, radius: 220 },
  { name: "Discord", angle: 75, radius: 220 },
];

export function ChronosphereFooter({ className }: { className?: string }) {
  const ref = React.useRef(null);
  
  // Use scroll to drive the rotation of the outer rings
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [-90, 0]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <footer ref={ref} className={cn("relative w-full h-[600px] bg-neutral-950 flex items-center justify-center overflow-hidden", className)}>
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />

      {/* Center Brand */}
      <motion.div 
        style={{ scale }}
        className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="w-24 h-24 rounded-full bg-black border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center p-2 mb-4">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <h2 className="text-white font-mono font-bold tracking-widest text-xl">CHRONOS</h2>
        <p className="text-neutral-500 text-xs mt-2 uppercase tracking-widest">End of transmission</p>
      </motion.div>

      {/* Orbit Rings driven by scroll */}
      <motion.div style={{ rotate: rotate1 }} className="absolute w-[300px] h-[300px] rounded-full border border-white/5 border-dashed pointer-events-none" />
      <motion.div style={{ rotate: rotate2 }} className="absolute w-[450px] h-[450px] rounded-full border border-white/10 pointer-events-none" />
      
      {/* Orbiting Links */}
      <div className="absolute w-full h-full flex items-center justify-center">
        {ORBIT_LINKS.map((link, idx) => {
          // Convert angle to radians
          const rad = (link.angle * Math.PI) / 180;
          const x = Math.sin(rad) * link.radius;
          const y = -Math.cos(rad) * link.radius; // negative because Y is down in screen coords

          return (
            <motion.a
              key={link.name}
              href="#"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.1, color: "#fff" }}
              style={{ x, y }}
              className="absolute text-neutral-400 font-mono text-xs uppercase tracking-wider backdrop-blur-md bg-black/50 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              {link.name}
            </motion.a>
          );
        })}
      </div>

      {/* Base copyright */}
      <div className="absolute bottom-8 text-neutral-600 text-xs font-mono">
        © 2026. SECURE ORBIT.
      </div>
    </footer>
  );
}
