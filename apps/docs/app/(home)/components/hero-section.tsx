"use client";

import { motion } from "framer-motion";
import { Container } from "@/registry/new-york/ui/container";
import { Badge } from "@/registry/new-york/ui/badge";
import Link from "next/link";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-7xl mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Badge
            variant="outline"
            className="mb-4 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm"
          >
            <Link
              href="/docs/accessibility/AccessibilityToolkit"
              className="text-muted-foreground"
            >
              Accessibility Toolkit →
            </Link>
          </Badge>
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2"
          >
            Shape your React, Next Component Library
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-6 sm:leading-7 px-4 [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6"
          >
            Accessible components, responsive dynamic pieces, and built-in hooks
            — all in one place. Accessible. Open Source. Built to Scale.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="hidden sm:flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 lg:space-x-12 text-xs sm:text-sm text-muted-foreground px-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>50+ Components</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" />
              <span>Production ready Hooks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
              <span>Dynamic Fullstack Components</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
              <span>Themes</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border border-border/20 rounded-lg"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
