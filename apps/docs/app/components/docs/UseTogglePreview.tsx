"use client";

import * as React from "react";
import { useToggle } from "@/registry/new-york/hooks/use-toggle";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Switch } from "@/registry/new-york/ui/switch";
import { Label } from "@/registry/new-york/ui/label";
import { Moon, Sun, EyeOff, Eye, Heart } from "lucide-react";

export function SimpleTogglePreview() {
  const [isOn, toggle] = useToggle(false);

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>Simple Toggle</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
          {isOn ? (
            <Sun className="h-10 w-10 text-primary" />
          ) : (
            <Moon className="h-10 w-10 text-muted-foreground" />
          )}
        </div>
        <p className="text-center text-lg">
          {isOn ? "Light Mode" : "Dark Mode"}
        </p>
        <Button onClick={() => toggle()}>
          {isOn ? "Turn Off" : "Turn On"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function MultiTogglePreview() {
  const [isActive, toggleActive] = useToggle(false);
  const [isVisible, toggleVisible] = useToggle(true);
  const [isFavorite, toggleFavorite] = useToggle(false);

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>Multiple Toggles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label htmlFor="active">Active Status</Label>
            <p className="text-sm text-muted-foreground">
              {isActive ? "Currently active" : "Currently inactive"}
            </p>
          </div>
          <Switch
            id="active"
            checked={isActive}
            onCheckedChange={toggleActive}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label htmlFor="visible">Visibility</Label>
            <p className="text-sm text-muted-foreground">
              {isVisible ? "Content is visible" : "Content is hidden"}
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={() => toggleVisible()}>
            {isVisible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label htmlFor="favorite">Favorite</Label>
            <p className="text-sm text-muted-foreground">
              {isFavorite ? "Added to favorites" : "Not in favorites"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite()}
            className={isFavorite ? "text-red-500 hover:text-red-600" : ""}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ToggleExamplesPreview() {
  return (
    <div className="not-prose grid gap-6 md:grid-cols-2">
      <SimpleTogglePreview />
      <MultiTogglePreview />
    </div>
  );
}

export function AccordionTogglePreview() {
  const [expandedSection, setExpandedSection] = React.useState<number | null>(
    null
  );

  const sections = [
    {
      id: 1,
      title: "What is React?",
      content:
        "React is a JavaScript library for building user interfaces. It lets you create reusable UI components and efficiently update the view when your data changes.",
    },
    {
      id: 2,
      title: "What are hooks?",
      content:
        "Hooks are functions that let you use state and other React features without writing a class. They were introduced in React 16.8 and have become the preferred way to write React components.",
    },
    {
      id: 3,
      title: "What is useToggle?",
      content:
        "useToggle is a custom hook that simplifies boolean state management. It provides an elegant API for toggling a boolean value on and off with a single function call.",
    },
  ];

  const toggleSection = (sectionId: number) => {
    setExpandedSection((current) => (current === sectionId ? null : sectionId));
  };

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>FAQ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-md overflow-hidden">
            <button
              className="w-full p-3 text-left flex items-center justify-between bg-muted/50 hover:bg-muted/70 font-medium"
              onClick={() => toggleSection(section.id)}
            >
              {section.title}
              <span>{expandedSection === section.id ? "−" : "+"}</span>
            </button>

            {expandedSection === section.id && (
              <div className="p-3">
                <p className="text-sm text-muted-foreground">
                  {section.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
