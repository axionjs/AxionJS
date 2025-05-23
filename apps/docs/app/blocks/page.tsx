"use client";

import BlocksPage from "./blocks";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { Toaster } from "@/registry/new-york/ui/toaster";

export default function Page() {
  return (
    <HomeLayout {...baseOptions}>
      <Toaster />
      <BlocksPage />
    </HomeLayout>
  );
}
