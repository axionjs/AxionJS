"use client";

import { Separator } from "@/app/components/ui/separator";

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}

// Default horizontal separator
export function HorizontalSeparatorPreview() {
  return (
    <div className="space-y-4">
      <Separator />
      <Separator dashed />
      <Separator label="Section Divider" />
      <Separator label="Aligned Start" labelPosition="start" />
      <Separator label="Aligned End" labelPosition="end" />
    </div>
  );
}

// Vertical separator with optional label
export function VerticalSeparatorPreview() {
  return (
    <div className="flex space-x-4">
      <div className="h-32 flex items-center">
        <Separator orientation="vertical" />
      </div>
      <div className="h-32 flex items-center">
        <Separator orientation="vertical" label="Divider" />
      </div>
      <div className="h-32 flex items-center">
        <Separator orientation="vertical" dashed label="Dashed" />
      </div>
    </div>
  );
}

// Custom usage with labeled and dashed styles
export function CustomSeparatorPreview() {
  return (
    <div className="space-y-6">
      <Separator label="Custom Styled Separator" dashed />
      <Separator orientation="vertical" label="Vertical Example" />
    </div>
  );
}
