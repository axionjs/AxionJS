"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type TextEffectProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  preset?:
    | "fade-in"
    | "fade-in-up"
    | "fade-in-down"
    | "fade-in-blur"
    | "typewriter";
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  speedSegment?: number;
  per?: "character" | "word" | "line";
};

export function TextEffect({
  children,
  as: Component = "div",
  className,
  preset = "fade-in",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
  speedSegment = 0.05,
  per = "character",
  ...props
}: TextEffectProps) {
  const text = React.Children.toArray(children).join("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [segments, setSegments] = useState<string[]>([]);

  useEffect(() => {
    if (per === "character") {
      setSegments(text.split(""));
    } else if (per === "word") {
      setSegments(text.split(" ").map((word) => `${word} `));
    } else if (per === "line" && containerRef.current) {
      // For line-by-line animation, we need to wait for the component to render
      // and then split the text based on line breaks
      const lines: string[] = [];
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.width = `${containerRef.current.offsetWidth}px`;
      tempDiv.style.fontSize = window.getComputedStyle(
        containerRef.current,
      ).fontSize;
      tempDiv.style.fontFamily = window.getComputedStyle(
        containerRef.current,
      ).fontFamily;
      tempDiv.style.fontWeight = window.getComputedStyle(
        containerRef.current,
      ).fontWeight;
      tempDiv.style.letterSpacing = window.getComputedStyle(
        containerRef.current,
      ).letterSpacing;
      tempDiv.style.lineHeight = window.getComputedStyle(
        containerRef.current,
      ).lineHeight;
      tempDiv.style.whiteSpace = "pre-wrap";
      tempDiv.style.wordBreak = "break-word";

      document.body.appendChild(tempDiv);

      // Split by words first
      const words = text.split(" ");
      let currentLine = "";

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + (currentLine ? " " : "") + word;
        tempDiv.textContent = testLine;

        if (i > 0 && tempDiv.clientHeight > tempDiv.offsetHeight / 2) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        lines.push(currentLine);
      }

      document.body.removeChild(tempDiv);
      setSegments(lines);
    }
  }, [text, per, containerRef]);

  // Define animation variants based on preset
  const getVariants = () => {
    switch (preset) {
      case "fade-in-up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case "fade-in-down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        };
      case "fade-in-blur":
        return {
          hidden: { opacity: 0, filter: "blur(8px)" },
          visible: { opacity: 1, filter: "blur(0px)" },
        };
      case "typewriter":
        return {
          hidden: { opacity: 0, width: 0 },
          visible: { opacity: 1, width: "auto" },
        };
      case "fade-in":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    ...getVariants(),
    visible: {
      ...getVariants().visible,
      transition: {
        duration,
      },
    },
  };

  return (
    <Component ref={containerRef} className={className} {...props}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="inline"
      >
        {segments.length > 0 ? (
          segments.map((segment, i) => (
            <motion.span
              key={i}
              variants={childVariants}
              transition={{
                duration,
                delay: delay + i * speedSegment,
              }}
              className="inline-block"
              style={{
                whiteSpace: per === "line" ? "pre-wrap" : "normal",
                display: per === "line" ? "block" : "inline-block",
              }}
            >
              {segment}
            </motion.span>
          ))
        ) : (
          <motion.span variants={childVariants} className="inline-block">
            {text}
          </motion.span>
        )}
      </motion.div>
    </Component>
  );
}
