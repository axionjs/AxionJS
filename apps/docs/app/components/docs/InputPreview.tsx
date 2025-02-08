"use client";

import React from "react";
import { Input } from "@/registry/new-york/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { ColorPicker } from "@/app/components/ui/color-picker";
import { Label } from "@/app/components/ui/label";
import { Slider } from "@/app/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

/*
 * A helper to build the code snippet for the <Input> usage
 * based on the user's current settings.
 */
function getInputCodeSnippet({
  inputType,
  placeholder,
  showPassword,
  ringSize,
  ringColor,
  borderRadius,
}: {
  inputType: string;
  placeholder: string;
  showPassword: boolean;
  ringSize: number;
  ringColor: string;
  borderRadius: number;
}) {
  // We'll show inline styles for borderRadius & boxShadow only if non-default
  const borderRadiusLine =
    borderRadius !== 0 ? `borderRadius: "${borderRadius}px",` : "";
  const boxShadowLine =
    ringSize > 0 ? `boxShadow: "0 0 0 ${ringSize}px ${ringColor}",` : "";

  // If inputType is "password", mention Eye/EyeOff in the snippet comment
  const endIconLine =
    inputType === "password"
      ? `// endIcon={ showPassword ? <EyeOff /> : <Eye /> }`
      : `// endIcon={undefined}`;

  return `import { Input } from "@/app/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function MyInputExample() {
  return (
    <Input
      type="${inputType === "password" && !showPassword ? "password" : "text"}"
      placeholder="${placeholder}"
      ${endIconLine}
      style={{
        ${borderRadiusLine}
        ${boxShadowLine}
      }}
    />
  );
}
`;
}

export function InputSimplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <Input id="simple-input" type="text" placeholder="Enter your name" />
    </div>
  );
}

export function InputPasswordPreview() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="space-y-4 max-w-md">
      <Input
        id="password-input"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        endIcon={
          showPassword ? (
            <span
              onClick={() => setShowPassword(false)}
              className="cursor-pointer"
            >
              <EyeOff className="cursor-pointer size-4" />
            </span>
          ) : (
            <span
              onClick={() => setShowPassword(true)}
              className="cursor-pointer"
            >
              <Eye className="cursor-pointer size-4" />
            </span>
          )
        }
      />
    </div>
  );
}

export function InputErrorPreview() {
  return (
    <div className="space-y-4 max-w-md">
      <Input
        id="error-input"
        type="text"
        placeholder="Enter your email"
        variant="error"
        error="Invalid email address"
      />
    </div>
  );
}

/**
 * CustomizeInputPreview
 * A component that allows you to manipulate various style and behavior
 * properties of the Input (e.g., border-radius, ring size, type).
 */
export function CustomizeInputPreview() {
  const [borderRadius, setBorderRadius] = React.useState(4);
  const [ringSize, setRingSize] = React.useState(2);
  const [ringColor, setRingColor] = React.useState("#4f46e5"); // e.g., Tailwind indigo-600
  const [inputType, setInputType] = React.useState("text");
  const [showPassword, setShowPassword] = React.useState(false);

  // Resolve the actual <Input /> type if password is toggled
  const actualType =
    inputType === "password" && !showPassword ? "password" : "text";

  // Placeholder map
  const placeholderMap: { [key: string]: string } = {
    text: "Enter text...",
    email: "Enter your email...",
    password: "Enter your password...",
  };
  const placeholder = placeholderMap[inputType] ?? "Enter some input...";

  // endIcon for password scenario
  const endIcon =
    inputType === "password" ? (
      showPassword ? (
        <EyeOff
          className="cursor-pointer size-4"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <Eye
          className="cursor-pointer size-4"
          onClick={() => setShowPassword(true)}
        />
      )
    ) : undefined;

  // Build the code snippet
  const codeSnippet = React.useMemo(() => {
    return getInputCodeSnippet({
      inputType,
      placeholder,
      showPassword,
      ringSize,
      ringColor,
      borderRadius,
    });
  }, [inputType, placeholder, showPassword, ringSize, ringColor, borderRadius]);

  return (
    <div className="space-y-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Customize Your Input</h2>

      {/* 1. Preview */}
      <div>
        <label className="mb-2 block font-medium">Preview</label>
        <Input
          type={actualType}
          placeholder={placeholder}
          endIcon={endIcon}
          style={{
            borderRadius: `${borderRadius}px`,
            boxShadow:
              ringSize > 0 ? `0 0 0 ${ringSize}px ${ringColor}` : undefined,
          }}
        />
      </div>

      {/* 2. Controls */}
      <div className="space-y-4 pt-4">
        {/* Row 1 */}
        <div className="flex gap-6">
          {/* Input Type */}
          <div className="w-1/2">
            <label className="mb-2 block font-medium">Input Type</label>
            <Select value={inputType} onValueChange={setInputType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="password">Password</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ring Color */}
          <div className="space-y-2 w-1/2">
            <Label className="mb-2 block font-medium">Ring Color</Label>
            <ColorPicker
              value={ringColor}
              onChange={setRingColor}
              showColorValueInInput={false}
              className="w-full"
            />
            {/* Default Swatches */}
            <div className="flex items-center gap-2 mt-2">
              {["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"].map(
                (swatch) => (
                  <button
                    key={swatch}
                    type="button"
                    onClick={() => setRingColor(swatch)}
                    className="h-6 w-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: swatch }}
                    aria-label={`Select ${swatch} as ring color`}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-6">
          {/* Border Radius */}
          <div className="w-1/2">
            <label className="mb-2 block font-medium">Border Radius</label>
            <Slider
              value={[borderRadius]}
              min={0}
              max={16}
              step={1}
              onValueChange={(val) => setBorderRadius(val[0])}
            />
            <span className="text-sm text-muted-foreground">
              Current: {borderRadius}px
            </span>
          </div>

          {/* Ring Size */}
          <div className="w-1/2">
            <label className="mb-2 block font-medium">Ring Size</label>
            <Slider
              value={[ringSize]}
              min={0}
              max={4}
              step={1}
              onValueChange={(val) => setRingSize(val[0])}
            />
            <span className="text-sm text-muted-foreground">
              Current: {ringSize}px
            </span>
          </div>
        </div>
      </div>

      {/* 3. Code Snippet */}
      <DynamicCodeBlock lang="tsx" code={codeSnippet} />
    </div>
  );
}
