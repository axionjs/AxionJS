"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

export default function AccordionPreview() {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Example 1: Basic Accordion */}
      <div>
        <h3 className="text-lg font-medium">Basic Accordion</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is React?</AccordionTrigger>
            <AccordionContent>
              React is a JavaScript library for building user interfaces.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
            <AccordionContent>
              Tailwind CSS is a utility-first CSS framework for creating custom
              designs quickly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Example 2: Accordion with Multiple Selection */}
      <div>
        <h3 className="text-lg font-medium">Accordion with Multiple Items</h3>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is Accordion accessible?</AccordionTrigger>
            <AccordionContent>
              Yes! It uses ARIA roles and attributes for better accessibility.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I use it in forms?</AccordionTrigger>
            <AccordionContent>
              Absolutely! It's a great choice for forms with grouped inputs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
