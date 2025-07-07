"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
 *  1. Dialog (Root)
 * -----------------------------------------------------------------------------
 *  The main Dialog wrapper. By default, Radix sets up role="dialog" or
 *  role="alertdialog" if it's set to `modal`. You can pass additional props
 *  like `aria-label`, `aria-describedby`, etc. here if needed.
 */
const Dialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Root ref={ref} {...props}>
    {children}
  </DialogPrimitive.Root>
));
Dialog.displayName = "Dialog";

/* -----------------------------------------------------------------------------
 *  2. DialogTrigger
 * -----------------------------------------------------------------------------
 *  The button/element that opens the dialog.
 *  You can pass `aria-label` or other attributes if your trigger is not textual.
 */
const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} {...props}>
    {children}
  </DialogPrimitive.Trigger>
));
DialogTrigger.displayName = "DialogTrigger";

/* -----------------------------------------------------------------------------
 *  3. DialogPortal
 * -----------------------------------------------------------------------------
 *  Renders the dialog outside the DOM hierarchy of the parent (e.g., a portal).
 */
const DialogPortal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Portal>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Portal ref={ref} {...props}>
    {children}
  </DialogPrimitive.Portal>
));
DialogPortal.displayName = "DialogPortal";

/* -----------------------------------------------------------------------------
 *  4. DialogOverlay
 * -----------------------------------------------------------------------------
 *  The dimmed overlay behind the dialog. Radix sets aria-hidden automatically.
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

/* -----------------------------------------------------------------------------
 *  5. DialogClose
 * -----------------------------------------------------------------------------
 *  A button that closes the dialog. Often used inside DialogContent.
 */
const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} {...props}>
    {children}
  </DialogPrimitive.Close>
));
DialogClose.displayName = "DialogClose";

/* -----------------------------------------------------------------------------
 *  6. DialogContent
 * -----------------------------------------------------------------------------
 *  The dialog itself. Radix automatically applies role="dialog",
 *  aria-modal="true", and focuses it when opened.
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg",
        "translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg",
        // Radix animations
        "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background",
          "transition-opacity hover:opacity-100 focus:outline-none focus:ring-2",
          "focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
          "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

/* -----------------------------------------------------------------------------
 *  7. DialogHeader
 * -----------------------------------------------------------------------------
 *  Optional container for your dialog header. Typically holds <DialogTitle>.
 */
const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

/* -----------------------------------------------------------------------------
 *  8. DialogFooter
 * -----------------------------------------------------------------------------
 *  Optional container for your dialog footer (actions, buttons, etc.).
 */
const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

/* -----------------------------------------------------------------------------
 *  9. DialogTitle
 * -----------------------------------------------------------------------------
 *  The main title of your dialog. Radix automatically wires this up
 *  with the dialog for screen readers via `aria-labelledby`.
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

/* -----------------------------------------------------------------------------
 *  10. DialogDescription
 * -----------------------------------------------------------------------------
 *  Additional descriptive text for your dialog. Radix connects this
 *  to the dialog for screen readers via `aria-describedby`.
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

/* -----------------------------------------------------------------------------
 *  Exports
 * -----------------------------------------------------------------------------
 *  Exporting all sub-components to be used together in a cohesive dialog.
 */
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
