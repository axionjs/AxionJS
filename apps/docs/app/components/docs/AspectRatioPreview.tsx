"use client";

import Image from "next/image";
import { AspectRatio } from "@/registry/new-york/ui/aspect-ratio";

// Example: Multiple aspect ratios
export function MultipleAspectRatios() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
      <div>
        <p className="text-sm font-medium mb-2 text-center">Square (1:1)</p>
        <AspectRatio ratio={1} className="bg-muted not-prose overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Square aspect ratio"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-center">Standard (4:3)</p>
        <AspectRatio
          ratio={4 / 3}
          className="bg-muted not-prose overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Standard aspect ratio"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div>
        <p className="text-sm font-medium mb-2 text-center">
          Widescreen (16:9)
        </p>
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted not-prose overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Widescreen aspect ratio"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  );
}

// Example: Content card with aspect ratio
export function ContentCardWithAspectRatio() {
  return (
    <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg border">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted not-prose overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Card image"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">Card with AspectRatio</h3>
        <p className="text-sm text-muted-foreground">
          Using aspect ratio ensures the image maintains the same proportions
          regardless of card width.
        </p>
      </div>
    </div>
  );
}

// Combine all demos
export default function AspectRatioPreview() {
  return (
    <div className="space-y-10 py-4">
      <AspectRatioDemo />
      <MultipleAspectRatios />
      <ContentCardWithAspectRatio />
      <VideoAspectRatio />
    </div>
  );
}
