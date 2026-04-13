"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { name: "Terminal", href: "#" },
  { name: "Nodes", href: "#" },
  { name: "Integrations", href: "#" },
  { name: "Darknet", href: "#" },
];

export function AbyssalGlowFooter({ className }: { className?: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className={cn("relative bg-black w-full overflow-hidden pt-20 pb-10", className)}>
      {/* 
        Sweeping Neon Line 
      */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-900 overflow-hidden">
        <motion.div
          animate={isInView ? { x: ["-100%", "200%"] } : {}}
          transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />
      </div>

      {/* Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at top, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at top, black, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        
        {/* Left Side: Brand */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 tracking-tighter">
              ABYSS.
            </h2>
            <p className="mt-4 text-neutral-500 font-mono text-sm max-w-sm">
              Initialize connection. Establish secure protocols. Welcome to the undercity.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Chromatic Links */}
        <div className="flex flex-col md:items-end space-y-4">
          {links.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ChromaticLink href={link.href} text={link.name} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 mt-20 flex justify-between items-center border-t border-white/5 pt-8 font-mono text-xs text-neutral-600">
        <p>SYSTEM v2.0.4</p>
        <p>ENCRYPTED // EST 2026</p>
      </div>
    </footer>
  );
}

function ChromaticLink({ href, text }: { href: string; text: string }) {
  return (
    <a 
      href={href}
      className="group relative inline-block font-mono text-xl font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
    >
      <span className="relative z-10">{text}</span>
      
      {/* Glitch overlays - visible only on hover */}
      <span className="absolute top-0 left-0 -translate-x-[2px] translate-y-[1px] text-red-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse z-0 mix-blend-screen pointer-events-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 translate-x-[2px] -translate-y-[1px] text-cyan-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse z-0 mix-blend-screen pointer-events-none">
        {text}
      </span>
      
      {/* Hover Line */}
      <span className="absolute -left-4 top-1/2 w-2 h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all" />
    </a>
  );
}
