"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import { motion } from "motion/react";

export default function HeroCentered() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/10 text-primary"
            >
              New Components Available
            </Badge>
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Build Your Next Project{" "}
              <span className="text-primary">Faster</span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A modern UI component library designed for rapid development of
              responsive, accessible web applications.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col gap-2 min-[400px]:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild size="lg">
              <Link href="#get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#documentation">Documentation</Link>
            </Button>
          </motion.div>
          <motion.div
            className="flex items-center justify-center space-x-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            <span className="ml-2 text-sm font-medium">
              4.9/5 from 2,000+ reviews
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      {/* Floating elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="grid grid-cols-3 gap-8 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <motion.div
                key={i}
                className="h-24 w-24 rounded-lg border border-primary/20 bg-background"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0,
                }}
                animate={{
                  x: Math.sin(i) * 50,
                  y: Math.cos(i) * 50,
                  opacity: 0.5 + (i % 3) * 0.1,
                  rotate: Math.random() * 20 - 10,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              ></motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
