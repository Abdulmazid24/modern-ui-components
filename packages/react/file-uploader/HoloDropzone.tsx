"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HoloDropzoneProps {
  onFileDrop?: (files: FileList) => void;
    className?: string;
}

export const HoloDropzone = React.forwardRef<any, HoloDropzoneProps>(({ className, onFileDrop, ...props }, ref) => {
        const [isDragActive, setIsDragActive] = useState(false);
        const [droppedFiles, setDroppedFiles] = useState<string[]>([]);

        const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        };

        const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          if (onFileDrop) onFileDrop(e.dataTransfer.files);
          const fileNames = Array.from(e.dataTransfer.files).map(f => f.name);
          setDroppedFiles(prev => [...prev, ...fileNames]);
        }
        };

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-xl h-[400px] border border-zinc-900 rounded-[2.5rem] bg-zinc-950 p-6 flex flex-col items-center justify-center overflow-hidden", className)}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Background Holographic Grid */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
            }}
          />

          {/* The Magnetic Border */}
          <motion.div 
            className={`absolute inset-4 rounded-[2rem] border-2 border-dashed pointer-events-none transition-colors duration-300 ${isDragActive ? 'border-cyan-400 bg-cyan-400/5' : 'border-zinc-800'}`}
            animate={{ scale: isDragActive ? 1.02 : 1 }}
          />

          {/* The Scanning Laser Line */}
          <AnimatePresence>
            {isDragActive && (
              <motion.div 
                initial={{ opacity: 0, top: "0%" }}
                animate={{ opacity: 1, top: ["0%", "100%", "0%"] }}
                exit={{ opacity: 0 }}
                transition={{ top: { duration: 2, ease: "linear", repeat: Infinity } }}
                className="absolute left-6 right-6 h-[2px] bg-cyan-400 pointer-events-none z-10 shadow-[0_0_20px_rgba(34,211,238,1)]"
              />
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center gap-4 text-center pointer-events-none">
             <motion.div 
               animate={{ 
                 y: isDragActive ? [0, -10, 0] : 0,
                 color: isDragActive ? "#22d3ee" : "#71717a" 
               }}
               transition={{ y: { duration: 1, repeat: Infinity } }}
             >
               {isDragActive ? <ScanLine size={64} /> : <UploadCloud size={64} />}
             </motion.div>
             
             <div>
               <h3 className={`text-2xl font-bold mb-2 transition-colors ${isDragActive ? 'text-cyan-400' : 'text-zinc-300'}`}>
                 {isDragActive ? 'Initiating Scan...' : 'Drop Archives Here'}
               </h3>
               <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                 Supported: JSON, TS, PNG
               </p>
             </div>

             {/* File List */}
             {droppedFiles.length > 0 && !isDragActive && (
               <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-sm">
                 {droppedFiles.map((name, i) => (
                   <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300">
                     <File size={12} className="text-cyan-500" />
                     {name}
                   </div>
                 ))}
               </div>
             )}
          </div>

        </div>
        );
        });
