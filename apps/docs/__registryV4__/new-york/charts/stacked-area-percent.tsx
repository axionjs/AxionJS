"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

const chartData = [
  { year: "2018", mobile: 30, desktop: 60, tablet: 10 },
  { year: "2019", mobile: 35, desktop: 55, tablet: 10 },
  { year: "2020", mobile: 45, desktop: 45, tablet: 10 },
  { year: "2021", mobile: 50, desktop: 40, tablet: 10 },
  { year: "2022", mobile: 55, desktop: 35, tablet: 10 },
  { year: "2023", mobile: 60, desktop: 30, tablet: 10 },
  { year: "2024", mobile: 65, desktop: 25, tablet: 10 },
];

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-1))",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function StackedAreaPercentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stacked Area Percent Chart</CardTitle>
        <CardDescription>Device usage trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            stackOffset="expand"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={(value) => (value * 100).toFixed(0) + "%"}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(value) => value + "%"} />
              }
            />
            <Area
              type="monotone"
              dataKey="mobile"
              stackId="1"
              stroke="var(--color-mobile)"
              fill="var(--color-mobile)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stackId="1"
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="tablet"
              stackId="1"
              stroke="var(--color-tablet)"
              fill="var(--color-tablet)"
              fillOpacity={0.6}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Mobile usage increased by 35% since 2018{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Percentage distribution of device usage
        </div>
      </CardFooter>
    </Card>
  );
}
