import React from 'react';
import { AnimatedCarousel } from '../components/animated-carousel';
import type { CarouselCard } from '../components/animated-carousel';

/* ──────────────────────────────────────────────
   Dev / Tech themed cards 
   ────────────────────────────────────────────── */

const devCards: CarouselCard[] = [
  {
    id: 'debug',
    title: 'Debugging the Matrix',
    subtitle: 'The Developer Dream',
    description: 'The error messages multiplied, haunting my console...',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 40%, #1a0533 100%)',
    emoji: '🐛',
  },
  {
    id: 'react',
    title: 'React 19 Unleashed',
    subtitle: 'Server Components Era',
    description: 'When async becomes the default and suspense is everywhere.',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 40%, #0a1628 100%)',
    emoji: '⚛️',
  },
  {
    id: 'ai',
    title: 'AI Pair Programming',
    subtitle: 'The Future is Now',
    description: 'When your copilot writes better code than you at 3AM.',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #4a1942 40%, #1a0a2e 100%)',
    emoji: '🤖',
  },
  {
    id: 'deploy',
    title: '7:59 PM Deploy',
    subtitle: 'Living Dangerously',
    description: 'It works on my machine. Ship it. What could go wrong?',
    gradient: 'linear-gradient(135deg, #0f1923 0%, #1b4332 40%, #0f1923 100%)',
    emoji: '🚀',
  },
  {
    id: 'css',
    title: 'CSS is Awesome',
    subtitle: 'Or Is It?',
    description: 'When the div refuses to center and you question your life choices.',
    gradient: 'linear-gradient(135deg, #1c0a00 0%, #6b2100 40%, #1c0a00 100%)',
    emoji: '🎨',
  },
  {
    id: 'git',
    title: 'Git Push --force',
    subtitle: 'No Turning Back',
    description: 'Rewriting history one force push at a time. Pray for your team.',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #3d0000 40%, #0d0d0d 100%)',
    emoji: '💀',
  },
  {
    id: 'typescript',
    title: 'Type Safety',
    subtitle: 'any vs unknown',
    description: 'That moment when TypeScript saves you from yourself... again.',
    gradient: 'linear-gradient(135deg, #001529 0%, #003366 40%, #001529 100%)',
    emoji: '🛡️',
  },
  {
    id: 'stack',
    title: 'Stack Overflow',
    subtitle: 'Copy → Paste → Repeat',
    description: 'The greatest collaboration between developers who never met.',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #4a4a00 40%, #1a1a0a 100%)',
    emoji: '📋',
  },
];

/* ──────────────────────────────────────────────
   Demo Page
   ────────────────────────────────────────────── */

export const AnimatedCarouselDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #1a0533 0%, #0a0a0f 50%, #050508 100%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <AnimatedCarousel
        cards={devCards}
        radius={380}
        cardWidth={280}
        cardHeight={350}
        spinDuration={30}
        heading="3D Carousel"
        headingGradient="linear-gradient(90deg, #a855f7, #ec4899, #f97316, #a855f7)"
      />
    </div>
  );
};
