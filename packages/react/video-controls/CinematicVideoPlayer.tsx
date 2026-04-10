"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react";

export interface CinematicVideoPlayerProps {
  src?: string;
  poster?: string;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  src = "https://www.w3schools.com/html/mov_bbb.mp4",
  poster = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div 
      className="relative w-full max-w-3xl aspect-video rounded-3xl overflow-hidden bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Ambient Glow behind the video */}
      <div 
        className="absolute inset-0 bg-cyan-500/20 blur-[100px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: isPlaying ? 0.5 : 0 }}
      />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        muted={isMuted}
        loop
        onClick={togglePlay}
      />

      {/* Controls Overlay */}
      <AnimatePresence>
        {(isHovered || !isPlaying) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          >
            {/* Big Center Play Button (if paused) */}
            {!isPlaying && (
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 hover:scale-110 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                onClick={togglePlay}
              >
                <Play size={32} className="text-white ml-2" />
              </div>
            )}

            {/* Bottom Bar */}
            <div className="p-6">
              
              {/* Progress Scrubber */}
              <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative overflow-hidden group/scrubber">
                 {/* Fill */}
                 <div 
                   className="absolute top-0 bottom-0 left-0 bg-cyan-500" 
                   style={{ width: `${progress}%` }} 
                 />
                 {/* Scrubber Knob (appears on hover) */}
                 <div 
                   className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] opacity-0 group-hover/scrubber:opacity-100 transition-opacity"
                   style={{ left: `calc(${progress}% - 6px)` }}
                 />
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between z-20 relative">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-colors">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-cyan-400 transition-colors">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <span className="text-white/70 text-xs font-mono">
                    {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-cyan-400 transition-colors">
                    <Settings size={20} />
                  </button>
                  <button className="text-white hover:text-cyan-400 transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
