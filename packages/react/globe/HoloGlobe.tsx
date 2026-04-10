"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

export interface GlobeLocation {
  id: string;
  name: string;
  lat: number; // For faux-3d simulation, map lat/long roughly into spherical projection coordinates
  lng: number; 
}

export interface HoloGlobeProps {
  locations?: GlobeLocation[];
}

export const HoloGlobe: React.FC<HoloGlobeProps> = ({
  locations = [
    { id: "1", name: "Tokyo", lat: 35.6, lng: 139.6 },
    { id: "2", name: "London", lat: 51.5, lng: -0.1 },
    { id: "3", name: "New York", lat: 40.7, lng: -74.0 },
    { id: "4", name: "Sydney", lat: -33.8, lng: 151.2 }
  ]
}) => {
  const [activeLoc, setActiveLoc] = useState<GlobeLocation | null>(null);

  // We simulate a globe by moving a massive background grid over an infinitely scrolling div masked to a circle.
  return (
    <div className="relative w-full max-w-lg aspect-square bg-zinc-950 border border-zinc-900 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-8 overflow-hidden group">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 to-transparent pointer-events-none" />

      {/* The Sphere Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8),inset_-10px_-20px_40px_rgba(34,211,238,0.2)] bg-zinc-900 flex items-center justify-center border border-zinc-800">
        
        {/* The scrolling earth map map (using a repeating CSS pattern/grid to simulate longitudinal lines) */}
        <motion.div 
          className="absolute h-[200%] w-[400%] flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          style={{
             backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             // Add faux distortion at the edges via inset shadows
          }}
        >
          {/* Faux Equator */}
          <div className="absolute top-1/2 w-full h-[2px] bg-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        </motion.div>

        {/* Sphere 3D lighting over the animated map */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black via-transparent to-cyan-500/10 pointer-events-none" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,1)] pointer-events-none" />

        {/* Location Markers - Mapping lat/long onto a 2D circle with some arbitrary math for demonstration */}
        {locations.map((loc) => {
           // Extremely simplified projection for visual dummy
           // Longitude maps to X relative to a center point.
           // Latitude maps to Y.
           
           // Assuming globe is centered at (0,0) longitude/latitude for this fixed visual
           const xPercent = ((loc.lng + 180) / 360) * 100; 
           const yPercent = 50 - (loc.lat / 90) * 40; 

           return (
             <div 
               key={loc.id}
               className="absolute w-4 h-4 -ml-2 -mt-2 cursor-pointer group/pin z-20"
               style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
               onMouseEnter={() => setActiveLoc(loc)}
               onMouseLeave={() => setActiveLoc(null)}
             >
                <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-full h-full bg-cyan-400 rounded-full flex items-center justify-center border-2 border-zinc-900 shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>

                {/* Popover */}
                <AnimatePresence>
                  {activeLoc?.id === loc.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-900 border border-zinc-700 text-cyan-400 text-xs font-bold rounded-lg whitespace-nowrap shadow-xl"
                    >
                      {loc.name}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           );
        })}
      </div>

      {/* Orbiting Ring */}
      <div 
        className="absolute inset-2 border border-cyan-500/10 rounded-full pointer-events-none"
        style={{ transform: "rotateX(75deg) rotateY(-20deg)" }}
      >
        <motion.div 
           className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           style={{ originX: 0, originY: '160px' }} // Approx radius
        />
      </div>

    </div>
  );
};
