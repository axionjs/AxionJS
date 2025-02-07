import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // your shadcn-style utility for merging classes

const containerVariants = cva("mx-auto w-full", {
  variants: {
    variant: {
      default: "max-w-7xl px-4 sm:px-6 lg:px-8",
      sm: "max-w-sm px-4 sm:px-6",
      md: "max-w-md px-4 sm:px-6",
      lg: "max-w-lg px-4 sm:px-6",
      xl: "max-w-xl px-4 sm:px-6",
      "2xl": "max-w-2xl px-4 sm:px-6",
      "3xl": "max-w-3xl px-4 sm:px-6",
      "4xl": "max-w-4xl px-4 sm:px-6",
      "5xl": "max-w-5xl px-4 sm:px-6",
      "6xl": "max-w-6xl px-4 sm:px-6",
      "7xl": "max-w-7xl px-4 sm:px-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";
