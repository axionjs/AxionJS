"use client";

import * as React from "react";
import { useLocalStorage } from "@/registry/new-york/hooks/use-local-storage";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";

export function SimpleLocalStoragePreview() {
  const [name, setName] = useLocalStorage<string>("demo-name", "");
  const [count, setCount] = useLocalStorage<number>("demo-count", 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Local Storage Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <p className="text-sm text-muted-foreground">
            {name ? `Hello, ${name}!` : "Enter your name above"}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Counter</Label>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount(count - 1)}
            >
              -
            </Button>
            <span className="text-2xl font-bold">{count}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount(count + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-muted-foreground">
            Refresh the page and your values will persist!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ThemeLocalStoragePreview() {
  type Theme = "light" | "dark" | "system";

  const [theme, setTheme] = useLocalStorage<Theme>(
    "theme-preference",
    "system"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2">
            Current theme: <strong>{theme}</strong>
          </p>
          <div className="flex space-x-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
            >
              Light
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
            >
              Dark
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("system")}
            >
              System
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Your theme preference will be remembered when you return.
        </p>
      </CardContent>
    </Card>
  );
}

export function FormLocalStoragePreview() {
  interface FormData {
    email: string;
    remember: boolean;
  }

  const [formData, setFormData] = useLocalStorage<FormData>("saved-form", {
    email: "",
    remember: false,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const clearForm = () => {
    setFormData({
      email: "",
      remember: false,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Form State</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={(e) => updateField("remember", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" size="sm" onClick={clearForm}>
            Clear Form
          </Button>
          <Button size="sm">Submit</Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Form state is automatically saved to localStorage.
        </p>
      </CardContent>
    </Card>
  );
}

export function LocalStorageExamplesPreview() {
  return (
    <Tabs defaultValue="simple">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="simple">Simple</TabsTrigger>
        <TabsTrigger value="theme">Theme</TabsTrigger>
        <TabsTrigger value="form">Form</TabsTrigger>
      </TabsList>
      <div className="mt-4">
        <TabsContent value="simple">
          <SimpleLocalStoragePreview />
        </TabsContent>
        <TabsContent value="theme">
          <ThemeLocalStoragePreview />
        </TabsContent>
        <TabsContent value="form">
          <FormLocalStoragePreview />
        </TabsContent>
      </div>
    </Tabs>
  );
}
