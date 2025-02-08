"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";

export function SimpleRadioGroupPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Simple Radio Group</h3>
      <RadioGroup defaultValue="option-1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="option-1" value="option-1" />
          <label htmlFor="option-1" className="text-sm">
            Option 1
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="option-2" value="option-2" />
          <label htmlFor="option-2" className="text-sm">
            Option 2
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="option-3" value="option-3" />
          <label htmlFor="option-3" className="text-sm">
            Option 3
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}

export function ColoredRadioGroupPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Colored Radio Group</h3>
      <RadioGroup defaultValue="blue">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            id="blue"
            value="blue"
            className="border-blue-500"
            style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
          />
          <label htmlFor="blue" className="text-sm">
            Blue
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            id="green"
            value="green"
            className="border-green-500"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}
          />
          <label htmlFor="green" className="text-sm">
            Green
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            id="red"
            value="red"
            className="border-red-500"
            style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
          />
          <label htmlFor="red" className="text-sm">
            Red
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}

export function DisabledRadioGroupPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Disabled Radio Group</h3>
      <RadioGroup defaultValue="disabled" disabled>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="disabled" value="disabled" />
          <label htmlFor="disabled" className="text-sm text-muted-foreground">
            Disabled Option
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
