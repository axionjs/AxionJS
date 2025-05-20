"use client";

import BlocksPage from "./blocks";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

export default function Page() {
  return (
    <HomeLayout {...baseOptions}>
      <BlocksPage />
    </HomeLayout>
  );
}
