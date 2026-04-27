"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { cn } from "../utils";

export interface KineticTestimonialProps {
  readonly quote: string;
  readonly highlight?: string; // specific word/phrase to highlight
  readonly author: {
    readonly name: string;
    readonly title: string;
    readonly avatar?: string;
    readonly companyLogo?: React.ReactNode;
  };
  readonly metrics?: Array<{ label: string; value: string }>;
  readonly rating?: number;
  readonly className?: string;
}

/** KineticTestimonial — Narrative-driven testimonial card with metric highlights, animated quote mark, and glassmorphic depth. */
export const KineticTestimonial = React.forwardRef<HTMLDivElement, KineticTestimonialProps>(
  ({ className, quote, highlight, author, metrics, rating = 5, ...props }, ref) => {
    // Basic highlight text replacement
    const renderQuote = () => {
      if (!highlight) return quote;
      const parts = quote.split(new RegExp(`(${highlight})`, 'gi'));
      return parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() 
          ? <span key={i} className="text-violet-400 font-medium relative inline-block">
              {part}
              <motion.span 
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-violet-400/50 origin-left" 
              />
            </span> 
          : part
      );
    };

    return (
      <div ref={ref} {...props} className={cn("relative p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-colors duration-500", className)}>
        {/* Hover Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated Background Quote Icon */}
        <Quote className="absolute -top-4 -right-4 w-32 h-32 text-zinc-900/50 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-1 mb-6 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-zinc-700" : ""} />
            ))}
          </div>

          <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed tracking-tight font-light mb-10">
            "{renderQuote()}"
          </p>

          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-10 pb-10 border-b border-zinc-800/50">
              {metrics.map((metric, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white tabular-nums">{metric.value}</div>
                  <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover border border-zinc-800" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-500">
                  {author.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-white font-semibold">{author.name}</div>
                <div className="text-sm text-zinc-500">{author.title}</div>
              </div>
            </div>
            {author.companyLogo && (
              <div className="shrink-0 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                {author.companyLogo}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
KineticTestimonial.displayName = "KineticTestimonial";
