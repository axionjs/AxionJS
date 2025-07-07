"use client";

import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Label } from "@/registry/new-york/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";

const contactMethods = [
  {
    id: "email",
    label: "Email",
    description: "We'll reach out to you via email.",
  },
  {
    id: "sms",
    label: "SMS",
    description: "Quick updates sent to your phone.",
  },
  {
    id: "call",
    label: "Phone Call",
    description: "We'll give you a call for important updates.",
  },
] as const;

export default function ContactPreferenceCard() {
  return (
    <Card className="h-full min-h-[300px] sm:min-h-[400px] shadow-none flex flex-col">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">
          <Badge variant="secondary" className="text-xs">
            Contact RadioGroup
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-3 sm:px-6">
        <RadioGroup defaultValue="email" className="grid gap-2 sm:gap-3">
          {contactMethods.map((method) => (
            <Label
              key={method.id}
              className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/5 flex items-start gap-2 sm:gap-3 rounded-lg border p-3 cursor-pointer"
            >
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="data-[state=checked]:border-primary mt-0.5"
              />
              <div className="grid gap-1 font-normal min-w-0">
                <div className="font-medium text-sm sm:text-base">
                  {method.label}
                </div>
                <div className="text-muted-foreground text-xs leading-tight text-balance">
                  {method.description}
                </div>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
