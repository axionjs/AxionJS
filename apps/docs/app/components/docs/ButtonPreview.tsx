"use client";

import React from "react";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { ColorPicker } from "@/app/components/ui/color-picker";
import { cn } from "@/lib/utils";
import { Switch } from "@/app/components/ui/switch";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Slider } from "@/app/components/ui/slider";

// Example variants & sizes, no "custom" variant in this snippet
const AVAILABLE_VARIANTS = [
  { label: "Default", value: "default" },
  { label: "Destructive", value: "destructive" },
  { label: "Outline", value: "outline" },
  { label: "Secondary", value: "secondary" },
  { label: "Ghost", value: "ghost" },
  { label: "Link", value: "link" },
  { label: "RingHover", value: "ringHover" },
  { label: "LinkHover", value: "linkHover" },
  { label: "ExpandIcon", value: "expandIcon" },
  { label: "Shine", value: "shine" },
  { label: "GooeyRight", value: "gooeyRight" },
  { label: "GooeyLeft", value: "gooeyLeft" },
];

const AVAILABLE_SIZES = [
  { label: "Default", value: "default" },
  { label: "Small", value: "sm" },
  { label: "Large", value: "lg" },
  { label: "Icon", value: "icon" },
];

/**
 * Builds a code snippet for Fuma Docs, only including style keys the user changes.
 */
function getButtonCodeSnippet({
  label,
  variant,
  size,
  disabled,
  inlineStyle,
  fullWidth,
}: {
  label: string;
  variant: string;
  size: string;
  disabled: boolean;
  inlineStyle: React.CSSProperties;
  fullWidth: boolean;
}) {
  // Convert style object to lines only for defined keys
  const styleEntries = Object.entries(inlineStyle).filter(
    ([_, val]) => val !== undefined
  );

  let styleString = "";
  if (styleEntries.length) {
    styleString = styleEntries
      .map(([prop, val]) => `${prop}: "${val}"`)
      .join(", ");
  }

  return `<Button
  variant="${variant}"
  size="${size}"
  disabled={${disabled}}
  className="${fullWidth ? "w-full" : ""}"
  style={{ ${styleString} }}
>
  ${label}
</Button>`;
}

export function ButtonPreview() {
  return (
    <div className="space-y-6">
      <Button>Default Button</Button>
    </div>
  );
}

export function CustomizeButtonPreview() {
  // Basic button settings
  const [label, setLabel] = React.useState("Click Me");
  const [variant, setVariant] = React.useState("default");
  const [size, setSize] = React.useState("default");
  const [disabled, setDisabled] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);

  // Roundness
  const [roundness, setRoundness] = React.useState(4);

  // Border size & color
  const [borderSize, setBorderSize] = React.useState(0);
  const [borderColor, setBorderColor] = React.useState("#000000");

  // Colors for normal state (empty => use variant by default)
  const [bgColor, setBgColor] = React.useState("");
  const [textColor, setTextColor] = React.useState("");

  // Colors for hover state
  const [hoverBgColor, setHoverBgColor] = React.useState("");
  const [hoverTextColor, setHoverTextColor] = React.useState("");

  // Track hover
  const [isHovered, setIsHovered] = React.useState(false);

  // If hovered, use hover colors; else normal
  const finalBg = isHovered ? hoverBgColor : bgColor;
  const finalText = isHovered ? hoverTextColor : textColor;

  // Build inline style object
  const inlineStyle = React.useMemo<React.CSSProperties>(() => {
    const styleObj: React.CSSProperties = {
      borderRadius: `${roundness}px`,
      transition: "background-color 0.2s, color 0.2s",
    };

    // If user picked a color, override variant
    if (finalBg) {
      styleObj.backgroundColor = finalBg;
    }
    if (finalText) {
      styleObj.color = finalText;
    }

    // If user sets borderSize > 0, apply border with chosen color
    if (borderSize > 0) {
      styleObj.border = `${borderSize}px solid ${borderColor}`;
    }

    return styleObj;
  }, [roundness, finalBg, finalText, borderSize, borderColor]);

  // Generate code snippet
  const codeSnippet = React.useMemo(
    () =>
      getButtonCodeSnippet({
        label,
        variant,
        size,
        disabled,
        inlineStyle,
        fullWidth,
      }),
    [label, variant, size, disabled, inlineStyle, fullWidth]
  );

  return (
    <div className="space-y-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Customize Your Button</h2>

      {/* 1. Button Preview */}
      <div>
        <Label className="mb-2 block font-medium">Preview</Label>
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          className={cn(fullWidth && "w-full")}
          style={inlineStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {label}
        </Button>
      </div>

      {/* 2. Controls (Grid of 3 columns per row) */}
      <div className="grid grid-cols-3 gap-6 pt-4">
        {/* Label */}
        <div className="space-y-2">
          <Label className="block font-medium">Label</Label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>

        {/* Variant */}
        <div className="space-y-2">
          <Label className="block font-medium">Variant</Label>
          <Select value={variant} onValueChange={setVariant}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_VARIANTS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label className="block font-medium">Size</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_SIZES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* BG Color */}
        <div className="space-y-2">
          <Label className="block font-medium">BG Color</Label>
          <ColorPicker
            value={bgColor}
            onChange={setBgColor}
            showColorValueInInput={false}
          />
          <p className="text-xs text-muted-foreground">
            Leave blank to use variant color
          </p>
        </div>

        {/* Text Color */}
        <div className="space-y-2">
          <Label className="block font-medium">Text Color</Label>
          <ColorPicker
            value={textColor}
            onChange={setTextColor}
            showColorValueInInput={false}
          />
          <p className="text-xs text-muted-foreground">
            Leave blank for variant’s text
          </p>
        </div>

        {/* Hover BG */}
        <div className="space-y-2">
          <Label className="block font-medium">Hover BG Color</Label>
          <ColorPicker
            value={hoverBgColor}
            onChange={setHoverBgColor}
            showColorValueInInput={false}
          />
          <p className="text-xs text-muted-foreground">
            Leave blank for variant’s hover
          </p>
        </div>

        {/* Hover Text */}
        <div className="space-y-2">
          <Label className="block font-medium">Hover Text Color</Label>
          <ColorPicker
            value={hoverTextColor}
            onChange={setHoverTextColor}
            showColorValueInInput={false}
          />
          <p className="text-xs text-muted-foreground">
            Leave blank for variant’s hover text
          </p>
        </div>

        {/* Roundness (0–26) */}
        <div className="space-y-2">
          <Label className="block font-medium">Roundness (px)</Label>
          <Slider
            value={[roundness]}
            min={0}
            max={26}
            step={1}
            onValueChange={(val) => setRoundness(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {roundness}px
          </div>
        </div>

        {/* Border Size (0-10) */}
        <div className="space-y-2">
          <Label className="block font-medium">Border Size (px)</Label>
          <Slider
            value={[borderSize]}
            min={0}
            max={10}
            step={1}
            onValueChange={(val) => setBorderSize(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {borderSize}px
          </div>
        </div>

        {/* Border Color */}
        <div className="space-y-2">
          <Label className="block font-medium">Border Color</Label>
          <ColorPicker
            value={borderColor}
            onChange={setBorderColor}
            showColorValueInInput={false}
          />
          <p className="text-xs text-muted-foreground">
            Only applies if size &gt; 0
          </p>
        </div>

        {/* Disabled */}
        <div className="space-y-2">
          <Label className="block font-medium">Disabled</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={disabled} onCheckedChange={setDisabled} />
            <span>{disabled ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Full Width */}
        <div className="space-y-2">
          <Label className="block font-medium">Full Width</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={fullWidth} onCheckedChange={setFullWidth} />
            <span>{fullWidth ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      {/* 3. Code Snippet */}
      <DynamicCodeBlock lang="ts" code={codeSnippet} />
    </div>
  );
}
