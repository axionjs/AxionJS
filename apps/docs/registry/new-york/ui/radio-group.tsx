"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle as CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        "relative aspect-square h-4 w-4 rounded-full border border-primary text-primary",
        "transition-colors duration-200 ease-in-out shadow-xs outline-none",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
        "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20",
        "dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(
          "relative flex items-center justify-center transform scale-0",
          "transition-transform duration-200 data-[state=checked]:scale-100"
        )}
      >
        <CircleIcon
          className="fill-primary absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
          focusable="false"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
