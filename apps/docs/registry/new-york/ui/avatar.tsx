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
      className,
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
    className={cn("aspect-square h-full w-full object-cover", className)}
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
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  overlap?: string;
  hoverScale?: boolean;
  limit?: number;
  totalCount?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      className,
      overlap = "-ml-2",
      hoverScale = false,
      limit,
      totalCount,
      children,
      ...props
    },
    ref,
  ) => {
    // Convert children to array for processing
    const childrenArray = React.Children.toArray(children).filter((child) =>
      React.isValidElement(child),
    );

    // Limit the number of displayed avatars if limit is set
    const visibleChildren = limit
      ? childrenArray.slice(0, limit)
      : childrenArray;

    // Calculate how many additional avatars are not shown
    const hiddenCount =
      limit && childrenArray.length > limit
        ? childrenArray.length - limit
        : totalCount && childrenArray.length > 0
          ? totalCount - childrenArray.length
          : 0;

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {visibleChildren.map((child, index) => {
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
              child.props.className,
            ),
          });
        })}

        {/* Show the count of additional avatars if any are hidden */}
        {hiddenCount > 0 && (
          <Avatar
            className={cn(
              overlap,
              "ring-2 ring-background ring-offset-1 ring-primary/10",
              hoverScale &&
                "transition-transform duration-200 ease-in-out hover:z-10 hover:scale-110 hover:-translate-y-1",
              "bg-muted",
            )}
          >
            <AvatarFallback className="bg-primary/10 text-xs">
              +{hiddenCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
