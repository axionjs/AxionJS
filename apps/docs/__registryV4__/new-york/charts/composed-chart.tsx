"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

const chartData = [
  { month: "Jan", revenue: 4000, profit: 1400, expenses: 2600, growth: 0 },
  { month: "Feb", revenue: 5000, profit: 1800, expenses: 3200, growth: 5 },
  { month: "Mar", revenue: 4500, profit: 1600, expenses: 2900, growth: 10 },
  { month: "Apr", revenue: 6000, profit: 2400, expenses: 3600, growth: 15 },
  { month: "May", revenue: 7000, profit: 3000, expenses: 4000, growth: 20 },
  { month: "Jun", revenue: 8000, profit: 3600, expenses: 4400, growth: 25 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-3))",
  },
  growth: {
    label: "Growth",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ComposedChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Composed Chart</CardTitle>
        <CardDescription>Financial performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              label={{
                value: "Amount ($)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              label={{
                value: "Growth (%)",
                angle: 90,
                position: "insideRight",
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              fill="var(--color-revenue)"
              stroke="var(--color-revenue)"
              fillOpacity={0.3}
            />
            <Bar
              yAxisId="left"
              dataKey="profit"
              fill="var(--color-profit)"
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="expenses"
              fill="var(--color-expenses)"
              barSize={20}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="growth"
              stroke="var(--color-growth)"
              strokeWidth={2}
              dot={{ fill: "var(--color-growth)", r: 4 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Revenue and profit trending upward <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          First half of 2024 financial data
        </div>
      </CardFooter>
    </Card>
  );
}
