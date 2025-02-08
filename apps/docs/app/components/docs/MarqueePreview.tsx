"use client";

import React from "react";
import { Marquee } from "@/registry/new-york/ui/marquee";

export function HorizontalMarqueePreview() {
  return (
    <div className="space-y-4 flex flex-col">
      <Marquee pauseOnHover>
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
      <Marquee pauseOnHover reverse>
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
    </div>
  );
}

export function VerticalMarqueePreview() {
  return (
    <div className="space-y-4 flex">
      <Marquee pauseOnHover vertical>
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
      <Marquee pauseOnHover reverse vertical>
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
    </div>
  );
}
