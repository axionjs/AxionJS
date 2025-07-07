"use client";

import Link from "next/link";
import { ArrowRight, Check, Download } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Badge } from "@/registry/default/ui/badge";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroApp() {
  const features = [
    "Cross-platform compatibility",
    "Real-time collaboration",
    "Offline support",
    "Automatic updates",
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <span className="font-medium text-primary">
                  New Release v2.0
                </span>
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your Complete Design System
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Build beautiful, responsive web applications with our
                comprehensive component library.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="gap-1">
                <Link href="#download">
                  <Download className="mr-2 h-4 w-4" />
                  Download App
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#learn-more">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-[500px] sm:w-[400px] lg:w-[450px] xl:w-[500px]">
              {/* Phone frame */}
              <motion.div
                className="absolute inset-0 scale-[0.8] rounded-[3rem] border-[14px] border-black bg-black shadow-xl"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                {/* Screen */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="App interface"
                    width="400"
                    height="800"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Notch */}
                <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-xl bg-black"></div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 h-48 w-48 rounded-full bg-primary/30 blur-2xl"></div>
              <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full bg-primary/20 blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
