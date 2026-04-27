"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";
import { KineticTestimonial, KineticTestimonialProps } from "../testimonial";

export interface NebulaMarqueeTestimonialsProps {
  readonly testimonials: readonly KineticTestimonialProps[];
  readonly speed?: number; // seconds per full rotation
  readonly pauseOnHover?: boolean;
  readonly className?: string;
}

/** NebulaMarqueeTestimonials — Infinite scrolling marquee of premium testimonial cards with edge masking. */
export const NebulaMarqueeTestimonials = React.forwardRef<HTMLDivElement, NebulaMarqueeTestimonialsProps>(
  ({ className, testimonials, speed = 40, pauseOnHover = true, ...props }, ref) => {
    // Duplicate for seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
      <div ref={ref} {...props} className={cn("relative overflow-hidden py-10", className)}>
        {/* Edge Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: speed, ease: "linear", repeat: Infinity }}
          className={cn("flex gap-6 w-max items-center", pauseOnHover && "hover:[animation-play-state:paused]")}
          style={{ "--tw-translate-x": "0%" } as any} // Ensure initial state for motion
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <div key={`${testimonial.author.name}-${i}`} className="w-[400px] shrink-0">
              <KineticTestimonial {...testimonial} className="bg-zinc-900/50" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  }
);
NebulaMarqueeTestimonials.displayName = "NebulaMarqueeTestimonials";
