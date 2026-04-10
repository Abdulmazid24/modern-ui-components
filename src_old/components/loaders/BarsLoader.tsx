import React from 'react';

export interface BarsLoaderProps {
  /** Number of bars */
  count?: number;
  /** Bar width in pixels */
  barWidth?: number;
  /** Bar height in pixels */
  barHeight?: number;
  /** Bar color */
  color?: string;
  /** Animation speed in seconds */
  speed?: number;
  /** Accessible label */
  label?: string;
  className?: string;
}

export const BarsLoader: React.FC<BarsLoaderProps> = ({
  count = 4,
  barWidth = 10,
  barHeight = 60,
  color = 'rgb(245, 158, 11)',
  speed = 1,
  label = 'Loading',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-[3px] ${className}`}
      role="status"
      aria-label={label}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="inline-block rounded-[2px]"
          style={{
            width: barWidth,
            height: barHeight,
            backgroundColor: color,
            animation: `loaderStretch ${speed}s ease infinite`,
            animationDelay: `${i * (speed / count)}s`,
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
};
