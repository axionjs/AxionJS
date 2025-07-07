"use client";

import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { z } from "zod";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  characterLimit?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      type,
      helperText,
      error,
      startIcon,
      endIcon,
      characterLimit,
      ...props
    },
    ref,
  ) => {
    const [characterCount, setCharacterCount] = React.useState(0);
    const [localError, setLocalError] = React.useState<string | undefined>(
      error,
    );

    const schema = React.useMemo(() => {
      return characterLimit
        ? z
            .string()
            .max(characterLimit, `Maximum ${characterLimit} characters allowed`)
        : z.string();
    }, [characterLimit]);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      e,
    ) => {
      const newValue = e.target.value;
      setCharacterCount(newValue.length);

      try {
        schema.parse(newValue);
        setLocalError(undefined);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setLocalError(err.errors[0].message);
        }
      }

      if (characterLimit && newValue.length > characterLimit) {
        e.target.value = newValue.slice(0, characterLimit);
      }

      props.onChange?.(e);
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              className,
            )}
            ref={ref}
            aria-invalid={!!localError}
            aria-describedby={`${props.id}-helper ${props.id}-error`}
            onChange={handleInputChange}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {endIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p
            id={`${props.id}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
        {localError && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-destructive"
            role="alert"
          >
            {localError}
          </p>
        )}
        {characterLimit && (
          <p className="text-sm text-muted-foreground">
            {characterCount}/{characterLimit} characters
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
