"use client";

import React from "react";
import { Container } from "@/registry/new-york/ui/container";

export function DefaultContainerPreview() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <Container>
        <div className="p-4 bg-gray-100 border rounded-lg">
          Default container content goes here.
        </div>
      </Container>
    </div>
  );
}

export function VariantContainerPreview() {
  const variants = [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto not-prose">
      {variants.map((variant) => (
        <Container key={variant} variant={variant}>
          <div className="p-4 bg-gray-100 border rounded-lg">
            This is a `{variant}` container.
          </div>
        </Container>
      ))}
    </div>
  );
}

export function StyledContainerPreview() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto not-prose">
      <Container className="bg-blue-50 border-2 border-blue-200 rounded-xl">
        <div className="p-4">Custom styled container content.</div>
      </Container>
    </div>
  );
}
