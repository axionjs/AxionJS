"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";

export function ScrollPositionPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition({
        x: container.scrollLeft,
        y: container.scrollTop,
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 bg-background border rounded-md p-2 flex justify-between text-sm">
        <div>
          <span className="font-medium">Scroll Position:</span>
        </div>
        <div>
          <span>X: {scrollPosition.x}px</span>
          <span className="ml-4">Y: {scrollPosition.y}px</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[300px] overflow-auto border rounded-md p-4"
      >
        <div className="space-y-4 min-h-[800px] relative">
          {items.map((item) => (
            <Card key={item}>
              <CardContent className="p-4">
                <h3 className="font-medium">Item {item}</h3>
                <p className="text-sm text-muted-foreground">
                  Scroll to see the position change
                </p>
              </CardContent>
            </Card>
          ))}

          <div className="absolute right-4 bottom-4 bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm">
            Scroll position: {scrollPosition.y}px
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeaderEffectsPreview() {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate header properties based on scroll position
  const headerOpacity = Math.min(1, scrollPosition / 100);
  const headerBlur = Math.min(8, scrollPosition / 20);

  return (
    <div className="border rounded-md overflow-hidden">
      <div
        className="sticky top-0 z-10 transition-all duration-200"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${headerOpacity * 0.7})`,
          backdropFilter: `blur(${headerBlur}px)`,
          padding: `${Math.max(8, 16 - scrollPosition / 10)}px`,
          boxShadow: scrollPosition > 20 ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div className="flex justify-between items-center">
          <h2
            className="font-bold transition-all"
            style={{
              color: `rgba(255, 255, 255, ${0.6 + headerOpacity * 0.4})`,
              fontSize: `${Math.max(1, 1.25 - scrollPosition / 500)}rem`,
            }}
          >
            Scroll Effects Demo
          </h2>
          <Badge variant="outline" className="bg-primary/10">
            {scrollPosition.toFixed(0)}px
          </Badge>
        </div>
      </div>

      <div ref={containerRef} className="h-[400px] overflow-y-auto">
        <div className="h-[200px] bg-gradient-to-b from-primary/50 to-primary/5 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Hero Section</h1>
        </div>

        <div className="p-4 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <h3 className="font-medium">Section {i + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Scroll to see the header change. This demonstrates how you can
                  create scroll-based effects.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
