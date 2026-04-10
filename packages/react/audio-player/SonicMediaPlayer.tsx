"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, VolumeX, Volume2 } from "lucide-react";

export interface SonicMediaPlayerProps {
  title?: string;
  artist?: string;
  coverImage?: string;
}

export const SonicMediaPlayer: React.FC<SonicMediaPlayerProps> = ({
  title = "Cyberflux Protocol",
  artist = "Vector Synth",
  coverImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // 0-100
  const [isMuted, setIsMuted] = useState(false);

  // Fake progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-sm rounded-[2.5rem] bg-zinc-950/80 backdrop-blur-3xl border border-zinc-800/50 p-6 shadow-2xl overflow-hidden group">
      {/* Background Cover Glow */}
      <div 
        className="absolute inset-0 opacity-20 blur-[50px] transition-transform duration-1000 group-hover:scale-150"
        style={{ backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Top Section: Cover & Meta */}
      <div className="relative z-10 flex gap-4 items-center mb-6">
        <motion.div 
          className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg relative"
          animate={{ scale: isPlaying ? 1.05 : 1, rotate: isPlaying ? [0, 2, -2, 0] : 0 }}
          transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" } }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          {/* Pulse overlay */}
          {isPlaying && (
            <motion.div 
              className="absolute inset-0 bg-white/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold truncate text-lg">{title}</h4>
          <p className="text-zinc-400 text-sm truncate">{artist}</p>
        </div>
      </div>

      {/* Sonic Waveform Progress */}
      <div className="relative z-10 w-full h-12 flex items-end justify-between gap-[2px] mb-6">
        {Array.from({ length: 40 }).map((_, i) => {
          // Calculate if this bar is active based on progress
          const barPercentage = (i / 40) * 100;
          const isActive = barPercentage <= progress;
          
          // Generate a pseudo-random height mapping like a waveform curve
          const baseHeight = 20 + Math.sin(i * 0.5) * 15 + Math.cos(i * 2) * 5;
          const activeHeightMultiplier = isPlaying && isActive ? 1.5 + Math.random() * 0.5 : 1;
          
          return (
            <motion.div
              key={i}
              className={`w-full rounded-t-full transition-colors duration-300 ${isActive ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-zinc-800'}`}
              animate={{ height: `${baseHeight * activeHeightMultiplier}%` }}
              transition={{ type: "tween", duration: 0.1 }}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <SkipBack size={24} fill="currentColor" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          
          <button className="text-zinc-400 hover:text-white transition-colors">
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </div>
  );
};
