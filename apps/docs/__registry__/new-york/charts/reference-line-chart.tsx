"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

const chartData = [
  { month: "Jan", actual: 4000, target: 4500 },
  { month: "Feb", actual: 5000, target: 4500 },
  { month: "Mar", actual: 4500, target: 4500 },
  { month: "Apr", actual: 6000, target: 4500 },
  { month: "May", actual: 7000, target: 4500 },
  { month: "Jun", actual: 8000, target: 4500 },
];

const chartConfig = {
  actual: {
    label: "Actual Sales",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  },
  average: {
    label: "Average",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ReferenceLineChart() {
  // Calculate average
  const average =
    chartData.reduce((sum, item) => sum + item.actual, 0) / chartData.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reference Line Chart</CardTitle>
        <CardDescription>
          Sales performance with target and average
        </CardDescription>
      </CardHeader>
      <CardContent className="h-auto">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 30, right: 50, bottom: 30, left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => "$" + value}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent formatter={(value) => "$" + value} />
                }
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={chartConfig.actual.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.actual.color, r: 4 }}
              />
              <ReferenceLine
                y={4500}
                stroke={chartConfig.target.color}
                strokeDasharray="3 3"
                label={{
                  value: "Target: $4,500",
                  position: "right",
                  fill: chartConfig.target.color,
                  fontSize: 12,
                  offset: 10,
                }}
              />
              <ReferenceLine
                y={average}
                stroke={chartConfig.average.color}
                strokeDasharray="3 3"
                label={{
                  value: "Average: $" + average.toFixed(0),
                  position: "right",
                  fill: chartConfig.average.color,
                  fontSize: 12,
                  offset: 10,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Exceeded target in 5 out of 6 months{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          First half of 2024 sales performance
        </div>
      </CardFooter>
    </Card>
  );
}
