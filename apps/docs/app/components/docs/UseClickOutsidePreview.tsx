"use client";

import * as React from "react";
import { useClickOutside } from "@/registry/new-york/hooks/use-click-outside";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Label } from "@/registry/new-york/ui/label";
import { X } from "lucide-react";

export function ClickOutsidePreview() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  const handleClickOutside = React.useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      setClickCount((prev) => prev + 1);
    }
  }, [isOpen]);

  const ref = useClickOutside<HTMLDivElement>(handleClickOutside);

  return (
    <div className="space-y-4 not-prose">
      <div className="flex justify-center">
        <Button onClick={() => setIsOpen(true)} disabled={isOpen}>
          Open Popup
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <Card ref={ref} className="w-[300px] max-w-[90vw]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Click Outside Example</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-2 space-y-4">
              <p className="text-sm text-muted-foreground">
                Click outside this card to close it.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-center">
        <p className="text-sm">
          Outside clicks detected: <strong>{clickCount}</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {isOpen ? "Popup is open" : "Popup is closed"}
        </p>
      </div>
    </div>
  );
}

export function DropdownPreview() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) setIsOpen(false);
  });

  const menuItems = [
    { label: "Edit profile", action: () => console.log("Edit profile") },
    { label: "Settings", action: () => console.log("Settings") },
    { label: "Help", action: () => console.log("Help") },
    { label: "Sign out", action: () => console.log("Sign out") },
  ];

  return (
    <div className="flex flex-col items-center not-prose">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Menu {isOpen ? "▲" : "▼"}
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="mt-2 w-48 rounded-md border bg-card shadow-md"
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MultipleAreasPreview() {
  const [activeArea, setActiveArea] = React.useState<number | null>(null);

  // Create refs for each area
  const area1Ref = useClickOutside<HTMLDivElement>(() => {
    if (activeArea === 1) setActiveArea(null);
  });

  const area2Ref = useClickOutside<HTMLDivElement>(() => {
    if (activeArea === 2) setActiveArea(null);
  });

  return (
    <div className="grid grid-cols-2 gap-4 not-prose">
      <Card
        ref={area1Ref}
        className={`cursor-pointer transition ${
          activeArea === 1 ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => setActiveArea(1)}
      >
        <CardContent className="p-4 text-center">
          <Label className="text-lg">Area 1</Label>
          <p className="text-sm text-muted-foreground mt-2">
            {activeArea === 1
              ? "Active! Click outside to deselect."
              : "Click to activate"}
          </p>
        </CardContent>
      </Card>

      <Card
        ref={area2Ref}
        className={`cursor-pointer transition ${
          activeArea === 2 ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => setActiveArea(2)}
      >
        <CardContent className="p-4 text-center">
          <Label className="text-lg">Area 2</Label>
          <p className="text-sm text-muted-foreground mt-2">
            {activeArea === 2
              ? "Active! Click outside to deselect."
              : "Click to activate"}
          </p>
        </CardContent>
      </Card>

      <div className="col-span-2 text-center text-sm text-muted-foreground">
        {activeArea
          ? `Area ${activeArea} is active. Click outside to deselect.`
          : "Click on an area to activate it"}
      </div>
    </div>
  );
}
