"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroVideo() {
  return (
    <section className="relative overflow-hidden bg-muted/40">
      <div className="container relative z-10 mx-auto px-4 py-16 md:px-6 md:py-24 lg:py-32">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Transform Your Digital Experience
          </h1>
          <p className="mt-6 max-w-3xl text-balance text-lg text-muted-foreground md:text-xl">
            Our component library provides everything you need to build
            beautiful, accessible, and responsive web applications.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full gap-2"
                >
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0 bg-black">
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src="about:blank"
                    title="Product Demo Video"
                    className="border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Product showcase"
            width="1920"
            height="1080"
            className="w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <motion.button
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 text-primary shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-6 w-6" />
                  <span className="sr-only">Play demo video</span>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0 bg-black">
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src="about:blank"
                    title="Product Demo Video"
                    className="border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]"></div>
      </div>
    </section>
  );
}
