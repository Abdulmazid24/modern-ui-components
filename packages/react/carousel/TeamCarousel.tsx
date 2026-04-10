"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  socials?: { icon: React.ReactNode; href: string; label: string }[];
}

export interface TeamCarouselProps {
  members: TeamMember[];
  /** 3D translateZ radius in px */
  radius?: number;
  /** Card width in px */
  cardWidth?: number;
  /** Card height in px */
  cardHeight?: number;
  /** Auto-rotate interval in ms (0 = disabled) */
  autoPlay?: number;
  /** Heading text */
  heading?: string;
  /** Active index (controlled) */
  activeIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  members,
  radius = 320,
  cardWidth = 260,
  cardHeight = 340,
  autoPlay = 0,
  heading = 'OUR TEAM',
  activeIndex: controlledIndex,
  onChange,
  className = '',
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = members.length;
  const angleStep = 360 / count;

  const goTo = useCallback(
    (idx: number) => {
      const wrapped = ((idx % count) + count) % count;
      if (!isControlled) setInternalIndex(wrapped);
      onChange?.(wrapped);
    },
    [count, isControlled, onChange]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (autoPlay <= 0) return;
    timerRef.current = setInterval(next, autoPlay);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, next]);

  // Pause on hover
  const pauseAuto = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const resumeAuto = () => {
    if (autoPlay > 0) timerRef.current = setInterval(next, autoPlay);
  };

  // Keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const activeMember = members[activeIndex];

  return (
    <div
      className={`team-carousel-wrapper ${className}`}
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Team members carousel"
      aria-roledescription="carousel"
    >
      {/* Background Heading */}
      <div className="team-carousel-bg-heading" aria-hidden="true">
        {heading}
      </div>

      {/* 3D Scene */}
      <div className="team-carousel-scene" style={{ perspective: '1200px' }}>
        <div
          className="team-carousel-track"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${-activeIndex * angleStep}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {members.map((member, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={member.id}
                className={`team-carousel-card ${isActive ? 'active' : ''}`}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                }}
                onClick={() => goTo(i)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${member.name}, ${member.role}`}
                aria-hidden={!isActive}
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="team-carousel-img"
                  draggable={false}
                />
                <div className="team-carousel-card-overlay" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Member Info */}
      <div className="team-carousel-info" key={activeMember.id}>
        <div className="team-carousel-divider" />
        <h3 className="team-carousel-name">{activeMember.name}</h3>
        <p className="team-carousel-role">{activeMember.role}</p>
        {activeMember.socials && activeMember.socials.length > 0 && (
          <div className="team-carousel-socials">
            {activeMember.socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      <button className="team-carousel-arrow team-carousel-arrow-left" onClick={prev} aria-label="Previous member">
        <ChevronLeft size={22} />
      </button>
      <button className="team-carousel-arrow team-carousel-arrow-right" onClick={next} aria-label="Next member">
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="team-carousel-dots" role="tablist" aria-label="Carousel navigation">
        {members.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to slide ${i + 1}`}
            className={`team-carousel-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};
