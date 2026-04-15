"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlueprintRoom {
  id: string;
  name: string;
  points: string;
    className?: string;
}

export interface BlueprintMapperProps {
  rooms?: BlueprintRoom[];
    className?: string;
}

export const BlueprintMapper = React.forwardRef<any, BlueprintMapperProps>(({ className, rooms = [
            { id: "server-room", name: "Server Core", points: "50,50 200,50 200,150 50,150" },
            { id: "lab-1", name: "R&D Lab 1", points: "200,50 350,50 350,100 200,100" },
            { id: "lab-2", name: "R&D Lab 2", points: "200,100 350,100 350,150 200,150" },
            { id: "conference", name: "Holo Conference", points: "50,150 200,150 200,300 50,300" },
            { id: "cafeteria", name: "Mess Hall", points: "200,150 350,150 350,300 200,300" },
            { id: "engineering", name: "Engineering Deck", points: "350,50 500,50 500,300 350,300" }
          ], ...props }, ref) => {
        const [activeRoom, setActiveRoom] = useState<string | null>(null);
        const [zoom, setZoom] = useState(1);

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-4xl h-[500px] bg-[#0a192f] border border-cyan-900/50 rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden font-mono", className)}>
          
          {/* Top Header */}
          <div className="flex items-center justify-between mb-4 z-10 relative">
            <div className="flex items-center gap-2 text-cyan-400">
               <Map size={20} />
               <span className="font-bold tracking-widest uppercase text-sm">Sector 7 Blueprint</span>
            </div>
            
            {/* Controls */}
            <div className="flex gap-2 bg-[#020c1b] border border-cyan-900/50 rounded-lg p-1">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="p-1.5 text-cyan-600 hover:text-cyan-400 hover:bg-cyan-900/30 rounded-md transition-colors"><ZoomOut size={16} /></button>
              <button onClick={() => setZoom(1)} className="p-1.5 text-cyan-600 hover:text-cyan-400 hover:bg-cyan-900/30 rounded-md transition-colors"><Maximize size={16} /></button>
              <button onClick={() => setZoom(z => Math.min(2, z + 0.2))} className="p-1.5 text-cyan-600 hover:text-cyan-400 hover:bg-cyan-900/30 rounded-md transition-colors"><ZoomIn size={16} /></button>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 border border-cyan-900/30 rounded-xl overflow-hidden relative bg-[#061121] cursor-grab active:cursor-grabbing">
             
             {/* Grid Background */}
             <div 
               className="absolute inset-0 pointer-events-none opacity-20"
               style={{
                 backgroundImage: 'linear-gradient(to right, #64ffda 1px, transparent 1px), linear-gradient(to bottom, #64ffda 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }}
             />

             {/* Draggable Map Area */}
             <motion.div 
               className="w-full h-full flex items-center justify-center origin-center"
               drag
               dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
               animate={{ scale: zoom }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
             >
                <svg width="550" height="350" viewBox="0 0 550 350" className="drop-shadow-[0_0_15px_rgba(100,255,218,0.2)]">
                   <defs>
                     <pattern id="hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                       <line x1="0" y1="0" x2="0" y2="10" stroke="#64ffda" strokeWidth="1" strokeOpacity="0.2" />
                     </pattern>
                   </defs>
                   
                   {/* Outer Shell */}
                   <rect x="50" y="50" width="450" height="250" fill="transparent" stroke="#64ffda" strokeWidth="4" />

                   {/* Rooms */}
                   {rooms.map(room => {
                     const isActive = activeRoom === room.id;
                     return (
                       <motion.g 
                         key={room.id}
                         onMouseEnter={() => setActiveRoom(room.id)}
                         onMouseLeave={() => setActiveRoom(null)}
                         className="cursor-pointer"
                       >
                         <motion.polygon 
                           points={room.points} 
                           fill={isActive ? 'url(#hatch)' : 'rgba(10, 25, 47, 0.5)'}
                           stroke="#64ffda" 
                           strokeWidth="2"
                           animate={{ 
                             fillOpacity: isActive ? 1 : 0.5,
                           }}
                           transition={{ duration: 0.2 }}
                         />
                         
                         {/* Bounding Box Center Approximation for Text */}
                         {/* Simplified math: we hardcoded friendly rect paths for preview */}
                         {isActive && (
                           <text 
                             x={room.points.split(' ')[0].split(',')[0]} 
                             y={room.points.split(' ')[0].split(',')[1]}
                             dx="10"
                             dy="20"
                             fill="#64ffda" 
                             fontSize="12" 
                             fontWeight="bold"
                             className="pointer-events-none drop-shadow-[0_0_5px_rgba(100,255,218,1)]"
                           >
                             {room.name}
                           </text>
                         )}
                       </motion.g>
                     )
                   })}
                </svg>
             </motion.div>
          </div>

        </div>
        );
        });
