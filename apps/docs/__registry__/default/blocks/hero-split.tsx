"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSplit() {
  const features = [
    "Responsive design system",
    "Accessible components",
    "Dark mode support",
    "Customizable themes",
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.1),transparent_40%)]"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">
                  New Release v2.0
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Design Better. Build Faster.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our component library helps you create beautiful, responsive web
                applications with less effort and more flexibility.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="gap-1">
                <Link href="#get-started">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#documentation">View Documentation</Link>
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted p-1 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0 opacity-50"></div>
              <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Component showcase"
                width="600"
                height="600"
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/80 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Component Library</h3>
                    <p className="text-xs text-muted-foreground">
                      100+ ready-to-use components
                    </p>
                  </div>
                  <Button size="sm" variant="secondary">
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
