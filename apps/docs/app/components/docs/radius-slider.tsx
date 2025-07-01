import React from "react";
import * as Slider from "@radix-ui/react-slider";

interface RadiusSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RadiusSlider = ({ value, onChange }: RadiusSliderProps) => {
  return (
    <div className="space-y-3 not-prose">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Border Radius</span>
        <span className="text-sm text-muted-foreground w-12 text-right">
          {value}px
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none h-5 w-full"
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={20}
        step={1}
      >
        <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <Slider.Range className="absolute h-full bg-primary" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </Slider.Root>
      <div className="grid grid-cols-3 text-xs text-muted-foreground">
        <span>Square</span>
        <span className="text-center">Default</span>
        <span className="text-right">Rounded</span>
      </div>
    </div>
  );
};
