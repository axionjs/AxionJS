"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}
export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delay / 1000 }}
    className={cn("grid text-sm font-normal tracking-tight", className)}
    {...props}
  >
    {children}
  </motion.div>
);

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}
export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string.");
  }
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.slice(0, i + 1));
        i++;
      } else {
        clearInterval(iv);
      }
    }, duration);
    return () => clearInterval(iv);
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}
export const Terminal = ({ children, className }: TerminalProps) => (
  <div
    className={cn(
      "z-0 h-full min-h-[400px] w-full rounded-xl border border-border bg-background",
      className
    )}
  >
    <div className="flex flex-col gap-y-2 border-b border-border p-4">
      <div className="flex flex-row gap-x-2">
        <div className="h-2 w-2 rounded-full bg-red-500" />
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
        <div className="h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
    <pre className="p-4">
      <code className="grid gap-y-1">{children}</code>
    </pre>
  </div>
);
