"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export interface LaserScrollSpyProps {
  sections?: { id: string; title: string }[];
    className?: string;
}

export const LaserScrollSpy = React.forwardRef<any, LaserScrollSpyProps>(({ className, sections = [
            { id: "intro", title: "Introduction" },
            { id: "architecture", title: "Architecture" },
            { id: "deployment", title: "Deployment" },
            { id: "faqs", title: "FAQs" }
          ], ...props }, ref) => {
        const [activeSection, setActiveSection] = useState<string>("intro");
        const containerRef = useRef<HTMLDivElement>(null);

        // In a real usage, this would track scroll position of the window or a container.
        // For demonstration, we'll map a scroll listener onto the mock text container.
        const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const progress = target.scrollTop / (target.scrollHeight - target.clientHeight);

        // Simplistic mock mapping for visual demo
        const index = Math.min(
          Math.floor(progress * sections.length),
          sections.length - 1
        );
        setActiveSection(sections[index].id);
        };

        // Find index of active for moving the laser
        const activeIndex = sections.findIndex(s => s.id === activeSection);

        return (
        <div ref={ref} {...props} className={cn("flex w-full max-w-3xl gap-8 rounded-3xl bg-zinc-950 p-6 border border-zinc-900 shadow-2xl h-[400px]", className)}>
          
          {/* Mock Content Scroll Area */}
          <div 
            className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-800"
            onScroll={handleScroll}
          >
            <div className="h-[200%] flex flex-col justify-between py-10">
              <p className="text-zinc-500 font-mono text-sm leading-8">
                // Scroll down this area to see the laser spy move. <br/><br/>
                This is mock content representing a long article. In a real integration, the scroll spy hooks into IntersectionObserver to precisely track which heading is currently intersecting the viewport middle bounds.<br/><br/>
                Keep scrolling...  <br/><br/>
                <span className="text-zinc-600 block mt-40">Section 2 content...</span>
                <span className="text-zinc-600 block mt-40">Section 3 content...</span>
                <span className="text-zinc-600 block mt-40">Section 4 content...</span>
              </p>
            </div>
          </div>

          {/* Laser Spy Sidebar */}
          <div className="relative w-48 shrink-0 flex flex-col py-10">
            
            {/* Track Line */}
            <div className="absolute left-0 top-10 bottom-10 w-[2px] bg-zinc-900 rounded-full" />

            {/* The Laser Dot targeting the active item */}
            <motion.div
              className="absolute left-[1px] w-1 h-8 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"
              initial={false}
              animate={{ 
                // Calculate Y position based on index (rough estimation for demo list spacing)
                top: `calc(2.5rem + ${activeIndex * 48}px)` // 48px is approx height per item gap
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />

            {/* Sections List */}
            <ul className="flex flex-col gap-6 relative z-10 w-full pl-6">
              {sections.map((section, idx) => {
                const isActive = section.id === activeSection;
                return (
                  <motion.li 
                    key={section.id}
                    className={`text-sm cursor-pointer transition-colors duration-300 font-medium ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    animate={{ x: isActive ? 5 : 0 }}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </motion.li>
                );
              })}
            </ul>
          </div>

        </div>
        );
        });
