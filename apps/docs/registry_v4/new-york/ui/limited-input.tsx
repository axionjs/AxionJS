"use client";

import * as React from "react";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";

interface LimitedInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "required"
  > {
  label?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  characterLimit?: number;
  required?: boolean;
  helperText?: string;
  error?: string;
}

const LimitedInput = ({
  label = "Input Label",
  id = "limited-input",
  value = "",
  onChange,
  characterLimit = 50,
  required = false,
  helperText,
  error,
  ...props
}: LimitedInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= characterLimit) {
      onChange?.(newValue);
    }
  };

  return (
    <div>
      {helperText && (
        <p className="my-1 pb-1 text-sm font-medium text-foreground/80">
          {helperText}
        </p>
      )}

      <Input
        id={id}
        value={value}
        onChange={handleInputChange}
        required={required}
        {...props}
      />

      <p className="mt-1 text-sm text-foreground/80">
        {value.length}/{characterLimit}
      </p>

      {value.length === characterLimit && (
        <p className="mt-1 text-sm text-destructive">
          You can not enter more than {characterLimit} characters.
        </p>
      )}

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default LimitedInput;
