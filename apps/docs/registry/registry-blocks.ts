import { Registry } from "@/registry/schema";

export const blocks: Registry["items"] = [
  {
    name: "login-01",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "form"],
    dependencies: ["react-icons"],
    files: [
      {
        path: "blocks/login-01/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-01/components/login-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-01/components/card-wrapper.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-01/components/social.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
    description: "A simple login page.",
  },
  {
    name: "login-02",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "form"],
    dependencies: ["react-icons"],
    files: [
      {
        path: "blocks/login-02/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-02/components/login-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-02/components/card-wrapper.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-02/components/social.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-02/images/placeholder.svg",
        target: "public/placeholder.svg",
        type: "registry:file",
      },
      {
        path: "blocks/login-02/images/login-logo.svg",
        target: "public/login-logo.svg",
        type: "registry:file",
      },
    ],
    categories: ["authentication", "login"],
    description: "A two column login page with a cover image.",
  },
];
