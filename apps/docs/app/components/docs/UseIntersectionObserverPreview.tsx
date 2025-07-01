"use client";

import * as React from "react";
import { useIntersectionObserver } from "@/registry/new-york/hooks/use-intersection-observer";
import { Card, CardContent } from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";

export function SimpleIntersectionObserverPreview() {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  // Use object destructuring from the custom hook to avoid the TypeError
  const itemRefs = items.map(() => {
    const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
      threshold: 0.5,
    });
    return { ref, isIntersecting };
  });

  return (
    <div className="space-y-4 not-prose">
      <div className="h-[300px] overflow-y-auto border rounded-md p-4 space-y-4">
        {items.map((item, index) => (
          <Card
            key={item}
            ref={itemRefs[index].ref}
            className={`transition-all duration-300 ${
              itemRefs[index].isIntersecting
                ? "border-primary bg-primary/5"
                : ""
            }`}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-lg">Item {item}</span>
              <Badge
                variant={itemRefs[index].isIntersecting ? "default" : "outline"}
              >
                {itemRefs[index].isIntersecting ? "Visible" : "Hidden"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge
            key={item}
            variant={itemRefs[index].isIntersecting ? "default" : "outline"}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function LazyLoadImagesPreview() {
  const images = [
    {
      id: 1,
      src: "/api/placeholder/800/500",
      alt: "Mountain landscape at dawn",
    },
    {
      id: 2,
      src: "/api/placeholder/800/500",
      alt: "Bird's eye view of a coastal town",
    },
    {
      id: 3,
      src: "/api/placeholder/800/500",
      alt: "Desert vista with cactus",
    },
    {
      id: 4,
      src: "/api/placeholder/800/500",
      alt: "Snow covered mountains in starlight",
    },
    {
      id: 5,
      src: "/api/placeholder/800/500",
      alt: "Green rolling hills under blue sky",
    },
  ];

  return (
    <div className="not-prose space-y-6 h-[400px] overflow-y-auto p-4 border rounded-md">
      <div className="text-center pb-2 text-muted-foreground text-sm">
        Scroll down to load images
      </div>
      {images.map((image) => (
        <LazyImage key={image.id} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
}

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    triggerOnce: true,
    rootMargin: "100px",
  });
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      ref={ref}
      className="not-prose min-h-[200px] rounded-md overflow-hidden relative"
    >
      {isIntersecting ? (
        <>
          <div
            className={`absolute inset-0 bg-muted flex items-center justify-center transition-opacity duration-300 ${
              isLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-muted-foreground text-sm">
            Image will load when scrolled into view
          </div>
        </div>
      )}
    </div>
  );
}

export function AnimationOnScrollPreview() {
  const fadeInElements = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="not-prose h-[400px] overflow-y-auto p-4 border rounded-md space-y-16">
      <div className="text-center pb-2 text-muted-foreground text-sm">
        Scroll down to see elements animate in
      </div>
      {fadeInElements.map((item) => (
        <FadeInElement key={item}>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Section {item}</h3>
              <p className="text-muted-foreground">
                This content fades in when it enters the viewport, enhancing the
                user experience with subtle animations triggered by scrolling.
              </p>
            </CardContent>
          </Card>
        </FadeInElement>
      ))}
    </div>
  );
}

function FadeInElement({ children }: { children: React.ReactNode }) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}
