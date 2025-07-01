"use client";

import * as React from "react";
import { useFullscreen } from "@/registry/new-york/hooks/use-fullscreen";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import { Alert, AlertDescription } from "@/registry/new-york/ui/alert";

export function UseFullscreenPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { isFullscreen, isSupported, error, enter, exit, toggle } =
    useFullscreen({
      element: containerRef,
      onEnter: () => console.log("Entered fullscreen"),
      onExit: () => console.log("Exited fullscreen"),
    });

  return (
    <div>
      <div className="flex flex-col gap-4 not-prose">
        <div
          ref={containerRef}
          className={`border rounded-md overflow-hidden transition-all ${
            isFullscreen ? "fixed inset-0 z-50 bg-background" : "relative"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">Fullscreen Demo</h3>
            {isFullscreen && (
              <Button variant="outline" size="sm" onClick={exit}>
                Exit Fullscreen
              </Button>
            )}
          </div>
          <div className={`${isFullscreen ? "p-6" : "p-4"}`}>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Content Area</p>
                  <p className="text-sm text-muted-foreground">
                    This area will enter fullscreen mode
                  </p>
                </div>
                {!isFullscreen && (
                  <Button onClick={toggle}>
                    <ExpandIcon className="mr-2 h-4 w-4" />
                    Enter Fullscreen
                  </Button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Fullscreen Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={isSupported ? "default" : "destructive"}
                        >
                          {isSupported ? "Supported" : "Not Supported"}
                        </Badge>
                        <Badge variant={isFullscreen ? "default" : "outline"}>
                          {isFullscreen ? "Fullscreen" : "Normal"}
                        </Badge>
                      </div>
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Try it out</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">Use these buttons or press F11:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={enter}
                          disabled={isFullscreen || !isSupported}
                        >
                          Enter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={exit}
                          disabled={!isFullscreen}
                        >
                          Exit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={toggle}
                          disabled={!isSupported}
                        >
                          Toggle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {isFullscreen && (
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">
                    Additional Content in Fullscreen
                  </h3>
                  <p>
                    This content expands to fit the fullscreen mode. Note how
                    the UI adapts to the larger screen space. Images, videos,
                    and other media look great in fullscreen mode without
                    browser distractions.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-background border rounded-md p-4 flex flex-col items-center justify-center aspect-square"
                      >
                        <span className="text-2xl">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoFullscreenPreview() {
  const videoRef = React.useRef<HTMLDivElement>(null);

  const { isFullscreen, toggle } = useFullscreen({
    element: videoRef,
  });

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>Video Player with Fullscreen</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={videoRef}
          className={`relative overflow-hidden rounded-md bg-black ${
            isFullscreen ? "fixed inset-0 z-50" : "aspect-video"
          }`}
        >
          {/* Placeholder for video content */}
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <PlayIcon className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Video Player Demo</p>
              <p className="text-sm text-white/70">(Simulated content)</p>
            </div>
          </div>

          {/* Video controls overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white"
                >
                  <PlayIcon className="h-4 w-4" />
                </Button>
                <div className="bg-white/30 h-1 w-32 sm:w-64 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-1/3 rounded-full"></div>
                </div>
                <span className="text-white text-xs">1:23 / 3:45</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white"
                  onClick={toggle}
                >
                  {isFullscreen ? (
                    <MinimizeIcon className="h-4 w-4" />
                  ) : (
                    <ExpandIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Click the expand icon or anywhere on the video to toggle fullscreen
          mode
        </p>
      </CardFooter>
    </Card>
  );
}

export function ImageGalleryFullscreenPreview() {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);
  const galleryRef = React.useRef<HTMLDivElement>(null);

  const { isFullscreen, enter, exit } = useFullscreen({
    element: galleryRef,
  });

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    enter();
  };

  const handleClose = () => {
    exit();
    setTimeout(() => setSelectedImage(null), 300);
  };

  // Simulated gallery images
  const images = [
    { color: "#4A90E2", label: "Blue Image" },
    { color: "#50E3C2", label: "Teal Image" },
    { color: "#F5A623", label: "Yellow Image" },
    { color: "#D0021B", label: "Red Image" },
    { color: "#7ED321", label: "Green Image" },
    { color: "#9013FE", label: "Purple Image" },
  ];

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>Fullscreen Image Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedImage !== null && (
          <div
            ref={galleryRef}
            className={`${
              isFullscreen
                ? "fixed inset-0 z-50 bg-background flex flex-col"
                : "hidden"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">
                Image {selectedImage + 1} of {images.length}
              </h3>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <div
                className="w-full h-full max-w-4xl rounded-md flex items-center justify-center"
                style={{ backgroundColor: images[selectedImage].color }}
              >
                <span className="text-white text-xl font-medium">
                  {images[selectedImage].label}
                </span>
              </div>
            </div>
            <div className="p-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === 0 ? images.length - 1 : prev! - 1
                  )
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === images.length - 1 ? 0 : prev! + 1
                  )
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-md cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center"
              style={{ backgroundColor: image.color }}
              onClick={() => handleImageClick(index)}
            >
              <ExpandIcon className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Click any image to view it in fullscreen mode
        </p>
      </CardFooter>
    </Card>
  );
}

// Icons
function ExpandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function MinimizeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="14" x2="21" y2="21" />
      <line x1="3" y1="3" x2="10" y2="10" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
