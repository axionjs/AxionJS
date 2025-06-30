"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-transparent dark:bg-black border md:border-2 border-border">
      {/* Gradient Orbs – very light, no gradient in dark */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl dark:hidden"
        animate={{ x: mousePosition.x * 0.1, y: mousePosition.y * 0.1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ top: "10%", left: "10%" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-accent/10 to-foreground/10 rounded-full blur-2xl dark:hidden"
        animate={{ x: mousePosition.x * -0.15, y: mousePosition.y * -0.1 }}
        transition={{ type: "spring", stiffness: 30, damping: 25 }}
        style={{ top: "60%", right: "15%" }}
      />

      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-muted-foreground/5 to-border/5 rounded-full blur-2xl dark:hidden"
        animate={{ x: mousePosition.x * 0.08, y: mousePosition.y * -0.12 }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
        style={{ bottom: "20%", left: "20%" }}
      />

      {/* Static Grid – very subtle, no animation, hidden in dark */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:hidden" />
    </div>
  );
}
