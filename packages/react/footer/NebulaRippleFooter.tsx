"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Real-world SVG Icons for usefulness
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

interface LinkItem {
  name: string;
  href: string;
}

interface FooterProps {
  className?: string;
  companyName?: string;
  description?: string;
  links?: Record<string, LinkItem[]>;
}

export function NebulaRippleFooter({
  className,
  companyName = "ModernUI",
  description = "Empowering developers to build the impossible with intelligent, physics-based interfaces.",
  links = {
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "Components", href: "#" },
      { name: "Templates", href: "#" },
    ],
    Company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
    Legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  },
}: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the masking effect
  const maskX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const maskY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const maskSize = useSpring(0, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => maskSize.set(500)} // Size of the nebula reveal
      onMouseLeave={() => maskSize.set(0)}
      className={cn(
        "relative w-full overflow-hidden bg-neutral-950 text-neutral-300 font-sans border-t border-white/5",
        "pt-24 pb-12 px-8 md:px-16",
        className
      )}
    >
      {/* 
        THE NEBULA LAYER 
        This div sits at the absolute back but is only revealed via WebkitMaskImage 
      */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at center, rgba(139,92,246,0.8), rgba(236,72,153,0.6) 20%, rgba(59,130,246,0.3) 50%, transparent 80%)`,
          WebkitMaskImage: useTransform(
            [maskX, maskY, maskSize],
            ([x, y, s]: any) => `radial-gradient(${s}px circle at ${x}px ${y}px, black 10%, transparent 100%)`
          ),
          maskImage: useTransform(
            [maskX, maskY, maskSize],
            ([x, y, s]: any) => `radial-gradient(${s}px circle at ${x}px ${y}px, black 10%, transparent 100%)`
          ),
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-4xl tracking-tighter font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              {companyName}.
            </h2>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-white/50 cursor-pointer hover:text-white transition-colors duration-300 group pt-4">
              <span>Subscribe to Newsletter</span>
              <motion.div 
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight />
              </motion.div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(
            Array.isArray(links) 
              ? { "Quick Links": links.map((l: any) => ({ name: l.label || l.name || "Link", href: l.href || "#" })) }
              : links
          ).map(([title, items], idx) => (
            <div key={title} className="space-y-6">
              <h3 className="text-white font-semibold tracking-wide text-sm uppercase">
                {title}
              </h3>
              <ul className="space-y-4">
                {Array.isArray(items) && items.map((item: any) => (
                  <li key={item.name || item.label || Math.random()}>
                    <InteractiveLink name={item.name || item.label || "Link"} href={item.href || "#"} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-500 mt-4 md:mt-0">
            <span>Built with passion</span>
            <span className="text-rose-500 animate-pulse"><HeartIcon /></span>
            <span>somewhere on Earth.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// A micro-component for each link that exhibits magnetic tracking on hover
function InteractiveLink({ name, href }: { name: string; href: string }) {
  const localRef = useRef<HTMLAnchorElement>(null);
        const handleRef = (node: any) => {
          localRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    // Magnetic pull toward mouse center
    const xPos = e.clientX - (rect.left + rect.width / 2);
    const yPos = e.clientY - (rect.top + rect.height / 2);
    x.set(xPos * 0.2); // 20% pull strength
    y.set(yPos * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={handleRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block text-neutral-400 hover:text-white transition-colors duration-200 relative group"
    >
      {name}
      {/* Subtle underline that physics-slides in */}
      <motion.span
        className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-violet-500 to-fuchsia-500 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "circOut" }}
      />
    </motion.a>
  );
}
