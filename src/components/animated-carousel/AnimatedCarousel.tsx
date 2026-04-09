import React, { useState, useRef } from 'react';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface CarouselCard {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  gradient: string;
  emoji?: string;
}

export interface AnimatedCarouselProps {
  cards: CarouselCard[];
  /** 3D translateZ radius in px */
  radius?: number;
  /** Card width in px */
  cardWidth?: number;
  /** Card height in px */
  cardHeight?: number;
  /** Full rotation duration in seconds */
  spinDuration?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Section heading */
  heading?: string;
  /** Heading gradient CSS */
  headingGradient?: string;
  className?: string;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export const AnimatedCarousel: React.FC<AnimatedCarouselProps> = ({
  cards,
  radius = 340,
  cardWidth = 280,
  cardHeight = 360,
  spinDuration = 25,
  pauseOnHover = true,
  heading = '3D Carousel',
  headingGradient = 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
  className = '',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = cards.length;
  const angleStep = 360 / count;

  return (
    <div
      className={`anim-carousel-container ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      role="region"
      aria-label="Animated 3D carousel"
    >
      {/* Animated Heading */}
      <h2
        className="anim-carousel-title"
        style={{
          backgroundImage: headingGradient,
          backgroundSize: '200% 100%',
        }}
      >
        {heading}
      </h2>

      {/* 3D Scene */}
      <div className="anim-carousel-scene" style={{ perspective: '1200px' }}>
        <div
          ref={trackRef}
          className="anim-carousel-track"
          style={{
            width: cardWidth,
            height: cardHeight,
            animationDuration: `${spinDuration}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="anim-carousel-card"
              style={{
                width: cardWidth,
                height: cardHeight,
                background: card.gradient,
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
              }}
            >
              {/* Card Inner Content */}
              <div className="anim-carousel-card-inner">
                {card.emoji && (
                  <span className="anim-carousel-emoji">{card.emoji}</span>
                )}
                <h3 className="anim-carousel-card-title">{card.title}</h3>
                {card.subtitle && (
                  <span className="anim-carousel-card-subtitle">{card.subtitle}</span>
                )}
                {card.description && (
                  <p className="anim-carousel-card-desc">{card.description}</p>
                )}
              </div>
              {/* Shine overlay */}
              <div className="anim-carousel-card-shine" />
            </div>
          ))}
        </div>
      </div>

      {/* Control hint */}
      <p className="anim-carousel-hint">
        Hover to pause · Continuous 3D rotation
      </p>
    </div>
  );
};
