"use client";

import type React from "react";
import { forwardRef, useMemo, useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/registry/new-york/lib/utils";
import type { ButtonProps } from "@/registry/new-york/ui/button";
import { Button } from "@/registry/new-york/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover";
import { Input } from "@/registry/new-york/ui/input";

export function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      (ref as React.MutableRefObject<T | null>).current = innerRef.current;
    }
  });

  return innerRef;
}

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef,
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            ref={ref}
            className={cn(
              "h-8 w-8 p-0",
              "flex items-center justify-center",
              "border",
            )}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size="icon" // Use icon size for a small square button
            type="button" // Explicitly set type to button
            variant="outline"
          >
            {/* Inner div to display the color */}
            <div
              className="h-4 w-4 rounded border"
              style={{ backgroundColor: parsedValue }}
            />
            <span className="sr-only">Pick a color</span> {/* Accessibility */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <HexColorPicker
            color={parsedValue}
            onChange={onChange}
            style={{ width: "100%", height: "150px", marginBottom: "8px" }} // Add some styling
          />
          <Input
            ref={ref} // Attach the ref here for the input element
            id={name ? `color-input-${name}` : "color-input"} // Add id for label association
            className="mt-2 h-8" // Add margin top and control height
            maxLength={7}
            onChange={(e) => {
              onChange(e.currentTarget.value);
            }}
            onBlur={onBlur} // Pass onBlur to Input as well
            value={parsedValue}
            aria-label="Hex color input" // Accessibility
          />
        </PopoverContent>
      </Popover>
    );
  },
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
