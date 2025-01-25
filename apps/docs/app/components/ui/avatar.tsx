"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------
 *  1. Avatar
 * ----------------------------------------------------------------------------------- */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

/* -------------------------------------------------------------------------------------
 *  2. AvatarImage
 * ----------------------------------------------------------------------------------- */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

/* -------------------------------------------------------------------------------------
 *  3. AvatarFallback
 * ----------------------------------------------------------------------------------- */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  overlap?: string;
  hoverScale?: boolean;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { className, overlap = "-ml-2", hoverScale = false, children, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          const overlapClass = index === 0 ? "" : overlap;

          const borderClass =
            "ring-2 ring-background ring-offset-1 ring-primary/10";

          const scaleClass = hoverScale
            ? "transition-transform duration-200 ease-in-out hover:z-10 hover:scale-110 hover:-translate-y-1"
            : "";

          return React.cloneElement(child, {
            className: cn(
              overlapClass,
              borderClass,
              scaleClass,
              child.props.className
            ),
          });
        })}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
