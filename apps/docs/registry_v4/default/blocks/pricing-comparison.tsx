"use client";

import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Basic features for personal projects",
    features: {
      "AI-generated portraits": "5",
      "Turnaround time": "24 hours",
      "Style options": "1",
      "Filter options": "1",
      "Retouch credits": "0",
      "Commercial usage": false,
      "Priority support": false,
      "Custom branding": false,
      "API access": false,
    },
    buttonText: "Start for free",
  },
  {
    name: "Pro",
    price: 39,
    isRecommended: true,
    description: "Everything you need for professional work",
    features: {
      "AI-generated portraits": "50",
      "Turnaround time": "3 hours",
      "Style options": "5",
      "Filter options": "5",
      "Retouch credits": "5",
      "Commercial usage": true,
      "Priority support": true,
      "Custom branding": false,
      "API access": false,
    },
    buttonText: "Upgrade to Pro",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "Advanced features for teams and businesses",
    features: {
      "AI-generated portraits": "Unlimited",
      "Turnaround time": "1 hour",
      "Style options": "10",
      "Filter options": "10",
      "Retouch credits": "20",
      "Commercial usage": true,
      "Priority support": true,
      "Custom branding": true,
      "API access": true,
    },
    buttonText: "Contact sales",
  },
];

const featureLabels = {
  "AI-generated portraits": "Number of portraits you can generate per month",
  "Turnaround time": "Average time to receive your generated portraits",
  "Style options": "Number of different artistic styles available",
  "Filter options": "Number of different filters to enhance your portraits",
  "Retouch credits": "Credits to request manual retouching by our designers",
  "Commercial usage": "Use generated portraits for commercial purposes",
  "Priority support": "Get faster responses from our support team",
  "Custom branding": "Add your own branding to the generated portraits",
  "API access": "Integrate with our API for automated workflows",
};

export default function PricingComparison() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Render mobile cards view
  const renderMobileView = () => (
    <div className="space-y-8">
      {plans.map((plan) => (
        <motion.div
          key={plan.name}
          className={cn("relative border rounded-lg p-6", {
            "border-[2px] border-primary": plan.isPopular,
          })}
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {plan.isPopular && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Most Popular
            </Badge>
          )}
          <h3 className="text-lg font-medium">{plan.name}</h3>
          <p className="mt-2 text-4xl font-bold">
            ${plan.price}
            <span className="text-sm text-muted-foreground font-normal ml-1">
              /month
            </span>
          </p>
          <p className="mt-4 font-medium text-muted-foreground">
            {plan.description}
          </p>
          <Button
            variant={plan.isPopular ? "default" : "outline"}
            size="lg"
            className="w-full mt-6"
          >
            {plan.buttonText}
          </Button>

          <div className="mt-6 space-y-4">
            <h4 className="font-medium">Features</h4>
            <div className="space-y-3">
              {Object.entries(plan.features).map(([feature, value]) => (
                <div
                  key={feature}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span className="text-sm">{feature}</span>
                  <span className="font-medium">
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )
                    ) : (
                      value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Render desktop table view
  const renderDesktopView = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Features</TableHead>
            {plans.map((plan) => (
              <TableHead key={plan.name} className="text-center">
                <div
                  className={cn(
                    "relative pb-8 pt-2",
                    plan.isPopular ? "text-primary" : "",
                  )}
                >
                  {plan.isPopular && (
                    <Badge className="absolute top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-lg font-medium">{plan.name}</div>
                  <div className="mt-2 text-3xl font-bold">
                    ${plan.price}
                    <span className="text-xs text-muted-foreground font-normal">
                      /month
                    </span>
                  </div>
                  <Button
                    variant={plan.isPopular ? "default" : "outline"}
                    className="mt-4 w-full"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(featureLabels).map(
            ([feature, description], index) => (
              <TableRow key={feature}>
                <TableCell className="font-medium">
                  <div>
                    <div>{feature}</div>
                    <div className="text-xs text-muted-foreground">
                      {description}
                    </div>
                  </div>
                </TableCell>
                {plans.map((plan) => {
                  const value =
                    plan.features[feature as keyof typeof plan.features];
                  return (
                    <TableCell
                      key={`${plan.name}-${feature}`}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.05 * index }}
                        className="flex justify-center"
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )
                        ) : (
                          <span className="font-medium">{value}</span>
                        )}
                      </motion.div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 md:px-6">
      <motion.h1
        className="text-5xl font-bold text-center tracking-tight mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Compare Plans
      </motion.h1>
      <motion.p
        className="text-xl text-center text-muted-foreground max-w-2xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Choose the perfect plan for your needs. All plans include access to our
        AI portrait generator.
      </motion.p>

      <motion.div
        className="w-full max-w-6xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isDesktop ? renderDesktopView() : renderMobileView()}
      </motion.div>
    </div>
  );
}
