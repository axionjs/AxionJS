"use client";

import React, { useState } from "react";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import { ColorPicker } from "@/registry/new-york/ui/color-picker";
import { cn } from "@/lib/utils";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Button } from "@/registry/new-york/ui/button";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";

// Basic color picker preview
export function ColorPickerBasic() {
  const [color, setColor] = useState("#3B82F6");

  return (
    <div className="flex items-center gap-4">
      <ColorPicker value={color} onChange={setColor} />
      <div className="text-sm">Selected color: {color}</div>
    </div>
  );
}

// Color picker with input
export function ColorPickerWithInput() {
  const [color, setColor] = useState("#10B981");

  return (
    <div className="flex items-center gap-4">
      <ColorPicker value={color} onChange={setColor} />
      <Input
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-28"
      />
      <div
        className="h-8 w-8 rounded-md border"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// Color picker with label
export function ColorPickerWithLabel() {
  const [backgroundColor, setBackgroundColor] = useState("#8B5CF6");
  const [textColor, setTextColor] = useState("#FFFFFF");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label className="w-32">Background:</Label>
        <ColorPicker value={backgroundColor} onChange={setBackgroundColor} />
        <Input
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-28"
        />
      </div>

      <div className="flex items-center gap-4">
        <Label className="w-32">Text Color:</Label>
        <ColorPicker value={textColor} onChange={setTextColor} />
        <Input
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-28"
        />
      </div>

      <div
        className="mt-4 rounded-md border p-4 text-center"
        style={{ backgroundColor, color: textColor }}
      >
        <span className="text-lg font-medium">Preview Text</span>
      </div>
    </div>
  );
}

// Theme color picker
export function ThemeColorPicker() {
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [secondaryColor, setSecondaryColor] = useState("#6B7280");
  const [accentColor, setAccentColor] = useState("#F59E0B");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={primaryColor} onChange={setPrimaryColor} />
            <Input
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Secondary Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={secondaryColor} onChange={setSecondaryColor} />
            <Input
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Accent Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={accentColor} onChange={setAccentColor} />
            <Input
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button style={{ backgroundColor: primaryColor, color: "#FFFFFF" }}>
          Primary Button
        </Button>
        <Button style={{ backgroundColor: secondaryColor, color: "#FFFFFF" }}>
          Secondary Button
        </Button>
        <Button style={{ backgroundColor: accentColor, color: "#FFFFFF" }}>
          Accent Button
        </Button>
      </div>
    </div>
  );
}

// Color picker code generator
export function ColorPickerCodeGenerator() {
  const [color, setColor] = useState("#EC4899");

  // Generate code snippet based on selected color
  const codeSnippet = `// Using the ColorPicker component
<ColorPicker 
  value="${color}" 
  onChange={(newColor) => setColor(newColor)} 
/>

// CSS variables for your theme
:root {
  --primary-color: ${color};
  --primary-hover: ${adjustColor(color, -15)};
  --primary-focus: ${adjustColor(color, 15)};
}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label className="w-32">Select a color:</Label>
        <ColorPicker value={color} onChange={setColor} />
        <Input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-28"
        />
      </div>

      <div className="mt-4">
        <DynamicCodeBlock lang="tsx" code={codeSnippet} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <ColorSwatch color={color} name="Base" />
        <ColorSwatch color={adjustColor(color, -15)} name="Hover" />
        <ColorSwatch color={adjustColor(color, 15)} name="Focus" />
      </div>
    </div>
  );
}

// Helper function to adjust a hex color (darken/lighten)
function adjustColor(hex: string, amount: number): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse the hex values into RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Adjust each component
  const newR = Math.max(0, Math.min(255, r + amount));
  const newG = Math.max(0, Math.min(255, g + amount));
  const newB = Math.max(0, Math.min(255, b + amount));

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
}

// Color swatch component
function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="h-16 w-full rounded-md"
        style={{ backgroundColor: color }}
      />
      <div className="mt-2 text-sm">
        <span className="font-medium">{name}:</span> {color}
      </div>
    </div>
  );
}

// Full color picker customization demo
export function ColorPickerCustomizationDemo() {
  // State for the component being styled
  const [bgColor, setBgColor] = useState("#F0F9FF");
  const [borderColor, setBorderColor] = useState("#7DD3FC");
  const [textColor, setTextColor] = useState("#0369A1");

  // Generated code display
  const cssCode = `.custom-component {
  background-color: ${bgColor};
  border: 1px solid ${borderColor};
  color: ${textColor};
  padding: 1rem;
  border-radius: 0.5rem;
}`;

  const reactCode = `<div
  className="p-4 rounded-lg"
  style={{
    backgroundColor: "${bgColor}",
    borderColor: "${borderColor}",
    color: "${textColor}",
    border: "1px solid ${borderColor}"
  }}
>
  Your styled content here
</div>`;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Customize Component Colors</h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={bgColor} onChange={setBgColor} />
            <Input
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Border Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={borderColor} onChange={setBorderColor} />
            <Input
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={textColor} onChange={setTextColor} />
            <Input
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div
        className="mt-6 rounded-lg border p-4"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          color: textColor,
        }}
      >
        <p className="text-center">
          This is a preview of your styled component
        </p>
      </div>

      {/* Code output */}
      <div className="mt-6">
        <Tabs items={["CSS", "React"]}>
          <Tab value="CSS">
            <div className="p-4">
              <DynamicCodeBlock lang="css" code={cssCode} />
            </div>
          </Tab>

          <Tab value="React">
            <div className="p-4">
              <DynamicCodeBlock lang="tsx" code={reactCode} />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
