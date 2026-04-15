"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// ----------------------------------------------------
// BENTO CARD COMPONENT WITH 3D GLARE AND TILT
// ----------------------------------------------------
function BentoCard({
  children,
  className,
  tilt = true,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const localRef = useRef<HTMLDivElement>(null);
        const handleRef = (node: any) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset to center on leave
    if (localRef.current) {
        const rect = localRef.current.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
    }
  };

  // 3D Tilt calculation (max 5 degrees)
  const rotateX = useTransform(springY, [0, 500], [5, -5]);
  const rotateY = useTransform(springX, [0, 500], [-5, 5]);

  return (
    <motion.div
      ref={handleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative group overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 p-8",
        className
      )}
    >
      {/* Interactive Glare Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${springX}px ${springY}px,
              rgba(255,255,255,0.1),
              transparent 40%
            )
          `,
        }}
      />
      {/* Content wrapper with a slight Z-translation for depth */}
      <div style={{ transform: "translateZ(30px)" }} className="relative h-full z-10 w-full">
        {children}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// MAIN FOOTER COMPONENT
// ----------------------------------------------------
export function ArchitecturalBentoFooter({
  companyName = "ModernUI",
  tagline = "Engineering the future of interfaces.",
  socials = [
    { name: "Twitter", href: "#", icon: "𝕏" },
    { name: "GitHub", href: "#", icon: "⎇" },
    { name: "Discord", href: "#", icon: "👾" },
  ],
  links = [
    { name: "Home", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Showcase", href: "#" },
  ]
}: {
  companyName?: string;
  tagline?: string;
  socials?: any[];
  links?: any[];
}) {
  return (
    <footer className="w-full bg-black py-12 px-4 md:px-8 perspective-1000">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* BIG NEWSLETTER BENTO (Spans 2 cols on lg) */}
        <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between min-h-[300px]">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Build faster.</h2>
            <p className="text-neutral-400">
              Subscribe to get notified about new ultra-premium components. Zero spam.
            </p>
          </div>
          <div className="mt-8 relative max-w-md">
            <input 
              type="email" 
              placeholder="developer@future.com" 
              className="w-full bg-black/50 border border-white/10 rounded-full px-6 py-4 text-white outline-none focus:border-white/30 transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-full font-semibold hover:scale-95 transition-transform">
              Join
            </button>
          </div>
        </BentoCard>

        {/* SOCIALS BENTO */}
        <BentoCard className="flex flex-col justify-between min-h-[300px]">
          <h3 className="text-white font-semibold mb-6">Connect</h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {socials.map((s) => (
              <a 
                key={s.name} 
                href={s.href}
                className="flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-2xl text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </BentoCard>

        {/* SITE LINKS BENTO */}
        <BentoCard className="flex flex-col justify-between min-h-[300px]">
          <h3 className="text-white font-semibold mb-6">Directory</h3>
          <ul className="space-y-3 flex-1 flex flex-col justify-end">
            {links.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="h-[1px] w-0 bg-white group-hover:w-4 transition-all duration-300" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* BRAND BANNER BENTO (Spans full width at bottom) */}
        <BentoCard tilt={false} className="md:col-span-3 lg:col-span-4 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{companyName}</h1>
            <p className="text-neutral-500 text-sm mt-1">{tagline}</p>
          </div>
          <div className="text-xs text-neutral-600 font-mono">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED <br/>
            SYS.STATUS // OPERATIONAL
          </div>
        </BentoCard>

      </div>
    </footer>
  );
}
