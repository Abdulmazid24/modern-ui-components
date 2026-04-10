"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface TemporalTimelineProps {
  events: TimelineEvent[];
}

export const TemporalTimeline: React.FC<TemporalTimelineProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Apply a spring to the scroll progress so the laser beam feels smooth and fluid
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto py-20 px-8">
      
      {/* Background Track */}
      <div className="absolute top-0 bottom-0 left-[39px] md:left-1/2 w-[2px] bg-zinc-900 md:-translate-x-1/2 rounded-full" />
      
      {/* The Laser Beam (Fills up as you scroll) */}
      <motion.div 
        className="absolute top-0 left-[38px] md:left-1/2 w-[4px] bg-cyan-400 md:-translate-x-1/2 shadow-[0_0_20px_rgba(34,211,238,1)] rounded-full origin-top"
        style={{ scaleY: smoothProgress }}
      />

      {/* Timeline Events */}
      <div className="flex flex-col gap-24 relative z-10">
        {events.map((event, index) => {
          // Alternative layout for desktop
          const isEven = index % 2 === 0;
          
          return (
            <TimelineNode 
              key={event.id} 
              event={event} 
              isEven={isEven} 
              progress={smoothProgress}
              index={index}
              total={events.length}
            />
          );
        })}
      </div>
    </div>
  );
};

const TimelineNode = ({ 
  event, 
  isEven, 
  progress, 
  index, 
  total 
}: { 
  event: TimelineEvent, 
  isEven: boolean, 
  progress: any,
  index: number,
  total: number
}) => {
  // Determine at what scroll percentage this node should activate
  // Roughly distribute the nodes from 0 to 1
  const activationPoint = index / (total - 1);
  
  // If the laser beam has reached this node, light it up
  const isActive = useTransform(progress, (p: number) => p >= activationPoint - 0.05);
  
  // Scale animation for the dot when activated
  const dotScale = useTransform(isActive, (active) => active ? 1.5 : 1);
  const dotColor = useTransform(isActive, (active) => active ? "#22d3ee" : "#27272a");

  return (
    <div className={`flex flex-col md:flex-row items-center w-full gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Content Box */}
      <div className="w-full md:w-1/2 flex justify-start md:px-12">
        <motion.div 
          className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Internal Laser Glow when active */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 pointer-events-none"
            style={{ opacity: isActive as any }}
          />
          <span className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-700 text-xs font-bold text-zinc-300 rounded-full mb-4">
            {event.date}
          </span>
          <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{event.description}</p>
        </motion.div>
      </div>

      {/* Center Node (Chronal Ring) */}
      <div className="absolute left-[39px] md:static md:w-0 flex justify-center translate-x-[-50%] md:translate-x-0">
        <motion.div 
          className="relative w-6 h-6 rounded-full border-4 border-black z-20 flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: dotColor as any, scale: dotScale }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full border border-cyan-400"
            style={{ opacity: isActive as any }}
            animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Empty Spacer for alternating layout on desktop */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
};
