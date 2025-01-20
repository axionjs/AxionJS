"use client";

import React from "react";
import { useButtonStore } from "./button-store";
import { Button } from "../ui/button";
import { Card } from "@/components/ui/card";

export function ButtonPreview() {
  const { variant, size, roundness, bgColor, textColor, emoji } =
    useButtonStore();

  const buttonStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  const variantCode = `const buttonVariants = cva(
  variants: {
    variant: {
      custom: "bg-[${bgColor}] text-[${textColor}] ${roundness}"
    }
  }
)`;

  const usageCode = `<Button
  variant="${variant}"
  size="${size}"
  className="${roundness}"
  style={{ backgroundColor: "${bgColor}", color: "${textColor}" }}
>
  ${emoji} Button Text
</Button>`;

  return (
    <div className="space-y-8">
      <Card className="p-6 flex justify-center">
        <Button
          variant={variant}
          size={size}
          className={roundness}
          style={buttonStyle}
        >
          {emoji} Button Text
        </Button>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Implementation Options</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Option 1: Add New Variant</h4>

            <pre className="bg-muted rounded-lg p-4 overflow-x-auto">
              <code className="language-tsx">{variantCode}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">Option 2: Use Custom Classes</h4>
            <pre className="bg-muted rounded-lg p-4 overflow-x-auto">
              <code className="language-tsx">{usageCode}</code>
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
