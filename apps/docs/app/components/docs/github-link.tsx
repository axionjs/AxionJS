import * as React from "react";
import Link from "next/link";

import { Icons } from "@/app/components/docs/icons";
import { Button } from "@/registry/new-york/ui/button";
import { Skeleton } from "@/registry/new-york/ui/skeleton";

export const siteConfig = {
  name: "Axionjs",
  url: "https://axionjs.com",
  ogImage: "https://axionjs/og.jpg",
  description:
    "AxionJS is a revolutionary component system for Next.js that gives you full ownership of your UI code...",
  links: {
    github: "https://github.com/axionjs/AxionJS",
  },
};

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 gap-2 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  );
}

export async function StarsCount() {
  try {
    const res = await fetch("https://api.github.com/repos/axionjs/AxionJS", {
      next: { revalidate: 86400 }, // Cache for 1 day
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with status: ${res.status}`);
    }

    const json = await res.json();

    return (
      <span className="text-muted-foreground w-8 text-xs tabular-nums">
        {json.stargazers_count >= 1000
          ? `${(json.stargazers_count / 1000).toFixed(1)}k`
          : json.stargazers_count?.toLocaleString?.() || 0}
      </span>
    );
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error);

    // Fallback display when API fails
    return (
      <span className="text-muted-foreground w-8 text-xs tabular-nums">⭐</span>
    );
  }
}

// import React from "react";

// const GitHubLink = () => {
//   return <div>git-link</div>;
// };

// export default GitHubLink;
