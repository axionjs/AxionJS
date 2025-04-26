"use client";

import ChartsPage from "./chart-gallery";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

export default function Page() {
  return (
    <HomeLayout {...baseOptions}>
      <ChartsPage />
    </HomeLayout>
  );
}
