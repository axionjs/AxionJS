import * as React from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ColorPickerProps {
  label?: string;

  value?: string;

  defaultValue?: string;

  showColorValueInInput?: boolean;

  onChange?: (colorValue: string) => void;

  className?: string;

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  triggerButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * A color picker component that uses shadcn UI primitives.
 * It displays a Button with a color swatch (and optionally the hex code),
 * and a Popover containing a HexColorPicker.
 */
export function ColorPicker({
  label,
  value,
  defaultValue = "#000000",
  showColorValueInInput = true,
  onChange,
  className,
  inputProps,
  triggerButtonProps,
}: ColorPickerProps) {
  const [internalColor, setInternalColor] = React.useState<string>(
    value ?? defaultValue,
  );

  const color = value ?? internalColor;

  const handleColorChange = (newColor: string) => {
    // Update local state only if this is an uncontrolled input
    if (value === undefined) {
      setInternalColor(newColor);
    }
    onChange?.(newColor);
  };

  return (
    <div className={className}>
      {/* Optional Label for accessibility (pairs with text input if shown) */}
      {label && showColorValueInInput && (
        <Label htmlFor={inputProps?.id}>{label}</Label>
      )}

      {/* Popover with the color picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            {...triggerButtonProps}
            aria-label="Open color picker"
            className={[
              // typical shadcn/ui Button styling
              "justify-between",
              "gap-2",
              triggerButtonProps?.className ?? "",
            ].join(" ")}
          >
            {/* If desired, show the color code on the button itself */}
            {showColorValueInInput ? color : "Pick color"}

            {/* Color swatch (small circle) */}
            <span
              aria-hidden="true"
              className="inline-block h-5 w-5 rounded-full border"
              style={{ backgroundColor: color }}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-2" align="start">
          <HexColorPicker
            color={color}
            onChange={handleColorChange}
            aria-label="Color picker"
          />
        </PopoverContent>
      </Popover>

      {/* Optionally show an Input to edit the color manually */}
      {showColorValueInInput && (
        <Input
          type="text"
          value={color}
          onChange={(event) => handleColorChange(event.target.value)}
          {...inputProps}
        />
      )}
    </div>
  );
}
