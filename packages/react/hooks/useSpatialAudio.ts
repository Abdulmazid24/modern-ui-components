"use client";

import { useCallback, useRef } from "react";

interface SpatialAudioOptions {
  enabled?: boolean;
  volume?: number;
  url?: string;
}

/**
 * A futuristic spatial audio hook for UI micro-interactions.
 * Supports custom sound URLs and global mute state.
 */
export const useSpatialAudio = (options: SpatialAudioOptions = {}) => {
  const { 
    enabled = false, 
    volume = 0.2, 
    url = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" // Default futuristic click
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!enabled) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    }
    
    audioRef.current.volume = volume;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
       console.warn("Spatial Audio playback blocked by browser/policy:", err);
    });
  }, [enabled, volume, url]);

  return { play };
};
