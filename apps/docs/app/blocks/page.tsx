"use client";

import BlocksPage from "./blocks";

import { Toaster } from "@/registry/new-york/ui/toaster";

export default function Page() {
  return (
    <>
      <Toaster />
      <BlocksPage />
    </>
  );
}
