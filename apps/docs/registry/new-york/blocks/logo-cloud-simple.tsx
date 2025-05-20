"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LogoCloudSimple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logos = [
    {
      src: "https://html.tailus.io/blocks/customers/nvidia.svg",
      alt: "Nvidia Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/column.svg",
      alt: "Column Logo",
      className: "h-4",
    },
    {
      src: "https://html.tailus.io/blocks/customers/github.svg",
      alt: "GitHub Logo",
      className: "h-4",
    },
    {
      src: "https://html.tailus.io/blocks/customers/nike.svg",
      alt: "Nike Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg",
      alt: "Lemon Squeezy Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/laravel.svg",
      alt: "Laravel Logo",
      className: "h-4",
    },
    {
      src: "https://html.tailus.io/blocks/customers/lilly.svg",
      alt: "Lilly Logo",
      className: "h-7",
    },
    {
      src: "https://html.tailus.io/blocks/customers/openai.svg",
      alt: "OpenAI Logo",
      className: "h-6",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollWidth <= clientWidth) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;

      // Reset position when we've scrolled the full width of the first set of logos
      if (position <= -scrollWidth / 2) {
        position = 0;
      }

      if (container) {
        container.style.transform = `translateX(${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Trusted by industry leaders
            </h2>
            <p className="text-muted-foreground">
              Join thousands of companies using our library
            </p>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

          <div className="flex overflow-hidden">
            <div
              ref={containerRef}
              className="flex items-center gap-8 py-4 transition-transform duration-1000"
              style={{ width: "fit-content" }}
            >
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center justify-center"
                >
                  <div
                    className={cn(
                      "flex h-16 w-32 items-center justify-center rounded-lg border bg-background p-4 transition-all duration-200 hover:scale-105 hover:shadow-md"
                    )}
                  >
                    <img
                      className={`w-auto dark:invert ${logo.className}`}
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width="auto"
                      height={logo.className.replace("h-", "")}
                    />
                  </div>
                </div>
              ))}

              {/* Duplicate set for seamless scrolling */}
              {logos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="flex items-center justify-center"
                >
                  <div
                    className={cn(
                      "flex h-16 w-32 items-center justify-center rounded-lg border bg-background p-4 transition-all duration-200 hover:scale-105 hover:shadow-md"
                    )}
                  >
                    <img
                      className={`w-auto dark:invert ${logo.className}`}
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width="auto"
                      height={logo.className.replace("h-", "")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
