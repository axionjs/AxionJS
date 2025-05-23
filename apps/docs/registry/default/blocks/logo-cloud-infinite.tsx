"use client";

import { useRef, useEffect } from "react";

export default function LogoCloudInfinite() {
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

  // Double the logos for the infinite scroll effect
  const allLogos = [...logos, ...logos];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPos += speed;
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="bg-background overflow-hidden py-16">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Powering the best teams</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)] overflow-hidden">
            <div className="flex" ref={scrollRef} style={{ gap: "112px" }}>
              {allLogos.map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    className={`mx-auto w-fit dark:invert ${logo.className}`}
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width="auto"
                    height={logo.className.replace("h-", "")}
                  />
                </div>
              ))}
            </div>

            {/* Gradient overlays for fading effect */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
