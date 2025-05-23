"use client";
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  blurIntensity?: number;
  size?: number;
}

export function ProgressiveBlur({
  className,
  direction = "right",
  blurIntensity = 5,
  size = 100,
}: ProgressiveBlurProps) {
  // Create a gradient based on the direction
  const getGradient = () => {
    switch (direction) {
      case "left":
        return `linear-gradient(to left, transparent, rgba(var(--background), ${blurIntensity}))`;
      case "right":
        return `linear-gradient(to right, transparent, rgba(var(--background), ${blurIntensity}))`;
      case "top":
        return `linear-gradient(to top, transparent, rgba(var(--background), ${blurIntensity}))`;
      case "bottom":
        return `linear-gradient(to bottom, transparent, rgba(var(--background), ${blurIntensity}))`;
      default:
        return `linear-gradient(to right, transparent, rgba(var(--background), ${blurIntensity}))`;
    }
  };

  return (
    <div
      className={cn("absolute", className)}
      style={{
        background: getGradient(),
        width:
          direction === "left" || direction === "right" ? `${size}px` : "100%",
        height:
          direction === "top" || direction === "bottom" ? `${size}px` : "100%",
        left: direction === "right" ? "auto" : 0,
        right: direction === "left" ? "auto" : 0,
        top: direction === "bottom" ? "auto" : 0,
        bottom: direction === "top" ? "auto" : 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
