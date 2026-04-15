import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface NeonTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The focal glow color when the mouse moves over the card.
   * Format: rgba(r,g,b, a) or hex
   * @default "rgba(0, 212, 255, 0.4)"
   */
  glowColor?: string;
  /**
   * The intensity of the 3D tilt. Higher means more rotation.
   * @default 20
   */
  maxTilt?: number;
}

export const NeonTiltCard = React.forwardRef<HTMLDivElement, NeonTiltCardProps>(
  (
    { className, children, glowColor = "rgba(0, 212, 255, 0.3)", maxTilt = 20, ...props },
    forwardedRef
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Combine forwarded ref and internal ref
    const setRefs = (node: HTMLDivElement) => {
      cardRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    // Tracking mouse coordinates relative to the center of the card (-0.5 to 0.5)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Tracking raw mouse coordinates for the radial gradient glow position
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    // Smooth springs for buttery physical rotation
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), {
      stiffness: 300,
      damping: 30,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), {
      stiffness: 300,
      damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Normalize position from center (-0.5 to 0.5)
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      x.set(nx);
      y.set(ny);

      // Raw px position for background glow
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      // Snap back to 0 (flat)
      x.set(0);
      y.set(0);
      // Hide the glow by moving it way off-screen
      mouseX.set(-1000);
      mouseY.set(-1000);
    };

    return (
      <div
        ref={setRefs}
        className={cn("relative perspective-[1200px] w-full max-w-sm", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.div
          className="relative w-full h-full rounded-[24px] overflow-hidden bg-zinc-950 border border-white/10"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 30px ${glowColor}`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Dynamic Glare/Glow Effect following the cursor */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[24px] opacity-100 transition duration-300 z-50"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  ${glowColor},
                  transparent 40%
                )
              `,
              mixBlendMode: "screen",
            }}
          />

          {/* Children wrapped inside preserve-3d to allow elements to pop out via translateZ */}
          <div className="relative z-10 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            {children}
          </div>
        </motion.div>
      </div>
    );
  }
);

NeonTiltCard.displayName = "NeonTiltCard";
