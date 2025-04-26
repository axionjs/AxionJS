import { createNavbar } from "fumadocs-ui/navbar";
import { createSidebar } from "fumadocs-ui/sidebar";

// Configure the navigation sidebar
export const sidebar = createSidebar({
  groups: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          slug: "/",
        },
        {
          title: "Installation",
          slug: "/installation",
        },
      ],
    },
    {
      title: "Features",
      items: [
        {
          title: "Components",
          slug: "/components",
        },
        {
          title: "Charts",
          slug: "/charts",
        },
      ],
    },
  ],
});

// Configure the top navigation bar
export const navbar = createNavbar({
  items: [
    {
      title: "Documentation",
      slug: "/",
    },
    {
      title: "Charts",
      slug: "/charts",
    },
    {
      title: "GitHub",
      href: "https://github.com/yourusername/yourrepository",
      external: true,
    },
  ],
});
