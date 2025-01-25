"use client";

import React from "react";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";
import { Button } from "@/app/components/ui/button";

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
