"use client";

import React from "react";
import { Badge } from "@/registry/new-york/ui/badge";
import { Label } from "@/registry/new-york/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";
import { Input } from "@/registry/new-york/ui/input";
import { ColorPicker } from "@/registry/new-york/ui/color-picker";
import { cn } from "@/lib/utils";
import { Switch } from "@/registry/new-york/ui/switch";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Slider } from "@/registry/new-york/ui/slider";

// Basic badge preview with all variants
export function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

// Status badges with colored dots
export function StatusBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="gap-1.5">
        <span
          className="size-1.5 rounded-full bg-emerald-500"
          aria-hidden="true"
        ></span>
        Online
      </Badge>
      <Badge variant="outline" className="gap-1.5">
        <span
          className="size-1.5 rounded-full bg-yellow-500"
          aria-hidden="true"
        ></span>
        Away
      </Badge>
      <Badge variant="outline" className="gap-1.5">
        <span
          className="size-1.5 rounded-full bg-red-500"
          aria-hidden="true"
        ></span>
        Offline
      </Badge>
    </div>
  );
}

// Different sized badges
export function BadgeSizes() {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <Badge className="text-[10px] px-2 py-0.25">Small</Badge>
      <Badge>Regular</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  );
}

// Badges with counters
export function BadgeCounters() {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <Badge variant="secondary" className="gap-1.5">
        Notifications
        <span className="inline-flex items-center justify-center w-4 h-4 ml-1 text-[10px] font-bold text-white bg-primary rounded-full">
          3
        </span>
      </Badge>
      <Badge variant="outline" className="gap-1.5">
        Messages
        <span className="inline-flex items-center justify-center w-4 h-4 ml-1 text-[10px] font-bold text-white bg-blue-500 rounded-full">
          7
        </span>
      </Badge>
    </div>
  );
}

// Custom colored badges
export function CustomBadges() {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <Badge className="bg-purple-500 text-white hover:bg-purple-600 border-transparent">
        Custom Purple
      </Badge>
      <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent">
        Gradient
      </Badge>
      <Badge className="bg-amber-500 text-black border-transparent">
        Warning
      </Badge>
    </div>
  );
}

// Tag badges for categories
export function TagBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">React</Badge>
      <Badge variant="outline">Next.js</Badge>
      <Badge variant="outline">TypeScript</Badge>
      <Badge variant="secondary" className="text-[10px]">
        NEW
      </Badge>
      <Badge variant="destructive" className="text-[10px]">
        DEPRECATED
      </Badge>
    </div>
  );
}

const AVAILABLE_VARIANTS = [
  { label: "Default", value: "default" },
  { label: "Secondary", value: "secondary" },
  { label: "Destructive", value: "destructive" },
  { label: "Outline", value: "outline" },
];

/**
 * Builds a code snippet for the badge
 */
function getBadgeCodeSnippet({
  label,
  variant,
  inlineStyle,
  hasDot,
  dotColor,
  hoverBgColor,
  hoverTextColor,
}: {
  label: string;
  variant: string;
  inlineStyle: React.CSSProperties;
  hasDot: boolean;
  dotColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
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

  // If has dot, add the dot span
  const dotSpan = hasDot
    ? `\n  <span
    className="size-1.5 rounded-full bg-${dotColor}-500"
    aria-hidden="true"
  ></span>`
    : "";

  // Build hover styles if needed
  let hoverStyles = "";
  if (hoverBgColor || hoverTextColor) {
    hoverStyles = `
  // You can add these hover styles to your globals.css
  // Or use a styled component approach
  // This badge will have ID: 'custom-badge-${label.toLowerCase().replace(/\s+/g, "-")}'
  /*
  #custom-badge-${label.toLowerCase().replace(/\s+/g, "-")}:hover {
    ${hoverBgColor ? `background-color: ${hoverBgColor};` : ""}
    ${hoverTextColor ? `color: ${hoverTextColor};` : ""}
  }
  */`;
  }

  return `<Badge
  id="custom-badge-${label.toLowerCase().replace(/\s+/g, "-")}"
  variant="${variant}"
  className="${hasDot ? "gap-1.5" : ""}"
  style={{ ${styleString} }}
>${dotSpan}
  ${label}
</Badge>${hoverStyles}`;
}

// Interactive badge customizer
export function CustomizeBadgePreview() {
  // Basic badge settings
  const [label, setLabel] = React.useState("Badge");
  const [variant, setVariant] = React.useState("default");

  // Custom styling
  const [bgColor, setBgColor] = React.useState("");
  const [textColor, setTextColor] = React.useState("");
  const [borderColor, setBorderColor] = React.useState("");
  const [borderSize, setBorderSize] = React.useState(0);
  const [roundness, setRoundness] = React.useState(4);

  // Hover states
  const [hoverBgColor, setHoverBgColor] = React.useState("");
  const [hoverTextColor, setHoverTextColor] = React.useState("");

  // Track hover
  const [isHovered, setIsHovered] = React.useState(false);

  // If hovered, use hover colors; else normal
  const finalBg = isHovered ? hoverBgColor : bgColor;
  const finalText = isHovered ? hoverTextColor : textColor;

  // Status dot
  const [hasDot, setHasDot] = React.useState(false);
  const [dotColor, setDotColor] = React.useState("emerald");

  // Build inline style object
  const inlineStyle = React.useMemo<React.CSSProperties>(() => {
    const styleObj: React.CSSProperties = {
      borderRadius: `${roundness}px`,
      transition: "background-color 0.2s, color 0.2s",
    };

    // If user picked colors, override variant
    if (finalBg) {
      styleObj.backgroundColor = finalBg;
    }
    if (finalText) {
      styleObj.color = finalText;
    }

    // If user sets borderSize > 0, apply border with chosen color
    if (borderSize > 0) {
      styleObj.border = `${borderSize}px solid ${borderColor || "#000000"}`;
    }

    return styleObj;
  }, [roundness, finalBg, finalText, borderSize, borderColor]);

  // Generate code snippet
  const codeSnippet = React.useMemo(
    () =>
      getBadgeCodeSnippet({
        label,
        variant,
        inlineStyle,
        hasDot,
        dotColor,
        hoverBgColor,
        hoverTextColor,
      }),
    [
      label,
      variant,
      inlineStyle,
      hasDot,
      dotColor,
      hoverBgColor,
      hoverTextColor,
    ]
  );

  return (
    <div className="space-y-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Customize Your Badge</h2>

      {/* Badge Preview */}
      <div>
        <Label className="mb-2 block font-medium">Preview</Label>
        <Badge
          variant={variant as any}
          className={cn(hasDot && "gap-1.5")}
          style={inlineStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {hasDot && (
            <span
              className={`size-1.5 rounded-full bg-${dotColor}-500`}
              aria-hidden="true"
            ></span>
          )}
          {label}
        </Badge>
      </div>

      {/* Controls (Grid of 3 columns per row) */}
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

        {/* Status Dot */}
        <div className="space-y-2">
          <Label className="block font-medium">Status Dot</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={hasDot} onCheckedChange={setHasDot} />
            <span>{hasDot ? "Enabled" : "Disabled"}</span>
          </div>
        </div>

        {/* Dot Color (only if hasDot is true) */}
        {hasDot && (
          <div className="space-y-2">
            <Label className="block font-medium">Dot Color</Label>
            <Select value={dotColor} onValueChange={setDotColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emerald">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* BG Color */}
        <div className="space-y-2">
          <Label className="block font-medium">BG Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={bgColor} onChange={setBgColor} />
            <Input
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="#RRGGBB"
              className="w-28"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave blank to use variant color
          </p>
        </div>

        {/* Text Color */}
        <div className="space-y-2">
          <Label className="block font-medium">Text Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={textColor} onChange={setTextColor} />
            <Input
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              placeholder="#RRGGBB"
              className="w-28"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave blank for variant's text
          </p>
        </div>

        {/* Hover BG */}
        <div className="space-y-2">
          <Label className="block font-medium">Hover BG Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={hoverBgColor} onChange={setHoverBgColor} />
            <Input
              value={hoverBgColor}
              onChange={(e) => setHoverBgColor(e.target.value)}
              placeholder="#RRGGBB"
              className="w-28"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave blank for variant's hover
          </p>
        </div>

        {/* Hover Text */}
        <div className="space-y-2">
          <Label className="block font-medium">Hover Text Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={hoverTextColor} onChange={setHoverTextColor} />
            <Input
              value={hoverTextColor}
              onChange={(e) => setHoverTextColor(e.target.value)}
              placeholder="#RRGGBB"
              className="w-28"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave blank for variant's hover text
          </p>
        </div>

        {/* Roundness (0–16) */}
        <div className="space-y-2">
          <Label className="block font-medium">Roundness (px)</Label>
          <Slider
            value={[roundness]}
            min={0}
            max={16}
            step={1}
            onValueChange={(val) => setRoundness(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {roundness}px
          </div>
        </div>

        {/* Border Size (0-5) */}
        <div className="space-y-2">
          <Label className="block font-medium">Border Size (px)</Label>
          <Slider
            value={[borderSize]}
            min={0}
            max={5}
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
          <div className="flex items-center gap-2">
            <ColorPicker value={borderColor} onChange={setBorderColor} />
            <Input
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              placeholder="#RRGGBB"
              className="w-28"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Only applies if size &gt; 0
          </p>
        </div>
      </div>

      {/* Code Snippet */}
      <DynamicCodeBlock lang="tsx" code={codeSnippet} />
    </div>
  );
}
