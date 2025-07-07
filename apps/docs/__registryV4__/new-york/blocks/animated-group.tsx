"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  initial?: string;
  animate?: string;
  exit?: string;
  transition?: any;
  delay?: number;
  staggerChildren?: number;
  as?: React.ElementType;
};

export default function AnimatedGroup({
  children,
  className,
  variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    },
  },
  initial = "hidden",
  animate = "visible",
  exit = "hidden",
  transition,
  delay = 0,
  staggerChildren = 0.1,
  as: Component = motion.div,
}: AnimatedGroupProps) {
  // Apply delay to container transition if provided
  const containerVariants = {
    ...variants.container,
    visible: {
      ...variants.container?.visible,
      transition: {
        ...(variants.container?.visible as any)?.transition,
        delayChildren: delay,
        staggerChildren: staggerChildren,
      },
    },
  };

  return (
    <Component
      className={cn(className)}
      initial={initial}
      animate={animate}
      exit={exit}
      variants={containerVariants}
      transition={transition}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            variants: variants.item,
            key: `animated-item-${index}`,
          });
        }
        return (
          <motion.div key={`animated-item-${index}`} variants={variants.item}>
            {child}
          </motion.div>
        );
      })}
    </Component>
  );
}
