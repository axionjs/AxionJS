"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/**
 * Alert
 *
 * By default:
 * - Uses `role="status"` and `aria-live="polite"` for non-destructive alerts.
 * - Uses `role="alert"` and `aria-live="assertive"` for destructive alerts.
 * - Has `aria-atomic="true"` so that screen readers read the entire alert at once.
 *
 * If you need different or more advanced ARIA settings, simply override them in props:
 *
 *   <Alert role="alert" aria-live="assertive" variant="default" />
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, role, ...props }, ref) => {
    const isDestructive = variant === "destructive";

    return (
      <div
        ref={ref}
        // Default to alert if destructive, otherwise status
        role={role ?? (isDestructive ? "alert" : "status")}
        // Default live region behavior (assertive for destructive, polite for default)
        aria-live={
          props["aria-live"] ?? (isDestructive ? "assertive" : "polite")
        }
        // Ensure the entire alert message is announced as one unit
        aria-atomic="true"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Alert.displayName = "Alert";

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
