"use client";

import * as React from "react";
import { useKeyboard } from "@/registry/new-york/hooks/use-keyboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import { Switch } from "@/registry/new-york/ui/switch";
import { Label } from "@/registry/new-york/ui/label";

export function KeyboardPreview() {
  const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);
  const [lastKey, setLastKey] = React.useState<string | null>(null);
  const [isEnabled, setIsEnabled] = React.useState(true);

  // Clear pressed keys after a delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPressedKeys([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pressedKeys]);

  // Setup keyboard handlers
  useKeyboard(
    {
      arrowup: (e) => {
        e.preventDefault();
        setLastKey("↑");
        setPressedKeys((prev) => [...prev, "↑"]);
      },
      arrowdown: (e) => {
        e.preventDefault();
        setLastKey("↓");
        setPressedKeys((prev) => [...prev, "↓"]);
      },
      arrowleft: (e) => {
        e.preventDefault();
        setLastKey("←");
        setPressedKeys((prev) => [...prev, "←"]);
      },
      arrowright: (e) => {
        e.preventDefault();
        setLastKey("→");
        setPressedKeys((prev) => [...prev, "→"]);
      },
      space: (e) => {
        e.preventDefault();
        setLastKey("Space");
        setPressedKeys((prev) => [...prev, "Space"]);
      },
      enter: (e) => {
        e.preventDefault();
        setLastKey("Enter");
        setPressedKeys((prev) => [...prev, "Enter"]);
      },
    },
    { enabled: isEnabled }
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Keyboard Demo</CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
          <Label htmlFor="airplane-mode" className="text-sm">
            {isEnabled ? "Enabled" : "Disabled"}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 p-4 text-center">
          <p className="text-sm font-medium">
            Press arrow keys, space, or enter
          </p>
        </div>
        <div className="h-[200px] flex flex-col items-center justify-center p-4">
          {lastKey ? (
            <div className="text-4xl font-bold animate-bounce">{lastKey}</div>
          ) : (
            <div className="text-muted-foreground">
              Waiting for keyboard input...
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {pressedKeys.map((key, index) => (
              <Badge key={index} variant="outline">
                {key}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function GameControlsPreview() {
  const [position, setPosition] = React.useState({ x: 50, y: 50 });
  const [size, setSize] = React.useState(30);
  const squareSize = Math.max(20, Math.min(60, size));
  const speed = 5;

  useKeyboard({
    arrowup: (e) => {
      e.preventDefault();
      setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - speed) }));
    },
    arrowdown: (e) => {
      e.preventDefault();
      setPosition((prev) => ({ ...prev, y: Math.min(100, prev.y + speed) }));
    },
    arrowleft: (e) => {
      e.preventDefault();
      setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - speed) }));
    },
    arrowright: (e) => {
      e.preventDefault();
      setPosition((prev) => ({ ...prev, x: Math.min(100, prev.x + speed) }));
    },
    plus: (e) => {
      e.preventDefault();
      setSize((prev) => Math.min(60, prev + 2));
    },
    minus: (e) => {
      e.preventDefault();
      setSize((prev) => Math.max(20, prev - 2));
    },
    "+": (e) => {
      e.preventDefault();
      setSize((prev) => Math.min(60, prev + 2));
    },
    "-": (e) => {
      e.preventDefault();
      setSize((prev) => Math.max(20, prev - 2));
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Game Controls Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative border rounded-md bg-muted/30 w-full h-[300px] overflow-hidden">
          <div
            className="absolute bg-primary rounded-md transition-all duration-100"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              transform: "translate(-50%, -50%)",
            }}
          />

          <div className="absolute bottom-2 left-2 right-2 bg-black/10 backdrop-blur-sm rounded-md p-2 text-xs">
            <p>Use arrow keys to move the square</p>
            <p>Use +/- keys to resize</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
