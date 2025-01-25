"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: "horizontal" | "vertical";

  decorative?: boolean;

  dashed?: boolean;

  label?: React.ReactNode;

  labelPosition?: "start" | "center" | "end";
}

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      orientation = "horizontal",
      dashed = false,
      label,
      labelPosition = "center",
      decorative = !label,
      className,
      ...props
    },
    ref
  ) => {
    const hasLabel = !!label;

    if (orientation === "vertical") {
      return (
        <SeparatorPrimitive.Root
          ref={ref}
          orientation="vertical"
          decorative={decorative}
          className={cn(
            "relative shrink-0 w-px bg-border",
            dashed && "bg-dashed-border",
            className
          )}
          {...props}
        >
          {hasLabel && (
            <div
              className={cn(
                "absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap px-2 text-sm text-foreground"
              )}
            >
              {label}
            </div>
          )}
        </SeparatorPrimitive.Root>
      );
    }

    // Horizontal divider
    return (
      <div className={cn("relative flex items-center", className)}>
        <SeparatorPrimitive.Root
          ref={ref}
          orientation="horizontal"
          decorative={decorative}
          className={cn(
            "h-[1px] w-full shrink-0 bg-border",
            dashed && "bg-dashed-border",
            hasLabel && labelPosition !== "start" ? "mr-2" : ""
          )}
          {...props}
        />
        {hasLabel && (
          <span
            className={cn(
              "text-sm text-foreground",
              labelPosition === "start" && "order-first mr-2",
              labelPosition === "center" &&
                "absolute left-1/2 -translate-x-1/2 bg-background px-2",
              labelPosition === "end" && "ml-2"
            )}
          >
            {label}
          </span>
        )}
        {hasLabel && labelPosition !== "end" && (
          <SeparatorPrimitive.Root
            orientation="horizontal"
            decorative={decorative}
            className={cn(
              "h-[1px] w-full shrink-0 bg-border",
              dashed && "bg-dashed-border",
              labelPosition === "center" && "ml-2"
            )}
          />
        )}
      </div>
    );
  }
);
Separator.displayName = "Separator";
