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
    <Card className="lg:h-[400px] shadow-none">
      <CardHeader>
        <CardTitle>
          <Badge variant="secondary" className="text-xs">
            Contact RadioGroup
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="email" className="grid gap-3">
          {contactMethods.map((method) => (
            <Label
              key={method.id}
              className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/5 flex items-start gap-3 rounded-lg border p-3"
            >
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="data-[state=checked]:border-primary"
              />
              <div className="grid gap-1 font-normal">
                <div className="font-medium">{method.label}</div>
                <div className="text-muted-foreground pr-2 text-xs leading-snug text-balance">
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
