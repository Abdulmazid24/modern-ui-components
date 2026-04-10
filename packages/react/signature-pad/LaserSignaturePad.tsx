"use client";

import React, { useRef, useState, useEffect } from "react";
import { PenTool, RotateCcw } from "lucide-react";

export interface LaserSignaturePadProps {
  onClear?: () => void;
}

export const LaserSignaturePad: React.FC<LaserSignaturePadProps> = ({ onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Set up canvas context properties
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);

    // Initial contextual laser styling
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#06b6d4"; // Cyan glow
    ctx.strokeStyle = "#ffffff"; // Core white
    // Base width varying slightly for pressure simulation if we wanted to
  }, []);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
       x: e.clientX - rect.left,
       y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPointerPos(e);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    e.currentTarget.setPointerCapture(e.pointerId); // Support continuing out of bounds
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Simulate varying pressure based on movement speed ideally, but simple fixed width for now
    ctx.lineWidth = e.pressure && e.pointerType !== "mouse" ? e.pressure * 5 : 3;

    const { x, y } = getPointerPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (onClear) onClear();
  };

  return (
    <div className="w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4 px-2">
         <div className="flex items-center gap-2 text-zinc-400">
           <PenTool size={18} />
           <span className="font-medium text-sm">Sign Document</span>
         </div>
         <button 
           onClick={handleClear}
           className="text-zinc-600 hover:text-zinc-300 transition-colors flex flex-center"
           title="Clear Signature"
         >
           <RotateCcw size={16} />
         </button>
      </div>

      <div className="relative w-full h-48 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-inner overflow-hidden cursor-crosshair">
         {/* Background Grid Pattern */}
         <div 
           className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }}
         />
         
         <canvas
           ref={canvasRef}
           onPointerDown={startDrawing}
           onPointerMove={draw}
           onPointerUp={stopDrawing}
           onPointerCancel={stopDrawing}
           className="w-full h-full touch-none relative z-10"
         />
         
         {/* Signature Line */}
         <div className="absolute bottom-6 left-8 right-8 h-[2px] bg-zinc-800 pointer-events-none" />
      </div>
    </div>
  );
};
