"use client";

import React from "react";
import { Flex } from "@/registry/new-york/ui/flex";
import { Button } from "@/registry/new-york/ui/button";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";

// Basic Flex examples
export function DefaultFlexPreview() {
  return (
    <div className="not-prose">
      <Flex className="w-full border rounded-md bg-background p-6" gap="md">
        <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
          1
        </div>
        <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
          2
        </div>
        <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
          3
        </div>
      </Flex>
    </div>
  );
}

export function AdvancedFlexPreview() {
  return (
    <div className="not-prose">
      <Flex
        direction="column"
        align="center"
        justify="between"
        gap="md"
        className="w-full border rounded-md bg-background p-6 h-72"
      >
        <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
          A
        </div>
        <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
          B
        </div>
        <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
          C
        </div>
      </Flex>
    </div>
  );
}

// Responsive Flex examples
export function ResponsiveFlexPreview() {
  return (
    <div className="not-prose">
      <Flex
        direction="column"
        gap="md"
        wrap="true"
        className="w-full border rounded-md bg-background p-6 md:flex-row"
      >
        <div className="w-full sm:w-1/2 md:w-1/3 h-28 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
          Card 1
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 h-28 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
          Card 2
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 h-28 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
          Card 3
        </div>
      </Flex>
    </div>
  );
}

// Flex Grid Layout with equal columns
export function FlexGridPreview() {
  return (
    <div className="not-prose">
      <Flex
        direction="row"
        wrap="true"
        gap="md"
        className="w-full border rounded-md bg-background p-6"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-[calc(33.333%-16px)] h-20 rounded-md bg-muted flex items-center justify-center text-muted-foreground font-medium"
          >
            Item {i + 1}
          </div>
        ))}
      </Flex>
    </div>
  );
}

// Navigation Example
export function NavigationPreview() {
  return (
    <div className="not-prose">
      <Flex
        align="center"
        justify="between"
        className="w-full rounded-md bg-card p-4 border"
      >
        <div className="text-xl font-bold text-foreground">Brand</div>

        <Flex gap="md" className="hidden sm:flex">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Home
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Pricing
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            About
          </a>
        </Flex>

        <Button variant="outline" className="sm:hidden" size="sm">
          Menu
        </Button>
      </Flex>
    </div>
  );
}

// Card Example
export function CardPreview() {
  return (
    <div className="not-prose">
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description and content layout</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="column" gap="md">
            <div className="rounded-md bg-muted aspect-video flex items-center justify-center text-muted-foreground">
              Image
            </div>
            <p className="text-sm text-muted-foreground">
              This card uses Flex for layout. All content is structured with the
              Flex component for proper spacing and alignment.
            </p>
          </Flex>
        </CardContent>
        <CardFooter className="pt-3">
          <Flex justify="between" className="w-full">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Submit</Button>
          </Flex>
        </CardFooter>
      </Card>
    </div>
  );
}

// Message Component
export function ChatPreview() {
  return (
    <div className="not-prose">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Recent conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="column" gap="md">
            {[1, 2, 3].map((i) => (
              <Flex
                key={i}
                gap="sm"
                align="start"
                className="pb-3 border-b last:border-0 last:pb-0"
              >
                <Avatar>
                  <AvatarImage src={`/api/placeholder/32/32`} />
                  <AvatarFallback className="bg-primary text-primary-foreground">{`U${i}`}</AvatarFallback>
                </Avatar>
                <Flex direction="column" gap="xs" className="flex-1 min-w-0">
                  <Flex justify="between" align="center">
                    <div className="font-medium text-foreground truncate">
                      User {i}
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {i * 5}m ago
                    </div>
                  </Flex>
                  <div className="text-sm text-muted-foreground truncate">
                    This is a message preview that demonstrates how to use Flex
                    for chat interfaces
                  </div>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </CardContent>
      </Card>
    </div>
  );
}

// Dashboard Stats Preview
export function StatsPreview() {
  return (
    <div className="not-prose">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Your stats for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex wrap="true" gap="md">
            {[
              { label: "Total Revenue", value: "$45,231.89", delta: "+20.1%" },
              { label: "Subscriptions", value: "2,350", delta: "+12.3%" },
              { label: "Active Users", value: "1,294", delta: "+8.2%" },
              { label: "Conversion Rate", value: "3.8%", delta: "+1.4%" },
            ].map((stat, i) => (
              <Card key={i} className="flex-1 min-w-[240px]">
                <CardContent className="p-6">
                  <Flex direction="column" gap="sm">
                    <div className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <Badge
                      variant="outline"
                      className="w-fit text-emerald-500 border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800"
                    >
                      {stat.delta}
                    </Badge>
                  </Flex>
                </CardContent>
              </Card>
            ))}
          </Flex>
        </CardContent>
      </Card>
    </div>
  );
}

// Holy Grail Layout with Flex
export function HolyGrailLayout() {
  return (
    <div className="not-prose">
      <Flex
        direction="column"
        className="border rounded-md overflow-hidden bg-background"
        style={{ height: "450px" }}
      >
        {/* Header */}
        <div className="bg-card border-b p-4 font-medium">Header</div>

        {/* Main content area with sidebar */}
        <Flex className="flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="bg-muted p-4 w-60 border-r hidden md:block">
            <Flex direction="column" gap="sm">
              <div className="p-2 rounded-md bg-muted-foreground/10 font-medium">
                Dashboard
              </div>
              <div className="p-2 rounded-md text-muted-foreground">
                Settings
              </div>
              <div className="p-2 rounded-md text-muted-foreground">
                Analytics
              </div>
              <div className="p-2 rounded-md text-muted-foreground">
                Reports
              </div>
            </Flex>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 bg-background overflow-auto">
            <h3 className="text-xl font-semibold mb-4">Main Content</h3>
            <p className="text-muted-foreground mb-6">
              This is a classic "Holy Grail" layout with a header, footer, main
              content area, and fixed-width sidebars.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-4">
                  <CardContent className="p-0">Card {i}</CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="bg-muted p-4 w-60 border-l hidden lg:block">
            <Flex direction="column" gap="md">
              <div className="font-medium">Activity</div>
              <Flex direction="column" gap="sm">
                <div className="text-sm text-muted-foreground">
                  User login at 09:32 AM
                </div>
                <div className="text-sm text-muted-foreground">
                  Project updated at 08:15 AM
                </div>
                <div className="text-sm text-muted-foreground">
                  Settings changed at 07:44 AM
                </div>
              </Flex>
            </Flex>
          </div>
        </Flex>

        {/* Footer */}
        <div className="bg-card border-t p-4 text-sm text-center text-muted-foreground">
          Footer
        </div>
      </Flex>
    </div>
  );
}

// Form Example
export function FormPreview() {
  return (
    <div className="not-prose">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Get in touch with our team</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="column" gap="md">
            <Flex direction="column" gap="sm">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </Flex>

            <Flex direction="column" gap="sm">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </Flex>

            <Flex gap="md" className="w-full" wrap="true">
              <Flex
                direction="column"
                gap="sm"
                className="flex-1 min-w-[150px]"
              >
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Optional" />
              </Flex>

              <Flex
                direction="column"
                gap="sm"
                className="flex-1 min-w-[150px]"
              >
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" />
              </Flex>
            </Flex>

            <Flex direction="column" gap="sm">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={4}
                placeholder="Your message here..."
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              ></textarea>
            </Flex>
          </Flex>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Send Message</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
