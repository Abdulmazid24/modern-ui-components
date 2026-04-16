"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../utils";

interface ScratchToRevealProps {
  children: React.ReactNode; // The hidden content
  width?: number;
  height?: number;
  brushSize?: number;
  overlayColor?: string;
  minReveal?: number; // percentage to trigger onComplete
  onComplete?: () => void;
  className?: string;
}

/**
 * An interactive canvas-based scratching effect. 
 * Users scratch away an overlay to reveal hidden content underneath.
 */
export const ScratchToReveal = ({
  children,
  width = 300,
  height = 200,
  brushSize = 30,
  overlayColor = "#333",
  minReveal = 40,
  onComplete,
  className,
}: ScratchToRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize overlay
    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add some noise/texture to look more like a scratch card
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 500; i++) {
       ctx.fillStyle = "#000";
       ctx.beginPath();
       ctx.arc(Math.random() * width, Math.random() * height, 1, 0, Math.PI * 2);
       ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, [width, height, overlayColor]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || isDone) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || isDone) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (width * height)) * 100;
    if (percentage > minReveal) {
      setIsDone(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <div 
      className={cn("relative overflow-hidden cursor-crosshair", className)}
      style={{ width, height }}
    >
      {/* Hidden Content */}
      <div className="absolute inset-0 z-0 select-none">
        {children}
      </div>

      {/* Scratachable Canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn(
          "absolute inset-0 z-10 transition-opacity duration-500",
          isDone ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={(e) => scratch(e.clientX, e.clientY)}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={(e) => scratch(e.touches[0].clientX, e.touches[0].clientY)}
      />
    </div>
  );
};
