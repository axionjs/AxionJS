"use client";

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { Label } from "@/registry/new-york/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/registry/new-york/ui/switch";
import { Button } from "@/registry/new-york/ui/button";
import ColorPicker from "@/components/ui/color-picker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

// Always show skeleton
export function AlwaysSkeletonPreview() {
  return (
    <div className="flex flex-col items-start space-y-6 not-prose">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

// Skeleton with content loading after 2 seconds
export function TimedSkeletonPreview() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000); // Show content after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center space-x-4 not-prose">
      {loaded ? (
        <>
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            🧑
          </div>
          <div>
            <p className="text-lg font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </>
      ) : (
        <>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Helper function to generate code snippet for skeleton
 */
function getSkeletonCodeSnippet({
  pulseAnimation,
  color,
  borderRadius,
  skeletonType,
  showText,
  textCount,
  showImage,
  imageAspectRatio,
  roundedImage,
  showAvatar,
  avatarSize,
  loadingTime,
}: {
  pulseAnimation: boolean;
  color: string;
  borderRadius: number;
  skeletonType: string;
  showText: boolean;
  textCount: number;
  showImage: boolean;
  imageAspectRatio: string;
  roundedImage: boolean;
  showAvatar: boolean;
  avatarSize: number;
  loadingTime: number;
}) {
  const animationClass = pulseAnimation ? "animate-pulse" : "";

  // Calculate aspect ratios for image
  let aspectRatioClass = "";
  switch (imageAspectRatio) {
    case "square":
      aspectRatioClass = "aspect-square";
      break;
    case "video":
      aspectRatioClass = "aspect-video";
      break;
    case "landscape":
      aspectRatioClass = "aspect-[3/2]";
      break;
    case "portrait":
      aspectRatioClass = "aspect-[2/3]";
      break;
    default:
      aspectRatioClass = "aspect-square";
  }

  // Round the image if selected
  const imageRadiusClass = roundedImage ? "rounded-md" : "";

  // Generate avatar styles
  const avatarStyle = showAvatar
    ? `
        <Skeleton 
          className="${animationClass} h-${avatarSize} w-${avatarSize} rounded-full" 
          style={{ backgroundColor: "${color}", borderRadius: "${borderRadius}px" }}
        />`
    : "";

  // Generate image styles
  const imageStyle = showImage
    ? `
        <Skeleton 
          className="${animationClass} ${aspectRatioClass} w-full ${imageRadiusClass}" 
          style={{ backgroundColor: "${color}", borderRadius: "${borderRadius}px" }}
        />`
    : "";

  // Generate text skeletons based on count
  let textSkeletons = "";
  if (showText) {
    textSkeletons = Array(textCount)
      .fill(0)
      .map((_, i) => {
        const width = i === 0 ? "w-full" : `w-[${85 - i * 10}%]`;
        return `        <Skeleton 
          className="${animationClass} h-4 ${width} my-2" 
          style={{ backgroundColor: "${color}", borderRadius: "${borderRadius}px" }}
        />`;
      })
      .join("\n");
  }

  // Generate different layout snippets based on type
  let snippetContent = "";

  if (skeletonType === "card") {
    snippetContent = `
  return (
    <div className="border rounded-lg p-4 max-w-sm">
      ${imageStyle}
      <div className="mt-3 space-y-2">
${textSkeletons}
      </div>
    </div>
  );`;
  } else if (skeletonType === "list") {
    snippetContent = `
  return (
    <div className="max-w-md space-y-4">
      {Array(3).fill(0).map((_, index) => (
        <div key={index} className="flex items-start space-x-4">
          ${avatarStyle}
          <div className="space-y-2 flex-1">
${textSkeletons}
          </div>
        </div>
      ))}
    </div>
  );`;
  } else if (skeletonType === "profile") {
    snippetContent = `
  return (
    <div className="flex items-center space-x-4">
      ${avatarStyle}
      <div className="space-y-2">
${textSkeletons}
      </div>
    </div>
  );`;
  } else if (skeletonType === "feed") {
    snippetContent = `
  return (
    <div className="max-w-md space-y-6">
      {Array(2).fill(0).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center space-x-4">
            ${avatarStyle}
            <div className="space-y-2">
              <Skeleton 
                className="${animationClass} h-4 w-[140px]" 
                style={{ backgroundColor: "${color}", borderRadius: "${borderRadius}px" }}
              />
              <Skeleton 
                className="${animationClass} h-3 w-[100px]" 
                style={{ backgroundColor: "${color}", borderRadius: "${borderRadius}px" }}
              />
            </div>
          </div>
          ${imageStyle}
          <div className="space-y-2">
${textSkeletons}
          </div>
        </div>
      ))}
    </div>
  );`;
  }

  // Return full component with optional loading delay
  if (loadingTime > 0) {
    return `import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function CustomSkeleton() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), ${loadingTime});
    return () => clearTimeout(timer);
  }, []);
  
  if (loaded) {
    return (
      <div className="loaded-content">
        {/* Your actual content here */}
        <p>Content loaded!</p>
      </div>
    );
  }
${snippetContent}
}`;
  } else {
    return `import { Skeleton } from "@/components/ui/skeleton";

export function CustomSkeleton() {${snippetContent}
}`;
  }
}

export function CustomizeSkeletonPreview() {
  // Animation settings
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [color, setColor] = useState("#e5e7eb"); // gray-200
  const [borderRadius, setBorderRadius] = useState(4);

  // Content settings
  const [skeletonType, setSkeletonType] = useState("card");
  const [showText, setShowText] = useState(true);
  const [textCount, setTextCount] = useState(3);
  const [showImage, setShowImage] = useState(true);
  const [imageAspectRatio, setImageAspectRatio] = useState("video");
  const [roundedImage, setRoundedImage] = useState(true);
  const [showAvatar, setShowAvatar] = useState(false);
  const [avatarSize, setAvatarSize] = useState(12); // h-12 w-12

  // Loading time settings
  const [loadingTime, setLoadingTime] = useState(0);
  const [showLoadedState, setShowLoadedState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loaded state when settings change
  useEffect(() => {
    if (showLoadedState && loadingTime > 0) {
      setIsLoaded(false);
      const timer = setTimeout(() => setIsLoaded(true), loadingTime);
      return () => clearTimeout(timer);
    }
  }, [
    showLoadedState,
    loadingTime,
    pulseAnimation,
    borderRadius,
    skeletonType,
    showText,
    textCount,
    showImage,
    imageAspectRatio,
    roundedImage,
    showAvatar,
    avatarSize,
  ]);

  // Toggle show loaded content
  const handleToggleLoaded = () => {
    setIsLoaded(!isLoaded);
  };

  // Generate code snippet
  const codeSnippet = React.useMemo(() => {
    return getSkeletonCodeSnippet({
      pulseAnimation,
      borderRadius,
      skeletonType,
      showText,
      textCount,
      showImage,
      imageAspectRatio,
      roundedImage,
      showAvatar,
      avatarSize,
      loadingTime: showLoadedState ? loadingTime : 0,
    });
  }, [
    pulseAnimation,
    borderRadius,
    skeletonType,
    showText,
    textCount,
    showImage,
    imageAspectRatio,
    roundedImage,
    showAvatar,
    avatarSize,
    showLoadedState,
    loadingTime,
  ]);

  // Aspect ratio classes
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    landscape: "aspect-[3/2]",
    portrait: "aspect-[2/3]",
  }[imageAspectRatio];

  // Custom skeleton component
  const CustomSkeleton = ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <Skeleton
      className={`${pulseAnimation ? "animate-pulse" : ""} ${className}`}
      style={{ borderRadius: `${borderRadius}px` }}
      {...props}
    />
  );

  // Generate skeleton based on type
  const renderSkeleton = () => {
    if (isLoaded && showLoadedState) {
      return (
        <div className="border rounded-lg p-4 max-w-sm">
          <div className="font-semibold text-lg">Content Loaded!</div>
          <p className="text-sm text-muted-foreground mt-2">
            This represents your actual content that appears after loading.
          </p>
        </div>
      );
    }

    switch (skeletonType) {
      case "card":
        return (
          <div className="border rounded-lg p-4 max-w-sm">
            {showImage && (
              <CustomSkeleton
                className={`${aspectRatioClass} w-full ${roundedImage ? "rounded-md" : ""}`}
              />
            )}
            {showText && (
              <div className="mt-3 space-y-2">
                {Array(textCount)
                  .fill(0)
                  .map((_, i) => (
                    <CustomSkeleton
                      key={i}
                      className={`h-4 ${i === 0 ? "w-full" : `w-[${85 - i * 10}%]`}`}
                    />
                  ))}
              </div>
            )}
          </div>
        );
      case "list":
        return (
          <div className="max-w-md space-y-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-start space-x-4">
                  {showAvatar && (
                    <CustomSkeleton
                      className={`h-${avatarSize} w-${avatarSize} rounded-full`}
                    />
                  )}
                  {showText && (
                    <div className="space-y-2 flex-1">
                      {Array(textCount)
                        .fill(0)
                        .map((_, i) => (
                          <CustomSkeleton
                            key={i}
                            className={`h-4 ${i === 0 ? "w-full" : `w-[${85 - i * 10}%]`}`}
                          />
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        );
      case "profile":
        return (
          <div className="flex items-center space-x-4">
            {showAvatar && (
              <CustomSkeleton
                className={`h-${avatarSize} w-${avatarSize} rounded-full`}
              />
            )}
            {showText && (
              <div className="space-y-2">
                {Array(textCount)
                  .fill(0)
                  .map((_, i) => (
                    <CustomSkeleton
                      key={i}
                      className={`h-4 ${i === 0 ? "w-[250px]" : `w-[${200 - i * 20}px]`}`}
                    />
                  ))}
              </div>
            )}
          </div>
        );
      case "feed":
        return (
          <div className="max-w-md space-y-6">
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {showAvatar && (
                      <CustomSkeleton
                        className={`h-${avatarSize} w-${avatarSize} rounded-full`}
                      />
                    )}
                    <div className="space-y-2">
                      <CustomSkeleton className="h-4 w-[140px]" />
                      <CustomSkeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                  {showImage && (
                    <CustomSkeleton
                      className={`${aspectRatioClass} w-full ${roundedImage ? "rounded-md" : ""}`}
                    />
                  )}
                  {showText && (
                    <div className="space-y-2">
                      {Array(textCount)
                        .fill(0)
                        .map((_, i) => (
                          <CustomSkeleton
                            key={i}
                            className={`h-4 ${i === 0 ? "w-full" : `w-[${85 - i * 10}%]`}`}
                          />
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        );
      default:
        return <CustomSkeleton className="h-16 w-full" />;
    }
  };

  return (
    <div className="space-y-6 p-4 border rounded-md">
      <h2 className="text-xl font-semibold">Customize Your Skeleton</h2>

      {/* 1. Preview */}
      <div>
        <Label className="mb-2 block font-medium">Preview</Label>
        <div className="bg-background border rounded-md p-6">
          {renderSkeleton()}

          {showLoadedState && (
            <div className="mt-4">
              <Button onClick={handleToggleLoaded}>
                {isLoaded ? "Show Skeleton" : "Show Loaded Content"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Controls Grid */}
      <div className="grid grid-cols-3 gap-6 pt-4">
        {/* Animation settings */}
        <div className="space-y-2">
          <Label className="block font-medium">Pulse Animation</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={pulseAnimation}
              onCheckedChange={setPulseAnimation}
            />
            <span>{pulseAnimation ? "Enabled" : "Disabled"}</span>
          </div>
        </div>

        {/* Border Radius */}
        <div className="space-y-2">
          <Label className="block font-medium">Border Radius</Label>
          <Slider
            value={[borderRadius]}
            min={0}
            max={16}
            step={1}
            onValueChange={(val) => setBorderRadius(val[0])}
          />
          <div className="text-sm text-muted-foreground">
            Current: {borderRadius}px
          </div>
        </div>

        {/* Skeleton Type */}
        <div className="space-y-2">
          <Label className="block font-medium">Skeleton Type</Label>
          <Select value={skeletonType} onValueChange={setSkeletonType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="list">List</SelectItem>
              <SelectItem value="profile">Profile</SelectItem>
              <SelectItem value="feed">Feed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Show Text */}
        <div className="space-y-2">
          <Label className="block font-medium">Show Text Lines</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={showText} onCheckedChange={setShowText} />
            <span>{showText ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Text Count (only if showText is true) */}
        {showText && (
          <div className="space-y-2">
            <Label className="block font-medium">Text Line Count</Label>
            <Slider
              value={[textCount]}
              min={1}
              max={5}
              step={1}
              onValueChange={(val) => setTextCount(val[0])}
            />
            <div className="text-sm text-muted-foreground">
              Current: {textCount} lines
            </div>
          </div>
        )}

        {/* Show Image */}
        <div className="space-y-2">
          <Label className="block font-medium">Show Image</Label>
          <div className="flex items-center space-x-2">
            <Switch checked={showImage} onCheckedChange={setShowImage} />
            <span>{showImage ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Image settings (only if showImage is true) */}
        {showImage && (
          <>
            {/* Image Aspect Ratio */}
            <div className="space-y-2">
              <Label className="block font-medium">Image Aspect Ratio</Label>
              <Select
                value={imageAspectRatio}
                onValueChange={setImageAspectRatio}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square (1:1)</SelectItem>
                  <SelectItem value="video">Video (16:9)</SelectItem>
                  <SelectItem value="landscape">Landscape (3:2)</SelectItem>
                  <SelectItem value="portrait">Portrait (2:3)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rounded Image */}
            <div className="space-y-2">
              <Label className="block font-medium">Rounded Image</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={roundedImage}
                  onCheckedChange={setRoundedImage}
                />
                <span>{roundedImage ? "Yes" : "No"}</span>
              </div>
            </div>
          </>
        )}

        {/* Show Avatar (for Profile and List layouts) */}
        {(skeletonType === "profile" ||
          skeletonType === "list" ||
          skeletonType === "feed") && (
          <div className="space-y-2">
            <Label className="block font-medium">Show Avatar</Label>
            <div className="flex items-center space-x-2">
              <Switch checked={showAvatar} onCheckedChange={setShowAvatar} />
              <span>{showAvatar ? "Yes" : "No"}</span>
            </div>
          </div>
        )}

        {/* Avatar settings (only if showAvatar is true) */}
        {showAvatar &&
          (skeletonType === "profile" ||
            skeletonType === "list" ||
            skeletonType === "feed") && (
            <div className="space-y-2">
              <Label className="block font-medium">Avatar Size</Label>
              <Select
                value={String(avatarSize)}
                onValueChange={(val) => setAvatarSize(Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">Small (h-8)</SelectItem>
                  <SelectItem value="12">Medium (h-12)</SelectItem>
                  <SelectItem value="16">Large (h-16)</SelectItem>
                  <SelectItem value="20">Extra Large (h-20)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

        {/* Loading state toggle */}
        <div className="space-y-2">
          <Label className="block font-medium">Show Loaded State</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={showLoadedState}
              onCheckedChange={setShowLoadedState}
            />
            <span>{showLoadedState ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Loading time (only if showLoadedState is true) */}
        {showLoadedState && (
          <div className="space-y-2">
            <Label className="block font-medium">Loading Time (ms)</Label>
            <Slider
              value={[loadingTime]}
              min={500}
              max={5000}
              step={500}
              onValueChange={(val) => setLoadingTime(val[0])}
            />
            <div className="text-sm text-muted-foreground">
              Current: {loadingTime}ms
            </div>
          </div>
        )}
      </div>

      {/* 3. Code Snippet */}
      <DynamicCodeBlock lang="tsx" code={codeSnippet} />
    </div>
  );
}
