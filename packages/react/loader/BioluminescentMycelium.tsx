"use client";

import React, { useEffect, useRef } from "react";

export interface BioluminescentMyceliumProps {
  progress?: number; // 0 to 100
  color?: string;
}

export const BioluminescentMycelium: React.FC<BioluminescentMyceliumProps> = ({
  progress = 50, // if controlled
  color = "100, 255, 150", 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // We will simulate L-System branching
    interface Branch {
      x: number;
      y: number;
      angle: number;
      length: number;
      depth: number;
      progress: number;
      isActive: boolean;
      children: Branch[];
    }

    // Initialize root branches from center
    const maxDepth = 6;
    let roots: Branch[] = [];
    const numRoots = 12;

    for (let i = 0; i < numRoots; i++) {
       roots.push({
         x: width / 2,
         y: height / 2,
         angle: (Math.PI * 2 / numRoots) * i,
         length: Math.random() * 20 + 10,
         depth: 0,
         progress: 0,
         isActive: true,
         children: []
       });
    }

    const growBranch = (b: Branch) => {
       if (b.depth >= maxDepth) return;
       if (!b.isActive) return;

       // Growth rate based on depth
       b.progress += 0.05 / (b.depth + 1);

       if (b.progress >= 1 && b.children.length === 0) {
          // Branch finishes growing, spawn children
          b.isActive = false; // stop growing this segment
          
          if (b.depth < maxDepth - 1) {
             const numChildren = Math.random() > 0.5 ? 2 : 1;
             for(let i=0; i<numChildren; i++) {
                b.children.push({
                   x: b.x + Math.cos(b.angle) * b.length,
                   y: b.y + Math.sin(b.angle) * b.length,
                   angle: b.angle + (Math.random() - 0.5) * 1.5,
                   length: Math.random() * (20 - b.depth*2) + 5,
                   depth: b.depth + 1,
                   progress: 0,
                   isActive: true,
                   children: []
                });
             }
          }
       }

       // Grow children
       b.children.forEach(growBranch);
    };

    const drawBranch = (b: Branch) => {
       if (b.progress <= 0) return;
       
       const currentLength = b.length * Math.min(1, b.progress);
       const endX = b.x + Math.cos(b.angle) * currentLength;
       const endY = b.y + Math.sin(b.angle) * currentLength;

       // Thickness based on depth
       ctx.lineWidth = Math.max(0.5, (maxDepth - b.depth) * 0.5);
       ctx.strokeStyle = `rgba(${color}, ${1 - b.depth/maxDepth})`;
       
       // Glowing effect
       ctx.shadowBlur = b.depth === maxDepth - 1 ? 15 : 5;
       ctx.shadowColor = `rgb(${color})`;
       
       ctx.beginPath();
       ctx.moveTo(b.x, b.y);
       ctx.lineTo(endX, endY);
       ctx.stroke();
       
       // Draw endpoints (spores)
       if (b.depth === maxDepth - 1 && b.progress >= 1) {
          ctx.beginPath();
          ctx.arc(endX, endY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${color})`;
          ctx.fill();
       }

       b.children.forEach(drawBranch);
    };

    let animationFrame: number;
    let frameCount = 0;

    const animate = () => {
       // Organic fade out for trail effect
       ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
       ctx.fillRect(0, 0, width, height);

       // Slowly rotate the entire system
       ctx.save();
       ctx.translate(width/2, height/2);
       ctx.rotate(frameCount * 0.001);
       ctx.translate(-width/2, -height/2);

       roots.forEach(r => {
          growBranch(r);
          drawBranch(r);
       });

       ctx.restore();

       // Draw center glowing core
       const coreGlow = Math.sin(frameCount * 0.05) * 5 + 10;
       ctx.beginPath();
       ctx.arc(width/2, height/2, 5, 0, Math.PI*2);
       ctx.fillStyle = `rgb(${color})`;
       ctx.shadowBlur = coreGlow;
       ctx.shadowColor = `rgb(${color})`;
       ctx.fill();

       frameCount++;
       animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [color]);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-black min-h-[300px]">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="rounded-full"
        />
        <div className="absolute inset-x-0 -bottom-8 flex justify-center">
           <span className="font-mono text-xs tracking-widest uppercase opacity-70" style={{ color: `rgb(${color})` }}>
              Simulating Organic Matrix...
           </span>
        </div>
      </div>
    </div>
  );
};
