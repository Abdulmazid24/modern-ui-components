"use client";

import React, { useRef, useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "../utils";

interface AudioReactiveBgProps {
  color?: string;
  sensitivity?: number;
  className?: string;
}

/**
 * A cinematic background that reacts to audio. 
 * Hybrid Logic: Simulated pulse by default, Mic API on demand.
 */
export const AudioReactiveBg = ({
  color = "#8b5cf6",
  sensitivity = 1,
  className,
}: AudioReactiveBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  
  const [isMicActive, setIsMicActive] = useState(false);
  const [intensity, setIntensity] = useState(0);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);
      analyser.current.fftSize = 256;
      const bufferLength = analyser.current.frequencyBinCount;
      dataArray.current = new Uint8Array(bufferLength);
      setIsMicActive(true);
    } catch (err) {
      console.error("Mic access denied:", err);
    }
  };

  const stopMic = () => {
    if (audioContext.current) {
      audioContext.current.close();
      setIsMicActive(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frame = 0;

    const animate = () => {
      frame++;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Trail effect
      ctx.fillRect(0, 0, w, h);

      let currentVal = 0;
      if (isMicActive && analyser.current && dataArray.current) {
         analyser.current.getByteFrequencyData(dataArray.current);
         // Get average volume
         const sum = dataArray.current.reduce((a, b) => a + b, 0);
         currentVal = (sum / dataArray.current.length) * sensitivity;
      } else {
         // Simulated Sine Pulse
         currentVal = (Math.sin(frame * 0.05) + 1) * 20 * sensitivity;
      }

      setIntensity(currentVal);

      // Draw pulsating aura
      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, (100 + currentVal * 5));
      grad.addColorStop(0, color);
      grad.addColorStop(1, "transparent");
      
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      stopMic();
    };
  }, [isMicActive, color, sensitivity]);

  return (
    <div className={cn("fixed inset-0 overflow-hidden bg-black", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Mic Control UI */}
      <div className="absolute bottom-10 right-10 z-50">
        <button 
          onClick={() => isMicActive ? stopMic() : startMic()}
          className={cn(
            "p-4 rounded-full border transition-all duration-500 backdrop-blur-md",
            isMicActive 
              ? "bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
              : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-white"
          )}
        >
          {isMicActive ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
      </div>

      <div className="absolute top-10 left-10 pointer-events-none">
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            Audio Reactor: {isMicActive ? "Live" : "Simulated"}
         </p>
      </div>
    </div>
  );
};
