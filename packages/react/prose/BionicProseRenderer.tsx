"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BionicProseRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  enableBionicReading?: boolean;
}

/**
 * Applies Bionic Reading algorithm: bolding the first half of each word to guide the eyes.
 */
const applyBionicReading = (text: string) => {
  const words = text.split(" ");
  return words.map((word, index) => {
    // Basic word boundaries (stripping punctuation for length calc but keeping it in render)
    const strippedWord = word.replace(/[^a-zA-Z0-9]/g, '');
    if (strippedWord.length <= 1) return <React.Fragment key={index}>{word} </React.Fragment>;
    
    // Bold the first ~40% of the word
    const boldLength = Math.ceil(strippedWord.length * 0.4);
    
    // Find where the bolding should stop in the original string (handling punctuation)
    let charCount = 0;
    let splitIndex = 0;
    for (let i = 0; i < word.length; i++) {
      if (/[a-zA-Z0-9]/.test(word[i])) {
        charCount++;
      }
      if (charCount === boldLength) {
        splitIndex = i + 1;
        break;
      }
    }

    const boldPart = word.substring(0, splitIndex);
    const normalPart = word.substring(splitIndex);

    return (
      <React.Fragment key={index}>
        <b className="font-extrabold text-zinc-100">{boldPart}</b>
        <span className="text-zinc-400">{normalPart}</span>
        {" "}
      </React.Fragment>
    );
  });
};

export const BionicProseRenderer = React.forwardRef<HTMLDivElement, BionicProseRendererProps>(
  ({ className, content, enableBionicReading = true, ...props }, ref) => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    const [paragraphs, setParagraphs] = useState<string[]>([]);

    useEffect(() => {
      // Split content into paragraphs simply for this demo
      setParagraphs(content.split('\n\n').filter(p => p.trim() !== ''));
    }, [content]);

    return (
      <div ref={ref} className={cn("relative max-w-3xl mx-auto py-12 px-6", className)} {...props}>
        {/* Spatial Reading Progress Tracker */}
        <div className="fixed left-8 top-1/4 bottom-1/4 w-1 bg-zinc-900 rounded-full hidden lg:block overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-cyan-400 to-violet-500 origin-top"
            style={{ scaleY }}
          />
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#22d3ee]"
            style={{ top: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }) as any }}
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-p:tracking-wide">
          <style dangerouslySetInnerHTML={{__html: `
            /* Magnetic Neon Selection */
            ::selection {
              background: rgba(139, 92, 246, 0.3);
              color: #fff;
              text-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
            }
          `}} />
          
          {paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              {enableBionicReading ? applyBionicReading(p) : <span className="text-zinc-300">{p}</span>}
            </motion.p>
          ))}
        </div>
      </div>
    );
  }
);

BionicProseRenderer.displayName = "BionicProseRenderer";
