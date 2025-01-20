"use client";
// button-customizer.tsx
"use client";

import React from "react";
import { useButtonStore } from "./button-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Card } from "@/components/ui/card";

const commonEmojis = [
  "👍",
  "🚀",
  "💡",
  "⭐",
  "🎉",
  "💪",
  "🔥",
  "❤️",
  "✨",
  "🌟",
];

export function ButtonCustomizer() {
  const {
    variant,
    size,
    roundness,
    bgColor,
    textColor,
    emoji,
    setVariant,
    setSize,
    setRoundness,
    setBgColor,
    setTextColor,
    setEmoji,
    resetCustomization,
  } = useButtonStore();

  const variants = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "ringHover",
    "linkHover",
    "expandIcon",
    "shine",
    "gooeyRight",
    "gooeyLeft",
  ];

  const sizes = ["default", "sm", "lg", "icon"];
  const roundnessOptions = [
    "rounded-none",
    "rounded-sm",
    "rounded-md",
    "rounded-lg",
    "rounded-full",
  ];

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Variant</Label>
            <Select value={variant} onValueChange={setVariant}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {variants.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Roundness</Label>
            <Select value={roundness} onValueChange={setRoundness}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roundnessOptions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-16"
              />
              <Input
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-16"
              />
              <Input
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Emoji</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {commonEmojis.map((e) => (
                <Button
                  key={e}
                  variant="outline"
                  size="sm"
                  onClick={() => setEmoji(e)}
                  className={`${emoji === e ? "ring-2 ring-primary" : ""}`}
                >
                  {e}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmoji("")}
                className={`${!emoji ? "ring-2 ring-primary" : ""}`}
              >
                None
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={resetCustomization}
        variant="outline"
        className="w-full mt-6"
      >
        Reset Customization
      </Button>
    </Card>
  );
}
