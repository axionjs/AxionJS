"use client";

import React from "react";
import { FeatureIntensity } from "@/registry/new-york/lib/accessibility-store";
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york/ui/tabs";

interface AccessibilitySliderProps {
  value: FeatureIntensity;
  onChange: (value: FeatureIntensity) => void;
  label: string;
  icon: React.ReactNode;
}

export function AccessibilitySlider({
  value,
  onChange,
  label,
  icon,
}: AccessibilitySliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <Tabs
        value={value}
        onValueChange={(v) => onChange(v as FeatureIntensity)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="default" className="text-xs">
            Default
          </TabsTrigger>
          <TabsTrigger value="medium" className="text-xs">
            Medium
          </TabsTrigger>
          <TabsTrigger value="high" className="text-xs">
            High
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
