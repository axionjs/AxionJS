"use client";

import React, { useState } from "react";
import { Marquee } from "@/registry/new-york/ui/marquee";
import { Label } from "@/registry/new-york/ui/label";
import { Slider } from "@/registry/new-york/ui/slider";
import { Switch } from "@/registry/new-york/ui/switch";
import { Input } from "@/registry/new-york/ui/input";
import { Button } from "@/registry/new-york/ui/button";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ColorPicker } from "@/registry/new-york/ui/color-picker";
import { Plus, Trash2 } from "lucide-react";

export function HorizontalMarqueePreview() {
  return (
    <div className="space-y-4 flex flex-col not-prose">
      <Marquee pauseOnHover>
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md mx-2"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
      <Marquee pauseOnHover reverse>
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md mx-2"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
    </div>
  );
}

export function VerticalMarqueePreview() {
  return (
    <div className="space-y-4 flex">
      <Marquee pauseOnHover vertical className="h-72">
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md my-2"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
      <Marquee pauseOnHover reverse vertical className="h-72">
        {["🚀 Rocket", "🌟 Star", "🎨 Palette", "⚡ Lightning"].map(
          (item, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-primary text-white shadow-md my-2"
            >
              {item}
            </div>
          )
        )}
      </Marquee>
    </div>
  );
}

/**
 * Helper function to generate code snippet for marquee
 */
function getMarqueeCodeSnippet({
  items,
  vertical,
  reverse,
  pauseOnHover,
  gap,
  repeat,
  speed,
  itemBgColor,
  itemTextColor,
  itemBorderRadius,
  itemWidth,
  itemHeight,
}: {
  items: string[];
  vertical: boolean;
  reverse: boolean;
  pauseOnHover: boolean;
  gap: number;
  repeat: number;
  speed: number;
  itemBgColor: string;
  itemTextColor: string;
  itemBorderRadius: number;
  itemWidth: number;
  itemHeight: number;
}) {
  const itemsStr = items.map((item) => `"${item}"`).join(", ");

  const styleProps = {
    "--duration": `${speed}s`,
    "--gap": `${gap}rem`,
  };

  const stylePropsString = Object.entries(styleProps)
    .map(([key, value]) => `${key}: "${value}"`)
    .join(", ");

  const marginProp = vertical ? "my-2" : "mx-2";

  return `import { Marquee } from "@/components/ui/marquee";

export function CustomMarquee() {
  const items = [${itemsStr}];
  
  return (
    <Marquee
      ${vertical ? "vertical" : ""}
      ${reverse ? "reverse" : ""}
      ${pauseOnHover ? "pauseOnHover" : ""}
      repeat={${repeat}}
      style={{ ${stylePropsString} }}
      ${vertical ? `className="h-[300px]"` : ""}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center ${marginProp} shadow-md rounded-[${itemBorderRadius}px]"
          style={{
            width: "${itemWidth}px",
            height: "${itemHeight}px",
            backgroundColor: "${itemBgColor}",
            color: "${itemTextColor}",
          }}
        >
          {item}
        </div>
      ))}
    </Marquee>
  );
}`;
}

export function CustomizeMarqueePreview() {
  // Basic settings
  const [vertical, setVertical] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [gap, setGap] = useState(0.5);
  const [repeat, setRepeat] = useState(4);
  const [speed, setSpeed] = useState(40);

  // Items
  const [items, setItems] = useState([
    "🚀 Rocket",
    "🌟 Star",
    "🎨 Palette",
    "⚡ Lightning",
  ]);
  const [newItem, setNewItem] = useState("");

  // Style settings
  const [itemBgColor, setItemBgColor] = useState("#3b82f6"); // blue-500
  const [itemTextColor, setItemTextColor] = useState("#ffffff"); // white
  const [itemBorderRadius, setItemBorderRadius] = useState(8);
  const [itemWidth, setItemWidth] = useState(128);
  const [itemHeight, setItemHeight] = useState(64);

  // Add new item
  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  // Remove item at index
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Generate code snippet
  const codeSnippet = React.useMemo(() => {
    return getMarqueeCodeSnippet({
      items,
      vertical,
      reverse,
      pauseOnHover,
      gap,
      repeat,
      speed,
      itemBgColor,
      itemTextColor,
      itemBorderRadius,
      itemWidth,
      itemHeight,
    });
  }, [
    items,
    vertical,
    reverse,
    pauseOnHover,
    gap,
    repeat,
    speed,
    itemBgColor,
    itemTextColor,
    itemBorderRadius,
    itemWidth,
    itemHeight,
  ]);

  // Custom CSS variables
  const cssVariables = {
    "--duration": `${speed}s`,
    "--gap": `${gap}rem`,
  } as React.CSSProperties;

  return (
    <div className="space-y-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Customize Your Marquee</h2>

      {/* 1. Preview */}
      <div>
        <Label className="mb-2 block font-medium">Preview</Label>
        <div
          className={`bg-background border rounded-md p-4 ${vertical ? "h-80" : "h-24"}`}
        >
          <Marquee
            vertical={vertical}
            reverse={reverse}
            pauseOnHover={pauseOnHover}
            repeat={repeat}
            style={cssVariables}
            className={vertical ? "h-full" : ""}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-center shadow-md ${vertical ? "my-2" : "mx-2"}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                  backgroundColor: itemBgColor,
                  color: itemTextColor,
                  borderRadius: `${itemBorderRadius}px`,
                }}
              >
                {item}
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* 2. Controls Grid */}
      <div className="grid grid-cols-3 gap-6 pt-4">
        {/* Basic settings */}
        {/* Orientation */}
        <div className="space-y-2">
          <Label className="block font-medium">Orientation</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={vertical} onCheckedChange={setVertical} />
            <span>{vertical ? "Vertical" : "Horizontal"}</span>
          </div>
        </div>

        {/* Direction */}
        <div className="space-y-2">
          <Label className="block font-medium">Reverse Direction</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={reverse} onCheckedChange={setReverse} />
            <span>{reverse ? "Reversed" : "Normal"}</span>
          </div>
        </div>

        {/* Pause on Hover */}
        <div className="space-y-2">
          <Label className="block font-medium">Pause on Hover</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={pauseOnHover} onCheckedChange={setPauseOnHover} />
            <span>{pauseOnHover ? "Enabled" : "Disabled"}</span>
          </div>
        </div>

        {/* Animation Speed */}
        <div className="space-y-2">
          <Label className="block font-medium">Animation Speed (s)</Label>
          <Slider
            value={[speed]}
            min={10}
            max={100}
            step={5}
            onValueChange={(val) => setSpeed(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {speed}s (slower values = slower animation)
          </div>
        </div>

        {/* Gap */}
        <div className="space-y-2">
          <Label className="block font-medium">Gap Size (rem)</Label>
          <Slider
            value={[gap]}
            min={0}
            max={2}
            step={0.1}
            onValueChange={(val) => setGap(val[0])}
          />
          <div className="text-sm text-muted-foreground">Current: {gap}rem</div>
        </div>

        {/* Repeat */}
        <div className="space-y-2">
          <Label className="block font-medium">Repetitions</Label>
          <Slider
            value={[repeat]}
            min={1}
            max={8}
            step={1}
            onValueChange={(val) => setRepeat(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {repeat}x
          </div>
        </div>

        {/* Item Settings */}
        {/* Background Color */}
        <div className="space-y-2">
          <Label className="block font-medium">Item Background</Label>
          <ColorPicker
            value={itemBgColor}
            onChange={setItemBgColor}
            showColorValueInInput={false}
          />
        </div>

        {/* Text Color */}
        <div className="space-y-2">
          <Label className="block font-medium">Item Text Color</Label>
          <ColorPicker
            value={itemTextColor}
            onChange={setItemTextColor}
            showColorValueInInput={false}
          />
        </div>

        {/* Border Radius */}
        <div className="space-y-2">
          <Label className="block font-medium">Item Border Radius</Label>
          <Slider
            value={[itemBorderRadius]}
            min={0}
            max={20}
            step={1}
            onValueChange={(val) => setItemBorderRadius(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {itemBorderRadius}px
          </div>
        </div>

        {/* Item Width */}
        <div className="space-y-2">
          <Label className="block font-medium">Item Width</Label>
          <Slider
            value={[itemWidth]}
            min={64}
            max={200}
            step={8}
            onValueChange={(val) => setItemWidth(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {itemWidth}px
          </div>
        </div>

        {/* Item Height */}
        <div className="space-y-2">
          <Label className="block font-medium">Item Height</Label>
          <Slider
            value={[itemHeight]}
            min={32}
            max={120}
            step={8}
            onValueChange={(val) => setItemHeight(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {itemHeight}px
          </div>
        </div>
      </div>

      {/* 3. Item Management */}
      <div className="space-y-4 pt-2">
        <Label className="block font-medium">Manage Items</Label>

        {/* Add new item */}
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item text"
            className="flex-1"
          />
          <Button onClick={handleAddItem} disabled={!newItem.trim()}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        {/* List of items */}
        <div className="border rounded-md divide-y">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2">
              <span>{item}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(index)}
                disabled={items.length <= 1}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Code Snippet */}
      <DynamicCodeBlock lang="tsx" code={codeSnippet} />
    </div>
  );
}
