"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface LogoItem {
  readonly id: string;
  readonly name: string;
  readonly logo: React.ReactNode; // SVG or Img
}

export interface HolographicLogoCloudProps {
  readonly title?: string;
  readonly logos: readonly LogoItem[];
  readonly animated?: boolean;
  readonly className?: string;
}

/** HolographicLogoCloud — Premium partner logo display with optional marquee animation, glass depth, and desaturated hover states. */
export const HolographicLogoCloud = React.forwardRef<HTMLDivElement, HolographicLogoCloudProps>(
  ({ className, title = "Trusted by industry leaders", logos, animated = false, ...props }, ref) => {
    
    const LogoGrid = ({ list }: { list: readonly LogoItem[] }) => (
      <div className={cn("flex items-center justify-center flex-wrap gap-x-12 gap-y-10 lg:gap-x-20", animated && "flex-nowrap shrink-0 px-6 lg:px-10")}>
        {list.map((logo) => (
          <div 
            key={logo.id} 
            className="group relative flex items-center justify-center w-32 h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            title={logo.name}
          >
            {/* Holographic Hover Aura */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 w-full h-full flex items-center justify-center text-white">
              {logo.logo}
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <div ref={ref} {...props} className={cn("py-16 relative overflow-hidden", className)}>
        {title && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-10"
          >
            {title}
          </motion.p>
        )}

        {animated ? (
          <div className="relative flex overflow-hidden group">
            {/* Edge fade masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="flex w-max"
            >
              <LogoGrid list={[...logos, ...logos]} />
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-4"
          >
            <LogoGrid list={logos} />
          </motion.div>
        )}
      </div>
    );
  }
);
HolographicLogoCloud.displayName = "HolographicLogoCloud";
