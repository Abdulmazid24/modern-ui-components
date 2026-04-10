import React from 'react';

export interface SpinnerProps {
  /** Spinner diameter in pixels */
  size?: number;
  /** Border thickness in pixels */
  borderWidth?: number;
  /** Active arc color */
  color?: string;
  /** Track (inactive) color */
  trackColor?: string;
  /** Animation speed in seconds */
  speed?: number;
  /** Accessible label */
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 80,
  borderWidth = 8,
  color = 'rgb(56, 189, 248)',
  trackColor = 'rgb(30, 41, 59)',
  speed = 1,
  label = 'Loading',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-label={label}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: borderWidth,
          borderStyle: 'solid',
          borderColor: `${color} ${trackColor} ${trackColor} ${trackColor}`,
          animation: `loaderSpin ${speed}s linear infinite`,
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};
