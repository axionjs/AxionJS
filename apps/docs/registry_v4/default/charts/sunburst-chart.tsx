"use client";

import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

// Data structure for sunburst chart
const innerData = [
  { name: "Electronics", value: 400, fill: "var(--color-electronics)" },
  { name: "Clothing", value: 300, fill: "var(--color-clothing)" },
  { name: "Home", value: 200, fill: "var(--color-home)" },
  { name: "Other", value: 100, fill: "var(--color-other)" },
];

const outerData = [
  // Electronics
  {
    name: "Phones",
    value: 200,
    category: "Electronics",
    fill: "var(--color-electronics-1)",
  },
  {
    name: "Computers",
    value: 120,
    category: "Electronics",
    fill: "var(--color-electronics-2)",
  },
  {
    name: "Accessories",
    value: 80,
    category: "Electronics",
    fill: "var(--color-electronics-3)",
  },

  // Clothing
  {
    name: "Men's",
    value: 120,
    category: "Clothing",
    fill: "var(--color-clothing-1)",
  },
  {
    name: "Women's",
    value: 150,
    category: "Clothing",
    fill: "var(--color-clothing-2)",
  },
  {
    name: "Children's",
    value: 30,
    category: "Clothing",
    fill: "var(--color-clothing-3)",
  },

  // Home
  { name: "Kitchen", value: 80, category: "Home", fill: "var(--color-home-1)" },
  {
    name: "Furniture",
    value: 70,
    category: "Home",
    fill: "var(--color-home-2)",
  },
  { name: "Decor", value: 50, category: "Home", fill: "var(--color-home-3)" },

  // Other
  { name: "Books", value: 60, category: "Other", fill: "var(--color-other-1)" },
  {
    name: "Beauty",
    value: 40,
    category: "Other",
    fill: "var(--color-other-2)",
  },
];

const chartConfig = {
  electronics: {
    label: "Electronics",
    color: "hsl(var(--chart-1))",
  },
  clothing: {
    label: "Clothing",
    color: "hsl(var(--chart-2))",
  },
  home: {
    label: "Home",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
  "electronics-1": {
    label: "Phones",
    color: "hsl(var(--chart-1) / 0.8)",
  },
  "electronics-2": {
    label: "Computers",
    color: "hsl(var(--chart-1) / 0.6)",
  },
  "electronics-3": {
    label: "Accessories",
    color: "hsl(var(--chart-1) / 0.4)",
  },
  "clothing-1": {
    label: "Men's",
    color: "hsl(var(--chart-2) / 0.8)",
  },
  "clothing-2": {
    label: "Women's",
    color: "hsl(var(--chart-2) / 0.6)",
  },
  "clothing-3": {
    label: "Children's",
    color: "hsl(var(--chart-2) / 0.4)",
  },
  "home-1": {
    label: "Kitchen",
    color: "hsl(var(--chart-3) / 0.8)",
  },
  "home-2": {
    label: "Furniture",
    color: "hsl(var(--chart-3) / 0.6)",
  },
  "home-3": {
    label: "Decor",
    color: "hsl(var(--chart-3) / 0.4)",
  },
  "other-1": {
    label: "Books",
    color: "hsl(var(--chart-4) / 0.8)",
  },
  "other-2": {
    label: "Beauty",
    color: "hsl(var(--chart-4) / 0.4)",
  },
} satisfies ChartConfig;

export function SunburstChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sunburst Chart</CardTitle>
        <CardDescription>
          Sales distribution by category and subcategory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart
            accessibilityLayer
            width={500}
            height={280}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(value) => value + "k"} />
              }
            />
            {/* Inner ring - Categories */}
            <Pie
              data={innerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={60}
              paddingAngle={2}
              stroke="var(--background)"
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={800}
            >
              {innerData.map((entry, index) => (
                <Cell
                  key={"cell-inner-" + index}
                  fill={entry.fill}
                  className="transition-colors duration-300"
                  role="graphics-symbol"
                  aria-label={entry.name + ": " + entry.value + "k"}
                />
              ))}
            </Pie>

            {/* Outer ring - Subcategories */}
            <Pie
              data={outerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={1}
              stroke="var(--background)"
              strokeWidth={1}
              isAnimationActive={true}
              animationDuration={800}
            >
              {outerData.map((entry, index) => (
                <Cell
                  key={"cell-outer-" + index}
                  fill={entry.fill}
                  className="transition-colors duration-300"
                  role="graphics-symbol"
                  aria-label={entry.name + ": " + entry.value + "k"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Electronics is the top category at 40%{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Inner ring shows categories, outer ring shows subcategories
        </div>
      </CardFooter>
    </Card>
  );
}
