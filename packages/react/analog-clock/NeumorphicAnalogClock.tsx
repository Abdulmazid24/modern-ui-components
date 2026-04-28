"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../utils";

export interface NeumorphicAnalogClockProps {
  className?: string;
}

export const NeumorphicAnalogClock = ({ className }: NeumorphicAnalogClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Initial sync
    setTime(new Date());
    
    // Update every second for the ticking effect
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  // Calculate rotations
  const secondDeg = seconds * 6; // 360 / 60
  const minuteDeg = (minutes + seconds / 60) * 6;
  const hourDeg = (hours + minutes / 60) * 30; // 360 / 12

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-[#e0e5ec]",
        "w-80 h-80",
        className
      )}
      style={{
        // Outer soft drop shadow and highlight
        boxShadow: "9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)",
      }}
    >
      {/* Recessed Inner Clock Face */}
      <div
        className="relative flex items-center justify-center w-[85%] h-[85%] rounded-full bg-[#e0e5ec]"
        style={{
          // Inset shadow to make it look debossed
          boxShadow: "inset 6px 6px 10px 0 rgba(163,177,198,0.5), inset -6px -6px 10px 0 rgba(255,255,255,1)",
        }}
      >
        {/* Numbers 1-12 */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => {
            const num = i === 0 ? 12 : i;
            const angle = i * 30;
            return (
              <div
                key={i}
                className="absolute inset-0 flex justify-center py-4"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {/* Rotate the text back so it remains upright */}
                <div
                  className="flex items-center justify-center w-8 h-8"
                  style={{ transform: `rotate(-${angle}deg)` }}
                >
                  <span 
                    className="text-xl font-bold text-[#8ba3c2]"
                    style={{
                      // Embossed text effect
                      textShadow: "1px 1px 1px rgba(255,255,255,0.8), -1px -1px 1px rgba(163,177,198,0.4)"
                    }}
                  >
                    {num}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hands Container */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Hour Hand */}
          <div
            className="absolute rounded-full bg-[#6b809a]"
            style={{
              width: "6px",
              height: "22%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${hourDeg}deg)`,
              transition: "transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
              boxShadow: "2px 2px 4px rgba(163,177,198,0.6)",
            }}
          />

          {/* Minute Hand */}
          <div
            className="absolute rounded-full bg-[#7d93ae]"
            style={{
              width: "4px",
              height: "32%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
              transition: "transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
              boxShadow: "2px 2px 4px rgba(163,177,198,0.6)",
            }}
          />

          {/* Second Hand */}
          <div
            className="absolute rounded-full bg-[#ff4757]"
            style={{
              width: "2px",
              height: "40%",
              bottom: "50%", 
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${secondDeg}deg)`,
              transition: seconds === 0 ? "none" : "transform 0.05s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
              boxShadow: "1px 1px 3px rgba(163,177,198,0.6)",
            }}
          >
            {/* The tail of the second hand extending backwards */}
            <div className="absolute top-full left-0 w-full h-4 bg-[#ff4757] rounded-full" />
          </div>

          {/* Center Pin */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e0e5ec] flex items-center justify-center"
            style={{
              width: "16px",
              height: "16px",
              boxShadow: "2px 2px 5px rgba(163,177,198,0.8), -1px -1px 3px rgba(255,255,255,1)",
              zIndex: 10,
            }}
          >
            {/* Inner dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#6b809a] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]" />
          </div>
        </div>
      </div>
    </div>
  );
};
