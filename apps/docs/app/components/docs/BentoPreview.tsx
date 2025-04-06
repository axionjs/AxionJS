"use client";

import {
  CodeIcon,
  BookOpenIcon,
  ServerIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/registry/new-york/ui/bento";
import { Marquee } from "@/registry/new-york/ui/marquee";

const snippets = [
  {
    title: "Code Snippet 1",
    description: "Reusable utility function for data transformation.",
  },
  {
    title: "Code Snippet 2",
    description: "Custom hook for fetching API data efficiently.",
  },
  {
    title: "Code Snippet 3",
    description: "Predefined TailwindCSS classes for UI components.",
  },
];

const features = [
  {
    Icon: CodeIcon,
    name: "Accessible",
    description:
      "Access a vast collection of accessiable reusable code snippets.",
    href: "/docs",
    cta: "Explore Snippets",
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:25s] [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)]"
      >
        {snippets.map((snippet, index) => (
          <div
            key={index}
            className="relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <h4 className="text-sm font-medium">{snippet.title}</h4>
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
              {snippet.description}
            </p>
          </div>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BookOpenIcon,
    name: "Documentation",
    description: "Comprehensive guides and API references.",
    href: "/docs",
    cta: "Read Docs",
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
    background: (
      <img
        className="absolute -right-10 -top-10 w-32 opacity-60"
        src="/images/docs-preview.png"
        alt="Documentation preview"
      />
    ),
  },
  {
    Icon: ServerIcon,
    name: "API Management",
    description: "Simplify your workflow with integrated APIs.",
    href: "/api",
    cta: "Manage APIs",
    className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
    background: (
      <img
        className="absolute -right-10 -top-10 w-32 opacity-60"
        src="/images/api-preview.png"
        alt="API preview"
      />
    ),
  },
  {
    Icon: LayoutDashboardIcon,
    name: "Analytics",
    description: "Visualize data insights and trends in real-time.",
    href: "/analytics",
    cta: "View Dashboard",
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-3 lg:col-end-4",
    background: (
      <img
        className="absolute -right-10 -top-10 w-32 opacity-60"
        src="/images/analytics-preview.png"
        alt="Analytics preview"
      />
    ),
  },
  {
    Icon: MessageSquareIcon,
    name: "Collaboration",
    description: "Discuss and share ideas with your team seamlessly.",
    href: "/collaboration",
    cta: "Join Now",
    className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-4",
    background: (
      <img
        className="absolute -right-10 -top-10 w-32 opacity-60"
        src="/images/collaboration-preview.png"
        alt="Collaboration preview"
      />
    ),
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3 lg:grid-cols-3 gap-6 not-prose">
      {features.map((feature, index) => (
        <BentoCard key={index} {...feature} />
      ))}
    </BentoGrid>
  );
}
