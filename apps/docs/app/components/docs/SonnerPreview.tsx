"use client";

import React from "react";
import { toast } from "sonner";
import { Toaster } from "@/registry/new-york/ui/sonner";
import { Button } from "@/registry/new-york/ui/button";

export function SuccessToastPreview() {
  return (
    <>
      <Toaster />
      <Button
        variant={"secondary"}
        onClick={() =>
          toast("This is a success toast", {
            description: "Operation completed successfully!",
            data: { variant: "success" },
          })
        }
      >
        Show Toast
      </Button>
    </>
  );
}
