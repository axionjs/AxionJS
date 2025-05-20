"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSimple() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div
            className={cn(
              "space-y-2 transition-all duration-1000 ease-in-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Build Beautiful Interfaces{" "}
              <span className="text-primary">Faster</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A modern UI component library designed for rapid development of
              responsive, accessible web applications.
            </p>
          </div>
          <div
            className={cn(
              "flex flex-col gap-2 min-[400px]:flex-row transition-all duration-1000 ease-in-out delay-300",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
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
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            "absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-primary/10 blur-3xl transition-all duration-1000 ease-in-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        ></div>
      </div>
    </section>
  );
}
