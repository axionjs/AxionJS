"use client";

import { Slider } from "@/app/components/ui/slider";

// Simple Slider Preview
export function SimpleSliderPreview() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground">
          Simple Slider
        </label>
        <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
      </div>
    </div>
  );
}

// Slider with Different Colors
export function ColoredSliderPreview() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-blue-500">
          Blue Slider
        </label>
        <Slider
          defaultValue={[30]}
          max={100}
          step={1}
          className="mt-2 [&_[data-part=track]]:bg-blue-300 [&_[data-part=range]]:bg-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-green-500">
          Green Slider
        </label>
        <Slider
          defaultValue={[70]}
          max={100}
          step={1}
          className="mt-2 [&_[data-part=track]]:bg-green-300 [&_[data-part=range]]:bg-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-red-500">
          Red Slider
        </label>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className="mt-2 [&_[data-part=track]]:bg-red-300 [&_[data-part=range]]:bg-red-500"
        />
      </div>
    </div>
  );
}
