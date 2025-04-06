"use client";

import React, { useState } from "react";
import { Input } from "@/registry/new-york/ui/input";
import { Eye, EyeOff, Mail, Search, User, Calendar, Lock } from "lucide-react";
import { ColorPicker } from "@/registry/new-york/ui/color-picker";
import { Label } from "@/registry/new-york/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/registry/new-york/ui/switch";
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
  helperText,
  borderSize,
  borderColor,
  showIcon,
  iconPosition,
  iconSelection,
  showCharLimit,
  characterLimit,
  showValidation,
  validationRule,
  customPadding,
  paddingX,
  paddingY,
}: {
  inputType: string;
  placeholder: string;
  showPassword: boolean;
  ringSize: number;
  ringColor: string;
  borderRadius: number;
  helperText: string;
  borderSize: number;
  borderColor: string;
  showIcon: boolean;
  iconPosition: string;
  iconSelection: string;
  showCharLimit: boolean;
  characterLimit: number;
  showValidation: boolean;
  validationRule: string;
  customPadding: boolean;
  paddingX: number;
  paddingY: number;
}) {
  // Handle icon selection
  const iconMap: { [key: string]: string } = {
    user: '<User className="h-4 w-4" />',
    mail: '<Mail className="h-4 w-4" />',
    search: '<Search className="h-4 w-4" />',
    calendar: '<Calendar className="h-4 w-4" />',
    lock: '<Lock className="h-4 w-4" />',
    eye: '<Eye className="h-4 w-4" onClick={() => setShowPassword(!showPassword)} />',
    "eye-off":
      '<EyeOff className="h-4 w-4" onClick={() => setShowPassword(!showPassword)} />',
  };

  // Build style object entries
  const styleEntries = [];
  if (borderRadius !== 4) {
    styleEntries.push(`borderRadius: "${borderRadius}px"`);
  }
  if (ringSize > 0) {
    styleEntries.push(`boxShadow: "0 0 0 ${ringSize}px ${ringColor}"`);
  }
  if (borderSize > 0) {
    styleEntries.push(`borderWidth: "${borderSize}px"`);
    styleEntries.push(`borderColor: "${borderColor}"`);
  }
  if (customPadding) {
    styleEntries.push(`paddingLeft: "${paddingX}px"`);
    styleEntries.push(`paddingRight: "${paddingX}px"`);
    styleEntries.push(`paddingTop: "${paddingY}px"`);
    styleEntries.push(`paddingBottom: "${paddingY}px"`);
  }

  // Determine whether to show password hooks
  const showPasswordHook = inputType === "password" && showPassword;

  // Include imports for icons
  let imports = `import { Input } from "@/components/ui/input";\n`;

  if (showIcon) {
    if (
      iconSelection === "eye" ||
      iconSelection === "eye-off" ||
      inputType === "password"
    ) {
      imports += `import { Eye, EyeOff } from "lucide-react";\n`;
    } else {
      const capitalizedIcon =
        iconSelection.charAt(0).toUpperCase() + iconSelection.slice(1);
      imports += `import { ${capitalizedIcon} } from "lucide-react";\n`;
    }
  }

  // Start the component
  let code = `${imports}
export function CustomInput() {`;

  // Add state hooks if needed
  if (showPasswordHook) {
    code += `
  const [showPassword, setShowPassword] = useState(false);`;
  }

  if (showValidation) {
    code += `
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>();
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Validate based on the rule
    ${
      validationRule === "email"
        ? `if (!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(newValue) && newValue !== "") {
      setError("Please enter a valid email address");
    } else {
      setError(undefined);
    }`
        : validationRule === "required"
          ? `if (newValue === "") {
      setError("This field is required");
    } else {
      setError(undefined);
    }`
          : validationRule === "minLength"
            ? `if (newValue.length < 5 && newValue !== "") {
      setError("Must be at least 5 characters");
    } else {
      setError(undefined);
    }`
            : ``
    }
  };`;
  }

  // Return statement
  code += `
  return (
    <Input
      type="${inputType === "password" && !showPassword ? "password" : inputType}"
      placeholder="${placeholder}"`;

  // Add additional props
  if (helperText) {
    code += `
      helperText="${helperText}"`;
  }

  if (showValidation) {
    code += `
      value={value}
      onChange={handleChange}
      error={error}
      variant={error ? "error" : "default"}`;
  }

  if (showCharLimit) {
    code += `
      characterLimit={${characterLimit}}`;
  }

  if (showIcon) {
    if (iconPosition === "start") {
      code += `
      startIcon={${iconMap[iconSelection]}}`;
    } else {
      code += `
      endIcon={${
        iconSelection === "eye" && inputType === "password"
          ? `showPassword ? <EyeOff className="h-4 w-4" onClick={() => setShowPassword(false)} /> : <Eye className="h-4 w-4" onClick={() => setShowPassword(true)} />`
          : iconMap[iconSelection]
      }}`;
    }
  }

  // Style object
  if (styleEntries.length > 0) {
    code += `
      style={{
        ${styleEntries.join(",\n        ")}
      }}`;
  }

  // Close the component
  code += `
    />
  );
}`;

  return code;
}

export function InputSimplePreview() {
  return (
    <div className="space-y-4 max-w-md not-prose">
      <Input id="simple-input" type="text" placeholder="Enter your name" />
    </div>
  );
}

export function InputPasswordPreview() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="space-y-4 max-w-md not-prose">
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
    <div className="space-y-4 max-w-md not-prose">
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
  // Basic input settings
  const [inputType, setInputType] = useState("text");
  const [placeholder, setPlaceholder] = useState("Enter text...");
  const [helperText, setHelperText] = useState("");

  // Style settings
  const [borderRadius, setBorderRadius] = useState(4);
  const [ringSize, setRingSize] = useState(0);
  const [ringColor, setRingColor] = useState("#4f46e5"); // Tailwind indigo-600
  const [borderSize, setBorderSize] = useState(1);
  const [borderColor, setBorderColor] = useState("#e2e8f0"); // Tailwind slate-200
  const [customPadding, setCustomPadding] = useState(false);
  const [paddingX, setPaddingX] = useState(12);
  const [paddingY, setPaddingY] = useState(8);

  // Icon settings
  const [showIcon, setShowIcon] = useState(false);
  const [iconPosition, setIconPosition] = useState("end");
  const [iconSelection, setIconSelection] = useState("user");

  // Show password toggle for password type
  const [showPassword, setShowPassword] = useState(false);

  // Character limit settings
  const [showCharLimit, setShowCharLimit] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(50);

  // Validation settings
  const [showValidation, setShowValidation] = useState(false);
  const [validationRule, setValidationRule] = useState("email");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>();

  // Handle input change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (showValidation) {
      if (validationRule === "email") {
        if (
          !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newValue) &&
          newValue !== ""
        ) {
          setError("Please enter a valid email address");
        } else {
          setError(undefined);
        }
      } else if (validationRule === "required") {
        if (newValue === "") {
          setError("This field is required");
        } else {
          setError(undefined);
        }
      } else if (validationRule === "minLength") {
        if (newValue.length < 5 && newValue !== "") {
          setError("Must be at least 5 characters");
        } else {
          setError(undefined);
        }
      }
    }
  };

  // Generate icon components based on selection
  const getIconComponent = () => {
    switch (iconSelection) {
      case "user":
        return <User className="h-4 w-4" />;
      case "mail":
        return <Mail className="h-4 w-4" />;
      case "search":
        return <Search className="h-4 w-4" />;
      case "calendar":
        return <Calendar className="h-4 w-4" />;
      case "lock":
        return <Lock className="h-4 w-4" />;
      case "eye":
        return showPassword ? (
          <EyeOff
            className="h-4 w-4 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            className="h-4 w-4 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        );
      case "eye-off":
        return <EyeOff className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  // Build input style
  const inputStyle = {
    borderRadius: `${borderRadius}px`,
    boxShadow: ringSize > 0 ? `0 0 0 ${ringSize}px ${ringColor}` : undefined,
    borderWidth: `${borderSize}px`,
    borderColor: borderColor,
    ...(customPadding
      ? {
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
          paddingTop: `${paddingY}px`,
          paddingBottom: `${paddingY}px`,
        }
      : {}),
  };

  // Generate code snippet
  const codeSnippet = React.useMemo(() => {
    return getInputCodeSnippet({
      inputType,
      placeholder,
      showPassword,
      ringSize,
      ringColor,
      borderRadius,
      helperText,
      borderSize,
      borderColor,
      showIcon,
      iconPosition,
      iconSelection,
      showCharLimit,
      characterLimit,
      showValidation,
      validationRule,
      customPadding,
      paddingX,
      paddingY,
    });
  }, [
    inputType,
    placeholder,
    showPassword,
    ringSize,
    ringColor,
    borderRadius,
    helperText,
    borderSize,
    borderColor,
    showIcon,
    iconPosition,
    iconSelection,
    showCharLimit,
    characterLimit,
    showValidation,
    validationRule,
    customPadding,
    paddingX,
    paddingY,
  ]);

  return (
    <div className="space-y-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Customize Your Input</h2>

      {/* 1. Preview */}
      <div>
        <Label className="mb-2 block font-medium">Preview</Label>
        <Input
          type={
            inputType === "password" && !showPassword ? "password" : inputType
          }
          placeholder={placeholder}
          helperText={helperText || undefined}
          value={value}
          onChange={handleChange}
          error={error}
          variant={error ? "error" : "default"}
          characterLimit={showCharLimit ? characterLimit : undefined}
          startIcon={
            showIcon && iconPosition === "start"
              ? getIconComponent()
              : undefined
          }
          endIcon={
            showIcon && iconPosition === "end" ? getIconComponent() : undefined
          }
          style={inputStyle}
        />
      </div>

      {/* 2. Controls Grid */}
      <div className="grid grid-cols-3 gap-6 pt-4">
        {/* Input Type */}
        <div className="space-y-2">
          <Label className="block font-medium">Input Type</Label>
          <Select value={inputType} onValueChange={setInputType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="password">Password</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="tel">Telephone</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Placeholder */}
        <div className="space-y-2">
          <Label className="block font-medium">Placeholder</Label>
          <Input
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </div>

        {/* Helper Text */}
        <div className="space-y-2">
          <Label className="block font-medium">Helper Text</Label>
          <Input
            value={helperText}
            onChange={(e) => setHelperText(e.target.value)}
          />
        </div>

        {/* Show Icon */}
        <div className="space-y-2">
          <Label className="block font-medium">Show Icon</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={showIcon} onCheckedChange={setShowIcon} />
            <span>{showIcon ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Icon settings (only if showIcon is true) */}
        {showIcon && (
          <>
            {/* Icon Position */}
            <div className="space-y-2">
              <Label className="block font-medium">Icon Position</Label>
              <Select value={iconPosition} onValueChange={setIconPosition}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Icon Selection */}
            <div className="space-y-2">
              <Label className="block font-medium">Icon</Label>
              <Select value={iconSelection} onValueChange={setIconSelection}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="mail">Mail</SelectItem>
                  <SelectItem value="search">Search</SelectItem>
                  <SelectItem value="calendar">Calendar</SelectItem>
                  <SelectItem value="lock">Lock</SelectItem>
                  {inputType === "password" && (
                    <SelectItem value="eye">Eye (Toggle)</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Border Radius */}
        <div className="space-y-2">
          <Label className="block font-medium">Border Radius</Label>
          <Slider
            value={[borderRadius]}
            min={0}
            max={20}
            step={1}
            onValueChange={(val) => setBorderRadius(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {borderRadius}px
          </div>
        </div>

        {/* Border Size */}
        <div className="space-y-2">
          <Label className="block font-medium">Border Size</Label>
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
        </div>

        {/* Ring Size */}
        <div className="space-y-2">
          <Label className="block font-medium">Focus Ring Size</Label>
          <Slider
            value={[ringSize]}
            min={0}
            max={5}
            step={1}
            onValueChange={(val) => setRingSize(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {ringSize}px
          </div>
        </div>

        {/* Ring Color */}
        <div className="space-y-2">
          <Label className="block font-medium">Focus Ring Color</Label>
          <div className="flex items-center gap-2">
            <ColorPicker value={ringColor} onChange={setRingColor} />
            <Input
              value={ringColor}
              onChange={(e) => setRingColor(e.target.value)}
              placeholder="#RRGGBB"
              className="w-28"
            />
          </div>
        </div>

        {/* Custom Padding Toggle */}
        <div className="space-y-2">
          <Label className="block font-medium">Custom Padding</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={customPadding}
              onCheckedChange={setCustomPadding}
            />
            <span>{customPadding ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Custom padding controls (only if customPadding is true) */}
        {customPadding && (
          <>
            {/* Horizontal Padding */}
            <div className="space-y-2">
              <Label className="block font-medium">Horizontal Padding</Label>
              <Slider
                value={[paddingX]}
                min={0}
                max={24}
                step={2}
                onValueChange={(val) => setPaddingX(val[0])}
              />
              <div className="text-sm text-muted-foreground">
                Current: {paddingX}px
              </div>
            </div>

            {/* Vertical Padding */}
            <div className="space-y-2">
              <Label className="block font-medium">Vertical Padding</Label>
              <Slider
                value={[paddingY]}
                min={0}
                max={16}
                step={2}
                onValueChange={(val) => setPaddingY(val[0])}
              />
              <div className="text-sm text-muted-foreground">
                Current: {paddingY}px
              </div>
            </div>
          </>
        )}

        {/* Character Limit */}
        <div className="space-y-2">
          <Label className="block font-medium">Character Limit</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={showCharLimit}
              onCheckedChange={setShowCharLimit}
            />
            <span>{showCharLimit ? "Enabled" : "Disabled"}</span>
          </div>
        </div>

        {/* Character limit value (only if showCharLimit is true) */}
        {showCharLimit && (
          <div className="space-y-2">
            <Label className="block font-medium">Max Characters</Label>
            <Input
              type="number"
              value={characterLimit}
              onChange={(e) => setCharacterLimit(Number(e.target.value))}
              min={1}
              max={500}
            />
          </div>
        )}

        {/* Validation */}
        <div className="space-y-2">
          <Label className="block font-medium">Validation</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={showValidation}
              onCheckedChange={setShowValidation}
            />
            <span>{showValidation ? "Enabled" : "Disabled"}</span>
          </div>
        </div>

        {/* Validation rule (only if showValidation is true) */}
        {showValidation && (
          <div className="space-y-2">
            <Label className="block font-medium">Validation Rule</Label>
            <Select value={validationRule} onValueChange={setValidationRule}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select rule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="required">Required</SelectItem>
                <SelectItem value="minLength">Min Length (5)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* 3. Code Snippet */}
      <DynamicCodeBlock lang="tsx" code={codeSnippet} />
    </div>
  );
}
