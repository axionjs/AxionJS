"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number;
  speedOnHover?: number;
  direction?: "left" | "right";
  gap?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export function InfiniteSlider({
  children,
  speed = 20,
  speedOnHover = 0,
  direction = "left",
  gap = 40,
  className,
  pauseOnHover = false,
}: InfiniteSliderProps) {
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [numDuplicates, setNumDuplicates] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const controls = useAnimationControls();
  const x = useMotionValue(0);

  // Calculate the width of the content and container
  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      const contentWidth = contentRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;

      setContentWidth(contentWidth);
      setContainerWidth(containerWidth);

      // Calculate how many duplicates we need to fill the container
      const duplicatesNeeded = Math.ceil(containerWidth / contentWidth) + 1;
      setNumDuplicates(duplicatesNeeded);
    }
  }, [children]);

  // Animation effect
  useEffect(() => {
    if (contentWidth === 0) return;

    const totalContentWidth = contentWidth + gap;
    const duration = totalContentWidth / (hovering ? speedOnHover || 0 : speed);

    if (pauseOnHover && hovering) {
      controls.stop();
      return;
    }

    if (duration === 0 || duration === Number.POSITIVE_INFINITY) {
      controls.stop();
      return;
    }

    const directionMultiplier = direction === "left" ? -1 : 1;

    controls.start({
      x: directionMultiplier * totalContentWidth,
      transition: {
        duration,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    });

    return () => {
      controls.stop();
    };
  }, [
    contentWidth,
    speed,
    speedOnHover,
    direction,
    hovering,
    pauseOnHover,
    gap,
    controls,
  ]);

  // If we don't have content width yet, don't render
  if (contentWidth === 0) {
    return (
      <div ref={containerRef} className={cn("overflow-hidden", className)}>
        <div ref={contentRef} className="flex">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.div
        className="flex"
        style={{ x, gap: `${gap}px` }}
        animate={controls}
      >
        <div
          ref={contentRef}
          className="flex shrink-0"
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>

        {/* Duplicate the content to create the infinite effect */}
        {Array.from({ length: numDuplicates }).map((_, i) => (
          <div
            key={`duplicate-${i}`}
            className="flex shrink-0"
            style={{ gap: `${gap}px` }}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
