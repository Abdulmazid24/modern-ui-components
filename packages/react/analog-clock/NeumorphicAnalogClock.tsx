"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
        "relative flex items-center justify-center rounded-full bg-[#f0f0f3]",
        "w-64 h-64",
        className
      )}
      style={{
        boxShadow: "10px 10px 20px #d1d1d6, -10px -10px 20px #ffffff",
      }}
    >
      {/* Clock Face */}
      <div
        className="relative rounded-full w-[85%] h-[85%] bg-[#eadafb]"
        style={{
          boxShadow: "inset 5px 5px 10px #d1c5e3, inset -5px -5px 10px #ffffff",
        }}
      >
        {/* Hour Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full flex justify-center py-[6px]"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div className="w-[3px] h-[10px] bg-[#3f3b6d] rounded-full" />
            </div>
          ))}
        </div>

        {/* Hands Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Hour Hand */}
          <div
            className="absolute bg-zinc-800 rounded-full"
            style={{
              width: "4px",
              height: "25%",
              bottom: "50%",
              transformOrigin: "bottom center",
              transform: `rotate(${hourDeg}deg)`,
              transition: "transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
            }}
          />

          {/* Minute Hand */}
          <div
            className="absolute bg-zinc-800 rounded-full"
            style={{
              width: "3px",
              height: "35%",
              bottom: "50%",
              transformOrigin: "bottom center",
              transform: `rotate(${minuteDeg}deg)`,
              transition: "transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
            }}
          />

          {/* Second Hand */}
          <div
            className="absolute bg-red-500 rounded-full"
            style={{
              width: "2px",
              height: "40%",
              bottom: "50%",
              transformOrigin: "bottom center",
              transform: `rotate(${secondDeg}deg)`,
              // Hard transition for "ticking" steps effect
              transition: seconds === 0 ? "none" : "transform 0.05s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
            }}
          >
            {/* The tail of the second hand */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-3 bg-red-500 rounded-full" />
          </div>

          {/* Center Pin */}
          <div
            className="absolute z-10 rounded-full bg-white border-[3px] border-red-500"
            style={{
              width: "16px",
              height: "16px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
