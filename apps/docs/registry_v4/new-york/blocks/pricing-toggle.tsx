"use client";

import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/registry/new-york/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CircleCheck, CircleHelp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tooltipContent = {
  styles: "Choose from a variety of styles to suit your preferences.",
  filters: "Choose from a variety of filters to enhance your portraits.",
  credits: "Use these credits to retouch your portraits.",
};

const YEARLY_DISCOUNT = 20;
const plans = [
  {
    name: "Starter",
    price: 20,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      { title: "5 hours turnaround time" },
      { title: "20 AI portraits" },
      { title: "Choice of 2 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 2 filters", tooltip: tooltipContent.filters },
      { title: "2 retouch credits", tooltip: tooltipContent.credits },
    ],
  },
  {
    name: "Advanced",
    price: 40,
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      { title: "3 hours turnaround time" },
      { title: "50 AI portraits" },
      { title: "Choice of 5 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 5 filters", tooltip: tooltipContent.filters },
      { title: "5 retouch credits", tooltip: tooltipContent.credits },
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: 80,
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      { title: "1-hour turnaround time" },
      { title: "100 AI portraits" },
      { title: "Choice of 10 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 10 filters", tooltip: tooltipContent.filters },
      { title: "10 retouch credits", tooltip: tooltipContent.credits },
    ],
  },
];

export default function PricingToggle() {
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("monthly");

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-accent flex flex-col items-center justify-center py-12 px-6">
        <motion.h1
          className="text-5xl font-bold text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pricing
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs
            value={selectedBillingPeriod}
            onValueChange={setSelectedBillingPeriod}
            className="mt-8"
          >
            <TabsList className="h-11 bg-background border px-1.5 rounded-full">
              <TabsTrigger
                value="monthly"
                className="px-4 py-1.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="px-4 py-1.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Yearly (Save {YEARLY_DISCOUNT}%)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
        <div className="mt-12 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={cn("relative p-6 bg-background border px-8", {
                "shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] py-14 z-[1] px-10 lg:-mx-2 overflow-hidden":
                  plan.isPopular,
              })}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {plan.isPopular && (
                <Badge className="absolute top-10 right-10 rotate-[45deg] rounded-none px-10 uppercase translate-x-1/2 -translate-y-1/2">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-lg font-medium">{plan.name}</h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedBillingPeriod}
                  className="mt-2 text-4xl font-bold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  $
                  {selectedBillingPeriod === "monthly"
                    ? plan.price
                    : Math.round(plan.price * ((100 - YEARLY_DISCOUNT) / 100))}
                  <span className="ml-1.5 text-sm text-muted-foreground font-normal">
                    /month
                  </span>
                </motion.p>
              </AnimatePresence>
              <p className="mt-4 font-medium text-muted-foreground">
                {plan.description}
              </p>

              <Button
                variant={plan.isPopular ? "default" : "outline"}
                size="lg"
                className="w-full mt-6 rounded-full text-base"
              >
                Get Started <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Separator className="my-8" />
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature.title}
                    className="flex items-start gap-1.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1 + featureIndex * 0.05 + 0.4,
                    }}
                  >
                    <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
                    {feature.title}
                    {feature.tooltip && (
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <CircleHelp className="h-4 w-4 mt-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>{feature.tooltip}</TooltipContent>
                      </Tooltip>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
