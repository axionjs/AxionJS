"use client";

import React from "react";
import { Flex } from "@/app/components/layout/flex";

export function DefaultFlexPreview() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h3 className="text-lg font-medium">Default Flex Example</h3>
      <Flex className="border p-4 bg-muted" gap="md">
        <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center">
          1
        </div>
        <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center">
          2
        </div>
        <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center">
          3
        </div>
      </Flex>
    </div>
  );
}

export function AdvancedFlexPreview() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h3 className="text-lg font-medium">Advanced Flex Example</h3>
      <Flex
        direction="column"
        align="center"
        justify="between"
        gap="md"
        className="border p-4 bg-muted h-64"
      >
        <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center">
          A
        </div>
        <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center">
          B
        </div>
        <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center">
          C
        </div>
      </Flex>
    </div>
  );
}
